import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  localeDetection: true,
  pathnames: {
    "/": "/",
    "/blog": {
      en: "/blog",
      fr: "/blog",
    },
    "/audit": {
      en: "/audit",
      fr: "/audit",
    },
    "/contact": {
      en: "/contact",
      fr: "/contact",
    },
    "/docs": {
      en: "/docs",
      fr: "/documentation",
    },
    "/glossary": {
      en: "/glossary",
      fr: "/glossaire",
    },
    "/legal": {
      en: "/legal",
      fr: "/mentions-legales",
    },
    "/privacy": {
      en: "/privacy",
      fr: "/politique-de-confidentialite",
    },
    "/contribute": {
      en: "/contribute",
      fr: "/contribution",
    },
    "/docs/[slug]": {
      en: "/docs/[slug]",
      fr: "/documentation/[slug]",
    },
    "/blog/[slug]": {
      en: "/blog/[slug]",
      fr: "/blog/[slug]",
    },
    "/glossary/[slug]": {
      en: "/glossary/[slug]",
      fr: "/glossaire/[slug]",
    },
  },
});

/** External path for a given internal path and locale (for pathnames that differ by locale). */
export function getExternalPath(internalPath: string, locale: string): string {
  const mapping = routing.pathnames?.[internalPath as keyof typeof routing.pathnames];
  if (mapping && typeof mapping === "object" && locale in (mapping as Record<string, string>)) {
    return (mapping as Record<string, string>)[locale];
  }
  return internalPath;
}

/** Normalize pathname (possibly external, possibly prefixed with locale) to internal href
 * for router.replace so locale switch loads the same page.
 * Examples:
 *   "/fr"                                  → "/"
 *   "/fr/glossaire/base-vectorielle"       → { pathname: "/glossary/[slug]", params: { slug: "base-vectorielle" } }
 *   "/en/docs/what-are-ai-agents"          → { pathname: "/docs/[slug]", params: { slug: "what-are-ai-agents" } }
 *   "/fr/documentation/quest-ce-quun..."   → { pathname: "/docs/[slug]", params: { slug: "..." } }
 */
export function pathnameToInternalHref(
  pathname: string
): string | { pathname: string; params: Record<string, string> } {
  const segments = pathname.split("/").filter(Boolean);
  // Strip leading locale (en/fr)
  const first = segments[0];
  const rest = first === "en" || first === "fr" ? segments.slice(1) : segments;

  // Root path (was "/en" or "/fr" with nothing after)
  if (rest.length === 0) return "/";

  const [segment, ...slugParts] = rest;
  const slug = slugParts.join("/");

  if (rest.length >= 2) {
    if ((segment === "documentation" || segment === "docs") && slug) {
      return { pathname: "/docs/[slug]", params: { slug } };
    }
    if ((segment === "glossaire" || segment === "glossary") && slug) {
      return { pathname: "/glossary/[slug]", params: { slug } };
    }
    if (segment === "blog" && slug) {
      return { pathname: "/blog/[slug]", params: { slug } };
    }
  }

  // Single segment after locale (e.g. /fr/audit, /fr/blog, /fr/documentation)
  const segmentToInternal: Record<string, string> = {
    documentation: "/docs",
    glossaire: "/glossary",
    "mentions-legales": "/legal",
    "politique-de-confidentialite": "/privacy",
    contribution: "/contribute",
  };
  if (segmentToInternal[segment]) return segmentToInternal[segment];

  return `/${rest.join("/")}`;
}
