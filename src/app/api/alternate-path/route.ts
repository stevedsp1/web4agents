import { NextRequest } from "next/server";
import { getGlossaryEntry, getGlossarySlugForLocale } from "@/lib/content";
import { getDocPage, getDocSlugForLocale } from "@/lib/content-docs";
import { getExternalPath } from "@/i18n/routing";

const LOCALES = ["en", "fr"] as const;
const GLOSSARY_SEGMENTS = ["glossary", "glossaire"] as const;
const DOCS_SEGMENTS = ["docs", "documentation"] as const;

/**
 * GET /api/alternate-path?pathname=/fr/glossaire/base-vectorielle&locale=en
 * Returns { path: "/en/glossary/vector-database" } for use when switching locale
 * so the URL uses the correct localized slug.
 */
export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("pathname");
  const targetLocale = request.nextUrl.searchParams.get("locale");

  if (!pathname || !targetLocale || !LOCALES.includes(targetLocale as "en" | "fr")) {
    return Response.json({ error: "pathname and locale required" }, { status: 400 });
  }

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length < 3) {
    return Response.json({ path: pathname });
  }

  const [currentLocale, segment, slug] = segments;
  if (!currentLocale || !LOCALES.includes(currentLocale as "en" | "fr")) {
    return Response.json({ path: pathname });
  }

  const normalizedSlug = slug.toLowerCase().replace(/\s+/g, "-");

  if (GLOSSARY_SEGMENTS.includes(segment as (typeof GLOSSARY_SEGMENTS)[number])) {
    const entry = await getGlossaryEntry(currentLocale, normalizedSlug);
    if (!entry) return Response.json({ path: pathname });
    const targetSlug = await getGlossarySlugForLocale(entry.id, targetLocale);
    const path = `/${targetLocale}${getExternalPath("/glossary", targetLocale)}/${targetSlug ?? entry.slug}`;
    return Response.json({ path });
  }

  if (DOCS_SEGMENTS.includes(segment as (typeof DOCS_SEGMENTS)[number])) {
    const page = await getDocPage(currentLocale, normalizedSlug);
    if (!page) return Response.json({ path: pathname });
    const targetSlug = await getDocSlugForLocale(page.id, targetLocale);
    const path = `/${targetLocale}${getExternalPath("/docs", targetLocale)}/${targetSlug ?? page.slug}`;
    return Response.json({ path });
  }

  return Response.json({ path: pathname });
}
