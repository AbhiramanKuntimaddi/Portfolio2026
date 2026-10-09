"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { discard, publish, publishAll } from "@/app/admin/actions";
import type { KeyStatus } from "@/lib/cms/content";
import { CMS_LABELS, type CmsKey } from "@/lib/cms/schema";

const PREVIEW: Record<CmsKey, string> = {
  projects: "/en/work",
  experience: "/en",
  skills: "/en",
  copy: "/en",
};

const CHIP: Record<KeyStatus["status"], { label: string; cls: string }> = {
  unpublished: {
    label: "not published · site shows built-in content",
    cls: "border-line text-muted",
  },
  dirty: {
    label: "draft · needs publish",
    cls: "border-amber-400/60 text-amber-400",
  },
  clean: { label: "live · up to date", cls: "border-accent/60 text-accent" },
};

const when = (iso: string | null) =>
  iso
    ? new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/Berlin",
      }).format(new Date(iso))
    : "never";

export function PublishPanel({ statuses }: { statuses: KeyStatus[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null,
  );
  const outstanding = statuses.filter((s) => s.status !== "clean").length;

  const run = (
    id: string,
    fn: () => Promise<{ ok: boolean; error?: string }>,
    done: string,
  ) => {
    setBusy(id);
    start(async () => {
      const res = await fn();
      setMessage(
        res.ok
          ? { ok: true, text: done }
          : { ok: false, text: res.error ?? "failed" },
      );
      setBusy(null);
      router.refresh();
    });
  };

  return (
    <div>
      <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-3 text-muted lowercase">
            <span className="text-accent">$</span> git status
          </p>
          <h1 className="font-heading text-4xl leading-none font-bold tracking-tight uppercase md:text-5xl">
            Publish
          </h1>
          <p className="mt-4 max-w-xl font-body text-sm tracking-normal text-muted">
            Drafts stay private until you publish. Preview shows the site with
            every draft applied, only to you.
          </p>
        </div>
        <button
          type="button"
          disabled={pending || outstanding === 0}
          onClick={() => run("all", publishAll, "everything is live")}
          className="cursor-pointer border border-accent bg-accent px-5 py-2 text-background lowercase disabled:cursor-default disabled:opacity-30"
        >
          {busy === "all" ? "publishing…" : `publish all (${outstanding})`}
        </button>
      </header>

      {message && (
        <p
          className={`mb-6 lowercase ${message.ok ? "text-accent" : "text-red-400"}`}
        >
          {message.text}
        </p>
      )}

      <ul className="space-y-4">
        {statuses.map((s) => (
          <li key={s.key} className="border border-line">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4 lowercase">
              <span className="font-heading text-lg tracking-tight text-foreground uppercase">
                {CMS_LABELS[s.key]}
              </span>
              <span className={`border px-2 py-0.5 ${CHIP[s.status].cls}`}>
                {CHIP[s.status].label}
              </span>
              <span className="text-muted">
                last published {when(s.publishedAt)}
              </span>
              <span className="flex-1" />
              <a
                href={`/preview?path=${encodeURIComponent(PREVIEW[s.key])}`}
                target="_blank"
                className="text-foreground/60 hover:text-accent"
              >
                preview ↗
              </a>
              {s.hasDraft && (
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => {
                    if (
                      window.confirm(
                        `Throw away the ${CMS_LABELS[s.key]} draft?`,
                      )
                    )
                      run(
                        s.key + ":discard",
                        () => discard(s.key),
                        "draft discarded",
                      );
                  }}
                  className="cursor-pointer text-foreground/60 hover:text-red-400 disabled:opacity-30"
                >
                  {busy === s.key + ":discard"
                    ? "discarding…"
                    : "discard draft"}
                </button>
              )}
              <button
                type="button"
                disabled={pending || s.status === "clean"}
                onClick={() =>
                  run(
                    s.key,
                    () => publish(s.key),
                    `${CMS_LABELS[s.key]} is live`,
                  )
                }
                className="cursor-pointer border border-accent px-4 py-1.5 text-accent transition-colors hover:bg-accent hover:text-background disabled:cursor-default disabled:border-line disabled:text-muted disabled:hover:bg-transparent"
              >
                {busy === s.key ? "publishing…" : "publish"}
              </button>
            </div>
            {s.changes.length > 0 && (
              <ul className="space-y-1.5 border-t border-line px-5 py-4 font-body text-[13px] tracking-normal text-foreground/75">
                {s.changes.slice(0, 40).map((c, i) => (
                  <li key={i}>
                    <span className="mr-2 font-label text-amber-400">~</span>
                    {c}
                  </li>
                ))}
                {s.changes.length > 40 && (
                  <li className="text-muted">
                    and {s.changes.length - 40} more…
                  </li>
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
