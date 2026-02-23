---
title: "Overview of AI Crawlers"
slug: "ai-crawlers-overview"
description: "A reference guide to the main AI crawlers: who they are, what they do, and how to identify them."
category: "crawlers"
order: 1
publishedAt: "2025-02-15"
status: "published"
---

AI companies run dedicated web crawlers to collect content for training, real-time retrieval, and agent use. As a site owner, knowing which crawlers exist and what they do is the first step to controlling how your content is used.

## Major AI crawlers

### GPTBot (OpenAI)

- **User-agent**: `GPTBot`
- **Purpose**: Training data collection and real-time retrieval for ChatGPT and OpenAI APIs.
- **Documentation**: [platform.openai.com/docs/gptbot](https://platform.openai.com/docs/gptbot)
- **IP ranges**: Published by OpenAI and verifiable via reverse DNS.

OpenAI also runs `ChatGPT-User` for browsing plugin requests (user-initiated, not background crawling).

### ClaudeBot (Anthropic)

- **User-agent**: `Claude-Web` (older) / `ClaudeBot`
- **Purpose**: Training and improving Claude models.
- **Documentation**: [anthropic.com/robots](https://www.anthropic.com/robots)
- **Behavior**: Generally respectful of `robots.txt`.

### PerplexityBot

- **User-agent**: `PerplexityBot`
- **Purpose**: Real-time web search for Perplexity AI answers.
- **Documentation**: Check Perplexity's current docs for the latest user-agent string.
- **Behavior**: Active crawler for live answer synthesis.

### Google-Extended

- **User-agent**: `Google-Extended`
- **Purpose**: Training data for Google's AI products (Gemini, Bard).
- **Note**: Separate from Googlebot (standard search). Blocking `Google-Extended` does not affect Google Search ranking.
- **Documentation**: [Google Search Central](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers)

### Applebot-Extended

- **User-agent**: `Applebot-Extended`
- **Purpose**: Training Apple Intelligence models.
- **Note**: Introduced in 2024. Blocking it does not affect Spotlight or Safari search.

### Common Crawl

- **User-agent**: `CCBot`
- **Purpose**: Open dataset used by many AI companies for training (including early OpenAI and EleutherAI models).
- **Documentation**: [commoncrawl.org](https://commoncrawl.org)
- **Note**: Does not respect `robots.txt` in all configurations. Very high crawl volume.

### Bytespider (ByteDance / TikTok)

- **User-agent**: `Bytespider`
- **Purpose**: Training data for ByteDance AI products.
- **Note**: Known for aggressive crawling; often blocked by site owners.

## Summary table

| Crawler | Company | User-agent | Respects robots.txt |
|---------|---------|-----------|---------------------|
| GPTBot | OpenAI | `GPTBot` | Yes |
| ClaudeBot | Anthropic | `ClaudeBot` | Yes |
| PerplexityBot | Perplexity | `PerplexityBot` | Yes |
| Google-Extended | Google | `Google-Extended` | Yes |
| Applebot-Extended | Apple | `Applebot-Extended` | Yes |
| CCBot | Common Crawl | `CCBot` | Partially |
| Bytespider | ByteDance | `Bytespider` | Partially |

## How to identify crawlers in your logs

Look for these strings in your server access logs:

```
grep -i "gptbot\|claudebot\|perplexitybot\|google-extended\|ccbot\|bytespider" access.log
```

In Google Analytics 4, you can create a segment filtering by the `user-agent` dimension (if you collect it via a custom dimension or server-side tagging).

## What to do next

- Control access with [robots.txt for AI Agents](/docs/robots-txt).
- Describe your content with [llms.txt](/docs/llms-txt) so agents that do crawl understand your site.
