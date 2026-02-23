---
title: "Data Privacy & LLM Ingestion"
slug: "data-privacy"
description: "How to prevent sensitive data ingestion and maintain GDPR compliance when dealing with AI crawlers."
category: "security"
order: 3
publishedAt: "2026-02-22"
status: "published"
---

## The Privacy Challenge

AI agents and crawlers are voracious consumers of data. If personal, sensitive, or copyrighted information is exposed on your website, it may be ingested and permanently embedded into a model's weights. Once ingested, removing that data (e.g., fulfilling a GDPR "Right to be Forgotten" request) is technically difficult or impossible for the model provider.

## Protecting Sensitive Data

### 1. Authentication and Access Control
AI crawlers generally do not maintain sessions or solve logins. Ensure that any PII (Personally Identifiable Information) or proprietary data is hidden behind an authentication wall.

### 2. The `noai` and `noimageai` directives
You can use meta tags to explicitly tell ethical crawlers not to use your content for training purposes:
```html
<meta name="robots" content="noai, noimageai">
```

### 3. Content-Signal Headers
As discussed in the [Content Signals](/docs/content-signals) section, use HTTP headers to explicitly declare your data usage policies. For example, you can allow a search agent to index the page but forbid training:
```http
Content-Signal: ai-train=no, search=yes
```

### 4. Dynamic Data Masking
If your site must display public PII (e.g., a public directory of professionals), consider serving masked or limited versions of the data when a known AI crawler `User-Agent` is detected, or using JavaScript to render the sensitive parts so basic crawlers miss them (though this goes against general GEO visibility goals, it acts as a privacy shield).