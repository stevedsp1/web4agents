---
title: "Writing for AI Agents"
slug: "writing-for-agents"
description: "How to structure and write content so AI agents can extract, summarize, and cite it accurately."
category: "content-markup"
order: 1
publishedAt: "2026-02-01"
status: "published"
---

## The shift from writing for humans to writing for agents

Content optimized for human readers is not automatically optimized for AI agents. Humans interpret context, skim for relevance, and fill in implicit information. Agents extract and synthesize literally — they need **explicit structure**, **clear facts**, and **self-contained sections**.

This does not mean writing in a robotic style. Well-structured content is also more readable for humans. The goal is to eliminate ambiguity, not personality.

## Core principles

### 1. Lead with the answer (inverted pyramid)

Place the key information at the top of each section. Agents scanning a page for a specific answer will find it immediately:

**Without optimization:**
> Over the years, robots.txt has evolved from a simple exclusion mechanism to a nuanced protocol. Many developers wonder how to configure it for AI crawlers. This has become more important as AI crawlers have multiplied...

**Optimized:**
> To block an AI crawler in robots.txt, add its User-agent followed by `Disallow: /`.

### 2. Use descriptive headings as standalone statements

Headings are indexed separately and used as section summaries. Make them informative enough to stand alone:

**Weak:** `## More information`
**Strong:** `## How to declare Content Signals in Next.js`

### 3. Write in complete, self-contained sections

An agent may extract a single section without the surrounding context. Each section should make sense independently:

- Define acronyms on first use within the section
- Avoid pronouns that refer to previous sections ("As mentioned above...")
- Include the entity name rather than "it" or "this"

### 4. Use lists and tables for structured data

AI agents parse lists and tables more reliably than prose for comparative or enumerable information:

**Prose (harder to parse):**
> JSON-LD should be placed in the head section of your HTML page, it should use the correct schema type, and it must be valid JSON.

**Table (easier to extract):**

| Rule | Detail |
|------|--------|
| Placement | Inside `<head>` of the HTML page |
| Schema type | Must match the content type (`Article`, `Product`, etc.) |
| Format | Must be valid JSON |

### 5. Use explicit fact statements

Agents cite specific facts. Make your facts easy to extract:

- Use numbers and units explicitly: "Page load time under 2.5 seconds"
- State the source and date: "According to Cloudflare (February 2026)..."
- Avoid vague qualifiers: "quite fast" → "under 500ms"
- Use bold to highlight key facts: **Markdown reduces token usage by 60–80%**

### 6. Define terms the first time you use them

Even if you have a glossary, define terms inline in long-form content:

> **RAG (Retrieval-Augmented Generation)** is a technique where an LLM retrieves relevant documents from a database before generating an answer, rather than relying solely on its training data.

### 7. Provide context for code examples

Code snippets are valuable, but agents need prose context to understand when and why to use them:

**Without context:**
```json
{ "@type": "Article", "headline": "..." }
```

**With context:**
> Use the `Article` Schema.org type for blog posts and news articles. This tells AI crawlers the content is editorial, not a product or service page.
> ```json
> { "@context": "https://schema.org", "@type": "Article", "headline": "..." }
> ```

## Content length and depth

Longer content can perform better for complex topics, but only if the length is justified by substance. A 3,000-word article that could be 800 words wastes tokens in every agent's context window.

**Rules:**
- **Guides and tutorials**: comprehensive is better; cover all cases
- **Reference pages**: be complete and exhaustive (all options, all parameters)
- **Blog posts**: 800–1,500 words is typically sufficient
- **Glossary terms**: 200–400 words with clear definition and examples

## Formatting for readability and extraction

| Element | Recommendation |
|---------|---------------|
| Paragraphs | 3–5 sentences max |
| Sentences | One idea per sentence |
| Emphasis | **Bold** for key terms, `code` for technical values |
| Lists | Use for 3+ items that would otherwise be a comma list |
| Tables | Use for comparisons and multi-dimensional data |
| Images | Always add descriptive `alt` text |

## FAQs: answer the questions agents receive

Adding an FAQ section at the end of key pages addresses the exact queries users submit to AI assistants:

```markdown
## Frequently Asked Questions

**What is the difference between llms.txt and robots.txt?**
`robots.txt` controls crawler access; `llms.txt` provides a structured summary 
of your site for AI systems that have already been granted access.

**Does Markdown for Agents require server changes?**
No. When enabled on Cloudflare, conversion happens at the CDN edge.
```

FAQ items often match voice and AI search queries verbatim. They also trigger FAQ rich results in traditional search.

## Avoid these patterns

- **Keyword stuffing**: agent ranking is not keyword-based
- **Buried definitions**: define terms at first mention
- **Walls of text**: break prose with headings every 200–300 words
- **Implicit cross-references**: "as explained earlier" or "see below" — link explicitly
- **Date-free statements**: "recently launched" → "launched in February 2026"
