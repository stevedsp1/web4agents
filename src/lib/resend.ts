import { Resend } from "resend";

const FROM_EMAIL = "Web4Agents <onboarding@resend.dev>";
const TEAM_EMAIL = process.env.CONTACT_EMAIL ?? "web4agents@proton.me";

let resendClient: Resend | null = null;

function getResend(): Resend | null {
  if (resendClient) return resendClient;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  resendClient = new Resend(key);
  return resendClient;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Notify team of a new newsletter signup. */
export async function sendNewsletterSignupToTeam(email: string): Promise<{ ok: boolean; error?: string }> {
  const resend = getResend();
  if (!resend) return { ok: true };
  const html = `
    <p><strong>Nouvelle inscription newsletter</strong></p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
  `;
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TEAM_EMAIL,
    subject: "[Web4Agents] Nouvelle inscription newsletter",
    html,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/** Notify team of a new audit request. */
export async function sendAuditRequestToTeam(params: {
  email: string;
  url: string;
  message?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const resend = getResend();
  if (!resend) return { ok: true };
  const html = `
    <p><strong>Nouvelle demande d'audit GEO</strong></p>
    <p><strong>Email:</strong> ${escapeHtml(params.email)}</p>
    <p><strong>URL:</strong> ${escapeHtml(params.url)}</p>
    ${params.message ? `<p><strong>Message:</strong></p><pre style="white-space: pre-wrap;">${escapeHtml(params.message)}</pre>` : ""}
  `;
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TEAM_EMAIL,
    subject: "[Web4Agents] Demande d'audit GEO",
    html,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/** Send contact form message to the team. */
export async function sendContactToTeam(params: {
  fromEmail: string;
  subject: string;
  message: string;
}): Promise<{ ok: boolean; error?: string }> {
  const resend = getResend();
  if (!resend) return { ok: true };
  const html = `
    <p><strong>From:</strong> ${escapeHtml(params.fromEmail)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(params.subject)}</p>
    <hr/>
    <pre style="white-space: pre-wrap;">${escapeHtml(params.message)}</pre>
  `;
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TEAM_EMAIL,
    replyTo: params.fromEmail,
    subject: `[Contact] ${params.subject}`,
    html,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
