---
title: "Indexation par les LLM"
slug: "llm-indexing"
description: "Comment les grands modèles de langage indexent et utilisent le contenu web, et ce que cela implique pour votre site."
category: "crawlers"
order: 3
publishedAt: "2025-02-15"
status: "published"
---

Comprendre comment les systèmes IA ingèrent et utilisent le contenu web vous aide à optimiser votre site pour avoir les meilleures chances d’être découvert, lu et cité par les agents IA.

## Flux typique

1. **Crawl** — Les crawlers (GPTBot, ClaudeBot, etc.) parcourent le web et envoient le contenu aux équipes d’entraînement ou aux systèmes de récupération.
2. **Entraînement ou récupération** — Le contenu est soit utilisé pour entraîner des modèles (avec date de coupure), soit récupéré en temps réel (RAG, recherche) pour des réponses à jour.
3. **Citation** — Lorsqu’un agent répond à une question, il peut citer vos pages s’il les a récupérées et si votre contenu est clair et structuré.

## Ce que vous pouvez faire

- Rendre votre contenu **lisible** (données structurées, sémantique claire).
- Utiliser **llms.txt** et **sitemap.xml** pour faciliter la découverte.
- Contrôler l’accès avec **robots.txt** et l’usage avec **Content Signals**.
- Signaler la fraîcheur (**datePublished**, **dateModified**) pour la récupération en temps réel.

Voir aussi [GEO vs SEO](/fr/docs/geo-vs-seo), [robots.txt](/fr/docs/robots-txt) et [content-signals](/fr/docs/content-signals).
