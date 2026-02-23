---
title: "Rate Limiting Agents"
slug: "rate-limiting-agents"
description: "Protecting your server resources from the exponential growth of automated AI traffic."
category: "security"
order: 4
publishedAt: "2026-02-22"
status: "published"
---

## The Cost of AI Traffic

As the web transitions to an agent-first model, the volume of automated requests will skyrocket. While a human might read three pages a minute, an autonomous research agent could request hundreds of pages in seconds. Without proper rate limiting, this traffic can:
- Exhaust your server resources
- Inflate your infrastructure costs
- Degrade the experience for human users

## Implementing Agent Rate Limiting

### 1. Tiered Rate Limiting
Treat AI bots differently than regular users. Using a WAF or API gateway, you can set specific thresholds based on `User-Agent` or ASN.
- **Humans**: standard rate limits
- **Known Search Crawlers**: higher limits, but constrained
- **Unknown/Aggressive Bots**: very strict limits or immediate 429 (Too Many Requests) responses

### 2. The 429 Response Code
When an agent exceeds its allowed request rate, respond with an HTTP `429 Too Many Requests` status code. 
Crucially, include the `Retry-After` header. Well-behaved agents will respect this header and pause their scraping until the specified time has elapsed.
```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
```

### 3. Monetization API Tiers
If your site provides high-value data, consider routing agents to a dedicated [Public API](/docs/public-api). This allows you to implement API keys, strict quotas, and even monetize heavy agent usage while keeping the HTML frontend lightweight and protected.