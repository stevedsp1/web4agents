---
title: "Fraîcheur du contenu"
slug: "content-freshness"
description: "Comment signaler la fraîcheur du contenu aux crawlers IA et aux moteurs, et pourquoi l'actualité compte pour les réponses générées par l'IA."
category: "technical-seo"
order: 3
publishedAt: "2026-02-01"
updatedAt: "2026-02-23"
status: "published"
---

## Pourquoi la fraîcheur compte pour les agents IA

Les systèmes IA — tant les crawlers qui construisent des datasets d'entraînement que les agents en temps réel qui répondent à des requêtes — ont une forte préférence pour le **contenu récent et mis à jour**. Deux raisons :

1. **Exactitude** : Les informations obsolètes conduisent à de mauvaises réponses. Les systèmes IA en sont conscients et déclassent le contenu périmé pour les requêtes sensibles au temps.
2. **Coupures de connaissance** : Les LLM sont entraînés sur des données jusqu'à une date de coupure. Le contenu publié après cette coupure peut être récupéré via des pipelines RAG qui récupèrent des données en direct — mais seulement si le contenu est indexé et clairement daté.

## La pile de signaux de fraîcheur

| Signal | Où | Consommé par |
|--------|-----|-------------|
| `datePublished` en JSON-LD | `<script type="application/ld+json">` | Googlebot, crawlers IA, systèmes RAG |
| `dateModified` en JSON-LD | Idem | Idem |
| En-tête HTTP `Last-Modified` | Réponse serveur | Caches HTTP, crawlers |
| `<lastmod>` dans sitemap.xml | `/sitemap.xml` | Tous les grands crawlers |
| Date visible sur la page | Contenu de la page | Confiance utilisateur, E-E-A-T |

## Champs de date en JSON-LD

La façon la plus fiable de signaler la fraîcheur :

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Titre de votre article",
  "datePublished": "2026-02-01T09:00:00+00:00",
  "dateModified": "2026-02-15T14:30:00+00:00",
  "author": {
    "@type": "Person",
    "name": "Nom de l'auteur"
  }
}
```

**Règles clés :**
- Toujours utiliser le format ISO 8601 avec fuseau horaire (`T09:00:00+00:00`)
- `dateModified` doit refléter des mises à jour de contenu *substantielles*, pas des corrections de formatage
- Ne jamais antidater le contenu — cela signale aux systèmes IA que vous manipulez la fraîcheur

## `<lastmod>` dans sitemap.xml

La balise `<lastmod>` dans votre sitemap est un signal de fraîcheur primaire pour les crawlers qui décident quelles pages re-indexer :

```xml
<url>
  <loc>https://example.com/docs/json-ld</loc>
  <lastmod>2026-02-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

**En Next.js**, générez le sitemap dynamiquement pour que `lastmod` reflète le vrai `updatedAt` de votre frontmatter de contenu :

```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await getDocEntries("fr");
  return docs.map((doc) => ({
    url: `${baseUrl}/docs/${doc.slug}`,
    lastModified: new Date(doc.updatedAt ?? doc.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
}
```

## En-tête HTTP Last-Modified

Pour les serveurs et CDN, définissez l'en-tête `Last-Modified` pour signaler la fraîcheur au niveau HTTP :

```
HTTP/1.1 200 OK
Last-Modified: Thu, 15 Feb 2026 14:30:00 GMT
Cache-Control: public, max-age=3600
```

## Stratégie de rafraîchissement du contenu

### Contenu evergreen (docs, guides)

- Réviser et mettre à jour tous les 6–12 mois
- Ajouter une mention visible « Mis à jour le » en haut de page
- Mettre à jour `dateModified` en JSON-LD et `<lastmod>` dans le sitemap
- Signaler les mises à jour dans le contenu : « Mis à jour en février 2026 : la section X a été révisée pour… »

### Contenu d'actualité et sensible au temps

- Publier avec un `datePublished` précis
- Ne pas mettre à jour après publication (pour préserver l'intégrité de la date)
- Si une correction est nécessaire, ajouter une notice de correction explicite et mettre à jour `dateModified`

## Signaux de date visibles sur la page

En plus des signaux lisibles par les machines, affichez la date visiblement sur la page :

```html
<time datetime="2026-02-01T09:00:00+00:00">1er février 2026</time>
```

L'attribut `datetime` donne aux machines la valeur précise ; le texte à l'intérieur donne aux humains un format lisible. Les deux comptent.

## À éviter

- **Cacher la date de publication** : réduit la confiance utilisateur et supprime un signal de fraîcheur clé
- **Gonfler `dateModified` sur des modifications triviales** : manipuler ce signal nuit à la crédibilité auprès des systèmes IA
- **Contenu obsolète sans `dateModified`** : les systèmes IA supposent que le contenu est aussi ancien que `datePublished`

## Impact sur les réponses générées par l'IA

Les systèmes IA générant des réponses préfèrent la source la plus récente et faisant autorité. La combinaison qui fonctionne le mieux :

1. `datePublished` et `dateModified` en ISO 8601 dans le JSON-LD
2. `<lastmod>` dans le sitemap.xml maintenu à jour
3. `<time datetime="...">` visible sur la page
4. Mises à jour substantielles signalées dans le contenu lui-même

Voir [Schema.org](/fr/docs/schema-org), [Sitemap](/fr/docs/sitemap-xml) et [Écrire pour les agents](/fr/docs/writing-for-agents).
