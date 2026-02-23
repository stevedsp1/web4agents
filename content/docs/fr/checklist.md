---
title: "Checklist de démarrage"
slug: "checklist"
description: "Une checklist pratique pour rendre votre site prêt pour les agents, étape par étape."
category: "getting-started"
order: 3
publishedAt: "2025-02-15"
status: "published"
---

Utilisez cette checklist comme point de départ. Chaque point renvoie à un guide dédié. Vous n’avez pas besoin de tout mettre en place d’un coup — commencez par les éléments à plus fort impact.

## Crawl et accès

- [ ] **`robots.txt` est présent** et autorise ou interdit correctement les crawlers IA par user-agent. ([Guide robots.txt](/fr/docs/robots-txt))
- [ ] **`llms.txt` est présent** à la racine de votre domaine avec une description claire du site. ([Guide llms.txt](/fr/docs/llms-txt))
- [ ] **`sitemap.xml` est à jour** et référencé dans `robots.txt`. ([Guide sitemap.xml](/fr/docs/sitemap-xml))
- [ ] Toutes les pages importantes sont indexées (non bloquées par `noindex` ou `robots.txt` par erreur).

## Données structurées

- [ ] **Le balisage Schema.org** est en place pour vos principaux types de contenu (Article, Product, Organization, FAQ…). ([Guide Schema.org](/fr/docs/schema-org))
- [ ] **Le JSON-LD** est utilisé pour les données structurées (préféré au Microdata). ([Guide JSON-LD](/fr/docs/json-ld))
- [ ] **Les balises Open Graph** sont définies sur toutes les pages (`og:title`, `og:description`, `og:image`). ([Guide Open Graph](/fr/docs/open-graph))

## HTML et sémantique

- [ ] **La hiérarchie des titres est claire** : un `<h1>` par page, structure logique `<h2>`–`<h6>`. ([Guide HTML sémantique](/fr/docs/semantic-html))
- [ ] **Les landmarks** sont utilisés : `<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`. ([Guide HTML sémantique](/fr/docs/semantic-html))
- [ ] **Le DOM est actionnable** : boutons avec libellés explicites, CTA clairs, formulaires avec labels associés. ([Guide DOM actionnable](/fr/docs/actionable-dom))
- [ ] **Les formulaires sont accessibles** : tous les champs ont un `<label>`, messages d’erreur explicites, navigation au clavier fonctionnelle. ([Guide Formulaires accessibles](/fr/docs/accessible-forms))

## Performance et hébergement

- [ ] **HTTPS est activé** avec un certificat TLS valide. ([Guide HTTPS](/fr/docs/https-and-security))
- [ ] **Les Core Web Vitals sont bons** : LCP < 2,5 s, CLS < 0,1, INP < 200 ms. ([Guide Performance](/fr/docs/performance))
- [ ] **Les en-têtes de sécurité** sont définis : `Strict-Transport-Security`, `X-Frame-Options`, `Content-Security-Policy`. ([Guide HTTPS](/fr/docs/https-and-security))

## Analytics et suivi

- [ ] **Le trafic des agents est suivi** : les user-agents des crawlers IA sont identifiés dans vos analytics. ([Suivi du trafic agents](/fr/docs/tracking-agent-traffic))
- [ ] Vous avez une démarche pour **surveiller les citations** dans les réponses générées par l’IA. ([Surveillance des citations](/fr/docs/monitoring-citations))

---

## Priorisation

Utilisez ce barème pour prioriser :

| Priorité | Éléments |
|----------|----------|
| **Haute** | robots.txt, llms.txt, sitemap.xml, HTTPS, Schema.org |
| **Moyenne** | JSON-LD, Open Graph, hiérarchie des titres, Core Web Vitals |
| **Basse** | Cache CDN, surveillance des citations, entités Knowledge Graph |

Commencez par les éléments de haute priorité. Ils ont le plus d’impact sur la découvrabilité et la confiance pour les agents.
