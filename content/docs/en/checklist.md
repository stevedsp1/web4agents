---
title: "Quick-start checklist"
slug: "checklist"
description: "A practical checklist to make your website agent-ready, step by step."
category: "getting-started"
order: 3
publishedAt: "2025-02-15"
status: "published"
---

Use this checklist as a starting point. Each item links to a dedicated guide. You don't need to implement everything at once — start with the highest-impact items.

## Crawl & Access

- [ ] **`robots.txt` is present** and correctly allows or disallows AI crawlers by user-agent. ([robots.txt guide](/docs/robots-txt))
- [ ] **`llms.txt` is present** at the root of your domain with a clear description of your site. ([llms.txt guide](/docs/llms-txt))
- [ ] **`sitemap.xml` is up to date** and referenced in `robots.txt`. ([sitemap.xml guide](/docs/sitemap-xml))
- [ ] All important pages are indexed (not blocked by `noindex` or `robots.txt` by mistake).

## Structured Data

- [ ] **Schema.org markup** is implemented for your main content types (Article, Product, Organization, FAQ…). ([Schema.org guide](/docs/schema-org))
- [ ] **JSON-LD** is used for structured data (preferred over Microdata). ([JSON-LD guide](/docs/json-ld))
- [ ] **Open Graph tags** are set on all pages (`og:title`, `og:description`, `og:image`). ([Open Graph guide](/docs/open-graph))

## HTML & Semantics

- [ ] **Heading hierarchy is clean**: one `<h1>` per page, logical `<h2>`–`<h6>` structure. ([Semantic HTML guide](/docs/semantic-html))
- [ ] **Landmark elements** are used: `<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`. ([Semantic HTML guide](/docs/semantic-html))
- [ ] **DOM is actionable**: buttons have descriptive labels, CTAs are clear, forms have associated labels. ([Actionable DOM guide](/docs/actionable-dom))
- [ ] **Forms are accessible**: all inputs have `<label>`, error messages are explicit, keyboard navigation works. ([Accessible Forms guide](/docs/accessible-forms))

## Performance & Hosting

- [ ] **HTTPS is enabled** with a valid TLS certificate. ([HTTPS guide](/docs/https-and-security))
- [ ] **Core Web Vitals are good**: LCP < 2.5s, CLS < 0.1, INP < 200ms. ([Performance guide](/docs/performance))
- [ ] **Security headers** are set: `Strict-Transport-Security`, `X-Frame-Options`, `Content-Security-Policy`. ([HTTPS guide](/docs/https-and-security))

## Analytics & Monitoring

- [ ] **Agent traffic is tracked**: AI crawler user-agents are identified in your analytics. ([Tracking Agent Traffic](/docs/tracking-agent-traffic))
- [ ] You have a process to **monitor citations** in AI-generated answers. ([Monitoring Citations](/docs/monitoring-citations))

---

## Scoring

Use this rough scoring to prioritize:

| Priority | Items |
|----------|-------|
| **High** | robots.txt, llms.txt, sitemap.xml, HTTPS, Schema.org |
| **Medium** | JSON-LD, Open Graph, heading hierarchy, Core Web Vitals |
| **Low** | CDN caching, citation monitoring, Knowledge Graph entities |

Start with the high-priority items. They have the most impact on agent discoverability and trustworthiness.
