import { NextResponse } from "next/server";
import { sendContactToTeam } from "@/lib/resend";
import { rateLimit } from "@/lib/rate-limit";

const HONEYPOT = "url_secondary";
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5000;

export async function POST(request: Request) {
  const limited = await rateLimit(request);
  if (!limited.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { email?: string; subject?: string; message?: string; url_secondary?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.url_secondary && String(body.url_secondary).trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }
  if (!subject || subject.length > MAX_SUBJECT) {
    return NextResponse.json({ error: "Subject required (max 200 chars)" }, { status: 400 });
  }
  if (!message || message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "Message required (max 5000 chars)" }, { status: 400 });
  }

  const teamResult = await sendContactToTeam({ fromEmail: email, subject, message });
  if (!teamResult.ok) {
    return NextResponse.json({ error: teamResult.error ?? "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
