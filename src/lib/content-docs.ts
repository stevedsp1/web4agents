import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { unified, type Processor } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import type { Root } from "mdast";
import type { Root as HtmlRoot } from "hast";
import type { Plugin } from "unified";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface DocEntry {
  slug: string;
  title: string;
  description?: string;
  category: string;
  subcategory?: string;
  order: number;
  publishedAt: string;
  updatedAt?: string;
  status: string;
}

export interface DocPage extends DocEntry {
  bodyHtml: string;
  headings: TocHeading[];
}

export interface TocHeading {
  id: string;
  text: string;
  depth: number;
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

async function listDocFiles(locale: string): Promise<string[]> {
  const dir = path.join(CONTENT_DIR, "docs", locale);
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

export async function getDocEntries(locale: string): Promise<DocEntry[]> {
  const files = await listDocFiles(locale);
  const entries: DocEntry[] = [];
  for (const filePath of files) {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data } = matter(raw);
    const fm = data as Record<string, unknown>;
    const slug = (fm.slug as string) ?? slugFromFilename(filePath);
    if (!fm.title || !fm.category || !fm.publishedAt || !fm.status) continue;
    if (!isPublished(String(fm.status), String(fm.publishedAt))) continue;
    entries.push({
      slug,
      title: String(fm.title),
      description: fm.description != null ? String(fm.description) : undefined,
      category: String(fm.category),
      subcategory: fm.subcategory != null ? String(fm.subcategory) : undefined,
      order: typeof fm.order === "number" ? fm.order : 999,
      publishedAt: String(fm.publishedAt),
      updatedAt: fm.updatedAt != null ? String(fm.updatedAt) : undefined,
      status: String(fm.status),
    });
  }
  entries.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, "en"));
  return entries;
}

function rehypeCollectHeadings(headings: TocHeading[]): Plugin<[], HtmlRoot> {
  return function collector() {
    return (tree: HtmlRoot) => {
      tree.children.forEach((node) => {
        if (node.type === "element" && /^h[23]$/.test(node.tagName)) {
          const id = node.properties?.id;
          const text = textContent(node);
          if (typeof id === "string" && text) {
            headings.push({
              id,
              text,
              depth: parseInt(node.tagName.charAt(1), 10),
            });
          }
        }
      });
    };
  };
}

function textContent(node: { children?: unknown[] }): string {
  if (!node.children) return "";
  return node.children
    .map((c: unknown) => {
      const n = c as { type?: string; value?: string; children?: unknown[] };
      if (n.type === "text" && n.value) return n.value;
      if (n.type === "element" && n.children) return textContent(n);
      return "";
    })
    .join("");
}

export async function getDocPage(
  locale: string,
  slug: string
): Promise<DocPage | null> {
  const files = await listDocFiles(locale);
  for (const filePath of files) {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    const fm = data as Record<string, unknown>;
    const fileSlug = (fm.slug as string) ?? slugFromFilename(filePath);
    if (fileSlug !== slug) continue;
    if (!fm.title || !fm.category || !fm.publishedAt || !fm.status) return null;
    if (!isPublished(String(fm.status), String(fm.publishedAt))) return null;

    const headings: TocHeading[] = [];
    const proc = unified()
      .use(remarkParse)
      .use(remarkGfm) as Processor<Root, Root, Root>;
    const result = await (proc as unknown as Processor)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeSlug)
      .use(rehypeCollectHeadings(headings))
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content.trim());

    return {
      slug: fileSlug,
      title: String(fm.title),
      description: fm.description != null ? String(fm.description) : undefined,
      category: String(fm.category),
      subcategory: fm.subcategory != null ? String(fm.subcategory) : undefined,
      order: typeof fm.order === "number" ? fm.order : 999,
      publishedAt: String(fm.publishedAt),
      updatedAt: fm.updatedAt != null ? String(fm.updatedAt) : undefined,
      status: String(fm.status),
      bodyHtml: String(result),
      headings,
    };
  }
  return null;
}
