---
title: "API publique"
slug: "public-api"
description: "Référence de l'API JSON pour le glossaire et le blog Web4Agents."
category: "protocols"
order: 3
publishedAt: "2025-02-15"
status: "published"
---

Web4Agents expose une API JSON publique pour l’accès programmatique aux entrées du glossaire et aux articles du blog. Elle est destinée aux agents IA, aux développeurs et aux outils qui ont besoin d’un accès structuré au contenu.

## Endpoints

- **Glossaire (liste)** : `GET /api/glossary?locale=fr` — liste des termes avec slug, titre, type, etc.
- **Glossaire (terme)** : `GET /api/glossary/[term]?locale=fr` — détail d’un terme.
- **Blog (liste)** : `GET /api/blog?locale=fr` — liste des articles.
- **Blog (article)** : `GET /api/blog/[slug]?locale=fr` — détail d’un article.

Le paramètre `locale` est optionnel (défaut : `en`). Valeurs supportées : `en`, `fr`. Rate limit : 60 requêtes par minute par IP pour les GET. Cache : `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`. Pour plus de détails, voir la section API dans la [page Documentation](/fr/docs) du site.
