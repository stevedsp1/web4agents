---
title: "humans.txt"
slug: "humans-txt"
description: "The humans.txt standard: what it is, how to create it, and whether AI agents and crawlers use it."
category: "agent-config"
order: 2
publishedAt: "2026-02-01"
status: "published"
---

## What is humans.txt?

`humans.txt` is a plain-text file placed at the root of a site (`/humans.txt`) that describes the people behind the project: authors, designers, developers, contributors. It was created in 2012 by Abel Cabans and Juanjo Bernabeu, inspired by `robots.txt`.

Example:

```
/* TEAM */
Developer: Jane Smith
Site: https://example.com
Twitter: @janesmith
Location: Paris, France

/* THANKS */
Name: John Doe

/* SITE */
Last update: 2026-01-15
Standards: HTML5, CSS3
Components: Next.js, Tailwind CSS
Software: VS Code
```

## Is it useful for AI agents?

Directly, `humans.txt` carries little weight for AI agents. Crawlers do not parse it automatically, and there is no consensus standard for machines.

However, it presents two indirect benefits:

1. **Authorship signal**: If the file is structured and consistent, it can be parsed by agents specifically looking to identify a site's maintainers. This reinforces the concept of EEAT (Experience, Expertise, Authoritativeness, Trustworthiness), valued by Google and increasingly by AI systems.

2. **Complement to llms.txt**: Alongside `llms.txt` (which targets AI agents), `humans.txt` completes the picture of human identity behind the content.

## Comparison: humans.txt, robots.txt, llms.txt

| File | Audience | Purpose |
|------|----------|---------|
| `robots.txt` | Crawlers (bots) | Access permissions |
| `llms.txt` | AI agents and LLMs | Site structure, key links, content policy |
| `humans.txt` | Human visitors and SEO tools | Team identity and site credits |
| `security.txt` | Security researchers | Responsible disclosure contacts |

## How to add it

Create a static file `/public/humans.txt` in your project:

```
/* TEAM */
Lead Developer: [name]
Contact: contact [at] yourdomain.com
Site: https://yourdomain.com

/* SITE */
Last update: 2026-02-01
Language: English
Standards: HTML5, CSS3, JSON-LD
```

## Referencing it in HTML

To signal the file to browsers and tools, add in your `<head>`:

```html
<link rel="author" href="/humans.txt" />
```

## Recommendation

`humans.txt` is a low-effort practice. Its real value lies in combining it with proper EEAT signals:

- Schema.org `Person` or `Organization` structured data
- Author pages with biography
- Visible social links and credentials

For AI agent optimization, prioritize `llms.txt` and JSON-LD. Add `humans.txt` as an additional identity signal.
