---
title: "Optimisation RAG"
slug: "rag-optimization"
description: "Comment optimiser votre contenu pour les pipelines RAG (Retrieval-Augmented Generation) utilisés par les agents IA et les applications LLM."
category: "content-markup"
order: 2
publishedAt: "2026-02-01"
status: "published"
---

## Qu’est-ce que le RAG ?

Le RAG (Retrieval-Augmented Generation) consiste à récupérer des passages pertinents dans un corpus (dont le web) puis à les fournir au LLM pour générer une réponse. Plus votre contenu est bien structuré, découpé et décrit, plus il a de chances d’être récupéré et cité.

## Bonnes pratiques

- **Chunking** : Contenu découpé en blocs cohérents (par section, par paragraphe) avec des titres clairs.
- **Densité sémantique** : Chaque bloc porte une idée claire ; éviter le remplissage.
- **Métadonnées** : Titre, description, dates dans le HTML et en JSON-LD pour le filtrage et le tri.
- **Liens internes** : Maillage logique pour que le graphe de contenu soit exploitable.
- **Markdown** : Proposer du Markdown peut réduire les tokens et améliorer la récupération. Voir [Markdown pour les agents](/fr/docs/markdown-for-agents).

Voir aussi [Writing for agents](/fr/docs/writing-for-agents) et [Content freshness](/fr/docs/content-freshness).
