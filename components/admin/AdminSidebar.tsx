"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/actions";
import type { CmsMode } from "@/lib/cms/store";

const GROUPS = [
  {
    title: "Content",
    links: [
      { href: "/admin", label: "Overview" },
      { href: "/admin/projects", label: "Projects" },
      { href: "/admin/experience", label: "Experience" },
      { href: "/admin/skills", label: "Skills" },
      { href: "/admin/copy", label: "Site text" },
    ],
  },
  {
    title: "Publishing",
    links: [
      { href: "/admin/publish", label: "Publish" },
      { href: "/admin/activity", label: "Activity" },
    ],
  },
];

export function AdminSidebar({
  email,
  dev,
  mode,
  pending,
}: {
  email: string;
  dev: boolean;
  mode: CmsMode;
  pending: number;
}) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="z-40 flex flex-col border-b border-line bg-background md:sticky md:top-0 md:h-dvh md:border-r md:border-b-0">
      <div className="flex items-center justify-between gap-3 px-6 py-5 md:block">
        <Link href="/admin" className="block">
          <span className="block font-heading text-lg leading-none tracking-tight uppercase">
            Abhiraman
          </span>
          <span className="mt-1.5 block text-muted lowercase">
            portfolio admin
          </span>
        </Link>
        {(dev || mode === "local") && (
          <span className="inline-block border border-amber-400/60 px-2 py-0.5 text-amber-400 lowercase md:mt-4">
            {dev ? "dev login" : "local mode"}
          </span>
        )}
        <form action={signOut} className="md:hidden">
          <button
            type="submit"
            className="cursor-pointer font-body text-[13px] tracking-normal text-foreground/65 hover:text-red-400"
          >
            Sign out
          </button>
        </form>
      </div>

      <nav className="flex gap-6 overflow-x-auto px-6 pb-4 md:flex-1 md:flex-col md:gap-8 md:overflow-visible md:pt-4 md:pb-0">
        {GROUPS.map((g) => (
          <div key={g.title} className="flex shrink-0 gap-1 md:flex-col">
            <span className="mb-2 hidden px-3 text-muted lowercase md:block">
              {g.title}
            </span>
            {g.links.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`flex items-center justify-between gap-3 border-l-2 px-3 py-2 font-body text-[14px] tracking-normal whitespace-nowrap transition-colors ${
                    active
                      ? "border-accent bg-surface text-foreground"
                      : "border-transparent text-foreground/65 hover:text-foreground"
                  }`}
                >
                  {l.label}
                  {l.href === "/admin/publish" && pending > 0 && (
                    <span className="min-w-5 bg-amber-400 px-1.5 text-center font-label text-[10px] text-background tabular-nums">
                      {pending}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="hidden flex-col gap-3 border-t border-line px-6 py-5 md:flex">
        <a
          href="/en"
          target="_blank"
          className="font-body text-[13px] tracking-normal text-foreground/65 hover:text-accent"
        >
          View site ↗
        </a>
        <span className="truncate text-muted lowercase" title={email}>
          {email}
        </span>
        <form action={signOut}>
          <button
            type="submit"
            className="cursor-pointer font-body text-[13px] tracking-normal text-foreground/65 hover:text-red-400"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
