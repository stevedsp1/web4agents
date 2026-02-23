---
title: "Données personnelles et ingestion par les LLM"
slug: "data-privacy"
description: "Comment éviter l'ingestion de données sensibles et rester conforme au RGPD face aux crawlers IA."
category: "security"
order: 3
publishedAt: "2026-02-22"
status: "published"
---

## Le défi de la confidentialité

Les crawlers IA parcourent le web et peuvent ingérer tout contenu public. Les données personnelles, les contenus sous droits ou les informations confidentielles ne doivent pas être exposés sur des pages crawlables sans contrôle.

## Bonnes pratiques

- **Exclusion par robots.txt** : bloquer l’accès aux zones contenant des données personnelles (comptes, paniers, API privées). Voir [robots.txt](/fr/docs/robots-txt).
- **Content Signals** : utiliser `ai-train=no` (et au besoin `search=no`, `ai-input=no`) pour les pages sensibles si le crawler respecte le cadre. Voir [Content Signals](/fr/docs/content-signals).
- **Authentification** : ne pas compter sur robots.txt pour la sécurité ; protéger les données sensibles par authentification et autorisation.
- **RGPD** : informer les utilisateurs de l’usage des données, y compris si des systèmes IA peuvent accéder à du contenu public ; respecter le consentement et les droits d’accès/suppression.

Voir [Bot management](/fr/docs/bot-management) et [Rate limiting](/fr/docs/rate-limiting-agents).
