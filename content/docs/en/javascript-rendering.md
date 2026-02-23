---
title: "JavaScript Rendering & AI Crawlers"
slug: "javascript-rendering"
description: "How AI agents process JavaScript (CSR vs SSR/SSG) and why server/static rendering is vital for GEO."
category: "technical-seo"
order: 6
publishedAt: "2026-02-22"
status: "published"
---

## The JavaScript Rendering Problem

Historically, search engine bots have struggled with JavaScript. While Googlebot eventually became capable of rendering Client-Side Rendering (CSR) pages (often with a delay), the new wave of AI agents and LLM crawlers are much more limited.

Many AI crawlers (like GPTBot, ClaudeBot, or PerplexityBot) act more like simple HTTP fetchers. When they encounter a CSR application (like a standard React, Vue, or Angular SPA), they see an empty `<div id="root"></div>` and a `<script>` tag. They often do not execute the JavaScript, meaning they index exactly zero content from your page.

## CSR vs. SSR vs. SSG for Agents

### Client-Side Rendering (CSR)
**How it works**: The server sends a nearly empty HTML file. JavaScript executes in the browser to fetch data and render the UI.
**Agent visibility**: **Poor to None**. Most agents will not wait for hydration or execute the JS.

### Server-Side Rendering (SSR)
**How it works**: The server fetches data and renders the full HTML on every request.
**Agent visibility**: **Excellent**. The agent receives a fully formed HTML document immediately.

### Static Site Generation (SSG)
**How it works**: The HTML is generated at build time.
**Agent visibility**: **Excellent**. Similar to SSR, the agent receives fully formed, fast-loading HTML.

## Why SSR/SSG is Vital for GEO

For Generative Engine Optimization (GEO), the goal is to make your content as easily accessible to machines as possible. 

1. **Token Efficiency**: Executing JS requires headless browsers, which are expensive and slow. Agents prefer to parse static HTML (or Markdown).
2. **Immediate Indexing**: If an agent is browsing the web in real-time to answer a user's prompt (e.g., Perplexity or SearchGPT), it cannot wait for a 5-second JS hydration process. It will skip your site and use a faster competitor.
3. **Structured Data Reliability**: JSON-LD tags must be present in the initial HTML payload to guarantee they are read by all crawlers.

## Best Practices

- **Use Frameworks with Built-in SSR/SSG**: Next.js, Nuxt, Astro, or SvelteKit are ideal for GEO.
- **Hydrate Only What's Necessary**: Keep the initial HTML payload rich in content, and use JS only for interactivity (Islands Architecture).
- **Test with curl**: The simplest way to test if your site is agent-ready is to fetch it with `curl`. If the content is missing from the output, it is invisible to most AI agents.