---
title: "DOM actionnable"
slug: "actionable-dom"
description: "Comment structurer votre DOM pour que les agents IA identifient et interagissent avec les éléments clés."
category: "content-markup"
order: 3
publishedAt: "2025-02-15"
status: "published"
---

Un DOM actionnable est un DOM dans lequel les agents IA peuvent identifier les éléments interactifs, comprendre leur rôle et les utiliser — que ce soit cliquer sur un bouton, remplir un formulaire ou suivre un lien pour accomplir une tâche.

## Principes

- **Boutons et liens** : Libellés explicites (`aria-label` ou texte visible), pas de « Cliquez ici ».
- **Formulaires** : Chaque champ a un `<label>` associé ; les erreurs sont annoncées de façon accessible.
- **CTA** : Formulations claires et cohérentes (« Demander un audit », « S’abonner à la newsletter »).
- **Structure** : Landmarks (`<main>`, `<nav>`, `<form>`), titres hiérarchiques, pour que les agents comprennent la structure.

Un DOM bien structuré profite aussi au référencement et à l’accessibilité. Voir [Formulaires accessibles](/fr/docs/accessible-forms), [HTML sémantique](/fr/docs/semantic-html) et [checklist](/fr/docs/checklist).
