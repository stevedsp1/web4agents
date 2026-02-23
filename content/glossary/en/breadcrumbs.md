---
title: "Breadcrumbs"
slug: "breadcrumbs"
type: "concept"
description: "Navigation trail showing the page's position in the site hierarchy; implement with Schema.org BreadcrumbList for agents."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["schema-org", "json-ld", "internal-linking"]
---

## Definition

**Breadcrumbs** are the navigation trail (e.g. Home > Docs > Schema.org) that shows where the current page sits in the site hierarchy. They help users and crawlers understand structure. For agents, breadcrumbs should be accompanied by Schema.org **BreadcrumbList** JSON-LD: a list of items with position, name, and URL. This gives crawlers and AI systems an explicit hierarchy signal without parsing the visual UI.

## Relevance to GEO

BreadcrumbList JSON-LD helps agents understand site structure and page importance. Always add it alongside visible breadcrumbs on docs, blog, and category pages.
