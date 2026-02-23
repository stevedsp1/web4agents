import { getTranslations } from "next-intl/server";

export interface ArticleMetaProps {
  publishedAt: string;
  updatedAt?: string;
  readingTime?: number;
  author?: string;
  className?: string;
}

export async function ArticleMeta({
  publishedAt,
  updatedAt,
  readingTime,
  author,
  className = "",
}: ArticleMetaProps) {
  const t = await getTranslations("blog");
  const parts: string[] = [];

  try {
    const pubDate = new Date(publishedAt);
    if (!Number.isNaN(pubDate.getTime())) {
      parts.push(`${t("published")} ${pubDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`);
    }
  } catch {
    parts.push(`${t("published")} ${publishedAt}`);
  }

  if (updatedAt) {
    try {
      const upDate = new Date(updatedAt);
      if (!Number.isNaN(upDate.getTime())) {
        parts.push(`${t("updated")} ${upDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`);
      }
    } catch {
      parts.push(`${t("updated")} ${updatedAt}`);
    }
  }

  if (readingTime != null && readingTime > 0) {
    parts.push(t("readingTime", { count: readingTime }));
  }

  if (author) {
    parts.push(t("author", { author }));
  }

  if (parts.length === 0) return null;

  return (
    <p className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}>
      {parts.join(" · ")}
    </p>
  );
}
