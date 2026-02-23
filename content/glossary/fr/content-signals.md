---
title: "Content Signals"
slug: "content-signals"
type: "standard"
description: "Cadre ouvert pour déclarer les préférences d'usage du contenu aux systèmes IA via en-têtes HTTP ou balises meta (ai-train, search, ai-input)."
category: "agent-facing"
publishedAt: "2026-02-20"
status: "published"
website: "https://contentsignals.org"
relatedTerms: ["robots-txt", "geo", "llms-txt"]
---

## Définition

**Content Signals** est un cadre ouvert (annoncé par Cloudflare en septembre 2025) qui permet aux éditeurs d’exprimer comment leur contenu peut être utilisé après accès par un système IA. Il comble une lacune de robots.txt : robots.txt contrôle l’*accès*, pas l’usage du contenu *après* accès. Les trois dimensions : `ai-train`, `search`, `ai-input` (yes/no ou omis). Déclaration via l’en-tête HTTP `Content-Signal` ou la balise meta `content-signal`.

## Voir aussi

Lié : robots.txt, GEO, llms.txt.
