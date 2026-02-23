---
title: "Schema.org"
slug: "schema-org"
description: "How to use Schema.org vocabulary to help AI agents understand your content."
category: "structured-data"
order: 1
publishedAt: "2025-02-15"
status: "published"
---

Schema.org is a shared vocabulary for describing the meaning of web content. It is used by Google, Bing, AI crawlers, and other data consumers to understand what your pages are about — not just their text, but their structure and semantics.

## What Schema.org does

Without structured data, an AI agent reading your page must infer meaning from context. With Schema.org, you explicitly tell it:

- "This page is about a **product** named X, priced at Y."
- "This page is an **article** written by Z on date D."
- "This page belongs to an **organization** with these contact details."

This removes ambiguity and increases the chance of accurate citations.

## Core types for agent-ready sites

### Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Acme Corp",
  "url": "https://example.com",
  "description": "We make widgets for the automotive industry.",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@example.com",
    "contactType": "customer service"
  }
}
```

Add to every page or your homepage. Helps agents know who runs the site.

### WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Acme Corp",
  "url": "https://example.com",
  "description": "Widgets for the automotive industry."
}
```

### Article / BlogPosting

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "How to choose the right widget",
  "datePublished": "2025-01-15",
  "dateModified": "2025-02-01",
  "author": {
    "@type": "Person",
    "name": "Jane Smith"
  },
  "description": "A practical guide to widget selection."
}
```

### Product

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Pro Widget X200",
  "description": "Industrial-grade widget for high-torque applications.",
  "offers": {
    "@type": "Offer",
    "price": "149.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}
```

Critical for e-commerce. AI agents retrieve product data in real-time; structured data makes it unambiguous.

### FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is GEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GEO (Generative Engine Optimization) is the practice of optimizing web content for AI agents and generative AI systems."
      }
    }
  ]
}
```

FAQ markup is especially valuable for GEO — it provides ready-to-cite question-and-answer pairs.

### BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com" },
    { "@type": "ListItem", "position": 2, "name": "Docs", "item": "https://example.com/docs" },
    { "@type": "ListItem", "position": 3, "name": "Schema.org" }
  ]
}
```

Helps agents understand where a page fits in your site hierarchy.

## Implementation methods

Schema.org can be implemented as:

1. **JSON-LD** (recommended) — A `<script>` tag in your HTML `<head>`. [See the JSON-LD guide](/docs/json-ld).
2. **Microdata** — Inline attributes on HTML elements. More complex, rarely used today.
3. **RDFa** — Similar to Microdata. Used in some CMS ecosystems.

**JSON-LD is preferred** because it keeps structured data separate from presentation, is easy to maintain, and is the format most AI systems prefer.

## Validation

After implementing Schema.org:

1. [Google Rich Results Test](https://search.google.com/test/rich-results) — Validates JSON-LD and shows which rich result types your page qualifies for.
2. [Schema.org Validator](https://validator.schema.org) — General Schema.org validation.
3. [Bing Webmaster Tools](https://www.bing.com/webmasters) — Bing's structured data validator.
