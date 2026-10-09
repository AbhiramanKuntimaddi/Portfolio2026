"use client";

import { usePathname } from "next/navigation";

export function PreviewBanner() {
  const pathname = usePathname();
  return (
    <div
      data-cursor="native"
      className="fixed bottom-6 left-1/2 z-130 flex -translate-x-1/2 items-center gap-4 border border-accent bg-background px-4 py-2.5 font-label text-[11px] tracking-[0.12em] lowercase"
    >
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
      <span className="text-foreground/85">previewing drafts</span>
      <a
        href={`/preview/exit?path=${encodeURIComponent(pathname)}`}
        className="text-accent underline-offset-4 hover:underline"
      >
        exit
      </a>
    </div>
  );
}
