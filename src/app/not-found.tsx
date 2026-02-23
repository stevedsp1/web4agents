"use client";

import Link from "next/link";

/**
 * Root not-found: used when the URL does not match [locale] (e.g. /unknown).
 * Must be a Client Component; no NextIntlClientProvider here, so we use static EN text.
 */
export default function NotFound() {
  const locale = "en";
  const prefix = `/${locale}`;

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center">
        <p className="text-7xl font-bold text-gray-200 dark:text-gray-800">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Page not found
        </h1>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <nav className="mt-8 flex flex-wrap justify-center gap-3" aria-label="Navigation">
          <Link
            href={prefix}
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Home
          </Link>
          <Link
            href={`${prefix}/glossary`}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Glossary
          </Link>
          <Link
            href={`${prefix}/blog`}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Blog
          </Link>
        </nav>
      </div>
    </div>
  );
}
