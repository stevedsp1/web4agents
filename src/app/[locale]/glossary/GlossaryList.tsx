"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { GlossaryEntry } from "@/lib/content-glossary-list";

type GlossaryListProps = {
  entries: GlossaryEntry[];
};

function getSectionLetter(title: string): string {
  const first = title.trim().charAt(0).toUpperCase();
  return /[A-Z]/.test(first) ? first : "#";
}

export function GlossaryList({ entries }: GlossaryListProps) {
  const t = useTranslations("glossary");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return entries;
    const q = search.trim().toLowerCase();
    return entries.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        (e.description && e.description.toLowerCase().includes(q))
    );
  }, [entries, search]);

  const sections = useMemo(() => {
    const map = new Map<string, GlossaryEntry[]>();
    for (const entry of filtered) {
      const letter = getSectionLetter(entry.title);
      const list = map.get(letter) ?? [];
      list.push(entry);
      map.set(letter, list);
    }
    const letters = Array.from(map.keys()).sort((a, b) =>
      a === "#" ? 1 : b === "#" ? -1 : a.localeCompare(b)
    );
    return letters.map((letter) => ({ letter, entries: map.get(letter)! }));
  }, [filtered]);

  return (
    <div className="space-y-10">
      <label htmlFor="glossary-search" className="sr-only">
        {t("searchPlaceholder")}
      </label>
      <input
        id="glossary-search"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className="w-full max-w-sm rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
      />
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t("noResults")}
        </p>
      ) : (
        sections.map(({ letter, entries: sectionEntries }) => (
          <section key={letter} aria-labelledby={`glossary-${letter}`}>
            <h2
              id={`glossary-${letter}`}
              className="mb-3 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
            >
              {letter}
            </h2>
            <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
              {sectionEntries.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    href={{ pathname: "/glossary/[slug]", params: { slug: entry.slug } }}
                    className="block rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                  >
                    {entry.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
