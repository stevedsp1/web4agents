# Web4Agents.org — La référence du Web Agentique

## 1. Vision

Le web entre dans une nouvelle ère : les agents IA autonomes (OpenAI Operator, Claude, agents locaux, etc.) deviennent des utilisateurs à part entière d'internet, aux côtés des humains. **Web4Agents.org** a pour ambition de devenir la référence incontournable sur l'**GEO (Generative Engine Optimization)** — l'ensemble des pratiques visant à rendre les infrastructures web lisibles, actionnables et sécurisées pour les machines.

Le site publie des bonnes pratiques, des définitions, des actualités et de la documentation pour aider les développeurs, agences et équipes e-commerce à préparer leur présence web au futur agentique.

**Positionnement :** autorité institutionnelle (.org), pas un simple outil — une logique d'organisme de standardisation.

---

## 2. Audience cible

| Segment | Besoin |
|---|---|
| Développeurs / Tech leads | Comprendre les standards GEO, implémenter les bonnes pratiques |
| Agences web | Conseiller leurs clients sur la compatibilité agents |
| Équipes e-commerce | S'assurer que les données produits sont lisibles par les machines |
| Spécialistes SEO / GEO | Nouveau paradigme d'optimisation à maîtriser |
| Créateurs d'IA / LLM | Standards pour l'interaction agent-web |

---

## 3. Stack technique

| Couche | Choix | Justification |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | Génération statique (SSG), excellent SEO, routing i18n |
| Styling | **Tailwind CSS** | Utility-first, itération rapide, responsive par défaut |
| Contenu | **Markdown (MDX)** avec `gray-matter` + `remark/rehype` | Contenu as code, versionné Git, déploiement par lots |
| i18n | **next-intl** | Traductions par fichiers, routes préfixées par locale, slugs par langue |
| Service email | **Resend** | Emails transactionnels, API simple |
| Stockage emails | **Firebase Firestore** | Stockage léger pour inscriptions newsletter et demandes d'audit |
| Hébergement | **Vercel** | Support natif Next.js, réseau edge, tier gratuit |
| Analytics | **Google Analytics 4** | Suivi SEO, insights audience |
| Données structurées | **JSON-LD** (schema.org) | Priorité SEO/GEO — contenu lisible par les machines |

---

## 4. Internationalisation (i18n)

**Langue principale :** anglais (par défaut).
**Architecture :** prête pour un nombre illimité de locales dès le premier jour.

### Structure des fichiers

```
/messages
  en.json          # Traductions UI (boutons, navigation, meta, etc.)
  fr.json
/content
  /blog
    /en/
      my-article.md
    /fr/
      mon-article.md
  /glossary
    /en/
      geo.md
    /fr/
      geo.md
```

### Routing

```
web4agents.org/en/glossary/geo    → Anglais
web4agents.org/fr/glossaire/geo   → Français (slugs traduits)
```

### Règles

- Tous les textes UI dans des fichiers JSON de traduction — zéro texte en dur dans le code.
- Chaque fichier de contenu (blog/glossaire) a sa propre version traduite par locale.
- Balises `hreflang` générées automatiquement pour toutes les pages traduites.
- Sélecteur de langue dans le header.
- Les traductions peuvent être automatisées (IA) puis relues manuellement avant merge.

---

## 5. Architecture du site (Sitemap)

### Pages

| Route | Type | Description |
|---|---|---|
| `/` | Statique | Accueil — manifeste, proposition de valeur, inscription newsletter, liens rapides |
| `/blog` | Listing | Index du blog — filtrable par catégorie/tag, paginé |
| `/blog/[slug]` | Dynamique (SSG) | Article individuel |
| `/glossary` | Listing | Index du glossaire — alphabétique, recherchable |
| `/glossary/[term]` | Dynamique (SSG) | Définition d'un terme |
| `/docs` | Statique/MDX | Documentation — bonnes pratiques, guides, sections structurées |
| `/audit` | Statique | Landing page — présentation du service d'audit + formulaire de demande (email + URL) |
| `/contact` | Statique | Formulaire de contact (via Resend) |
| `/legal` | Statique | Mentions légales |
| `/privacy` | Statique | Politique de confidentialité (conforme RGPD) |
| `404` | Statique | Page d'erreur personnalisée — suggestions de navigation, recherche, liens vers glossaire/blog |

