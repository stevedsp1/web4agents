import { NextRequest } from "next/server";
import { getGlossaryEntries } from "@/lib/content";
import { rateLimitGet } from "@/lib/rate-limit";
import { routing } from "@/i18n/routing";

const CACHE_CONTROL = "public, s-maxage=3600, stale-while-revalidate=86400";

export async function GET(request: NextRequest) {
  const { success } = await rateLimitGet(request);
  if (!success) {
    return new Response(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  const locale = request.nextUrl.searchParams.get("locale") ?? routing.defaultLocale;
  if (!(routing.locales as readonly string[]).includes(locale)) {
    return new Response(JSON.stringify({ error: "Invalid locale" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const type = request.nextUrl.searchParams.get("type") ?? undefined;
  const validTypes = ["concept", "tool", "actor", "standard"];
  if (type && !validTypes.includes(type)) {
    return new Response(JSON.stringify({ error: "Invalid type" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    let entries = await getGlossaryEntries(locale);
    if (type) {
      entries = entries.filter((e) => e.type === type);
    }
    const payload = entries.map((e) => ({
      slug: e.slug,
      title: e.title,
      description: e.description,
      type: e.type,
      publishedAt: e.publishedAt,
      updatedAt: e.updatedAt,
      category: e.category,
      relatedTerms: e.relatedTerms,
      website: e.website,
    }));
    return new Response(JSON.stringify({ entries: payload }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": CACHE_CONTROL,
      },
    });
  } catch (err) {
    console.error("API glossary list:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
