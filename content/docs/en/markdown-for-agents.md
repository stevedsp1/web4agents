---
title: "Markdown for Agents"
slug: "markdown-for-agents"
description: "How to serve Markdown directly to AI agents instead of HTML, reducing token usage by up to 80% and improving content quality."
category: "agent-config"
order: 3
publishedAt: "2026-02-12"
status: "published"
---

## Why Markdown matters for agents

Feeding raw HTML to an AI is costly and imprecise. A simple heading `## About Us` costs roughly 3 tokens in Markdown; its HTML equivalent — `<h2 class="section-title">About Us</h2>` — burns 12 to 15 tokens, and that's before accounting for `<nav>`, `<footer>`, scripts, and tracking pixels that inflate every real web page with zero semantic value.

**Concrete example**: The Cloudflare blog post announcing this feature takes 16,180 tokens in HTML and 3,150 tokens converted to Markdown — an **80% reduction**.

Markdown has become the de facto format for AI systems. Its explicit structure is ideal for LLM processing: headings create clear sections, bold and italics signal emphasis, code blocks are unambiguous. The problem is that the web is built in HTML, not Markdown, and the conversion process wastes computation, adds latency, and may not reflect how content creators intend their material to be used.

## Cloudflare Markdown for Agents (February 2026)

Cloudflare launched **Markdown for Agents** in February 2026: a feature that automatically converts HTML to Markdown at the CDN level, in real time, using HTTP content negotiation.

When an AI agent requests a page from a Cloudflare-protected site with the feature enabled, it can declare its preference for Markdown in the `Accept` header. Cloudflare intercepts the request, fetches the HTML from the origin, converts it to Markdown, and returns it to the agent — with no changes needed to your server.

### How it works

```
AI Agent → Accept: text/markdown → Cloudflare Edge
                                        ↓
                               Fetch HTML from origin
                                        ↓
                               Convert to Markdown
                                        ↓
AI Agent ← text/markdown response ←────┘
```

### Usage example

**curl:**

```bash
curl https://yourdomain.com/your-page \
  -H "Accept: text/markdown"
```

**TypeScript (Cloudflare Workers):**

```typescript
const response = await fetch("https://yourdomain.com/your-page", {
  headers: {
    Accept: "text/markdown, text/html",
  },
});

const tokenCount = response.headers.get("x-markdown-tokens");
const markdown = await response.text();
```

### Response headers

The Markdown response includes two notable headers:

| Header | Value | Description |
|--------|-------|-------------|
| `Content-Type` | `text/markdown; charset=utf-8` | Response format |
| `x-markdown-tokens` | `725` (example) | Estimated token count — useful for chunking strategy |
| `Vary` | `accept` | Indicates the response varies by Accept header |
| `Content-Signal` | `ai-train=yes, search=yes, ai-input=yes` | Content Signals policy |

### Enabling on Cloudflare

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your account, then your zone
3. In **Quick Actions**, toggle **Markdown for Agents** to enable
4. Available in **Beta at no cost** for Pro, Business, and Enterprise plans (as of February 2026)

## Content Signals integration

Markdown for Agents responses automatically include the `Content-Signal` header, signaling that content can be used for AI training, search, and AI input. This is part of the [Content Signals](https://contentsignals.org/) framework — see the dedicated [Content Signals](/docs/content-signals) doc for details.

## Who is already sending Accept: text/markdown?

As of early 2026, major AI agents already send these headers:

- **Claude Code** (Anthropic)
- **OpenCode**
- Most OpenAI browsing agents

Cloudflare Radar now tracks the distribution of content types returned to AI crawlers, including Markdown responses, via the [AI Insights](https://radar.cloudflare.com/ai-insights) page.

## Alternative conversion solutions

If Cloudflare Markdown for Agents is not available for your setup:

| Solution | Description |
|----------|-------------|
| **Cloudflare Browser Rendering `/markdown` API** | Renders a dynamic page in a real browser, then converts to Markdown |
| **Cloudflare Workers AI `AI.toMarkdown()`** | Supports multiple document types (HTML, PDF, DOCX, etc.) |
| **Serve a static `/page.md` alongside `/page`** | Your server returns Markdown for `Accept: text/markdown` requests |
| **Manual llms.txt** | A simplified Markdown summary of your site (see [llms.txt](/docs/llms-txt)) |

## Implementing content negotiation yourself

If you manage your own server (Node.js, Python, Go, etc.), you can implement `Accept: text/markdown` negotiation:

```typescript
// Next.js App Router example
export async function GET(request: Request) {
  const accept = request.headers.get("accept") ?? "";

  if (accept.includes("text/markdown")) {
    const markdown = await getPageMarkdown(); // your own conversion
    return new Response(markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Vary": "accept",
        "Content-Signal": "ai-train=yes, search=yes, ai-input=yes",
      },
    });
  }

  // Default HTML response
  return new Response(await getPageHtml(), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
```

## Key takeaways

- Markdown reduces token usage by 60–80% compared to HTML
- Content negotiation via `Accept: text/markdown` is becoming a standard
- Cloudflare Markdown for Agents enables this with zero server changes
- The `x-markdown-tokens` header helps agents manage context window limits
- Always accompany Markdown responses with Content Signals headers
