---
title: "Monitoring Citations"
slug: "monitoring-citations"
description: "How to track when your site is cited in AI-generated answers and measure your AI visibility."
category: "analytics"
order: 2
publishedAt: "2025-02-15"
status: "published"
---

When an AI system like ChatGPT, Perplexity, or Claude answers a question using your content, that's a citation — the AI equivalent of a search ranking. Monitoring citations helps you measure your GEO effectiveness and understand your influence in the AI-powered web.

## What counts as a citation?

- **Named source**: "According to web4agents.org…"
- **Inline link**: A clickable source link in the AI answer.
- **Referral click**: A user clicking through from an AI answer to your site.
- **Training influence**: Your content shapes an answer without explicit attribution (hard to measure).

## Manual spot-checking

The simplest starting point: ask AI systems directly about your topic and check if your site is cited.

### ChatGPT / GPT-4

Ask questions where you expect to rank:

```
"What is llms.txt?"
"How do I optimize my website for AI agents?"
"What is GEO?"
```

Enable web browsing (GPT-4o with browsing) to see live retrieval citations.

### Perplexity

Perplexity is the most transparent about sources — it always shows numbered citations. Check:

1. Go to [perplexity.ai](https://perplexity.ai).
2. Ask a question in your domain.
3. Check if your site appears in the sources panel.

### Claude (Anthropic)

Claude doesn't browse by default but Claude.ai Pro has a web search feature. Test with questions in your niche.

### Bing Copilot

Bing Copilot cites sources clearly. Search via Bing for queries where you want to appear.

## Perplexity referral traffic

Perplexity sends HTTP referrer headers. In your analytics, filter by source:

- `perplexity.ai` — Direct referrals from Perplexity answers.

Track this monthly. An increase indicates your content is being cited more often.

## SearchGPT / ChatGPT Search

OpenAI's search product (SearchGPT) sends traffic with referrers from `chatgpt.com` or `openai.com`. Monitor these in GA4 or your server logs.

## Branded search volume

When your site is cited by AI systems, more people search for your brand directly. Monitor branded search volume in Google Search Console:

1. Go to **Search Console** → **Performance** → **Search results**.
2. Filter by **Query** containing your brand name.
3. Track impressions and clicks over time.

A rise in branded searches after AI citations is a measurable proxy for AI visibility.

## Mention monitoring tools

These tools track brand mentions across the web, including AI-adjacent content:

- [Google Alerts](https://alerts.google.com) — Free. Email alerts for your brand name or key phrases.
- [Brand24](https://brand24.com) — Tracks mentions in social media, news, and increasingly AI-generated content.
- [Mention.com](https://mention.com) — Similar to Brand24.

Set up alerts for:
- Your domain name (`web4agents.org`)
- Your brand name (`Web4Agents`)
- Your key coined terms (e.g., `agent-ready web`)

## Tracking `llms.txt` effectiveness

After publishing `llms.txt`, check if AI systems use it:

1. Ask an AI system: "What does web4agents.org do?" — does the answer reflect your `llms.txt` description?
2. Check your server logs for requests to `/llms.txt`.

```bash
grep "llms.txt" /var/log/nginx/access.log | awk '{print $1, $4}' | sort | uniq -c
```

## Building an GEO metrics dashboard

Combine these data sources into a monthly report:
- AI crawler hits (server logs)
- AI referral traffic (analytics)
- Branded search volume (Search Console)
- Manual citation spot-checks (Perplexity, ChatGPT, Claude)

This gives you a rounded view of your AI visibility — even before dedicated GEO analytics tools become mainstream.
