---
title: ETag
slug: etag
type: standard
description: En-tête HTTP qui identifie une version d'une ressource pour la validation de cache.
category: agent-facing
publishedAt: '2026-02-20'
status: published
relatedTerms:
  - cache-control
  - content-freshness
---

## Définition

**ETag** est un identifiant opaque envoyé par le serveur pour une ressource. Le client peut le renvoyer dans `If-None-Match` ; si la ressource n’a pas changé, le serveur renvoie 304 Not Modified. Utile pour le cache et la fraîcheur du contenu.

## Voir aussi

Lié : Cache-Control, Content freshness.
