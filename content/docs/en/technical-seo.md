---
title: "Technical SEO for Agents"
slug: "technical-seo"
description: "Core technical SEO practices — canonical URLs, meta tags, pagination, hreflang — and how they apply to AI agent optimization."
category: "technical-seo"
order: 1
publishedAt: "2026-02-01"
status: "published"
---

## Why technical SEO still matters for agents

Traditional technical SEO practices were designed to help search engine bots crawl and understand your site. These same signals are now consumed by AI crawlers and agents. A technically sound site is better indexed, better understood, and more reliably cited.

The key difference: AI agents care less about keyword placement and more about **clarity**, **structure**, and **machine-readable metadata**.

## Canonical URLs

A canonical URL (`<link rel="canonical">`) tells crawlers and agents which version of a page is the authoritative one, eliminating duplicate content confusion.

```html
<head>
  <link rel="canonical" href="https://example.com/blog/my-article" />
</head>
```

**When to use it:**
- Paginated pages (use canonical on page 1 for shallow crawlers)
- URL parameters (`?sort=date`, `?utm_source=...`)
- HTTP vs. HTTPS, www vs. non-www
- Syndicated content published on multiple domains

**In Next.js App Router:**

```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: "https://example.com/blog/my-article",
  },
};
```

## Meta robots

The `robots` meta tag controls indexing at the page level, without modifying `robots.txt`:

```html
<meta name="robots" content="index, follow" />
```

Common directives:

| Directive | Meaning |
|-----------|---------|
| `index` | Allow indexing (default) |
| `noindex` | Exclude from search results |
| `follow` | Follow links on this page (default) |
| `nofollow` | Do not follow links |
| `noarchive` | Do not cache/archive the page |
| `noimageindex` | Do not index images on this page |

**For AI crawlers specifically**, some engines respect dedicated meta tags:

```html
<!-- Prevent use in AI training (Google, OpenAI — partial support) -->
<meta name="googlebot" content="noai" />
```

Note: For complete AI usage policy control, use [Content Signals](/docs/content-signals) headers in parallel.

## Title and meta description

While not a direct ranking factor for agents, the `<title>` and `meta description` are used as fallbacks when no structured data is present:

```html
<title>Complete Guide to robots.txt | Web4Agents Docs</title>
<meta name="description" content="Learn how to configure robots.txt for AI crawlers, with syntax examples and best practices for 2026." />
```

**Best practices:**
- `<title>`: 50–60 characters, descriptive, include the site name
- `description`: 150–160 characters, summarizes the page content accurately
- Avoid duplicate titles across pages — agents use them to differentiate content

## Hreflang for multilingual sites

If your site serves content in multiple languages, `hreflang` tags signal the locale variant to crawlers:

```html
<link rel="alternate" hreflang="en" href="https://example.com/en/article" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/article" />
<link rel="alternate" hreflang="x-default" href="https://example.com/article" />
```

**Important for agents**: AI systems surfacing content to users in a specific language will prefer pages tagged with the correct `hreflang`. Always add `x-default` to indicate the fallback.

## Pagination

For paginated content (blog archives, product listings), signal the structure clearly:

```html
<!-- On page 2 -->
<link rel="prev" href="https://example.com/blog?page=1" />
<link rel="next" href="https://example.com/blog?page=3" />
```

Modern recommendation: combine with proper `sitemap.xml` entries for each page and use canonical tags to point to the canonical "view-all" if it exists.

## noindex and noarchive for dynamic content

Certain pages should be excluded from agent indexes:

```html
<!-- Search results, user dashboards, private pages -->
<meta name="robots" content="noindex, nofollow" />
```

Typical pages to `noindex`:
- Internal search result pages
- User dashboards and account pages
- Staging / preview versions
- Thank-you and confirmation pages
- Duplicate filtered views (e.g., `/products?color=blue`)

## Core Web Vitals and Page Experience

Google's Page Experience signals (Core Web Vitals, HTTPS, mobile-friendly) remain ranking factors for traditional SEO, and increasingly for AI systems that evaluate content quality:

- **LCP** (Largest Contentful Paint): target < 2.5s
- **INP** (Interaction to Next Paint): target < 200ms (replaced FID in 2024)
- **CLS** (Cumulative Layout Shift): target < 0.1

See [Performance & Core Web Vitals](/docs/performance) for implementation details.

## Structured URL architecture

A clean URL architecture helps both users and agents navigate your site:

**Good:**
```
/blog/how-to-optimize-for-ai-agents
/docs/json-ld
/glossary/schema-org
```

**Avoid:**
```
/page?id=42&cat=3
/b/2026/02/15/post_title.html
```

Rules:
- Use lowercase letters and hyphens only
- Reflect the content hierarchy in the path
- Keep URLs short and descriptive
- Avoid session IDs and tracking parameters in canonical URLs

## Recommended checklist

- [ ] `<link rel="canonical">` on every page
- [ ] `<title>` unique and descriptive (50–60 chars)
- [ ] `meta description` unique and accurate (150–160 chars)
- [ ] `noindex` on non-indexable pages
- [ ] `hreflang` if multilingual
- [ ] Clean URL structure (no dynamic parameters in canonical)
- [ ] HTTPS on all pages
- [ ] Core Web Vitals score: Green on all three metrics
- [ ] Validate with [Google Search Console](https://search.google.com/search-console) and [Rich Results Test](https://search.google.com/test/rich-results)
