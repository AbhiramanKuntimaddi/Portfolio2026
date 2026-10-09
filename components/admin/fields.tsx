"use client";

import { useRef, useState, useTransition } from "react";
import { uploadImage } from "@/app/admin/actions";
import { isText, type Text } from "@/lib/i18n";

export type FieldSpec =
  | { key: string; label: string; kind: "text" | "textarea"; hint?: string }
  | { key: string; label: string; kind: "i18n" | "i18n-area"; hint?: string }
  | {
      key: string;
      label: string;
      kind: "select";
      options: { value: string; label: string }[];
    }
  | { key: string; label: string; kind: "bool"; hint?: string }
  | { key: string; label: string; kind: "tags" | "tags-i18n"; hint?: string }
  | { key: string; label: string; kind: "image" | "images"; folder: string };

const inputCls =
  "w-full border-b border-line bg-transparent py-2 text-[13px] tracking-normal text-foreground outline-none transition-colors placeholder:text-foreground/25 focus:border-accent";

export function FieldLabel({ label, hint }: { label: string; hint?: string }) {
  return (
    <span className="flex items-baseline justify-between gap-4 text-muted lowercase">
      <span>{label}</span>
      {hint && <span className="text-foreground/35">{hint}</span>}
    </span>
  );
}

export function TextField({
  value,
  onChange,
  area,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  area?: boolean;
  placeholder?: string;
}) {
  return area ? (
    <textarea
      value={value}
      rows={4}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputCls} resize-y leading-relaxed`}
    />
  ) : (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={inputCls}
    />
  );
}

export function I18nField({
  value,
  onChange,
  area,
}: {
  value: Text;
  onChange: (v: Text) => void;
  area?: boolean;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {(["en", "de"] as const).map((l) => (
        <div key={l} className="flex items-start gap-3">
          <span className="pt-2.5 text-accent uppercase">{l}</span>
          <TextField
            value={value[l]}
            area={area}
            onChange={(v) => onChange({ ...value, [l]: v })}
          />
        </div>
      ))}
    </div>
  );
}

export function Toggle({
  value,
  onChange,
  label,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="flex cursor-pointer items-center gap-3 lowercase"
    >
      <span
        className={`flex h-4 w-7 items-center border px-0.5 transition-colors ${
          value ? "border-accent bg-accent" : "border-line"
        }`}
      >
        <span
          className={`h-2.5 w-2.5 transition-transform ${
            value ? "translate-x-2.5 bg-background" : "bg-foreground/40"
          }`}
        />
      </span>
      <span className={value ? "text-foreground" : "text-muted"}>{label}</span>
    </button>
  );
}

function TagList({
  tags,
  onRemove,
}: {
  tags: string[];
  onRemove: (i: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t, i) => (
        <span
          key={`${t}-${i}`}
          className="flex items-center gap-2 border border-line px-2 py-1 text-[11px] uppercase"
        >
          {t}
          <button
            type="button"
            onClick={() => onRemove(i)}
            className="cursor-pointer text-muted hover:text-red-400"
            aria-label={`Remove ${t}`}
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
}

export function TagsField({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const next = draft
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (next.length) onChange([...value, ...next]);
    setDraft("");
  };
  return (
    <div className="flex flex-col gap-3">
      <TagList
        tags={value}
        onRemove={(i) => onChange(value.filter((_, j) => j !== i))}
      />
      <input
        value={draft}
        placeholder="type and press enter (comma for several)"
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add();
          }
        }}
        onBlur={add}
        className={inputCls}
      />
    </div>
  );
}

export function TagsI18nField({
  value,
  onChange,
}: {
  value: (string | Text)[];
  onChange: (v: (string | Text)[]) => void;
}) {
  const rows = value.map((v) => (isText(v) ? v : { en: v, de: "" }));
  const commit = (next: Text[]) =>
    onChange(
      next
        .filter((r) => r.en.trim())
        .map((r) =>
          r.de.trim() && r.de.trim() !== r.en.trim()
            ? { en: r.en, de: r.de }
            : r.en,
        ),
    );
  return (
    <div className="flex flex-col gap-2">
      {rows.map((r, i) => (
        <div
          key={i}
          className="grid grid-cols-[1fr_1fr_auto] items-center gap-3"
        >
          <input
            value={r.en}
            onChange={(e) =>
              commit(
                rows.map((x, j) =>
                  j === i ? { ...x, en: e.target.value } : x,
                ),
              )
            }
            className={inputCls}
          />
          <input
            value={r.de}
            placeholder="de (only if different)"
            onChange={(e) =>
              commit(
                rows.map((x, j) =>
                  j === i ? { ...x, de: e.target.value } : x,
                ),
              )
            }
            className={inputCls}
          />
          <button
            type="button"
            onClick={() => commit(rows.filter((_, j) => j !== i))}
            className="cursor-pointer text-muted hover:text-red-400"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, "New"])}
        className="cursor-pointer self-start text-accent lowercase"
      >
        + add
      </button>
    </div>
  );
}

function Uploader({
  folder,
  onUploaded,
  label,
}: {
  folder: string;
  onUploaded: (url: string) => void;
  label: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-1">
      <input
        ref={input}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          setError(null);
          start(async () => {
            const form = new FormData();
            form.set("file", file);
            form.set("folder", folder);
            const res = await uploadImage(form);
            if (res.ok && res.url) onUploaded(res.url);
            else if (!res.ok) setError(res.error);
          });
        }}
      />
      <button
        type="button"
        disabled={pending}
        onClick={() => input.current?.click()}
        className="cursor-pointer self-start border border-line px-3 py-1.5 lowercase transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
      >
        {pending ? "uploading…" : label}
      </button>
      {error && <span className="text-red-400 lowercase">{error}</span>}
    </div>
  );
}

function Thumb({ url, onRemove }: { url: string; onRemove: () => void }) {
  return (
    <div className="group relative h-24 w-32 overflow-hidden border border-line">
      <div
        role="img"
        aria-label=""
        className="h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url("${url}")` }}
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 cursor-pointer bg-background/90 px-1.5 text-red-400 opacity-0 transition-opacity group-hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
}

