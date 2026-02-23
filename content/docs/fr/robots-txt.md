---
title: "robots.txt"
slug: "robots-txt"
description: "Guide complet sur robots.txt : syntaxe, directives, règles par crawler IA et bonnes pratiques pour 2026."
category: "crawlers"
order: 2
publishedAt: "2025-02-15"
updatedAt: "2026-02-20"
status: "published"
---

Le fichier `robots.txt` est un fichier texte placé à la racine de votre domaine (`https://example.com/robots.txt`). Il indique aux crawlers web — moteurs de recherche traditionnels et agents IA — quelles pages ils peuvent accéder, avant qu’ils ne visitent une URL.

## Emplacement et format

- **URL** : `https://votredomaine.com/robots.txt`
- **Format** : Texte brut, encodage UTF-8
- **Sensibilité à la casse** : Les chemins sont sensibles à la casse sur les serveurs Unix/Linux

## Syntaxe de base

```
User-agent: GPTBot
Disallow: /private/
Allow: /

User-agent: *
Disallow: /admin/
```

- `User-agent` — Le crawler auquel s’applique le bloc de règles. `*` correspond à tous les crawlers.
- `Disallow` — Chemins que le crawler ne doit pas accéder (récursif : `/blog/` bloque toutes les URL commençant par `/blog/`).
- `Allow` — Autorise explicitement un chemin, en surchargeant un `Disallow` plus large.
- `Crawl-delay: N` — Demande une pause de N secondes entre les requêtes (non supporté par tous les crawlers).
- `Sitemap: URL` — Pointe vers l’URL de votre sitemap.

Les règles sont évaluées de haut en bas. Pour un crawler donné, la règle la plus spécifique l’emporte.

## Patterns avec wildcards

La plupart des crawlers supportent deux wildcards :

- `*` — correspond à toute séquence de caractères
- `$` — ancre à la fin de l’URL

```
# Bloquer tous les PDF
User-agent: *
Disallow: /*.pdf$

# Bloquer les URL avec ?session=
User-agent: *
Disallow: /*?session=
```

## Référence des user-agents des crawlers IA

| Crawler | Entreprise | Rôle |
|---------|------------|------|
| `GPTBot` | OpenAI | Navigation et entraînement ChatGPT |
| `OAI-SearchBot` | OpenAI | Recherche ChatGPT |
| `ChatGPT-User` | OpenAI | Navigation déclenchée par l’utilisateur ChatGPT |
| `ClaudeBot` | Anthropic | Entraînement et navigation Claude |
| `anthropic-ai` | Anthropic | Anthropic général |
| `PerplexityBot` | Perplexity AI | Recherche Perplexity |
| `Google-Extended` | Google | Entraînement Gemini (distinct de Googlebot) |
| `Applebot-Extended` | Apple | Apple Intelligence |
| `Meta-ExternalAgent` | Meta | Meta AI |
| `Bytespider` | ByteDance | TikTok / entraînement |
| `CCBot` | Common Crawl | Jeu de données ouvert (utilisé par de nombreuses orgs IA) |
| `Diffbot` | Diffbot | Extraction de données pour l’IA |

## Bloquer tous les crawlers IA

Pour bloquer les principaux crawlers IA tout en gardant les moteurs traditionnels :

```
User-agent: GPTBot
Disallow: /

User-agent: OAI-SearchBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /
```

**Note** : Bloquer `Google-Extended` n’a aucun impact sur la recherche Google traditionnelle (`Googlebot`). Ils sont indépendants.

## Autoriser certains, bloquer d’autres

Autoriser les agents IA reconnus et bloquer les agrégateurs de données :

```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /
```

## Bloquer uniquement certaines sections

Autoriser le crawl en général mais protéger les zones réservées aux membres ou aux transactions :

```
User-agent: GPTBot
Disallow: /members/
Disallow: /checkout/
Disallow: /api/private/
Allow: /
```

## Exemple recommandé complet

```
# Moteurs de recherche traditionnels
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Agents IA — autorisés
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

# Agents IA — bloqués (agrégateurs de données d'entraînement)
User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

# Tous les autres crawlers
User-agent: *
Allow: /

# Sitemap
Sitemap: https://example.com/sitemap.xml
```

## Erreurs courantes

- **Bloquer Googlebot par erreur** — Utiliser `User-agent: *` avec `Disallow: /` bloque la recherche Google. Ajoutez toujours des règles explicites pour Googlebot si vous utilisez un bloc wildcard.
- **Oublier Common Crawl (CCBot)** — CCBot alimente des jeux de données ouverts utilisés par de nombreuses organisations IA pour l’entraînement. Bloquez-le si vous ne voulez pas figurer dans ces corpus.
- **Oublier la référence au Sitemap** — Ajoutez toujours `Sitemap:` à la fin.
- **Croire que Disallow protège** — `robots.txt` est public et relève d’une convention, pas d’une barrière technique. Les bots malveillants l’ignorent. Utilisez une authentification pour le contenu sensible.
- **Bloquer CSS et JS** — Cela empêche les crawlers de rendre correctement vos pages.

## Bloquer les crawlers IA affecte-t-il le SEO ?

Non. `Google-Extended`, `GPTBot`, `ClaudeBot` sont totalement distincts de `Googlebot`. Les bloquer n’a aucun impact sur le classement dans la recherche Google.

## Vérification

1. Visitez `https://votredomaine.com/robots.txt` directement — vérifiez qu’il est accessible et correctement formaté.
2. Utilisez le [testeur robots.txt de Google Search Console](https://search.google.com/search-console/robots-testing-tool).
3. Consultez les logs serveur après 24–48 h pour vérifier que les crawlers respectent les règles.

## Complément : Content Signals

`robots.txt` contrôle l’**accès** (peut-on crawler ?). Pour exprimer ce que les systèmes IA peuvent *faire* avec votre contenu une fois accédé, utilisez les en-têtes [Content Signals](/fr/docs/content-signals) en complément de `robots.txt`.
