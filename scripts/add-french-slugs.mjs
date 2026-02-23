#!/usr/bin/env node
/**
 * Add or set `slug` in frontmatter for all content/glossary/fr/*.md and content/docs/fr/*.md
 * from the title (slugified for URL).
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function slugify(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, "-")
    .replace(/[''`]/g, "")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function processDir(contentDir) {
  const dir = path.join(ROOT, contentDir);
  const names = await fs.readdir(dir).catch(() => []);
  for (const name of names) {
    if (!name.endsWith(".md")) continue;
    const filePath = path.join(dir, name);
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    const title = data.title;
    if (!title) continue;
    const slug = slugify(title);
    if (!slug) continue;
    data.slug = slug;
    const out = matter.stringify(content, data, { lineWidth: 1000 });
    await fs.writeFile(filePath, out, "utf-8");
    console.log(`${contentDir}/${name} -> slug: ${slug}`);
  }
}

async function main() {
  await processDir("content/glossary/fr");
  await processDir("content/docs/fr");
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