### Fichiers racine pour les agents et crawlers

| Fichier | Rôle |
|---|---|
| `/robots.txt` | Directives pour les crawlers classiques + crawlers IA (GPTBot, ClaudeBot, PerplexityBot, etc.) |
| `/sitemap.xml` | Plan du site auto-généré, par locale, avec `lastmod` |
| `/llms.txt` | Descriptif structuré du site pour les LLMs (standard émergent llmstxt.org) |
| `/feed.xml` | Flux RSS/Atom |

### Navigation

```
Header:  [Logo] [Glossaire] [Blog] [Docs] [Audit]  [Sélecteur de langue] [GitHub]
Footer:  [À propos] [Contact] [Mentions légales] [Confidentialité] [Newsletter] [Réseaux sociaux]
```

---

## 6. Stratégie de contenu

### 6.1 Glossaire / Encyclopédie (machine à SEO)

Le glossaire est plus qu'un simple lexique : c'est une **encyclopédie de l'écosystème agentique**. Chaque entrée peut être un concept, un outil, un acteur ou un standard. Un seul système technique, une seule section dans la navigation, mais une couverture exhaustive de l'écosystème.

- **Objectif :** des centaines de pages, déployées par lots au fil du temps.
- **Format :** un fichier Markdown par entrée, une page par entrée sur le site.

#### Types d'entrées

| Type | Description | Exemples | Schema.org |
|---|---|---|---|
| `concept` | Définitions et principes GEO | GEO, Semantic Fragment, Actionable DOM | `DefinedTerm` |
| `tool` | Outils et solutions de l'écosystème | n8n, LangChain, AutoGPT, Playwright | `SoftwareApplication` |
| `actor` | Entreprises et organisations clés | OpenAI, Anthropic, Perplexity, Google DeepMind | `Organization` |
| `standard` | Standards et spécifications | schema.org, llms.txt, OpenAPI, robots.txt | `TechArticle` |

#### Frontmatter

```yaml
---
title: "Generative Engine Optimization (GEO)"
slug: "geo"
type: "concept"
description: "L'GEO est l'ensemble des pratiques d'optimisation du contenu et de la structure web pour les agents IA autonomes."
category: "core-concepts"
publishedAt: "2026-03-15"
updatedAt: "2026-04-02"
status: "draft" | "scheduled" | "published"
author: "Web4Agents"
relatedTerms: ["semantic-fragment", "actionable-dom", "llm-indexing"]
---
```

Champs supplémentaires selon le type :

```yaml
# Pour type: "tool" ou "actor"
website: "https://n8n.io"
logo: "n8n.png"

# Pour type: "tool"
license: "open-source" | "proprietary" | "freemium"
github: "https://github.com/n8n-io/n8n"
```

#### Page listing du glossaire

La page `/glossary` affiche toutes les entrées avec :
- **Filtres par type** (concept / outil / acteur / standard) — onglets ou dropdown.
- **Filtres par catégorie** au sein de chaque type.
- **Recherche** par nom ou description.
- **Tri** alphabétique (par défaut) ou par date de publication.
- **Compteur** par type visible (ex : « 45 concepts · 12 outils · 8 acteurs · 6 standards »).

#### Pages individuelles

Layout légèrement adapté selon le type :
- **Concept :** définition en une ligne (citable) → explication détaillée → FAQ → termes liés → articles liés.
- **Outil :** description → cas d'usage → lien site officiel / GitHub → termes liés.
- **Acteur :** présentation → produits/services pertinents → lien site officiel → termes liés.
- **Standard :** description → spécification → exemples d'implémentation → termes liés.

#### Règles de contenu

- **Publication planifiée :** chaque contenu a une date `publishedAt` — publié uniquement quand la date est atteinte (filtrage au build).
- **Date de mise à jour :** champ `updatedAt` affiché sur la page (« Publié le X — Mis à jour le Y »). Signal de fraîcheur pour les moteurs et les LLMs.
- **Workflow par lots :** rédiger 10-20 entrées → génération assistée par IA → relecture manuelle → commit → déploiement progressif.
- **Schema.org :** JSON-LD adapté au type d'entrée (voir tableau ci-dessus) + `WebPage` + `BreadcrumbList`.

