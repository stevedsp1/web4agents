---
title: "IndexNow"
slug: "indexnow"
type: "standard"
description: "Open protocol to notify search engines and crawlers of URL changes in real time for faster indexing."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
website: "https://www.indexnow.org"
relatedTerms: ["sitemap", "content-freshness", "cdn-and-caching"]
---

## Definition

**IndexNow** is an open protocol supported by Bing, Yandex, and increasingly other engines that allows publishers to notify crawlers when content is added or updated. Instead of waiting for the next crawl, you submit URLs (and an optional key file for verification); supported crawlers can then fetch and index those URLs immediately.

Typical use: POST to `https://api.indexnow.org/indexnow` with host, key, and urlList. Ownership is verified via a key file at `https://yourdomain.com/{key}.txt`.

## Relevance to GEO

Faster indexing helps AI retrieval systems and RAG pipelines see new or updated content sooner. IndexNow complements sitemap `<lastmod>` and is often used with CDN or deploy hooks.
