---
title: "noindex"
slug: "noindex"
type: "concept"
description: "Directive that instructs search engines and crawlers not to include a page in search or index results."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["robots-txt", "content-signals", "technical-seo"]
---

## Definition

**noindex** is a value for the `robots` meta tag (`<meta name="robots" content="noindex" />`) that tells crawlers not to add the page to search results or to their index. It applies at the page level (unlike `robots.txt`, which applies to paths). Typical uses: thank-you pages, duplicate listings, private or low-value content. It affects *indexing*; for what AI systems may *do* with content after access, use [Content Signals](/docs/content-signals).

## Relevance to GEO

Pages marked noindex are typically not used in AI-generated answers. Use noindex for pages you don't want discovered; combine with Content Signals when you allow crawl but want to restrict training or search use.
