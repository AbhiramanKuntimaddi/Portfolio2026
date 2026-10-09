import { requireOwner } from "@/lib/auth";
import { cmsMode } from "@/lib/cms/store";
import { getStatuses } from "@/lib/cms/content";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const owner = await requireOwner();
  const mode = cmsMode();
  const pending = (await getStatuses()).filter(
    (s) => s.status !== "clean",
  ).length;

  return (
    <div className="min-h-dvh font-label text-[12px] tracking-[0.06em] md:grid md:grid-cols-[15rem_1fr]">
      <AdminSidebar
        email={owner.email}
        dev={owner.dev}
        mode={mode}
        pending={pending}
      />
      <div className="min-w-0">
        {mode !== "supabase" && (
          <div className="border-b border-line bg-surface px-6 py-3 font-body text-[13px] tracking-normal text-muted md:px-10">
            {mode === "local" ? (
              <>
                <span className="text-accent">Local mode.</span> Edits are saved
                in .cms-local/ on this computer, not the live site.
              </>
            ) : (
              <>
                <span className="text-red-400">Not connected.</span> Add the
                Supabase keys to save and publish.
              </>
            )}
          </div>
        )}
        <main className="mx-auto max-w-5xl px-6 py-10 md:px-10 md:py-14">
          {children}
        </main>
      </div>
    </div>
  );
}
