import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buildMetadata, getBaseUrl, websiteJsonLd, organizationJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBlogPosts, getGlossaryEntries } from "@/lib/content";
import { BlogCard } from "@/components/ui/BlogCard";
import { Card } from "@/components/ui/Card";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { ParticleNetwork } from "@/components/ui/ParticleNetwork";
import { AgentMarquee } from "@/components/ui/AgentMarquee";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type Props = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return buildMetadata({
    title: t("defaultTitle"),
    description: t("defaultDescription"),
    path: `/${locale}`,
    locales: routing.locales,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");
  const tGlossary = await getTranslations("glossary");

  const posts = await getBlogPosts(locale);
  const latestPosts = posts.slice(0, 3);

  const glossaryEntries = await getGlossaryEntries(locale);
  const latestTerms = [...glossaryEntries]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6);

  const baseUrl = getBaseUrl();
  const jsonLd = [
    websiteJsonLd(baseUrl, "Web4Agents", "Prepare the web for AI agents. Practices, glossary, and documentation for the agentic web."),
    organizationJsonLd(baseUrl, "Web4Agents", "Prepare the web for AI agents. Practices, glossary, and documentation for the agentic web."),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="relative min-h-[28rem] overflow-hidden bg-grid bg-gray-100/80 sm:min-h-[32rem] dark:bg-gray-950">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/95 to-gray-50 dark:from-gray-950 dark:via-gray-950/95 dark:to-gray-950" />
        <ParticleNetwork particleCount={50} excludeCenter />
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-24 md:pb-28 md:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="animate-hero-in delay-hero-1 text-sm font-semibold uppercase tracking-widest text-accent">
              Web<span className="text-gray-900 dark:text-white">4</span>Agents.org
            </p>
            <h1 className="animate-hero-in delay-hero-2 mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="animate-hero-in delay-hero-3 mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl">
              {t("subtitle")}
            </p>
            <div className="animate-hero-in delay-hero-4 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-offset-gray-950"
              >
                {t("ctaPrepare")}
              </Link>
              <Link
                href="/audit"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus-visible:ring-offset-gray-950"
              >
                {t("ctaAudit")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Agent-ready web */}
      <section className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
                {t("agentReadyTitle")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                {t("agentReadyIntro")}
              </p>
              <div className="mt-8">
                <Link
                  href="/docs"
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-hover active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
                >
                  {t("agentReadyCta")} &rarr;
                </Link>
              </div>
            </div>
          </ScrollReveal>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {(["Readability", "Actionability", "Security"] as const).map((pillar, index) => {
              const key = pillar.toLowerCase() as "readability" | "actionability" | "security";
              return (
                <ScrollReveal key={pillar} delay={index * 110}>
                  <div className="h-full rounded-xl border border-gray-100 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-900/50">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-accent">
                      {t(`geo${pillar}`)}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {t(`geo${pillar}Desc`)}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <AgentMarquee />

      {/* Blog */}
      {latestPosts.length > 0 && (
        <section className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <ScrollReveal>
              <div className="flex items-end justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  {t("latestBlog")}
                </h2>
                <Link
                  href="/blog"
                  className="hidden text-sm font-medium text-accent hover:underline underline-offset-4 sm:block"
                >
                  {tNav("blog")} &rarr;
                </Link>
              </div>
            </ScrollReveal>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post, index) => (
                <li key={post.slug}>
                  <ScrollReveal delay={index * 90}>
                    <BlogCard
                      title={post.title}
                      href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                      imageUrl={
                        post.image
                          ? `/images/blog/${post.image}`
                          : `/images/blog/${post.slug}.jpg`
                      }
                      date={post.publishedAt}
                    />
                  </ScrollReveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Glossary — last content section */}
      {latestTerms.length > 0 && (
        <section className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <ScrollReveal>
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    {t("latestGlossary")}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {t("latestGlossaryIntro")}
                  </p>
                </div>
                <Link
                  href="/glossary"
                  className="hidden text-sm font-medium text-accent hover:underline underline-offset-4 sm:block"
                >
                  {tNav("glossary")} &rarr;
                </Link>
              </div>
            </ScrollReveal>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latestTerms.map((entry, index) => (
                <li key={entry.slug}>
                  <ScrollReveal delay={index * 70}>
                    <Card
                      title={entry.title}
                      description={entry.description}
                      badges={[{ label: tGlossary(`types.${entry.type}`), type: entry.type }]}
                      href={{ pathname: "/glossary/[slug]", params: { slug: entry.slug } }}
                    />
                  </ScrollReveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="border-t border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
          <ScrollReveal>
            <div className="mx-auto max-w-md text-center">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                {t("stayUpdated")}
              </h2>
              <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
                {t("cta")}
              </p>
              <div className="mt-4">
                <NewsletterForm />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
