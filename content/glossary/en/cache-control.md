---
title: "Cache-Control"
slug: "cache-control"
type: "standard"
description: "HTTP header that defines how long and where a response can be cached (browsers, CDNs, intermediaries)."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["cdn-and-caching", "etag", "content-freshness"]
---

## Definition

The **Cache-Control** response header tells caches (browsers, CDNs, and sometimes crawler infrastructure) how to store and reuse the response. Common directives: `max-age=N` (cache for N seconds), `public` / `private`, `stale-while-revalidate`, `no-cache`, `no-store`. Well-chosen values balance freshness for updated content with reduced load and latency. For content that changes occasionally (e.g. blog posts), `max-age` with `stale-while-revalidate` is often used.

## Relevance to GEO

AI crawlers and retrieval systems may cache responses. Appropriate Cache-Control ensures they see updated content when it matters while avoiding unnecessary refetches. Use with ETag for conditional requests.
