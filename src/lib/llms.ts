import { getBaseUrl } from "./seo";
import { getExternalPath } from "@/i18n/routing";
import { getGlossaryEntries } from "./content";
import { getBlogPosts } from "./content";
import { getDocEntries } from "./content-docs";

const llmsHeaders: Record<
  string,
  { tagline: string; glossary: string; blog: string; docs: string; docsOverview: string }
> = {
  en: {
    tagline: "> The authoritative reference for Generative Engine Optimization (GEO).",
    glossary: "## Glossary",
    blog: "## Blog",
    docs: "## Documentation",
    docsOverview: "Docs overview",
  },
  fr: {
    tagline: "> La référence pour la Generative Engine Optimization (GEO).",
    glossary: "## Glossaire",
    blog: "## Blog",
    docs: "## Documentation",
    docsOverview: "Vue d'ensemble des docs",
  },
};

export async function generateLlmsTxtContent(locale: string = "en"): Promise<string> {
  const baseUrl = getBaseUrl();
  const entries = await getGlossaryEntries(locale);
  const posts = await getBlogPosts(locale);
  const docs = await getDocEntries(locale);
  const h = llmsHeaders[locale] ?? llmsHeaders.en;

  const lines: string[] = [
    "# Web4Agents.org",
    "",
    h.tagline,
    "",
    h.glossary,
    "",
  ];

  const glossaryBase = getExternalPath("/glossary", locale);
  const blogBase = getExternalPath("/blog", locale);
  const docsBase = getExternalPath("/docs", locale);

  for (const entry of entries) {
    const url = `${baseUrl}/${locale}${glossaryBase}/${entry.slug}`;
    const desc = entry.description ?? entry.title;
    lines.push(`- [${entry.title}](${url}): ${desc}`);
  }

  lines.push("", h.blog, "");

  for (const post of posts) {
    const url = `${baseUrl}/${locale}${blogBase}/${post.slug}`;
    lines.push(`- [${post.title}](${url})`);
  }

  lines.push("", h.docs, "", `- [${h.docsOverview}](${baseUrl}/${locale}${docsBase})`, "");

  for (const doc of docs) {
    const url = `${baseUrl}/${locale}${docsBase}/${doc.slug}`;
    const desc = doc.description ?? doc.title;
    lines.push(`- [${doc.title}](${url}): ${desc}`);
  }

  return lines.join("\n");
}
