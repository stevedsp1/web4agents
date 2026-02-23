---
title: "robots.txt"
slug: "robots-txt"
description: "Complete guide to robots.txt: syntax, directives, per-AI-crawler rules, and best practices for 2026."
category: "crawlers"
order: 2
publishedAt: "2025-02-15"
updatedAt: "2026-02-20"
status: "published"
---

The `robots.txt` file is a plain-text file placed at the root of your domain (`https://example.com/robots.txt`). It tells web crawlers — both traditional search engines and AI agents — which pages they are allowed to access, before they visit any URL.

## Location and format

- **URL**: `https://yourdomain.com/robots.txt`
- **Format**: Plain text, UTF-8 encoded
- **Case-sensitive**: Paths are case-sensitive on Unix/Linux servers

## Basic syntax

```
User-agent: GPTBot
Disallow: /private/
Allow: /

User-agent: *
Disallow: /admin/
```

- `User-agent` — The crawler this rule block applies to. `*` matches all crawlers.
- `Disallow` — Paths the crawler must not access (recursive: `/blog/` blocks all URLs starting with `/blog/`).
- `Allow` — Explicitly permits a path, overriding a broader `Disallow`.
- `Crawl-delay: N` — Requests an N-second pause between requests (not all crawlers support this).
- `Sitemap: URL` — Points to your sitemap URL.

Rules are evaluated top to bottom. For a given crawler, the most specific matching rule wins.

## Wildcard patterns

Most crawlers support two wildcards:

- `*` — matches any sequence of characters
- `$` — anchors to the end of the URL

```
# Block all PDF files
User-agent: *
Disallow: /*.pdf$

# Block URLs with ?session= parameter
User-agent: *
Disallow: /*?session=
```

## AI crawler user-agents reference

| Crawler | Company | Slug |
|---------|---------|------|
| `GPTBot` | OpenAI | ChatGPT browsing, training |
| `OAI-SearchBot` | OpenAI | ChatGPT search |
| `ChatGPT-User` | OpenAI | ChatGPT user-triggered browsing |
| `ClaudeBot` | Anthropic | Claude training and browsing |
| `anthropic-ai` | Anthropic | Anthropic general |
| `PerplexityBot` | Perplexity AI | Perplexity search |
| `Google-Extended` | Google | Gemini training (separate from Googlebot) |
| `Applebot-Extended` | Apple | Apple Intelligence |
| `Meta-ExternalAgent` | Meta | Meta AI |
| `Bytespider` | ByteDance | TikTok / training |
| `CCBot` | Common Crawl | Open dataset (used by many AI orgs) |
| `Diffbot` | Diffbot | Data extraction for AI |

## Blocking all AI crawlers

To block all major AI crawlers while keeping traditional search engines:

```
User-agent: GPTBot
Disallow: /

User-agent: OAI-SearchBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /
```

**Note**: Blocking `Google-Extended` has no impact on traditional Google Search (`Googlebot`). They are independent.

## Allowing some, blocking others

Allow reputable AI agents while blocking data aggregators:

```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /
```

## Blocking specific sections only

Allow crawling in general but protect members-only or transactional areas:

```
User-agent: GPTBot
Disallow: /members/
Disallow: /checkout/
Disallow: /api/private/
Allow: /
```

## Complete recommended example

```
# Traditional search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# AI agents — allowed
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

# AI agents — blocked (training data aggregators)
User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

# All other crawlers
User-agent: *
Allow: /

# Sitemap
Sitemap: https://example.com/sitemap.xml
```

## Common mistakes

- **Blocking Googlebot accidentally** — Using `User-agent: *` with `Disallow: /` blocks Google Search. Always add explicit rules for Googlebot if you use a wildcard block.
- **Forgetting Common Crawl (CCBot)** — CCBot feeds open datasets used by many AI organizations for training. Block it if you want to opt out of open training corpora.
- **Missing the Sitemap reference** — Always add `Sitemap:` at the end.
- **Thinking Disallow provides security** — `robots.txt` is public and is a convention, not a technical barrier. Malicious bots ignore it. Use proper authentication for sensitive content.
- **Blocking CSS and JS** — This prevents crawlers from fully rendering your pages.

## Does blocking AI crawlers affect SEO?

No. `Google-Extended`, `GPTBot`, `ClaudeBot` are completely separate from `Googlebot`. Blocking them has zero impact on Google Search rankings.

## Verification

1. Visit `https://yourdomain.com/robots.txt` directly — confirm it is accessible and correctly formatted.
2. Use [Google Search Console's robots.txt tester](https://search.google.com/search-console/robots-testing-tool).
3. Check server logs after 24–48 hours to verify crawlers are respecting the rules.

## Complement with Content Signals

`robots.txt` controls **access** (can you crawl this?). For expressing what AI systems can *do* with your content after accessing it, use [Content Signals](/docs/content-signals) headers alongside `robots.txt`.
