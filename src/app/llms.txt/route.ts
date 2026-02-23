import { generateLlmsTxtContent } from "@/lib/llms";
import { routing } from "@/i18n/routing";

export async function GET() {
  const locale = routing.defaultLocale;
  const content = await generateLlmsTxtContent(locale);

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
