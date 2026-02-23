---
title: "JSON-LD"
slug: "json-ld"
type: "standard"
description: "JavaScript Object Notation for Linked Data — the recommended format for embedding Schema.org structured data in HTML pages."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
website: "https://json-ld.org"
relatedTerms: ["schema-org", "geo", "rag"]
---

## Definition

**JSON-LD (JavaScript Object Notation for Linked Data)** is a format for adding structured data to web pages. Data is placed in a `<script type="application/ld+json">` tag, usually in the `<head>`, keeping it separate from the visual content. The `@context` is typically `https://schema.org` and `@type` defines the entity (Article, Organization, BreadcrumbList, etc.).

Google and most AI retrieval systems recommend JSON-LD over Microdata or RDFa because it is decoupled from the DOM, easy to generate dynamically, and widely supported.

## Relevance to GEO

JSON-LD is the preferred way to expose headline, description, dates, and author to agents and RAG indexers. Combined with Schema.org types, it helps agents understand and cite your content accurately.
