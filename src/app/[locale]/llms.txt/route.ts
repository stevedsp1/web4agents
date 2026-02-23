import { generateLlmsTxtContent } from "@/lib/llms";
import { routing } from "@/i18n/routing";

type Params = { params: Promise<{ locale: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { locale } = await params;
  const locales = routing.locales as readonly string[];
  if (!locales.includes(locale)) {
    return new Response("Not Found", { status: 404 });
  }
  const content = await generateLlmsTxtContent(locale);

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
