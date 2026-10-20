"use client";

import { useEffect, useRef } from "react";

const RADIUS = 150;
const PUSH = 4;
const MAJOR = 8;

export function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const probe = document.createElement("div");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText =
      "position:fixed;left:0;top:0;width:0;visibility:hidden;pointer-events:none";
    document.body.appendChild(probe);

    const still =
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !matchMedia("(hover: hover) and (pointer: fine)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let gap = 32;
    let fg = "#fff";
    let accent = "#fff";
    let raf = 0;
    const p = { x: -9999, y: -9999, tx: -9999, ty: -9999, on: 0, ton: 0 };

    const readTokens = () => {
      probe.style.color = "var(--color-foreground)";
      fg = getComputedStyle(probe).color;
      probe.style.color = "var(--color-accent)";
      accent = getComputedStyle(probe).color;
      probe.style.height = "calc(var(--grid-baseline, 0.5rem) * 5)";
      gap = Math.max(16, probe.offsetHeight || 32);
    };

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
    };

    const draw = () => {
      if (w < 1 || h < 1) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const ox = (w % gap) / 2;
      const oy = (h % gap) / 2;
      const r2 = RADIUS * RADIUS;
      const live = p.on > 0.01;
      const hot: number[] = [];

      ctx.fillStyle = fg;
      for (let r = 0, y = oy; y <= h; r++, y += gap) {
        for (let c = 0, x = ox; x <= w; c++, x += gap) {
          if (live) {
            const dx = x - p.x;
            const dy = y - p.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < r2) {
              const d = Math.sqrt(d2) || 1;
              const t = 1 - d / RADIUS;
              const e = t * t * (3 - 2 * t) * p.on;
              hot.push(x + (dx / d) * PUSH * e, y + (dy / d) * PUSH * e, e);
              continue;
            }
          }
          if (r % MAJOR === 0 && c % MAJOR === 0) {
            ctx.globalAlpha = 0.12;
            ctx.fillRect(x - 3, y - 0.5, 6, 1);
            ctx.fillRect(x - 0.5, y - 3, 1, 6);
          } else {
            ctx.globalAlpha = 0.06;
            ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
          }
        }
      }

      for (let i = 0; i < hot.length; i += 3) {
        const e = hot[i + 2];
        const s = 1.5 + e * 1.5;
        ctx.fillStyle = fg;
        ctx.globalAlpha = 0.06 + e * 0.14;
        ctx.fillRect(hot[i] - s / 2, hot[i + 1] - s / 2, s, s);
        ctx.fillStyle = accent;
        ctx.globalAlpha = e * 0.55;
        ctx.fillRect(hot[i] - s / 2, hot[i + 1] - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      p.x += (p.tx - p.x) * 0.2;
      p.y += (p.ty - p.y) * 0.2;
      p.on += (p.ton - p.on) * 0.08;
      draw();
      const settled =
        Math.abs(p.tx - p.x) < 0.3 &&
        Math.abs(p.ty - p.y) < 0.3 &&
        Math.abs(p.ton - p.on) < 0.005;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      if (p.on < 0.01) {
        p.x = e.clientX;
        p.y = e.clientY;
      }
      p.tx = e.clientX;
      p.ty = e.clientY;
      p.ton = 1;
      kick();
    };
    const onLeave = () => {
      p.ton = 0;
      kick();
    };
    const onResize = () => {
      size();
      draw();
    };

    readTokens();
    size();
    draw();
    canvas.style.opacity = "1";

    const mo = new MutationObserver(() => {
      readTokens();
      draw();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style", "class", "data-surface", "data-theme"],
    });
    mo.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    window.addEventListener("resize", onResize);
    if (!still) {
      window.addEventListener("mousemove", onMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      probe.remove();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-0 transition-opacity duration-1000"
    />
  );
}
