---
title: Content Signals
slug: content-signals
description: 'Le cadre Content Signals : comment déclarer vos préférences d''usage du contenu aux agents IA via les en-têtes HTTP et les balises meta HTML.'
category: agent-config
order: 4
publishedAt: '2026-02-01'
status: published
---

## Qu’est-ce que Content Signals ?

**Content Signals** est un cadre ouvert (annoncé par Cloudflare en septembre 2025) qui permet à tout éditeur de contenu d’exprimer ses préférences sur l’usage de son contenu une fois qu’il a été accédé par un système IA.

La spécification officielle est maintenue sur [contentsignals.org](https://contentsignals.org/).

Elle répond à un problème fondamental : `robots.txt` contrôle l’*accès* (peut-on crawler ?), mais n’a pas de mécanisme pour exprimer ce qui peut être fait avec le contenu *après* accès. Content Signals comble cette lacune.

## Les trois dimensions de permission

| Dimension | Clé | Description |
|-----------|-----|-------------|
| **Entraînement IA** | `ai-train` | Ce contenu peut-il servir à entraîner des modèles IA ? |
| **Recherche IA** | `search` | Ce contenu peut-il apparaître dans les résultats de recherche générés par l’IA ? |
| **Entrée IA** | `ai-input` | Ce contenu peut-il être inclus dans les contextes LLM (usage agentique) ? |

Chaque dimension peut être `yes`, `no`, ou omise (non spécifiée).

## Déclarer Content Signals

### Via l’en-tête HTTP

L’en-tête `Content-Signal` est la méthode principale :

```
Content-Signal: ai-train=yes, search=yes, ai-input=yes
```

Exemples : autoriser uniquement la recherche (`ai-train=no, search=yes, ai-input=no`), tout interdire, ou tout autoriser. Vous pouvez aussi utiliser des balises `<meta>` pour les pages où vous ne contrôlez pas les en-têtes. Voir la [spécification](https://contentsignals.org/) pour les détails.
