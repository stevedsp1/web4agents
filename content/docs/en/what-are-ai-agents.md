---
title: "What Are AI Agents?"
slug: "what-are-ai-agents"
description: "A practical introduction to AI agents, how they browse the web, and why they are changing how content must be structured."
category: "getting-started"
order: 0
publishedAt: "2026-02-01"
status: "published"
---

## Definition

An AI agent is a software system that autonomously perceives its environment, reasons about it, and takes actions to achieve a defined goal — without requiring a human to validate each step. Unlike a classic chatbot that responds to a single question, an agent can execute multi-step tasks: search the web, read pages, extract data, fill in forms, call APIs, and synthesize a result.

In 2025–2026, the term "agent" encompasses a wide range of systems:

- **Research agents** that compile reports by browsing dozens of sources (Perplexity, ChatGPT deep research, Gemini Deep Research)
- **Coding agents** that read documentation and write code autonomously (Claude Code, GitHub Copilot Agent, Cursor)
- **Shopping agents** that compare prices and complete purchases on behalf of users
- **Customer support agents** integrated into SaaS platforms
- **Orchestration agents** that chain together specialized sub-agents

## How agents consume the web

Agents access the web in two main ways:

### 1. Via dedicated crawlers

Companies like OpenAI (GPTBot), Anthropic (ClaudeBot), Google (Googlebot-Extended, Google-Extended), Meta (Meta-ExternalAgent), and Perplexity (PerplexityBot) send crawlers to index the web and feed their models or RAG pipelines. These crawlers respect `robots.txt`, follow `sitemap.xml`, and harvest clean text.

### 2. Via real-time browsing

Agents can also browse live, either through headless browsers or CDN-layer content negotiation (such as Cloudflare's Markdown for Agents). They read your pages at the moment a user submits a query and extract the relevant information.

## The agent pipeline

When an agent reads your site, the typical pipeline is:

```
URL → HTTP fetch → HTML → (conversion to Markdown or text chunks) → tokenization → LLM context window
```

Each step introduces potential data loss. If your HTML is heavy (navigation, scripts, trackers), the useful content represents a small fraction of the tokens sent to the model. A page of 16,000 tokens in HTML can become 3,000 tokens in Markdown — an 80% reduction (source: Cloudflare, February 2026).

## What agents need from your site

| Need | Technical translation |
|------|----------------------|
| Understand what the page is about | Clear `<title>`, `<h1>`, Schema.org JSON-LD |
| Extract key data | Semantic HTML, machine-readable formats |
| Know the author and date | `author`, `datePublished` in JSON-LD |
| Trust the source | HTTPS, structured data, canonical URLs |
| Know usage permissions | `robots.txt`, `llms.txt`, Content Signals headers |
| Navigate related content | Internal linking, `sitemap.xml` |

## Traditional SEO vs. GEO

Agents and classic search engine bots have similar needs, but with key differences:

- **Context window**: Agents are limited by their context window. Concise, well-structured content is favored.
- **Execution**: An agent can interact with your site (clicks, forms). An SEO bot only indexes.
- **Frequency**: Agents browse in real time during a user session; crawlers index periodically.
- **Trust signals**: Schema.org data, `llms.txt`, and Content Signals policies carry more weight for agents than keyword density.

## Getting started

The following sections in this documentation walk you through everything needed to make your site agent-ready:

1. Review the [complete checklist](/docs/checklist) for a quick audit
2. Configure [robots.txt for AI agents](/docs/robots-txt)
3. Add [JSON-LD structured data](/docs/json-ld)
4. Publish an [llms.txt](/docs/llms-txt) file
5. Enable [Markdown for Agents](/docs/markdown-for-agents) via Cloudflare
