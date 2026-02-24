import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  getBlogPosts,
  getBlogPost,
  getGlossaryEntries,
  createGlossaryPlugin,
} from "@/lib/content";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleMeta } from "@/components/content/ArticleMeta";
import { TableOfContents } from "@/components/content/TableOfContents";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { BlogImage } from "@/components/ui/BlogImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { routing } from "@/i18n/routing";
import { buildMetadata, getBaseUrl, articleJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const { routing } = await import("@/i18n/routing");
  const locales = [...routing.locales];
  const params: { slug: string; locale: string }[] = [];
  for (const locale of locales) {
    const posts = await getBlogPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const result = await getBlogPost(locale, slug);
  if (!result) {
    const t = await getTranslations({ locale, namespace: "common" });
    return { title: t("notFoundTitle") };
  }
  const baseUrl = getBaseUrl();
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(result.post.title)}&type=article`;
  return buildMetadata({
    title: result.post.title,
    description: result.post.description ?? undefined,
    path: `/${locale}/blog/${slug}`,
    locales: routing.locales,
    type: "article",
    image: ogImage,
  });
}

export default async function BlogSlugPage({ params }: Props) {
  const { locale, slug } = await params;
  const entries = await getGlossaryEntries(locale);
  const glossaryPlugin = createGlossaryPlugin(
    locale,
    entries.map((e) => ({ slug: e.slug, title: e.title }))
  );
  const result = await getBlogPost(locale, slug, [glossaryPlugin]);
  if (!result) notFound();

  const { post, headings } = result;
  const t = await getTranslations("blog");
  const navT = await getTranslations("nav");
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/${locale}/blog/${post.slug}`;

  const breadcrumbs = [
    { label: navT("home"), href: "/" },
    { label: navT("blog"), href: "/blog" },
    { label: post.title },
  ];
  const breadcrumbUrls = [
    `${baseUrl}/${locale}`,
    `${baseUrl}/${locale}/blog`,
    canonicalUrl,
  ];
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}&type=article`;
  const articleLd = articleJsonLd({
    url: canonicalUrl,
    title: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: post.author,
    image: ogImage,
  });

  const allPosts = await getBlogPosts(locale);
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const articleImageUrl = post.image
    ? `/images/blog/${post.image}`
    : `/images/blog/${post.slug}.jpg`;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <JsonLd data={articleLd} />
      <Breadcrumbs items={breadcrumbs} jsonLdUrls={breadcrumbUrls} className="mb-8" />

      <div className="lg:flex lg:gap-16">
        <article className="min-w-0 flex-1">
          <header className="max-w-2xl">
            {post.tags && post.tags.length > 0 && (
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-accent">
                {post.tags[0]}
              </p>
            )}
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
              {post.title}
            </h1>
            {post.description && (
              <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                {post.description}
              </p>
            )}
            <BlogImage
              imageUrl={articleImageUrl}
              alt=""
              className="mt-6 mb-6 max-w-2xl"
              aspectRatio="21/9"
            />
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <ArticleMeta
                publishedAt={post.publishedAt}
                updatedAt={post.updatedAt}
                readingTime={post.readingTime}
                author={post.author}
              />
              <ShareButtons
                url={canonicalUrl}
                title={post.title}
              />
            </div>
          </header>

          {post.bodyHtml && (
            <div
              className="prose mt-12 dark:prose-invert prose-headings:scroll-mt-20"
              dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
            />
          )}
        </article>

        {headings.length > 0 && (
          <aside className="hidden lg:block lg:w-56 lg:shrink-0">
            <TableOfContents
              headings={headings}
              title={t("onThisPage")}
              className="sticky top-24"
            />
          </aside>
        )}
      </div>

      {relatedPosts.length > 0 && (
        <div className="mt-16 border-t border-gray-100 pt-12 dark:border-gray-800">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            More articles
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((p) => (
              <Card
                key={p.slug}
                title={p.title}
                description={p.description}
                date={p.publishedAt}
                href={{ pathname: "/blog/[slug]", params: { slug: p.slug } }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
