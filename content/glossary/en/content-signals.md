---
title: "Content Signals"
slug: "content-signals"
type: "standard"
description: "Open framework for declaring content usage preferences to AI systems via HTTP headers or meta tags (ai-train, search, ai-input)."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
website: "https://contentsignals.org"
relatedTerms: ["robots-txt", "geo", "llms-txt"]
---

## Definition

**Content Signals** is an open framework (announced by Cloudflare in September 2025) that allows content publishers to express how their content may be used after it has been accessed by an AI system. It addresses a gap left by `robots.txt`: robots.txt controls *access* (can you crawl this?), but not what can be done with the content *after* access.

## The three dimensions

| Dimension | Key | Description |
|-----------|-----|-------------|
| **AI Training** | `ai-train` | May this content be used to train AI models? |
| **AI Search** | `search` | May this content appear in AI-generated search results? |
| **AI Input** | `ai-input` | May this content be included in LLM context (agentic use)? |

Each can be set to `yes`, `no`, or omitted. Declared via the `Content-Signal` HTTP header or the `<meta name="content-signal" content="...">` HTML tag.

## Relevance to GEO

Content Signals is a core GEO practice for expressing usage policy to crawlers and agents without blocking access. Use it alongside `robots.txt` and `llms.txt`.
