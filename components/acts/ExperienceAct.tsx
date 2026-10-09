"use client";

import { RollingDigit } from "@/components/ui/RollingDigit";
import { ChapterIndex } from "@/components/ui/ChapterIndex";
import {
  useContent,
  useLocalized,
} from "@/components/providers/ContentProvider";

export function ExperienceAct({ activeIndex }: { activeIndex: number }) {
  const { c, data } = useContent();
  const items = useLocalized(data.experience);
  const currentYear =
    items[Math.min(activeIndex, items.length - 1)]?.year ?? "";

  return (
    <section className="exp-act absolute inset-0 flex items-center overflow-hidden">
      <div className="frame relative flex h-full items-center">
        <div className="exp-intro pointer-events-none absolute inset-0 z-30 mx-auto flex w-full max-w-2xl flex-col justify-center px-(--grid-margin) xl:mx-0 xl:max-w-none">
          <div className="mb-10 flex items-center gap-6 xl:mb-14">
            <span
              data-decode
              className="exp-intro-label font-label text-[10px] font-bold tracking-[0.35em] whitespace-nowrap text-accent uppercase"
            >
              {c.experience.label}
            </span>
            <span className="exp-intro-rule h-px flex-1 origin-left bg-line" />
            <span className="font-label text-[10px] tracking-[0.35em] whitespace-nowrap text-muted tabular-nums">
              04 / 06
            </span>
          </div>
          <div className="grid grid-cols-1 items-end gap-12 xl:grid-cols-12 xl:gap-6">
            <div className="xl:col-span-7">
              <h2 className="w-full font-heading text-4xl leading-[0.95] font-bold tracking-tight text-foreground uppercase [word-spacing:0.14em] sm:text-5xl md:text-6xl md:leading-none xl:text-[clamp(4rem,5.2vw,6rem)]">
                <span className="block overflow-hidden pb-[0.05em]">
                  <span
                    data-decode="wide"
                    className="exp-intro-line block whitespace-normal"
                  >
                    {c.experience.line1}
                  </span>
                </span>
                <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                  <span
                    data-decode="wide"
                    className="exp-intro-line block whitespace-normal text-accent italic"
                  >
                    {c.experience.line2}
                  </span>
                </span>
              </h2>
              <p className="exp-intro-p mt-8 max-w-xl font-body text-lg leading-relaxed text-muted md:text-xl">
                {c.experience.intro}
              </p>
            </div>
            <ChapterIndex
              className="exp-index hidden xl:col-span-4 xl:col-start-9 xl:block"
              command={`ls ${c.nav.experience}/`}
              rows={items.map((e) => ({
                id: e.id,
                name: e.company,
                meta: e.year,
              }))}
            />
          </div>
        </div>

        <div className="exp-content z-10 grid w-full grid-cols-1 gap-12 xl:grid-cols-12 xl:gap-20">
          <div className="hidden flex-col justify-center border-l border-line pl-8 xl:col-span-4 xl:flex">
            <div className="space-y-6">
              {items.map((exp, i) => (
                <h3
                  key={exp.id}
                  className={`text-xl font-semibold tracking-tight whitespace-nowrap uppercase [word-spacing:0.14em] transition-all duration-500 md:text-2xl ${
                    activeIndex === i
                      ? "text-accent opacity-100"
                      : "text-foreground opacity-30"
                  }`}
                >
                  {exp.title}
                </h3>
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex h-125 w-full max-w-2xl items-center xl:col-span-8 xl:mx-0 xl:max-w-none">
            {items.map((exp, i) => (
              <div
                key={exp.id}
                className={`exp-block absolute inset-0 flex flex-col justify-center space-y-6 transition-all duration-500 ${
                  activeIndex === i
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <h3 className="block text-2xl font-semibold tracking-tight text-accent uppercase [word-spacing:0.14em] xl:hidden">
                  {exp.title}
                </h3>

                <div className="flex items-center gap-4">
                  <span className="font-label text-[10px] font-bold tracking-[0.4em] text-accent uppercase">
                    {exp.year} / {exp.context}
                  </span>
                  <div className="h-px w-16 bg-accent/30" />
                </div>
                <h2
                  data-decode="wide"
                  className="font-heading text-3xl leading-[0.95] font-bold tracking-tighter text-foreground uppercase [word-spacing:0.14em] sm:text-5xl xl:text-7xl"
                >
                  {exp.company}
                </h2>
                <p className="max-w-xl font-body text-lg leading-relaxed text-foreground/80 md:text-xl">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="exp-bgyear pointer-events-none absolute right-0 bottom-0 flex justify-end pr-(--grid-margin) tracking-[-0.05em] select-none">
        {currentYear.split("").map((d, i) => (
          <RollingDigit
            key={i}
            digit={d}
            className="block font-display text-[32vw] leading-none font-bold text-foreground italic md:text-[25vw]"
          />
        ))}
      </div>
    </section>
  );
}
