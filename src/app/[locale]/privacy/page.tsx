import { getTranslations } from "next-intl/server";
import { routing, getExternalPath } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  const tSeo = await getTranslations({ locale, namespace: "seo" });
  const path = `/${locale}${getExternalPath("/privacy", locale)}`;
  return buildMetadata({
    title: t("privacy"),
    description: tSeo("defaultDescription"),
    path,
    locales: routing.locales,
    getPathForLocale: (loc) => `/${loc}${getExternalPath("/privacy", loc)}`,
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations("footer");
  const tPrivacy = await getTranslations("privacyPage");

  const sections = [
    { title: tPrivacy("dataCollected"), content: tPrivacy("dataCollectedContent") },
    { title: tPrivacy("purpose"), content: tPrivacy("purposeContent") },
    { title: tPrivacy("retention"), content: tPrivacy("retentionContent") },
    { title: tPrivacy("rights"), content: tPrivacy("rightsContent") },
    { title: tPrivacy("cookies"), content: tPrivacy("cookiesContent") },
    { title: tPrivacy("dpo"), content: tPrivacy("dpoContent") },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {t("privacy")}
        </h1>
        <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
          {tPrivacy("intro")}
        </p>

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
      </div>
    </div>
  );
}
