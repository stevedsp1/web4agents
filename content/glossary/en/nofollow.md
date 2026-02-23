---
title: "nofollow"
slug: "nofollow"
type: "concept"
description: "Link attribute that tells search engines not to pass PageRank or endorse the destination (rel=\"nofollow\")."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["backlink", "pagerank", "seo"]
---

## Definition

**nofollow** is a value for the `rel` attribute on links: `<a href="..." rel="nofollow">`. It instructs search engines not to pass PageRank to the linked page and not to treat the link as an editorial endorsement. Used for user-generated content, ads, or untrusted destinations. Similar: `rel="sponsored"` for paid links, `rel="ugc"` for user-generated content. The default is "dofollow" (no rel), which does pass PageRank.

## Relevance to GEO

Backlinks with nofollow do not contribute to link authority in the same way as dofollow links. For GEO, earning dofollow links from trusted, relevant sites remains a strong signal for both SEO and AI citation likelihood.
