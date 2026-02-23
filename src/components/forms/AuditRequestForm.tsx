"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { HoneypotField } from "./HoneypotField";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500";
const buttonClass =
  "rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-950";

export function AuditRequestForm() {
  const t = useTranslations("auditForm");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypotValue = (form.elements.namedItem("url_secondary") as HTMLInputElement)?.value ?? "";
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          email: email.trim(),
          message: message.trim() || undefined,
          url_secondary: honeypotValue,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? t("error"));
        return;
      }
      setStatus("success");
      setUrl("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage(t("error"));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-4">
      <HoneypotField />
      <div>
        <label htmlFor="audit-url" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("url")}
        </label>
        <input
          id="audit-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
          disabled={status === "loading"}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="audit-email" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("email")}
        </label>
        <input
          id="audit-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="audit-message" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("message")}
        </label>
        <textarea
          id="audit-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "loading"}
          rows={3}
          className={inputClass}
        />
      </div>
      <button type="submit" disabled={status === "loading"} className={buttonClass}>
        {status === "loading" ? "…" : t("submit")}
      </button>
      {status === "success" && (
        <p className="text-sm text-green-600 dark:text-green-400" role="status">
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
