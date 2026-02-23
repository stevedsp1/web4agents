import { DocsSidebar } from "@/components/layout/DocsSidebar";
import { getDocEntries } from "@/lib/content-docs";

export const dynamic = "force-dynamic";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function DocsLayout({ children, params }: Props) {
  const { locale } = await params;
  const entries = await getDocEntries(locale);

  return (
    <div className="mx-auto flex max-w-6xl gap-10 px-6 py-16 md:py-20">
      <DocsSidebar entries={entries} />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
