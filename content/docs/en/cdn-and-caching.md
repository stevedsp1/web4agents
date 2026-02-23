---
title: "CDN & Caching for Agents"
slug: "cdn-and-caching"
description: "How to configure your CDN and caching strategy to serve both human visitors and AI agents efficiently."
category: "domain"
order: 3
publishedAt: "2026-02-01"
status: "published"
---

## Why CDN and caching matter for agents

AI crawlers and agents access your site at high frequency and from distributed locations globally. A well-configured CDN ensures:

1. **Low latency**: Agents receive responses quickly, reducing the cost of real-time browsing
2. **Availability**: Your content is served even under high concurrent crawl load
3. **Freshness control**: You control how quickly updated content reaches crawlers
4. **Feature enablement**: CDN-level features like Markdown for Agents (Cloudflare) add value without server changes

## Cache-Control for crawlers

The `Cache-Control` header governs how long a response can be cached by browsers, CDNs, and intermediary systems — including AI crawler infrastructure.

```
Cache-Control: public, max-age=3600, stale-while-revalidate=86400
```

| Directive | Meaning |
|-----------|---------|
| `public` | Response may be cached by CDN and shared caches |
| `private` | Response is for the end user only (not CDN-cached) |
| `max-age=3600` | Cache for 1 hour |
| `s-maxage=86400` | CDN-specific max age (overrides `max-age` for CDNs) |
| `stale-while-revalidate=86400` | Serve stale content for up to 1 day while revalidating in background |
| `no-cache` | Must revalidate with origin before serving |
| `no-store` | Do not cache at all |

### Recommended strategies

**Static content (images, JS, CSS):**
```
Cache-Control: public, max-age=31536000, immutable
```

**Blog posts and docs (change occasionally):**
```
Cache-Control: public, max-age=3600, stale-while-revalidate=86400
```

**Homepage and listing pages (change frequently):**
```
Cache-Control: public, max-age=300, stale-while-revalidate=3600
```

**Dynamic API endpoints (real-time data):**
```
Cache-Control: no-cache, no-store
```

## Vary header and content negotiation

If your server returns different content based on the `Accept` header (e.g., HTML for browsers, Markdown for agents), you must include the `Vary` header to prevent CDNs from serving the wrong cached version:

```
Vary: Accept
```

Without `Vary: Accept`, a CDN might cache the HTML version and serve it to an agent requesting Markdown — or vice versa.

## ETag and conditional requests

ETags allow crawlers to check whether content has changed without downloading the full response:

```
HTTP/1.1 200 OK
ETag: "abc123def456"
Cache-Control: public, max-age=3600

# Next request from crawler:
GET /docs/json-ld HTTP/1.1
If-None-Match: "abc123def456"

# If unchanged:
HTTP/1.1 304 Not Modified
```

This reduces bandwidth usage for crawlers re-indexing your site and signals content stability.

## Cloudflare-specific configuration

Cloudflare provides CDN features particularly useful for agent optimization:

### Markdown for Agents

Convert HTML to Markdown at the CDN edge in real time. Enable in:
**Dashboard → Zone → Quick Actions → Markdown for Agents**

See [Markdown for Agents](/docs/markdown-for-agents) for full details.

### Cache rules

Fine-grained cache control via the Cloudflare dashboard (Rules → Cache Rules):

```
# Example: Cache docs pages for 1 hour
Match: URI path starts with /docs
Cache TTL: 3600
```

### Crawler hints via Cloudflare

Cloudflare's **Crawler Hints** feature (available on Pro+ plans) sends HTTP Early Hints and `IndexNow` pings to notify search engines and AI indexers of content updates immediately, without waiting for the next crawl cycle.

### Purge on deploy

When deploying content updates, purge the CDN cache for affected URLs:

```bash
# Cloudflare API purge
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json" \
  -d '{"files": ["https://example.com/docs/json-ld"]}'
```

Or purge the entire cache on deploy (simpler but slower to warm):
```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json" \
  -d '{"purge_everything": true}'
```

## IndexNow for instant indexing

**IndexNow** is an open protocol supported by Bing, Yandex, and increasingly other engines that allows you to notify crawlers of content changes in real time:

```bash
# Notify IndexNow of a new or updated page
curl "https://api.indexnow.org/indexnow?url=https://example.com/docs/json-ld&key=YOUR_KEY"
```

Submit your `key.txt` file to `https://yourdomain.com/{your-key}.txt` to verify ownership.

**For Next.js**, trigger IndexNow pings from your CMS webhook or deploy hook:

```typescript
async function notifyIndexNow(urls: string[]) {
  await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: "example.com",
      key: process.env.INDEXNOW_KEY,
      urlList: urls,
    }),
  });
}
```

## Compression

Ensure your server and CDN compress responses. Text content (HTML, Markdown, JSON) compresses very well:

- **Brotli** (preferred, 15–25% better than gzip for text)
- **gzip** (universal fallback)

Check with:
```bash
curl -H "Accept-Encoding: br, gzip" -I https://example.com/docs/json-ld
# Look for: Content-Encoding: br
```

## HTTP/2 and HTTP/3

Modern protocols reduce latency for parallel requests — important when crawlers fetch multiple pages simultaneously:

- **HTTP/2**: multiplexing, header compression, server push
- **HTTP/3** (QUIC): better performance on lossy networks; supported by Cloudflare

Most CDNs enable these by default. Verify with:
```bash
curl -I --http2 https://example.com
# Look for: HTTP/2 200
```

## Summary checklist

- [ ] `Cache-Control` headers set appropriately per content type
- [ ] `Vary: Accept` if serving different formats (HTML vs. Markdown)
- [ ] ETags configured for conditional request support
- [ ] CDN purge integrated with your deploy pipeline
- [ ] Cloudflare Markdown for Agents enabled (if on Cloudflare Pro+)
- [ ] IndexNow configured for instant crawl notification
- [ ] Brotli compression enabled
- [ ] HTTP/2 or HTTP/3 enabled
