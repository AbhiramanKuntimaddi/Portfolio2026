"use client";

import { RollingDigit } from "@/components/ui/RollingDigit";
import { ChapterIndex } from "@/components/ui/ChapterIndex";
import {
  useContent,
  useLocalized,
} from "@/components/providers/ContentProvider";

export function SkillsAct({ activeIndex }: { activeIndex: number }) {
  const { c, data } = useContent();
  const groups = useLocalized(data.skills);
  const current = groups[Math.min(activeIndex, groups.length - 1)];

  return (
    <section className="skills-act absolute inset-0 flex items-center overflow-hidden">
      <div className="frame relative flex h-full items-center">
        <div className="skills-intro pointer-events-none absolute inset-0 z-30 mx-auto flex w-full max-w-2xl flex-col justify-center px-(--grid-margin) xl:mx-0 xl:max-w-none">
          <div className="mb-10 flex items-center gap-6 xl:mb-14">
            <span
              data-decode
              className="skills-intro-label font-label text-[10px] font-bold tracking-[0.35em] whitespace-nowrap text-accent uppercase"
            >
              {c.skills.label}
            </span>
            <span className="skills-intro-rule h-px flex-1 origin-left bg-line" />
            <span className="font-label text-[10px] tracking-[0.35em] whitespace-nowrap text-muted tabular-nums">
              03 / 06
            </span>
          </div>
          <div className="grid grid-cols-1 items-end gap-12 xl:grid-cols-12 xl:gap-6">
            <div className="xl:col-span-7">
              <h2 className="w-full font-heading text-4xl leading-[0.95] font-bold tracking-tight text-foreground uppercase [word-spacing:0.14em] sm:text-5xl md:text-6xl md:leading-none xl:text-[clamp(4rem,5.2vw,6rem)]">
                <span className="block overflow-hidden pb-[0.05em]">
                  <span
                    data-decode="wide"
                    className="skills-intro-line block whitespace-normal"
                  >
                    {c.skills.line1}
                  </span>
                </span>
                <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                  <span
                    data-decode="wide"
                    className="skills-intro-line block whitespace-normal text-accent italic"
                  >
                    {c.skills.line2}
                  </span>
                </span>
              </h2>
              <p className="skills-intro-p mt-8 max-w-xl font-body text-lg leading-relaxed text-muted md:text-xl">
                {c.skills.intro}
              </p>
            </div>
            <ChapterIndex
              className="skills-index hidden xl:col-span-4 xl:col-start-9 xl:block"
              command={`ls ${c.nav.skills}/`}
              rows={groups.map((g) => ({
                id: g.id,
                name: g.group,
                meta: `${g.skills.length} ${c.ui.tools}`,
              }))}
            />
          </div>
        </div>

        <div className="skills-content z-10 grid w-full grid-cols-1 gap-12 xl:grid-cols-12 xl:gap-24">
          <div className="hidden flex-col justify-center space-y-10 border-l border-line pl-8 xl:col-span-5 xl:flex">
            {groups.map((item, i) => (
              <h3
                key={item.id}
                className={`text-2xl font-light tracking-tighter whitespace-nowrap uppercase [word-spacing:0.14em] transition-all duration-500 md:text-4xl xl:text-5xl ${
                  activeIndex === i
                    ? "text-accent opacity-100"
                    : "text-foreground opacity-30"
                }`}
              >
                {item.group}
              </h3>
            ))}
          </div>

          <div className="relative mx-auto flex h-100 w-full max-w-2xl items-center xl:col-span-7 xl:mx-0 xl:max-w-none">
            {groups.map((item, i) => (
              <div
                key={item.id}
                className={`skill-block absolute inset-0 flex flex-col justify-center space-y-6 transition-all duration-500 md:space-y-8 ${
                  activeIndex === i
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <h3 className="block text-3xl font-light tracking-tighter text-accent uppercase [word-spacing:0.14em] xl:hidden">
                  {item.group}
                </h3>

                <div className="flex items-center gap-3">
                  <span className="font-label text-[11px] tracking-[0.35em] text-accent/70 uppercase md:text-xs xl:text-sm">
                    {item.role}
                  </span>
                  <div className="h-px max-w-24 flex-1 bg-accent/15" />
                </div>

                <p className="max-w-xl font-body text-lg leading-relaxed text-foreground/85 md:text-xl">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-3">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      data-cursor="link"
                      className="rounded-sm border border-accent/20 px-4 py-2 font-label text-[12px] tracking-[0.3em] text-foreground uppercase"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-4">
                  <div className="h-px w-12 bg-accent" />
                  <span className="font-label text-[9px] tracking-[0.5em] text-muted uppercase">
                    STATION_{item.id}_OPTIMIZED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="skills-bgdigit pointer-events-none absolute right-0 bottom-0 flex justify-end pr-(--grid-margin) select-none">
        {current && (
          <RollingDigit
            digit={current.id.replace(/^0/, "")}
            className="block font-display text-[30vw] leading-none font-bold text-foreground italic"
          />
        )}
      </div>
    </section>
  );
}
