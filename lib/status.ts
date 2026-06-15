import { projects, type Project } from "@/lib/data/projects";

export type SiteStatusState = "available" | "working" | "busy" | "away";

export interface SiteStatusLine {
  state: SiteStatusState;
  label: string;
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

  if (!isWeekday) {
    return {
      state: "available",
      label: "off the clock · weekend builds welcome",
    };
  }
  if (hour >= 9 && hour < 17) {
    return { state: "busy", label: "9-to-5 at SoftDeCC Software GmbH", dnd: true };
  }
  return { state: "available", label: "side projects after hours" };
}

export function openProjects(): Project[] {
  return projects.filter(
    (p) => p.status === "ONGOING" || p.status === "UPCOMING",
  );
}
