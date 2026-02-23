# Écart entre la documentation GEO et l’implémentation du projet

Audit effectué par rapport aux bonnes pratiques décrites dans `/docs`. Ce qui est déjà en place et ce qui reste à faire.

---

## Déjà en place

| Pratique | Statut | Où c’est fait |
|----------|--------|----------------|
| **robots.txt** à la racine | OK | `public/robots.txt`, Sitemap référencé |
| **llms.txt** à la racine | OK | `src/app/llms.txt/route.ts` + `src/lib/llms.ts` |
| **sitemap.xml** dynamique | OK | `src/app/sitemap.ts` (blog, glossary, docs, pages statiques), `lastModified` basé sur frontmatter |
| **Schema.org / JSON-LD** | OK | `src/lib/seo.ts` + composant `JsonLd` : WebSite, Organization, Article (blog), DefinedTerm/SoftwareApplication/Organization (glossaire), BreadcrumbList |
| **Open Graph + Twitter** | OK | `buildMetadata()` dans `src/lib/seo.ts`, utilisé sur les pages concernées |
| **Canonical + hreflang** | OK | `buildMetadata()` → `alternates.canonical` et `alternates.languages` |
| **HTTPS / en-têtes de sécurité** | OK | `next.config.js` : HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, CSP |
| **Dates sur les contenus** | OK | Blog : `datePublished` / `dateModified` dans Article JSON-LD et affichage ; docs : affichage uniquement |
| **Breadcrumbs** | OK | Composant + BreadcrumbList JSON-LD où pertinent |

---

## À implémenter ou à corriger

### 1. En-tête **Content-Signal** (recommandé par la doc)

**Doc :** [Content Signals](/docs/content-signals)

**État :** OK. L'en-tête `Content-Signal` est bien envoyé via `next.config.js`.

---

### 2. **robots.txt** — crawlers manquants

**Doc :** [robots.txt](/docs/robots-txt)

**État :** OK. `public/robots.txt` est à jour et inclut `OAI-SearchBot`, `Google-Extended`, `Applebot-Extended`, et `Meta-ExternalAgent`.

---

### 3. **humans.txt** (optionnel)

**Doc :** [humans.txt](/docs/humans-txt)

**État :** OK. Le fichier `public/humans.txt` a été créé et lié dans le `<head>` (`layout.tsx`).

---

### 4. **JSON-LD Article / TechArticle sur les pages docs**

**Doc :** [Schema.org](/docs/schema-org), [Content Freshness](/docs/content-freshness) — pages éditoriales avec `datePublished` / `dateModified`.

**État :** Les pages `/docs/[slug]` affichent `publishedAt` / `updatedAt` mais n’injectent pas de JSON-LD de type Article ou TechArticle.

**Action :** Sur chaque page doc, injecter un bloc JSON-LD (Article ou TechArticle) avec au minimum : `url`, `headline`, `datePublished`, `dateModified` (si différent), et optionnellement `description`, `author`. Réutiliser `articleJsonLd()` de `src/lib/seo.ts` ou une variante TechArticle.

---

### 5. **En-tête HTTP Last-Modified sur les pages de contenu** (optionnel)

**Doc :** [Content Freshness](/docs/content-freshness) — signaler la fraîcheur via `Last-Modified`.

**État :** Pas d’en-tête `Last-Modified` sur les réponses des pages blog/docs/glossary.

**Action :** Pour les routes qui servent un contenu avec `updatedAt` (blog, docs, glossaire), renvoyer `Last-Modified: <date updatedAt en GMT>`. En App Router, cela implique soit des Route Handlers qui wrappent le rendu, soit du middleware, ou des headers au niveau de la page si le framework le permet — à évaluer selon la stack.

---

### 6. **llms.txt — liens vers la doc** (optionnel)

**Doc :** [llms.txt](/docs/llms-txt) — aider les agents à découvrir le contenu (glossaire, blog, docs).

**État :** `generateLlmsTxtContent()` liste le glossaire, le blog et un seul lien « Documentation » vers `/{locale}/docs`.

**Action :** Enrichir la section Documentation de llms.txt : soit lister les catégories de docs, soit une sélection de pages clés (ex. checklist, robots-txt, llms-txt, content-signals), pour améliorer la découvrabilité des docs par les agents.

---

### 7. **Content negotiation Accept: text/markdown** (optionnel / avancé)

**Doc :** [Markdown for Agents](/docs/markdown-for-agents) — servir du Markdown quand `Accept: text/markdown`.

**État :** Aucune négociation de contenu ; les pages sont servies uniquement en HTML.

**Action :** Pour les pages de contenu (blog, docs, glossaire), détecter `Accept: text/markdown` et renvoyer une version Markdown (générée à la volée ou pré-calculée). Implémentation plus lourde (conversion HTML→Markdown ou source Markdown exposée), à traiter comme évolution ultérieure si besoin.

---

## Synthèse des priorités

| Priorité | Item | Effort |
|----------|------|--------|
| Haute | Content-Signal header | Faible (config) |
| Haute | robots.txt — ajouter OAI-SearchBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent | Faible |
| Moyenne | JSON-LD Article/TechArticle sur les pages docs | Faible |
| Moyenne | humans.txt + link author | Faible |
| Basse | Last-Modified sur les pages de contenu | Moyen (architecture) |
| Basse | llms.txt — enrichir section Documentation | Faible |
| Optionnelle | Accept: text/markdown | Élevé |

En appliquant au moins les points « haute » et « moyenne », le site sera aligné avec les recommandations principales de la doc GEO.
F