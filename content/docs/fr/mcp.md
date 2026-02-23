---
title: "Model Context Protocol (MCP)"
slug: "mcp"
description: "Ce qu'est le MCP, comment il fonctionne et comment exposer vos services aux agents IA via un protocole standardisé."
category: "protocols"
order: 1
publishedAt: "2026-02-01"
status: "published"
---

## Qu’est-ce que le Model Context Protocol ?

Le **Model Context Protocol (MCP)** est un protocole ouvert qui permet à des serveurs d’exposer des ressources (fichiers, données, outils) à des clients IA de façon standardisée. Les agents peuvent ainsi découvrir et utiliser vos services sans intégration ad hoc.

## Intérêt pour la GEO

En exposant un serveur MCP, vous permettez aux applications compatibles (clients Claude, etc.) d’accéder à votre contenu, à vos API ou à vos outils de manière structurée. C’est un complément aux approches « web classique » (HTML, llms.txt, API REST) pour les usages programmatiques.

## Contexte et alternatives (Code Mode)

Chaque outil exposé via MCP consomme des **tokens** dans la fenêtre de contexte du modèle. Pour une API très grande (des centaines ou milliers d’endpoints), un serveur MCP « classique » (un outil par opération) peut dépasser le contexte disponible. Le **Code Mode** est une approche qui limite ce coût : au lieu de milliers d’outils, le serveur n’expose que deux outils (par ex. `search()` pour explorer la spec, `execute()` pour appeler l’API). L’agent envoie du code (ex. JavaScript) exécuté en sandbox côté serveur ; l’empreinte en tokens reste fixe (de l’ordre du millier de tokens) quelle que soit la taille de l’API. Cloudflare en fait une démonstration pour toute son API : [Code Mode: give agents an entire API in 1,000 tokens](https://blog.cloudflare.com/code-mode-mcp/).

## Ressources

Spécification et documentation : [modelcontextprotocol.io](https://modelcontextprotocol.io). Pour exposer des API REST consommables par les agents, voir aussi [OpenAPI pour les agents](/fr/docs/openapi-for-agents) et [API publique](/fr/docs/public-api).
