import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const slugs = Array.from(
    new Set(projects.map((p) => p.link.replace("/archive/", ""))),
  );

  const projectRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${site.url}/archive/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectRoutes,
  ];
}
