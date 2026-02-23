---
title: "Canonical URL"
slug: "canonical-url"
type: "concept"
description: "The preferred, authoritative URL for a page when multiple URLs point to the same or similar content."
category: "core-concepts"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["seo", "technical-seo", "hreflang"]
---

## Definition

A **canonical URL** is the single URL that a publisher designates as the authoritative version of a page. It is declared with `<link rel="canonical" href="https://example.com/page" />` in the HTML `<head>` (or via HTTP headers). Crawlers and agents use it to avoid duplicate-content confusion when the same content is reachable via different URLs (parameters, www vs non-www, pagination, syndication).

## Relevance to GEO

AI crawlers and RAG indexers benefit from a single canonical URL per logical page: it clarifies which URL to store, cite, and return in answers. Always set canonicals on paginated, parameterized, or multi-domain variants.
