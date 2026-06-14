"use client";

import { skillGroups } from "@/lib/data/skills";
import { RollingDigit } from "@/components/ui/RollingDigit";

export function SkillsAct({ activeIndex }: { activeIndex: number }) {
  return (
    <section className="skills-act absolute inset-0 overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-20 relative h-full flex items-center">
        <div className="skills-intro absolute inset-0 flex flex-col justify-center px-6 md:px-20 z-30 pointer-events-none">
          <span className="skills-intro-label text-accent font-bold tracking-[0.35em] text-[10px] uppercase mb-6 block opacity-60">
            The Capabilities
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-foreground font-sans tracking-tight uppercase leading-[0.95] md:leading-[1.0] w-full [word-spacing:0.14em]">
            <span className="block overflow-hidden pb-[0.05em]">
              <span className="skills-intro-line block whitespace-normal md:whitespace-nowrap">
                Mastering the
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
              <span className="skills-intro-line block text-accent italic whitespace-normal md:whitespace-nowrap">
                Technical Stack.
              </span>
            </span>
          </h2>
          <p className="skills-intro-p mt-8 text-foreground/40 text-lg md:text-xl font-light max-w-xl font-sans">
            A deep dive into the languages, engines, and frameworks I use to
            translate complex problems into elegant digital solutions.
          </p>
        </div>

        <div className="skills-content grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 w-full z-10">
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center border-l border-foreground/5 pl-8 space-y-10">
            {skillGroups.map((item, i) => (
              <h3
                key={item.id}
                className={`text-2xl md:text-5xl font-light tracking-tighter uppercase [word-spacing:0.14em] transition-all duration-500 ${
                  activeIndex === i
                    ? "text-accent opacity-100"
                    : "text-foreground opacity-30"
                }`}
              >
                {item.group}
              </h3>
            ))}
          </div>

          <div className="lg:col-span-7 h-100 flex items-center relative">
            {skillGroups.map((item, i) => (
              <div
                key={item.id}
                className={`skill-block absolute inset-0 flex flex-col justify-center space-y-6 md:space-y-8 transition-all duration-500 ${
                  activeIndex === i
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <h3 className="block lg:hidden text-3xl font-light tracking-tighter uppercase text-accent [word-spacing:0.14em]">
                  {item.group}
                </h3>

                <p className="text-foreground text-lg md:text-2xl leading-relaxed max-w-xl font-light italic">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-3">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 border border-accent/20 text-foreground text-[12px] font-mono tracking-[0.3em] rounded-sm uppercase"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-4">
                  <div className="h-px w-12 bg-accent" />
                  <span className="text-[9px] font-mono text-foreground/50 uppercase tracking-[0.5em]">
                    STATION_{item.id}_OPTIMIZED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="skills-bgdigit absolute right-0 bottom-0 pointer-events-none select-none flex justify-end pr-6 md:pr-14 lg:pr-20">
        <RollingDigit
          digit={skillGroups[activeIndex].id.slice(1)}
          className="block text-[30vw] font-bold text-foreground italic leading-none font-sans"
        />
      </div>
    </section>
  );
}
