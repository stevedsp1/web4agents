---
title: "LLM Indexing"
slug: "llm-indexing"
description: "How large language models index and use web content, and what it means for your site."
category: "crawlers"
order: 3
publishedAt: "2025-02-15"
status: "published"
---

Understanding how AI systems ingest and use web content helps you optimize your site for the best chance of being discovered, read, and cited by AI agents.

## Two types of AI indexing

### 1. Training-time indexing

LLMs like GPT-4, Claude, or Gemini were trained on large datasets of web content. During training, your content became part of the model's "knowledge". This is a one-time process (per training run) and you have limited influence over it — except by allowing or blocking the training crawlers in `robots.txt`.

**Timeframe**: content must have been online before the model's training cutoff date.

### 2. Retrieval-time indexing

Many AI systems (Perplexity, ChatGPT with browsing, Bing Copilot) retrieve live content at query time. They crawl your site in real-time when a user asks a relevant question.

**Timeframe**: content must be live and accessible now.

For most site owners, optimizing for **retrieval-time indexing** is more actionable and has faster impact.

## How retrieval works

1. User asks a question.
2. The AI system identifies relevant queries (search terms or URLs).
3. The crawler fetches the page content.
4. Content is chunked and passed to the LLM as context.
5. The LLM generates an answer, citing the source.

Your page must pass each step:

- **Crawlable** → not blocked by `robots.txt` or `noindex`.
- **Fast** → retrieval systems have short timeouts (often < 5s).
- **Clean text** → the crawler extracts text, not layout. Avoid content that only exists in JavaScript-rendered elements.
- **Quotable** → short, precise paragraphs work better than long, hedged prose.

## Differences from Googlebot

| | Googlebot | AI Retrieval Crawlers |
|--|-----------|----------------------|
| Indexes HTML | Yes | Yes |
| Renders JavaScript | Yes (partial) | Usually No |
| Uses structured data | Yes | Yes (partially) |
| Reads `llms.txt` | No | Yes |
| Respects `robots.txt` | Yes | Yes (most) |
| Frequency | Continuous | On-demand |
| Output | Search ranking | Answer generation |

**Key implication**: If your important content is rendered by JavaScript (client-side only), it may not be read by AI retrieval crawlers. Use server-side rendering or static HTML for content you want agents to read.

## How to be cited more often

### Write for quotability

AI systems quote verbatim or near-verbatim. Write sentences that stand alone:

- Define terms explicitly: "GEO (Generative Engine Optimization) is the practice of..."
- State facts clearly: "robots.txt is located at the root of your domain."
- Avoid hedged, vague language that loses meaning out of context.

### Use headings to chunk content

AI retrieval systems split pages into chunks before processing. Clear `<h2>` and `<h3>` headings help the system understand what each chunk is about and choose the right section.

### Keep content fresh

Retrieval systems prefer recent content for time-sensitive topics. Add publication and update dates to your pages and update them regularly.

### Build authority

For training-time citations, content from authoritative, widely-linked sites is overrepresented. For retrieval-time, freshness and relevance matter more.

## Knowledge cutoffs

Training-based models have a knowledge cutoff date (GPT-4o: April 2024, Claude 3.5: early 2024, etc.). Content published after that date is not in the model's base knowledge but can be retrieved live if the model supports browsing.

**Practical impact**: For topics that change frequently (prices, product availability, current events), a retrieval-enabled AI system is far more useful. Ensure your content is publicly accessible and indexed for these systems.
