---
title: "Core Web Vitals"
slug: "core-web-vitals"
type: "concept"
description: "Google's set of metrics for page experience: LCP (loading), INP (interactivity), CLS (visual stability)."
category: "core-concepts"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["geo", "performance", "schema-org"]
---

## Definition

**Core Web Vitals** are the metrics Google uses to measure real-world page experience. They influence traditional SEO and are increasingly relevant to AI systems that evaluate source quality. The three metrics are:

| Metric | Full name | What it measures | Target |
|--------|-----------|-------------------|--------|
| **LCP** | Largest Contentful Paint | Time until the largest visible element is rendered | < 2.5 s |
| **INP** | Interaction to Next Paint | Responsiveness to user input (replaced FID in 2024) | < 200 ms |
| **CLS** | Cumulative Layout Shift | Visual stability (how much the page jumps while loading) | < 0.1 |

Slow or unstable pages are crawled less reliably by AI retrieval crawlers and can be deprioritized as sources.

## Relevance to GEO

Good Core Web Vitals support faster crawling, higher crawl budget, and stronger trust signals for agents that assess content quality.
