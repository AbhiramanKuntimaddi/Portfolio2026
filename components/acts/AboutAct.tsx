"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useContent } from "@/components/providers/ContentProvider";

function MaskWords({
  text,
  className,
  accentFrom,
  emphasis,
}: {
  text: string;
  className: string;
  accentFrom?: number;
  emphasis?: string[];
}) {
  const emph = new Set((emphasis ?? []).map((w) => w.toLowerCase()));
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => {
        const bare = word.replace(/[^\p{L}-]/gu, "").toLowerCase();
        const isEmph = emph.has(bare);
        return (
          <span
            key={i}
            className="mask-word inline-block overflow-visible mr-[0.25em]"
          >
            <span
              {...(isEmph ? { "data-cursor": "word" } : {})}
              className={`word inline-block transition-colors duration-300 ${
                isEmph
                  ? "text-accent font-medium not-italic border-b border-accent/40 hover:border-accent hover:text-foreground"
                  : accentFrom !== undefined && i >= accentFrom
                    ? "text-accent italic font-medium"
                    : ""
              }`}
            >
              {word}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function AboutAct() {
  const { c } = useContent();
  const a = c.about;
  const rootRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const tiltX = useRef<(v: number) => void>(null);
  const tiltY = useRef<(v: number) => void>(null);

  useGSAP(
    () => {
      if (!window.matchMedia("(pointer: coarse)").matches) {
        tiltX.current = gsap.quickTo(imgRef.current, "rotationX", {
          duration: 0.4,
          ease: "power3.out",
        });
        tiltY.current = gsap.quickTo(imgRef.current, "rotationY", {
          duration: 0.4,
          ease: "power3.out",
        });
      }
    },
    { scope: rootRef },
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    tiltX.current?.(gsap.utils.clamp(-5, 5, -(y / 150) * 5));
    tiltY.current?.(gsap.utils.clamp(-5, 5, (x / 150) * 5));
  };
  const handleMouseLeave = () => {
    tiltX.current?.(0);
    tiltY.current?.(0);
  };

  return (
    <section
      ref={rootRef}
      className="about-act absolute inset-0 flex items-center justify-center"
    >
      <div className="about-content frame flex flex-col items-center justify-center gap-12 xl:flex-row xl:gap-24">
        <div className="relative flex w-full justify-center xl:w-auto xl:shrink-0">
          <div
            ref={imgRef}
            data-cursor="default"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="about-img relative w-full max-w-48 sm:max-w-60 lg:max-w-72 xl:w-80 xl:max-w-none"
            style={{ perspective: 1000, transformStyle: "preserve-3d" }}
          >
            <div className="relative">
              <span
                aria-hidden
                className="absolute -top-3 -left-3 h-4 w-4 border-t border-l border-accent"
              />
              <span
                aria-hidden
                className="absolute -top-3 -right-3 h-4 w-4 border-t border-r border-accent"
              />
              <span
                aria-hidden
                className="absolute -bottom-3 -left-3 h-4 w-4 border-b border-l border-accent"
              />
              <span
                aria-hidden
                className="absolute -bottom-3 -right-3 h-4 w-4 border-b border-r border-accent"
              />
              <div
                className="about-img-inner relative aspect-4/5 overflow-hidden rounded-sm border border-line"
                style={{ transform: "translateZ(20px)" }}
              >
                <Image
                  src="/images/Profile.jpg"
                  alt={a.photoAlt}
                  fill
                  priority
                  sizes="(max-width: 640px) 192px, (max-width: 1024px) 240px, 320px"
                  className="about-photo object-cover"
                />
              </div>
            </div>
            <p className="mt-7 font-label text-[10px] tracking-[0.2em] text-muted uppercase">
              <span className="text-accent">user:</span> abhiraman kuntimaddi
            </p>
          </div>
        </div>

        <div className="flex w-full max-w-2xl flex-col justify-center space-y-8 lg:space-y-10">
          <div className="about-quote max-w-2xl">
            <span
              data-decode
              className="about-quote-label font-label text-accent font-bold tracking-[0.35em] text-[10px] uppercase mb-6 block opacity-60"
            >
              {a.label}
            </span>
            <blockquote className="font-display text-[clamp(1.2rem,2.8vw,2.4rem)] font-light leading-snug text-foreground tracking-tight">
              <MaskWords
                text={a.quote}
                className="inline"
                accentFrom={Number(a.quoteAccentFrom)}
              />
            </blockquote>
            <cite className="about-cite mt-6 flex items-center gap-4 text-xs text-muted not-italic">
              <span className="h-px w-8 bg-foreground/20" />
              <span className="tracking-widest uppercase text-[10px]">
                Steve Jobs
              </span>
            </cite>
          </div>

          <div className="border-l border-line pl-6 lg:pl-8 max-w-xl flex flex-col gap-4 lg:gap-6">
            <p className="font-body text-foreground/90 text-[clamp(1.05rem,1.6vw,1.35rem)] leading-relaxed">
              <MaskWords
                className="about-p1"
                text={a.p1}
                emphasis={a.p1Emphasis.split(",")}
              />
            </p>
            <p className="font-body text-foreground/70 text-[clamp(0.95rem,1.4vw,1.15rem)] leading-relaxed">
              <MaskWords
                className="about-p2"
                text={a.p2}
                emphasis={a.p2Emphasis.split(",")}
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
