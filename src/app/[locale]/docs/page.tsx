import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, getExternalPath } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { getDocEntries } from "@/lib/content-docs";
import { docsCategories, getCategoryLabelKey } from "@/lib/docs-nav";
import { docCategoryIcons } from "@/components/icons/DocCategoryIcons";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "docs" });
  const tSeo = await getTranslations({ locale, namespace: "seo" });
  const path = `/${locale}${getExternalPath("/docs", locale)}`;
  return buildMetadata({
    title: t("title"),
    description: tSeo("defaultDescription"),
    path,
    locales: routing.locales,
    getPathForLocale: (loc) => `/${loc}${getExternalPath("/docs", loc)}`,
  });
}

export default async function DocsHomePage({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations("docs");
  const entries = await getDocEntries(locale);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
        {t("intro")}
      </p>
      <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
        {t("homeDescription")}
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {docsCategories.map((cat) => {
          const catEntries = entries.filter((e) => e.category === cat.slug);
          const categoryLabel = t(`categories.${getCategoryLabelKey(cat.slug)}`);

          return (
            <div
              key={cat.slug}
              className="rounded-xl border border-gray-200 p-5 transition-colors dark:border-gray-800"
            >
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {docCategoryIcons[cat.icon] ?? null}
                <span>{categoryLabel}</span>
              </h2>
              {catEntries.length > 0 ? (
                <ul className="mt-3 space-y-1.5">
                  {catEntries
                    .sort((a, b) => a.order - b.order)
                    .map((entry) => (
                      <li key={entry.slug}>
                        <Link
                          href={{ pathname: "/docs/[slug]", params: { slug: entry.slug } }}
                          className="block rounded-md px-2 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                        >
                          {entry.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                  {t("comingSoon")}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
