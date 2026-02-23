---
title: Injection de prompt indirecte
slug: injection-de-prompt-indirecte
description: Comprendre les risques du code source HTML malveillant et comment protéger les LLM qui visitent vos pages.
category: security
order: 2
publishedAt: '2026-02-22'
status: published
---

## Qu’est-ce que l’injection de prompt indirecte ?

L’injection de prompt **indirecte** se produit quand du contenu présent sur une page (texte visible ou caché dans le HTML) est lu par un LLM et interprété comme des instructions. Un attaquant peut tenter d’insérer du texte qui pousse le modèle à ignorer vos consignes, divulguer des données ou exécuter des actions non voulues.

## Mesures de protection

- **Contrôler le contenu** : modération des commentaires, des champs utilisateur et de tout contenu rendu dans la page.
- **Échappement et sanitization** : ne pas rendre de HTML/utilisateur non sanitized qui pourrait être lu comme instruction.
- **Séparation** : garder les instructions système et le contenu utilisateur clairement délimités côté applicatif (pour les produits qui envoient votre page à un LLM).
- **Conscience du risque** : tout contenu public crawlable peut finir dans le contexte d’un agent ; éviter d’y mettre de fausses « instructions » ou de l’information sensible.

Ce risque concerne surtout les produits qui envoient des pages web au LLM ; en tant qu’éditeur, sécuriser et modérer le contenu limite l’abus. Voir [Bot management](/fr/docs/bot-management) et [Data privacy](/fr/docs/data-privacy).
