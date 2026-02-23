---
title: "Performance et Core Web Vitals"
slug: "performance"
description: "Comment la performance des pages affecte le crawl et la récupération de contenu par les agents IA."
category: "domain"
order: 2
publishedAt: "2025-02-15"
updatedAt: "2026-02-23"
status: "published"
---

La performance des pages influence la façon dont les crawlers IA et les systèmes de récupération accèdent à votre contenu. Les pages lentes sont ignorées, coupées par timeout ou crawlées moins souvent.

## Pourquoi la performance compte pour les agents

- **Timeouts** : Les crawlers de récupération IA ont des délais courts (généralement 5–10 secondes). Si votre page ne répond pas à temps, elle est ignorée.
- **Crawl budget** : Les crawlers limitent le temps total passé sur votre domaine. Des pages plus rapides signifient plus de pages crawlées par session.
- **Rendu** : Les agents qui n'exécutent pas JavaScript dépendent entièrement d'une livraison rapide du HTML initial.
- **Signaux de confiance** : Les sites lents et peu fiables sont déprioritisés par les systèmes IA qui évaluent la qualité des sources.

## Core Web Vitals

Les Core Web Vitals sont les métriques utilisées par Google (et, par extension, de nombreux systèmes IA) pour mesurer l'expérience réelle des pages.

### LCP — Largest Contentful Paint

**Quoi** : Temps jusqu'à ce que le plus grand élément visible (image, titre ou bloc de texte) soit rendu.  
**Cible** : < 2,5 secondes.

Pour améliorer le LCP :
- Servez les images au format WebP ou AVIF.
- Utilisez un CDN pour servir les assets depuis l'edge.
- Pré-chargez votre image hero avec `<link rel="preload" as="image">`.
- Utilisez le rendu côté serveur pour que le plus grand élément soit dans le HTML initial.

### CLS — Cumulative Layout Shift

**Quoi** : Mesure la stabilité visuelle — combien la page bouge pendant le chargement.  
**Cible** : < 0,1.

Pour améliorer le CLS :
- Spécifiez toujours `width` et `height` sur les images et vidéos.
- Évitez d'insérer du contenu au-dessus d'un contenu existant après le chargement.
- Réservez de l'espace pour les publicités ou le contenu chargé dynamiquement.

### INP — Interaction to Next Paint

**Quoi** : Mesure la réactivité — vitesse à laquelle la page réagit aux interactions.  
**Cible** : < 200 millisecondes.

Pour améliorer l'INP :
- Minimisez le JavaScript qui bloque le thread principal.
- Différez le travail non critique avec `requestIdleCallback`.
- Évitez les gros bundles JavaScript.

## Time to First Byte (TTFB)

Le TTFB est le temps entre la requête du navigateur (ou du crawler) et la réception du premier octet de la réponse.

**Cible** : < 800 ms.

Améliorations :
- Utilisez des edge functions ou le cache CDN pour le contenu statique.
- Optimisez les requêtes de base de données pour les pages server-rendered.
- Choisissez un hébergeur performant avec des serveurs proches de vos utilisateurs.

## Mesurer la performance

- [PageSpeed Insights](https://pagespeed.web.dev) — Outil de Google, données lab et terrain.
- [WebPageTest](https://www.webpagetest.org) — Tests avancés avec waterfall charts.
- Chrome DevTools → onglet Lighthouse — Tests locaux.

## Gains rapides

1. **Activez la compression gzip ou Brotli** sur votre serveur.
2. **Cachez les assets statiques** avec des valeurs `Cache-Control max-age` élevées.
3. **Chargez les images en lazy** sous la fold avec `loading="lazy"`.
4. **Minimisez les ressources bloquant le rendu** — différez ou asyncronisez les scripts non critiques.
5. **Utilisez un CDN** — même pour les petits sites, un CDN réduit drastiquement la latence pour les crawlers géographiquement distribués.

## Spécifique à Next.js

- Utilisez le composant `<Image>` — conversion WebP automatique, lazy loading, optimisation de taille.
- Utilisez `generateStaticParams` et SSG pour les pages qui n'ont pas besoin de données en temps réel.
- Activez le compilateur SWC pour des builds plus rapides et des bundles plus petits.

Voir [HTTPS et sécurité](/fr/docs/https-and-security), [CDN et cache](/fr/docs/cdn-and-caching) et la [checklist](/fr/docs/checklist).
