import { getTranslations } from "next-intl/server";
import { getGlossaryEntries } from "@/lib/content-glossary-list";
import { GlossaryList } from "./GlossaryList";
import { routing, getExternalPath } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "glossary" });
  const tSeo = await getTranslations({ locale, namespace: "seo" });
  const path = `/${locale}${getExternalPath("/glossary", locale)}`;
  return buildMetadata({
    title: t("title"),
    description: tSeo("defaultDescription"),
    path,
    locales: routing.locales,
    getPathForLocale: (loc) => `/${loc}${getExternalPath("/glossary", loc)}`,
  });
}

export default async function GlossaryPage({ params }: Props) {
  const { locale } = await params;
  const entries = await getGlossaryEntries(locale);
  const t = await getTranslations("glossary");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
          {t("termsCount", { count: entries.length })}
        </p>
      </div>
      <div className="mt-10">
        <GlossaryList entries={entries} />
      </div>
    </div>
  );
}
