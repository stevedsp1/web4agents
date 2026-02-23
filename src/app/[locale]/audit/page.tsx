import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { AuditRequestForm } from "@/components/forms/AuditRequestForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const tAudit = await getTranslations({ locale, namespace: "auditPage" });
  return buildMetadata({
    title: t("audit"),
    description: tAudit("metaDescription"),
    path: `/${locale}/audit`,
    locales: routing.locales,
  });
}

export default async function AuditPage({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations("nav");
  const tAudit = await getTranslations("auditPage");

  const faq = [
    { question: tAudit("faq1Q"), answer: tAudit("faq1A") },
    { question: tAudit("faq2Q"), answer: tAudit("faq2A") },
    { question: tAudit("faq3Q"), answer: tAudit("faq3A") },
  ];

  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />

      {/* Hero */}
      <section className="border-b border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              {tAudit("heroBadge")}
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
              {tAudit("heroTitle")}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
              {tAudit("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Value + Coverage */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {tAudit("valueTitle")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {tAudit("valueContent")}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {tAudit("whatWeCover")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {tAudit("whatWeCoverContent")}
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="border-t border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/30">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="mx-auto max-w-xl">
            <h2 className="text-center text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {tAudit("formTitle")}
            </h2>
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
              {tAudit("ctaDocs")}{" "}
              <Link href="/docs" className="text-accent hover:underline underline-offset-4">
                Docs
              </Link>
              {" · "}
              <Link href={{ pathname: "/docs/[slug]", params: { slug: "checklist" } }} className="text-accent hover:underline underline-offset-4">
                Checklist
              </Link>
            </p>
            <div className="mt-8">
              <AuditRequestForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {tAudit("faqTitle")}
        </h2>
        <dl className="mt-8 divide-y divide-gray-100 dark:divide-gray-800">
          {faq.map((item, i) => (
            <div key={i} className="py-5">
              <dt className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {item.question}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
