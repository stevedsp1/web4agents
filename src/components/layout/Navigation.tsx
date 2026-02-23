"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const navKeys = ["docs", "blog", "audit", "contribute"] as const;
const pathMap = {
  docs: "/docs",
  blog: "/blog",
  audit: "/audit",
  contribute: "/contribute",
} as const satisfies Record<(typeof navKeys)[number], string>;

export function Navigation() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) =>
    pathname === path || (path !== "/" && pathname.startsWith(path));

  const linkClass = (path: string) =>
    `block rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-gray-950 ${
      isActive(path)
        ? "text-accent"
        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
    }`;

  const navLinks = (
    <>
      {navKeys.map((key) => (
        <Link
          key={key}
          href={pathMap[key]}
          className={linkClass(pathMap[key])}
          aria-current={isActive(pathMap[key]) ? "page" : undefined}
        >
          {t(key)}
        </Link>
      ))}
    </>
  );

  return (
    <>
      <nav className="hidden md:flex md:items-center md:gap-1" aria-label="Main">
        {navLinks}
      </nav>

      <div className="flex md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? tCommon("closeMenu") : tCommon("openMenu")}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-full z-50 w-full min-w-0 border-b border-gray-100 bg-white py-3 shadow-lg dark:border-gray-800 dark:bg-gray-950 md:hidden"
        >
          <div className="flex w-full flex-col gap-0.5 px-4 sm:px-6">
            {navKeys.map((key) => (
              <Link
                key={key}
                href={pathMap[key]}
                className={`block w-full min-w-0 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors break-words focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset dark:focus:ring-offset-0 ${
                  isActive(pathMap[key]) ? "text-accent" : "text-gray-700 dark:text-gray-300"
                }`}
                style={{ WebkitTapHighlightColor: "transparent" }}
                aria-current={isActive(pathMap[key]) ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {t(key)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
