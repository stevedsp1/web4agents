# Roadmap d'implémentation — Web4Agents.org

> Plan de développement détaillé basé sur le cahier des charges (`README.md`).
> Budget temps : **~5h/semaine**. Estimation totale MVP : **8-10 semaines**.
> Coche les cases au fur et à mesure : `[ ]` → `[x]`.

---

## Phase 1 — MVP

### Étape 1 · Bootstrap du projet (~3h)

Initialisation du projet Next.js et de toute la configuration de base.

- [x] Init Next.js 14+ (App Router, TypeScript) — `package.json`, `tsconfig.json`, `next.config.js` — `npx create-next-app@latest --typescript --tailwind --app --src-dir`
- [x] Installer les dépendances — `package.json` — next-intl, gray-matter, remark, remark-gfm, rehype-slug, rehype-autolink-headings, rehype-stringify, remark-rehype, firebase, resend, @vercel/og
- [x] Configurer Tailwind — `tailwind.config.ts`, `src/styles/globals.css` — palette (noir/blanc/gris + accent bleu/teal), fonts (Inter + JetBrains Mono), dark mode `class`
- [x] Configurer next-intl — `src/i18n.ts`, `src/middleware.ts`, `next.config.js` — middleware locale, défaut `en`, locales `['en']`
- [x] Créer les fichiers de traduction — `messages/en.json` — structure : nav, home, glossary, blog, audit, contact, common, seo
- [x] Configurer les headers de sécurité — `next.config.js` — CSP, X-Content-Type-Options, X-Frame-Options, HSTS, Referrer-Policy, Permissions-Policy
- [x] Créer `robots.txt` — `public/robots.txt` — version complète avec crawlers IA (GPTBot, ClaudeBot, PerplexityBot, etc.)
- [x] Structure de dossiers — `src/`, `content/`, `messages/`, `public/` — arborescence complète vide

**Validation :** `npm run dev` fonctionne, routing `/en` actif, Tailwind opérationnel, headers visibles dans les DevTools.

---

### Étape 2 · Design system et composants UI (~4h)

- [x] Configurer les fonts — `src/app/layout.tsx`, `tailwind.config.ts` — next/font Inter + JetBrains Mono, variables CSS
- [x] Composant `Button` — `src/components/ui/Button.tsx` — variantes primary/secondary/ghost/outline, tailles sm/md/lg, états hover/focus/disabled
- [x] Composant `Card` — `src/components/ui/Card.tsx` — titre, description, badge(s), date, lien (blog/glossaire)
- [x] Composant `Badge` — `src/components/ui/Badge.tsx` — tags et types (concept, tool, actor, standard), couleur par type
- [x] Composant `Input` — `src/components/ui/Input.tsx` — texte, email, textarea, labels, placeholder, états d'erreur
- [x] Composant `ThemeToggle` — `src/components/ThemeToggle.tsx` — dark/light, localStorage, prefers-color-scheme
- [x] Composant `ShareButtons` — `src/components/ui/ShareButtons.tsx` — Twitter/X, LinkedIn, copier le lien, feedback "Lien copié !"
- [x] Composant `HoneypotField` — `src/components/forms/HoneypotField.tsx` — champ caché aria-hidden, tabindex -1, autocomplete off

**Validation :** chaque composant rendu isolément, responsive, clavier, contrastes AA en light et dark.

---

### Étape 3 · Layout global et navigation (~4h)

- [x] Layout racine locale — `src/app/[locale]/layout.tsx` — html lang, meta viewport, fonts, SkipToContent, Header, main, Footer
- [x] Composant `SkipToContent` — `src/components/layout/SkipToContent.tsx` — lien "Skip to main content", visible au focus, cible `#main-content`
- [x] Composant `Header` — `src/components/layout/Header.tsx` — logo, nav (Glossaire, Blog, Docs, Audit), langue, GitHub, ThemeToggle, menu burger mobile
- [x] Composant `Navigation` — `src/components/layout/Navigation.tsx` — items nav, aria-current="page", desktop + mobile
- [x] Composant `Footer` — `src/components/layout/Footer.tsx` — À propos, Liens, Newsletter inline, Réseaux, copyright
- [x] Composant `Breadcrumbs` — `src/components/layout/Breadcrumbs.tsx` — fil d'Ariane depuis route + métadonnées, chevron, JSON-LD BreadcrumbList

