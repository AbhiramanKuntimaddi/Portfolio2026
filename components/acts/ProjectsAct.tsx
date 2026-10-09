"use client";

import { useMemo } from "react";
import { FiLock } from "react-icons/fi";
import { featuredProjects, visibleProjects } from "@/lib/cms/schema";
import { RollingDigit } from "@/components/ui/RollingDigit";
import { ChapterIndex } from "@/components/ui/ChapterIndex";
import {
  useContent,
  useLocalized,
} from "@/components/providers/ContentProvider";

const STATUS_DOT = {
  ONGOING: "bg-orange-400 animate-pulse",
  COMPLETED: "bg-green-500",
  UPCOMING: "bg-violet-400",
  ARCHIVED: "bg-red-500",
} as const;

export function ProjectsAct({ activeIndex }: { activeIndex: number }) {
  const { locale, c, data } = useContent();
  const featured = useMemo(
    () => featuredProjects(data.projects),
    [data.projects],
  );
  const total = visibleProjects(data.projects).length;
  const items = useLocalized(featured);
  const active = items[Math.min(activeIndex, items.length - 1)];

  return (
    <section className="projects-act absolute inset-0 flex items-center overflow-hidden">
      <div className="frame relative flex h-full items-center">
        <div className="projects-intro pointer-events-none absolute inset-0 z-30 mx-auto flex w-full max-w-2xl flex-col justify-center px-(--grid-margin) xl:mx-0 xl:max-w-none">
          <div className="mb-10 flex items-center gap-6 xl:mb-14">
            <span
              data-decode
              className="projects-intro-label font-label text-[10px] font-bold tracking-[0.35em] whitespace-nowrap text-accent uppercase"
            >
              {c.projects.label}
            </span>
            <span className="projects-intro-rule h-px flex-1 origin-left bg-line" />
            <span className="font-label text-[10px] tracking-[0.35em] whitespace-nowrap text-muted tabular-nums">
              05 / 06
            </span>
          </div>
          <div className="grid grid-cols-1 items-end gap-12 xl:grid-cols-12 xl:gap-6">
            <div className="xl:col-span-7">
              <h2 className="w-full font-heading text-4xl leading-[0.95] font-bold text-foreground uppercase [word-spacing:0.14em] sm:text-5xl md:text-6xl md:leading-none xl:text-[clamp(4rem,5.2vw,6rem)]">
                <span className="block overflow-hidden pb-[0.05em]">
                  <span
                    data-decode="wide"
                    className="projects-intro-line block whitespace-normal"
                  >
                    {c.projects.line1}
                  </span>
                </span>
                <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                  <span
                    data-decode="wide"
                    className="projects-intro-line block whitespace-normal text-accent italic"
                  >
                    {c.projects.line2}
                  </span>
                </span>
              </h2>
              <p className="projects-intro-p mt-8 max-w-xl font-body text-lg leading-relaxed text-muted md:text-xl">
                {c.projects.intro}
              </p>
            </div>
            <ChapterIndex
              className="projects-index hidden xl:col-span-4 xl:col-start-9 xl:block"
              command={`ls ${c.nav.projects}/`}
              rows={items.map((p) => ({
                id: p.id,
                name: p.title,
                meta: p.year,
              }))}
              more={
                total > items.length
                  ? `+${total - items.length} ${c.projects.more} /work`
                  : undefined
              }
            />
          </div>
        </div>

        <div className="projects-content relative z-10 w-full">
          <div className="relative mx-auto max-w-3xl xl:mx-0">
            {items.map((project, i) => (
              <div
                key={project.id}
                className="project-block absolute inset-0 flex flex-col justify-center space-y-6 md:space-y-8"
                style={{ pointerEvents: i === activeIndex ? "auto" : "none" }}
              >
                <div className="flex items-center gap-4">
                  <span className="border-l border-accent/40 pl-4 font-label text-[10px] tracking-[0.2em] text-accent uppercase">
                    {project.category}
                  </span>
                  <span className="font-label text-[10px] tracking-widest text-muted">
                    {project.year}
                  </span>
                </div>

                <h3
                  data-decode="wide"
                  className="font-heading text-4xl leading-[0.9] font-bold tracking-tight text-foreground uppercase [word-spacing:0.14em] md:text-5xl xl:text-7xl"
                >
                  {project.title}
                </h3>

                <p className="max-w-xl font-body text-lg leading-relaxed text-foreground/80 md:text-xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      data-cursor="link"
                      className="rounded-sm border border-accent/20 bg-accent/5 px-3 py-1 font-label text-[9px] tracking-widest text-accent uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-4">
                  {project.status !== "ARCHIVED" ? (
                    <a
                      href={`/${locale}/work/${project.slug}`}
                      className="group relative flex items-center gap-3 overflow-hidden border border-accent/30 px-6 py-3 transition-colors duration-300"
                    >
                      <div className="absolute inset-0 translate-y-full bg-accent transition-transform duration-300 ease-out group-hover:translate-y-0" />
                      <span className="relative z-10 font-label text-[11px] tracking-wide text-accent lowercase transition-colors duration-300 group-hover:text-background">
                        {c.projects.readMore}
                      </span>
                      <svg
                        className="relative z-10 h-4 w-4 text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:text-background"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>
                  ) : (
                    <div className="flex cursor-not-allowed items-center gap-3 border border-accent/20 bg-accent/10 px-6 py-3 opacity-40">
                      <span className="font-label text-[11px] tracking-wide text-accent/60 lowercase">
                        {c.projects.status.ARCHIVED}
                      </span>
                      <FiLock className="h-4 w-4 text-accent/60" />
                    </div>
                  )}

                  <div className="hidden flex-col border-l border-line pl-6 sm:flex">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${STATUS_DOT[project.status]}`}
                      />
                      <span className="font-label text-[9px] tracking-wide text-muted lowercase">
                        {c.projects.status[project.status]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        href={`/${locale}/work`}
        className="projects-all group pointer-events-auto absolute bottom-10 left-(--frame-x) z-20 flex items-baseline gap-2 font-label text-[11px] tracking-[0.12em] lowercase md:bottom-12"
      >
        <span className="text-accent">$</span>
        <span className="text-foreground/80 transition-colors duration-300 group-hover:text-accent">
          {c.projects.all}
        </span>
        <span className="text-muted tabular-nums">({total})</span>
        <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </a>

      {active && (
        <div className="projects-bgdigit pointer-events-none absolute right-0 bottom-0 flex justify-end pr-(--grid-margin) select-none">
          <RollingDigit
            digit={String(Math.min(activeIndex, items.length - 1) + 1)}
            className="block font-display text-[30vw] leading-none font-bold text-foreground italic"
          />
        </div>
      )}
    </section>
  );
}
