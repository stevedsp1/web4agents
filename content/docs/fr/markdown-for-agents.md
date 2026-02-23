---
title: Markdown pour les agents
slug: markdown-pour-les-agents
description: 'Comment servir du Markdown directement aux agents IA plutôt que du HTML, pour réduire l''usage de tokens jusqu''à 80 % et améliorer la qualité du contenu.'
category: agent-config
order: 3
publishedAt: '2026-02-12'
updatedAt: '2026-02-23'
status: published
---

## Pourquoi le Markdown compte pour les agents

Fournir du HTML brut à un agent IA est coûteux et imprécis. Un simple titre `## À propos` coûte environ 3 tokens en Markdown ; son équivalent HTML — `<h2 class="section-title">À propos</h2>` — en consomme 12 à 15, et c'est sans compter les `<nav>`, `<footer>`, scripts et pixels de tracking qui gonflent chaque vraie page web sans aucune valeur sémantique.

**Exemple concret** : l'article de blog Cloudflare annonçant cette fonctionnalité passe de 16 180 tokens en HTML à 3 150 tokens en Markdown — une **réduction de 80 %**.

Le Markdown est devenu le format de facto pour les systèmes IA. Sa structure explicite est idéale pour le traitement LLM : les titres créent des sections claires, le gras et l'italique signalent l'emphase, les blocs de code sont non ambigus.

## Cloudflare Markdown for Agents (février 2026)

Cloudflare a lancé **Markdown for Agents** en février 2026 : une fonctionnalité qui convertit automatiquement le HTML en Markdown au niveau CDN, en temps réel, via la négociation de contenu HTTP.

Quand un agent IA demande une page depuis un site protégé par Cloudflare avec la fonctionnalité activée, il peut déclarer sa préférence pour Markdown dans l'en-tête `Accept`. Cloudflare intercepte la requête, récupère le HTML depuis l'origine, le convertit en Markdown et le retourne à l'agent — sans aucune modification à votre serveur.

### Fonctionnement

```
Agent IA → Accept: text/markdown → Edge Cloudflare
                                        ↓
                               Récupère le HTML de l'origine
                                        ↓
                               Convertit en Markdown
                                        ↓
Agent IA ← Réponse text/markdown ←─────┘
```

### Exemple d'utilisation

**curl :**

```bash
curl https://votre-domaine.com/votre-page \
  -H "Accept: text/markdown"
```

**TypeScript (Cloudflare Workers) :**

```typescript
const response = await fetch("https://votre-domaine.com/votre-page", {
  headers: {
    Accept: "text/markdown, text/html",
  },
});

const tokenCount = response.headers.get("x-markdown-tokens");
const markdown = await response.text();
```

### En-têtes de réponse

| En-tête | Valeur | Description |
|---------|--------|-------------|
| `Content-Type` | `text/markdown; charset=utf-8` | Format de la réponse |
| `x-markdown-tokens` | `725` (exemple) | Nombre estimé de tokens — utile pour la stratégie de chunking |
| `Vary` | `accept` | Indique que la réponse varie selon l'en-tête Accept |
| `Content-Signal` | `ai-train=yes, search=yes, ai-input=yes` | Politique Content Signals |

### Activer sur Cloudflare

1. Connectez-vous au [Dashboard Cloudflare](https://dash.cloudflare.com/)
2. Sélectionnez votre compte, puis votre zone
3. Dans **Quick Actions**, activez **Markdown for Agents**
4. Disponible en **bêta gratuite** pour les plans Pro, Business et Enterprise (depuis février 2026)

## Qui envoie déjà `Accept: text/markdown` ?

Début 2026, les principaux agents IA envoient déjà ces en-têtes :

- **Claude Code** (Anthropic)
- **OpenCode**
- La plupart des agents de navigation OpenAI

Cloudflare Radar suit maintenant la distribution des types de contenu retournés aux crawlers IA, y compris les réponses Markdown, via la page [AI Insights](https://radar.cloudflare.com/ai-insights).

## Solutions alternatives

Si Cloudflare Markdown for Agents n'est pas disponible pour votre configuration :

| Solution | Description |
|----------|-------------|
| **Cloudflare Browser Rendering `/markdown` API** | Rend une page dynamique dans un vrai navigateur, puis convertit en Markdown |
| **Cloudflare Workers AI `AI.toMarkdown()`** | Supporte plusieurs types de documents (HTML, PDF, DOCX, etc.) |
| **Servir un `/page.md` statique** | Votre serveur retourne du Markdown pour les requêtes `Accept: text/markdown` |
| **llms.txt manuel** | Un résumé Markdown simplifié de votre site (voir [llms.txt](/fr/docs/llms-txt)) |

## Implémenter la négociation de contenu vous-même

Si vous gérez votre propre serveur (Node.js, Python, Go, etc.) :

```typescript
// Next.js App Router
export async function GET(request: Request) {
  const accept = request.headers.get("accept") ?? "";

  if (accept.includes("text/markdown")) {
    const markdown = await getPageMarkdown();
    return new Response(markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Vary": "accept",
        "Content-Signal": "ai-train=yes, search=yes, ai-input=yes",
      },
    });
  }

  return new Response(await getPageHtml(), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
```

## À retenir

- Le Markdown réduit l'usage de tokens de 60–80 % par rapport au HTML
- La négociation de contenu via `Accept: text/markdown` devient un standard
- Cloudflare Markdown for Agents active cela sans modification du serveur
- L'en-tête `x-markdown-tokens` aide les agents à gérer les limites de fenêtre de contexte
- Accompagnez toujours les réponses Markdown d'en-têtes Content Signals

Voir [llms.txt](/fr/docs/llms-txt), [Écrire pour les agents](/fr/docs/writing-for-agents) et [Optimisation RAG](/fr/docs/rag-optimization).
