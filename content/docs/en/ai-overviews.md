---
title: "AI Overviews and AI Mode (Google)"
slug: "ai-overviews"
description: "How Google's AI Overviews and AI Mode work, how to appear in them, and what publishers can do to optimize their visibility."
category: "getting-started"
order: 4
publishedAt: "2026-02-23"
status: "published"
---

## Two distinct AI surfaces on Google

Google has deployed two generative search surfaces that coexist on the same platform but work very differently:

| | AI Overviews (AIO) | AI Mode (AIM) |
|--|-------------------|--------------|
| **Trigger** | Automatic, when Google deems it useful | User-initiated (dedicated tab) |
| **Type** | One-shot summary at the top of the SERP | Conversational, multi-turn interface |
| **Model** | Custom Gemini (Gemini 3 since Jan. 2026) | Custom Gemini + intelligent routing |
| **Parallel queries** | Minimal | 8–12 sub-queries (fan-out) |
| **KG entities exposed** | Entity links (no MID) | Full Knowledge Graph MIDs |

## The AIO pipeline (Grounding → Pool → Displayed)

Contrary to popular belief, not all sources used by AIO are shown to the user. The pipeline runs in 4 stages:

1. **Information Retrieval (IR)**: The search engine selects an initial list of dozens to hundreds of candidate pages.
2. **Grounding**: A filtered subset is passed to Gemini as a factual basis. These URLs are often already embedded in the page source, even when no AIO block is displayed.
3. **Pool**: Ranked selection + injections (almost exclusively YouTube videos).
4. **Displayed**: Final reranking by Gemini. Some Pool URLs are rejected before display.

### The three visibility layers

For a single search results page, there are three distinct layers:

- **Layer 1 — Visible sidebar**: the sources users see when expanding the panel
- **Layer 2 — In-text citations**: small superscript numbers in the AI text, with `#:~:text=` fragments pointing to specific passages
- **Layer 3 — Hidden grounding URLs**: consulted by the model, but Google chooses not to display them

**Implication for publishers**: a page can contribute to an AIO response without ever appearing as a visible citation. Studies that don't separate "grounding" from "displayed" can significantly bias their conclusions.

## AI Mode and the Knowledge Graph

AI Mode, unlike AIO, exposes real Knowledge Graph MIDs (`/m/xxx` or `/g/xxx`) via the `kgmid` parameter. It draws on:

- **Knowledge Graph** — entity disambiguation and fact-checking
- **Shopping Graph** — over 50 billion product listings
- **Places Graph (Google Maps)** — local entities and geographic anchoring

Being recognized as an entity in Google's Knowledge Graph is one of the most powerful levers for visibility in AI Mode. See [Entities and Knowledge Graph](/docs/entities-knowledge-graph).

## How to be eligible

Google Search Central is explicit:

> "To be eligible to be shown as a supporting link in AI Overviews or AI Mode, a page must be indexed and eligible to be shown in Google Search with a snippet. There are no additional technical requirements."

In practice, the factors that increase your chances of appearing:

- **Indexation and snippet** — absolute prerequisite: page indexed, no `nosnippet`, no `noindex`
- **E-E-A-T** — content perceived as experienced, expert, authoritative, and trustworthy
- **Structured data** — clear JSON-LD (Article, FAQPage, HowTo, etc.)
- **Structured and factually dense content** — headings, lists, tables, explicit definitions
- **Freshness** — `datePublished` and `dateModified` up to date
- **Backlinks and authority** — trust signal for the grounding pipeline

## AIO vs AIM: different systems

A consistent observation: the URLs cited in AIO and AIM overlap very little for the same query. These are not two views of the same pipeline. Retrieval strategies, source sets, and ranking criteria all differ.

**Practical implication**: optimizing for one does not automatically optimize for the other. A solid presence in traditional organic search remains the best common foundation.

## Text fragments and cited passages

In AI Mode, citations often point to specific passages via `#:~:text=` fragments. Google targets the exact paragraph it found most relevant to answer the query.

To optimize these passages:
- Each section should be **self-contained** (understandable without surrounding context)
- Answer directly at the start of each section (inverted pyramid)
- Avoid long introductions before getting to the point

## Monitoring your visibility

Tools to analyze AIO and AI Mode responses:

- **[AIO/AIM Inspector](https://think.resoneo.com/aio-aim-deepdive/)** (RESONEO) — Chrome extension that extracts grounding URLs, pool, and displayed citations from Google search pages
- **Google Search Console** — Performance → Search tab, monitor impressions and CTR on queries where AIO may reduce clicks
- **Manual search** — ask relevant questions in Google and note whether your site is cited

## Optimization checklist

- [ ] Pages indexed and eligible for snippets (no `noindex`, no `nosnippet`)
- [ ] JSON-LD Article/BlogPosting with `datePublished`, `dateModified`, `author`
- [ ] Descriptive, self-contained headings (answer a question)
- [ ] Structured content: lists, tables, explicit definitions
- [ ] Short, dense sections (avoid walls of text)
- [ ] FAQs on key pages (match conversational queries)
- [ ] E-E-A-T: identified authors, bios, `sameAs`, About page
- [ ] `dateModified` current on revised content

See [E-E-A-T](/docs/eeat), [Writing for AI Agents](/docs/writing-for-agents), [Entities and Knowledge Graph](/docs/entities-knowledge-graph), and [Monitoring Citations](/docs/monitoring-citations).
