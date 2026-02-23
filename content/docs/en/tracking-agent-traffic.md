---
title: "Tracking Agent Traffic"
slug: "tracking-agent-traffic"
description: "How to identify and measure AI crawler and agent traffic in your analytics and server logs."
category: "analytics"
order: 1
publishedAt: "2025-02-15"
status: "published"
---

AI agent traffic is real, growing, and worth measuring. Knowing which agents visit your site, how often, and which pages they read helps you understand your GEO effectiveness and identify opportunities.

## Server log analysis

Server access logs are the most reliable source — they capture every request regardless of JavaScript execution.

### Identifying AI crawlers by user-agent

```bash
# Count requests per AI crawler
grep -i "gptbot\|claudebot\|perplexitybot\|google-extended\|ccbot\|bytespider" /var/log/nginx/access.log | \
  awk '{print $1}' | \
  grep -oP '"[^"]*"' | \
  sort | uniq -c | sort -rn
```

### Extract crawler activity with timestamps

```bash
# All GPTBot requests with URL and timestamp
grep -i "gptbot" /var/log/nginx/access.log | \
  awk '{print $4, $7}' | \
  head -50
```

### Most crawled pages by AI agents

```bash
grep -i "gptbot\|claudebot\|perplexitybot" /var/log/nginx/access.log | \
  awk '{print $7}' | \
  sort | uniq -c | sort -rn | head -20
```

## Common AI crawler user-agent strings

| Crawler | User-agent string to match |
|---------|---------------------------|
| GPTBot | `GPTBot` |
| ChatGPT User | `ChatGPT-User` |
| ClaudeBot | `ClaudeBot` |
| PerplexityBot | `PerplexityBot` |
| Google-Extended | `Google-Extended` |
| Applebot-Extended | `Applebot-Extended` |
| Common Crawl | `CCBot` |
| Bytespider | `Bytespider` |

## Google Analytics 4

GA4 filters out known bot traffic by default. To see AI crawler activity, you need server-side tagging or log analysis — GA4 won't show GPTBot sessions in standard reports.

However, you can track **referral traffic from AI platforms**:
- Perplexity sends HTTP referrers from `perplexity.ai`.
- Bing Copilot sends referrers from `bing.com`.
- Users who click through from AI answers show up as direct or referral traffic.

### Creating an AI referrer segment in GA4

1. Go to **Explore** → Create a new exploration.
2. Add a segment with condition: `Session source contains "perplexity.ai OR bing.com OR you.com"`.
3. Monitor this segment monthly to track growth in AI-referred traffic.

## Cloudflare analytics

If you use Cloudflare, the **Bot Management** dashboard shows bot traffic by category, including "Verified Bots" like GPTBot and ClaudeBot. Free plans show aggregated bot traffic; Pro+ plans show per-bot breakdowns.

## Plausible Analytics

Plausible does not track bots by design. Use server logs or a middleware layer to count AI crawler hits.

## Building a simple crawler dashboard

If you want structured reporting, add a middleware in your app to log AI crawler hits:

```ts
// Next.js middleware (middleware.ts)
export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') ?? '';
  const aiCrawlers = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'];

  if (aiCrawlers.some(bot => ua.includes(bot))) {
    // Log to your analytics system, database, or external service
    console.log(`[AI Crawler] ${ua} → ${request.nextUrl.pathname}`);
  }

  return NextResponse.next();
}
```

## What to measure

- **Total AI crawler requests** per month — trend over time.
- **Pages most crawled** by AI agents — are they the right ones?
- **Crawl frequency** — is your content being re-indexed after updates?
- **Error rates** — are agents hitting 404s or 5xx responses?
- **AI referral traffic** — users arriving from AI-generated answers.
