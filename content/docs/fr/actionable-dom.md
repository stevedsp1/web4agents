---
title: "DOM actionnable"
slug: "actionable-dom"
description: "Comment structurer votre DOM pour que les agents IA identifient et interagissent avec les éléments clés."
category: "content-markup"
order: 3
publishedAt: "2025-02-15"
updatedAt: "2026-02-23"
status: "published"
---

Un DOM actionnable est un DOM dans lequel les agents IA peuvent identifier les éléments interactifs, comprendre leur rôle et les utiliser — que ce soit cliquer sur un bouton, remplir un formulaire ou suivre un lien pour accomplir une tâche.

## Qu'est-ce qu'un DOM actionnable ?

Les agents IA qui parcourent le web (comme ChatGPT en mode navigation, ou des agents Playwright) parsent le DOM de votre page pour trouver :

- **Liens** — pour naviguer vers du contenu pertinent
- **Boutons et CTA** — pour déclencher des actions
- **Formulaires** — pour soumettre des données ou des requêtes
- **Contenu texte** — pour extraire des faits et réponses

Si votre DOM est encombré, ambigu ou dépend d'événements JavaScript non exposés correctement, les agents échoueront à interagir avec votre page.

## Boutons et CTA

Chaque bouton doit avoir un libellé de texte clair et descriptif ou un `aria-label` :

```html
<!-- Mauvais : l'agent ne sait pas ce que ça fait -->
<button class="btn">Cliquez ici</button>

<!-- Bon : intention explicite -->
<button>Demander un audit gratuit</button>

<!-- Bon : bouton icône avec aria-label -->
<button aria-label="Partager sur Twitter">
  <svg>...</svg>
</button>
```

Règles clés :
- Utilisez `<button>` pour les actions, `<a>` pour la navigation.
- N'utilisez jamais `<div>` ou `<span>` comme éléments cliquables sans rôles ARIA.
- Évitez les libellés vagues : « Cliquez ici », « Envoyer », « Go » — préférez « S'abonner à la newsletter », « Télécharger le PDF », « Réserver une démo ».

## Liens

Les liens doivent avoir un texte descriptif — pas seulement « Lire plus » ou « En savoir plus » :

```html
<!-- Mauvais -->
<a href="/blog/guide-geo">Lire plus</a>

<!-- Bon -->
<a href="/blog/guide-geo">Lire notre guide GEO</a>
```

Les agents IA utilisent le texte du lien pour comprendre où il mène. Un texte vague casse la navigation pour les agents comme pour les lecteurs d'écran.

## Éléments interactifs avec ARIA

Pour les composants UI personnalisés qui ne sont pas des éléments HTML standard, ajoutez des rôles ARIA :

```html
<!-- Onglet -->
<div role="tab" aria-selected="true" aria-controls="panel-1">Paramètres</div>

<!-- Déclencheur de modal -->
<button aria-haspopup="dialog" aria-controls="contact-modal">Nous contacter</button>

<!-- Interrupteur -->
<button role="switch" aria-checked="false" aria-label="Activer les notifications">
  <span class="toggle-thumb"></span>
</button>
```

## Structure du contenu pour les agents

Les agents cherchent le contenu clé dans des emplacements prévisibles. Utilisez les landmarks :

```html
<header>
  <nav aria-label="Navigation principale">
    <a href="/">Accueil</a>
    <a href="/docs">Docs</a>
  </nav>
</header>

<main>
  <article>
    <h1>Titre de la page</h1>
    <p>Introduction...</p>
  </article>
</main>

<aside aria-label="Contenu connexe">
  <h2>Pages connexes</h2>
</aside>

<footer>
  <p>Contact : bonjour@example.com</p>
</footer>
```

## Contenu dépendant de JavaScript

De nombreux sites modernes chargent du contenu via JavaScript après le HTML initial. Les crawlers de récupération IA **n'exécutent souvent pas le JavaScript**, donc le contenu qui n'apparaît qu'après l'exécution du JS peut être invisible pour eux.

**Solutions :**
- Utilisez le rendu côté serveur (Next.js, Nuxt, SvelteKit avec SSR)
- Assurez-vous que le contenu critique (titre, description, corps principal, CTA) est présent dans le HTML initial
- Utilisez des fallbacks `<noscript>` pour les éléments clés

## Tester avec les agents

1. **Désactivez JavaScript** dans votre navigateur (`chrome://settings/content/javascript`) et rechargez votre page. Tout le contenu clé et les liens doivent encore être visibles.
2. **Utilisez curl** : `curl https://example.com/page` pour voir ce qu'un crawler sans JS voit.
3. **Lancez Lighthouse** (onglet Accessibility dans Chrome DevTools) — la lisibilité pour les agents corrèle fortement avec l'accessibilité.

## Checklist

- [ ] Tous les boutons ont un texte descriptif ou un `aria-label`
- [ ] Les liens ont un texte d'ancre descriptif (pas « cliquez ici »)
- [ ] `<button>` pour les actions, `<a>` pour la navigation
- [ ] Landmarks sémantiques (`<main>`, `<nav>`, `<header>`, `<footer>`)
- [ ] Contenu principal présent dans le HTML initial (pas seulement via JS)
- [ ] Composants personnalisés avec rôles ARIA appropriés

Voir [Formulaires accessibles](/fr/docs/accessible-forms), [HTML sémantique](/fr/docs/semantic-html) et la [checklist](/fr/docs/checklist).
