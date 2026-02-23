---
title: "sitemap.xml"
slug: "sitemap-xml"
description: "Pourquoi le sitemap.xml compte pour les agents IA et comment l'optimiser."
category: "structured-data"
order: 4
publishedAt: "2025-02-15"
status: "published"
---

Un fichier `sitemap.xml` indique aux moteurs de recherche et aux crawlers IA quelles pages existent sur votre site. Si les sitemaps sont un **pilier du SEO** depuis des années, ils sont tout aussi importants pour les agents IA qui doivent découvrir votre contenu efficacement.

## Pourquoi les agents ont besoin de votre sitemap

Les crawlers IA (GPTBot, ClaudeBot, PerplexityBot) utilisent les sitemaps pour :

- **Découvrir des pages** qu’ils ne trouveraient pas uniquement via les liens.
- **Prioriser le crawl** selon les signaux `<priority>` et `<lastmod>`.
- **Détecter les mises à jour** sans re-crawler les pages inchangées.

## Structure de base

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/products</loc>
    <lastmod>2025-01-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

## Bonnes pratiques pour les agents

1. **Inclure toutes les pages publiques** — Chaque page que vous voulez faire découvrir aux agents doit être listée.
2. **Garder `<lastmod>` à jour** — Les agents s’en servent pour décider s’ils doivent relire une page. Ne le mettez pas à « aujourd’hui » à chaque build.
3. **Utiliser `<priority>`** — Bien que non contraignant, cela indique les pages les plus importantes.
4. **Générer dynamiquement** — Utilisez la génération de sitemap de votre framework (Next.js `sitemap.ts`, sitemaps Django, etc.) pour rester synchronisé avec le contenu.
5. **Référencer dans robots.txt** — Ajoutez `Sitemap: https://example.com/sitemap.xml` dans votre `robots.txt` pour que les crawlers le trouvent automatiquement.

## Sitemap et llms.txt

Le sitemap liste **toutes les pages** de façon mécanique. Le fichier `llms.txt` apporte un **contexte curaté** sur ce qui compte le plus. Utilisez les deux : sitemap pour l’exhaustivité, llms.txt pour la clarté.

## Erreurs courantes

- **Lister des pages bloquées par robots.txt** — Si une page est en Disallow, ne l’incluez pas dans le sitemap.
- **Sitemaps périmés** — Un sitemap avec des `<lastmod>` obsolètes ou des pages manquantes est pire qu’aucun sitemap.
- **Trop d’URL dans un seul fichier** — Pour les grands sites, utilisez un index de sitemap pour répartir dans plusieurs fichiers (max 50 000 URL par fichier).
