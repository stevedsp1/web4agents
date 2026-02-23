---
title: "llms.txt"
slug: "llms-txt"
description: "How to create and serve an llms.txt file so AI agents understand your site."
category: "agent-config"
order: 1
publishedAt: "2025-02-15"
status: "published"
---

The `llms.txt` file is a proposed standard that tells AI agents **what your site is about**, what content is available, and how agents should use it. Think of it as a `robots.txt` for AI context — not access control, but **content discovery**.

## Why llms.txt?

When an AI agent visits your site, it needs to quickly understand:

- What topics you cover
- Which pages are most important
- How your content is structured
- What format the content is in

Without `llms.txt`, agents must crawl and guess. With it, they get a structured overview instantly.

## Format

Place a `llms.txt` file at the root of your domain (`https://example.com/llms.txt`). The format is simple markdown-like text:

```
# Example Corp

> A company that manufactures widgets for the automotive industry.

## Main content

- [Product catalog](/products): Full list of widgets with specs.
- [Documentation](/docs): Technical documentation and API reference.
- [Blog](/blog): Industry news and company updates.

## Optional

- [About us](/about): Company history and team.
- [Contact](/contact): How to reach us.
```

## Key sections

- **Title** (`# Site name`) — Your site or organization name.
- **Description** (`> ...`) — A one-line summary of what your site does.
- **Main content** — Links to your most important pages with brief descriptions.
- **Optional** — Secondary pages that may be useful to agents.

## Best practices

1. **Keep it concise** — Agents process thousands of sites. A focused summary is better than an exhaustive list.
2. **Update it regularly** — When you add major content, update `llms.txt`.
3. **Use absolute or relative URLs** — Relative paths work well.
4. **Pair with robots.txt** — `llms.txt` describes what to read; `robots.txt` controls what can be accessed.
5. **Test with agents** — Ask ChatGPT or Claude about your site after adding `llms.txt` to see if they pick it up.

## Example

See the [Web4Agents llms.txt](/llms.txt) as a real-world example.
