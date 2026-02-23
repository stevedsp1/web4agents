---
title: "Markdown for Agents"
slug: "markdown-for-agents"
type: "concept"
description: "Serving Markdown to AI agents via content negotiation (Accept: text/markdown), reducing token usage and improving extraction."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["content-signals", "rag", "content-negotiation"]
---

## Definition

**Markdown for Agents** refers to serving Markdown (instead of HTML) to AI agents when they request it, typically via the `Accept: text/markdown` HTTP header (content negotiation). Markdown is the de facto format for many AI systems: headings, lists, and code blocks are unambiguous and token-efficient. Converting HTML to Markdown at the edge (e.g. Cloudflare’s feature, February 2026) can reduce token count by ~60–80% and improve extraction quality.

## Relevance to GEO

Serving Markdown to agents reduces their processing cost and can increase the chance your content is fully and accurately used. Pair with the `Vary: Accept` header so caches don’t serve the wrong format, and with Content Signals headers on the response.
