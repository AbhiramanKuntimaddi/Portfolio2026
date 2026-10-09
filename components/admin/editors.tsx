"use client";

import { ListEditor } from "./ListEditor";
import type { FieldSpec } from "./fields";
import { PROJECT_STATUSES, type Project } from "@/lib/data/projects";
import type { ExperienceData } from "@/lib/data/experiences";
import type { SkillGroup } from "@/lib/data/skills";

const empty = { en: "", de: "" };

const nextId = (items: { id: string }[]) =>
  String(
    items.reduce((max, it) => Math.max(max, Number(it.id) || 0), 0) + 1,
  ).padStart(2, "0");

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const PROJECT_FIELDS: FieldSpec[] = [
  { key: "title", label: "title", kind: "i18n" },
  {
    key: "slug",
    label: "slug",
    kind: "text",
    hint: "url: /work/<slug> · empty = from title",
  },
  {
    key: "category",
    label: "category",
    kind: "i18n",
    hint: "e.g. Web platform · CMS",
  },
  { key: "description", label: "description", kind: "i18n-area" },
  { key: "year", label: "year", kind: "text" },
  {
    key: "status",
    label: "status",
    kind: "select",
    options: PROJECT_STATUSES.map((s) => ({
      value: s,
      label: s.toLowerCase(),
    })),
  },
  { key: "stack", label: "stack", kind: "tags" },
  {
    key: "featured",
    label: "featured",
    kind: "bool",
    hint: "show on the homepage",
  },
  {
    key: "hidden",
    label: "hidden",
    kind: "bool",
    hint: "hide everywhere on the site",
  },
  { key: "cover", label: "cover image", kind: "image", folder: "projects" },
  { key: "images", label: "gallery", kind: "images", folder: "projects" },
];

export function ProjectsEditor({ initial }: { initial: Project[] }) {
  return (
    <ListEditor<Project & Record<string, unknown>>
      cmsKey="projects"
      title="Projects"
      intro="Order here is the order on the site. Featured projects cycle on the homepage (up to six); every visible project is listed on /work."
      initial={initial as (Project & Record<string, unknown>)[]}
      fields={PROJECT_FIELDS}
      label={(p) => p.title.en}
      sublabel={(p) =>
        `${p.year} · /work/${p.slug} · ${p.status.toLowerCase()}`
      }
      badges={(p) => [
        ...(p.featured ? [{ label: "featured", tone: "accent" as const }] : []),
        ...(p.hidden ? [{ label: "hidden", tone: "warn" as const }] : []),
        ...(!p.title.de.trim() || !p.description.de.trim()
          ? [{ label: "de missing", tone: "warn" as const }]
          : []),
      ]}
      toggles={[{ key: "featured", label: "home" }]}
      create={(items) => ({
        id: nextId(items),
        slug: "",
        title: { ...empty },
        category: { ...empty },
        description: { ...empty },
        stack: [],
        year: String(new Date().getFullYear()),
        status: "ONGOING",
        featured: false,
        hidden: false,
        cover: "",
        images: [],
      })}
      prepare={(p) => ({ ...p, slug: slugify(p.slug || p.title.en) })}
      check={(p, items, index) => {
        if (!p.title.en.trim()) return "Add an English title.";
        if (!p.slug) return "Add a slug.";
        if (items.some((x, j) => j !== index && x.slug === p.slug))
          return `Another project already uses /work/${p.slug}.`;
        return null;
      }}
    />
  );
}

const EXPERIENCE_FIELDS: FieldSpec[] = [
  { key: "company", label: "company", kind: "text" },
  { key: "title", label: "role", kind: "i18n" },
  { key: "year", label: "year", kind: "text" },
  { key: "context", label: "label", kind: "i18n", hint: "e.g. Current role" },
  { key: "desc", label: "description", kind: "i18n-area" },
];

export function ExperienceEditor({ initial }: { initial: ExperienceData[] }) {
  return (
    <ListEditor<ExperienceData & Record<string, unknown>>
      cmsKey="experience"
      title="Experience"
      intro="Shown in this order in the experience section, newest first is usual."
      initial={initial as (ExperienceData & Record<string, unknown>)[]}
      fields={EXPERIENCE_FIELDS}
      label={(e) => e.company}
      sublabel={(e) => `${e.year} · ${e.title.en}`}
      badges={(e) =>
        !e.desc.de.trim() || !e.title.de.trim()
          ? [{ label: "de missing", tone: "warn" }]
          : []
      }
      create={(items) => ({
        id: nextId(items),
        year: String(new Date().getFullYear()),
        title: { ...empty },
        company: "",
        desc: { ...empty },
        context: { ...empty },
      })}
      check={(e) => (!e.company.trim() ? "Add a company." : null)}
    />
  );
}

const SKILL_FIELDS: FieldSpec[] = [
  { key: "group", label: "group", kind: "i18n" },
  { key: "role", label: "subtitle", kind: "i18n" },
  { key: "desc", label: "description", kind: "i18n-area" },
  {
    key: "skills",
    label: "tools",
    kind: "tags-i18n",
    hint: "add a german name only when it differs",
  },
];

export function SkillsEditor({ initial }: { initial: SkillGroup[] }) {
  return (
    <ListEditor<SkillGroup & Record<string, unknown>>
      cmsKey="skills"
      title="Skills"
      intro="Each group becomes one step in the skills section."
      initial={initial as (SkillGroup & Record<string, unknown>)[]}
      fields={SKILL_FIELDS}
      label={(g) => g.group.en}
      sublabel={(g) => `${g.skills.length} tools · ${g.role.en}`}
      badges={(g) =>
        !g.desc.de.trim() || !g.group.de.trim()
          ? [{ label: "de missing", tone: "warn" }]
          : []
      }
      create={(items) => ({
        id: nextId(items),
        group: { ...empty },
        role: { ...empty },
        skills: [],
        desc: { ...empty },
      })}
      check={(g) => (!g.group.en.trim() ? "Add an English group name." : null)}
    />
  );
}
