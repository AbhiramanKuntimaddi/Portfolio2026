"use client";

import { useEffect, useState } from "react";
import { FieldInput, FieldLabel, Toggle, type FieldSpec } from "./fields";
import { SaveBar } from "./SaveBar";
import type { CmsKey } from "@/lib/cms/schema";

type Item = Record<string, unknown>;

export interface Badge {
  label: string;
  tone: "accent" | "muted" | "warn";
}

const pad = (n: number) => String(n).padStart(2, "0");

const TONES: Record<Badge["tone"], string> = {
  accent: "border-accent/60 text-accent",
  muted: "border-line text-muted",
  warn: "border-amber-400/60 text-amber-400",
};

export function ListEditor<T extends Item>({
  cmsKey,
  title,
  intro,
  initial,
  fields,
  label,
  sublabel,
  badges,
  toggles = [],
  create,
  check,
  prepare = (item) => item,
}: {
  cmsKey: CmsKey;
  title: string;
  intro: string;
  initial: T[];
  fields: FieldSpec[];
  label: (item: T) => string;
  sublabel?: (item: T) => string;
  badges?: (item: T) => Badge[];
  toggles?: { key: keyof T & string; label: string }[];
  create: (items: T[]) => T;
  check?: (item: T, items: T[], index: number) => string | null;
  prepare?: (item: T) => T;
}) {
  const [items, setItems] = useState<T[]>(initial);
  const [saved, setSaved] = useState(JSON.stringify(initial));
  const [editing, setEditing] = useState<{ index: number; item: T } | null>(
    null,
  );
  const dirty = JSON.stringify(items) !== saved;

  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
  };

  const set = (i: number, patch: Partial<T>) =>
    setItems(items.map((it, j) => (j === i ? { ...it, ...patch } : it)));

  const remove = (i: number) => {
    if (
      !window.confirm(
        `Delete “${label(items[i])}”? You can discard the draft to undo.`,
      )
    )
      return;
    setItems(items.filter((_, j) => j !== i));
  };

  return (
    <div>
      <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-3 text-muted lowercase">
            <span className="text-accent">$</span> edit {cmsKey}
          </p>
          <h1 className="font-heading text-4xl leading-none font-bold tracking-tight uppercase md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl font-body text-sm tracking-normal text-muted">
            {intro}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing({ index: -1, item: create(items) })}
          className="cursor-pointer border border-accent px-4 py-2 text-accent lowercase transition-colors hover:bg-accent hover:text-background"
        >
          + new
        </button>
      </header>

      <ul className="border-t border-line">
        {items.map((it, i) => (
          <li
            key={i}
            className="group flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-line py-4"
          >
            <span className="w-6 text-accent tabular-nums">{pad(i + 1)}</span>
            <button
              type="button"
              onClick={() => setEditing({ index: i, item: it })}
              className="flex min-w-0 flex-1 cursor-pointer flex-col items-start gap-1 text-left"
            >
              <span className="truncate font-heading text-lg tracking-tight text-foreground uppercase transition-colors group-hover:text-accent">
                {label(it) || "untitled"}
              </span>
              {sublabel && (
                <span className="text-muted lowercase">{sublabel(it)}</span>
              )}
            </button>
            <span className="flex flex-wrap gap-2 lowercase">
              {badges?.(it).map((b) => (
                <span
                  key={b.label}
                  className={`border px-2 py-0.5 ${TONES[b.tone]}`}
                >
                  {b.label}
                </span>
              ))}
            </span>
            {toggles.map((t) => (
              <Toggle
                key={t.key}
                label={t.label}
                value={it[t.key] === true}
                onChange={(v) => set(i, { [t.key]: v } as Partial<T>)}
              />
            ))}
            <span className="flex items-center gap-3 lowercase">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="cursor-pointer text-foreground/60 hover:text-accent disabled:opacity-20"
                aria-label="Move up"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === items.length - 1}
                className="cursor-pointer text-foreground/60 hover:text-accent disabled:opacity-20"
                aria-label="Move down"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => setEditing({ index: i, item: it })}
                className="cursor-pointer text-foreground/60 hover:text-accent"
              >
                edit
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                className="cursor-pointer text-foreground/60 hover:text-red-400"
              >
                delete
              </button>
            </span>
          </li>
        ))}
        {items.length === 0 && (
          <li className="border-b border-line py-10 text-muted lowercase">
            nothing here yet. add the first one with + new.
          </li>
        )}
      </ul>

      <SaveBar
        cmsKey={cmsKey}
        data={items}
        dirty={dirty}
        onSaved={() => setSaved(JSON.stringify(items))}
      />

      {editing && (
        <Drawer
          fields={fields}
          initial={editing.item}
          isNew={editing.index === -1}
          prepare={prepare}
          check={(item) =>
            check?.(
              item,
              editing.index === -1
                ? [...items, item]
                : items.map((x, j) => (j === editing.index ? item : x)),
              editing.index === -1 ? items.length : editing.index,
            ) ?? null
          }
          onClose={() => setEditing(null)}
          onApply={(item) => {
            setItems(
              editing.index === -1
                ? [...items, item]
                : items.map((x, j) => (j === editing.index ? item : x)),
            );
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function Drawer<T extends Item>({
  fields,
  initial,
  isNew,
  prepare,
  check,
  onClose,
  onApply,
}: {
  fields: FieldSpec[];
  initial: T;
  isNew: boolean;
  prepare: (item: T) => T;
  check: (item: T) => string | null;
  onClose: () => void;
  onApply: (item: T) => void;
}) {
  const [item, setItem] = useState<T>(initial);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-background/70"
      />
      <div className="relative flex h-full w-full max-w-2xl flex-col border-l border-line bg-background">
        <div className="flex items-center justify-between border-b border-line px-6 py-4 lowercase">
          <span>
            <span className="text-accent">$</span>{" "}
            {isNew ? "new item" : "edit item"}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-foreground/60 hover:text-foreground"
          >
            esc ×
          </button>
        </div>
        <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
          {fields.map((f) => (
            <div key={f.key} className="flex flex-col gap-2.5">
              <FieldLabel
                label={f.label}
                hint={"hint" in f ? f.hint : undefined}
              />
              <FieldInput
                spec={f}
                value={item[f.key]}
                onChange={(v) => setItem({ ...item, [f.key]: v })}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 border-t border-line px-6 py-4 lowercase">
          {error && <span className="text-red-400">{error}</span>}
          <span className="flex-1" />
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-foreground/60 hover:text-foreground"
          >
            cancel
          </button>
          <button
            type="button"
            onClick={() => {
              const ready = prepare(item);
              const problem = check(ready);
              if (problem) setError(problem);
              else onApply(ready);
            }}
            className="cursor-pointer border border-accent bg-accent px-5 py-2 text-background"
          >
            apply
          </button>
        </div>
      </div>
    </div>
  );
}
