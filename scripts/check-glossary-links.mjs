#!/usr/bin/env node
/**
 * Verifies that every relatedTerm in content/glossary/en/*.md points to an existing slug.
 * Run from project root: node scripts/check-glossary-links.mjs
 */
import fs from "fs";
import path from "path";

const GLOSSARY_DIR = path.join(process.cwd(), "content", "glossary", "en");

function extractFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const yaml = match[1];
  const slugMatch = yaml.match(/slug:\s*["']?([^"'\n]+)["']?/);
  const relatedMatch = yaml.match(/relatedTerms:\s*\[([^\]]*)\]/);
  const slug = slugMatch ? slugMatch[1].trim() : null;
  let relatedTerms = [];
  if (relatedMatch) {
    relatedTerms = relatedMatch[1]
      .split(",")
      .map((s) => s.replace(/["'\s]/g, "").trim())
      .filter(Boolean);
  }
  return { slug, relatedTerms };
}

function main() {
  if (!fs.existsSync(GLOSSARY_DIR)) {
    console.error("Glossary dir not found:", GLOSSARY_DIR);
    process.exit(1);
  }
  const files = fs.readdirSync(GLOSSARY_DIR).filter((n) => n.endsWith(".md"));
  const slugs = new Set();
  const entries = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(GLOSSARY_DIR, file), "utf-8");
    const { slug, relatedTerms } = extractFrontmatter(raw);
    const resolvedSlug = slug ?? path.basename(file, ".md");
    slugs.add(resolvedSlug);
    entries.push({ file, slug: resolvedSlug, relatedTerms });
  }
  let hasBroken = false;
  for (const { file, slug, relatedTerms } of entries) {
    for (const term of relatedTerms) {
      if (!slugs.has(term)) {
        console.error(`Broken link: ${file} (slug: ${slug}) references missing term "${term}"`);
        hasBroken = true;
      }
    }
  }
  if (!hasBroken) {
    console.log("OK: All glossary relatedTerms point to existing slugs.");
  }
  process.exit(hasBroken ? 1 : 0);
}

main();
