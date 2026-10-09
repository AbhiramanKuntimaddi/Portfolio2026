import { ImageResponse } from "next/og";
import { getPublished } from "@/lib/cms/content";
import { visibleProjects } from "@/lib/cms/schema";
import { site } from "@/lib/site";
import { defaultLocale, hasLocale, localize } from "@/lib/i18n";
import { OgImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Project — Abhiraman Kuntimaddi";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  const all = visibleProjects(
    await getPublished("projects", { allowDraft: false }),
  );
  return all.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const all = await getPublished("projects", { allowDraft: false });
  const raw = all.find((p) => p.slug === slug);
  const project = raw
    ? localize(raw, hasLocale(lang) ? lang : defaultLocale)
    : undefined;
  const title = project?.title ?? site.name;
  const subtitle = project
    ? project.category.split("//")[0].trim()
    : site.jobTitle;

  return new ImageResponse(<OgImage title={title} subtitle={subtitle} />, {
    ...ogSize,
  });
}
