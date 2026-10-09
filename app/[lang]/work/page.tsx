import type { Metadata } from "next";
import { WorkIndex } from "@/components/work/WorkIndex";
import { getPublished } from "@/lib/cms/content";
import { getContent } from "@/lib/content/site";
import { defaultLocale, hasLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const c = getContent(locale, await getPublished("copy"));
  return {
    title: c.work.metaTitle,
    description: c.work.intro,
    alternates: { canonical: `/${lang}/work` },
  };
}

export default function WorkPage() {
  return <WorkIndex />;
}
