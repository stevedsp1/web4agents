import { NextRequest } from "next/server";
import { getGlossaryEntry } from "@/lib/content";
import { rateLimitGet } from "@/lib/rate-limit";
import { routing } from "@/i18n/routing";

const CACHE_CONTROL = "public, s-maxage=3600, stale-while-revalidate=86400";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ term: string }> }
) {
  const { success } = await rateLimitGet(request);
  if (!success) {
    return new Response(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { term } = await params;
  const locale = request.nextUrl.searchParams.get("locale") ?? routing.defaultLocale;
  if (!(routing.locales as readonly string[]).includes(locale)) {
    return new Response(JSON.stringify({ error: "Invalid locale" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const entry = await getGlossaryEntry(locale, term);
    if (!entry) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    const payload = {
      slug: entry.slug,
      title: entry.title,
      description: entry.description,
      type: entry.type,
      publishedAt: entry.publishedAt,
      updatedAt: entry.updatedAt,
      category: entry.category,
      author: entry.author,
      relatedTerms: entry.relatedTerms,
      website: entry.website,
      logo: entry.logo,
      license: entry.license,
      github: entry.github,
      bodyHtml: entry.bodyHtml,
    };
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": CACHE_CONTROL,
      },
    });
  } catch (err) {
    console.error("API glossary term:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
