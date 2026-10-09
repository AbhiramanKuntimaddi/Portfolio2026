"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  getJobLine,
  openProjects,
  type SiteStatusLine,
  type SiteStatusState,
} from "@/lib/status";
import {
  useContent,
  useLocalized,
} from "@/components/providers/ContentProvider";

const STYLES: Record<SiteStatusState, { dot: string; pulse: boolean }> = {
  available: {
    dot: "bg-accent",
    pulse: true,
  },
  working: {
    dot: "bg-orange-400",
    pulse: true,
  },
  busy: {
    dot: "bg-red-500",
    pulse: true,
  },
  away: {
    dot: "bg-foreground/30",
    pulse: false,
  },
};

function StatusRow({
  state,
  label,
  align,
}: {
  state: SiteStatusState;
  label: React.ReactNode;
  align: "left" | "right";
}) {
  const s = STYLES[state] ?? STYLES.available;

  return (
    <span
      className={`inline-flex max-w-full min-w-0 items-center gap-2.5 ${
        align === "right" ? "flex-row-reverse" : ""
      }`}
    >
      <span
        aria-hidden
        className={`h-2 w-2 shrink-0 rounded-full ${s.dot} ${
          s.pulse ? "animate-pulse" : ""
        }`}
      />
      <span className="min-w-0 truncate font-label text-[11px] lowercase tracking-wide text-muted">
        {label}
      </span>
    </span>
  );
}

const TYPE_MS = 0.6;
const DELETE_MS = 10;
const HOLD_MS = 700;
const GAP_MS = 80;

export function StatusBadge({ align = "left" }: { align?: "left" | "right" }) {
  const [jobLine, setJobLine] = useState<SiteStatusLine | null>(null);
  const [typed, setTyped] = useState("");

  const { c, data } = useContent();
  const open = useMemo(() => openProjects(data.projects), [data.projects]);
  const opens = useLocalized(open);

  const projectIdx = useRef(0);
  const charIdx = useRef(0);
  const phase = useRef<"typing" | "hold" | "deleting" | "gap">("typing");

  useEffect(() => {
    setJobLine(getJobLine());
  }, []);

  useEffect(() => {
    if (opens.length === 0) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;

      const project = opens[projectIdx.current];
      const target = project.title;

      let delay = TYPE_MS;

      if (phase.current === "typing") {
        charIdx.current += 1;

        setTyped(target.slice(0, charIdx.current));

        if (charIdx.current >= target.length) {
          phase.current = "hold";
          delay = HOLD_MS;
        }
      } else if (phase.current === "hold") {
        phase.current = "deleting";
        delay = DELETE_MS;
      } else if (phase.current === "deleting") {
        charIdx.current -= 1;

        setTyped(target.slice(0, Math.max(0, charIdx.current)));

        if (charIdx.current <= 0) {
          charIdx.current = 0;
          projectIdx.current = (projectIdx.current + 1) % opens.length;

          phase.current = "gap";
          delay = GAP_MS;
        } else {
          delay = DELETE_MS;
        }
      } else {
        phase.current = "typing";
        delay = TYPE_MS;
      }

      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 250);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [opens]);

  if (jobLine === null) return null;

  return (
    <div
      className={`flex max-w-[86vw] flex-col gap-1.5 sm:max-w-sm lg:max-w-none ${
        align === "right" ? "items-end" : "items-start"
      }`}
    >
      {opens.length > 0 && (
        <StatusRow
          state="working"
          align={align}
          label={
            <>
              <span className="text-muted">{c.status.building}</span>{" "}
              <span className="normal-case text-foreground/85">{typed}</span>
              <span
                aria-hidden
                className="ml-0.5 inline-block h-[0.9em] w-0.5 rounded-full bg-accent align-middle opacity-75"
              />
            </>
          }
        />
      )}

      <StatusRow
        state={jobLine.state}
        align={align}
        label={
          jobLine.dnd ? (
            <>
              {c.status[jobLine.key]}
              <span className="ml-2 rounded-sm border border-red-400/40 px-1 py-px text-[8px] font-bold uppercase tracking-[0.2em] text-red-400/90">
                dnd
              </span>
            </>
          ) : (
            c.status[jobLine.key]
          )
        }
      />
    </div>
  );
}
