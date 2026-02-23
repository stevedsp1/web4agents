---
title: Surveillance des citations
slug: surveillance-des-citations
description: Comment suivre quand votre site est cité dans les réponses générées par l'IA et mesurer votre visibilité dans l'IA.
category: analytics
order: 2
publishedAt: '2025-02-15'
status: published
---

Quand un système IA comme ChatGPT, Perplexity ou Claude répond à une question en s’appuyant sur votre contenu, c’est une **citation** — l’équivalent IA d’une position dans les résultats de recherche. Surveiller les citations permet de mesurer l’efficacité de votre GEO et votre influence sur le web piloté par l’IA.

## Visible vs caché : ce que vous mesurez

Sur les surfaces de recherche générative (ex. Google AI Overviews, AI Mode), toutes les sources utilisées par le modèle ne sont pas affichées à l’utilisateur : une partie reste en **grounding caché** (URLs consultées mais non montrées). Les études qui ne distinguent pas « URLs de grounding » et « URLs affichées » peuvent biaiser les conclusions. Pour une analyse détaillée du pipeline de citations (grounding → pool → affiché) et des outils pour extraire ces données sur Google, voir l’étude [AIO/AIM Deep-dive — RESONEO](https://think.resoneo.com/aio-aim-deepdive/), qui décrit notamment l’extension Chrome **AIO/AIM Inspector** (analyse des URLs de grounding et des citations affichées sur les pages de recherche Google).

## Approches

- **Recherche manuelle** : poser des questions pertinentes dans les interfaces IA et noter si votre site est cité.
- **Outils tiers** : des services commencent à proposer le suivi des citations (à évaluer selon votre budget). Pour Google spécifiquement, l’outil [AIO/AIM Inspector](https://think.resoneo.com/aio-aim-deepdive/) (RESONEO) permet d’analyser les réponses AI Overviews et AI Mode (grounding, pool, citations affichées).
- **Signaux indirects** : trafic référent depuis des domaines IA, demandes API, ou logs de crawlers croisés avec des mises à jour de contenu.

Combinez avec le [suivi du trafic des agents](/fr/docs/tracking-agent-traffic) et les [outils de suivi SEO/GEO](/fr/docs/monitoring-tools) pour une vue d’ensemble.
