import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublished } from "@/lib/cms/content";
import { visibleProjects } from "@/lib/cms/schema";
import { site } from "@/lib/site";
import { getContent } from "@/lib/content/site";
import { defaultLocale, hasLocale, localize, type Locale } from "@/lib/i18n";

const STATUS_DOT: Record<string, string> = {
  ONGOING: "bg-orange-400 animate-pulse",
  COMPLETED: "bg-green-500",
  UPCOMING: "bg-violet-400",
  ARCHIVED: "bg-red-500",
};

const pad = (n: number) => String(n).padStart(2, "0");

const host = (url: string) => {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
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
  const all = visibleProjects(await getPublished("projects"));
  const index = all.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = localize(all[index], locale);
  const next =
    all.length > 1 ? localize(all[(index + 1) % all.length], locale) : null;
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
    ...(project.client
      ? {
          sourceOrganization: { "@type": "Organization", name: project.client },
        }
      : {}),
    ...(project.url ? { sameAs: project.url } : {}),
    author: { "@type": "Person", name: site.name, url: site.url },
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
  };

  const facts = [
    project.client && { label: t.client, value: project.client },
    project.role && { label: t.role, value: project.role },
    { label: t.year, value: project.year },
    {
      label: t.status,
      value: (
        <span className="inline-flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[project.status] ?? "bg-foreground/30"}`}
          />
          {c.projects.status[project.status]}
        </span>
      ),
    },
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  const story = [
    project.challenge && { label: t.brief, body: project.challenge },
    project.solution && { label: t.built, body: project.solution },
  ].filter(Boolean) as { label: string; body: string }[];

  let n = 0;
  const num = () => pad(++n);

  return (
    <main className="relative z-10 min-h-dvh pt-28 pb-24 md:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="frame">
        <Link
          href={`/${lang}/work`}
          className="group mb-14 inline-flex items-baseline gap-2 font-label text-[11px] tracking-[0.12em] lowercase md:mb-20"
        >
          <span className="text-accent transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          <span className="text-muted transition-colors group-hover:text-accent">
            ~/abhiraman/work/
          </span>
          <span className="text-foreground/85">{slug}</span>
        </Link>

        <div className="mb-8 flex items-center gap-6">
          <span className="font-label text-[10px] font-bold tracking-[0.35em] whitespace-nowrap text-accent uppercase">
            {project.category}
          </span>
          <span className="h-px flex-1 bg-line" />
          <span className="font-label text-[10px] tracking-[0.35em] whitespace-nowrap text-muted tabular-nums">
            {project.year}
          </span>
        </div>

        <h1 className="max-w-5xl font-heading text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.92] font-bold tracking-tight text-foreground uppercase">
          {project.title}
        </h1>

        <p className="mt-8 max-w-3xl font-body text-xl leading-relaxed text-foreground/85 md:mt-10 md:text-2xl">
          {project.description}
        </p>

        {(project.url || project.repo) && (
          <div className="mt-10 flex flex-wrap gap-4 font-label text-[11px] tracking-[0.12em] lowercase">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 border border-accent px-5 py-3 text-accent transition-colors hover:bg-accent hover:text-background"
              >
                {t.live}
                <span className="text-foreground/50 group-hover:text-background/70">
                  {host(project.url)}
                </span>
                <span>↗</span>
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-line px-5 py-3 text-foreground/80 transition-colors hover:border-accent hover:text-accent"
              >
                {t.code} <span>↗</span>
              </a>
            )}
          </div>
        )}

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-line py-8 md:mt-20 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-2">
              <dt className="font-label text-[10px] tracking-[0.3em] text-muted uppercase">
                {f.label}
              </dt>
              <dd className="font-body text-base text-foreground">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-3">
          <span className="font-label text-[10px] tracking-[0.3em] text-muted uppercase">
            {t.builtWith}
          </span>
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="border border-line px-3 py-1 font-label text-[10px] tracking-widest text-foreground/80 uppercase"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-20 space-y-16 md:mt-28 md:space-y-24">
          {story.map((s) => (
            <section
              key={s.label}
              className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6"
            >
              <h2 className="font-label text-[11px] tracking-[0.12em] text-accent lowercase md:col-span-3">
                <span className="text-muted tabular-nums">{num()} </span>
                {s.label}
              </h2>
              <p className="font-body text-lg leading-relaxed text-foreground/85 md:col-span-8 md:text-xl">
                {s.body}
              </p>
            </section>
          ))}

          {project.highlights.length > 0 && (
            <section className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
              <h2 className="font-label text-[11px] tracking-[0.12em] text-accent lowercase md:col-span-3">
                <span className="text-muted tabular-nums">{num()} </span>
                {t.features}
              </h2>
              <ul className="border-t border-line md:col-span-8">
                {project.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-5 border-b border-line py-4"
                  >
                    <span className="font-label text-[11px] text-accent tabular-nums">
                      {pad(i + 1)}
                    </span>
                    <span className="font-body text-base leading-relaxed text-foreground/85 md:text-lg">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.outcome && (
            <section className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
              <h2 className="font-label text-[11px] tracking-[0.12em] text-accent lowercase md:col-span-3">
                <span className="text-muted tabular-nums">{num()} </span>
                {t.outcome}
              </h2>
              <p className="font-heading text-2xl leading-snug tracking-tight text-foreground md:col-span-8 md:text-3xl">
                {project.outcome}
              </p>
            </section>
          )}
        </div>

        <section className="mt-20 md:mt-28">
          <h2 className="mb-6 font-label text-[11px] tracking-[0.12em] text-accent lowercase">
            <span className="text-muted tabular-nums">{num()} </span>
            {t.gallery}
          </h2>
          {images.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {images.map((src, i) => (
                <div
                  key={src}
                  className={`relative overflow-hidden border border-line ${
                    i === 0 ? "aspect-video sm:col-span-2" : "aspect-4/3"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${project.title} — ${i + 1}`}
                    fill
                    unoptimized
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border border-dashed border-line p-10 text-center md:p-14">
              <p className="font-label text-xs tracking-widest text-muted uppercase">
                <span className="text-accent/60">{"// "}</span>
                {t.pending}
              </p>
              <p className="mt-2 max-w-xs font-body text-sm text-muted">
                {t.pendingBody}
              </p>
            </div>
          )}
        </section>

        <div className="mt-20 flex flex-wrap items-end justify-between gap-8 border-t border-line pt-8 md:mt-28">
          <Link
            href={`/${lang}?session=contact`}
            className="group inline-flex items-baseline font-label"
          >
            <span className="text-[11px] font-bold tracking-[0.3em] text-accent uppercase transition-colors duration-300 group-hover:text-foreground md:text-xs">
              {t.cta}
            </span>
            <span className="text-accent/40 select-none">();</span>
          </Link>
          {next && (
            <Link
              href={`/${lang}/work/${next.slug}`}
              className="group flex flex-col items-end gap-2 text-right"
            >
              <span className="font-label text-[10px] tracking-[0.3em] text-muted uppercase">
                {t.next} →
              </span>
              <span className="font-heading text-xl tracking-tight text-foreground uppercase transition-colors group-hover:text-accent md:text-2xl">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
