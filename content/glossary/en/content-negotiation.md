---
title: "Content negotiation"
slug: "content-negotiation"
type: "concept"
description: "HTTP mechanism by which the client indicates preferred response format (e.g. Accept: text/markdown) and the server returns the matching format."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["markdown-for-agents", "cdn-and-caching"]
---

## Definition

**Content negotiation** is the process where the client sends preferences (e.g. `Accept: text/markdown` or `Accept: text/html`) and the server responds with the appropriate format. For GEO, agents can request `Accept: text/markdown` to receive Markdown instead of HTML, reducing tokens and improving parsing. If the server returns different content based on `Accept`, it must send `Vary: Accept` so caches (CDNs, proxies) do not serve the wrong version to another client.

## Relevance to GEO

Content negotiation allows a single URL to serve HTML to browsers and Markdown to agents. Implementing it (or using CDN-level Markdown for Agents) is an optional but high-impact GEO improvement.
