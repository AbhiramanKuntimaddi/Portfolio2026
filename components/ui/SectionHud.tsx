"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { loaderSignal } from "@/lib/loaderSignal";
import { decodeIn, makeDecoder } from "@/lib/decode";
import { useContent } from "@/components/providers/ContentProvider";

export interface NavItem {
  label: string;
  name: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function SectionHud({
  items,
  positions,
  getProgress,
  onJump,
}: {
  items: NavItem[];
  positions: number[];
  getProgress: () => number;
  onJump: (label: string) => void;
}) {
  const { c } = useContent();
  const root = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLSpanElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const closer = useRef(0);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      if (!positions.length) return;
      const r = root.current!;
      const decoder = makeDecoder(name.current!);
      const proxy = { p: 1 };
      let swap: gsap.core.Tween | null = null;
      let current = 0;

      const which = (p: number) => {
        let a = 0;
        for (let i = 1; i < positions.length; i++) {
          if (p >= (positions[i - 1] + positions[i]) / 2) a = i;
        }
        return a;
      };

      const tick = () => {
        const a = which(getProgress());
        if (a === current) return;
        current = a;
        setActive(a);
        swap?.kill();
        swap = gsap.fromTo(
          proxy,
          { p: 0 },
          {
            p: 1,
            duration: 0.5,
            ease: "none",
            onUpdate: () => decoder.render(proxy.p),
          },
        );
      };

      gsap.set(r, { autoAlpha: 0 });
      const off = loaderSignal.onComplete(() =>
        gsap.to(r, { autoAlpha: 1, duration: 0.6, delay: 0.8 }),
      );
      gsap.ticker.add(tick);

      return () => {
        off();
        swap?.kill();
        gsap.ticker.remove(tick);
      };
    },
    { scope: root, dependencies: [positions] },
  );

  useGSAP(
    () => {
      if (!open || !list.current) return;
      const restores: (() => void)[] = [];
      const tl = gsap.timeline();
      decodeIn(
        tl,
        Array.from(list.current.querySelectorAll("[data-entry]")),
        0.15,
        restores,
        { duration: 0.3, stagger: 0.045 },
      );
      return () => {
        tl.kill();
        restores.forEach((r) => r());
      };
    },
    { scope: root, dependencies: [open] },
  );

  const show = () => {
    window.clearTimeout(closer.current);
    setOpen(true);
  };
  const hide = () => {
    window.clearTimeout(closer.current);
    closer.current = window.setTimeout(() => setOpen(false), 140);
  };
  const jump = (label: string) => {
    setOpen(false);
    onJump(label);
  };

  return (
    <div
      ref={root}
      onPointerEnter={show}
      onPointerLeave={hide}
      onFocus={show}
      onBlur={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node)) hide();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
      className="fixed top-8 left-[var(--frame-x,2rem)] z-70 hidden font-label text-[11px] tracking-[0.12em] lowercase opacity-0 md:block"
    >
      <button
        type="button"
        onClick={() => jump("hero")}
        aria-label={c.nav.backToTop}
        aria-expanded={open}
        data-cursor="link"
        className="group flex cursor-pointer items-center select-none"
      >
        <span className="text-muted transition-colors duration-300 group-hover:text-accent">
          ~/abhiraman/
        </span>
        <span ref={name} className="text-foreground/85">
          {items[active]?.name ?? ""}
        </span>
        <span aria-hidden className="np-caret ml-1.5 inline-block" />
      </button>

      <div
        className={`absolute top-full left-0 pt-3 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`min-w-60 border border-line bg-background/95 px-4 py-3 transition-[opacity,translate] duration-200 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
          }`}
        >
          <p
            aria-hidden
            className="whitespace-nowrap text-muted"
            style={{
              clipPath: open ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
              transition: open ? "clip-path 0.28s steps(16)" : "none",
            }}
          >
            <span className="text-accent">$</span> ls ~/abhiraman
          </p>
          <ul ref={list} className="mt-2.5 space-y-1">
            {items.map((it, i) => (
              <li
                key={it.label}
                style={{ transitionDelay: open ? `${150 + i * 45}ms` : "0ms" }}
                className={`transition-[opacity,translate] duration-300 ${
                  open
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-1 opacity-0"
                }`}
              >
                <button
                  type="button"
                  data-cursor="link"
                  tabIndex={open ? 0 : -1}
                  onClick={() => jump(it.label)}
                  aria-current={i === active ? "true" : undefined}
                  className={`flex w-full cursor-pointer items-baseline gap-3 py-0.5 text-left transition-colors duration-200 ${
                    i === active
                      ? "text-accent"
                      : "text-foreground/65 hover:text-foreground"
                  }`}
                >
                  <span aria-hidden className="w-2 text-accent">
                    {i === active ? ">" : ""}
                  </span>
                  <span className="text-muted tabular-nums">{pad(i + 1)}</span>
                  <span data-entry>{it.name}/</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
