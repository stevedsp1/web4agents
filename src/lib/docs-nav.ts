export interface DocCategory {
  slug: string;
  label: string;
  /** Icon name for sidebar (matches DocCategoryIcon). */
  icon: string;
}

/** Convert category slug to message key (e.g. "getting-started" -> "gettingStarted"). */
export function getCategoryLabelKey(slug: string): string {
  return slug
    .split("-")
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}

export const docsCategories: DocCategory[] = [
  { slug: "getting-started", label: "Getting Started", icon: "rocket" },
  { slug: "crawlers", label: "Indexing", icon: "search" },
  { slug: "technical-seo", label: "Technical SEO", icon: "cog" },
  { slug: "structured-data", label: "Structured Data", icon: "code" },
  { slug: "agent-config", label: "Agent Configuration", icon: "sliders" },
  { slug: "content-markup", label: "Content", icon: "document" },
  { slug: "protocols", label: "Agent Protocols", icon: "globe" },
  { slug: "domain", label: "Hosting", icon: "server" },
  { slug: "analytics", label: "Analytics", icon: "chart" },
  { slug: "security", label: "Security", icon: "shield" },
];
