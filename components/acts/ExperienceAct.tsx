"use client";

import { experiences } from "@/lib/data/experiences";
import { RollingDigit } from "@/components/ui/RollingDigit";

export function ExperienceAct({ activeIndex }: { activeIndex: number }) {
  const currentYear = experiences[activeIndex].year;

  return (
    <section className="exp-act absolute inset-0 overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-20 relative h-full flex items-center">
        <div className="exp-intro absolute inset-0 flex flex-col justify-center px-6 md:px-20 z-30 pointer-events-none">
          <span className="exp-intro-label text-accent font-bold tracking-[0.35em] text-[10px] uppercase mb-6 block opacity-60">
            The work experience
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground font-sans tracking-tight uppercase leading-[0.95] md:leading-[1.0] w-full [word-spacing:0.14em]">
            <span className="block overflow-hidden pb-[0.05em]">
              <span className="exp-intro-line block whitespace-normal md:whitespace-nowrap">
                Scaling systems through
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
              <span className="exp-intro-line block text-accent italic whitespace-normal md:whitespace-nowrap">
                architectural precision.
              </span>
            </span>
          </h2>
          <p className="exp-intro-p mt-8 text-foreground/40 text-lg md:text-xl font-light max-w-xl font-sans">
            From high-load Java environments to spatial computing research,
            explore the timeline of my technical journey.
          </p>
        </div>

        <div className="exp-content grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 w-full z-10">
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-center border-l border-foreground/10 pl-8">
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <h3
                  key={exp.id}
                  className={`text-xl md:text-2xl font-semibold tracking-tight uppercase font-sans [word-spacing:0.14em] transition-all duration-500 ${
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

          <div className="lg:col-span-8 h-125 flex items-center relative ml-0 lg:ml-12">
            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                className={`exp-block absolute inset-0 flex flex-col justify-center space-y-6 transition-all duration-500 ${
                  activeIndex === i
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <h3 className="block lg:hidden text-2xl font-semibold tracking-tight uppercase font-sans text-accent [word-spacing:0.14em]">
                  {exp.title}
                </h3>

                <div className="flex items-center gap-4">
                  <span className="text-accent font-mono text-[10px] font-bold tracking-[0.4em] uppercase">
                    {exp.year} / {exp.context}
                  </span>
                  <div className="h-px w-16 bg-accent/30" />
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-[0.95] tracking-tighter uppercase font-sans [word-spacing:0.14em]">
                  {exp.company}
                </h2>
                <p className="text-foreground/60 text-lg md:text-2xl font-light leading-relaxed max-w-xl italic font-sans">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="exp-bgyear absolute right-0 bottom-0 pointer-events-none select-none flex justify-end tracking-[-0.05em] pr-6 md:pr-14 lg:pr-20">
        {currentYear.split("").map((d, i) => (
          <RollingDigit
            key={i}
            digit={d}
            className="block text-[32vw] md:text-[25vw] font-bold text-foreground italic leading-none font-sans"
          />
        ))}
      </div>
    </section>
  );
}
