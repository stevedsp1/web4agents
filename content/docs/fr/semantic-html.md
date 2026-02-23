---
title: "HTML sémantique"
slug: "semantic-html"
description: "Comment les éléments HTML sémantiques aident les agents IA à comprendre la structure de votre contenu."
category: "content-markup"
order: 4
publishedAt: "2025-02-15"
updatedAt: "2026-02-23"
status: "published"
---

L'HTML sémantique consiste à utiliser le bon élément HTML pour la bonne fonction. Au lieu de tout construire avec `<div>` et `<span>`, on utilise des éléments qui portent un sens : cela aide les agents IA, les moteurs de recherche et les lecteurs d'écran à comprendre la structure du contenu sans deviner.

## Pourquoi la sémantique compte pour les agents

Les crawlers IA parsent votre HTML pour extraire :

- **Le type de contenu** (article, produit, navigation…)
- **Le contenu principal** vs sidebar / pied de page
- **L'organisation du contenu** (titres, sections, listes)
- **Ce qui est important** vs secondaire

Les éléments sémantiques fournissent ces informations directement, sans que l'IA ait à les inférer depuis des noms de classes CSS ou le positionnement visuel.

## Éléments sémantiques essentiels

### Structure du document

```html
<header>   <!-- En-tête du site ou de section, logo, nav -->
<nav>      <!-- Liens de navigation -->
<main>     <!-- Contenu principal de la page (un seul par page) -->
<article>  <!-- Contenu auto-suffisant : article de blog, actualité -->
<section>  <!-- Regroupement thématique au sein d'une page -->
<aside>    <!-- Contenu secondaire : sidebar, liens connexes -->
<footer>   <!-- Pied de page du site ou de section -->
```

**Un seul `<main>` par page** — les agents IA utilisent `<main>` pour localiser le contenu principal et ignorer la navigation, les publicités et les sidebars.

### Titres

```html
<h1>Titre de la page (un seul par page)</h1>
<h2>Section principale</h2>
<h3>Sous-section</h3>
<h4>Sous-sous-section</h4>
```

Règles :
- Exactement un `<h1>` par page — le titre de la page.
- Ne jamais sauter de niveaux (ne pas passer de `<h2>` à `<h4>`).
- Utiliser les titres pour la structure, pas pour le style visuel — utilisez CSS pour la taille.

Les agents IA utilisent les titres pour comprendre le plan du document et pour « chunker » le contenu lors du traitement de pages longues.

### Listes

```html
<!-- Liste non ordonnée : éléments sans séquence -->
<ul>
  <li>Premier point</li>
  <li>Deuxième point</li>
</ul>

<!-- Liste ordonnée : étapes ou éléments classés -->
<ol>
  <li>Installer le package</li>
  <li>Configurer les paramètres</li>
  <li>Déployer</li>
</ol>

<!-- Liste de définitions : termes et leurs définitions -->
<dl>
  <dt>GEO</dt>
  <dd>Generative Engine Optimization — la pratique d'optimisation pour les agents IA.</dd>
</dl>
```

`<dl>` (liste de définitions) est particulièrement utile pour la GEO — il balise explicitement des paires terme-définition que les agents IA peuvent extraire proprement.

### Dates

```html
<time datetime="2026-01-15">15 janvier 2026</time>
<time datetime="2026-01-15T09:00:00Z">9h00 UTC</time>
```

L'attribut `datetime` fournit une date lisible par les machines. Les agents IA l'utilisent pour comprendre la fraîcheur du contenu.

### Sémantique inline

```html
<strong>texte important</strong>         <!-- Importance forte -->
<em>texte mis en emphase</em>            <!-- Emphase -->
<abbr title="Generative Engine Optimization">GEO</abbr>  <!-- Abréviation avec expansion -->
<code>robots.txt</code>                  <!-- Code ou terme technique -->
<cite>Nom de l'auteur</cite>             <!-- Source de citation -->
<q cite="https://source.com">Citation</q> <!-- Citation inline -->
```

`<abbr>` avec un attribut `title` est particulièrement utile pour la GEO — il développe les acronymes que les agents IA pourraient rencontrer sans contexte.

## Anti-patterns à éviter

```html
<!-- Mauvais : div soup non sémantique -->
<div class="header">
  <div class="menu">...</div>
</div>
<div class="content">
  <div class="title">Titre de la page</div>
  <div class="body">...</div>
</div>

<!-- Bon : balisage sémantique -->
<header>
  <nav>...</nav>
</header>
<main>
  <article>
    <h1>Titre de la page</h1>
    <p>...</p>
  </article>
</main>
```

## Checklist pratique

- [ ] Un seul `<h1>` par page correspondant au `<title>`.
- [ ] Les titres forment une hiérarchie logique (h1 → h2 → h3).
- [ ] `<main>` encapsule le contenu principal.
- [ ] `<nav>` est utilisé pour les blocs de navigation.
- [ ] `<article>` encapsule les contenus auto-suffisants.
- [ ] Les listes utilisent `<ul>`, `<ol>` ou `<dl>` — pas des balises `<p>`.
- [ ] Les dates utilisent `<time datetime="...">`.
- [ ] Les termes techniques sont encapsulés dans `<code>`.

L'HTML sémantique est la base de l'accessibilité et de la lisibilité par les agents. Voir [DOM actionnable](/fr/docs/actionable-dom), [Formulaires accessibles](/fr/docs/accessible-forms) et la [checklist](/fr/docs/checklist).
