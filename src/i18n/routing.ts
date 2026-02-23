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

/** Normalize pathname (possibly external) to internal href for router.replace so locale switch loads the same page. */
export function pathnameToInternalHref(
  pathname: string
): string | { pathname: string; params: Record<string, string> } {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length >= 2) {
    const [first, ...rest] = segments;
    const slug = rest.join("/");
    if ((first === "documentation" || first === "docs") && slug) {
      return { pathname: "/docs/[slug]", params: { slug } };
    }
    if ((first === "glossaire" || first === "glossary") && slug) {
      return { pathname: "/glossary/[slug]", params: { slug } };
    }
    if (first === "blog" && slug) {
      return { pathname: "/blog/[slug]", params: { slug } };
    }
  }
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}
