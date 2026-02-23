---
title: "Markdown pour les agents"
slug: "markdown-for-agents"
description: "Comment servir du Markdown directement aux agents IA plutôt que du HTML, pour réduire l'usage de tokens jusqu'à 80 % et améliorer la qualité du contenu."
category: "agent-config"
order: 3
publishedAt: "2026-02-12"
status: "published"
---

## Pourquoi le Markdown compte pour les agents

Les agents IA consomment du contenu sous forme de texte. Le HTML ajoute du bruit (balises, scripts, mise en page) et augmente la consommation de tokens. Servir une version Markdown de vos pages — via négociation de contenu (`Accept: text/markdown`) ou une URL dédiée — peut réduire l’usage de tokens de 60 à 80 % et rendre le contenu plus facile à parser et à citer.

## Mise en œuvre

- **Négociation de contenu** : Détecter `Accept: text/markdown` (ou un user-agent connu) et renvoyer `Content-Type: text/markdown` avec le corps en Markdown.
- **URL dédiée** : Proposer `/docs/page.md` ou `?format=markdown` en plus de la version HTML.
- **Génération** : Générer le Markdown à partir de votre source (CMS, MDX, etc.) pour rester synchronisé avec le HTML.

Associez cela à **llms.txt** pour indiquer aux agents que le Markdown est disponible. Voir aussi [writing-for-agents](/fr/docs/writing-for-agents) et [rag-optimization](/fr/docs/rag-optimization).