### 6.2 Blog

- **Deux types de contenu :**
  - **Actualités :** articles courts et réactifs sur les évolutions du web agentique.
  - **Articles de fond (evergreen) :** analyses approfondies, études de cas, guides (SEO long-tail).
- **Frontmatter :**

```yaml
---
title: "Why SearchGPT Can't Read Your Prices"
slug: "why-searchgpt-cant-read-your-prices"
description: "Une analyse approfondie de pourquoi les agents IA échouent à extraire les prix de la plupart des sites e-commerce."
category: "case-study"
tags: ["geo", "e-commerce", "structured-data"]
publishedAt: "2026-03-20"
updatedAt: "2026-03-25"
status: "draft" | "scheduled" | "published"
author: "Web4Agents"
image: "template-03"
readingTime: 8
---
```

- **Images d'articles :** sélectionnées parmi un set d'images templates pré-conçues. Une card avec le titre de l'article est superposée dynamiquement (via `@vercel/og` ou un composant React pour la génération d'images OG).
- **Table des matières (TOC) :** auto-générée à partir des titres Markdown (`##`, `###`) pour les articles longs. Affichée en sidebar ou en haut d'article.
- **Schema.org :** JSON-LD `Article` + `BreadcrumbList` par article.

### 6.3 Documentation

- **Structure :** navigation latérale (sidebar), organisée par sections (Démarrage, Standards, Implémentation, etc.).
- **Format :** fichiers MDX, rendus statiquement.
- **Priorité :** phase 2 (après le MVP blog + glossaire).

### 6.4 Ancres sur les titres (heading anchors)

Tous les titres `<h2>` et `<h3>` des pages de contenu (blog, glossaire, docs) génèrent automatiquement une ancre cliquable.

- **Implémentation :** plugin `rehype-slug` (génère les `id`) + `rehype-autolink-headings` (ajoute le lien cliquable).
- **Comportement :** au survol d'un titre, une icône lien (`#` ou chaîne) apparaît. Au clic, l'URL se met à jour avec le hash (`/blog/my-article#section-title`).
- **Usage :** permet le deep linking, le partage de sections spécifiques, et améliore la navigation dans les articles longs.
- **SEO :** les ancres sont indexables par Google et apparaissent parfois comme jump links dans les résultats de recherche.

### 6.5 Boutons de partage social

Présents sur chaque article de blog et chaque entrée du glossaire.

| Bouton | Action |
|---|---|
| Twitter/X | Ouvre un tweet pré-rempli avec le titre + URL |
| LinkedIn | Ouvre le formulaire de partage LinkedIn avec l'URL |
| Copier le lien | Copie l'URL dans le presse-papier avec feedback visuel (« Lien copié ! ») |

- **Positionnement :** en haut et/ou en bas de l'article (sticky sidebar sur desktop possible en phase 2).
- **Pas de SDK externe** — liens natifs (`https://twitter.com/intent/tweet?text=...&url=...`) pour éviter les scripts tiers et préserver la performance.
- **Partage d'une section :** combiné avec les ancres, on peut partager un lien vers une section spécifique d'un article.

### 6.6 Breadcrumbs visuels

Fil d'Ariane affiché en haut de chaque page de contenu, au-dessus du titre.

Exemples :
```
Accueil > Glossaire > GEO
Accueil > Blog > Why SearchGPT Can't Read Your Prices
Accueil > Glossaire > Outils > n8n
```

- **Implémentation :** composant `Breadcrumbs.tsx` qui reconstruit le chemin à partir de la route et des métadonnées du contenu.
- **Doublement :** les breadcrumbs sont rendus visuellement ET en JSON-LD `BreadcrumbList` pour le SEO. Google affiche les breadcrumbs directement dans les résultats de recherche.
- **Séparateur :** chevron (`>`) ou slash (`/`), cohérent avec le style institutionnel.
- **Dernier élément :** non cliquable (page courante), mais affiché pour le contexte.

### 6.8 Auto-linking du glossaire

