import type { TocHeading } from "@/lib/content";

export interface TableOfContentsProps {
  headings: TocHeading[];
  title?: string;
  className?: string;
}

export function TableOfContents({ headings, title = "On this page", className = "" }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className={className}>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
        {title}
      </h2>
      <ul className="space-y-2 border-l border-gray-200 dark:border-gray-800 text-[13px]">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block border-l-2 border-transparent transition-colors hover:border-accent hover:text-gray-900 dark:hover:text-gray-100 text-gray-500 dark:text-gray-400 -ml-px ${h.depth >= 3 ? "pl-6" : "pl-4"}`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
