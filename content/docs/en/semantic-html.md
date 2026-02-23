---
title: "Semantic HTML"
slug: "semantic-html"
description: "How semantic HTML elements help AI agents understand your content structure."
category: "content-markup"
order: 4
publishedAt: "2025-02-15"
status: "published"
---

Semantic HTML means using the right HTML element for the right job. Instead of building everything with `<div>` and `<span>`, you use elements that carry inherent meaning. This helps AI agents — and search engines, and screen readers — understand your content structure without guessing.

## Why semantics matter for agents

AI crawlers parse your HTML to extract:

- What kind of content this is (article, product, navigation…)
- What the main content is vs. sidebar/footer
- How content is organized (headings, sections, lists)
- What's important vs. supplementary

Semantic elements provide this information directly, without needing AI to infer it from class names or visual positioning.

## Essential semantic elements

### Document structure

```html
<header>   <!-- Site or section header, logo, nav -->
<nav>      <!-- Navigation links -->
<main>     <!-- The main content of the page (one per page) -->
<article>  <!-- Self-contained content: blog post, news item -->
<section>  <!-- Thematic grouping within a page -->
<aside>    <!-- Secondary content: sidebar, related links -->
<footer>   <!-- Site or section footer -->
```

**One `<main>` per page** — AI agents use `<main>` to locate the primary content and skip navigation, ads, and sidebars.

### Headings

```html
<h1>Page title (one per page)</h1>
<h2>Major section</h2>
<h3>Subsection</h3>
<h4>Sub-subsection</h4>
```

Rules:
- Exactly one `<h1>` per page — the page title.
- Never skip levels (don't jump from `<h2>` to `<h4>`).
- Use headings for structure, not for visual styling — use CSS for size.

AI agents use headings to understand the document outline and to chunk content when processing long pages.

### Lists

Use lists for enumerated items, not paragraphs:

```html
<!-- Unordered list: items without sequence -->
<ul>
  <li>First point</li>
  <li>Second point</li>
</ul>

<!-- Ordered list: steps or ranked items -->
<ol>
  <li>Install the package</li>
  <li>Configure the settings</li>
  <li>Deploy</li>
</ol>

<!-- Definition list: terms and their definitions -->
<dl>
  <dt>GEO</dt>
  <dd>Generative Engine Optimization — the practice of optimizing for AI agents.</dd>
</dl>
```

`<dl>` (definition list) is particularly useful for GEO — it explicitly marks up term-definition pairs that AI agents can extract cleanly.

### Time and dates

```html
<time datetime="2025-01-15">January 15, 2025</time>
<time datetime="2025-01-15T09:00:00Z">9:00 AM UTC</time>
```

The `datetime` attribute provides a machine-readable date. AI agents use this to understand the freshness of content.

### Inline semantics

```html
<strong>important text</strong>   <!-- Strong importance -->
<em>emphasized text</em>          <!-- Emphasis -->
<abbr title="Generative Engine Optimization">GEO</abbr>  <!-- Abbreviation with expansion -->
<code>robots.txt</code>           <!-- Code or technical term -->
<cite>Author Name</cite>          <!-- Citation source -->
<q cite="https://source.com">Quoted text</q>  <!-- Inline quotation -->
```

`<abbr>` with a `title` attribute is especially useful for GEO — it expands acronyms that AI agents might encounter without context.

## Anti-patterns to avoid

```html
<!-- Bad: non-semantic div soup -->
<div class="header">
  <div class="menu">...</div>
</div>
<div class="content">
  <div class="title">Page Title</div>
  <div class="body">...</div>
</div>

<!-- Good: semantic markup -->
<header>
  <nav>...</nav>
</header>
<main>
  <article>
    <h1>Page Title</h1>
    <p>...</p>
  </article>
</main>
```

## Practical checklist

- [ ] One `<h1>` per page matching the `<title>`.
- [ ] Headings form a logical hierarchy (h1 → h2 → h3).
- [ ] `<main>` wraps the primary content.
- [ ] `<nav>` is used for navigation blocks.
- [ ] `<article>` wraps self-contained content.
- [ ] Lists use `<ul>`, `<ol>`, or `<dl>` — not `<p>` tags.
- [ ] Dates use `<time datetime="...">`.
- [ ] Technical terms are wrapped in `<code>`.

Semantic HTML is the foundation of accessibility and agent-readability. It costs nothing extra and pays dividends across SEO, GEO, and screen reader compatibility.
