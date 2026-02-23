---
title: "llms.txt"
slug: "llms-txt"
description: "Comment créer et servir un fichier llms.txt pour que les agents IA comprennent votre site."
category: "agent-config"
order: 1
publishedAt: "2025-02-15"
status: "published"
---

Le fichier `llms.txt` est une proposition de standard qui indique aux agents IA **de quoi parle votre site**, quel contenu est disponible et comment les agents doivent l’utiliser. On peut le voir comme un `robots.txt` pour le contexte IA — pas du contrôle d’accès, mais de la **découverte de contenu**.

## Pourquoi llms.txt ?

Lorsqu’un agent IA visite votre site, il doit rapidement comprendre :

- Les sujets que vous couvrez
- Les pages les plus importantes
- La structure de votre contenu
- Le format du contenu

Sans `llms.txt`, les agents doivent crawler et deviner. Avec lui, ils obtiennent une vue d’ensemble structurée immédiatement.

## Format

Placez un fichier `llms.txt` à la racine de votre domaine (`https://example.com/llms.txt`). Le format est du texte simple de type markdown :

```
# Example Corp

> Une entreprise qui fabrique des widgets pour l'industrie automobile.

## Contenu principal

- [Catalogue produits](/products) : Liste complète des widgets avec spécifications.
- [Documentation](/docs) : Documentation technique et référence API.
- [Blog](/blog) : Actualités du secteur et mises à jour de l'entreprise.

## Optionnel

- [À propos](/about) : Historique et équipe.
- [Contact](/contact) : Nous contacter.
```

## Sections clés

- **Titre** (`# Nom du site`) — Nom de votre site ou organisation.
- **Description** (`> ...`) — Résumé en une ligne de ce que fait votre site.
- **Contenu principal** — Liens vers vos pages les plus importantes avec de courtes descriptions.
- **Optionnel** — Pages secondaires utiles aux agents.

## Bonnes pratiques

1. **Rester concis** — Les agents traitent des milliers de sites. Un résumé ciblé vaut mieux qu’une liste exhaustive.
2. **Mettre à jour régulièrement** — Quand vous ajoutez du contenu important, mettez à jour `llms.txt`.
3. **Utiliser des URL absolues ou relatives** — Les chemins relatifs conviennent bien.
4. **Associer à robots.txt** — `llms.txt` décrit quoi lire ; `robots.txt` contrôle ce qui peut être accédé.
5. **Tester avec des agents** — Demandez à ChatGPT ou Claude des informations sur votre site après avoir ajouté `llms.txt` pour voir s’ils s’en servent.

## Exemple

Consultez le [llms.txt de Web4Agents](/fr/llms.txt) comme exemple concret.
