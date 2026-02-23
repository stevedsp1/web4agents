---
title: "Gestion des bots et scraping"
slug: "bot-management"
description: "Comment distinguer les agents IA légitimes des scrapers abusifs et quelles stratégies pour protéger votre contenu."
category: "security"
order: 1
publishedAt: "2026-02-22"
updatedAt: "2026-02-23"
status: "published"
---

## Le nouveau paysage des bots

Avec l'explosion des LLM, le trafic web est de plus en plus automatisé. Mais tous les bots ne se valent pas :

1. **Crawlers IA légitimes** : Opérés par des entités connues (OpenAI, Anthropic, Google, Perplexity). Ils s'identifient via `User-Agent`, respectent `robots.txt` et apportent de la valeur en augmentant la visibilité de votre marque dans les réponses IA.
2. **Scrapers abusifs** : Bots non identifiés qui volent du contenu pour entraîner des modèles privés ou scraper des données sans attribution, souvent en ignorant `robots.txt` et en surchargeant vos serveurs.

L'objectif d'une bonne gestion des bots : **laisser entrer les bons, limiter ou bloquer les abusifs**.

## Identifier les crawlers légitimes

Les crawlers IA légitimes publient les plages IP qu'ils utilisent. Vous pouvez croiser le `User-Agent` avec une résolution DNS inverse ou une liste officielle d'IPs pour vous assurer qu'un bot ne falsifie pas son identité.

| Crawler | Entreprise | User-Agent |
|---------|------------|-----------|
| GPTBot | OpenAI | `GPTBot` |
| ClaudeBot | Anthropic | `ClaudeBot` |
| PerplexityBot | Perplexity AI | `PerplexityBot` |
| Google-Extended | Google | `Google-Extended` |
| Meta-ExternalAgent | Meta | `Meta-ExternalAgent` |

## Stratégies de gestion

### 1. robots.txt granulaire

Ne bloquez pas tous les bots aveuglément. Autorisez explicitement les agents que vous souhaitez, tout en bloquant les acteurs malveillants connus. Voir [robots.txt](/fr/docs/robots-txt) pour la syntaxe complète.

### 2. Vérification User-Agent et IP

Pour les crawlers légitimes, vérifiez que le User-Agent correspond aux plages IP officielles. Un bot qui prétend être GPTBot mais vient d'une IP non-OpenAI est probablement un imposteur.

### 3. Rate limiting au niveau CDN/WAF

Implémentez le rate limiting dans votre CDN ou WAF (ex. Cloudflare) pour empêcher une seule IP de requêter des centaines de pages par seconde, qu'il s'agisse ou non d'un bot légitime. Voir [Rate limiting des agents](/fr/docs/rate-limiting-agents).

### 4. Content Signals

Précisez l'usage autorisé de votre contenu (entraînement, recherche, entrée agent) via les en-têtes Content Signals. Les crawlers respectueux en tiennent compte. Voir [Content Signals](/fr/docs/content-signals).

### 5. Honeypots

Utilisez des liens ou champs cachés dans votre HTML que seul un bot interagirait. Si un bot déclenche le honeypot, vous pouvez bloquer son IP en toute sécurité.

Cloudflare propose une fonctionnalité dédiée : **[AI Labyrinth](https://developers.cloudflare.com/bots/additional-configurations/ai-labyrinth/)**. Elle ajoute automatiquement des liens invisibles avec des balises `nofollow` sur vos pages. Les crawlers abusifs (qui ignorent `robots.txt`) se retrouvent piégés dans un labyrinthe de liens sans fin, tandis que les bots légitimes — qui respectent les instructions de non-crawl — les ignorent sans problème. Les informations des bots piégés sont partagées entre tous les clients Cloudflare. Cette option s'active depuis **Security → Bots → Configure Bot Fight Mode → AI Labyrinth** dans le dashboard Cloudflare, sans aucune modification de code.

## L'équilibre GEO

Le cœur de la GEO est de rendre votre site accessible aux agents IA. Une protection agressive (CAPTCHAs sur toutes les pages, blocage de tous les bots) brisera complètement vos efforts GEO. L'objectif est de laisser les « bons bots » entrer sans friction tout en tenant les « mauvais bots » à l'écart.

**Principe directeur** : ne bloquez jamais un crawler IA légitime si vous souhaitez être cité dans ses réponses.

## Outils et ressources

- [Cloudflare Bot Management](https://www.cloudflare.com/products/bot-management/) — protection bot au niveau CDN
- [robots.txt](/fr/docs/robots-txt) — contrôle d'accès par crawler
- [Rate limiting des agents](/fr/docs/rate-limiting-agents) — protéger les ressources serveur
- [Content Signals](/fr/docs/content-signals) — déclarer les permissions d'usage du contenu
- [Suivi du trafic des agents](/fr/docs/tracking-agent-traffic) — identifier et mesurer le trafic IA
