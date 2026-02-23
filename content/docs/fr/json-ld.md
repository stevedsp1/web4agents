---
title: "JSON-LD"
slug: "json-ld"
description: "Comment implémenter les données structurées JSON-LD dans votre HTML pour les agents IA et les moteurs de recherche."
category: "structured-data"
order: 2
publishedAt: "2025-02-15"
status: "published"
---

Le JSON-LD (JavaScript Object Notation for Linked Data) est le format recommandé pour ajouter des données structurées à vos pages web. Il intègre les données Schema.org dans une balise `<script>`, en les séparant du contenu visuel.

## Pourquoi le JSON-LD ?

- **Découplé du HTML** — Pas besoin d’ajouter des attributs à chaque élément. Un bloc script gère toutes les données structurées.
- **Facile à mettre à jour** — Modifiez les données en un seul endroit sans toucher à la mise en page.
- **Privilégié par Google et les systèmes IA** — Le JSON-LD est le format recommandé par Google et supporté par les systèmes de récupération IA.
- **Compatible avec les frameworks** — Facile à générer dynamiquement (Next.js, Nuxt, Django, etc.).

## Structure de base

```html
<head>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Titre de ma page",
    "description": "Description de ma page."
  }
  </script>
</head>
```

Le `@context` est toujours `"https://schema.org"`. Le `@type` définit le type Schema.org. Voir le [guide Schema.org](/fr/docs/schema-org) pour les types essentiels et la [documentation Schema.org](https://schema.org) pour la référence complète.
