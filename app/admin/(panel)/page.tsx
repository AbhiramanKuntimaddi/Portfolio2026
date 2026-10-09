import Link from "next/link";
import { getDraft, getStatuses } from "@/lib/cms/content";
import {
  CMS_LABELS,
  featuredProjects,
  visibleProjects,
  type CmsKey,
} from "@/lib/cms/schema";

const CHIP = {
  unpublished: { label: "not published", cls: "border-line text-muted" },
  dirty: {
    label: "draft · needs publish",
    cls: "border-amber-400/60 text-amber-400",
  },
  clean: { label: "live", cls: "border-accent/60 text-accent" },
} as const;

export default async function Overview() {
  const [statuses, projects, experience, skills] = await Promise.all([
    getStatuses(),
    getDraft("projects"),
    getDraft("experience"),
    getDraft("skills"),
  ]);

  const facts: Record<CmsKey, string> = {
    projects: `${visibleProjects(projects).length} visible · ${featuredProjects(projects).length} on home`,
    experience: `${experience.length} entries`,
    skills: `${skills.length} groups · ${skills.reduce((n, g) => n + g.skills.length, 0)} tools`,
    copy: "headings, labels & sentences · en + de",
  };
  const pending = statuses.filter((s) => s.status !== "clean").length;

  return (
    <div>
      <p className="mb-3 text-muted lowercase">
        <span className="text-accent">$</span> whoami
      </p>
      <h1 className="font-heading text-4xl leading-none font-bold tracking-tight uppercase md:text-6xl">
        Overview
      </h1>
      <p className="mt-4 mb-12 max-w-xl font-body text-sm tracking-normal text-muted">
        Edit a section, save it as a draft, then review and publish. Nothing
        reaches the site until it&apos;s published.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {statuses.map((s) => (
          <Link
            key={s.key}
            href={`/admin/${s.key}`}
            className="group flex flex-col gap-6 border border-line p-6 transition-colors hover:border-accent"
          >
            <div className="flex items-center justify-between gap-4 lowercase">
              <span className="font-heading text-2xl tracking-tight text-foreground uppercase transition-colors group-hover:text-accent">
                {CMS_LABELS[s.key]}
              </span>
              <span className={`border px-2 py-0.5 ${CHIP[s.status].cls}`}>
                {CHIP[s.status].label}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 lowercase">
              <span className="text-muted">{facts[s.key]}</span>
              <span className="text-accent transition-transform group-hover:translate-x-1">
                edit →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/admin/publish"
        className="mt-8 flex items-center justify-between border border-line px-6 py-5 lowercase transition-colors hover:border-accent"
      >
        <span>
          <span className="text-accent">$</span> publish
        </span>
        <span className={pending ? "text-amber-400" : "text-muted"}>
          {pending
            ? `${pending} section${pending === 1 ? "" : "s"} waiting`
            : "everything is live"}{" "}
          →
        </span>
      </Link>
    </div>
  );
}
