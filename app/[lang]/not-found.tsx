"use client";

import Link from "next/link";
import { useContent } from "@/components/providers/ContentProvider";

export default function NotFound() {
  const { locale, c } = useContent();
  const t = c.ui.notFound;
  return (
    <main className="relative z-10 min-h-dvh flex items-center bg-background overflow-hidden">
      <div className="frame">
        <p className="font-label text-[11px] md:text-xs text-accent/70 tracking-[0.25em] mb-6">
          <span className="text-accent/70">{"//"}</span> {t.tag}
        </p>

        <h1 className="font-heading text-[clamp(3rem,15vw,9rem)] font-bold uppercase leading-[0.82] tracking-tight text-foreground">
          {t.titleTop}
          <br />
          <span className="text-accent italic">{t.titleAccent}</span>
        </h1>

        <p className="mt-8 max-w-md font-body text-sm md:text-base text-muted leading-relaxed">
          {t.body}
        </p>

        <Link
          href={`/${locale}`}
          className="group mt-10 inline-flex items-baseline font-label cursor-pointer"
        >
          <span className="text-accent mr-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-bold select-none">
            &gt;
          </span>
          <span className="flex flex-col">
            <span className="flex items-baseline gap-1">
              <span className="text-accent text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-500 group-hover:text-foreground">
                {t.cta}
              </span>
              <span className="text-accent/40 select-none">();</span>
            </span>
            <span className="mt-1 h-px w-full bg-accent/20 relative overflow-hidden">
              <span className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </span>
          </span>
        </Link>
      </div>
    </main>
  );
}
