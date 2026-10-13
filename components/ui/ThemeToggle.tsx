"use client";

import { useSyncExternalStore } from "react";
import { useContent } from "@/components/providers/ContentProvider";
import { THEME_KEY } from "@/lib/theme";

type Theme = "dark" | "light";

const listeners = new Set<() => void>();

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function apply(next: Theme) {
  const root = document.documentElement;
  if (next === "light") root.dataset.theme = "light";
  else delete root.dataset.theme;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {}
  listeners.forEach((fn) => fn());
}

export function ThemeToggle() {
  const { c } = useContent();
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark");
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${radius}px`);

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => unknown;
    };
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (doc.startViewTransition && !reduced) {
      doc.startViewTransition(() => apply(next));
    } else {
      apply(next);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={next === "light" ? c.ui.themeToLight : c.ui.themeToDark}
      title={next === "light" ? c.ui.themeToLight : c.ui.themeToDark}
      data-cursor="link"
      className="group flex h-9 w-9 cursor-pointer items-center justify-center border border-line bg-background/90 text-muted transition-colors duration-300 hover:border-accent/70 hover:text-accent focus-visible:border-accent/70 focus-visible:text-accent focus-visible:outline-none"
    >
      {theme === "dark" ? (
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
        >
          <circle cx="8" cy="8" r="3" />
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6 13 13M3 13l1.4-1.4M11.6 4.4 13 3" />
        </svg>
      ) : (
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
        >
          <path d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7Z" />
        </svg>
      )}
    </button>
  );
}
