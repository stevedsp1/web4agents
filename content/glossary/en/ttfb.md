---
title: "TTFB (Time to First Byte)"
slug: "ttfb"
type: "concept"
description: "Time from the start of an HTTP request to the receipt of the first byte of the response; a core latency metric."
category: "core-concepts"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["core-web-vitals", "performance", "cdn-and-caching"]
---

## Definition

**TTFB (Time to First Byte)** is the time between the client (browser or crawler) sending a request and receiving the first byte of the response. It reflects server and network latency before any content is delivered. A high TTFB delays LCP and can cause AI crawlers with short timeouts to skip or truncate the page.

## Relevance to GEO

AI retrieval crawlers often use timeouts of a few seconds. Improving TTFB (e.g. via CDN, server tuning, edge rendering) increases the chance that full content is fetched and indexed for RAG or answers.
