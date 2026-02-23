import { NextResponse } from "next/server";
import { getFirestore as getDb } from "@/lib/firebase";
import { sendAuditRequestToTeam } from "@/lib/resend";
import { rateLimit } from "@/lib/rate-limit";

const HONEYPOT = "url_secondary";
const MAX_MESSAGE = 2000;

function isValidUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const limited = await rateLimit(request);
  if (!limited.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { url?: string; email?: string; message?: string; url_secondary?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.url_secondary && String(body.url_secondary).trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const url = typeof body.url === "string" ? body.url.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, MAX_MESSAGE) : undefined;

  if (!url || !isValidUrl(url)) {
    return NextResponse.json({ error: "Valid URL required" }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const db = getDb();
  if (db) {
    try {
      const { FieldValue } = await import("firebase-admin/firestore");
      await db.collection("audit-requests").add({
        email,
        url,
        ...(message && { message }),
        requestedAt: FieldValue.serverTimestamp(),
        status: "pending",
      });
    } catch (e) {
      console.error("Firestore audit error:", e);
      return NextResponse.json({ error: "Request failed" }, { status: 500 });
    }
  }

  const result = await sendAuditRequestToTeam({ email, url, message });
  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "Request failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
