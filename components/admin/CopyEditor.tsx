"use client";

import { useMemo, useState } from "react";
import { I18nField } from "./fields";
import { SaveBar } from "./SaveBar";
import { isText, type Text } from "@/lib/i18n";
import type { Copy } from "@/lib/content/site";
import { COPY_FIELDS, COPY_SECTIONS } from "@/lib/cms/copyLabels";

type Leaf = { path: string[]; id: string; value: Text };

function collect(node: unknown, path: string[], out: Leaf[]) {
  if (isText(node)) {
    out.push({ path, id: path.join("."), value: node });
    return;
  }
  if (typeof node !== "object" || node === null) return;
  for (const [k, v] of Object.entries(node)) collect(v, [...path, k], out);
}

function setAt<T>(root: T, path: string[], value: Text): T {
  if (path.length === 0) return value as T;
  const [head, ...rest] = path;
  const node = root as Record<string, unknown>;
  return { ...node, [head]: setAt(node[head], rest, value) } as T;
}

const humanize = (path: string[]) =>
  path
    .slice(1)
    .map((k) => k.replace(/([A-Z])/g, " $1").toLowerCase())
    .join(" · ");

const sectionOrder = (key: string) => {
  const i = COPY_SECTIONS.findIndex((s) => s.key === key);
  return i === -1 ? COPY_SECTIONS.length : i;
};

export function CopyEditor({ initial }: { initial: Copy }) {
  const [copy, setCopy] = useState<Copy>(initial);
  const [saved, setSaved] = useState<Copy>(initial);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(COPY_SECTIONS[0].key);
  const dirty = JSON.stringify(copy) !== JSON.stringify(saved);

  const sections = useMemo(
    () =>
      Object.keys(copy)
        .sort((a, b) => sectionOrder(a) - sectionOrder(b))
        .map((key) => {
          const info = COPY_SECTIONS.find((s) => s.key === key);
          const leaves: Leaf[] = [];
          collect(copy[key as keyof Copy], [key], leaves);
          const changed =
            JSON.stringify(copy[key as keyof Copy]) !==
            JSON.stringify(saved[key as keyof Copy]);
          const missing = leaves.filter(
            (l) => l.value.en.trim() && !l.value.de.trim(),
          ).length;
          return {
            key,
            title: info?.title ?? key,
            about: info?.about ?? "",
            leaves,
            changed,
            missing,
          };
        }),
    [copy, saved],
  );

  const q = query.trim().toLowerCase();
  const matches = q
    ? sections
        .map((s) => ({
          ...s,
          leaves: s.leaves.filter((l) =>
            [COPY_FIELDS[l.id]?.label ?? "", l.value.en, l.value.de]
              .join(" ")
              .toLowerCase()
              .includes(q),
          ),
        }))
        .filter((s) => s.leaves.length)
    : sections.filter((s) => s.key === active);

  const update = (leaf: Leaf, v: Text) => setCopy(setAt(copy, leaf.path, v));

  return (
    <div>
      <header className="mb-10">
        <h1 className="font-heading text-4xl leading-none font-bold tracking-tight uppercase md:text-5xl">
          Site text
        </h1>
        <p className="mt-4 max-w-xl font-body text-sm tracking-normal text-muted">
          Every heading, label and sentence on the site. English on the left,
          German on the right. Projects, jobs and skills have their own pages.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[14rem_1fr]">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <label className="mb-6 flex items-baseline gap-3 border-b border-line pb-2 focus-within:border-accent">
            <span className="text-accent lowercase">search</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="any word…"
              className="min-w-0 flex-1 bg-transparent font-body tracking-normal text-foreground outline-none placeholder:text-foreground/25"
            />
          </label>
          <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            {sections.map((s) => {
              const on = !q && s.key === active;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActive(s.key);
                  }}
                  className={`flex shrink-0 cursor-pointer items-center justify-between gap-3 border-l-2 px-3 py-2 text-left font-body text-[13px] tracking-normal transition-colors ${
                    on
                      ? "border-accent bg-surface text-foreground"
                      : "border-transparent text-foreground/65 hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {s.title}
                    {s.changed && (
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-amber-400"
                        title="Unsaved changes"
                      />
                    )}
                  </span>
                  <span className="font-label text-[11px] text-muted tabular-nums">
                    {s.leaves.length}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 space-y-12">
          {q && matches.length === 0 && (
            <p className="font-body tracking-normal text-muted">
              Nothing matches “{query}”.
            </p>
          )}
          {matches.map((s) => (
            <section key={s.key}>
              <div className="mb-6 border-b border-line pb-4">
                <h2 className="font-heading text-2xl tracking-tight uppercase">
                  {s.title}
                </h2>
                {s.about && (
                  <p className="mt-2 font-body text-sm tracking-normal text-muted">
                    {s.about}
                  </p>
                )}
                {!q && s.missing > 0 && (
                  <p className="mt-2 font-body text-sm tracking-normal text-amber-400">
                    {s.missing} field{s.missing === 1 ? "" : "s"} without German
                  </p>
                )}
              </div>
              <div className="space-y-8">
                {s.leaves.map((leaf) => {
                  const info = COPY_FIELDS[leaf.id];
                  const noDe = leaf.value.en.trim() && !leaf.value.de.trim();
                  return (
                    <div key={leaf.id} className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-body text-sm tracking-normal text-foreground">
                          {info?.label ?? humanize(leaf.path)}
                        </span>
                        {info?.hint && (
                          <span className="font-body text-xs tracking-normal text-muted">
                            {info.hint}
                          </span>
                        )}
                        {noDe && (
                          <span className="font-label text-[10px] text-amber-400 lowercase">
                            de missing
                          </span>
                        )}
                      </div>
                      <I18nField
                        value={leaf.value}
                        area={
                          leaf.value.en.length > 70 || leaf.value.de.length > 70
                        }
                        onChange={(v) => update(leaf, v)}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      <SaveBar
        cmsKey="copy"
        data={copy}
        dirty={dirty}
        onSaved={() => setSaved(copy)}
      />
    </div>
  );
}
