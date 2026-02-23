---
title: "Open Graph & Meta Tags"
slug: "open-graph"
description: "How Open Graph and meta tags help AI agents understand your pages."
category: "structured-data"
order: 3
publishedAt: "2025-02-15"
status: "published"
---

Open Graph (OG) meta tags were originally created by Facebook for link previews. Today, they are read by AI crawlers, chat applications, messaging platforms, and link-unfurling services to understand what a page is about.

## The basics

Open Graph tags live in your HTML `<head>`:

```html
<head>
  <meta property="og:title" content="How to optimize for AI agents" />
  <meta property="og:description" content="A practical guide to making your website agent-ready." />
  <meta property="og:url" content="https://example.com/blog/geo-guide" />
  <meta property="og:image" content="https://example.com/images/geo-guide.jpg" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Example Blog" />
</head>
```

## Essential tags

| Tag | Description | Required |
|-----|-------------|----------|
| `og:title` | Page title as it should appear when shared | Yes |
| `og:description` | Short description (1–2 sentences) | Yes |
| `og:url` | Canonical URL of the page | Yes |
| `og:image` | Preview image (minimum 1200×630px) | Yes |
| `og:type` | Content type: `website`, `article`, `product`… | Recommended |
| `og:site_name` | Name of your site | Recommended |

## Article-specific tags

For blog posts and news articles:

```html
<meta property="article:published_time" content="2025-01-15T00:00:00Z" />
<meta property="article:modified_time" content="2025-02-01T00:00:00Z" />
<meta property="article:author" content="https://example.com/authors/jane" />
<meta property="article:section" content="Technology" />
<meta property="article:tag" content="GEO" />
<meta property="article:tag" content="AI agents" />
```

## Standard meta tags

Beyond Open Graph, these standard tags are also read by AI systems:

```html
<meta name="title" content="Page title" />
<meta name="description" content="Page description." />
<meta name="author" content="Jane Smith" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://example.com/page" />
```

The `<title>` element (not a meta tag) is also critical — it is one of the strongest signals for what a page is about.

## Why this matters for GEO

When an AI retrieval system fetches your page, it reads:

1. `<title>` — The primary signal for page topic.
2. `og:title` and `og:description` — Secondary signals, especially when the title is too short.
3. `meta name="description"` — Fallback description used in citations.
4. `og:image` — Some AI systems display or reference your preview image.

Well-crafted meta tags increase the accuracy of how AI agents summarize and cite your content.

## Implementation in Next.js

Use the `metadata` export:

```tsx
export const metadata = {
  title: "How to optimize for AI agents",
  description: "A practical guide to making your website agent-ready.",
  openGraph: {
    title: "How to optimize for AI agents",
    description: "A practical guide to making your website agent-ready.",
    url: "https://example.com/blog/geo-guide",
    images: [{ url: "https://example.com/images/geo-guide.jpg" }],
    type: "article",
  },
};
```

Next.js generates all the necessary meta tags automatically from this object.

## Testing

- [Open Graph debugger (Meta)](https://developers.facebook.com/tools/debug/) — Validates OG tags and shows the preview.
- [Twitter Card Validator](https://cards-dev.twitter.com/validator) — Validates Twitter/X card markup.
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) — LinkedIn link preview validator.
