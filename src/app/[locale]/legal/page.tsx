import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, getExternalPath } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  const tSeo = await getTranslations({ locale, namespace: "seo" });
  const path = `/${locale}${getExternalPath("/legal", locale)}`;
  return buildMetadata({
    title: t("legal"),
    description: tSeo("defaultDescription"),
    path,
    locales: routing.locales,
    getPathForLocale: (loc) => `/${loc}${getExternalPath("/legal", loc)}`,
  });
}

export default async function LegalPage({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations("footer");
  const tLegal = await getTranslations("legalPage");

  const sections = [
    { title: tLegal("publisher"), content: tLegal("publisherContent") },
    { title: tLegal("hosting"), content: tLegal("hostingContent") },
    { title: tLegal("intellectualProperty"), content: tLegal("intellectualPropertyContent") },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {t("legal")}
        </h1>

        <div className="mt-10 space-y-10">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {s.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {s.content}
              </p>
            </section>
          ))}
        </div>

        <p className="mt-10 border-t border-gray-100 pt-8 dark:border-gray-800">
          <Link
            href="/privacy"
            className="text-sm text-accent hover:underline underline-offset-4"
          >
            {tLegal("privacyLink")} &rarr;
          </Link>
        </p>
      </div>
    </div>
  );
}
