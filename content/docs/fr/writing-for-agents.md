---
title: Écrire pour les agents IA
slug: ecrire-pour-les-agents-ia
description: 'Comment structurer et rédiger le contenu pour que les agents IA puissent l''extraire, le résumer et le citer correctement.'
category: content-markup
order: 1
publishedAt: '2026-02-01'
updatedAt: '2026-02-23'
status: published
---

## Du contenu pour les humains au contenu pour les agents

Les agents IA ne « voient » pas la mise en page : ils lisent du texte et des données structurées. Un contenu optimisé pour les humains n'est pas automatiquement lisible par les agents. Là où un humain interprète le contexte et comble les implicites, un agent extrait littéralement — il a besoin de **structure explicite**, de **faits clairs** et de **sections auto-suffisantes**.

Bien structurer son contenu, c'est aussi le rendre plus lisible pour les humains. L'objectif n'est pas d'écrire de façon robotique, mais d'éliminer l'ambiguïté.

## 1. Répondre d'abord, expliquer ensuite

Placez l'information essentielle en tête de chaque section (pyramide inversée). Les agents qui balayent une page pour trouver une réponse précise doivent la trouver immédiatement.

**Sans optimisation :**
> Au fil des années, robots.txt a évolué d'un mécanisme d'exclusion simple vers un protocole nuancé. De nombreux développeurs se demandent comment le configurer pour les crawlers IA…

**Optimisé :**
> Pour bloquer un crawler IA dans robots.txt, ajoutez son User-agent suivi de `Disallow: /`.

## 2. Titres descriptifs et autonomes

Les titres sont indexés séparément et utilisés comme résumés de section. Rendez-les informatifs même hors contexte.

**Faible :** `## Plus d'informations`
**Fort :** `## Comment déclarer Content Signals dans Next.js`

## 3. Sections auto-suffisantes

Un agent peut extraire une seule section sans le contexte environnant. Chaque section doit avoir du sens seule :

- Définissez les acronymes dès leur première occurrence dans la section
- Évitez les pronoms qui renvoient à d'autres sections (« Comme mentionné plus haut… »)
- Nommez l'entité plutôt que d'écrire « il » ou « ce dernier »

## 4. Listes et tableaux pour les données structurées

Les agents parsent les listes et tableaux plus facilement que la prose pour les informations comparatives ou énumérables.

**Prose (difficile à parser) :**
> Le JSON-LD doit être placé dans la section head, utiliser le bon type de schéma, et être du JSON valide.

**Tableau (facile à extraire) :**

| Règle | Détail |
|-------|--------|
| Emplacement | Dans `<head>` de la page HTML |
| Type de schéma | Doit correspondre au contenu (`Article`, `Product`, etc.) |
| Format | Doit être du JSON valide |

## 5. Énoncés factuels explicites

Les agents citent des faits précis. Rendez vos faits facilement extractibles :

- Utilisez des chiffres et unités explicites : « Temps de chargement inférieur à 2,5 s »
- Datez vos affirmations : « Selon Cloudflare (février 2026)… »
- Évitez les qualificatifs vagues : « assez rapide » → « inférieur à 500 ms »
- Mettez en gras les faits clés : **Le Markdown réduit l'usage de tokens de 60 à 80 %**

## 6. Définir les termes dès la première occurrence

Même si vous avez un glossaire, définissez les termes en ligne dans les contenus longs :

> Le **RAG (Retrieval-Augmented Generation)** est une technique où un LLM récupère des documents pertinents avant de générer une réponse, plutôt que de s'appuyer uniquement sur ses données d'entraînement.

## 7. Contextualiser les exemples de code

Les extraits de code ont de la valeur, mais les agents ont besoin de contexte pour comprendre quand et pourquoi les utiliser.

**Sans contexte :**
```json
{ "@type": "Article", "headline": "..." }
```

**Avec contexte :**
> Utilisez le type Schema.org `Article` pour les articles de blog. Cela indique aux crawlers IA que le contenu est éditorial, pas une fiche produit.
> ```json
> { "@context": "https://schema.org", "@type": "Article", "headline": "..." }
> ```

## Longueur et profondeur du contenu

Un contenu long fonctionne mieux sur les sujets complexes, mais seulement si la longueur est justifiée par la substance. Un article de 3 000 mots qui pourrait faire 800 mots gaspille des tokens dans la fenêtre de contexte de chaque agent.

| Type de contenu | Longueur recommandée |
|----------------|----------------------|
| Guides et tutoriels | Complet ; couvrir tous les cas |
| Pages de référence | Exhaustif (toutes les options) |
| Articles de blog | 800–1 500 mots en général |
| Termes de glossaire | 200–400 mots, définition + exemples |

## Mise en forme pour la lisibilité

| Élément | Recommandation |
|---------|---------------|
| Paragraphes | 3–5 phrases maximum |
| Phrases | Une idée par phrase |
| Emphase | **Gras** pour les termes clés, `code` pour les valeurs techniques |
| Listes | Pour 3 éléments ou plus qui seraient sinon une liste à virgules |
| Tableaux | Pour les comparaisons et données multi-dimensionnelles |
| Images | Toujours un texte `alt` descriptif |

## FAQ : répondre aux questions que les agents reçoivent

Une section FAQ en fin de pages clés répond aux requêtes exactes que les utilisateurs soumettent aux assistants IA. Elle déclenche aussi des résultats enrichis FAQ dans la recherche traditionnelle.

```markdown
## Questions fréquentes

**Quelle est la différence entre llms.txt et robots.txt ?**
`robots.txt` contrôle l'accès des crawlers ; `llms.txt` fournit un résumé
structuré de votre site pour les systèmes IA qui ont déjà été autorisés à accéder.
```

## Anti-patterns à éviter

- **Rembourrage de mots-clés** : le classement des agents n'est pas basé sur les mots-clés
- **Définitions enterrées** : définir les termes dès leur première mention
- **Murs de texte** : aérer la prose avec des titres tous les 200–300 mots
- **Références implicites** : « comme expliqué plus haut » → lier explicitement
- **Affirmations sans date** : « récemment lancé » → « lancé en février 2026 »

Voir aussi [Optimisation RAG](/fr/docs/rag-optimization), [Schema.org](/fr/docs/schema-org), [Fraîcheur du contenu](/fr/docs/content-freshness) et [E-E-A-T](/fr/docs/eeat).
