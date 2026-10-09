"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOwner, DEV_BYPASS } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";
import { getDraft, getStatuses } from "@/lib/cms/content";
import { diffData } from "@/lib/cms/diff";
import { CMS_LABELS, isCmsKey, normalize, type CmsKey } from "@/lib/cms/schema";
import {
  addActivity,
  cmsMode,
  deleteRow,
  uploadMedia,
  writeRow,
} from "@/lib/cms/store";

export type ActionResult =
  | { ok: true; url?: string }
  | { ok: false; error: string };

const MAX_UPLOAD = 8 * 1024 * 1024;

function fail(error: unknown): ActionResult {
  return {
    ok: false,
    error: error instanceof Error ? error.message : String(error),
  };
}

function validate(key: CmsKey, data: unknown): string | null {
  if (key !== "projects") return null;
  const slugs = (data as { slug: string }[]).map((p) => p.slug.trim());
  if (slugs.some((s) => !s)) return "Every project needs a slug.";
  if (slugs.some((s) => !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s)))
    return "Slugs may only use lowercase letters, numbers and dashes.";
  if (new Set(slugs).size !== slugs.length) return "Two projects share a slug.";
  return null;
}

export async function saveDraft(
  key: string,
  payload: string,
): Promise<ActionResult> {
  const owner = await requireOwner();
  if (!isCmsKey(key)) return { ok: false, error: "Unknown section." };
  if (cmsMode() === "off")
    return { ok: false, error: "Connect Supabase to save." };
  try {
    const data = normalize(key, JSON.parse(payload));
    const problem = validate(key, data);
    if (problem) return { ok: false, error: problem };
    const before = await getDraft(key);
    const changes = diffData(before, data);
    await writeRow("drafts", key, data);
    await addActivity({
      actor: owner.email,
      action: "edit",
      target: key,
      detail: changes.length
        ? `${changes.length} change${changes.length === 1 ? "" : "s"}`
        : "no changes",
    });
    revalidatePath("/admin", "layout");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

async function publishKey(key: CmsKey, actor: string) {
  const data = await getDraft(key);
  await writeRow("snapshots", key, data);
  await deleteRow("drafts", key);
  await addActivity({
    actor,
    action: "publish",
    target: key,
    detail: `${CMS_LABELS[key]} went live`,
  });
}

export async function publish(key: string): Promise<ActionResult> {
  const owner = await requireOwner();
  if (!isCmsKey(key)) return { ok: false, error: "Unknown section." };
  if (cmsMode() === "off")
    return { ok: false, error: "Connect Supabase to publish." };
  try {
    await publishKey(key, owner.email);
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function publishAll(): Promise<ActionResult> {
  const owner = await requireOwner();
  if (cmsMode() === "off")
    return { ok: false, error: "Connect Supabase to publish." };
  try {
    const statuses = await getStatuses();
    for (const s of statuses) {
      if (s.status !== "clean") await publishKey(s.key, owner.email);
    }
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function discard(key: string): Promise<ActionResult> {
  const owner = await requireOwner();
  if (!isCmsKey(key)) return { ok: false, error: "Unknown section." };
  if (cmsMode() === "off")
    return { ok: false, error: "Connect Supabase first." };
  try {
    await deleteRow("drafts", key);
    await addActivity({
      actor: owner.email,
      action: "discard",
      target: key,
      detail: "draft discarded",
    });
    revalidatePath("/admin", "layout");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function uploadImage(form: FormData): Promise<ActionResult> {
  await requireOwner();
  const file = form.get("file");
  const folder = String(form.get("folder") ?? "misc");
  if (!(file instanceof File) || file.size === 0)
    return { ok: false, error: "Choose an image first." };
  if (!file.type.startsWith("image/"))
    return { ok: false, error: "Only images can be uploaded." };
  if (file.size > MAX_UPLOAD)
    return { ok: false, error: "Images must be 8 MB or smaller." };
  try {
    return { ok: true, url: await uploadMedia(file, folder) };
  } catch (error) {
    return fail(error);
  }
}

export async function signOut() {
  if (!DEV_BYPASS && supabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}
