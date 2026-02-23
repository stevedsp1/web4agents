---
title: "Content Signals"
slug: "content-signals"
description: "The Content Signals framework: how to declare your content usage preferences to AI agents using HTTP headers and HTML meta tags."
category: "agent-config"
order: 4
publishedAt: "2026-02-01"
status: "published"
---

## What are Content Signals?

**Content Signals** is an open framework (announced by Cloudflare in September 2025) that allows any content publisher to express their preferences for how their content can be used after it has been accessed by an AI system.

The official specification is maintained at [contentsignals.org](https://contentsignals.org/).

It addresses a fundamental problem: `robots.txt` controls *access* (can you crawl this?), but has no mechanism to express what can be done with the content *after* access. Content Signals fills this gap.

## The three permission dimensions

| Dimension | Key | Description |
|-----------|-----|-------------|
| **AI Training** | `ai-train` | Can this content be used to train AI models? |
| **AI Search** | `search` | Can this content appear in AI-generated search results? |
| **AI Input** | `ai-input` | Can this content be included in LLM context windows (agentic use)? |

Each dimension can be set to `yes`, `no`, or omitted (meaning not specified).

## Declaring Content Signals

### Via HTTP response header

The `Content-Signal` header is the primary method:

```
Content-Signal: ai-train=yes, search=yes, ai-input=yes
```

Other examples:

```
# Allow search results but prohibit training and agentic use
Content-Signal: ai-train=no, search=yes, ai-input=no

# Prohibit all AI usage
Content-Signal: ai-train=no, search=no, ai-input=no

# Allow everything
Content-Signal: ai-train=yes, search=yes, ai-input=yes
```

### Via HTML meta tag

For pages where you cannot control response headers:

```html
<meta name="content-signal" content="ai-train=no, search=yes, ai-input=yes" />
```

### In llms.txt

You can declare a site-wide policy directly in your `llms.txt`:

```
# Content Signal
content-signal: ai-train=no, search=yes, ai-input=yes
```

## Content Signals and Markdown for Agents

When Cloudflare's **Markdown for Agents** feature converts your HTML to Markdown, it automatically includes a permissive `Content-Signal` header in the response:

```
Content-Signal: ai-train=yes, search=yes, ai-input=yes
```

Future versions of Markdown for Agents will allow you to define custom Content Signal policies per zone in the Cloudflare dashboard.

## Relationship with robots.txt and noindex

These tools are complementary, not redundant:

| Tool | Controls |
|------|---------|
| `robots.txt` | Whether a bot can *crawl* a URL |
| `noindex` meta tag | Whether a page appears in *traditional* search results |
| `Content-Signal` header | What AI systems can *do* with the content after accessing it |

You can block crawling via `robots.txt` and still declare Content Signals for content that is legitimately accessed. Conversely, you may allow crawling but prohibit AI training.

## Implementing in Next.js

### Global header in next.config.js

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Signal",
            value: "ai-train=no, search=yes, ai-input=yes",
          },
        ],
      },
    ];
  },
};
```

### Per-page in a Route Handler

```typescript
export async function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/html",
      "Content-Signal": "ai-train=yes, search=yes, ai-input=yes",
    },
  });
}
```

## Ecosystem adoption

As of early 2026, Content Signals is supported by:

- **Cloudflare** (Markdown for Agents automatically includes the header)
- **contentsignals.org** (the open specification)

Adoption by AI labs (OpenAI, Anthropic, Google) for automatic compliance is still in progress. However, declaring your policy now ensures you are positioned as standards evolve, and it provides legal and contractual clarity.

## Recommendation

Define and declare a Content Signal policy for your site. Start with a permissive policy if your content is meant to be publicly discoverable:

```
Content-Signal: ai-train=no, search=yes, ai-input=yes
```

This allows AI systems to surface your content in search results and use it in agent responses, without granting blanket rights to use it as training data.
