---
title: "Crawl budget"
slug: "crawl-budget"
type: "concept"
description: "The limited time or number of URLs a crawler allocates to a site; efficient pages get more of the budget."
category: "core-concepts"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["sitemap", "performance", "ttfb"]
---

## Definition

**Crawl budget** is the concept that crawlers (including AI crawlers) limit how much they request from a given domain — by total time, number of URLs per session, or rate. Slow or low-value pages consume more budget per URL; fast, well-linked, and frequently updated pages tend to get crawled more often. Improving TTFB, reducing redirects, and keeping a clear sitemap help crawlers use their budget on your most important content.

## Relevance to GEO

AI retrieval crawlers have short timeouts and limited sessions. Faster pages and clear structure mean more of your content gets indexed and is available for RAG and AI answers.
