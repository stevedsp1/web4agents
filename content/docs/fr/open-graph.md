---
title: "Open Graph et balises meta"
slug: "open-graph"
description: "Comment les balises Open Graph et meta aident les agents IA à comprendre vos pages."
category: "structured-data"
order: 3
publishedAt: "2025-02-15"
status: "published"
---

Les balises meta Open Graph (OG) ont été créées à l’origine par Facebook pour les aperçus de liens. Aujourd’hui, elles sont lues par les crawlers IA, les applications de chat, les messageries et les services d’aperçu de liens pour comprendre de quoi parle une page.

## Bases

Les balises Open Graph se placent dans le `<head>` HTML :

```html
<meta property="og:title" content="Comment optimiser pour les agents IA" />
<meta property="og:description" content="Guide pratique pour rendre votre site prêt pour les agents." />
<meta property="og:url" content="https://example.com/blog/guide-geo" />
<meta property="og:image" content="https://example.com/images/guide-geo.jpg" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="Mon blog" />
```

## Balises essentielles

| Balise | Description | Requise |
|--------|-------------|---------|
| `og:title` | Titre de la page tel qu’affiché au partage | Oui |
| `og:description` | Courte description (1–2 phrases) | Oui |
| `og:url` | URL canonique de la page | Oui |
| `og:image` | Image d’aperçu (min. 1200×630 px) | Oui |
| `og:type` | Type de contenu : `website`, `article`, `product`… | Recommandé |
| `og:site_name` | Nom de votre site | Recommandé |

Pour les articles de blog : `article:published_time`, `article:modified_time`, `article:author`. Les agents IA et les moteurs utilisent ces métadonnées pour le référencement et les citations.
