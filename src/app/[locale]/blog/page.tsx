import { getTranslations } from "next-intl/server";
import { getBlogPosts } from "@/lib/content";
import { BlogCard } from "@/components/ui/BlogCard";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const tSeo = await getTranslations({ locale, namespace: "seo" });
  return buildMetadata({
    title: t("title"),
    description: tSeo("defaultDescription"),
    path: `/${locale}/blog`,
    locales: routing.locales,
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const posts = await getBlogPosts(locale);
  const t = await getTranslations("blog");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
          {t("subtitle")}
        </p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            title={post.title}
            href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
            imageUrl={
              post.image
                ? `/images/blog/${post.image}`
                : `/images/blog/${post.slug}.jpg`
            }
            date={post.publishedAt}
          />
        ))}
      </div>
      {posts.length === 0 && (
        <p className="mt-12 text-gray-400 dark:text-gray-500">
          No posts yet.
        </p>
      )}
    </div>
  );
}
