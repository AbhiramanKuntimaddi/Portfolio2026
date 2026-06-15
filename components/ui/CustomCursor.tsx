"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function CustomCursor() {
  const root = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
        return;

      const r = root.current!;
      const rg = ring.current!;
      const dt = dot.current!;
      const lb = label.current!;

      document.documentElement.classList.add("cursor-none");
      gsap.set([rg, dt], { xPercent: -50, yPercent: -50 });

      const rx = gsap.quickTo(rg, "x", { duration: 0.5, ease: "power3.out" });
      const ry = gsap.quickTo(rg, "y", { duration: 0.5, ease: "power3.out" });
      const dx = gsap.quickTo(dt, "x", { duration: 0.12, ease: "power3.out" });
      const dy = gsap.quickTo(dt, "y", { duration: 0.12, ease: "power3.out" });

      let shown = false;

      const resolve = (t: HTMLElement) => {
        const o = t.closest<HTMLElement>("[data-cursor]");
        if (o) {
          const v = o.dataset.cursor;
          if (v === "view") return ["view", "view"];
          if (v === "link") return ["link", ""];
          if (v === "word") return ["word", ""];
          if (v === "text") return ["text", ""];
          return ["default", ""];
        }
        if (t.closest("img")) return ["view", "view"];
        if (t.closest("a, button, [role='button'], label, summary"))
          return ["link", ""];
        if (
          t.closest(
            "input, textarea, [contenteditable='true'], p, h1, h2, h3, h4",
          )
        )
          return ["text", ""];
        return ["default", ""];
      };

      const onMove = (e: MouseEvent) => {
        if (!shown) {
          shown = true;
          gsap.to(r, { autoAlpha: 1, duration: 0.3 });
        }
        rx(e.clientX);
        ry(e.clientY);
        dx(e.clientX);
        dy(e.clientY);

        const [state, text] = resolve(e.target as HTMLElement);
        if (r.dataset.state !== state) {
          r.dataset.state = state;
          lb.textContent = text;
        }
      };

      const onLeave = () => gsap.to(r, { autoAlpha: 0, duration: 0.25 });
      const onDown = () => gsap.to(rg, { scale: 0.8, duration: 0.2 });
      const onUp = () => gsap.to(rg, { scale: 1, duration: 0.3 });

      window.addEventListener("mousemove", onMove);
      document.addEventListener("mouseleave", onLeave);
      window.addEventListener("mousedown", onDown);
      window.addEventListener("mouseup", onUp);

      return () => {
        document.documentElement.classList.remove("cursor-none");
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseleave", onLeave);
        window.removeEventListener("mousedown", onDown);
        window.removeEventListener("mouseup", onUp);
      };
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      data-state="default"
      className="cur-root pointer-events-none fixed inset-0 z-120 opacity-0 invisible"
    >
      <div
        ref={ring}
        className="cur-ring fixed top-0 left-0 flex items-center justify-center"
      >
        <span
          ref={label}
          className="cur-label font-mono text-[9px] tracking-widest uppercase text-accent"
        />
      </div>
      <div ref={dot} className="cur-dot fixed top-0 left-0" />
    </div>
  );
}
