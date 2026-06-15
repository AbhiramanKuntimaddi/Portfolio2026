import { ImageResponse } from "next/og";
import { projects } from "@/lib/data/projects";
import { site } from "@/lib/site";
import { OgImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Project — Abhiraman Kuntimaddi";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  const slugs = new Set(projects.map((p) => p.link.replace("/archive/", "")));
  return Array.from(slugs).map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.link === `/archive/${slug}`);
  const title = project?.title ?? site.name;
  const subtitle = project
    ? project.category.split("//")[0].trim()
    : site.jobTitle;

  return new ImageResponse(<OgImage title={title} subtitle={subtitle} />, {
    ...ogSize,
  });
}
