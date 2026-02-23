import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { listGlossaryFiles } from "./content-glossary-list";
import { unified, type Processor } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import type { Root } from "mdast";
import type { Root as HtmlRoot } from "hast";
import type { Plugin } from "unified";
import { remarkGlossary, type RemarkGlossaryOptions } from "./remark-glossary";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type GlossaryType = "concept" | "tool" | "actor" | "standard";

export interface GlossaryFrontmatter {
  title: string;
  slug?: string;
  type: GlossaryType;
  description?: string;
  category?: string;
  publishedAt: string;
  updatedAt?: string;
  status: string;
  author?: string;
  relatedTerms?: string[];
  website?: string;
  logo?: string;
  license?: string;
  github?: string;
}

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
  bodyHtml?: string;
}

export interface BlogFrontmatter {
  title: string;
  slug: string;
  description?: string;
  category?: string;
  tags?: string[];
  publishedAt: string;
  updatedAt?: string;
  status: string;
  author?: string;
  image?: string;
  readingTime?: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  publishedAt: string;
  updatedAt?: string;
  status: string;
  author?: string;
  image?: string;
  readingTime?: number;
  bodyHtml?: string;
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

function createProcessor(remarkPlugins: Plugin<[unknown], Root>[] = []) {
  // Dynamic plugin list widens processor type; use loose type for assignment
  let proc = unified().use(remarkParse).use(remarkGfm) as Processor<Root, Root, Root>;
  for (const plugin of remarkPlugins) {
    proc = proc.use(plugin as Plugin) as Processor<Root, Root, Root>;
  }
  return proc
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true });
}

/** Compile markdown to HTML with rehype-slug (ids on headings). */
export async function compileMarkdown(
  md: string,
  remarkPlugins: Plugin<[unknown], Root>[] = []
): Promise<string> {
  const result = await createProcessor(remarkPlugins).process(md);
  return String(result);
}

/** Rehype plugin that collects headings (id, text, depth) into a mutable array. */
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

/** Compile markdown and return HTML plus TOC headings. */
export async function compileMarkdownWithHeadings(
  md: string,
  remarkPlugins: Plugin<[unknown], Root>[] = []
): Promise<{ html: string; headings: TocHeading[] }> {
  const headings: TocHeading[] = [];
  let proc = unified().use(remarkParse).use(remarkGfm) as Processor<Root, Root, Root>;
  for (const plugin of remarkPlugins) {
    proc = proc.use(plugin as Plugin) as Processor<Root, Root, Root>;
  }
  const result = await proc
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeCollectHeadings(headings))
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(md);
  return { html: String(result), headings };
}

async function listBlogFiles(locale: string): Promise<string[]> {
  const dir = path.join(CONTENT_DIR, "blog", locale);
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

export { getGlossaryEntries } from "./content-glossary-list";

/** Build the glossary auto-link remark plugin for a locale and list of entries. */
export function createGlossaryPlugin(
  locale: string,
  entries: Pick<GlossaryEntry, "slug" | "title">[]
): Plugin<[unknown], Root> {
  const options: RemarkGlossaryOptions = {
    terms: entries.map((e) => ({ slug: e.slug, title: e.title })),
    locale,
  };
  return function plugin(this: unknown) {
    return (remarkGlossary as (opts: RemarkGlossaryOptions) => (tree: Root) => void)(options);
  } as Plugin<[unknown], Root>;
}

export async function getGlossaryEntry(
  locale: string,
  term: string,
  remarkPlugins: Plugin<[unknown], Root>[] = []
): Promise<GlossaryEntry | null> {
  const files = await listGlossaryFiles(locale);
  const termSlug = term.toLowerCase().replace(/\s+/g, "-");
  for (const filePath of files) {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    const fm = data as Partial<GlossaryFrontmatter>;
    const slug = fm.slug ?? slugFromFilename(filePath);
    if (slug !== termSlug) continue;
    if (!fm.title || !fm.type || !fm.publishedAt || !fm.status) return null;
    if (!isPublished(fm.status, fm.publishedAt)) return null;
    const bodyHtml = await compileMarkdown(content.trim(), remarkPlugins);
    return {
      slug,
      title: fm.title,
      description: fm.description,
      type: fm.type as GlossaryType,
      publishedAt: fm.publishedAt,
      updatedAt: fm.updatedAt,
      status: fm.status,
      category: fm.category,
      author: fm.author,
      relatedTerms: fm.relatedTerms,
      website: fm.website,
      logo: fm.logo,
      license: fm.license,
      github: fm.github,
      bodyHtml,
    };
  }
  return null;
}

export async function getBlogPosts(locale: string): Promise<BlogPost[]> {
  const files = await listBlogFiles(locale);
  const posts: BlogPost[] = [];
  for (const filePath of files) {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data } = matter(raw);
    const fm = data as Partial<BlogFrontmatter>;
    const slug = fm.slug ?? slugFromFilename(filePath);
    if (!fm.title || !fm.publishedAt || !fm.status) continue;
    if (!isPublished(fm.status, fm.publishedAt)) continue;
    posts.push({
      slug,
      title: fm.title,
      description: fm.description,
      category: fm.category,
      tags: fm.tags,
      publishedAt: fm.publishedAt,
      updatedAt: fm.updatedAt,
      status: fm.status,
      author: fm.author,
      image: fm.image,
      readingTime: fm.readingTime,
    });
  }
  posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return posts;
}

export async function getBlogPost(
  locale: string,
  slug: string,
  remarkPlugins: Plugin<[unknown], Root>[] = []
): Promise<{ post: BlogPost; headings: TocHeading[] } | null> {
  const files = await listBlogFiles(locale);
  for (const filePath of files) {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    const fm = data as Partial<BlogFrontmatter>;
    const postSlug = fm.slug ?? slugFromFilename(filePath);
    if (postSlug !== slug) continue;
    if (!fm.title || !fm.publishedAt || !fm.status) return null;
    if (!isPublished(fm.status, fm.publishedAt)) return null;
    const { html, headings } = await compileMarkdownWithHeadings(content.trim(), remarkPlugins);
    return {
      post: {
        slug: postSlug,
        title: fm.title,
        description: fm.description,
        category: fm.category,
        tags: fm.tags,
        publishedAt: fm.publishedAt,
        updatedAt: fm.updatedAt,
        status: fm.status,
        author: fm.author,
        image: fm.image,
        readingTime: fm.readingTime,
        bodyHtml: html,
      },
      headings,
    };
  }
  return null;
}
