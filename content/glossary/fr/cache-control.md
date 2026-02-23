---
title: "Cache-Control"
slug: "cache-control"
type: "standard"
description: "En-tête HTTP qui définit combien de temps et où une réponse peut être mise en cache (navigateurs, CDN, intermédiaires)."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["cdn-and-caching", "etag", "content-freshness"]
---

## Définition

L’en-tête de réponse **Cache-Control** indique aux caches (navigateurs, CDN) comment stocker et réutiliser la réponse. Directives courantes : `max-age=N`, `public` / `private`, `stale-while-revalidate`, `no-cache`, `no-store`. Pour la GEO, un bon réglage équilibre fraîcheur et performance pour les agents.

## Voir aussi

Lié : CDN and caching, ETag, Content freshness.
