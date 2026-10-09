import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublished } from "@/lib/cms/content";
import { visibleProjects } from "@/lib/cms/schema";
import { site } from "@/lib/site";
import { getContent } from "@/lib/content/site";
import { defaultLocale, hasLocale, localize, type Locale } from "@/lib/i18n";

const STATUS_DOT: Record<string, string> = {
  ONGOING: "bg-orange-400",
  COMPLETED: "bg-green-500",
  UPCOMING: "bg-violet-400",
  ARCHIVED: "bg-red-500",
};

function toLocale(lang: string): Locale {
  return hasLocale(lang) ? lang : defaultLocale;
}

async function findProject(slug: string, locale: Locale) {
  const all = visibleProjects(await getPublished("projects"));
  const project = all.find((p) => p.slug === slug);
  return project ? localize(project, locale) : undefined;
}

export async function generateStaticParams() {
  const all = visibleProjects(
    await getPublished("projects", { allowDraft: false }),
  );
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const project = await findProject(slug, locale);
  if (!project)
    return {
      title: getContent(locale, await getPublished("copy")).archive.notFound,
      robots: { index: false },
    };

  const path = `/${lang}/work/${slug}`;
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: `${site.url}${path}`,
      title: project.title,
      description: project.description,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const project = await findProject(slug, locale);
  if (!project) notFound();
  const c = getContent(locale, await getPublished("copy"));
  const t = c.archive;

  const images = [project.cover, ...project.images].filter(Boolean);
  const path = `/${lang}/work/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.description,
    url: `${site.url}${path}`,
    dateCreated: project.year,
    keywords: project.stack.join(", "),
    author: { "@type": "Person", name: site.name, url: site.url },
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
  };

  return (
    <main className="relative z-10 min-h-dvh bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <Link
          href={`/${lang}/work`}
          className="group inline-flex items-baseline font-label cursor-pointer mb-14 md:mb-20"
        >
          <span className="text-accent mr-2 transition-transform duration-300 group-hover:-translate-x-1 font-bold select-none">
            &lt;
          </span>
          <span className="text-accent/70 text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-300 group-hover:text-foreground">
            {t.back}
          </span>
          <span className="text-accent/40 select-none">();</span>
        </Link>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
          <span className="text-accent font-label text-[10px] md:text-[11px] tracking-[0.2em] uppercase border-l border-accent/40 pl-4">
            {project.category}
          </span>
          <span className="text-muted font-label text-[10px] md:text-[11px] tracking-widest">
            {project.year}
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                STATUS_DOT[project.status] ?? "bg-foreground/30"
              }`}
            />
            <span className="text-muted font-label text-[10px] md:text-[11px] lowercase tracking-wide">
              {c.projects.status[project.status]}
            </span>
          </span>
        </div>

        <h1 className="font-heading text-[clamp(2.5rem,7vw,5rem)] font-bold text-foreground uppercase leading-[0.9] tracking-tight [word-spacing:0.1em]">
          {project.title}
        </h1>

        <p className="mt-8 md:mt-10 max-w-2xl font-body text-foreground/65 text-lg md:text-xl font-light leading-relaxed">
          {project.description}
        </p>

        <div className="mt-10">
          <p className="font-label text-[11px] text-muted tracking-wide mb-4">
            <span className="text-accent/60">{"// "}</span>
            {t.builtWith}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                data-cursor="link"
                className="px-3 py-1.5 bg-accent/5 border border-accent/20 text-accent text-[10px] font-label tracking-widest uppercase rounded-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {images.length > 0 ? (
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`${project.title} — ${i + 1}`}
                className="w-full rounded-md border border-foreground/10 object-cover"
              />
            ))}
          </div>
        ) : (
          <div className="mt-14 border border-dashed border-foreground/10 rounded-md p-8 md:p-12 flex flex-col items-center justify-center text-center bg-foreground/1">
            <p className="font-label text-xs md:text-sm text-muted tracking-widest uppercase">
              <span className="text-accent/60">{"// "}</span>
              {t.pending}
            </p>
            <p className="text-xs text-foreground/30 font-light mt-1.5 max-w-xs">
              {t.pendingBody}
            </p>
          </div>
        )}

        <div className="mt-16 border-t border-foreground/10 pt-8">
          <Link
            href={`/${lang}?session=contact`}
            className="group inline-flex items-baseline font-label cursor-pointer"
          >
            <span className="text-accent text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-300 group-hover:text-foreground">
              {t.cta}
            </span>
            <span className="text-accent/40 select-none">();</span>
            <span className="text-accent ml-2 transition-transform duration-300 group-hover:translate-x-1 font-bold select-none">
              &gt;
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
