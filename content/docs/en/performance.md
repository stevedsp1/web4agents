---
title: "Performance & Core Web Vitals"
slug: "performance"
description: "How page performance affects AI agent crawling and content retrieval."
category: "domain"
order: 2
publishedAt: "2025-02-15"
status: "published"
---

Page performance affects how AI crawlers and retrieval systems access your content. Slow pages get skipped, timed out, or crawled less frequently. Core Web Vitals measure the aspects of performance that matter most to users and agents alike.

## Why performance matters for agents

- **Crawl timeouts** — AI retrieval crawlers have short timeouts (typically 5–10 seconds). If your page doesn't respond in time, it gets skipped.
- **Crawl budget** — Crawlers limit the total time spent on your domain. Faster pages mean more pages are crawled per session.
- **Rendering** — Agents that don't execute JavaScript rely entirely on fast initial HTML delivery.
- **Trust signals** — Slow, unreliable sites are deprioritized by AI systems that evaluate source quality.

## Core Web Vitals

Core Web Vitals are the metrics Google (and by extension, many AI systems) use to measure real-world page experience.

### LCP — Largest Contentful Paint

**What**: Time until the largest visible element (image, heading, or block of text) is rendered.
**Target**: < 2.5 seconds.

To improve LCP:
- Serve images in WebP or AVIF format.
- Use a CDN to serve assets from the edge.
- Preload your hero image with `<link rel="preload" as="image">`.
- Use server-side rendering so the largest element is in the initial HTML.

### CLS — Cumulative Layout Shift

**What**: Measures visual stability — how much the page jumps around while loading.
**Target**: < 0.1.

To improve CLS:
- Always specify `width` and `height` on images and videos.
- Avoid inserting content above existing content after load.
- Reserve space for ads or dynamically loaded content.

### INP — Interaction to Next Paint

**What**: Measures responsiveness — how quickly the page reacts to user interactions.
**Target**: < 200 milliseconds.

To improve INP:
- Minimize main-thread blocking JavaScript.
- Use `setTimeout` or `requestIdleCallback` to defer non-critical work.
- Avoid large JavaScript bundles.

## Time to First Byte (TTFB)

TTFB is the time from the browser (or crawler) making a request to receiving the first byte of the response. A high TTFB means a slow server.

**Target**: < 800ms.

Improvements:
- Use edge functions or CDN caching for static content.
- Optimize database queries for server-rendered pages.
- Use a fast hosting provider with servers close to your users.

## Measuring performance

- [PageSpeed Insights](https://pagespeed.web.dev) — Google's tool, powered by Lighthouse. Shows lab and field data.
- [web.dev/measure](https://web.dev/measure) — Same tool with more context.
- [WebPageTest](https://www.webpagetest.org) — Advanced testing with waterfall charts.
- Chrome DevTools → Lighthouse tab — Run locally.

## Quick wins

1. **Enable gzip or Brotli compression** on your server.
2. **Cache static assets** with long `Cache-Control` max-age values.
3. **Lazy-load images** below the fold with `loading="lazy"`.
4. **Minimize render-blocking resources** — defer or async non-critical scripts.
5. **Use a CDN** — Even for small sites, a CDN dramatically reduces latency for geographically distributed crawlers.

## Framework-specific

### Next.js

- Use the `<Image>` component — automatic WebP conversion, lazy loading, size optimization.
- Use `generateStaticParams` and SSG for pages that don't need real-time data.
- Enable the Next.js SWC compiler for faster builds and smaller bundles.

### General

- Set `Cache-Control: public, max-age=31536000, immutable` on versioned static assets (CSS, JS with content hash in filename).
- Set `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400` on pages served from a CDN.
