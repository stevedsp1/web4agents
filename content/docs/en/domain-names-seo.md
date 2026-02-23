---
title: "Domain Names & SEO"
slug: "domain-names-seo"
description: "How to choose a domain name that benefits SEO and AI discoverability: TLD, keywords, age, HTTPS, and best practices."
category: "domain"
order: 4
publishedAt: "2026-02-20"
status: "published"
---

## Why your domain name matters for SEO and GEO

Your domain name is one of the longest-lived decisions you'll make for a web project. While Google has repeatedly stated that keywords in a domain name have minimal direct ranking impact, the domain still influences many indirect factors: click-through rate, brand trust, link acquisition, and memorability — all of which affect both traditional SEO and how AI agents perceive your site's authority.

## Choosing the right TLD

### .com remains dominant

`.com` is still the most trusted TLD globally and the default expectation for English-speaking audiences. It consistently achieves higher click-through rates than alternatives in search results.

**When to use other TLDs:**
- `.org` — non-profits, open-source projects, reference resources
- `.io` — developer tools and SaaS (widely accepted in tech)
- `.dev` — developer-focused products (HTTPS enforced by Google's HSTS preload)
- Country-specific TLDs (`.fr`, `.de`, `.co.uk`) — if your audience and content are primarily local

### Avoid low-trust TLDs

Certain TLDs have historically attracted spam and are treated with more suspicion by both users and AI systems: `.xyz`, `.click`, `.loan`, `.work`. Unless you have a strong brand, they will make link acquisition harder.

### New gTLDs as category signals

Generic TLDs like `.ai`, `.tech`, `.blog`, `.agency` can serve as a category signal. For an AI-focused project, a `.ai` domain (e.g. `example.ai`) communicates niche relevance. These can work well when combined with a strong brand.

## Keywords in the domain: reality vs. myth

Google reduced the impact of exact-match domains (EMDs) after the 2012 EMD update. However:

- **Partial-match domains** (brand + keyword, e.g. `web4agents.org`) retain some benefit by reinforcing topical relevance
- **Exact-match domains** (e.g. `best-seo-tools.com`) without quality content perform no better than non-keyword domains
- **Brand domains** (e.g. `stripe.com`, `vercel.com`) are the strongest long-term choice

**Recommendation**: choose a memorable brand name that is also topically relevant, rather than forcing a keyword-only name.

## Domain age and history

Domain age itself is not a ranking factor, but the history of a domain matters:

### For new registrations
- A brand-new domain starts with zero authority — expect a 3–12 month period before significant organic traffic (sometimes called the "Google sandbox")
- This delay is shorter if you publish high-quality content quickly and earn early backlinks

### For purchased or transferred domains
Before buying a used domain, audit its history:
- Check [Wayback Machine](https://web.archive.org/) — was it previously used for spam or low-quality content?
- Use [Ahrefs](https://ahrefs.com/) or [Semrush](https://semrush.com/) to inspect historical backlinks
- Check Google Search Console indexing history if possible

A domain with a history of spammy backlinks or manual penalties will inherit those signals unless thoroughly disavowed.

## HTTPS is mandatory

HTTPS has been a confirmed Google ranking signal since 2014. In 2026, any HTTP-only domain is penalized in rankings and flagged in browsers. It also:

- Triggers trust warnings that dramatically reduce click-through rates
- Is required for HTTP/2 and HTTP/3 (speed improvements)
- Is required for Service Workers and PWA features

**Use HTTPS for everything** — including subdomains, API endpoints, and redirects. See [HTTPS & Security](/docs/https-and-security) for implementation details.

## Subdomains vs. subdirectories

A long-debated question: should blog content live at `blog.example.com` or `example.com/blog`?

| | Subdomain | Subdirectory |
|---|-----------|-------------|
| SEO authority | Treated as separate site by Google | Inherits parent domain authority |
| GEO / agents | Crawled separately | Part of main site context |
| Setup complexity | Slightly higher | Lower |
| Recommendation | Use for truly separate products | Use for content sections |

**Recommendation for most sites**: keep blog, docs, and glossary as subdirectories (`example.com/blog`, `example.com/docs`). This concentrates link authority on one domain.

## Domain consolidation

If your site is accessible at multiple URLs (`http://`, `https://`, `www.`, non-`www.`), ensure:

1. **Pick one canonical version** (e.g. `https://example.com`) and 301-redirect all others
2. **Set `<link rel="canonical">`** on all pages to the canonical domain
3. **Use HSTS** to enforce HTTPS permanently: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

Duplicate domains split your link equity and confuse AI crawlers about which version to index.

## International domains (ccTLDs vs. hreflang)

For multilingual or multi-region sites, two main approaches:

| Approach | Example | SEO signal |
|----------|---------|-----------|
| ccTLD | `example.fr` | Strongest geo-targeting signal |
| Subdirectory | `example.com/fr` | Good, simplest to maintain |
| Subdomain | `fr.example.com` | Acceptable but splits authority |

Whichever approach you choose, always implement `hreflang` tags to signal language/region variants. See [Technical SEO for Agents](/docs/technical-seo).

## Domain name best practices summary

- [ ] Use a `.com` (or relevant TLD) with a memorable brand name
- [ ] Avoid hyphens, numbers, and excessively long names (max ~15 chars)
- [ ] Enforce HTTPS with HSTS and preloading
- [ ] Audit domain history before purchasing a used domain
- [ ] 301-redirect all non-canonical variants to one canonical URL
- [ ] Use `<link rel="canonical">` and avoid URL parameter duplicates
- [ ] Keep content on subdirectories, not subdomains, unless it's a truly separate product
