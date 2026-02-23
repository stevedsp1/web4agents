---
title: HTTPS et en-têtes de sécurité
slug: https-et-en-tetes-de-securite
description: Pourquoi HTTPS et les en-têtes de sécurité comptent pour la confiance des agents IA et la crédibilité du site.
category: domain
order: 1
publishedAt: '2025-02-15'
status: published
---

HTTPS est la base pour tout site public en 2025. Les crawlers IA, les navigateurs et les agents traitent les sites en HTTP comme non fiables et peuvent les ignorer ou les déprécier. Les en-têtes de sécurité ajoutent une couche supplémentaire de signaux de confiance.

## En-têtes recommandés

- **Strict-Transport-Security (HSTS)** : forcer le HTTPS.
- **X-Content-Type-Options: nosniff** : éviter le MIME sniffing.
- **X-Frame-Options** : limiter le framing (ex. DENY).
- **Content-Security-Policy** : restreindre les sources de scripts et ressources.
- **Referrer-Policy** : contrôler les informations envoyées en Referer.

Un certificat TLS valide et des en-têtes cohérents renforcent l’E-E-A-T et la façon dont les agents considèrent votre site. Voir [Performance](/fr/docs/performance) et [Checklist](/fr/docs/checklist).