Plugin `remark` personnalisé qui détecte automatiquement les termes du glossaire dans le contenu des articles et de la documentation, et les transforme en liens vers leur page de définition.

- Parcourt la liste des termes publiés au moment du build.
- Remplace la première occurrence de chaque terme dans un article par un lien hypertexte.
- Évite le sur-linking (une seule fois par terme par page).
- Ajoute un style distinctif (ex : soulignement pointillé) pour différencier des liens classiques.

Impact : **maillage interne massif et automatique** — chaque nouvel article ou terme renforce le réseau de liens.

### 6.9 Stratégie anti-spam de déploiement

Pour éviter d'être signalé comme spam généré par IA :
- Déployer le contenu par petits lots (5-10 pages/semaine).
- S'assurer que chaque page apporte une vraie valeur et une perspective unique.
- Relecture manuelle de tout le contenu avant publication.
- Maillage interne entre termes liés et articles.
- Courbe d'indexation progressive.

---

## 7. Stratégie SEO / GEO (Priorité n°1)

### 7.1 Mots-clés cibles

| Cluster de mots-clés | Exemples | Intention |
|---|---|---|
| **Concept principal** | `GEO`, `Generative Engine Optimization`, `agent engine optimization` | Définition, autorité |
| **Descriptif** | `web for AI agents`, `agentic web`, `agent-readable web` | Notoriété |
| **Technique** | `structured data for AI agents`, `schema.org AI optimization`, `LLM-optimized content` | Implémentation |
| **Problème identifié** | `AI agent can't read my website`, `make website agent-friendly` | Point de douleur |
| **Comparatif** | `SEO vs GEO`, `GEO vs GEO`, `traditional SEO vs agent optimization` | Différenciation |
| **Marque** | `web4agents`, `web4`, `web4agents.org` | Notoriété de marque |
| **Longue traîne** | `how to optimize e-commerce for AI agents`, `best practices agent-readable HTML` | Contenu approfondi |

### 7.2 Checklist SEO technique

- [x] Génération statique (SSG) pour toutes les pages de contenu — Core Web Vitals rapides.
- [ ] `sitemap.xml` auto-généré (avec `lastmod`, par locale).
- [ ] `robots.txt` avec autorisation explicite des crawlers IA (voir section 7.7).
- [ ] URLs canoniques sur toutes les pages.
- [ ] Balises meta Open Graph + Twitter Card sur toutes les pages.
- [ ] Liens alternatifs `hreflang` pour toutes les pages traduites.
- [ ] Données structurées JSON-LD sur chaque type de page :
  - `WebSite` + `Organization` (global)
  - `Article` (articles de blog)
  - `DefinedTerm` / `SoftwareApplication` / `Organization` (glossaire, selon le type)
  - `BreadcrumbList` (toutes les pages)
  - `FAQPage` (quand applicable)
  - `WebPage` (pages génériques)
- [ ] HTML sémantique partout (`<article>`, `<nav>`, `<main>`, `<section>`, `<aside>`).
- [ ] `<title>` et `<meta description>` optimisés par page.
- [ ] Texte alternatif (alt) sur toutes les images.
- [ ] Stratégie de maillage interne (termes du glossaire ↔ articles de blog ↔ docs).
- [ ] TTFB rapide (<200ms via Vercel edge).
- [ ] Optimisation des images via `next/image`.
- [ ] Chargement différé (lazy loading) pour le contenu sous la ligne de flottaison.
- [ ] Breadcrumbs visuels sur toutes les pages de contenu (voir section 6.6).
- [ ] Ancres sur tous les titres via `rehype-slug` + `rehype-autolink-headings` (voir section 6.4).
- [ ] Boutons de partage social sur les articles et le glossaire (voir section 6.5).
- [ ] Stratégie de redirections : fichier `next.config.js` → `redirects()` pour gérer les changements de slugs sans perte de jus SEO.
- [ ] Prefetching des liens internes (natif Next.js `<Link>`).

### 7.3 GEO (Generative Engine Optimization)

Pour être cité par les LLMs (ChatGPT, Perplexity, Gemini) :

