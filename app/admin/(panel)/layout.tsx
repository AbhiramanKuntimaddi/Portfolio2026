import { requireOwner } from "@/lib/auth";
import { cmsMode } from "@/lib/cms/store";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const owner = await requireOwner();
  const mode = cmsMode();
  return (
    <div className="min-h-dvh font-label text-[12px] tracking-[0.06em]">
      <AdminNav email={owner.email} dev={owner.dev} mode={mode} />
      {mode !== "supabase" && (
        <div className="border-b border-line bg-surface">
          <p className="mx-auto max-w-6xl px-6 py-3 text-muted lowercase md:px-10">
            {mode === "local" ? (
              <>
                <span className="text-accent">local mode</span> · edits save to
                .cms-local/ on this machine. connect supabase to edit the live
                site.
              </>
            ) : (
              <>
                <span className="text-red-400">not connected</span> · set the
                supabase env vars to save and publish.
              </>
            )}
          </p>
        </div>
      )}
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14">
        {children}
      </main>
    </div>
  );
}
