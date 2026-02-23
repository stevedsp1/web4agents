import type { Metadata } from "next";

const DEFAULT_BASE_URL = "https://web4agents.org";

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_BASE_URL;
}

export interface BuildMetadataParams {
  title: string;
  description?: string;
  path: string;
  locales: readonly string[];
  type?: "website" | "article";
  image?: string;
  /** When path segments differ per locale (e.g. /en/contribute vs /fr/contribution), provide this so alternates get correct URLs. */
  getPathForLocale?: (locale: string) => string;
}

/** Build common metadata (OG, Twitter, canonical, hreflang) for a page. path must start with / and include locale, e.g. /en/glossary */
export function buildMetadata(params: BuildMetadataParams): Metadata {
  const baseUrl = getBaseUrl();
  const path = params.path.startsWith("/") ? params.path : `/${params.path}`;
  const canonical = `${baseUrl}${path}`;
  const pathForLocale = params.getPathForLocale ?? ((locale: string) => path.replace(/^\/[^/]+/, `/${locale}`));
  const languages = Object.fromEntries(
    params.locales.map((l) => [l, `${baseUrl}${pathForLocale(l)}`])
  );
  return {
    title: params.title,
    description: params.description,
    openGraph: {
      title: params.title,
      description: params.description,
      url: canonical,
      type: params.type ?? "website",
      ...(params.image && { images: [{ url: params.image }] }),
    },
    twitter: {
      card: params.image ? "summary_large_image" : "summary",
      title: params.title,
      description: params.description,
    },
    alternates: {
      canonical,
      languages,
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function websiteJsonLd(
  baseUrl: string,
  name: string,
  description?: string
): Record<string, unknown> {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: baseUrl,
    name,
    ...(description && { description }),
  };
  return data;
}

export function organizationJsonLd(
  baseUrl: string,
  name: string,
  description?: string,
  logo?: string
): Record<string, unknown> {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: baseUrl,
    name,
    ...(description && { description }),
    ...(logo && { logo }),
  };
  return data;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface ArticleJsonLdInput {
  url: string;
  title: string;
  description?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}

export function articleJsonLd(input: ArticleJsonLdInput): Record<string, unknown> {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    url: input.url,
    headline: input.title,
    datePublished: input.datePublished,
    ...(input.description && { description: input.description }),
    ...(input.dateModified && { dateModified: input.dateModified }),
    ...(input.author && { author: { "@type": "Person", name: input.author } }),
    ...(input.image && { image: input.image }),
  };
  return data;
}

export interface DefinedTermJsonLdInput {
  url: string;
  name: string;
  description?: string;
}

export function definedTermJsonLd(input: DefinedTermJsonLdInput): Record<string, unknown> {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    url: input.url,
    name: input.name,
    ...(input.description && { description: input.description }),
  };
  return data;
}

export interface SoftwareApplicationJsonLdInput {
  url: string;
  name: string;
  description?: string;
  applicationCategory?: string;
}

export function softwareApplicationJsonLd(
  input: SoftwareApplicationJsonLdInput
): Record<string, unknown> {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    url: input.url,
    name: input.name,
    ...(input.description && { description: input.description }),
    ...(input.applicationCategory && { applicationCategory: input.applicationCategory }),
  };
  return data;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqJsonLd(faq: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
