"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { loaderSignal } from "@/lib/loaderSignal";
import { LOCALE_COOKIE, localeNames, locales } from "@/lib/i18n";
import { useContent } from "@/components/providers/ContentProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

function remember(next: string) {
  try {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
  } catch {}
}

export function LanguageSwitch() {
  const { locale, c } = useContent();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      gsap.set(el, { autoAlpha: 0 });
      return loaderSignal.onComplete(() =>
        gsap.to(el, { autoAlpha: 1, duration: 0.6, delay: 0.8 }),
      );
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="invisible fixed top-5 right-5 z-70 flex items-center gap-2 opacity-0 select-none md:top-6 md:right-[var(--frame-x,2rem)]"
    >
      <ThemeToggle />
      <nav aria-label={c.ui.language}>
        <ul className="flex h-9 items-stretch border border-line bg-background/90 p-0.5 font-label text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 hover:border-accent/70">
          {locales.map((l) => (
            <li key={l} className="flex">
              {l === locale ? (
                <span
                  aria-current="true"
                  title={localeNames[l]}
                  className="flex items-center bg-accent px-3 text-background"
                >
                  {l.toUpperCase()}
                </span>
              ) : (
                <Link
                  href={`/${l}`}
                  scroll={false}
                  hrefLang={l}
                  lang={l}
                  title={localeNames[l]}
                  data-cursor="link"
                  onClick={() => remember(l)}
                  className="flex items-center px-3 text-muted transition-colors duration-200 hover:bg-surface hover:text-foreground focus-visible:bg-surface focus-visible:text-foreground focus-visible:outline-none"
                >
                  {l.toUpperCase()}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
