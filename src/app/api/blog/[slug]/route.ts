import { NextRequest } from "next/server";
import { getBlogPost } from "@/lib/content";
import { rateLimitGet } from "@/lib/rate-limit";
import { routing } from "@/i18n/routing";

const CACHE_CONTROL = "public, s-maxage=3600, stale-while-revalidate=86400";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { success } = await rateLimitGet(request);
  if (!success) {
    return new Response(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { slug } = await params;
  const locale = request.nextUrl.searchParams.get("locale") ?? routing.defaultLocale;
  if (!(routing.locales as readonly string[]).includes(locale)) {
    return new Response(JSON.stringify({ error: "Invalid locale" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const result = await getBlogPost(locale, slug);
    if (!result) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    const { post, headings } = result;
    const payload = {
      slug: post.slug,
      title: post.title,
      description: post.description,
      category: post.category,
      tags: post.tags,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      author: post.author,
      image: post.image,
      readingTime: post.readingTime,
      bodyHtml: post.bodyHtml,
      headings,
    };
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": CACHE_CONTROL,
      },
    });
  } catch (err) {
    console.error("API blog slug:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
