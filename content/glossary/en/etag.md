---
title: "ETag"
slug: "etag"
type: "concept"
description: "HTTP header that identifies a specific version of a resource; enables conditional requests and 304 Not Modified to save bandwidth."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["cdn-and-caching", "content-freshness"]
---

## Definition

An **ETag** (entity tag) is an opaque string returned in the `ETag` response header that identifies the current version of a resource (e.g. a hash of the content). On a subsequent request, the client can send `If-None-Match: "that-etag"`; if the resource is unchanged, the server responds with `304 Not Modified` and no body. This reduces bandwidth and lets crawlers check for updates without re-downloading full pages.

## Relevance to GEO

ETags help AI crawlers and CDNs avoid re-fetching unchanged content, reducing load and speeding up freshness checks. Use with `Cache-Control` for an effective caching and revalidation strategy.
