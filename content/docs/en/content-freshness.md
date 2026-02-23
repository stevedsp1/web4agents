---
title: "Content Freshness"
slug: "content-freshness"
description: "How to signal content freshness to AI crawlers and search engines, and why recency matters for AI-generated answers."
category: "technical-seo"
order: 3
publishedAt: "2026-02-01"
status: "published"
---

## Why freshness matters for AI agents

AI systems — both crawlers building training datasets and real-time agents answering queries — have a strong preference for **recent, updated content**. There are two reasons:

1. **Accuracy**: Outdated information leads to wrong answers. AI systems are aware of this and down-rank stale content for time-sensitive queries.
2. **Training data cutoffs**: LLMs are trained on data up to a cutoff date. Content published after that cutoff can be surfaced via RAG (Retrieval-Augmented Generation) pipelines that fetch live data — but only if the content is indexed and clearly dated.

## The freshness signals stack

| Signal | Where | Consumed by |
|--------|-------|-------------|
| `datePublished` in JSON-LD | `<script type="application/ld+json">` | Googlebot, AI crawlers, RAG systems |
| `dateModified` in JSON-LD | Same | Same |
| `<meta name="date">` | `<head>` | Some crawlers |
| `Last-Modified` HTTP header | Server response | HTTP caches, crawlers |
| URL date pattern | URL path | User signal only — avoid for SEO |
| `<lastmod>` in sitemap.xml | `/sitemap.xml` | All major crawlers |
| Visible date on page | Page content | User trust, E-E-A-T |

## JSON-LD date fields

The most reliable way to signal freshness:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your Article Title",
  "datePublished": "2026-02-01T09:00:00+00:00",
  "dateModified": "2026-02-15T14:30:00+00:00",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  }
}
```

**Key rules:**
- Always use ISO 8601 format with timezone (`T09:00:00+00:00`)
- `dateModified` should reflect *meaningful* content updates, not formatting fixes
- Never backdate content — this signals to AI systems that you are manipulating freshness

## sitemap.xml `<lastmod>`

The `<lastmod>` tag in your sitemap is a primary freshness signal for crawlers deciding which pages to re-index:

```xml
<url>
  <loc>https://example.com/docs/json-ld</loc>
  <lastmod>2026-02-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

**In Next.js**, generate the sitemap dynamically so `lastmod` reflects the actual `updatedAt` from your content frontmatter:

```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await getDocEntries("en");
  return docs.map((doc) => ({
    url: `${baseUrl}/docs/${doc.slug}`,
    lastModified: new Date(doc.updatedAt ?? doc.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
}
```

## Last-Modified HTTP header

For servers and CDNs, set the `Last-Modified` header to signal freshness at the HTTP level:

```
HTTP/1.1 200 OK
Last-Modified: Thu, 15 Feb 2026 14:30:00 GMT
Cache-Control: public, max-age=3600
```

In Next.js App Router:

```typescript
export async function GET() {
  return new Response(content, {
    headers: {
      "Last-Modified": new Date(post.updatedAt).toUTCString(),
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
```

## Content refresh strategy

For documentation and blog posts, a structured refresh plan outperforms publishing new content haphazardly:

### Evergreen content (docs, guides)

- Review and update every 6–12 months
- Add a visible "Last updated" notice at the top
- Update `dateModified` in JSON-LD and `<lastmod>` in sitemap
- Signal updates in-page: "Updated February 2026: section on X revised to reflect..."

### News and time-sensitive content

- Publish with a precise `datePublished`
- Do not update after publication (to preserve date integrity)
- If a correction is needed, add an explicit correction notice and update `dateModified`

## Visible date signals on page

In addition to machine-readable signals, show the date visibly on the page:

```html
<time datetime="2026-02-01T09:00:00+00:00">February 1, 2026</time>
```

The `datetime` attribute gives machines the precise value; the text inside gives humans a readable format. Both matter.

## What to avoid

- **Hiding the publication date**: decreases user trust and removes a key freshness signal
- **Inflating `dateModified` on trivial edits**: gaming this signal undermines your credibility with AI systems
- **Stale content with no `dateModified`**: AI systems assume the content is as old as `datePublished`
- **Date in URL** as the sole freshness signal (e.g., `/blog/2024/01/15/article`): fragile and duplicates information better conveyed in JSON-LD

## Impact on AI-generated answers

AI systems generating answers prefer the most recent, authoritative source. If your content is well-dated and regularly updated, you are more likely to be cited. The combination that works best:

1. ISO 8601 `datePublished` and `dateModified` in JSON-LD
2. `<lastmod>` in sitemap.xml kept current
3. Visible `<time datetime="...">` on the page
4. Meaningful updates flagged in the content itself
