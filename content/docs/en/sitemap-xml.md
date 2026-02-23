---
title: "sitemap.xml"
slug: "sitemap-xml"
description: "Why sitemap.xml matters for AI agents and how to optimize it."
category: "structured-data"
order: 4
publishedAt: "2025-02-15"
status: "published"
---

A `sitemap.xml` file tells search engines and AI crawlers about the pages on your site. While sitemaps have been a **SEO staple** for years, they are equally important for AI agents that need to discover your content efficiently.

## Why agents need your sitemap

AI crawlers (GPTBot, ClaudeBot, PerplexityBot) use sitemaps to:

- **Discover pages** they might not find through links alone.
- **Prioritize crawling** based on `<priority>` and `<lastmod>` signals.
- **Detect updates** without re-crawling unchanged pages.

## Basic structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/products</loc>
    <lastmod>2025-01-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

## Best practices for agents

1. **Include all public pages** — Every page you want agents to discover should be listed.
2. **Keep `<lastmod>` accurate** — Agents use this to decide if they need to re-read a page. Don't set it to "today" on every build.
3. **Use `<priority>`** — While not binding, it hints at which pages are most important.
4. **Generate dynamically** — Use your framework's built-in sitemap generation (Next.js `sitemap.ts`, Django sitemaps, etc.) to keep it in sync with your content.
5. **Reference in robots.txt** — Add `Sitemap: https://example.com/sitemap.xml` to your `robots.txt` so crawlers find it automatically.

## Sitemap and llms.txt

The sitemap lists **all pages** mechanically. The `llms.txt` file provides **curated context** about what matters most. Use both: sitemap for completeness, llms.txt for clarity.

## Common mistakes

- **Listing pages blocked by robots.txt** — If a page is disallowed, don't include it in the sitemap.
- **Stale sitemaps** — A sitemap with outdated `<lastmod>` values or missing pages is worse than no sitemap.
- **Too many URLs in one file** — For large sites, use a sitemap index to split into multiple files (max 50,000 URLs per file).
