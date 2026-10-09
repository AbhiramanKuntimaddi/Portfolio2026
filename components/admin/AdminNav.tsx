"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/actions";
import type { CmsMode } from "@/lib/cms/store";

const LINKS = [
  { href: "/admin", label: "overview" },
  { href: "/admin/projects", label: "projects" },
  { href: "/admin/experience", label: "experience" },
  { href: "/admin/skills", label: "skills" },
  { href: "/admin/copy", label: "copy" },
  { href: "/admin/publish", label: "publish" },
  { href: "/admin/activity", label: "activity" },
];

export function AdminNav({
  email,
  dev,
  mode,
}: {
  email: string;
  dev: boolean;
  mode: CmsMode;
}) {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4 md:px-10">
        <Link href="/admin" className="lowercase">
          <span className="text-muted">~/abhiraman/</span>
          <span className="text-foreground">admin</span>
        </Link>
        <nav className="flex flex-1 flex-wrap gap-x-5 gap-y-2 lowercase">
          {LINKS.map((l) => {
            const active =
              l.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`transition-colors ${
                  active
                    ? "text-accent"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {active ? "> " : ""}
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4 lowercase">
          {dev && (
            <span className="border border-amber-400/60 px-2 py-0.5 text-amber-400">
              dev
            </span>
          )}
          {mode === "local" && !dev && (
            <span className="border border-line px-2 py-0.5 text-muted">
              local
            </span>
          )}
          <a
            href="/en"
            target="_blank"
            className="text-foreground/60 hover:text-accent"
          >
            site ↗
          </a>
          <span className="hidden text-muted md:inline">{email}</span>
          <form action={signOut}>
            <button
              type="submit"
              className="cursor-pointer text-foreground/60 hover:text-red-400"
            >
              exit
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
