"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveDraft } from "@/app/admin/actions";
import type { CmsKey } from "@/lib/cms/schema";

export function SaveBar({
  cmsKey,
  data,
  dirty,
  onSaved,
}: {
  cmsKey: CmsKey;
  data: unknown;
  dirty: boolean;
  onSaved: () => void;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null,
  );

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const save = () =>
    start(async () => {
      const res = await saveDraft(cmsKey, JSON.stringify(data));
      if (res.ok) {
        setMessage({ ok: true, text: "saved as draft" });
        onSaved();
        router.refresh();
      } else {
        setMessage({ ok: false, text: res.error });
      }
    });

  return (
    <div className="sticky bottom-0 z-30 -mx-6 mt-12 border-t border-line bg-background/95 px-6 py-4 backdrop-blur-sm md:-mx-10 md:px-10">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lowercase">
        <span className={dirty ? "text-amber-400" : "text-muted"}>
          {dirty ? "● unsaved changes" : "○ no unsaved changes"}
        </span>
        {message && (
          <span className={message.ok ? "text-accent" : "text-red-400"}>
            {message.text}
          </span>
        )}
        <span className="flex-1" />
        <Link
          href="/admin/publish"
          className="text-foreground/60 hover:text-accent"
        >
          review & publish →
        </Link>
        <button
          type="button"
          disabled={!dirty || pending}
          onClick={save}
          className="cursor-pointer border border-accent bg-accent px-5 py-2 text-background transition-opacity disabled:cursor-default disabled:opacity-30"
        >
          {pending ? "saving…" : "save draft"}
        </button>
      </div>
    </div>
  );
}
