"use client";

import { useMemo, useState } from "react";
import { I18nField } from "./fields";
import { SaveBar } from "./SaveBar";
import { isText, type Text } from "@/lib/i18n";
import type { Copy } from "@/lib/content/site";

type Leaf = { path: string[]; value: Text };

function collect(node: unknown, path: string[], out: Leaf[]) {
  if (isText(node)) {
    out.push({ path, value: node });
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

const human = (key: string) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toLowerCase());

export function CopyEditor({ initial }: { initial: Copy }) {
  const [copy, setCopy] = useState<Copy>(initial);
  const [saved, setSaved] = useState(JSON.stringify(initial));
  const [query, setQuery] = useState("");
  const dirty = JSON.stringify(copy) !== saved;

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return Object.entries(copy).map(([section, node]) => {
      const leaves: Leaf[] = [];
      collect(node, [section], leaves);
      return {
        section,
        leaves: q
          ? leaves.filter((l) =>
              [l.path.join(" "), l.value.en, l.value.de]
                .join(" ")
                .toLowerCase()
                .includes(q),
            )
          : leaves,
      };
    });
  }, [copy, query]);

  return (
    <div>
      <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-3 text-muted lowercase">
            <span className="text-accent">$</span> edit copy
          </p>
          <h1 className="font-heading text-4xl leading-none font-bold tracking-tight uppercase md:text-5xl">
            Page copy
          </h1>
          <p className="mt-4 max-w-xl font-body text-sm tracking-normal text-muted">
            Every heading, label and sentence on the site, in English and
            German. Keep code-style labels like Start_Conversation in that
            style.
          </p>
        </div>
        <label className="flex w-full max-w-xs items-baseline gap-3 border-b border-line pb-2 focus-within:border-accent">
          <span className="text-accent lowercase">$ grep</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="find text…"
            className="min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-foreground/25"
          />
        </label>
      </header>

      <div className="space-y-4">
        {sections
          .filter((s) => s.leaves.length)
          .map((s) => (
            <details
              key={s.section}
              open={Boolean(query)}
              className="group border border-line"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 lowercase">
                <span>
                  <span className="text-accent">▸ </span>
                  {human(s.section)}
                </span>
                <span className="text-muted tabular-nums">
                  {s.leaves.length} strings
                </span>
              </summary>
              <div className="space-y-7 border-t border-line px-5 py-6">
                {s.leaves.map((leaf) => (
                  <div
                    key={leaf.path.join(".")}
                    className="flex flex-col gap-2.5"
                  >
                    <span className="text-muted lowercase">
                      {leaf.path.slice(1).map(human).join(" · ")}
                    </span>
                    <I18nField
                      value={leaf.value}
                      area={
                        leaf.value.en.length > 70 || leaf.value.de.length > 70
                      }
                      onChange={(v) => setCopy(setAt(copy, leaf.path, v))}
                    />
                  </div>
                ))}
              </div>
            </details>
          ))}
      </div>

      <SaveBar
        cmsKey="copy"
        data={copy}
        dirty={dirty}
        onSaved={() => setSaved(JSON.stringify(copy))}
      />
    </div>
  );
}
