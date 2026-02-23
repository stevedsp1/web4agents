---
title: "HSTS (HTTP Strict Transport Security)"
slug: "hsts"
type: "concept"
description: "HTTP header that forces browsers and agents to use HTTPS for the site, preventing downgrade attacks and mixed content."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["https-and-security", "geo"]
---

## Definition

**HSTS (HTTP Strict Transport Security)** is a response header that instructs the client to always use HTTPS for the site for a given period. Example: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`. Once received, the browser or agent will not request HTTP for that domain. It prevents protocol downgrade attacks and ensures content is delivered over TLS. The **HSTS preload list** allows domains to be shipped as HTTPS-only in browsers.

## Relevance to GEO

HTTPS and HSTS are trust signals for AI crawlers; insecure or mixed content can lead to deprioritization or blocking. Security headers (HSTS, X-Frame-Options, CSP) support both user safety and agent trust.
