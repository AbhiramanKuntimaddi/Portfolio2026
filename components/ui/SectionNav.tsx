"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { loaderSignal } from "@/lib/loaderSignal";

export interface NavItem {
  label: string;
  name: string;
}

export function SectionNav({
  items,
  positions,
  getProgress,
  scrollToProgress,
  onJump,
}: {
  items: NavItem[];
  positions: number[];
  getProgress: () => number;
  scrollToProgress: (p: number) => void;
  onJump: (label: string) => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const lineBg = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const lines = useRef<(HTMLSpanElement | null)[]>([]);
  const labels = useRef<(HTMLSpanElement | null)[]>([]);
  const dragging = useRef(false);
  const [active, setActive] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      setEnabled(true);
  }, []);

  const ready = enabled && positions.length === items.length;
  const n = items.length;
  const even = items.map((_, i) => (n > 1 ? i / (n - 1) : 0));

  useGSAP(
    () => {
      if (!ready) return;

      const movers = items.map((_, i) => {
        const el = lines.current[i];
        if (!el) return null;
        gsap.set(el, { transformOrigin: "left center" });
        return {
          sx: gsap.quickTo(el, "scaleX", {
            duration: 0.45,
            ease: "power3.out",
          }),
          sy: gsap.quickTo(el, "scaleY", {
            duration: 0.45,
            ease: "power3.out",
          }),
        };
      });

      const toDisp = (p: number) => {
        if (p <= positions[0]) return 0;
        for (let i = 0; i < n - 1; i++) {
          if (p <= positions[i + 1]) {
            const span = positions[i + 1] - positions[i] || 1;
            return (
              even[i] + ((p - positions[i]) / span) * (even[i + 1] - even[i])
            );
          }
        }
        return 1;
      };
      const toReal = (d: number) => {
        if (d <= 0) return positions[0];
        for (let i = 0; i < n - 1; i++) {
          if (d <= even[i + 1]) {
            const span = even[i + 1] - even[i] || 1;
            return (
              positions[i] +
              ((d - even[i]) / span) * (positions[i + 1] - positions[i])
            );
          }
        }
        return positions[n - 1];
      };

      const lineEls = lines.current.filter(Boolean) as HTMLSpanElement[];
      const labelEls = labels.current.filter(Boolean) as HTMLSpanElement[];
      let introDone = false;

      gsap.set(root.current, { autoAlpha: 0, x: -8 });
      gsap.set(lineBg.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(lineEls, { scaleX: 0, autoAlpha: 0 });

      const clearLabel = (el: HTMLSpanElement) =>
        gsap.set(el, { clearProps: "opacity,transform" });

      const peekLabel = (el?: HTMLSpanElement) => {
        if (!el || !introDone) return;
        gsap.killTweensOf(el);
        gsap
          .timeline({ onComplete: () => clearLabel(el) })
          .fromTo(
            el,
            { opacity: 0, x: -6 },
            { opacity: 1, x: 0, duration: 0.2, ease: "power3.out" },
          )
          .to(el, { opacity: 0, x: 4, duration: 0.28, ease: "power2.in" }, "+=0.4");
      };

      const play = () => {
        gsap
          .timeline({
            onComplete: () => {
              introDone = true;
            },
          })
          .to(root.current, { autoAlpha: 1, x: 0, duration: 0.5, ease: "power3.out" }, 0)
          .to(lineBg.current, { scaleY: 1, duration: 0.7, ease: "power3.inOut" }, 0.1)
          .to(
            lineEls,
            {
              scaleX: 1,
              autoAlpha: 1,
              duration: 0.45,
              ease: "power3.out",
              stagger: 0.07,
            },
            0.45,
          )
          .to(
            lineEls,
            { scaleX: 3, duration: 0.22, ease: "power2.out", stagger: 0.06 },
            ">-0.1",
          )
          .to(
            lineEls,
            { scaleX: 1, duration: 0.4, ease: "power3.inOut", stagger: 0.06 },
            ">-0.15",
          );
      };
      const offLoad = loaderSignal.onComplete(play);

      let lastActive = -1;
      let lastPeek = -1;
      let cur = toDisp(Math.max(0, Math.min(1, getProgress())));
      const render = () => {
        const target = toDisp(Math.max(0, Math.min(1, getProgress())));
        cur += (target - cur) * 0.1;
        if (Math.abs(target - cur) < 0.0002) cur = target;

        if (fill.current) fill.current.style.transform = `scaleY(${cur})`;

        let a = 0;
        for (let i = 0; i < even.length; i++) if (cur >= even[i] - 0.001) a = i;
        if (a !== lastActive) {
          lastActive = a;
          setActive(a);
        }

        const peekIdx = Math.min(
          n - 1,
          Math.max(0, Math.floor(cur * (n - 1) + 0.3)),
        );
        if (peekIdx !== lastPeek) {
          lastPeek = peekIdx;
          peekLabel(labelEls[peekIdx]);
        }
      };

      gsap.ticker.add(render);

      const RANGE = 70;
      const onMagnet = (e: PointerEvent) => {
        const tr = track.current?.getBoundingClientRect();
        const nearColumn =
          !!tr && e.clientX > tr.left - 50 && e.clientX < tr.left + 200;

        let best = -1;
        let bestD = Infinity;
        lines.current.forEach((el, i) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const d = Math.abs(e.clientY - (r.top + r.height / 2));
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        });

        movers.forEach((m, i) => {
          if (!m) return;
          if (nearColumn && i === best && bestD < RANGE) {
            const f = 1 - bestD / RANGE;
            m.sx(1 + f * 1.5);
            m.sy(1 + f * 1.8);
          } else {
            m.sx(1);
            m.sy(1);
          }
        });
      };
      window.addEventListener("pointermove", onMagnet);

      const yToP = (clientY: number) => {
        const r = track.current!.getBoundingClientRect();
        return Math.max(0, Math.min(1, (clientY - r.top) / r.height));
      };
      const onDown = (e: PointerEvent) => {
        dragging.current = true;
        document.body.style.userSelect = "none";
        scrollToProgress(toReal(yToP(e.clientY)));
      };
      const onDrag = (e: PointerEvent) => {
        if (dragging.current) scrollToProgress(toReal(yToP(e.clientY)));
      };
      const onUp = () => {
        dragging.current = false;
        document.body.style.userSelect = "";
      };
      const tr = track.current;
      tr?.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onDrag);
      window.addEventListener("pointerup", onUp);

      return () => {
        offLoad();
        gsap.ticker.remove(render);
        window.removeEventListener("pointermove", onMagnet);
        tr?.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onDrag);
        window.removeEventListener("pointerup", onUp);
      };
    },
    { scope: root, dependencies: [ready] },
  );

  if (!enabled) return null;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50 transition-[backdrop-filter,background-color] duration-500"
        style={{
          backdropFilter: hovering ? "blur(10px)" : "blur(0px)",
          WebkitBackdropFilter: hovering ? "blur(10px)" : "blur(0px)",
          backgroundColor: hovering ? "rgba(4,8,17,0.25)" : "transparent",
        }}
      />
      <div
        ref={root}
        className="pointer-events-none fixed left-7 top-1/2 z-60 -translate-y-1/2 select-none"
      >
        <div
          ref={track}
          data-cursor="link"
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => setHovering(false)}
          className="pointer-events-auto relative h-56 w-px cursor-pointer"
        >
        <div ref={lineBg} className="absolute inset-0 w-px bg-foreground/15" />
        <div
          ref={fill}
          className="absolute left-0 top-0 h-full w-full origin-top bg-accent"
          style={{ transform: "scaleY(0)" }}
        />

        {ready &&
          items.map((item, i) => (
            <button
              key={item.label}
              type="button"
              data-cursor="link"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => onJump(item.label)}
              aria-label={`Go to ${item.name}`}
              style={{ top: `${even[i] * 100}%` }}
              className="group absolute left-0 flex -translate-y-1/2 cursor-pointer items-center py-1.5"
            >
              <span
                ref={(el) => {
                  lines.current[i] = el;
                }}
                className={`block h-px transition-colors duration-300 ${
                  i <= active
                    ? "w-4 bg-accent"
                    : "w-2.5 bg-foreground/40 group-hover:bg-accent"
                }`}
              />
              <span
                ref={(el) => {
                  labels.current[i] = el;
                }}
                className="pointer-events-none absolute left-13 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
