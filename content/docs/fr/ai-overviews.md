---
title: "AI Overviews et AI Mode (Google)"
slug: "ai-overviews"
description: "Comment fonctionnent les AI Overviews et AI Mode de Google, comment y apparaître, et ce que les éditeurs peuvent faire pour optimiser leur visibilité."
category: "getting-started"
order: 4
publishedAt: "2026-02-23"
status: "published"
---

## Deux surfaces IA distinctes sur Google

Google a déployé deux surfaces de recherche générative qui coexistent sur la même plateforme mais fonctionnent très différemment :

| | AI Overviews (AIO) | AI Mode (AIM) |
|--|-------------------|--------------|
| **Déclenchement** | Automatique, quand Google le juge utile | Initié par l'utilisateur (onglet dédié) |
| **Type** | Résumé one-shot en haut de la SERP | Interface conversationnelle, multi-tours |
| **Modèle** | Gemini custom (Gemini 3 depuis jan. 2026) | Gemini custom + routage intelligent |
| **Requêtes parallèles** | Minimal | 8–12 sous-requêtes (fan-out) |
| **Entités KG exposées** | Liens d'entités (sans MID) | MIDs Knowledge Graph complets |

## Le pipeline AIO (Grounding → Pool → Affiché)

Contrairement à la croyance populaire, toutes les sources utilisées par AIO ne sont pas montrées à l'utilisateur. Le pipeline se déroule en 4 étapes :

1. **Information Retrieval (IR)** : Le moteur sélectionne une liste initiale de dizaines à centaines de pages candidates.
2. **Grounding** : Un sous-ensemble filtré est fourni à Gemini comme base factuelle. Ces URLs sont souvent déjà intégrées dans le code source de la page, même si aucun bloc AIO n'est affiché.
3. **Pool** : Sélection classée + injections (quasi-exclusivement des vidéos YouTube).
4. **Affiché** : Reranking final par Gemini. Certaines URLs du Pool sont rejetées avant l'affichage.

### Les trois couches de visibilité

Pour une même page de résultats, on peut distinguer :

- **Couche 1 — Sidebar visible** : les sources que l'utilisateur voit quand il déplie le panneau latéral
- **Couche 2 — Citations in-text** : petits numéros en exposant dans le texte IA, avec fragments `#:~:text=` pointant vers des passages précis
- **Couche 3 — URLs de grounding cachées** : consultées par le modèle, mais Google choisit de ne pas les afficher

Conséquence pour les éditeurs : une page peut contribuer à une réponse AIO sans jamais apparaître comme citation visible. Les études qui ne distinguent pas « grounding » et « affiché » peuvent biaiser leurs conclusions.

## AI Mode et Knowledge Graph

AI Mode, à la différence d'AIO, expose des MIDs réels du Knowledge Graph (`/m/xxx` ou `/g/xxx`) via le paramètre `kgmid`. Il s'appuie sur :

- **Knowledge Graph** — désambiguïsation et fact-checking
- **Shopping Graph** — plus de 50 milliards de produits référencés
- **Places Graph (Google Maps)** — entités locales et ancrage géographique

Être reconnu comme une entité dans le Knowledge Graph de Google est l'un des leviers les plus puissants pour la visibilité dans AI Mode. Voir [Entités et Knowledge Graph](/fr/docs/entities-knowledge-graph).

## Comment être éligible

Google Search Central est explicite sur le sujet :

> « Pour être éligible à apparaître comme lien de support dans les AI Overviews ou AI Mode, une page doit être indexée et éligible à l'affichage dans Google Search avec un snippet. Il n'y a pas d'exigences techniques supplémentaires. »

En pratique, les facteurs qui augmentent les chances d'apparaître :

- **Indexation et snippet** — prérequis absolu : page indexée, pas de `nosnippet`, pas de `noindex`
- **E-E-A-T** — contenu perçu comme expérimenté, expert, autorisé et fiable
- **Données structurées** — JSON-LD clair (Article, FAQPage, HowTo, etc.)
- **Contenu structuré et factuellement dense** — titres, listes, tableaux, définitions explicites
- **Fraîcheur** — `datePublished` et `dateModified` à jour
- **Backlinks et autorité** — signal de confiance pour le grounding

## AIO vs AIM : des systèmes différents

Une observation constante : les URLs citées dans AIO et AIM se recoupent très peu pour une même requête. Ce ne sont pas deux vues du même pipeline. Les stratégies de récupération, les jeux de sources et les critères de classement diffèrent.

**Implication pratique** : optimiser pour l'un n'optimise pas automatiquement pour l'autre. Une présence solide dans la recherche organique traditionnelle reste le meilleur socle commun.

## Fragments de texte et passages cités

Dans AI Mode, les citations pointent souvent vers des passages précis via des fragments `#:~:text=`. Google cible le paragraphe exact qu'il a considéré le plus pertinent pour répondre à la requête.

Pour optimiser ces passages :
- Chaque section doit être **auto-suffisante** (compréhensible hors contexte)
- Répondre directement à une question en début de section (pyramide inversée)
- Éviter les longues introductions avant d'arriver au fait

## Surveiller sa visibilité

Des outils permettent d'analyser les réponses AIO et AI Mode :

- **[AIO/AIM Inspector](https://think.resoneo.com/aio-aim-deepdive/)** (RESONEO) — extension Chrome qui extrait les URLs de grounding, le pool et les citations affichées sur les pages de recherche Google
- **Google Search Console** — Performance → onglet Recherche, surveiller les impressions et les CTR sur les requêtes où AIO peut réduire les clics
- **Recherche manuelle** — poser des questions pertinentes dans Google et noter si votre site est cité

## Checklist d'optimisation AIO/AIM

- [ ] Pages indexées et éligibles aux snippets (pas de `noindex`, pas de `nosnippet`)
- [ ] JSON-LD Article/BlogPosting avec `datePublished`, `dateModified`, `author`
- [ ] Titres descriptifs et auto-suffisants (répondent à une question)
- [ ] Contenu structuré : listes, tableaux, définitions explicites
- [ ] Sections courtes et denses (éviter les murs de texte)
- [ ] FAQs sur les pages clés (correspondent aux requêtes conversationnelles)
- [ ] E-E-A-T : auteurs identifiés, bios, `sameAs`, page About
- [ ] `dateModified` à jour sur le contenu révisé

Voir [E-E-A-T](/fr/docs/eeat), [Écrire pour les agents](/fr/docs/writing-for-agents), [Entités et Knowledge Graph](/fr/docs/entities-knowledge-graph) et [Surveillance des citations](/fr/docs/monitoring-citations).
