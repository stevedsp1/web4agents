---
title: "Actionable DOM"
slug: "actionable-dom"
description: "How to structure your DOM so AI agents can identify and interact with key elements."
category: "content-markup"
order: 3
publishedAt: "2025-02-15"
status: "published"
---

An actionable DOM is one where AI agents can identify interactive elements, understand their purpose, and use them — whether that means clicking a button, filling a form, or following a link to complete a task.

## What is an actionable DOM?

AI agents that browse the web (like ChatGPT's browsing mode, or Playwright-based agents) parse your page's DOM to find:

- **Links** — To navigate to relevant content.
- **Buttons and CTAs** — To trigger actions.
- **Forms** — To submit data or requests.
- **Text content** — To extract facts and answers.

If your DOM is cluttered, ambiguous, or relies on JavaScript events that aren't exposed correctly, agents will fail to interact with your page.

## Buttons and CTAs

Every button should have a clear, descriptive text label or `aria-label`:

```html
<!-- Bad: agent doesn't know what this does -->
<button class="btn">Click here</button>

<!-- Good: explicit intent -->
<button>Request a free audit</button>

<!-- Good: icon button with aria-label -->
<button aria-label="Share on Twitter">
  <svg>...</svg>
</button>
```

Key rules:
- Use `<button>` for actions, `<a>` for navigation.
- Never use `<div>` or `<span>` as clickable elements without ARIA roles.
- Avoid vague labels: "Click here", "Submit", "Go" — prefer "Subscribe to newsletter", "Download PDF", "Book a demo".

## Links

Links must have descriptive text — not just "Read more" or "Learn more":

```html
<!-- Bad -->
<a href="/blog/geo-guide">Read more</a>

<!-- Good -->
<a href="/blog/geo-guide">Read our GEO guide</a>
```

AI agents use link text to understand where a link leads. Vague link text breaks navigation for agents and screen readers alike.

## Interactive elements with ARIA

When using custom UI components that aren't standard HTML elements, add ARIA roles:

```html
<!-- Tab component -->
<div role="tab" aria-selected="true" aria-controls="panel-1">Settings</div>

<!-- Modal trigger -->
<button aria-haspopup="dialog" aria-controls="contact-modal">Contact us</button>

<!-- Toggle -->
<button role="switch" aria-checked="false" aria-label="Enable notifications">
  <span class="toggle-thumb"></span>
</button>
```

## Content structure for agents

Agents look for key content in predictable places. Use landmarks:

```html
<header>
  <nav aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/docs">Docs</a>
  </nav>
</header>

<main>
  <article>
    <h1>Page title</h1>
    <p>Introduction...</p>
  </article>
</main>

<aside aria-label="Related content">
  <h2>Related pages</h2>
</aside>

<footer>
  <p>Contact: hello@example.com</p>
</footer>
```

## JavaScript-dependent content

Many modern sites load content via JavaScript after the initial HTML. AI retrieval crawlers often **do not execute JavaScript**, so content that only appears after JS runs may be invisible to them.

**Solutions**:
- Use server-side rendering (Next.js, Nuxt, SvelteKit with SSR).
- Ensure critical content (title, description, main body, CTAs) is present in the initial HTML.
- Use `<noscript>` fallbacks for key elements.

## Testing with agents

1. Disable JavaScript in your browser (`chrome://settings/content/javascript`) and reload your page. All key content and links should still be visible.
2. Use `curl https://example.com/page` to see what a non-JS crawler sees.
3. Run [Lighthouse](https://developers.google.com/web/tools/lighthouse) and check the Accessibility score — agent readability correlates strongly with accessibility.
