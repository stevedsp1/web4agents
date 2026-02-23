---
title: "Fraîcheur du contenu"
slug: "content-freshness"
description: "Comment signaler la fraîcheur du contenu aux crawlers IA et aux moteurs, et pourquoi l'actualité compte pour les réponses générées par l'IA."
category: "technical-seo"
order: 3
publishedAt: "2026-02-01"
status: "published"
---

## Pourquoi la fraîcheur compte pour les agents IA

Les systèmes de récupération (Perplexity, ChatGPT avec navigation, etc.) utilisent des contenus à jour. Des signaux de date clairs augmentent les chances que votre page soit récupérée et citée avec des informations actuelles.

## Comment signaler la fraîcheur

- **JSON-LD** : `datePublished` et `dateModified` sur les types Article, BlogPosting, WebPage.
- **Open Graph** : `article:published_time`, `article:modified_time`.
- **Sitemap** : `<lastmod>` à jour pour que les crawlers sachent quand re-crawler.
- **Contenu** : Éviter les dates génériques (« mise à jour récemment ») ; privilégier des dates explicites.

Les agents et les moteurs utilisent ces signaux pour prioriser et afficher la date dans les extraits. Voir [Schema.org](/fr/docs/schema-org), [Sitemap](/fr/docs/sitemap-xml) et [Writing for agents](/fr/docs/writing-for-agents).
