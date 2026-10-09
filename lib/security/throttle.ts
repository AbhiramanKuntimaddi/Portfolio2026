import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { serviceRoleConfigured } from "@/lib/supabase/env";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const LOCK_MS = 15 * 60 * 1000;

interface ThrottleRow {
  identifier: string;
  attempts: number;
  first_attempt: string;
  locked_until: string | null;
}

export async function getClientIp(): Promise<string> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return h.get("x-real-ip")?.trim() || "unknown";
}

const ids = (ip: string, email: string) => [
  `ip:${ip}`,
  `email:${email.toLowerCase().trim()}`,
];

export async function lockedMinutes(
  ip: string,
  email: string,
): Promise<number> {
  if (!serviceRoleConfigured()) return 0;
  const { data } = await createAdminClient()
    .from("login_throttle")
    .select("identifier, locked_until")
    .in("identifier", ids(ip, email));
  const now = Date.now();
  const until = Math.max(
    0,
    ...((data ?? []) as Pick<ThrottleRow, "locked_until">[]).map((r) =>
      r.locked_until ? new Date(r.locked_until).getTime() : 0,
    ),
  );
  return until > now ? Math.ceil((until - now) / 60000) : 0;
}

export async function recordFailure(ip: string, email: string) {
  if (!serviceRoleConfigured()) return;
  const db = createAdminClient();
  const keys = ids(ip, email);
  const { data } = await db
    .from("login_throttle")
    .select("identifier, attempts, first_attempt, locked_until")
    .in("identifier", keys);
  const existing = new Map(
    ((data ?? []) as ThrottleRow[]).map((r) => [r.identifier, r]),
  );
  const now = Date.now();
  const nowIso = new Date(now).toISOString();
  const rows = keys.map((identifier) => {
    const prev = existing.get(identifier);
    const fresh =
      !prev || now - new Date(prev.first_attempt).getTime() > WINDOW_MS;
    const attempts = fresh ? 1 : prev.attempts + 1;
    return {
      identifier,
      attempts,
      first_attempt: fresh ? nowIso : prev.first_attempt,
      locked_until:
        attempts >= MAX_ATTEMPTS ? new Date(now + LOCK_MS).toISOString() : null,
      updated_at: nowIso,
    };
  });
  await db.from("login_throttle").upsert(rows, { onConflict: "identifier" });
}

export async function clearFailures(ip: string, email: string) {
  if (!serviceRoleConfigured()) return;
  await createAdminClient()
    .from("login_throttle")
    .delete()
    .in("identifier", ids(ip, email));
}
