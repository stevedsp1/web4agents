import type { MetadataRoute } from "next";
import { routing, getExternalPath } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/seo";
import { getGlossaryEntries } from "@/lib/content";
import { getBlogPosts } from "@/lib/content";
import { getDocEntries } from "@/lib/content-docs";

export const dynamic = "force-dynamic";

/** All static routes (internal path, without [locale] prefix). Home = "". */
const STATIC_PATHS = [
  "",
  "/glossary",
  "/blog",
  "/docs",
  "/audit",
  "/contribute",
  "/contact",
  "/legal",
  "/privacy",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl().replace(/\/$/, "");
  const locales = [...(routing.locales as readonly string[])];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // Static pages (use localized path when pathnames differ per locale)
    for (const path of STATIC_PATHS) {
      const pathSegment = path ? getExternalPath(path, locale) : "";
      const pathname = pathSegment ? `/${locale}${pathSegment}` : `/${locale}`;
      entries.push({
        url: `${baseUrl}${pathname}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: path === "" ? 1 : 0.8,
      });
    }

    // Glossary terms (only published, for this locale)
    const glossaryBase = getExternalPath("/glossary", locale);
    const glossaryEntries = await getGlossaryEntries(locale);
    for (const entry of glossaryEntries) {
      entries.push({
        url: `${baseUrl}/${locale}${glossaryBase}/${entry.slug}`,
        lastModified: entry.updatedAt ? new Date(entry.updatedAt) : new Date(entry.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }

    // Blog posts (only published, for this locale)
    const blogBase = getExternalPath("/blog", locale);
    const posts = await getBlogPosts(locale);
    for (const post of posts) {
      entries.push({
        url: `${baseUrl}/${locale}${blogBase}/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }

    // Doc pages (only published, for this locale)
    const docsBase = getExternalPath("/docs", locale);
    const docs = await getDocEntries(locale);
    for (const doc of docs) {
      entries.push({
        url: `${baseUrl}/${locale}${docsBase}/${doc.slug}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(doc.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
  }

  return entries;
}
