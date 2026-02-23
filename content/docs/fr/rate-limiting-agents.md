---
title: "Rate limiting des agents"
slug: "rate-limiting-agents"
description: "Protéger les ressources de votre serveur face à la croissance du trafic automatisé des agents IA."
category: "security"
order: 4
publishedAt: "2026-02-22"
status: "published"
---

## Le coût du trafic IA

Le trafic des crawlers et agents IA peut croître fortement. Sans limite, des milliers de requêtes par minute peuvent surcharger votre serveur, dégrader le service pour les humains et augmenter les coûts d’hébergement.

## Stratégies de rate limiting

- **Par IP** : limiter le nombre de requêtes par minute par adresse IP (ex. 60 req/min pour les GET).
- **Par user-agent** : appliquer des plafonds différents pour les crawlers connus (ex. plus permissif pour Googlebot, plus strict pour des user-agents inconnus).
- **Par chemin** : autoriser plus de requêtes sur les pages importantes (accueil, sitemap) et moins sur les API ou les pages lourdes.
- **En-têtes** : renvoyer `Retry-After` et des codes 429 clairs pour que les clients respectueux ralentissent.

Équilibrez avec votre volonté d’être crawlable : bloquer tout trafic IA peut réduire vos citations. Voir [Bot management](/fr/docs/bot-management) et [Tracking agent traffic](/fr/docs/tracking-agent-traffic).
