"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FiLock } from "react-icons/fi";
import { PROJECT_STATUSES, type ProjectStatus } from "@/lib/data/projects";
import { visibleProjects } from "@/lib/cms/schema";
import {
  useContent,
  useLocalized,
} from "@/components/providers/ContentProvider";

const STATUS_DOT: Record<ProjectStatus, string> = {
  ONGOING: "bg-orange-400 animate-pulse",
  COMPLETED: "bg-green-500",
  UPCOMING: "bg-violet-400",
  ARCHIVED: "bg-red-500",
};

const pad = (n: number) => String(n).padStart(2, "0");

export function WorkIndex() {
  const { locale, c, data } = useContent();
  const t = c.work;
  const all = useLocalized(
    useMemo(() => visibleProjects(data.projects), [data.projects]),
  );
  const [status, setStatus] = useState<ProjectStatus | "ALL">("ALL");
  const [query, setQuery] = useState("");

  const present = PROJECT_STATUSES.filter((s) =>
    all.some((p) => p.status === s),
  );

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((p) => {
      if (status !== "ALL" && p.status !== status) return false;
      if (!q) return true;
      return [p.title, p.category, p.year, ...p.stack]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [all, status, query]);

  return (
    <main className="relative z-10 min-h-dvh pt-28 pb-24 md:pt-36">
      <div className="frame">
        <Link
          href={`/${locale}`}
          className="group mb-14 inline-flex items-baseline gap-2 font-label text-[11px] tracking-[0.12em] lowercase md:mb-20"
        >
          <span className="text-accent transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          <span className="text-muted transition-colors group-hover:text-accent">
            ~/abhiraman
          </span>
          <span className="text-foreground/85">/work</span>
        </Link>

        <div className="mb-10 flex items-center gap-6">
          <span className="font-label text-[10px] font-bold tracking-[0.35em] whitespace-nowrap text-accent uppercase">
            {t.label}
          </span>
          <span className="h-px flex-1 bg-line" />
          <span className="font-label text-[10px] tracking-[0.35em] whitespace-nowrap text-muted tabular-nums">
            {pad(all.length)}
          </span>
        </div>

        <div className="grid grid-cols-1 items-end gap-10 xl:grid-cols-12 xl:gap-6">
          <div className="xl:col-span-7">
            <h1 className="font-heading text-4xl leading-[0.95] font-bold tracking-tight text-foreground uppercase sm:text-5xl md:text-6xl xl:text-[clamp(4rem,5.2vw,6rem)]">
              {t.line1}
              <br />
              <span className="text-accent italic">{t.line2}</span>
            </h1>
            <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-muted md:text-xl">
              {t.intro}
            </p>
          </div>

          <div className="flex flex-col gap-5 font-label text-[11px] tracking-[0.12em] lowercase xl:col-span-5">
            <label className="flex items-baseline gap-3 border-b border-line pb-3 focus-within:border-accent">
              <span className="text-accent">$ {t.search}</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-foreground/30"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {(["ALL", ...present] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`cursor-pointer border px-3 py-1.5 transition-colors ${
                    status === s
                      ? "border-accent bg-accent text-background"
                      : "border-line text-foreground/70 hover:border-accent hover:text-accent"
                  }`}
                >
                  {s === "ALL" ? t.all : c.projects.status[s]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 font-label text-[11px] tracking-[0.12em] md:mt-20">
          <div className="hidden grid-cols-12 gap-6 border-b border-line pb-3 text-muted lowercase md:grid">
            <span className="col-span-1">#</span>
            <span className="col-span-5">{c.nav.projects}</span>
            <span className="col-span-3">stack</span>
            <span className="col-span-1">year</span>
            <span className="col-span-2 text-right">status</span>
          </div>

          {shown.length === 0 && (
            <p className="border-b border-line py-10 text-muted lowercase">
              {t.empty}
            </p>
          )}

          <ul>
            {shown.map((p, i) => {
              const locked = p.status === "ARCHIVED";
              const row = (
                <>
                  <span className="text-accent tabular-nums md:col-span-1">
                    {pad(i + 1)}
                  </span>
                  <span className="flex min-w-0 flex-col gap-1.5 md:col-span-5">
                    <span className="font-heading text-xl leading-tight tracking-tight text-foreground uppercase transition-colors group-hover:text-accent md:text-2xl">
                      {p.title}
                    </span>
                    <span className="text-muted lowercase">{p.category}</span>
                  </span>
                  <span className="hidden flex-wrap gap-1.5 md:col-span-3 md:flex">
                    {p.stack.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="border border-line px-2 py-0.5 text-[10px] text-foreground/70 uppercase"
                      >
                        {s}
                      </span>
                    ))}
                  </span>
                  <span className="text-muted tabular-nums md:col-span-1">
                    {p.year}
                  </span>
                  <span className="flex items-center gap-2 text-muted lowercase md:col-span-2 md:justify-end">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[p.status]}`}
                    />
                    {c.projects.status[p.status]}
                    {locked ? (
                      <FiLock className="h-3 w-3" />
                    ) : (
                      <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    )}
                  </span>
                </>
              );
              const cls =
                "group grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-2 border-b border-line py-6 md:grid-cols-12 md:gap-6";
              return (
                <li key={p.slug}>
                  {locked ? (
                    <div className={`${cls} opacity-60`}>{row}</div>
                  ) : (
                    <Link href={`/${locale}/work/${p.slug}`} className={cls}>
                      {row}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="pt-4 text-muted lowercase tabular-nums">
            {pad(shown.length)} / {pad(all.length)} {t.shown}
          </p>
        </div>
      </div>
    </main>
  );
}
