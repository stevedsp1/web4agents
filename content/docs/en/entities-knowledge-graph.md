---
title: "Entities and Knowledge Graph"
slug: "entities-knowledge-graph"
description: "How to be recognized as an entity by Google and AI systems, and why the Knowledge Graph is central to generative search visibility."
category: "getting-started"
order: 5
publishedAt: "2026-02-23"
status: "published"
---

## What is an entity?

In SEO and GEO, an **entity** is a clearly defined, identifiable real-world object: a person, organization, place, concept, or product. Unlike a keyword (a string of characters), an entity has a unique identity in a knowledge base.

Google's **Knowledge Graph** (KG) is Google's central knowledge base, containing entities with their properties and the relationships between them. Each entity is identified by a unique **MID** (Machine Identifier) such as `/m/0k2kfpc` (classic KG) or `/g/11j45xyz` (extended KG).

## Why entities matter for GEO

In generative search systems (AI Overviews, AI Mode, ChatGPT, Perplexity), entities serve several roles:

- **Disambiguation**: anchoring the response to a specific entity to avoid confusion ("Apple" the company vs "apple" the fruit)
- **Fact-checking**: using structured KG facts to verify the model's claims and reduce hallucinations
- **Response enrichment**: injecting facts (founder, creation date, website, etc.) directly from the graph
- **Vertical integration**: connecting Shopping Graph (products), Places Graph (Maps), images, and news into a unified response

In Google's AI Mode, when a query concerns a named entity, the system exposes the MID it uses to anchor its response. Being a recognized entity in the KG is one of the most powerful levers for generative search visibility.

## Verify if your brand is a KG entity

1. Search for your brand on Google — if a Knowledge Panel appears on the right, you are a KG entity.
2. Look up your MID via [Google's Knowledge Graph Search API](https://developers.google.com/knowledge-graph).
3. Check your presence on [Wikidata](https://www.wikidata.org) — a major source that feeds Google's KG.

## How to create or strengthen your entity

### 1. Wikidata presence

Wikidata is the open-source database most directly ingested by Google for the Knowledge Graph. If your organization, product, or concept is notable, create or enrich its Wikidata item with:

- Official name (all relevant languages)
- Short description
- Links to official sources (website, social profiles)
- Key properties (founding date, founders, industry, etc.)

### 2. Wikipedia (if eligible)

A Wikipedia page is a very strong entity signal. It must meet Wikipedia's notability criteria (reliable, independent secondary sources). Don't create a page if your organization doesn't qualify.

### 3. `sameAs` markup in JSON-LD

The `sameAs` property in your Schema.org markup connects your entity to its representations on other platforms. It's the most direct technical signal for Google to understand that your site *is* the entity:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Web4Agents",
  "url": "https://web4agents.org",
  "logo": "https://web4agents.org/logo.png",
  "sameAs": [
    "https://www.wikidata.org/wiki/Q...",
    "https://twitter.com/web4agents",
    "https://linkedin.com/company/web4agents",
    "https://github.com/web4agents",
    "https://www.crunchbase.com/organization/web4agents"
  ]
}
```

For people:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "First Last",
  "url": "https://yoursite.com/about",
  "sameAs": [
    "https://www.linkedin.com/in/first-last",
    "https://twitter.com/firstlast",
    "https://github.com/firstlast",
    "https://www.wikidata.org/wiki/Q..."
  ]
}
```

### 4. Consistent information across platforms

Google compares information on your site with your external profiles to consolidate the entity. Ensure consistency of:

- Exact official name (identical spelling everywhere)
- Website URL
- Short description
- Logo
- Contact information and address (for local businesses)

### 5. Mentions in recognized sources

**Unlinked mentions** in press articles, authoritative blogs, or industry directories help reinforce your entity recognition, even without a backlink. These are co-occurrences that Google uses as a signal.

### 6. Structured data for authors (E-E-A-T)

For author-persons, `Person` markup with `sameAs` reinforces entity recognition and E-E-A-T signals:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "First Last",
  "jobTitle": "SEO Director",
  "worksFor": {
    "@type": "Organization",
    "name": "Web4Agents"
  },
  "knowsAbout": ["GEO", "Technical SEO", "AI Agents"],
  "sameAs": ["https://linkedin.com/in/first-last"]
}
```

## Other Knowledge Graphs

Google is not the only system that uses entities:

| System | Knowledge Base | Usage |
|--------|---------------|-------|
| Google AIO/AIM | Google Knowledge Graph | Disambiguation, fact-checking |
| Google AI Mode | + Shopping Graph, Places Graph | Product and location integration |
| Bing / Copilot | Bing Entity Store | Copilot answers |
| ChatGPT / OpenAI | Wikidata, training data | Generative answers |
| Perplexity | Live web + external databases | Real-time citations |

The entity strategy is universal: a well-defined Wikidata entity reinforced by consistent `sameAs` markup benefits all these systems.

## Entity checklist

- [ ] Verify if your brand has a Wikidata item (create one if notable)
- [ ] Check the Google Knowledge Panel for your brand
- [ ] Add `sameAs` in Organization/Person JSON-LD on all key pages
- [ ] Consistency of name, logo, URL, and description across your site and all social platforms
- [ ] Comprehensive About page with full Organization markup
- [ ] Author bios with Person markup and `sameAs` links
- [ ] Seek mentions (not necessarily links) in recognized sources in your industry

See [E-E-A-T](/docs/eeat), [AI Overviews and AI Mode](/docs/ai-overviews), and [Backlinks & Link Authority](/docs/backlinks).
