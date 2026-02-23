import type { Root, RootContent, Text, Link } from "mdast";
import type { Plugin } from "unified";
import { getExternalPath } from "@/i18n/routing";

export interface GlossaryTerm {
  slug: string;
  title: string;
}

export interface RemarkGlossaryOptions {
  terms: GlossaryTerm[];
  locale: string;
}

/**
 * Remark plugin: replace the first occurrence of each glossary term in the document
 * with a link to /{locale}{glossaryPath}/{slug}. The link gets class "glossary-link" (via rehype later or attribute).
 * We add data-glossary-link so that rehype can add the class when converting to HTML.
 */
export const remarkGlossary: Plugin<[RemarkGlossaryOptions], Root> = (options) => {
  const { terms, locale } = options;
  const linked = new Set<string>();

  function visit(
    node: Root | RootContent | { type: string; children?: unknown[]; value?: string },
    parent: { children: unknown[] } | null,
    index: number
  ): void {
    if (node.type === "text" && typeof node.value === "string" && parent) {
      for (const term of terms) {
        if (linked.has(term.slug)) continue;
        const idx = node.value.indexOf(term.title);
        if (idx === -1) continue;
        const before = node.value.slice(0, idx);
        const after = node.value.slice(idx + term.title.length);
        const newNodes: unknown[] = [];
        if (before) newNodes.push({ type: "text", value: before } as Text);
        const glossaryPath = getExternalPath("/glossary", locale);
        const linkNode: Link = {
          type: "link",
          url: `/${locale}${glossaryPath}/${term.slug}`,
          title: null,
          children: [{ type: "text", value: term.title }],
          data: { hProperties: { className: "glossary-link" } } as Link["data"],
        };
        newNodes.push(linkNode);
        if (after) newNodes.push({ type: "text", value: after } as Text);
        linked.add(term.slug);
        parent.children.splice(index, 1, ...newNodes);
        return;
      }
      return;
    }
    const children = (node as { children?: unknown[] }).children;
    if (Array.isArray(children)) {
      let i = 0;
      while (i < children.length) {
        const child = children[i];
        if (child && typeof child === "object" && "type" in child) {
          visit(child as RootContent, node as { children: unknown[] }, i);
          // Splice may have changed length; re-read
          i++;
        } else {
          i++;
        }
      }
    }
  }

  return (tree: Root) => {
    if (tree.children) {
      let i = 0;
      while (i < tree.children.length) {
        const child = tree.children[i];
        if (child && typeof child === "object" && "type" in child) {
          visit(child as RootContent, tree, i);
        }
        i++;
      }
    }
  };
};