**Validation :** navigation complète au clavier, responsive, skip-to-content OK, breadcrumbs sur pages de contenu.

---

### Étape 4 · Moteur de contenu Markdown (~6h)

- [x] Lib de parsing Markdown — `src/lib/content.ts` — getGlossaryEntries, getGlossaryEntry, getBlogPosts, getBlogPost, gray-matter, remark → rehype
- [x] Configurer rehype-slug — `src/lib/content.ts` — id sur h2/h3
- [x] Configurer rehype-autolink-headings — `src/lib/content.ts` — lien cliquable + icône # au hover
- [x] Filtrage par statut et date — `src/lib/content.ts` — status published ET publishedAt <= now
- [x] Plugin auto-linking glossaire — `src/lib/remark-glossary.ts` — 1ère occurrence → lien, style soulignement pointillé
- [x] Glossaire — listing — `src/app/[locale]/glossary/page.tsx` — filtres type, compteurs, tri alpha, Card, generateMetadata
- [x] Glossaire — page individuelle — `src/app/[locale]/glossary/[term]/page.tsx` — generateStaticParams, layout par type, breadcrumbs, JSON-LD, termes liés, partage, updatedAt
- [x] Composant `ArticleMeta` — `src/components/content/ArticleMeta.tsx` — date pub, updatedAt, temps de lecture, auteur
- [x] Blog — listing — `src/app/[locale]/blog/page.tsx` — articles publiés, filtres catégorie/tag, pagination, Card, generateMetadata
- [x] Blog — page individuelle — `src/app/[locale]/blog/[slug]/page.tsx` — generateStaticParams, image héro, TOC, auto-linking, ArticleMeta, partage, articles liés, JSON-LD Article
- [x] Composant `TableOfContents` — `src/components/content/TableOfContents.tsx` — titres ##/###, liste liens ancres
- [x] Créer 2-3 entrées glossaire de test — `content/glossary/en/*.md` — au moins 1 concept, 1 tool, 1 actor
- [x] Créer 1 article de blog de test — `content/blog/en/*.md` — valider TOC, auto-linking, images, partage

**Validation :** glossaire listing → page par type OK ; blog listing → article avec TOC et auto-linking ; generateStaticParams OK ; pas de contenu futur.

---

### Étape 5 · SEO et GEO (~4h)

- [x] Lib génération JSON-LD — `src/lib/seo.ts` — websiteJsonLd, organizationJsonLd, articleJsonLd, definedTermJsonLd, softwareAppJsonLd, orgJsonLd, breadcrumbJsonLd, faqJsonLd
- [x] Composant `JsonLd` — `src/components/seo/JsonLd.tsx` — script type="application/ld+json"
- [x] Metadata dynamique — chaque page.tsx — generateMetadata : title, description, OG, Twitter Card, canonical, hreflang
- [x] Génération OG images — `src/app/api/og/route.tsx` — @vercel/og, titre + type en query, branding Web4Agents
- [x] Sitemap — `src/app/sitemap.ts` — toutes pages + contenus Markdown, lastmod, par locale
- [x] Flux RSS — `src/app/feed.xml/route.ts` — GET, flux Atom/RSS depuis articles publiés
- [x] Génération llms.txt — `src/app/llms.txt/route.ts`, `src/lib/llms.ts` — GET, Markdown structuré llmstxt.org, cache headers
- [x] Google Analytics 4 — `src/app/[locale]/layout.tsx` — next/script afterInteractive, Measurement ID en env

**Validation :** JSON-LD valide (Rich Results Test), sitemap.xml complet, feed.xml valide, llms.txt complet, OG image dynamique.

---

### Étape 6 · Formulaires et backend (~4h)

- [x] Setup Firebase — `src/lib/firebase.ts` — init app, client Firestore
- [x] Variables d'environnement — `.env.local`, `.env.example` — FIREBASE_*, RESEND_API_KEY, GA_MEASUREMENT_ID, NEXT_PUBLIC_SITE_URL
- [x] Setup Resend — `src/lib/resend.ts` — sendWelcomeEmail, sendAuditConfirmation, sendContactConfirmation
- [x] Templates email — `src/lib/email-templates/` — bienvenue newsletter, confirmation audit, confirmation contact
- [x] API newsletter — `src/app/api/newsletter/route.ts` — POST, validation + honeypot, Firestore /subscribers, Resend, rate limiting
- [x] API contact — `src/app/api/contact/route.ts` — POST, validation + honeypot, Resend, rate limiting
- [x] API audit — `src/app/api/audit/route.ts` — POST, validation + honeypot, Firestore /audit-requests, Resend, rate limiting
- [x] Composant `NewsletterForm` — `src/components/forms/NewsletterForm.tsx` — email + honeypot, états idle/loading/success/error
- [x] Composant `ContactForm` — `src/components/forms/ContactForm.tsx` — email + sujet + message + honeypot
- [x] Composant `AuditRequestForm` — `src/components/forms/AuditRequestForm.tsx` — URL + email + message optionnel + honeypot
- [x] Rate limiting — `src/lib/rate-limit.ts` ou middleware — Map+TTL ou @upstash/ratelimit, sur toutes les POST

