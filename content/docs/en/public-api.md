---
title: "Public API"
slug: "public-api"
description: "JSON API reference for the Web4Agents glossary and blog content."
category: "protocols"
order: 3
publishedAt: "2025-02-15"
status: "published"
---

Web4Agents exposes a public JSON API for programmatic access to glossary entries and blog posts. It is intended for AI agents, developers, and tools that need structured access to the content.

## Base URL

```
https://web4agents.org
```

## Authentication

The API is public and requires no authentication. Rate limiting applies.

## Rate limits

- **60 requests per minute** per IP address (GET endpoints).
- Exceeding the limit returns HTTP `429 Too Many Requests`.

## Endpoints

### Glossary

#### List all entries

```
GET /api/glossary
GET /api/glossary?locale=en
GET /api/glossary?locale=en&type=concept
```

**Query parameters**:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `locale` | string | `en` | Content locale |
| `type` | string | — | Filter by type: `concept`, `tool`, `actor`, `standard` |

**Response** (200):

```json
{
  "entries": [
    {
      "slug": "geo",
      "title": "GEO",
      "description": "Generative Engine Optimization...",
      "type": "concept",
      "publishedAt": "2025-01-01",
      "updatedAt": "2025-02-01"
    }
  ]
}
```

#### Get a single entry

```
GET /api/glossary/{slug}
GET /api/glossary/geo?locale=en
```

**Path parameters**: `slug` — the entry identifier.

**Response** (200):

```json
{
  "slug": "geo",
  "title": "GEO",
  "description": "Generative Engine Optimization is the practice of...",
  "type": "concept",
  "publishedAt": "2025-01-01",
  "updatedAt": "2025-02-01",
  "bodyHtml": "<p>Full HTML content...</p>"
}
```

**Response** (404):

```json
{ "error": "Not found" }
```

### Blog

#### List all posts

```
GET /api/blog
GET /api/blog?locale=en
```

**Query parameters**:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `locale` | string | `en` | Content locale |

**Response** (200):

```json
{
  "posts": [
    {
      "slug": "what-is-geo",
      "title": "What is GEO?",
      "description": "A beginner's guide...",
      "category": "guides",
      "publishedAt": "2025-01-15",
      "readingTime": 5
    }
  ]
}
```

#### Get a single post

```
GET /api/blog/{slug}
GET /api/blog/what-is-geo?locale=en
```

**Response** (200):

```json
{
  "slug": "what-is-geo",
  "title": "What is GEO?",
  "description": "A beginner's guide...",
  "category": "guides",
  "publishedAt": "2025-01-15",
  "readingTime": 5,
  "bodyHtml": "<p>Full HTML content...</p>",
  "headings": [
    { "id": "what-is-geo", "text": "What is GEO?", "depth": 2 }
  ]
}
```

## Caching

Responses include caching headers:

```
Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400
```

Content is cached for 1 hour at the CDN edge, with stale content served for up to 24 hours while revalidating.

## Example requests

### Fetch all glossary concepts (curl)

```bash
curl "https://web4agents.org/api/glossary?type=concept"
```

### Fetch a blog post (JavaScript)

```js
const response = await fetch('https://web4agents.org/api/blog/what-is-geo');
const post = await response.json();
console.log(post.title);
```

### Fetch all entries (Python)

```python
import requests

r = requests.get('https://web4agents.org/api/glossary', params={'locale': 'en'})
entries = r.json()['entries']
for entry in entries:
    print(entry['slug'], entry['title'])
```

## Use cases

- **AI agents** — Retrieve glossary definitions and blog content programmatically.
- **Developer tools** — Integrate Web4Agents content into your own apps or documentation.
- **LLM context** — Provide structured GEO knowledge to your LLM application via RAG.
- **Monitoring** — Track new entries and posts as they are published.

## OpenAPI

A machine-readable OpenAPI specification is planned for a future release.