- **Définitions claires et extractables** — chaque terme du glossaire commence par une définition en une ligne que les LLMs peuvent citer.
- **Ton autoritaire** — institutionnel, factuel, sourcé quand c'est possible.
- **Données structurées** — balisage schema.org que les agents peuvent parser directement.
- **Sections FAQ** dans les pages clés — les LLMs adorent le format question/réponse.
- **« Selon Web4Agents.org… »** — rédiger de manière naturellement citable.
- **Le site lui-même doit être optimisé pour les agents** — pratiquer ce qu'on prêche (eat your own dog food).

### 7.4 `llms.txt` — Fichier de référence pour les LLMs

Standard émergent (llmstxt.org) : un fichier Markdown à la racine du site qui décrit le contenu de manière structurée pour les LLMs. Équivalent du `robots.txt` pour les agents IA.

**Généré automatiquement au build** à partir des contenus Markdown publiés :

```markdown
# Web4Agents.org

> The authoritative reference for Generative Engine Optimization (GEO).

## Glossary
- [GEO](/en/glossary/geo): The practice of optimizing web content for autonomous AI agents.
- [Semantic Fragment](/en/glossary/semantic-fragment): A self-contained unit of meaning in HTML.
- ...

## Blog
- [Why SearchGPT Can't Read Your Prices](/en/blog/why-searchgpt-cant-read-your-prices)
- ...

## Documentation
- [Getting Started](/en/docs/getting-started)
- ...
```

Le script de génération parcourt tous les fichiers Markdown publiés et produit ce fichier au moment du build.

### 7.5 API publique pour les agents

Endpoint REST en lecture seule permettant aux agents IA de requêter directement le glossaire et le contenu. Le site devient une **source de données interrogeable par les machines** — pas juste un site à crawler.

| Endpoint | Méthode | Description |
|---|---|---|
| `/api/glossary` | GET | Liste tous les termes avec slug, titre, description courte |
| `/api/glossary/[term]` | GET | Définition complète d'un terme (JSON structuré) |
| `/api/blog` | GET | Liste des articles avec métadonnées |
| `/api/blog/[slug]` | GET | Contenu complet d'un article |

Réponses en JSON, cache agressif via `Cache-Control`, rate limiting basique.

Potentiel de monétisation futur : API gratuite avec rate limit → tier payant pour usage intensif.

### 7.7 `robots.txt` — Autorisation explicite des crawlers IA

La plupart des sites **bloquent** les crawlers IA. Web4Agents fait l'inverse : on les accueille explicitement. C'est cohérent avec le positionnement du site et ça envoie un signal fort.

```
# web4agents.org — robots.txt
# This site is optimized for AI agents. Welcome.

User-agent: *
Allow: /

# AI Crawlers — explicitly allowed
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GoogleOther
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: anthropic-ai
Allow: /

Sitemap: https://web4agents.org/sitemap.xml
```

Ce fichier est statique (`public/robots.txt`) mais documenté ici pour référence. Le commentaire d'accueil est volontaire — certains crawlers IA lisent les commentaires du robots.txt.

### 7.8 Link building (expliqué)

Le link building actif consiste à rechercher activement des backlinks depuis d'autres sites web pour améliorer l'autorité du domaine. Stratégies :

- **Articles invités** sur des blogs tech (dev.to, Medium, Smashing Magazine).
- **Lancement Product Hunt** quand l'outil d'audit sera prêt.
- **Hacker News / Reddit** — publications d'articles evergreen.
- **Présence GitHub** — outils open-source ou checklists avec lien retour.
- **Annuaires** — répertoires web pertinents et awesome-lists.
- **Outreach** — contacter des blogueurs/journalistes couvrant l'IA et le web.
- **Partage social** — LinkedIn, Twitter/X (audience tech).

Recommandé une fois qu'une base solide de contenu existe (10+ articles de qualité).

---

## 8. Design et identité visuelle

### Direction artistique

**Minimaliste tech institutionnel** — la crédibilité d'un organisme de standardisation, la clarté d'une documentation technique.

### Références

| Site | Inspiration |
|---|---|
| github.com | Layout épuré, developer-friendly, densité de contenu |
| openai.com | Autorité, espaces blancs, typographie moderne |
| ethereum.org | Sensation institutionnelle .org, community-driven, contenu structuré |
| Wikipedia | Structure encyclopédique — mais modernisée |