**Validation :** newsletter → Firestore + email reçu ; contact → email reçu ; audit → Firestore + email ; honeypot bloque bots ; rate limit actif.

---

### Étape 7 · Pages statiques (~3h)

- [x] Page d'accueil — `src/app/[locale]/page.tsx` — héro + CTA newsletter, "Qu'est-ce que l'GEO ?", dernières entrées glossaire, derniers articles, CTA audit, JSON-LD WebSite + Organization
- [x] Landing page audit — `src/app/[locale]/audit/page.tsx` — présentation, valeur, ce que couvre l'audit, AuditRequestForm, FAQ + JSON-LD FAQPage
- [x] Page contact — `src/app/[locale]/contact/page.tsx` — titre, ContactForm, lien email fallback
- [x] Mentions légales — `src/app/[locale]/legal/page.tsx` — éditeur, hébergeur, propriété intellectuelle, renvoi privacy
- [x] Politique de confidentialité — `src/app/[locale]/privacy/page.tsx` — RGPD : données, finalité, durée, droits, cookies GA4, contact DPO
- [x] Page 404 — `src/app/not-found.tsx` — message clair, liens accueil/glossaire/blog, design cohérent

**Validation :** toutes les pages accessibles, responsive, metadata SEO, formulaires OK, liens internes OK, JSON-LD OK.

---

### Étape 8 · Rédaction du contenu initial (~6h)

- [x] Entrées glossaire — concepts (6-8) — GEO, Semantic Fragment, Actionable DOM, LLM Indexing, Agent-Readable Web, GEO, Machine-Readable Content, etc.
- [x] Entrées glossaire — outils (3-4) — n8n, LangChain, Playwright, AutoGPT
- [x] Entrées glossaire — acteurs (2-3) — OpenAI, Anthropic, Perplexity
- [x] Entrées glossaire — standards (2-3) — schema.org, llms.txt, robots.txt
- [x] Articles de blog — evergreen (2-3) — "What is GEO?", "Why SearchGPT Can't Read Your Prices", "SEO vs GEO"
- [x] Articles de blog — actualité (1-2) — selon actualité du moment

**Validation :** frontmatter complet partout, build sans erreur, auto-links OK, phrase de définition citable en tête de chaque contenu.

---

### Étape 9 · Accessibilité et polish (~3h)

- [ ] Audit Lighthouse — score > 95 Performance, Accessibility, Best Practices, SEO sur chaque type de page
- [x] Audit axe-core — @axe-core/react en dev, corriger violations A et AA
- [ ] Test navigation clavier — parcours complet, focus visible, ordre logique, skip-to-content
- [ ] Test responsive — 320px, 375px, 768px, 1024px, 1440px
- [ ] Test dark mode — contrastes, pas d’éléments invisibles
- [ ] Test cross-browser — Chrome, Firefox, Safari desktop + mobile
- [x] Vérifier les liens morts — tous les liens internes et relatedTerms
- [ ] Validation JSON-LD — Rich Results Test + Schema.org Validator
- [ ] Validation sitemap — /sitemap.xml complet, URLs et dates OK
- [ ] Validation RSS — /feed.xml dans un lecteur RSS
- [ ] Validation llms.txt — tous les contenus listés, format correct
- [ ] Performance — Core Web Vitals : LCP < 2.5s, FID < 100ms, CLS < 0.1
- [x] prefers-reduced-motion — animations désactivées quand actif

**Validation :** Lighthouse > 95, zéro violation axe AA, site 100% utilisable au clavier, responsive OK.

---

### Étape 10 · Déploiement (~2h)

