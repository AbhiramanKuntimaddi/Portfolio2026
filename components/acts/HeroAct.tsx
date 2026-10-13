"use client";

import { useLayoutEffect, useRef } from "react";
import { NowPlaying } from "@/components/ui/NowPlaying";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useContent } from "@/components/providers/ContentProvider";

export function HeroAct({ onContact }: { onContact?: () => void }) {
  const { c } = useContent();
  const h = c.hero;
  const nameRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const name = nameRef.current;
    if (!name) return;
    const lines = Array.from(
      name.querySelectorAll<HTMLElement>(".hero-name-line"),
    );
    let frame = 0;
    const fit = () => {
      name.style.fontSize = "";
      const ratio = Math.min(
        1,
        ...lines.map((l) =>
          l.scrollWidth > 0 ? l.clientWidth / l.scrollWidth : 1,
        ),
      );
      if (ratio < 1) {
        const base = parseFloat(getComputedStyle(name).fontSize);
        name.style.fontSize = `${Math.floor(base * ratio * 0.98)}px`;
      }
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };
    fit();
    const resize = new ResizeObserver(schedule);
    resize.observe(name);
    const lab = new MutationObserver(schedule);
    lab.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    document.fonts?.ready.then(schedule);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      lab.disconnect();
    };
  }, []);

  return (
    <section className="hero-act absolute inset-0 flex flex-col overflow-y-auto xl:overflow-hidden">
      <div className="hero-content frame flex flex-1 flex-col pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="flex flex-1 flex-col justify-center gap-12 md:gap-16 xl:gap-20">
          <div className="grid grid-cols-1 items-end gap-8 xl:grid-cols-12 xl:gap-6">
            <div className="xl:col-span-8">
              <h2
                ref={nameRef}
                className="hero-name font-heading text-4xl leading-[0.9] font-bold tracking-wider text-foreground uppercase sm:text-5xl lg:text-6xl xl:text-[clamp(4.5rem,6vw,8rem)]"
              >
                <span className="block overflow-hidden py-[0.14em] pr-[0.05em]">
                  <span className="hero-name-line block">Abhiraman</span>
                </span>
                <span className="-mr-[0.2em] block overflow-hidden py-[0.14em] pr-[0.2em]">
                  <span className="hero-name-line block tracking-widest whitespace-nowrap text-accent">
                    Kuntimaddi
                  </span>
                </span>
              </h2>
              <div className="mt-5 flex items-center gap-5 md:mt-6">
                <div className="hero-sub-line h-px w-12 bg-accent/50" />
                <p
                  data-decode
                  className="hero-sub-text text-sm font-medium tracking-[0.3em] text-accent uppercase md:text-base lg:text-lg"
                >
                  {h.role}
                </p>
              </div>
            </div>

            <div className="hero-meta-right flex flex-col items-start gap-4 xl:col-span-4 xl:items-end xl:text-right">
              <p className="font-label text-xs leading-relaxed tracking-[0.2em] text-foreground/60 uppercase lg:text-sm">
                {h.based}
                <br />
                {h.degree}
              </p>
              <div className="hero-status block">
                <div className="block xl:hidden">
                  <StatusBadge align="left" />
                </div>
                <div className="hidden xl:block">
                  <StatusBadge align="right" />
                </div>
              </div>
            </div>
          </div>

          <div className="hero-obj grid grid-cols-1 items-end gap-8 xl:grid-cols-12 xl:gap-6">
            <div className="xl:col-span-8">
              <h3
                data-decode
                className="hero-obj-label mb-4 font-label text-[10px] font-bold tracking-[0.4em] text-accent uppercase opacity-60 md:mb-6"
              >
                {h.objectiveLabel}
              </h3>
              <h1 className="hero-obj-h1 max-w-6xl font-display text-[clamp(1.4rem,3.2vw,3.2rem)] leading-[1.2] font-medium tracking-[-0.02em] text-foreground uppercase">
                {h.objective.lead}
                <span className="font-light tracking-[0.03em] text-muted italic">
                  {" "}
                  {h.objective.muted}{" "}
                </span>
                {h.objective.join}
                <span className="font-semibold tracking-[0.05em] text-accent italic">
                  {" "}
                  {h.objective.accent}
                </span>
                .
              </h1>
            </div>

            <div className="flex xl:col-span-4 xl:justify-end">
              <button
                type="button"
                onClick={onContact}
                className="hero-cta group relative flex cursor-pointer items-baseline font-label"
              >
                <span className="mr-2 -translate-x-2 font-bold text-accent opacity-0 transition-all duration-300 select-none group-hover:translate-x-0 group-hover:opacity-100">
                  &gt;
                </span>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[11px] font-bold tracking-[0.3em] text-accent uppercase transition-colors duration-500 group-hover:text-foreground md:text-xs">
                      {h.cta}
                    </span>
                    <span className="text-accent/40 select-none">();</span>
                  </div>
                  <div className="relative mt-1 h-px w-full overflow-hidden bg-accent/20">
                    <div className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="hero-strip mt-12 grid grid-cols-1 items-start gap-6 border-t border-line pt-6 md:mt-16 md:grid-cols-3 md:gap-10 md:pt-8">
          <div className="hero-strip-item flex flex-col gap-1.5 md:gap-2">
            <span className="font-label text-[11px] tracking-[0.25em] text-accent/60 uppercase">
              {h.rootsLabel}
            </span>
            <span className="text-xs leading-snug font-medium tracking-wide text-foreground/60 lg:text-sm">
              {h.roots}
            </span>
          </div>

          <div className="hero-strip-item order-first flex flex-col items-start gap-1.5 md:order-0 md:items-center md:gap-2">
            <span className="font-label text-[11px] tracking-[0.25em] text-accent/60 uppercase">
              {h.nowPlaying}
              <span className="text-accent/30 select-none">();</span>
            </span>
            <div className="flex pt-0.5">
              <NowPlaying />
            </div>
          </div>

          <div className="hero-strip-item flex flex-col gap-1.5 md:items-end md:gap-2 md:text-right">
            <span className="font-label text-[11px] tracking-[0.25em] text-accent/60 uppercase">
              {h.focusLabel}
            </span>
            <span className="text-xs leading-snug font-medium tracking-wide text-foreground/60 lg:text-sm">
              {h.focus}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