### Principes de design

- **Fond blanc par défaut** avec dark mode optionnel (toggle).
- **Espaces blancs généreux** — laisser respirer le contenu.
- **Accents monospace** pour le code et termes techniques (ex : `Inter` pour le corps, `JetBrains Mono` pour le code).
- **Palette neutre** — base noir/blanc/gris + une couleur d'accent (suggestion : bleu ou teal pour confiance/tech).
- **Aucun fouillis visuel** — pas de photos stock, pas d'abus de dégradés. Le contenu est roi.
- **Responsive first** — l'expérience mobile aussi importante que le desktop.
- **Bibliothèque de composants cohérente** — cartes, badges, callouts, blocs de code réutilisables.

### Composants clés

- **Section héro** (accueil) : déclaration de manifeste + CTA newsletter.
- **Cartes de contenu** : entrées blog/glossaire avec typographie soignée.
- **Générateur d'images d'articles** : image template + card avec titre superposée (pour OG/partage social).
- **Inscription newsletter** : formulaire minimaliste (email uniquement), présent en accueil + footer.
- **Formulaire de demande d'audit** : URL + email + message optionnel.
- **Page de terme du glossaire** : définition → détails → termes liés → articles liés.
- **Page d'article de blog** : image héro → table des matières → contenu → boutons de partage → articles liés.
- **Breadcrumbs** : fil d'Ariane visuel en haut de chaque page de contenu (Accueil > Glossaire > GEO).
- **Page 404** : message clair + suggestions (articles populaires, glossaire, recherche).

---

## 9. Accessibilité (a11y)

Standard minimum : **WCAG 2.1 niveau AA**. Indispensable pour la crédibilité technique et un facteur de ranking Google.

### Exigences

- **Navigation au clavier** complète — tous les éléments interactifs accessibles via Tab/Enter/Espace.
- **Skip-to-content link** — premier élément focusable, permet de sauter la navigation.
- **Contrastes** — ratio minimum 4.5:1 pour le texte, 3:1 pour les éléments UI (vérifiable via axe-core).
- **Focus visible** — outline claire et cohérente sur tous les éléments focusables (jamais `outline: none` sans alternative).
- **Attributs ARIA** — labels sur les formulaires, rôles sur les composants custom, `aria-current` sur la navigation.
- **Balises sémantiques** — `<main>`, `<nav>`, `<article>`, `<aside>`, `<header>`, `<footer>` (déjà prévu pour le SEO).
- **Alt text** — sur toutes les images (déjà prévu pour le SEO).
- **Tailles de texte** — minimum 16px pour le corps, unités `rem` pour le scaling.
- **Réduction de mouvement** — respecter `prefers-reduced-motion` pour les animations.
- **Dark mode** — contraste vérifié aussi en mode sombre.

### Tests

- **axe-core** intégré dans le processus de développement (via `@axe-core/react` en dev ou extension navigateur).
- Audit Lighthouse accessibilité à chaque déploiement.

---

## 10. Sécurité

### Headers HTTP

Configurés dans `next.config.js` → `headers()`. Signal d'autorité et protection de base.

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://www.googletagmanager.com; ...
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Protection des formulaires

- **Honeypot anti-bot** — champ caché invisible pour les humains, rempli par les bots. Plus léger et meilleur pour l'UX qu'un reCAPTCHA.
- **Rate limiting** sur les routes API (newsletter, contact, audit) — via middleware Vercel ou `upstash/ratelimit`.
- **Validation côté serveur** de toutes les entrées (email, URL).

---

## 11. Architecture Firebase et emails

### Collections Firestore

```
/subscribers
  {email, locale, source: "newsletter"|"audit", subscribedAt, status: "active"|"unsubscribed"}

/audit-requests
  {email, url, message?, requestedAt, status: "pending"|"contacted"|"completed"}
```

### Intégration Resend

- **Email de bienvenue** à l'inscription newsletter.
- **Email de confirmation** à la demande d'audit.
- Templates stockés dans le code (React Email ou HTML).

---

## 12. Périmètre MVP et roadmap

### Phase 1 — MVP (objectif : 4-6 semaines à 5h/semaine)

