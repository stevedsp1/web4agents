import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getGlossaryEntries, getGlossaryEntry, getGlossarySlugForLocale, createGlossaryPlugin } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleMeta } from "@/components/content/ArticleMeta";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { routing, getExternalPath } from "@/i18n/routing";
import {
  buildMetadata,
  getBaseUrl,
  definedTermJsonLd,
  softwareApplicationJsonLd,
  organizationJsonLd,
} from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; term: string }>;
};

export async function generateStaticParams() {
  const { routing } = await import("@/i18n/routing");
  const locales = [...routing.locales];
  const params: { term: string; locale: string }[] = [];
  for (const locale of locales) {
    const entries = await getGlossaryEntries(locale);
    for (const e of entries) {
      params.push({ locale, term: e.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { locale, term } = await params;
  const entry = await getGlossaryEntry(locale, term);
  if (!entry) {
    const t = await getTranslations({ locale, namespace: "common" });
    return { title: t("notFoundTitle") };
  }
  const path = `/${locale}${getExternalPath("/glossary", locale)}/${term}`;
  const pathByLocale: Record<string, string> = {};
  for (const loc of routing.locales) {
    const slugForLoc = await getGlossarySlugForLocale(entry.id, loc);
    pathByLocale[loc] = `/${loc}${getExternalPath("/glossary", loc)}/${slugForLoc ?? entry.slug}`;
  }
  return buildMetadata({
    title: entry.title,
    description: entry.description ?? undefined,
    path,
    locales: routing.locales,
    getPathForLocale: (loc) => pathByLocale[loc] ?? path,
  });
}

export default async function GlossaryTermPage({ params }: Props) {
  const { locale, term } = await params;
  const entries = await getGlossaryEntries(locale);
  const glossaryPlugin = createGlossaryPlugin(
    locale,
    entries.map((e) => ({ slug: e.slug, title: e.title }))
  );
  const entry = await getGlossaryEntry(locale, term, [glossaryPlugin]);
  if (!entry) notFound();

  const t = await getTranslations("glossary");
  const navT = await getTranslations("nav");
  const breadcrumbs = [
    { label: navT("home"), href: "/" },
    { label: t("title"), href: "/glossary" },
    { label: entry.title },
  ];

  const baseUrl = getBaseUrl();
  const glossaryPath = getExternalPath("/glossary", locale);
  const canonicalUrl = `${baseUrl}/${locale}${glossaryPath}/${entry.slug}`;

  const jsonLd =
    entry.type === "concept" || entry.type === "standard"
      ? definedTermJsonLd({ url: canonicalUrl, name: entry.title, description: entry.description })
      : entry.type === "tool"
        ? softwareApplicationJsonLd({ url: canonicalUrl, name: entry.title, description: entry.description })
        : organizationJsonLd(canonicalUrl, entry.title, entry.description);

  const related = entry.relatedTerms
    ? entries.filter((e) => entry.relatedTerms?.includes(e.id))
    : [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={breadcrumbs} className="mb-8" />
      <article>
        <header>
          <Badge type={entry.type} className="mb-3">
            {t(`types.${entry.type}`)}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            {entry.title}
          </h1>
          {entry.description && (
            <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              {entry.description}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <ArticleMeta
              publishedAt={entry.publishedAt}
              updatedAt={entry.updatedAt}
            />
            <ShareButtons
              url={canonicalUrl}
              title={entry.title}
            />
          </div>
          {(entry.website || entry.github) && (
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              {entry.website && (
                <a
                  href={entry.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline underline-offset-4"
                >
                  Website &rarr;
                </a>
              )}
              {entry.github && (
                <a
                  href={entry.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline underline-offset-4"
                >
                  GitHub &rarr;
                </a>
              )}
            </div>
          )}
        </header>

        {entry.bodyHtml && (
          <div
            className="prose mt-10 dark:prose-invert prose-headings:scroll-mt-20"
            dangerouslySetInnerHTML={{ __html: entry.bodyHtml }}
          />
        )}

        {related.length > 0 && (
          <div className="mt-12 border-t border-gray-100 pt-8 dark:border-gray-800">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Related terms
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={{ pathname: "/glossary/[slug]", params: { slug: r.slug } }}
                  className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-accent hover:text-accent dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-accent dark:hover:text-accent"
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
