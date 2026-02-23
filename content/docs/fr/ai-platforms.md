---
title: "Optimisation par plateforme IA"
slug: "ai-platforms"
description: "Spécificités de chaque plateforme de recherche IA (Google, Perplexity, ChatGPT, Claude, Bing Copilot) et comment adapter votre optimisation."
category: "getting-started"
order: 6
publishedAt: "2026-02-23"
status: "published"
---

## Pourquoi les plateformes diffèrent

Chaque système de recherche IA a une architecture, des sources et un pipeline de récupération différents. Une bonne base SEO/GEO couvre l'essentiel pour toutes les plateformes, mais comprendre les spécificités de chacune permet d'ajuster la stratégie.

## Google AI Overviews & AI Mode

**Crawler** : `Googlebot` (traditionnel) + `Google-Extended` (Gemini/IA)

**Caractéristiques :**
- Deux surfaces distinctes : AI Overviews (résumé one-shot SERP) et AI Mode (conversationnel)
- Prérequis minimal : page indexée + éligible aux snippets
- Utilise le **Knowledge Graph** pour désambiguïsation et fact-checking
- AI Mode : query fan-out (8–12 sous-requêtes parallèles), citations avec fragments `#:~:text=`
- Grounding souvent pré-chargé dans la page source, même sans bloc AIO visible

**Leviers prioritaires :**
- Indexation propre + `datePublished`/`dateModified` en JSON-LD
- Données structurées (Article, FAQPage, HowTo, Product…)
- Entités reconnues dans le Knowledge Graph (`sameAs` + Wikidata)
- E-E-A-T : auteurs identifiés, backlinks de qualité

Voir [AI Overviews et AI Mode](/fr/docs/ai-overviews) et [Entités et Knowledge Graph](/fr/docs/entities-knowledge-graph).

## Perplexity

**Crawler** : `PerplexityBot`

**Caractéristiques :**
- Moteur de réponse en temps réel : Perplexity crawle en direct lors d'une requête
- Citations systématiques : chaque affirmation est attribuée à une source avec lien
- Forte préférence pour le contenu récent, factuel et bien sourcé
- Lit directement le HTML — ne dépend pas d'un index vieilli

**Leviers prioritaires :**
- Fraîcheur : mettre à jour régulièrement le contenu, `dateModified` visible
- Structure : titres H2/H3 clairs, paragraphes courts, listes — Perplexity extrait des passages
- Faits vérifiables : citer des sources, inclure des données chiffrées
- TTFB et disponibilité : Perplexity crawle en temps réel, un serveur lent = page ignorée
- Autoriser `PerplexityBot` dans `robots.txt`

## ChatGPT Search (SearchGPT)

**Crawlers** : `GPTBot` (indexation), `OAI-SearchBot` (recherche), `ChatGPT-User` (navigation utilisateur)

**Caractéristiques :**
- Deux modes : réponses depuis le dataset d'entraînement (coupure de connaissance) ou recherche en temps réel via SearchGPT
- SearchGPT cite des sources avec liens et fragments de texte
- Architecture RAG : récupération → augmentation du contexte → génération
- Particulièrement sensible aux pages avec contenu dense, listes et définitions

**Leviers prioritaires :**
- Autoriser `GPTBot` et `OAI-SearchBot` dans `robots.txt` (si vous souhaitez être cité)
- Contenu clair et factuel, citations de sources
- Markdown disponible (`Accept: text/markdown`) pour réduire la consommation de tokens
- `llms.txt` pour guider la compréhension du site

## Bing / Microsoft Copilot

**Crawler** : `Bingbot`

**Caractéristiques :**
- Copilot est alimenté par l'index Bing — l'optimisation Bing = optimisation Copilot
- Bing Webmaster Tools est l'équivalent de Google Search Console pour Bing
- Supporte IndexNow (indexation quasi-temps réel lors d'une mise à jour)
- Citations Copilot affichées avec source et lien

**Leviers prioritaires :**
- Vérifier votre site dans [Bing Webmaster Tools](https://www.bing.com/webmasters)
- Activer **IndexNow** pour notifier Bing immédiatement lors d'une publication ou mise à jour
- Mêmes données structurées que pour Google (Schema.org, JSON-LD)
- Autoriser `Bingbot` dans `robots.txt`

## Claude (Anthropic)

**Crawler** : `ClaudeBot`

**Caractéristiques :**
- Claude peut naviguer sur le web (mode de navigation activé par l'utilisateur) ou s'appuyer sur ses données d'entraînement
- Respecte scrupuleusement `robots.txt`
- Lit le HTML propre — préfère le contenu statique ou SSR
- Particulièrement sensible à la structure sémantique claire

**Leviers prioritaires :**
- Autoriser `ClaudeBot` dans `robots.txt`
- HTML sémantique propre, sans JS-only content
- Contenu bien structuré avec titres hiérarchiques

## Gemini (Google, hors Search)

**Remarque** : Gemini utilisé directement (gemini.google.com) est distinct de Google AI Mode dans Search. Il peut utiliser Google Search comme outil ou s'appuyer sur le dataset d'entraînement.

**Crawler associé** : `Google-Extended`

Pour Gemini en mode de grounding web, les mêmes recommandations que pour AI Mode s'appliquent.

## Vue d'ensemble comparative

| Plateforme | Crawler à autoriser | Signal le plus important | Outil de suivi |
|-----------|--------------------|-----------------------|----------------|
| Google AIO/AIM | `Google-Extended` | Indexation + snippets + KG | Google Search Console |
| Perplexity | `PerplexityBot` | Fraîcheur + structure | Logs serveur |
| ChatGPT Search | `GPTBot`, `OAI-SearchBot` | robots.txt permissif + contenu dense | Logs serveur |
| Bing Copilot | `Bingbot` | IndexNow + Bing WMT | Bing Webmaster Tools |
| Claude | `ClaudeBot` | HTML propre + SSR | Logs serveur |

## Ce que toutes les plateformes ont en commun

Malgré leurs différences, toutes les plateformes de recherche IA valorisent :

1. **Contenu bien structuré** — titres, listes, tableaux, définitions explicites
2. **Faits vérifiables avec dates** — `datePublished`, `dateModified`, sources citées
3. **Pages rapides et accessibles** — TTFB bas, SSR/SSG, pas de contenu JS-only
4. **Permissions claires** — `robots.txt` configuré, `llms.txt` disponible
5. **Autorité perçue** — E-E-A-T, backlinks, entités reconnues

La GEO est une pratique qui s'applique à toutes ces plateformes simultanément. Une base solide SEO + données structurées + contenu de qualité couvre 80 % des besoins pour chaque plateforme.

Voir la [checklist](/fr/docs/checklist) pour un audit complet.