**Setup et infrastructure :**
- [x] Setup du projet (Next.js + Tailwind + next-intl + Vercel)
- [ ] Headers de sécurité (`next.config.js`)
- [ ] Setup Google Analytics 4
- [ ] Intégration Firebase (stockage des emails)
- [ ] Intégration Resend (emails de bienvenue + confirmation)

**Layout et pages :**
- [ ] Layout global (header, footer, navigation responsive, breadcrumbs, skip-to-content)
- [ ] Page d'accueil (manifeste + inscription newsletter)
- [ ] Page de contact
- [ ] Pages mentions légales + politique de confidentialité
- [ ] Page 404 personnalisée
- [ ] Toggle dark mode

**Systèmes de contenu :**
- [ ] Système de glossaire/encyclopédie (listing avec filtres par type + pages individuelles, avec `updatedAt`)
- [ ] Système de blog (listing + pages individuelles, TOC auto)
- [ ] Ancres sur les titres (`rehype-slug` + `rehype-autolink-headings`)
- [ ] Boutons de partage social (Twitter/X, LinkedIn, copier le lien)
- [ ] Breadcrumbs visuels + JSON-LD
- [ ] Plugin remark d'auto-linking du glossaire
- [ ] 10-15 entrées du glossaire — premier lot (concepts + quelques outils/acteurs)
- [ ] 3-5 articles de blog (mix actualités + evergreen)
- [ ] Landing page audit (présentation + formulaire de demande)

**SEO / GEO :**
- [ ] Setup SEO complet (sitemap, robots.txt avec crawlers IA, JSON-LD, meta tags, hreflang, images OG)
- [ ] Génération automatique de `llms.txt` au build
- [ ] Flux RSS (`/feed.xml`)

**Protection :**
- [ ] Honeypot anti-bot sur tous les formulaires
- [ ] Rate limiting sur les routes API

**Accessibilité :**
- [ ] Navigation clavier, focus visible, skip-to-content, contrastes AA
- [ ] Audit Lighthouse accessibilité

**Déploiement :**
- [ ] Déploiement sur Vercel + connexion du domaine

### Phase 2 — Croissance

- [ ] Section documentation (guides de bonnes pratiques)
- [ ] 50+ termes du glossaire
- [ ] 15+ articles de blog
- [ ] Traduction française (seconde locale)
- [ ] Système de génération d'images d'articles
- [ ] API publique (`/api/glossary`, `/api/blog`) pour les agents
- [ ] Fonctionnalité de recherche (côté client ou Algolia)
- [ ] Campagne de link building

### Phase 3 — Monétisation

