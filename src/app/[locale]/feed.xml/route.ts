import { getBlogPosts } from "@/lib/content";
import { getBaseUrl } from "@/lib/seo";
import { routing, getExternalPath } from "@/i18n/routing";

const feedChannel: Record<
  string,
  { title: string; description: string }
> = {
  en: {
    title: "Web4Agents Blog",
    description: "The reference for the Agentic Web — Blog",
  },
  fr: {
    title: "Blog Web4Agents",
    description: "La référence pour le web agentique — Blog",
  },
};

type Params = { params: Promise<{ locale: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { locale } = await params;
  const locales = routing.locales as readonly string[];
  if (!locales.includes(locale)) {
    return new Response("Not Found", { status: 404 });
  }

  const baseUrl = getBaseUrl();
  const blogBase = getExternalPath("/blog", locale);
  const posts = await getBlogPosts(locale);
  const channel = feedChannel[locale] ?? feedChannel.en;

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${escapeXml(post.title)}]]></title>
      <description><![CDATA[${escapeXml(post.description ?? "")}]]></description>
      <link>${baseUrl}/${locale}${blogBase}/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/${locale}${blogBase}/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channel.title)}</title>
    <link>${baseUrl}/${locale}${blogBase}</link>
    <description>${escapeXml(channel.description)}</description>
    <language>${locale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/${locale}/feed.xml" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
