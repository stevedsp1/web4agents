import { NextResponse } from "next/server";
import { getFirestore as getDb } from "@/lib/firebase";
import { sendNewsletterSignupToTeam } from "@/lib/resend";
import { rateLimit } from "@/lib/rate-limit";

const HONEYPOT = "url_secondary";

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254;
}

export async function POST(request: Request) {
  const limited = await rateLimit(request);
  if (!limited.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { email?: string; url_secondary?: string; locale?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.url_secondary && String(body.url_secondary).trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const locale = typeof body.locale === "string" ? body.locale.trim() || "en" : "en";

  const db = getDb();
  if (db) {
    try {
      const { FieldValue } = await import("firebase-admin/firestore");
      const col = db.collection("subscribers");
      const existing = await col.where("email", "==", email).limit(1).get();
      if (!existing.empty) {
        const doc = existing.docs[0];
        await doc.ref.update({
          status: "active",
          source: "newsletter",
          locale,
          subscribedAt: FieldValue.serverTimestamp(),
        });
      } else {
        await col.add({
          email,
          locale,
          source: "newsletter",
          subscribedAt: FieldValue.serverTimestamp(),
          status: "active",
        });
      }
    } catch (e) {
      console.error("Firestore newsletter error:", e);
      return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
    }
  }

  const result = await sendNewsletterSignupToTeam(email);
  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "Email failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
