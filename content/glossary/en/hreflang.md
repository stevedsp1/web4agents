---
title: "hreflang"
slug: "hreflang"
type: "standard"
description: "HTML link attribute that signals language and regional variants of a page to crawlers for multilingual and multi-region targeting."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["canonical-url", "seo", "technical-seo"]
---

## Definition

**hreflang** is an attribute used on `<link rel="alternate">` tags to indicate which language or region a URL targets. Example: `<link rel="alternate" hreflang="en" href="https://example.com/en/page" />`. Each page should reference all language/region variants plus an `hreflang="x-default"` fallback. Search engines and AI systems use it to serve the correct variant to the user's locale.

## Relevance to GEO

AI systems that surface content in a specific language prefer pages tagged with the matching hreflang. Correct hreflang improves the chance your content is retrieved and cited in the right locale.
