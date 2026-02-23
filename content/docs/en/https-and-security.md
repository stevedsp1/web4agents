---
title: "HTTPS & Security Headers"
slug: "https-and-security"
description: "Why HTTPS and security headers matter for AI agent trust and site credibility."
category: "domain"
order: 1
publishedAt: "2025-02-15"
status: "published"
---

HTTPS is the baseline for any public website in 2025. AI crawlers, browsers, and agents treat HTTP sites as untrustworthy and may skip or downgrade them. Security headers add an additional layer of trust signals.

## Why HTTPS matters for agents

- **Trust signal** — AI systems that retrieve content prefer HTTPS sources. An HTTP site may be flagged as insecure or simply deprioritized.
- **Data integrity** — HTTPS ensures the content the agent receives hasn't been tampered with in transit.
- **Required by crawlers** — Some AI crawlers and browsers block HTTP content by default (Chrome's HTTPS-First mode, for example).
- **SEO prerequisite** — Google has used HTTPS as a ranking signal since 2014.

## Getting a TLS certificate

Free options:
- **Let's Encrypt** — Free, automated, widely supported. Used by Certbot.
- **Cloudflare** — Free TLS when using Cloudflare as a proxy/CDN.

Most hosting providers (Vercel, Netlify, Railway, Render) provision TLS automatically.

## Security headers

Add these HTTP response headers to improve security and trust. They can be set in your server configuration, CDN, or framework middleware.

### `Strict-Transport-Security` (HSTS)

Forces browsers and agents to always use HTTPS, even if they initially request HTTP:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

- `max-age=31536000` — Remember this rule for 1 year.
- `includeSubDomains` — Apply to all subdomains.
- `preload` — Submit to the HSTS preload list (browsers ship with your domain pre-HTTPS).

### `X-Frame-Options`

Prevents your site from being embedded in an iframe (clickjacking protection):

```
X-Frame-Options: DENY
```

Or allow same-origin embedding:

```
X-Frame-Options: SAMEORIGIN
```

### `X-Content-Type-Options`

Prevents browsers from MIME-sniffing (guessing the content type):

```
X-Content-Type-Options: nosniff
```

### `Content-Security-Policy` (CSP)

Controls which resources can be loaded on your page. A strict CSP limits XSS attack surface:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
```

CSP is complex to configure correctly — start permissive and tighten over time. Use `Content-Security-Policy-Report-Only` to test without blocking.

### `Referrer-Policy`

Controls how much referrer information is sent:

```
Referrer-Policy: strict-origin-when-cross-origin
```

### `Permissions-Policy`

Restricts browser features your site doesn't need:

```
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Next.js implementation

In `next.config.js`:

```js
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
];

module.exports = {
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
    ];
  },
};
```

## Testing your headers

- [securityheaders.com](https://securityheaders.com) — Scans your site and grades your headers.
- [SSL Labs](https://www.ssllabs.com/ssltest/) — Tests your TLS configuration.
- Browser DevTools → Network tab → click your request → Headers → Response Headers.

Aim for an A or A+ grade on securityheaders.com. It signals that your site is well-maintained — a positive signal for both users and AI systems that evaluate source credibility.
