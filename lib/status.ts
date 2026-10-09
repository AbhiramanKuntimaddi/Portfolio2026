import type { Project } from "@/lib/data/projects";

export type SiteStatusState = "available" | "working" | "busy" | "away";

export interface SiteStatusLine {
  state: SiteStatusState;
  key: "weekend" | "work" | "evening";
  dnd?: boolean;
}

export function getJobLine(now: Date = new Date()): SiteStatusLine {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    weekday: "short",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const wd = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const isWeekday = ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(wd);

  if (!isWeekday) return { state: "available", key: "weekend" };
  if (hour >= 9 && hour < 17) return { state: "busy", key: "work", dnd: true };
  return { state: "available", key: "evening" };
}

export function openProjects(projects: Project[]): Project[] {
  return projects.filter(
    (p) => !p.hidden && (p.status === "ONGOING" || p.status === "UPCOMING"),
  );
}
