---
title: "Négociation de contenu"
slug: "content-negotiation"
type: "concept"
description: "Mécanisme HTTP par lequel le client indique le format de réponse préféré (ex. Accept: text/markdown) et le serveur renvoie le format correspondant."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
relatedTerms: ["markdown-for-agents", "cdn-and-caching"]
---

## Définition

La **négociation de contenu** permet au client d’envoyer ses préférences (`Accept: text/markdown` ou `Accept: text/html`) et au serveur de répondre avec le format adapté. Pour la GEO, les agents peuvent demander du Markdown pour réduire les tokens et améliorer le parsing. Envoyer `Vary: Accept` si la réponse varie selon `Accept`.

## Voir aussi

Lié : Markdown for agents, CDN and caching.
