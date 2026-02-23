---
title: "Schema.org"
slug: "schema-org"
description: "Comment utiliser le vocabulaire Schema.org pour aider les agents IA à comprendre votre contenu."
category: "structured-data"
order: 1
publishedAt: "2025-02-15"
status: "published"
---

Schema.org est un vocabulaire partagé pour décrire le sens du contenu web. Il est utilisé par Google, Bing, les crawlers IA et d’autres consommateurs de données pour comprendre de quoi parlent vos pages — pas seulement le texte, mais la structure et la sémantique.

## Ce que fait Schema.org

Sans données structurées, un agent IA qui lit votre page doit déduire le sens du contexte. Avec Schema.org, vous lui indiquez explicitement :

- « Cette page concerne un **produit** nommé X, au prix Y. »
- « Cette page est un **article** écrit par Z à la date D. »
- « Cette page appartient à une **organisation** avec ces coordonnées. »

Cela réduit l’ambiguïté et augmente les chances de citations précises.

## Types essentiels pour les sites prêts pour les agents

### Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Acme Corp",
  "url": "https://example.com",
  "description": "Nous fabriquons des widgets pour l'industrie automobile.",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@example.com",
    "contactType": "customer service"
  }
}
```

À ajouter sur chaque page ou sur la page d’accueil. Aide les agents à savoir qui gère le site.

### WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Acme Corp",
  "url": "https://example.com",
  "description": "Widgets pour l'industrie automobile."
}
```

### Article / BlogPosting

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Comment choisir le bon widget",
  "datePublished": "2025-01-15",
  "dateModified": "2025-02-01",
  "author": { "@type": "Person", "name": "Jane Smith" },
  "description": "Guide pratique pour le choix des widgets."
}
```

### Product

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Pro Widget X200",
  "description": "Widget industriel pour applications à couple élevé.",
  "offers": {
    "@type": "Offer",
    "price": "149.00",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  }
}
```

Indispensable pour l’e-commerce. Les agents IA récupèrent les données produit en temps réel ; les données structurées les rendent explicites.

### FAQPage

Le balisage FAQ est particulièrement utile pour la GEO — il fournit des paires question-réponse prêtes à être citées.

### BreadcrumbList

Aide les agents à comprendre où se situe une page dans la hiérarchie de votre site.

## Méthodes d’implémentation

Schema.org peut être implémenté via :

1. **JSON-LD** (recommandé) — Une balise `<script>` dans le `<head>`. Voir le [guide JSON-LD](/fr/docs/json-ld).
2. **Microdata** — Attributs inline sur les éléments HTML. Plus complexe, rarement utilisé aujourd’hui.
3. **RDFa** — Similaire au Microdata. Utilisé dans certains écosystèmes CMS.

**Le JSON-LD est préféré** car il sépare les données structurées de la présentation, est facile à maintenir et est le format privilégié par la plupart des systèmes IA.

## Validation

Après implémentation : [Google Rich Results Test](https://search.google.com/test/rich-results), [Schema.org Validator](https://validator.schema.org), [Bing Webmaster Tools](https://www.bing.com/webmasters).
