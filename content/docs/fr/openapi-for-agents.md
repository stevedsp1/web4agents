---
title: OpenAPI pour les agents
slug: openapi-pour-les-agents
description: 'Comment concevoir et exposer une spécification OpenAPI que les agents IA peuvent découvrir, comprendre et utiliser de façon autonome.'
category: protocols
order: 2
publishedAt: '2026-02-01'
status: published
---

## Pourquoi OpenAPI compte pour les agents IA

Les agents peuvent appeler des API pour accomplir des tâches (vérifier un prix, réserver, etc.). Une spécification OpenAPI bien rédigée décrit les endpoints, les paramètres et les schémas de façon machine-readable, ce qui permet aux agents de découvrir et d’utiliser votre API sans documentation humaine uniquement.

## Bonnes pratiques

- **Description et résumés** : décrire clairement chaque opération et chaque paramètre.
- **Exemples** : fournir des exemples de requêtes et de réponses.
- **Cohérence** : noms et structures prévisibles ; codes HTTP et erreurs explicites.
- **Découvrabilité** : lier l’API depuis llms.txt ou votre documentation pour que les agents la trouvent.

Les agents s’appuient sur OpenAPI pour construire des appels corrects. Voir [MCP](/fr/docs/mcp), [API publique](/fr/docs/public-api) et [llms.txt](/fr/docs/llms-txt).
