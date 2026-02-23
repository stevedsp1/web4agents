---
title: "CDN et cache pour les agents"
slug: "cdn-and-caching"
description: "Comment configurer votre CDN et votre stratégie de cache pour servir efficacement les visiteurs humains et les agents IA."
category: "domain"
order: 3
publishedAt: "2026-02-01"
status: "published"
---

## Pourquoi le CDN et le cache comptent pour les agents

Les agents IA envoient des requêtes depuis des datacenters ; la latence et la disponibilité comptent. Un CDN rapproche le contenu des requêtes et le cache réduit la charge serveur et accélère les réponses. Une page servie rapidement a plus de chances d’être entièrement lue et indexée.

## Bonnes pratiques

- **Cache des pages statiques** : long `max-age` pour le contenu peu changeant.
- **Cache des API** : `s-maxage` et `stale-while-revalidate` pour les données fraîches mais performantes.
- **Invalidation** : invalider ou versionner quand le contenu change pour éviter de servir de l’obsolète.
- **User-Agent** : vous pouvez différencier le cache par type de client si nécessaire (généralement un cache commun suffit).

Voir [Performance](/fr/docs/performance) et [HTTPS](/fr/docs/https-and-security).
