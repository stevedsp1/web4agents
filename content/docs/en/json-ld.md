---
title: "JSON-LD"
slug: "json-ld"
description: "How to implement JSON-LD structured data in your HTML for AI agents and search engines."
category: "structured-data"
order: 2
publishedAt: "2025-02-15"
status: "published"
---

JSON-LD (JavaScript Object Notation for Linked Data) is the recommended format for adding structured data to your web pages. It embeds Schema.org data in a `<script>` tag, keeping it separate from your page's visual content.

## Why JSON-LD?

- **Decoupled from HTML** — No need to add attributes to every element. One script block handles all structured data.
- **Easy to update** — Change the data in one place without touching the layout.
- **Preferred by Google and AI systems** — JSON-LD is the format recommended by Google and supported by AI retrieval systems.
- **Framework-friendly** — Easy to generate dynamically in Next.js, Nuxt, Django, etc.

## Basic structure

```html
<head>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "My Page Title",
    "description": "A description of my page."
  }
  </script>
</head>
```

The `@context` is always `"https://schema.org"`. The `@type` defines the Schema.org type.

## Multiple JSON-LD blocks

You can have multiple `<script type="application/ld+json">` blocks on the same page:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Acme Corp",
  "url": "https://example.com"
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Acme Corp",
  "url": "https://example.com"
}
</script>
```

Or combine them with `@graph`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Acme Corp",
      "url": "https://example.com"
    },
    {
      "@type": "WebSite",
      "name": "Acme Corp",
      "url": "https://example.com"
    }
  ]
}
</script>
```

## Implementation in Next.js

In the App Router, add JSON-LD directly in a Server Component:

```tsx
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "My article title",
    "datePublished": "2025-01-15"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* page content */}
    </>
  );
}
```

## Dynamic generation

For blog posts, products, or other dynamic content, generate JSON-LD from your data:

```ts
function articleJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt ?? post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author
    }
  };
}
```

## Common types

See the [Schema.org guide](/docs/schema-org) for the most useful types and their full property sets.

## Validation

After adding JSON-LD to your pages:

1. Open [Google Rich Results Test](https://search.google.com/test/rich-results).
2. Enter your URL or paste your HTML.
3. Fix any errors or warnings reported.

Always validate after adding or changing JSON-LD — malformed JSON breaks silently and won't be read by agents.
