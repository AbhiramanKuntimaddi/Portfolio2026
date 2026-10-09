import { projects, PROJECT_STATUSES, type Project } from "@/lib/data/projects";
import { experiences, type ExperienceData } from "@/lib/data/experiences";
import { skillGroups, type SkillGroup } from "@/lib/data/skills";
import { siteCopy, type Copy } from "@/lib/content/site";
import { isText, type Text } from "@/lib/i18n";

export const CMS_KEYS = ["projects", "experience", "skills", "copy"] as const;
export type CmsKey = (typeof CMS_KEYS)[number];

export interface CmsData {
  projects: Project[];
  experience: ExperienceData[];
  skills: SkillGroup[];
  copy: Copy;
}

export type SiteData = Pick<CmsData, "projects" | "experience" | "skills">;

export const CMS_LABELS: Record<CmsKey, string> = {
  projects: "Projects",
  experience: "Experience",
  skills: "Skills",
  copy: "Page copy",
};

export const DEFAULTS: CmsData = {
  projects,
  experience: experiences,
  skills: skillGroups,
  copy: siteCopy,
};

export function isCmsKey(value: string): value is CmsKey {
  return (CMS_KEYS as readonly string[]).includes(value);
}

const str = (v: unknown, fallback = "") =>
  typeof v === "string" ? v : fallback;

const text = (v: unknown): Text =>
  isText(v) ? { en: v.en, de: v.de } : { en: str(v), de: str(v) };

const list = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);

const obj = (v: unknown): Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v)
    ? (v as Record<string, unknown>)
    : {};

function normalizeProject(raw: unknown, i: number): Project {
  const p = obj(raw);
  const status = PROJECT_STATUSES.includes(p.status as Project["status"])
    ? (p.status as Project["status"])
    : "COMPLETED";
  return {
    id: str(p.id, String(i + 1).padStart(2, "0")),
    slug: str(p.slug),
    title: text(p.title),
    category: text(p.category),
    description: text(p.description),
    stack: list(p.stack)
      .map((s) => str(s))
      .filter(Boolean),
    year: str(p.year),
    status,
    featured: p.featured === true,
    hidden: p.hidden === true,
    cover: str(p.cover),
    images: list(p.images)
      .map((s) => str(s))
      .filter(Boolean),
  };
}

function normalizeExperience(raw: unknown, i: number): ExperienceData {
  const e = obj(raw);
  return {
    id: str(e.id, String(i + 1).padStart(2, "0")),
    year: str(e.year),
    title: text(e.title),
    company: str(e.company),
    desc: text(e.desc),
    context: text(e.context),
  };
}

function normalizeSkill(raw: unknown, i: number): SkillGroup {
  const g = obj(raw);
  return {
    id: str(g.id, String(i + 1).padStart(2, "0")),
    group: text(g.group),
    role: text(g.role),
    skills: list(g.skills)
      .map((s) => (isText(s) ? { en: s.en, de: s.de } : str(s)))
      .filter((s) => (typeof s === "string" ? s : s.en)),
    desc: text(g.desc),
  };
}

export function mergeCopy<T>(base: T, override: unknown): T {
  if (isText(base)) {
    if (!isText(override)) return base;
    return { en: override.en, de: override.de } as T;
  }
  if (typeof base !== "object" || base === null) {
    return (typeof override === typeof base ? override : base) as T;
  }
  const o = obj(override);
  return Object.fromEntries(
    Object.entries(base as Record<string, unknown>).map(([k, v]) => [
      k,
      mergeCopy(v, o[k]),
    ]),
  ) as T;
}

export function normalize<K extends CmsKey>(key: K, data: unknown): CmsData[K] {
  switch (key) {
    case "projects":
      return list(data).map(normalizeProject) as CmsData[K];
    case "experience":
      return list(data).map(normalizeExperience) as CmsData[K];
    case "skills":
      return list(data).map(normalizeSkill) as CmsData[K];
    default:
      return mergeCopy(siteCopy, data) as CmsData[K];
  }
}

export function visibleProjects(all: Project[]): Project[] {
  return all.filter((p) => !p.hidden && p.slug);
}

export function featuredProjects(all: Project[], max = 6): Project[] {
  const visible = visibleProjects(all);
  const featured = visible.filter((p) => p.featured);
  return (featured.length ? featured : visible).slice(0, max);
}