- [ ] Outil d'audit automatisé (payant)
- [ ] Génération de rapports PDF/web
- [ ] Intégration paiement
- [ ] Tableau de bord utilisateur (historique d'audits)
- [ ] API avec tiers payant (rate limit étendu)

---

## 13. Structure du projet

```
web4agents/
├── public/
│   ├── images/
│   │   └── templates/          # Images templates pour les articles
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              # Accueil
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx          # Listing blog
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # Article de blog
│   │   │   ├── glossary/
│   │   │   │   ├── page.tsx          # Listing glossaire
│   │   │   │   └── [term]/
│   │   │   │       └── page.tsx      # Terme du glossaire
│   │   │   ├── docs/
│   │   │   │   └── page.tsx          # Documentation
│   │   │   ├── audit/
│   │   │   │   └── page.tsx          # Landing audit
│   │   │   ├── contact/
│   │   │   │   └── page.tsx          # Contact
│   │   │   ├── legal/
│   │   │   │   └── page.tsx          # Mentions légales
│   │   │   └── privacy/
│   │   │       └── page.tsx          # Politique de confidentialité
│   │   ├── api/
│   │   │   ├── newsletter/
│   │   │   │   └── route.ts          # POST — inscription newsletter
│   │   │   ├── contact/
│   │   │   │   └── route.ts          # POST — formulaire de contact
│   │   │   ├── audit/
│   │   │   │   └── route.ts          # POST — demande d'audit
│   │   │   ├── glossary/
│   │   │   │   ├── route.ts          # GET — liste des termes (API publique)
│   │   │   │   └── [term]/
│   │   │   │       └── route.ts      # GET — définition d'un terme
│   │   │   └── blog/
│   │   │       ├── route.ts          # GET — liste des articles (API publique)
│   │   │       └── [slug]/
│   │   │           └── route.ts      # GET — contenu d'un article
│   │   ├── not-found.tsx             # Page 404 personnalisée
│   │   ├── feed.xml/
│   │   │   └── route.ts              # Flux RSS
│   │   ├── llms.txt/
│   │   │   └── route.ts              # Génération automatique llms.txt
│   │   └── sitemap.ts                # Sitemap auto-généré
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── Breadcrumbs.tsx
│   │   │   └── SkipToContent.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ShareButtons.tsx
│   │   ├── content/
│   │   │   ├── TableOfContents.tsx
│   │   │   ├── GlossaryAutoLink.tsx
│   │   │   └── ArticleMeta.tsx       # Dates publication/mise à jour, temps de lecture
│   │   ├── seo/
│   │   │   ├── JsonLd.tsx
│   │   │   └── MetaTags.tsx
│   │   ├── forms/
│   │   │   ├── NewsletterForm.tsx
│   │   │   ├── AuditRequestForm.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   └── HoneypotField.tsx
│   │   └── ThemeToggle.tsx
│   ├── lib/
│   │   ├── content.ts            # Parsing Markdown (gray-matter + remark/rehype)
│   │   ├── firebase.ts           # Client Firestore
│   │   ├── resend.ts             # Envoi d'emails
│   │   ├── seo.ts                # Générateurs JSON-LD (DefinedTerm, SoftwareApplication, Organization, Article...)
│   │   ├── llms.ts               # Générateur llms.txt
│   │   └── remark-glossary.ts    # Plugin remark auto-linking glossaire
│   │   # Note : rehype-slug + rehype-autolink-headings configurés dans content.ts
│   └── styles/
│       └── globals.css           # Tailwind base + styles personnalisés
├── content/
│   ├── blog/
│   │   ├── en/
│   │   │   └── why-searchgpt-cant-read-your-prices.md
│   │   └── fr/
│   │       └── pourquoi-searchgpt-ne-lit-pas-vos-prix.md
│   └── glossary/
│       ├── en/
│       │   ├── geo.md                  # type: concept
│       │   ├── semantic-fragment.md    # type: concept
│       │   ├── actionable-dom.md       # type: concept
│       │   ├── n8n.md                  # type: tool
│       │   ├── openai.md              # type: actor
│       │   └── llms-txt.md            # type: standard
│       └── fr/
│           ├── geo.md
│           ├── fragment-semantique.md
│           ├── dom-actionnable.md
│           ├── n8n.md
│           ├── openai.md
│           └── llms-txt.md
├── messages/
│   ├── en.json                   # Traductions UI
│   └── fr.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 14. Décisions techniques clés

| Décision | Choix | Pourquoi |
|---|---|---|
| SSG plutôt que SSR | `generateStaticParams` | Performance, SEO, coût (tier gratuit Vercel) |
| Markdown plutôt que CMS | Contenu dans Git | Versioning, workflow par lots, aucun vendor lock-in |
| next-intl plutôt que i18n natif Next.js | i18n complet | Slugs traduits, fichiers de messages, routing middleware |
| Firestore plutôt qu'une BDD complète | Léger | Stockage d'emails uniquement, pas de requêtes complexes |
| @vercel/og pour les images | OG dynamiques | Images d'articles avec titre superposé, zéro design manuel |
| Resend plutôt que SendGrid | Developer-first | API simple, support React Email, tier gratuit généreux |
| Honeypot plutôt que reCAPTCHA | UX-first | Aucun impact sur l'expérience utilisateur, zéro dépendance externe |
| llms.txt généré au build | Agent-first | Le site pratique ce qu'il prêche — lisible par les agents dès la racine |
| robots.txt permissif pour les IA | Agent-first | Inverse de la tendance (la plupart bloquent) — signal fort de positionnement |
| Glossaire multi-types | Encyclopédie | Un seul système pour concepts, outils, acteurs, standards — pas de multiplication des sections |
| API publique REST | Différenciation | Source de données interrogeable, pas juste un site à crawler |

---

*Dernière mise à jour : 20/02/2026*
