import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type GlossaryType = "concept" | "tool" | "actor" | "standard";

export interface GlossaryEntry {
  slug: string;
  title: string;
  description?: string;
  type: GlossaryType;
  publishedAt: string;
  updatedAt?: string;
  status: string;
  category?: string;
  author?: string;
  relatedTerms?: string[];
  website?: string;
  logo?: string;
  license?: string;
  github?: string;
}

function isPublished(status: string, publishedAt: string): boolean {
  if (status !== "published") return false;
  try {
    const date = new Date(publishedAt);
    return !Number.isNaN(date.getTime()) && date.getTime() <= Date.now();
  } catch {
    return false;
  }
}

export async function listGlossaryFiles(locale: string): Promise<string[]> {
  const dir = path.join(CONTENT_DIR, "glossary", locale);
  try {
    const names = await fs.readdir(dir);
    return names.filter((n) => n.endsWith(".md")).map((n) => path.join(dir, n));
  } catch {
    return [];
  }
}

function slugFromFilename(filePath: string): string {
  return path.basename(filePath, ".md");
}

export async function getGlossaryEntries(locale: string): Promise<GlossaryEntry[]> {
  const files = await listGlossaryFiles(locale);
  const entries: GlossaryEntry[] = [];
  for (const filePath of files) {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data } = matter(raw);
    const fm = data as Record<string, unknown>;
    const slug = (fm.slug as string) ?? slugFromFilename(filePath);
    if (!fm.title || !fm.type || !fm.publishedAt || !fm.status) continue;
    if (!isPublished(String(fm.status), String(fm.publishedAt))) continue;
    entries.push({
      slug,
      title: String(fm.title),
      description: fm.description != null ? String(fm.description) : undefined,
      type: fm.type as GlossaryType,
      publishedAt: String(fm.publishedAt),
      updatedAt: fm.updatedAt != null ? String(fm.updatedAt) : undefined,
      status: String(fm.status),
      category: fm.category != null ? String(fm.category) : undefined,
      author: fm.author != null ? String(fm.author) : undefined,
      relatedTerms: Array.isArray(fm.relatedTerms) ? (fm.relatedTerms as string[]) : undefined,
      website: fm.website != null ? String(fm.website) : undefined,
      logo: fm.logo != null ? String(fm.logo) : undefined,
      license: fm.license != null ? String(fm.license) : undefined,
      github: fm.github != null ? String(fm.github) : undefined,
    });
  }
  entries.sort((a, b) => a.title.localeCompare(b.title, "en"));
  return entries;
}
