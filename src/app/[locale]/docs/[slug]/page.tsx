import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getDocEntries, getDocPage, getDocSlugForLocale } from "@/lib/content-docs";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TableOfContents } from "@/components/content/TableOfContents";
import { JsonLd } from "@/components/seo/JsonLd";
import { routing, getExternalPath } from "@/i18n/routing";
import { buildMetadata, getBaseUrl, articleJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const { routing } = await import("@/i18n/routing");
  const locales = [...routing.locales];
  const params: { slug: string; locale: string }[] = [];
  for (const locale of locales) {
    const entries = await getDocEntries(locale);
    for (const entry of entries) {
      params.push({ locale, slug: entry.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const page = await getDocPage(locale, slug);
  if (!page) {
    const t = await getTranslations({ locale, namespace: "common" });
    return { title: t("notFoundTitle") };
  }
  const path = `/${locale}${getExternalPath("/docs", locale)}/${slug}`;
  const pathByLocale: Record<string, string> = {};
  for (const loc of routing.locales) {
    const slugForLoc = await getDocSlugForLocale(page.id, loc);
    pathByLocale[loc] = `/${loc}${getExternalPath("/docs", loc)}/${slugForLoc ?? page.slug}`;
  }
  return buildMetadata({
    title: `${page.title} — Docs`,
    description: page.description ?? undefined,
    path,
    locales: routing.locales,
    getPathForLocale: (loc) => pathByLocale[loc] ?? path,
  });
}

export default async function DocSlugPage({ params }: Props) {
  const { locale, slug } = await params;
  const page = await getDocPage(locale, slug);
  if (!page) notFound();

  const t = await getTranslations("docs");
  const navT = await getTranslations("nav");
  const baseUrl = getBaseUrl();
  const docsPath = getExternalPath("/docs", locale);
  const canonicalUrl = `${baseUrl}/${locale}${docsPath}/${page.slug}`;
  const docJsonLd = articleJsonLd({
    url: canonicalUrl,
    title: page.title,
    description: page.description ?? undefined,
    datePublished: page.publishedAt,
    dateModified: page.updatedAt && page.updatedAt !== page.publishedAt ? page.updatedAt : undefined,
  });

  const breadcrumbs = [
    { label: navT("home"), href: "/" },
    { label: navT("docs"), href: "/docs" },
    { label: page.title },
  ];
  const breadcrumbUrls = [
    `${baseUrl}/${locale}`,
    `${baseUrl}/${locale}${docsPath}`,
    canonicalUrl,
  ];

  return (
    <div>
      <JsonLd data={docJsonLd} />
      <Breadcrumbs items={breadcrumbs} jsonLdUrls={breadcrumbUrls} className="mb-6" />

      <div className="lg:flex lg:gap-12">
        <article className="min-w-0 flex-1">
          <header>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
              {page.title}
            </h1>
            {page.description && (
              <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                {page.description}
              </p>
            )}
            <p className="mt-3 text-xs text-gray-400 dark:text-gray-500 tabular-nums">
              {page.publishedAt}
              {page.updatedAt && page.updatedAt !== page.publishedAt && (
                <> · Updated {page.updatedAt}</>
              )}
            </p>
          </header>

          {page.bodyHtml && (
            <div
              className="prose mt-10 dark:prose-invert prose-headings:scroll-mt-20"
              dangerouslySetInnerHTML={{ __html: page.bodyHtml }}
            />
          )}
        </article>

        {page.headings.length > 0 && (
          <aside className="hidden lg:block lg:w-48 lg:shrink-0">
            <TableOfContents
              headings={page.headings}
              title={t("onThisPage")}
              className="sticky top-24"
            />
          </aside>
        )}
      </div>
    </div>
  );
}
