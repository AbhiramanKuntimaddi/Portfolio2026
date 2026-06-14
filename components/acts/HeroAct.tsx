"use client";

import { NowPlaying } from "@/components/ui/NowPlaying";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function HeroAct({
  onNext,
  onContact,
}: {
  onNext?: () => void;
  onContact?: () => void;
}) {
  return (
    <section className="hero-act absolute inset-0 flex flex-col p-6 md:p-10 lg:p-16 overflow-y-auto xl:overflow-hidden">
      <div className="hero-content flex-1 flex flex-col justify-center max-w-350 mx-auto w-full py-4 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start md:items-end mb-8 md:mb-12 lg:mb-20 xl:mb-28">
          <div className="md:col-span-8">
            <h2 className="hero-name font-bold text-foreground leading-[0.85] uppercase tracking-wider text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
              <span className="block overflow-hidden py-[0.1em] pr-[0.05em]">
                <span className="hero-name-line block">Abhiraman</span>
              </span>
              <span className="block overflow-hidden py-[0.1em] pr-[0.2em] -mr-[0.2em]">
                <span className="hero-name-line block text-accent tracking-widest whitespace-nowrap">
                  Kuntimaddi
                </span>
              </span>
            </h2>
            <div className="flex items-center gap-6 mt-4 md:mt-6">
              <div className="hero-sub-line h-px w-12 bg-accent/50" />
              <p className="hero-sub-text text-sm md:text-base lg:text-lg tracking-[0.3em] text-accent font-medium uppercase">
                Software Developer
              </p>
            </div>
          </div>

          <div className="hero-meta-right md:col-span-4 flex flex-col gap-3 items-start md:items-end md:text-right md:pb-2">
            <p className="text-xs lg:text-base text-foreground/60 font-mono uppercase tracking-[0.2em] leading-relaxed">
              Based in Germany
              <br />
              M.Sc Computer Sciences
            </p>
            <div className="hero-status block">
              <div className="block md:hidden">
                <StatusBadge align="left" />
              </div>
              <div className="hidden md:block">
                <StatusBadge align="right" />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-obj grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 lg:gap-24 items-start md:items-end">
          <div className="md:col-span-8">
            <h3 className="hero-obj-label text-accent font-bold tracking-[0.4em] text-[10px] uppercase mb-4 md:mb-6 opacity-60">
              The Objective
            </h3>
            <h1 className="hero-obj-h1 text-[clamp(1.4rem,3.8vw,2.8rem)] font-medium uppercase leading-[1.2] text-foreground tracking-[-0.02em] max-w-4xl">
              Bridging the gap between
              <span className="text-foreground/40 font-light italic tracking-[0.03em]">
                {" "}
                complex backend architecture{" "}
              </span>
              and
              <span className="text-accent italic font-semibold tracking-[0.05em]">
                {" "}
                seamless human interaction
              </span>
              .
            </h1>
          </div>

          <div className="md:col-span-4 flex md:justify-end items-end">
            <button
              type="button"
              onClick={onContact}
              className="hero-cta group relative flex items-baseline font-mono cursor-pointer"
            >
              <span className="text-accent mr-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-bold select-none">
                &gt;
              </span>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-accent text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-500 group-hover:text-white">
                    Start_Conversation
                  </span>
                  <span className="text-accent/40 select-none">();</span>
                </div>
                <div className="mt-1 h-px w-full bg-accent/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="hero-strip mt-8 md:mt-12 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-center border-t border-foreground/5 pt-6 md:pt-8">
          <div className="hero-strip-item flex flex-col gap-1 md:gap-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-accent/50 font-bold">
              Professional Roots
            </span>
            <span className="text-xs lg:text-sm text-foreground/60 font-medium tracking-wide leading-snug">
              Building industrial systems &amp; scalable solutions
            </span>
          </div>

          <div className="hero-strip-item flex flex-col gap-1 md:gap-2 justify-start md:justify-center items-start md:items-center order-first md:order-0">
            <span className="text-[11px] font-bold font-mono text-accent/50 tracking-[0.25em] uppercase">
              Now_Playing<span className="text-accent/30 select-none">();</span>
            </span>
            <div className="flex pt-0.5">
              <NowPlaying />
            </div>
          </div>

          <div className="hero-strip-item flex flex-col gap-1 md:gap-2 md:text-right md:items-end">
            <span className="text-[11px] uppercase tracking-[0.25em] text-accent/50 font-bold">
              Creative Focus
            </span>
            <span className="text-xs lg:text-sm text-foreground/60 font-medium tracking-wide leading-snug">
              Crafting interfaces, websites &amp; digital experiences
            </span>
          </div>
        </div>
      </div>

      <div className="hero-nav flex justify-center pt-6 md:pt-10 pb-2">
        <button
          onClick={onNext}
          aria-label="Scroll to next section"
          className="group relative flex items-baseline font-mono cursor-pointer"
        >
          <span className="text-accent mr-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-bold select-none">
            &gt;
          </span>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-accent/60 text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-500 group-hover:text-foreground">
                Navigate_Down
              </span>
              <span className="text-accent/30 select-none text-[10px]">
                ();
              </span>
            </div>
            <div className="mt-1 h-px w-full bg-accent/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}
