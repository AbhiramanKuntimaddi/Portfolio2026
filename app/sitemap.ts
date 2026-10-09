import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPublished } from "@/lib/cms/content";
import { visibleProjects } from "@/lib/cms/schema";
import { locales } from "@/lib/i18n";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const slugs = visibleProjects(
    await getPublished("projects", { allowDraft: false }),
  ).map((p) => p.slug);

  const langAlternates = (path: string) => ({
    languages: Object.fromEntries(
      locales.map((l) => [l, `${site.url}/${l}${path}`]),
    ),
  });

  const home: MetadataRoute.Sitemap = locales.map((l) => ({
    url: `${site.url}/${l}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
    alternates: langAlternates(""),
  }));

  const projectRoutes: MetadataRoute.Sitemap = locales.flatMap((l) =>
    slugs.map((slug) => ({
      url: `${site.url}/${l}/work/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: langAlternates(`/work/${slug}`),
    })),
  );

  const work: MetadataRoute.Sitemap = locales.map((l) => ({
    url: `${site.url}/${l}/work`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    alternates: langAlternates("/work"),
  }));

  return [...home, ...work, ...projectRoutes];
}
