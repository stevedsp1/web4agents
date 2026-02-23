---
title: "Formulaires accessibles"
slug: "accessible-forms"
description: "Comment construire des formulaires que les agents IA et les outils automatisés peuvent comprendre et utiliser."
category: "content-markup"
order: 5
publishedAt: "2025-02-15"
status: "published"
---

Les formulaires sont le principal moyen pour les utilisateurs — et les agents IA — d’agir sur votre site : envoyer une demande, s’inscrire, acheter, vous contacter. Un formulaire accessible et bien étiqueté est aussi un formulaire lisible par les machines.

## Bonnes pratiques

- **Labels** : Chaque `<input>`, `<select>`, `<textarea>` a un `<label>` associé (attribut `for` ou contenu encapsulé).
- **Noms et placeholders** : Noms de champs explicites ; ne pas compter sur le seul placeholder pour le sens.
- **Erreurs** : Messages d’erreur explicites, associés aux champs (`aria-describedby`, `aria-invalid`).
- **Validation** : Indiquer les contraintes (requis, format) pour que les agents puissent remplir correctement.
- **Bouton d’envoi** : Texte explicite (« Envoyer », « S’abonner ») et `type="submit"`.

Les agents qui automatisent des tâches s’appuient sur ces signaux. Voir [DOM actionnable](/fr/docs/actionable-dom) et [HTML sémantique](/fr/docs/semantic-html).
