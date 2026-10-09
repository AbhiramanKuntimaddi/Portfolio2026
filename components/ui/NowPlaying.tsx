"use client";

import { useEffect, useState } from "react";
import { useContent } from "@/components/providers/ContentProvider";

interface Track {
  isPlaying: boolean;
  configured?: boolean;
  title?: string;
  artist?: string;
  albumImage?: string;
  url?: string;
}

export function NowPlaying() {
  const { c } = useContent();
  const [track, setTrack] = useState<Track>({ isPlaying: false });

  useEffect(() => {
    let alive = true;
    let timer: ReturnType<typeof setInterval> | null = null;
    let controller: AbortController | null = null;

    const load = async () => {
      if (document.visibilityState !== "visible") return;
      controller?.abort();
      controller = new AbortController();
      try {
        const res = await fetch("/api/spotify", {
          signal: controller.signal,
        });
        const data = (await res.json()) as Track;
        if (alive) setTrack(data);
      } catch {
        /* aborted or offline — keep last state */
      }
    };

    const start = () => {
      if (timer) return;
      load();
      timer = setInterval(load, 30000);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      alive = false;
      stop();
      controller?.abort();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (!track.isPlaying) {
    return (
      <div className="flex items-center gap-2 text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
        <span className="text-xs font-medium lg:text-sm">{c.hero.offline}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3"
      >
        {track.albumImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={track.albumImage}
            alt={track.title ?? c.hero.albumArt}
            className="w-10 h-10 rounded-sm object-cover border border-foreground/10"
          />
        )}
        <span className="flex flex-col items-start min-w-0">
          <span className="text-sm text-foreground font-medium truncate max-w-45 group-hover:text-accent transition-colors">
            {track.title}
          </span>
          <span className="text-[11px] text-muted truncate max-w-45">
            {track.artist}
          </span>
        </span>
        <span className="flex items-end gap-0.5 h-4 ml-1">
          <span
            className="np-bar w-0.5 bg-accent"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="np-bar w-0.5 bg-accent"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="np-bar w-0.5 bg-accent"
            style={{ animationDelay: "300ms" }}
          />
        </span>
      </a>
    </div>
  );
}
