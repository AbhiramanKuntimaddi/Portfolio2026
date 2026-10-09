"use client";

import { useContent } from "@/components/providers/ContentProvider";

export interface ChapterRow {
  id: string;
  name: string;
  meta: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function ChapterIndex({
  className = "",
  command,
  rows,
  more,
}: {
  className?: string;
  command: string;
  rows: ChapterRow[];
  more?: string;
}) {
  const { c } = useContent();

  return (
    <div className={`font-label text-[11px] tracking-[0.12em] ${className}`}>
      <div
        data-row
        className="flex items-baseline justify-between gap-6 border-b border-line pb-3 text-muted lowercase"
      >
        <span>
          <span className="text-accent">$</span> {command}
        </span>
        <span className="tabular-nums">
          {pad(rows.length)} {c.ui.items}
        </span>
      </div>
      <ul>
        {rows.map((r) => (
          <li
            key={r.id}
            data-row
            className="flex items-baseline gap-5 border-b border-line py-3"
          >
            <span className="text-accent tabular-nums">{r.id}</span>
            <span
              data-decode="wide"
              className="min-w-0 flex-1 truncate tracking-[0.18em] text-foreground/85 uppercase"
            >
              {r.name}
            </span>
            <span className="text-muted tabular-nums lowercase">{r.meta}</span>
          </li>
        ))}
      </ul>
      {more && (
        <p data-row className="pt-3 text-muted lowercase">
          {more}
        </p>
      )}
    </div>
  );
}
