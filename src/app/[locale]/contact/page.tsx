import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/forms/ContactForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  const tSeo = await getTranslations({ locale, namespace: "seo" });
  return buildMetadata({
    title: t("contact"),
    description: tSeo("defaultDescription"),
    path: `/${locale}/contact`,
    locales: routing.locales,
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations("footer");
  const tContact = await getTranslations("contactPage");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {t("contact")}
        </h1>
        <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
          {tContact("intro")}
        </p>
        <div className="mt-10">
          <ContactForm />
        </div>
        <p className="mt-8 text-sm text-gray-400 dark:text-gray-500">
          {tContact("reachUs")}{" "}
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
