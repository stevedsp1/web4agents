---
title: "Entités et Knowledge Graph"
slug: "entities-knowledge-graph"
description: "Comment être reconnu comme entité par Google et les systèmes IA, et pourquoi le Knowledge Graph est central pour la visibilité dans la recherche générative."
category: "getting-started"
order: 5
publishedAt: "2026-02-23"
status: "published"
---

## Qu'est-ce qu'une entité ?

En SEO et en GEO, une **entité** est un objet du monde réel clairement défini et identifiable : une personne, une organisation, un lieu, un concept, un produit. Contrairement à un mot-clé (une chaîne de caractères), une entité a une identité unique dans une base de connaissance.

Google's **Knowledge Graph** (KG) est la base de connaissance centrale de Google, qui contient des entités avec leurs propriétés et les relations entre elles. Chaque entité est identifiée par un **MID** (Machine Identifier) unique du type `/m/0k2kfpc` (KG classique) ou `/g/11j45xyz` (Knowledge Graph étendu).

## Pourquoi les entités comptent pour la GEO

Dans les systèmes de recherche générative (AI Overviews, AI Mode, ChatGPT, Perplexity), les entités jouent plusieurs rôles :

- **Désambiguïsation** : ancrer la réponse à une entité précise pour éviter toute confusion (« Apple » l'entreprise vs « apple » le fruit)
- **Fact-checking** : utiliser les faits structurés du KG pour vérifier les affirmations du modèle et limiter les hallucinations
- **Enrichissement des réponses** : injecter des faits (fondateur, date de création, site web, etc.) directement depuis le graphe
- **Intégration verticale** : connecter Shopping Graph (produits), Places Graph (Maps), images, actualités dans une réponse unifiée

Dans AI Mode de Google, quand la requête concerne une entité nommée, le système expose le MID qu'il utilise pour ancrer sa réponse. Être une entité reconnue dans le KG est l'un des leviers les plus puissants pour la visibilité.

## Vérifier si votre marque est une entité KG

1. Cherchez votre marque sur Google — si un Knowledge Panel s'affiche à droite, vous êtes une entité KG.
2. Cherchez votre MID sur [Google's Knowledge Graph Search API](https://developers.google.com/knowledge-graph) ou via l'URL `https://www.google.com/search?kgmid=/m/xxxxx`.
3. Vérifiez votre présence sur [Wikidata](https://www.wikidata.org) — source majeure qui alimente le KG de Google.

## Comment créer ou renforcer votre entité

### 1. Présence sur Wikidata

Wikidata est la source ouverte la plus directement ingérée par Google pour le Knowledge Graph. Si votre organisation, produit ou concept est notable, créez ou enrichissez sa fiche Wikidata avec :

- Nom officiel (toutes langues pertinentes)
- Description courte
- Liens vers les sources officielles (site web, réseaux sociaux)
- Propriétés clés (date de fondation, fondateurs, secteur, etc.)

### 2. Wikipedia (si éligible)

Une page Wikipedia est un signal d'entité très fort. Elle doit respecter les critères de notabilité de Wikipedia (sources secondaires fiables, indépendantes). Ne créez pas de page si votre organisation ne répond pas à ces critères.

### 3. Balisage `sameAs` en JSON-LD

La propriété `sameAs` dans votre Schema.org relie votre entité à ses représentations sur d'autres plateformes. C'est le signal technique le plus direct pour que Google comprenne que votre site *est* l'entité :

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Web4Agents",
  "url": "https://web4agents.org",
  "logo": "https://web4agents.org/logo.png",
  "sameAs": [
    "https://www.wikidata.org/wiki/Q...",
    "https://twitter.com/web4agents",
    "https://linkedin.com/company/web4agents",
    "https://github.com/web4agents",
    "https://www.crunchbase.com/organization/web4agents"
  ]
}
```

Pour les personnes :

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Prénom Nom",
  "url": "https://votresite.com/a-propos",
  "sameAs": [
    "https://www.linkedin.com/in/prenom-nom",
    "https://twitter.com/prenomnom",
    "https://github.com/prenomnom",
    "https://www.wikidata.org/wiki/Q..."
  ]
}
```

### 4. Cohérence des informations entre plateformes

Google compare les informations de votre site avec celles de vos profils externes pour consolider l'entité. Assurez la cohérence de :

- Nom officiel exact (orthographe identique partout)
- URL du site web
- Description courte
- Logo
- Contacts et adresse (pour les entreprises locales)

### 5. Mentions dans des sources reconnues

Les **mentions non liées** dans des articles de presse, blogs d'autorité ou annuaires sectoriels contribuent à renforcer la reconnaissance de votre entité, même sans backlink. Ce sont des co-occurrences que Google utilise comme signal.

### 6. Structured Data pour auteurs (E-E-A-T)

Pour les personnes-auteurs, le balisage `Person` avec `sameAs` renforce la reconnaissance d'entité et les signaux E-E-A-T :

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Prénom Nom",
  "jobTitle": "Directeur SEO",
  "worksFor": {
    "@type": "Organization",
    "name": "Web4Agents"
  },
  "knowsAbout": ["GEO", "SEO technique", "Agents IA"],
  "sameAs": ["https://linkedin.com/in/prenom-nom"]
}
```

## Les autres Knowledge Graphs

Google n'est pas le seul système à utiliser des entités :

| Système | Base de connaissance | Utilisation |
|---------|---------------------|-------------|
| Google AIO/AIM | Google Knowledge Graph | Désambiguïsation, fact-checking |
| Google AI Mode | + Shopping Graph, Places Graph | Intégration produits, lieux |
| Bing / Copilot | Bing Entity Store | Réponses Copilot |
| ChatGPT / OpenAI | Wikidata, données d'entraînement | Réponses génératives |
| Perplexity | Données web + bases externes | Citations en temps réel |

La stratégie d'entité est universelle : une entité bien définie sur Wikidata et renforcée par `sameAs` cohérent bénéficie à tous ces systèmes.

## Checklist entités

- [ ] Vérifier si votre marque a une fiche Wikidata (en créer une si notable)
- [ ] Vérifier le Knowledge Panel Google pour votre marque
- [ ] Ajouter `sameAs` en JSON-LD Organization/Person sur toutes les pages clés
- [ ] Cohérence du nom, logo, URL et description entre votre site et toutes les plateformes sociales
- [ ] Page À propos exhaustive avec balisage Organization complet
- [ ] Bios d'auteurs avec balisage Person et `sameAs`
- [ ] Demander des mentions (sans forcément des liens) dans des sources reconnues de votre secteur

Voir [E-E-A-T](/fr/docs/eeat), [AI Overviews et AI Mode](/fr/docs/ai-overviews) et [Backlinks et autorité](/fr/docs/backlinks).