- [ ] Créer le projet Vercel — lier le repo Git, preset Next.js
- [ ] Configurer les variables d'environnement — FIREBASE_*, RESEND_API_KEY, GA_MEASUREMENT_ID, NEXT_PUBLIC_SITE_URL
- [ ] Connecter le domaine — web4agents.org, DNS A/CNAME, propagation
- [ ] Activer HTTPS — vérifier certificat SSL Vercel
- [ ] Vérifier le build de production — npm run build local, toutes les pages générées
- [ ] Soumettre le sitemap à Google Search Console — propriété web4agents.org, soumettre /sitemap.xml
- [ ] Vérifier Google Analytics — GA4 temps réel
- [ ] Test en production — HTTPS, headers, formulaires, emails, 404, performance

**Validation :** site sur https://web4agents.org, HTTPS actif, formulaires OK en prod, GA4 actif, sitemap soumis.

---

## Phase 2 — Croissance

### Étape 11 · API publique pour les agents

- [x] API glossaire — `src/app/api/glossary/route.ts`, `src/app/api/glossary/[term]/route.ts`
- [x] API blog — `src/app/api/blog/route.ts`, `src/app/api/blog/[slug]/route.ts`
- [x] Cache headers — Cache-Control public, s-maxage=3600, stale-while-revalidate=86400
- [x] Rate limiting sur routes GET publiques
- [x] Documentation API — page ou section dans /docs

### Étape 12 · Traduction française

- [ ] Fichier de traduction FR — `messages/fr.json`
- [ ] Contenu glossaire FR — `content/glossary/fr/*.md`
- [ ] Contenu blog FR — `content/blog/fr/*.md`
- [ ] Activer la locale FR — `src/middleware.ts`, `next.config.js`
- [ ] Sélecteur de langue fonctionnel — Header, routing /en ↔ /fr
- [ ] Vérifier hreflang sur toutes les pages traduites

### Étape 13 · Contenu à grande échelle

- [ ] Glossaire 50+ entrées
- [ ] Blog 15+ articles
- [ ] Rythme 5-10 nouvelles pages/semaine (anti-spam)

### Étape 14 · Documentation

- [ ] Section docs avec sidebar — `src/app/[locale]/docs/`
- [ ] Composant `DocsSidebar.tsx`
- [ ] Guides : Getting Started, GEO Checklist, Schema.org for Agents, robots.txt Best Practices

### Étape 15 · Fonctionnalités additionnelles

- [ ] Génération d'images articles — template + card titre, stockage ou à la volée
- [ ] Recherche — index JSON côté client ou Algolia
- [ ] Sticky share sidebar sur desktop
- [ ] Campagne de link building — guest posts, Product Hunt, HN, Reddit, outreach

---

## Phase 3 — Monétisation

### Étape 16 · Outil d'audit automatisé

- [ ] Moteur d'audit — analyse URL : structured data, robots.txt, llms.txt, sémantique HTML, perfs
- [ ] Génération de rapports — PDF (puppeteer/React PDF) et/ou interface web
- [ ] Interface résultats — dashboard score + détails + recommandations

### Étape 17 · Paiement et comptes

- [ ] Intégration paiement Stripe — one-shot ou abonnement audit
- [ ] Authentification — Firebase Auth ou Clerk
- [ ] Tableau de bord — historique audits, téléchargement rapports, profil
- [ ] API payante — tier gratuit (rate limit) → tier payant

---

## Récapitulatif des durées estimées

| Étape | Durée estimée | Semaine(s) |
|---|---|---|
| 1. Bootstrap | ~3h | S1 |
| 2. Design system | ~4h | S1 |
| 3. Layout et navigation | ~4h | S2 |
| 4. Moteur de contenu | ~6h | S2-S3 |
| 5. SEO et GEO | ~4h | S3-S4 |
| 6. Formulaires et backend | ~4h | S4-S5 |
| 7. Pages statiques | ~3h | S5-S6 |
| 8. Rédaction contenu | ~6h | S3-S7 (en parallèle) |
| 9. Accessibilité et polish | ~3h | S7-S8 |
| 10. Déploiement | ~2h | S8 |
| **Total MVP** | **~39h** | **~8 semaines à 5h/sem** |

> Pour cocher : remplacer `[ ]` par `[x]` sur la ligne concernée. La rédaction de contenu (étape 8) peut se faire en parallèle dès que le moteur de contenu est prêt (après étape 4).

---

*Dernière mise à jour : 20/02/2026*
