import { getTranslations } from "next-intl/server";
import { routing, getExternalPath } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/forms/ContactForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contributePage" });
  const tSeo = await getTranslations({ locale, namespace: "seo" });
  const path = `/${locale}${getExternalPath("/contribute", locale)}`;
  return buildMetadata({
    title: t("title"),
    description: tSeo("defaultDescription"),
    path,
    locales: routing.locales,
    getPathForLocale: (loc) => `/${loc}${getExternalPath("/contribute", loc)}`,
  });
}

export default async function ContributePage({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations("contributePage");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {t("title")}
        </h1>
        <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
          {t("intro")}
        </p>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
          {t("sponsor")}
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {t("introForm")}
        </p>
        <div className="mt-10">
          <ContactForm />
        </div>
        <p className="mt-8 text-sm text-gray-400 dark:text-gray-500">
          {t("reachUs")}{" "}
          <a
            href={`mailto:${process.env.CONTACT_EMAIL ?? "contact@web4agents.org"}`}
            className="text-accent hover:underline underline-offset-4"
          >
            {process.env.CONTACT_EMAIL ?? "contact@web4agents.org"}
          </a>
        </p>
      </div>
    </div>
  );
}