export function ImageField({
  value,
  onChange,
  folder,
}: {
  value: string;
  onChange: (v: string) => void;
  folder: string;
}) {
  return (
    <div className="flex flex-wrap items-end gap-4">
      {value && <Thumb url={value} onRemove={() => onChange("")} />}
      <Uploader
        folder={folder}
        label={value ? "replace" : "upload image"}
        onUploaded={onChange}
      />
    </div>
  );
}

export function ImagesField({
  value,
  onChange,
  folder,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  folder: string;
}) {
  return (
    <div className="flex flex-wrap items-end gap-4">
      {value.map((url, i) => (
        <Thumb
          key={url}
          url={url}
          onRemove={() => onChange(value.filter((_, j) => j !== i))}
        />
      ))}
      <Uploader
        folder={folder}
        label="+ add image"
        onUploaded={(url) => onChange([...value, url])}
      />
    </div>
  );
}

export function FieldInput({
  spec,
  value,
  onChange,
}: {
  spec: FieldSpec;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  switch (spec.kind) {
    case "text":
    case "textarea":
      return (
        <TextField
          value={typeof value === "string" ? value : ""}
          area={spec.kind === "textarea"}
          onChange={onChange}
        />
      );
    case "i18n":
    case "i18n-area":
      return (
        <I18nField
          value={isText(value) ? value : { en: "", de: "" }}
          area={spec.kind === "i18n-area"}
          onChange={onChange}
        />
      );
    case "select":
      return (
        <select
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputCls} cursor-pointer lowercase`}
        >
          {spec.options.map((o) => (
            <option key={o.value} value={o.value} className="bg-background">
              {o.label}
            </option>
          ))}
        </select>
      );
    case "bool":
      return (
        <Toggle
          value={value === true}
          onChange={onChange}
          label={spec.hint ?? spec.label}
        />
      );
    case "tags":
      return (
        <TagsField
          value={Array.isArray(value) ? (value as string[]) : []}
          onChange={onChange}
        />
      );
    case "tags-i18n":
      return (
        <TagsI18nField
          value={Array.isArray(value) ? (value as (string | Text)[]) : []}
          onChange={onChange}
        />
      );
    case "image":
      return (
        <ImageField
          value={typeof value === "string" ? value : ""}
          onChange={onChange}
          folder={spec.folder}
        />
      );
    case "images":
      return (
        <ImagesField
          value={Array.isArray(value) ? (value as string[]) : []}
          onChange={onChange}
          folder={spec.folder}
        />
      );
  }
}
