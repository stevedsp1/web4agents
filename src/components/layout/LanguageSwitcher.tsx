"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { pathnameToInternalHref } from "@/i18n/routing";

const LOCALES = ["en", "fr"] as const;

const GLOSSARY_OR_DOCS = ["glossary", "glossaire", "docs", "documentation"];

function pathnameHasLocalizedSlug(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  return segments.length >= 3 && GLOSSARY_OR_DOCS.includes(segments[1] ?? "");
}

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [open]);

  const selectLocale = async (loc: string) => {
    if (loc === locale) {
      setOpen(false);
      return;
    }
    // window.location.pathname already contains the locale prefix (e.g. /fr/glossaire/base-vectorielle)
    // next-intl's usePathname() can return a template string like /glossary/[slug], so we prefer the real URL.
    const actualPath = typeof window !== "undefined" ? window.location.pathname : pathname;

    if (pathnameHasLocalizedSlug(actualPath)) {
      try {
        const res = await fetch(
          `/api/alternate-path?pathname=${encodeURIComponent(actualPath)}&locale=${encodeURIComponent(loc)}`
        );
        const data = (await res.json()) as { path?: string };
        if (res.ok && data.path) {
          // data.path is a full localized path like /en/docs/ai-crawlers-overview.
          // Convert to next-intl internal format (without locale) then switch locale explicitly.
          const href = pathnameToInternalHref(data.path);
          router.replace(href as Parameters<typeof router.replace>[0], { locale: loc });
          setOpen(false);
          return;
        }
      } catch {
        // fallback below
      }
    }
    const href = pathnameToInternalHref(actualPath);
    router.replace(href as Parameters<typeof router.replace>[0], { locale: loc });
    setOpen(false);
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-950"
      >
        <span>{locale.toUpperCase()}</span>
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1 min-w-[4.5rem] rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/50"
        >
          {LOCALES.map((loc) => (
            <li key={loc} role="option" aria-selected={locale === loc}>
              <button
                type="button"
                onClick={() => selectLocale(loc)}
                className={`block w-full px-3 py-1.5 text-left text-sm font-medium transition-colors ${
                  locale === loc
                    ? "bg-accent/10 text-accent dark:bg-accent/20"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {loc.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
