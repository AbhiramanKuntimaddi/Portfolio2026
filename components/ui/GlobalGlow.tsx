"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function GlobalGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const sizeCurrent = useRef(250);
  const sizeTarget = useRef(250);
  const opacityCurrent = useRef(0.12);
  const opacityTarget = useRef(0.12);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const el = ref.current!;
      pos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

      const xTo = gsap.quickTo(pos.current, "x", {
        duration: 0.8,
        ease: "power2.out",
      });
      const yTo = gsap.quickTo(pos.current, "y", {
        duration: 0.8,
        ease: "power2.out",
      });

      const tick = () => {
        sizeCurrent.current +=
          (sizeTarget.current - sizeCurrent.current) * 0.04;
        opacityCurrent.current +=
          (opacityTarget.current - opacityCurrent.current) * 0.04;

        el.style.setProperty("--glow-x", `${pos.current.x}px`);
        el.style.setProperty("--glow-y", `${pos.current.y}px`);
        el.style.setProperty("--glow-size", `${sizeCurrent.current}px`);
        el.style.setProperty("--glow-opacity", `${opacityCurrent.current}`);
      };

      gsap.ticker.add(tick);

      const onMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);

        const target = e.target as HTMLElement;
        const isInteractive = target.closest(
          "a, button, [role='button'], .hero-name-line, .hero-obj-h1 span",
        );

        if (isInteractive) {
          sizeTarget.current = 260;
          opacityTarget.current = 0.16;
        } else {
          sizeTarget.current = 250;
          opacityTarget.current = 0.12;
        }
      };

      window.addEventListener("mousemove", onMove);

      return () => {
        window.removeEventListener("mousemove", onMove);
        gsap.ticker.remove(tick);
      };
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(var(--glow-size,250px)_circle_at_var(--glow-x,50%)_var(--glow-y,50%),rgba(var(--accent-rgb,0,102,255),var(--glow-opacity,0.12))_0%,rgba(var(--accent-rgb,0,102,255),calc(var(--glow-opacity)*0.3))_45%,rgba(var(--accent-rgb,0,102,255),0)_80%)] mix-blend-screen will-change-[background]"
    />
  );
}
