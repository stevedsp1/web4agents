---
title: Rendu JavaScript et crawlers IA
slug: rendu-javascript-et-crawlers-ia
description: Comment les agents IA traitent le JavaScript (CSR vs SSR/SSG) et pourquoi le rendu serveur ou statique est vital pour la GEO.
category: technical-seo
order: 6
publishedAt: '2026-02-22'
updatedAt: '2026-02-23'
status: published
---

## Le problème du rendu JavaScript

Historiquement, les bots des moteurs de recherche ont eu du mal avec JavaScript. Si Googlebot a fini par devenir capable de rendre les pages CSR (souvent avec un délai), la nouvelle vague de crawlers IA et LLM est bien plus limitée.

La plupart des crawlers IA (GPTBot, ClaudeBot, PerplexityBot) agissent comme de simples clients HTTP. Quand ils rencontrent une application CSR standard (React, Vue, Angular SPA), ils voient un `<div id="root"></div>` vide et une balise `<script>`. Ils n'exécutent généralement pas le JavaScript, ce qui signifie qu'ils n'indexent aucun contenu de votre page.

## CSR vs SSR vs SSG pour les agents

### CSR — Client-Side Rendering
**Fonctionnement** : Le serveur envoie un fichier HTML presque vide. Le JavaScript s'exécute dans le navigateur pour récupérer les données et rendre l'interface.  
**Visibilité pour les agents** : **Nulle à faible**. La plupart des agents n'attendent pas l'hydratation ni n'exécutent le JS.

### SSR — Server-Side Rendering
**Fonctionnement** : Le serveur récupère les données et rend le HTML complet à chaque requête.  
**Visibilité pour les agents** : **Excellente**. L'agent reçoit immédiatement un document HTML complet.

### SSG — Static Site Generation
**Fonctionnement** : Le HTML est généré au moment du build.  
**Visibilité pour les agents** : **Excellente**. Identique au SSR, avec des performances encore meilleures.

## Pourquoi le SSR/SSG est vital pour la GEO

1. **Efficacité en tokens** : Exécuter le JS nécessite des navigateurs headless, coûteux et lents. Les agents préfèrent parser du HTML statique (ou du Markdown).
2. **Indexation immédiate** : Si un agent parcourt le web en temps réel pour répondre à une requête (Perplexity, ChatGPT avec navigation), il ne peut pas attendre 5 secondes d'hydratation JS. Il ignorera votre site et utilisera un concurrent plus rapide.
3. **Fiabilité des données structurées** : Les balises JSON-LD doivent être présentes dans le HTML initial pour garantir leur lecture par tous les crawlers.

## Tester la visibilité de votre site pour les agents

La méthode la plus simple : récupérer votre page avec `curl`. Si le contenu est absent, il est invisible pour la plupart des agents IA.

```bash
curl https://votre-domaine.com/votre-page
```

Si vous ne voyez que quelque chose comme :
```html
<div id="root"></div>
<script src="/bundle.js"></script>
```

…votre page est invisible pour les crawlers IA.

## Recommandations par framework

### Next.js (recommandé)

Next.js génère du HTML statique ou SSR par défaut. Utilisez `generateStaticParams` pour pré-rendre les pages dynamiques :

```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

Vérifiez que vos composants Server Components (`async` components) récupèrent les données côté serveur, pas dans des `useEffect` côté client.

### Nuxt, Astro, SvelteKit

Ces frameworks prennent tous en charge le SSR et le SSG nativement. Activez la pré-génération pour les pages de contenu.

### Si vous gardez du CSR

Si vous ne pouvez pas migrer vers le SSR/SSG :

- **Contenu statique minimal** : Assurez-vous que le titre, la description, le contenu principal et les JSON-LD sont dans le HTML initial (sans JS)
- **API dédiée** : Exposez une route qui retourne le contenu en JSON ou Markdown pour les agents
- **Métadonnées complètes** : `<title>`, `<meta description>`, et JSON-LD `Article` dans le `<head>` statique

## Anti-patterns fréquents

| Anti-pattern | Impact |
|-------------|--------|
| Contenu chargé via `useEffect` ou `fetch` côté client | Invisible pour les crawlers IA |
| JSON-LD injecté dynamiquement par JS | Peut ne pas être lu |
| Navigation entièrement en JS sans SSR | Pages profondes jamais découvertes |
| Images sans `alt` text ou avec `alt` généré côté client | Contexte manquant pour les agents |

Voir [Performance](/fr/docs/performance), [Données structurées Schema.org](/fr/docs/schema-org) et la [checklist](/fr/docs/checklist).
