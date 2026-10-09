import { promises as fs } from "node:fs";
import path from "node:path";
import { createAdminClient } from "@/lib/supabase/admin";
import { createPublicClient } from "@/lib/supabase/public";
import { serviceRoleConfigured, supabaseConfigured } from "@/lib/supabase/env";

export type Table = "drafts" | "snapshots";
export type CmsMode = "supabase" | "local" | "off";

export interface Row {
  key: string;
  data: unknown;
  at: string;
}

export interface ActivityEntry {
  id: string;
  actor: string | null;
  action: string;
  target: string | null;
  detail: string | null;
  created_at: string;
}

const MEDIA_BUCKET = "portfolio-media";
const LOCAL_DIR = path.join(process.cwd(), ".cms-local");
const LOCAL_MEDIA = path.join(process.cwd(), "public", "cms-local");

const TABLES: Record<Table, { name: string; at: string }> = {
  drafts: { name: "cms_drafts", at: "updated_at" },
  snapshots: { name: "cms_snapshots", at: "published_at" },
};

export function cmsMode(): CmsMode {
  if (supabaseConfigured()) return "supabase";
  if (process.env.NODE_ENV === "development") return "local";
  return "off";
}

async function readLocal<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(path.join(LOCAL_DIR, file), "utf8"));
  } catch {
    return fallback;
  }
}

async function writeLocal(file: string, value: unknown) {
  await fs.mkdir(LOCAL_DIR, { recursive: true });
  await fs.writeFile(
    path.join(LOCAL_DIR, file),
    JSON.stringify(value, null, 2),
  );
}

type LocalTable = Record<string, { data: unknown; at: string }>;

export async function readRows(
  table: Table,
  publicRead = false,
): Promise<Row[]> {
  const mode = cmsMode();
  if (mode === "off") return [];
  if (mode === "local") {
    const t = await readLocal<LocalTable>(`${table}.json`, {});
    return Object.entries(t).map(([key, v]) => ({
      key,
      data: v.data,
      at: v.at,
    }));
  }
  const { name, at } = TABLES[table];
  const db =
    publicRead || !serviceRoleConfigured()
      ? createPublicClient()
      : createAdminClient();
  const { data, error } = await db.from(name).select(`key, data, ${at}`);
  if (error) throw new Error(error.message);
  return ((data ?? []) as unknown as Record<string, unknown>[]).map((r) => ({
    key: String(r.key),
    data: r.data,
    at: String(r[at] ?? ""),
  }));
}

export async function readRow(
  table: Table,
  key: string,
  publicRead = false,
): Promise<Row | null> {
  const rows = await readRows(table, publicRead);
  return rows.find((r) => r.key === key) ?? null;
}

export async function writeRow(table: Table, key: string, data: unknown) {
  const mode = cmsMode();
  const now = new Date().toISOString();
  if (mode === "off") throw new Error("The CMS is not connected to Supabase.");
  if (mode === "local") {
    const t = await readLocal<LocalTable>(`${table}.json`, {});
    t[key] = { data, at: now };
    await writeLocal(`${table}.json`, t);
    return;
  }
  const { name, at } = TABLES[table];
  const { error } = await createAdminClient()
    .from(name)
    .upsert({ key, data, [at]: now }, { onConflict: "key" });
  if (error) throw new Error(error.message);
}

export async function deleteRow(table: Table, key: string) {
  const mode = cmsMode();
  if (mode === "off") throw new Error("The CMS is not connected to Supabase.");
  if (mode === "local") {
    const t = await readLocal<LocalTable>(`${table}.json`, {});
    delete t[key];
    await writeLocal(`${table}.json`, t);
    return;
  }
  const { error } = await createAdminClient()
    .from(TABLES[table].name)
    .delete()
    .eq("key", key);
  if (error) throw new Error(error.message);
}

export async function uploadMedia(file: File, folder: string): Promise<string> {
  const mode = cmsMode();
  if (mode === "off") throw new Error("The CMS is not connected to Supabase.");
  const ext = (file.name.split(".").pop() ?? "bin")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  const safeFolder = folder.replace(/[^a-z0-9-]/gi, "").toLowerCase() || "misc";
  const name = `${safeFolder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  if (mode === "local") {
    const target = path.join(LOCAL_MEDIA, name);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, bytes);
    return `/cms-local/${name}`;
  }
  const db = createAdminClient();
  const { error } = await db.storage.from(MEDIA_BUCKET).upload(name, bytes, {
    contentType: file.type || undefined,
    upsert: false,
  });
  if (error) throw new Error(error.message);
  return db.storage.from(MEDIA_BUCKET).getPublicUrl(name).data.publicUrl;
}

export async function addActivity(
  entry: Omit<ActivityEntry, "id" | "created_at">,
) {
  const mode = cmsMode();
  if (mode === "off") return;
  try {
    if (mode === "local") {
      const log = await readLocal<ActivityEntry[]>("activity.json", []);
      log.unshift({
        ...entry,
        id: Math.random().toString(36).slice(2),
        created_at: new Date().toISOString(),
      });
      await writeLocal("activity.json", log.slice(0, 500));
      return;
    }
    await createAdminClient().from("cms_activity").insert(entry);
  } catch {
    return;
  }
}

export async function readActivity(limit = 200): Promise<ActivityEntry[]> {
  const mode = cmsMode();
  if (mode === "off") return [];
  try {
    if (mode === "local") {
      return (await readLocal<ActivityEntry[]>("activity.json", [])).slice(
        0,
        limit,
      );
    }
    const { data } = await createAdminClient()
      .from("cms_activity")
      .select("id, actor, action, target, detail, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);
    return (data as ActivityEntry[]) ?? [];
  } catch {
    return [];
  }
}
