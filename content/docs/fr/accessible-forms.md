---
title: "Formulaires accessibles"
slug: "accessible-forms"
description: "Comment construire des formulaires que les agents IA et les outils automatisés peuvent comprendre et utiliser."
category: "content-markup"
order: 5
publishedAt: "2025-02-15"
updatedAt: "2026-02-23"
status: "published"
---

Les formulaires sont le principal moyen pour les utilisateurs — et les agents IA — d'agir sur votre site : envoyer une demande, s'inscrire, acheter, vous contacter. Un formulaire accessible et bien étiqueté est aussi un formulaire lisible par les machines.

## La base : les éléments `<label>`

Chaque input doit avoir un `<label>` visible et associé :

```html
<!-- Mauvais : pas de label -->
<input type="email" placeholder="Email" />

<!-- Mauvais : label non associé -->
<label>Email</label>
<input type="email" />

<!-- Bon : label associé via for/id -->
<label for="email">Adresse email</label>
<input type="email" id="email" name="email" />

<!-- Bon : label qui encapsule l'input -->
<label>
  Adresse email
  <input type="email" name="email" />
</label>
```

Les agents qui remplissent des formulaires (comme browser-use ou des bots basés sur Playwright) s'appuient sur le texte du label pour identifier quel champ remplir. Des labels manquants ou incorrects font que les agents ignorent ou identifient mal les champs.

## Utiliser le bon type d'input

Les types d'input HTML5 fournissent une sémantique et une validation :

```html
<input type="email" />      <!-- Adresse email -->
<input type="tel" />        <!-- Numéro de téléphone -->
<input type="url" />        <!-- URL -->
<input type="number" />     <!-- Valeur numérique -->
<input type="date" />       <!-- Sélecteur de date -->
<input type="search" />     <!-- Champ de recherche -->
<input type="password" />   <!-- Mot de passe (masqué) -->
<input type="checkbox" />   <!-- Case à cocher booléenne -->
<input type="radio" />      <!-- Choix unique dans un groupe -->
```

Utiliser le bon type indique aux agents quel type de donnée le champ attend — sans avoir à le deviner.

## Regrouper les champs liés

Utilisez `<fieldset>` et `<legend>` pour les groupes d'inputs liés :

```html
<fieldset>
  <legend>Préférence de contact</legend>
  <label>
    <input type="radio" name="contact" value="email" /> Email
  </label>
  <label>
    <input type="radio" name="contact" value="phone" /> Téléphone
  </label>
</fieldset>
```

Cela indique aux agents que ces options sont liées et mutuellement exclusives.

## Boutons de soumission descriptifs

Le texte du bouton de soumission indique aux agents (et aux utilisateurs) ce que fait le formulaire :

```html
<!-- Mauvais -->
<button type="submit">Envoyer</button>

<!-- Bon : décrit l'action -->
<button type="submit">Envoyer le message</button>
<button type="submit">S'abonner à la newsletter</button>
<button type="submit">Demander un audit gratuit</button>
```

## Messages d'erreur

Les messages d'erreur doivent être associés programmatiquement au champ qui a causé l'erreur :

```html
<label for="email">Adresse email</label>
<input
  type="email"
  id="email"
  name="email"
  aria-describedby="email-erreur"
  aria-invalid="true"
/>
<p id="email-erreur" role="alert">
  Veuillez saisir une adresse email valide.
</p>
```

## Attributs autocomplete

Les attributs `autocomplete` aident le remplissage automatique du navigateur et les agents qui remplissent des formulaires :

```html
<input type="text" name="nom" autocomplete="name" />
<input type="email" name="email" autocomplete="email" />
<input type="tel" name="telephone" autocomplete="tel" />
<input type="text" name="entreprise" autocomplete="organization" />
<input type="text" name="adresse" autocomplete="street-address" />
```

## Champs requis

Utilisez l'attribut `required` et marquez les champs requis visuellement :

```html
<label for="email">
  Adresse email <span aria-hidden="true">*</span>
  <span class="sr-only">(obligatoire)</span>
</label>
<input type="email" id="email" required />
```

## Exemple complet

```html
<form action="/contact" method="POST">
  <div>
    <label for="nom">Nom complet</label>
    <input type="text" id="nom" name="nom" autocomplete="name" required />
  </div>

  <div>
    <label for="email">Adresse email</label>
    <input type="email" id="email" name="email" autocomplete="email" required />
  </div>

  <div>
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>

  <button type="submit">Envoyer le message</button>
</form>
```

## Tester

- Désactivez CSS et vérifiez que le formulaire reste compréhensible.
- Naviguez dans le formulaire au clavier uniquement — chaque champ doit être accessible et clairement étiqueté.
- Utilisez un lecteur d'écran (VoiceOver, NVDA) pour vérifier que les labels sont annoncés correctement.
- Lancez [Lighthouse](https://developers.google.com/web/tools/lighthouse) et consultez les résultats de l'audit Accessibilité.

Voir [DOM actionnable](/fr/docs/actionable-dom) et [HTML sémantique](/fr/docs/semantic-html).
