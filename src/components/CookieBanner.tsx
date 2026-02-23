"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const CONSENT_KEY = "cookie-consent";

export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "declined") {
      setVisible(false);
      if (stored === "accepted" && typeof (window as Window & { gtag?: (...a: unknown[]) => void }).gtag === "function") {
        (window as Window & { gtag?: (...a: unknown[]) => void }).gtag?.("consent", "update", { analytics_storage: "granted" });
      }
      return;
    }
    setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    if (typeof (window as Window & { gtag?: (...a: unknown[]) => void }).gtag === "function") {
      (window as Window & { gtag?: (...a: unknown[]) => void }).gtag?.("consent", "update", { analytics_storage: "granted" });
    }
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("label")}
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/95 sm:left-6 sm:right-auto"
    >
      <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
        {t("message")}{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-2 hover:text-accent dark:hover:text-accent"
          aria-label={t("privacy")}
        >
          {t("privacy")}
        </Link>
      </p>
      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={accept}
          className="rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
        >
          {t("accept")}
        </button>
        <button
          type="button"
          onClick={decline}
          className="rounded-md border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          {t("decline")}
        </button>
      </div>
    </div>
  );
}
