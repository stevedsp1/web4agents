---
title: "Écrire pour les agents IA"
slug: "writing-for-agents"
description: "Comment structurer et rédiger le contenu pour que les agents IA puissent l'extraire, le résumer et le citer correctement."
category: "content-markup"
order: 1
publishedAt: "2026-02-01"
status: "published"
---

## Du contenu pour les humains au contenu pour les agents

Les agents IA ne « voient » pas la mise en page : ils lisent du texte et des données structurées. Pour être bien cités et bien résumés, il faut une rédaction claire, des titres et listes explicites, et des définitions directes (« La GEO est… »).

## Principes

- **Clarté** : Phrases courtes, un idée par paragraphe, vocabulaire précis.
- **Structure** : Titres (H2, H3), listes à puces, tableaux pour les comparaisons.
- **Définitions** : Définir les termes importants dès leur première occurrence.
- **Données structurées** : Schema.org (Article, FAQPage, etc.) pour les métadonnées et les faits.
- **Fraîcheur** : `datePublished` et `dateModified` en JSON-LD pour la récupération à jour.

Voir [RAG optimization](/fr/docs/rag-optimization), [Schema.org](/fr/docs/schema-org), [Content freshness](/fr/docs/content-freshness) et [E-E-A-T](/fr/docs/eeat).
