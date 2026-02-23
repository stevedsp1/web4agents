"use client";

import { useState, useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { docsCategories, getCategoryLabelKey } from "@/lib/docs-nav";
import type { DocEntry } from "@/lib/content-docs";
import { docCategoryIcons } from "@/components/icons/DocCategoryIcons";

interface DocsSidebarProps {
  entries: DocEntry[];
}

function SidebarLink({
  slug,
  title,
  active,
}: {
  slug: string;
  title: string;
  active: boolean;
}) {
  return (
    <Link
      href={{ pathname: "/docs/[slug]", params: { slug } }}
      title={title}
      className={`group flex min-w-0 items-center gap-2 rounded-md py-1.5 text-[13px] transition-colors border-l-2 pl-3 ${
        active
          ? "border-accent bg-accent/10 font-medium text-accent"
          : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-100/80 hover:text-gray-900 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-800/60 dark:hover:text-gray-100"
      }`}
    >
      <span className="min-w-0 truncate">{title}</span>
    </Link>
  );
}

function CategorySection({
  cat,
  entries,
  currentSlug,
  isFirst,
  isOpen,
  onToggle,
}: {
  cat: { slug: string; label: string; icon: string };
  entries: DocEntry[];
  currentSlug: string | null;
  isFirst: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const pages = entries
    .filter((e) => e.category === cat.slug)
    .sort((a, b) => a.order - b.order);

  if (pages.length === 0) return null;

  const id = `docs-cat-${cat.slug}`;

  return (
    <div className={isFirst ? "" : "pt-4 mt-4 border-t border-gray-100 dark:border-gray-800"}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={id}
        className="mb-1.5 flex w-full items-center gap-1.5 px-2 text-left text-[11px] font-semibold uppercase tracking-widest text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-950 rounded"
      >
        <span
          className="shrink-0 transition-transform"
          aria-hidden
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </span>
        {docCategoryIcons[cat.icon] ?? null}
        <span className="truncate">{cat.label}</span>
      </button>
      <div
        id={id}
        role="region"
        aria-label={cat.label}
        className={isOpen ? "space-y-0.5" : "hidden"}
      >
        {pages.map((page) => (
          <SidebarLink
            key={page.slug}
            slug={page.slug}
            title={page.title}
            active={page.slug === currentSlug}
          />
        ))}
      </div>
    </div>
  );
}

function SearchResults({
  results,
  currentSlug,
  t,
}: {
  results: DocEntry[];
  currentSlug: string | null;
  t: (key: string) => string;
}) {
  if (results.length === 0) {
    return (
      <p className="px-2 py-3 text-xs text-gray-400 dark:text-gray-500">
        {t("noResults")}
      </p>
    );
  }

  return (
    <div className="space-y-0.5">
      {results.map((page) => (
        <SidebarLink
          key={page.slug}
          slug={page.slug}
          title={page.title}
          active={page.slug === currentSlug}
        />
      ))}
    </div>
  );
}

export function DocsSidebar({ entries }: DocsSidebarProps) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const docsSegment = segments[2];
  const currentSlug =
    segments.length >= 4 && (docsSegment === "docs" || docsSegment === "documentation")
      ? segments[3]
      : null;

  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  // Keep the category of the current doc expanded when viewing a doc page
  useEffect(() => {
    if (!currentSlug) return;
    const entry = entries.find((e) => e.slug === currentSlug);
    if (entry) {
      setOpenCategories((prev) => new Set(prev).add(entry.category));
    }
  }, [currentSlug, entries]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const toggleCategory = (slug: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return null;
    return entries.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        (e.description && e.description.toLowerCase().includes(q))
    );
  }, [entries, search]);

  const t = useTranslations("docs");
  const categoriesWithLabels = useMemo(
    () =>
      docsCategories.map((cat) => ({
        slug: cat.slug,
        label: t(`categories.${getCategoryLabelKey(cat.slug)}`),
        icon: cat.icon,
      })),
    [t]
  );

  const sidebar = (
    <nav aria-label="Documentation">
      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-md border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-3 text-[13px] text-gray-900 placeholder-gray-400 transition-colors focus:border-accent focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-accent dark:focus:bg-gray-900"
          />
        </div>
      </div>

      {searchResults !== null ? (
        /* Search mode: flat results list */
        <SearchResults results={searchResults} currentSlug={currentSlug} t={t} />
      ) : (
        /* Normal mode: Home + categories */
        <>
          <Link
            href="/docs"
            className={`flex items-center rounded-md border-l-2 py-1.5 pl-3 text-[13px] font-medium transition-colors ${
              !currentSlug
                ? "border-accent bg-accent/10 text-accent"
                : "border-transparent text-gray-700 hover:border-gray-300 hover:bg-gray-100/80 hover:text-gray-900 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-800/60 dark:hover:text-gray-100"
            }`}
          >
            {t("overview")}
          </Link>
          <div className="mt-3">
            {categoriesWithLabels.map((cat, i) => (
              <CategorySection
                key={cat.slug}
                cat={cat}
                entries={entries}
                currentSlug={currentSlug}
                isFirst={i === 0}
                isOpen={openCategories.has(cat.slug)}
                onToggle={() => toggleCategory(cat.slug)}
              />
            ))}
          </div>
        </>
      )}
    </nav>
  );

  return (
    <>
      {/* Mobile: icon-only toggle (compact) */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? t("menuClose") : t("menuOpen")}
          className="mb-4 flex w-fit shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2.5 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden"
            aria-hidden
            onClick={() => setMobileOpen(false)}
          />
        )}
        {/* Drawer panel */}
        <div
          className={`fixed left-0 top-0 z-50 h-full w-[min(85vw,20rem)] max-w-full overflow-y-auto border-r border-gray-200 bg-white p-4 shadow-xl transition-transform duration-200 ease-out dark:border-gray-800 dark:bg-gray-950 lg:hidden ${
            mobileOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
          }`}
          style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}
          aria-modal="true"
          aria-label={t("overview")}
          role="dialog"
        >
          <div className="mb-4 flex items-center justify-end">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              aria-label={t("menuClose")}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {sidebar}
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block lg:w-60 lg:shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
          {sidebar}
        </div>
      </aside>
    </>
  );
}
