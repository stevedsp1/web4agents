---
title: "sitemap.xml"
slug: "sitemap"
type: "standard"
description: "XML file that lists a site's URLs for crawlers and AI agents; supports discovery, priority, and lastmod for efficient indexing."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
website: "https://www.sitemaps.org"
relatedTerms: ["robots-txt", "geo", "content-freshness"]
---

## Definition

A **sitemap.xml** file is an XML document at a fixed URL (e.g. `https://example.com/sitemap.xml`) that lists the pages on a site. Each entry typically includes `<loc>`, optional `<lastmod>`, `<changefreq>`, and `<priority>`. Search engines and AI crawlers use it to discover pages, prioritize crawling, and detect updates without relying solely on links.

The sitemap should be referenced in `robots.txt` via `Sitemap: https://example.com/sitemap.xml`.

## Relevance to GEO

AI crawlers (GPTBot, ClaudeBot, PerplexityBot) use sitemaps to discover and re-crawl content. Keeping `<lastmod>` accurate and including all public pages improves agent discoverability and freshness signals.
