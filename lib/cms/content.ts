import { draftMode } from "next/headers";
import { readRow, readRows } from "@/lib/cms/store";
import { deepEqual, diffData } from "@/lib/cms/diff";
import {
  CMS_KEYS,
  DEFAULTS,
  normalize,
  type CmsData,
  type CmsKey,
} from "@/lib/cms/schema";

export type DraftStatus = "unpublished" | "clean" | "dirty";

export interface KeyStatus {
  key: CmsKey;
  status: DraftStatus;
  hasDraft: boolean;
  changes: string[];
  publishedAt: string | null;
  updatedAt: string | null;
}

async function inDraftMode(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false;
  }
}

export async function getDraft<K extends CmsKey>(key: K): Promise<CmsData[K]> {
  try {
    const draft = await readRow("drafts", key);
    if (draft) return normalize(key, draft.data);
    const published = await readRow("snapshots", key);
    if (published) return normalize(key, published.data);
  } catch (error) {
    console.error(`[cms] draft read failed for ${key}`, error);
  }
  return DEFAULTS[key];
}

export async function getPublished<K extends CmsKey>(
  key: K,
  { allowDraft = true } = {},
): Promise<CmsData[K]> {
  if (allowDraft && (await inDraftMode())) return getDraft(key);
  try {
    const row = await readRow("snapshots", key, true);
    if (row) return normalize(key, row.data);
  } catch (error) {
    console.error(`[cms] published read failed for ${key}`, error);
  }
  return DEFAULTS[key];
}

export async function getPublishedSite(): Promise<{
  data: Pick<CmsData, "projects" | "experience" | "skills">;
  copy: CmsData["copy"];
  preview: boolean;
}> {
  const preview = await inDraftMode();
  const [projects, experience, skills, copy] = await Promise.all([
    getPublished("projects"),
    getPublished("experience"),
    getPublished("skills"),
    getPublished("copy"),
  ]);
  return { data: { projects, experience, skills }, copy, preview };
}

export async function getStatuses(): Promise<KeyStatus[]> {
  let drafts: Awaited<ReturnType<typeof readRows>> = [];
  let snaps: Awaited<ReturnType<typeof readRows>> = [];
  try {
    [drafts, snaps] = await Promise.all([
      readRows("drafts"),
      readRows("snapshots"),
    ]);
  } catch (error) {
    console.error("[cms] status read failed", error);
  }
  return CMS_KEYS.map((key) => {
    const draft = drafts.find((r) => r.key === key);
    const snap = snaps.find((r) => r.key === key);
    if (!snap) {
      return {
        key,
        status: "unpublished",
        hasDraft: Boolean(draft),
        changes: [],
        publishedAt: null,
        updatedAt: draft?.at ?? null,
      };
    }
    const published = normalize(key, snap.data);
    const current = draft ? normalize(key, draft.data) : published;
    const same = deepEqual(published, current);
    return {
      key,
      status: same ? "clean" : "dirty",
      hasDraft: Boolean(draft),
      changes: same ? [] : diffData(published, current),
      publishedAt: snap.at,
      updatedAt: draft?.at ?? null,
    };
  });
}
