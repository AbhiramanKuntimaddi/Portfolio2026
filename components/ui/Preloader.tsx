"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { loaderSignal } from "@/lib/loaderSignal";

const greetings = [
  "Hello",
  "Hallo",
  "Bonjour",
  "Hola",
  "Ciao",
  "Olá",
  "Hej",
  "Salut",
  "Привет",
  "こんにちは",
];

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const greetRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const seen =
        typeof sessionStorage !== "undefined" &&
        sessionStorage.getItem("ak_preloaded");

      if (
        seen ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        gsap.set(rootRef.current, { display: "none" });
        loaderSignal.complete();
        return;
      }

      try {
        sessionStorage.setItem("ak_preloaded", "1");
      } catch {}

      const counter = { v: 0 };
      const LOAD = 3.4;

      const greetTl = gsap.timeline();
      const slot = LOAD / greetings.length;
      greetings.forEach((g) => {
        greetTl
          .set(greetRef.current, { textContent: g })
          .fromTo(
            greetRef.current,
            { yPercent: 60, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: slot * 0.45,
              ease: "power3.out",
            },
          )
          .to(
            greetRef.current,
            {
              yPercent: -60,
              autoAlpha: 0,
              duration: slot * 0.35,
              ease: "power3.in",
            },
            `+=${slot * 0.2}`,
          );
      });

      gsap
        .timeline()
        .to(
          barRef.current,
          { scaleX: 1, duration: LOAD, ease: "power1.inOut" },
          0,
        )
        .to(
          counter,
          {
            v: 100,
            duration: LOAD,
            ease: "power1.inOut",
            onUpdate: () => {
              if (numRef.current)
                numRef.current.textContent = String(
                  Math.round(counter.v),
                ).padStart(3, "0");
            },
          },
          0,
        )
        .add(greetTl, 0)
        .to(
          [".pl-top", ".pl-num", ".pl-greet"],
          { opacity: 0, duration: 0.5, ease: "power2.in" },
          ">+0.2",
        )
        .to(
          rootRef.current,
          {
            yPercent: -100,
            duration: 1,
            ease: "expo.inOut",
            onComplete: () => loaderSignal.complete(),
          },
          ">-0.1",
        );
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-100 bg-background flex flex-col justify-between p-6 md:p-12 lg:p-16"
    >
      <div className="pl-top flex justify-between items-center">
        <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-accent/70">
          Portfolio_System
        </span>
        <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-foreground/40">
          V.2026
        </span>
      </div>

      <div className="flex flex-col gap-6">
        <div className="pl-greet flex items-center gap-4">
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
          <span className="inline-flex overflow-hidden py-[0.12em]">
            <span
              ref={greetRef}
              className="inline-block text-4xl md:text-6xl font-light text-foreground tracking-tight"
            >
              Hello
            </span>
          </span>
        </div>

        <div className="pl-num flex items-end justify-between">
          <span
            ref={numRef}
            className="text-[22vw] md:text-[14vw] font-bold leading-[0.8] text-foreground tracking-tight tabular-nums"
          >
            000
          </span>
          <span className="hidden sm:block mb-4 text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/40">
            Loading_Assets
          </span>
        </div>
      </div>

      <div className="w-full h-px bg-foreground/10 relative overflow-hidden">
        <div
          ref={barRef}
          className="absolute inset-0 bg-accent origin-left scale-x-0"
        />
      </div>
    </div>
  );
}
