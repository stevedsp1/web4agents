---
title: "User-agent"
slug: "user-agent"
type: "concept"
description: "HTTP request header that identifies the crawler or client (e.g. GPTBot, ClaudeBot); used in robots.txt rules and analytics."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["robots-txt", "tracking-agent-traffic", "ai-crawlers-overview"]
---

## Definition

The **User-agent** (or `User-Agent`) is an HTTP request header that identifies the client making the request: browser name and version, or crawler name (e.g. `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`). In `robots.txt`, rules are defined per `User-agent` so you can allow or disallow specific crawlers. In server logs and analytics, filtering by User-agent lets you measure which AI crawlers visit your site and which pages they request.

## Relevance to GEO

Correctly configuring `robots.txt` by User-agent controls which AI crawlers may access your content. Tracking User-agent in logs helps you monitor GEO effectiveness and crawl patterns.
