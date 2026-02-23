const SITE_NAME = "Web4Agents.org";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://web4agents.org";

export function getWelcomeNewsletterHtml(): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Welcome</title></head>
<body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #0d9488;">Welcome to ${SITE_NAME}</h1>
  <p>Thank you for subscribing. You'll receive updates on Generative Engine Optimization (GEO) and the agentic web.</p>
  <p><a href="${SITE_URL}" style="color: #0d9488;">Visit ${SITE_NAME}</a></p>
  <p style="color: #666; font-size: 14px;">— The Web4Agents team</p>
</body>
</html>`;
}

export function getAuditConfirmationHtml(): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Audit request received</title></head>
<body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #0d9488;">Audit request received</h1>
  <p>We've received your GEO audit request. Our team will review it and get back to you soon.</p>
  <p><a href="${SITE_URL}" style="color: #0d9488;">${SITE_NAME}</a></p>
  <p style="color: #666; font-size: 14px;">— The Web4Agents team</p>
</body>
</html>`;
}

export function getContactConfirmationHtml(): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Message received</title></head>
<body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #0d9488;">Message received</h1>
  <p>Thank you for getting in touch. We've received your message and will respond as soon as possible.</p>
  <p><a href="${SITE_URL}" style="color: #0d9488;">${SITE_NAME}</a></p>
  <p style="color: #666; font-size: 14px;">— The Web4Agents team</p>
</body>
</html>`;
}

export const WELCOME_NEWSLETTER_SUBJECT = `Welcome to ${SITE_NAME}`;
export const AUDIT_CONFIRMATION_SUBJECT = "Your GEO audit request — Web4Agents";
export const CONTACT_CONFIRMATION_SUBJECT = "We received your message — Web4Agents";
