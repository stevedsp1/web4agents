import * as React from "react";
import { Link } from "@/i18n/navigation";

export interface BreadcrumbItem {
  label: string;
  /** Internal path or pathname+params; passed to next-intl Link (asserted to valid href). */
  href?: string | React.ComponentProps<typeof Link>["href"];
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href && typeof item.href === "string" && { item: item.href }),
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className={`text-xs ${className}`}>
        <ol className="flex flex-wrap items-center gap-1 text-gray-400 dark:text-gray-500">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && (
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              {item.href ? (
                <Link
                  href={item.href as React.ComponentProps<typeof Link>["href"]}
                  className="transition-colors hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-600 dark:text-gray-300" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
