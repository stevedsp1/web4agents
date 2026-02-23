import { NextRequest } from "next/server";
import { getBlogPosts } from "@/lib/content";
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

  try {
    const posts = await getBlogPosts(locale);
    const payload = posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: p.category,
      tags: p.tags,
      publishedAt: p.publishedAt,
      updatedAt: p.updatedAt,
      author: p.author,
      image: p.image,
      readingTime: p.readingTime,
    }));
    return new Response(JSON.stringify({ posts: payload }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": CACHE_CONTROL,
      },
    });
  } catch (err) {
    console.error("API blog list:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
