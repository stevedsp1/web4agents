---
title: Code Mode
slug: code-mode
type: concept
description: Approche MCP qui expose peu d'outils (ex. search + execute) et exécute du code côté serveur pour limiter l'usage de tokens.
category: agent-facing
publishedAt: '2026-02-23'
status: published
relatedTerms:
  - mcp
  - token
  - openapi
---

## Définition

Le **Code Mode** est une façon de concevoir un serveur MCP pour de très grosses API : au lieu d’exposer un outil par endpoint (ce qui saturerait la fenêtre de contexte), le serveur n’expose que deux outils (par ex. `search()` pour explorer la spec, `execute()` pour appeler l’API). L’agent envoie du code (ex. JavaScript) exécuté en sandbox côté serveur ; l’empreinte en tokens reste fixe (~1 000 tokens) quelle que soit la taille de l’API.

## Voir aussi

Lié : MCP, Token, OpenAPI. Voir [Code Mode: give agents an entire API in 1,000 tokens](https://blog.cloudflare.com/code-mode-mcp/).
