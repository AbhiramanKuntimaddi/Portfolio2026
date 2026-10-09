"use client";

import Link from "next/link";
import { LOCALE_COOKIE, localeNames, locales } from "@/lib/i18n";
import { useContent } from "@/components/providers/ContentProvider";

function remember(next: string) {
  try {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
  } catch {}
}

export function LanguageSwitch() {
  const { locale, c } = useContent();

  return (
    <nav
      aria-label={c.ui.language}
      className="fixed top-6 right-6 z-70 select-none md:top-8 md:right-[var(--frame-x,2rem)]"
    >
      <ul className="flex items-center gap-2 font-label text-[11px] tracking-[0.25em] uppercase">
        {locales.map((l, i) => (
          <li key={l} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden className="text-foreground/25">
                /
              </span>
            )}
            {l === locale ? (
              <span
                aria-current="true"
                title={localeNames[l]}
                className="text-accent"
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
                className="text-muted transition-colors duration-300 hover:text-foreground"
              >
                {l.toUpperCase()}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
