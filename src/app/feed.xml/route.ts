import { getBlogPosts } from "@/lib/content";
import { getBaseUrl } from "@/lib/seo";
import { routing, getExternalPath } from "@/i18n/routing";

export async function GET() {
  const baseUrl = getBaseUrl();
  const locale = routing.defaultLocale;
  const blogBase = getExternalPath("/blog", locale);
  const posts = await getBlogPosts(locale);

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
    <title>Web4Agents Blog</title>
    <link>${baseUrl}/${locale}${blogBase}</link>
    <description>The reference for the Agentic Web — Blog</description>
    <language>${locale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>${items}
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
