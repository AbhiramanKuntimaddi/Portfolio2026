import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { serviceRoleConfigured, supabaseConfigured } from "@/lib/supabase/env";

export interface Owner {
  email: string;
  dev: boolean;
}

export const DEV_BYPASS =
  process.env.ADMIN_DEV === "true" && process.env.NODE_ENV === "development";

export async function isAdminEmail(
  email: string | null | undefined,
): Promise<boolean> {
  const value = email?.trim().toLowerCase();
  if (!value || !serviceRoleConfigured()) return false;
  try {
    const { data, error } = await createAdminClient()
      .from("cms_admins")
      .select("email")
      .eq("email", value)
      .maybeSingle();
    return !error && Boolean(data);
  } catch {
    return false;
  }
}

export async function getOwner(): Promise<Owner | null> {
  if (DEV_BYPASS) return { email: "dev@local", dev: true };
  if (!supabaseConfigured()) return null;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user || !(await isAdminEmail(user.email))) return null;
    return { email: user.email!, dev: false };
  } catch {
    return null;
  }
}

export async function requireOwner(): Promise<Owner> {
  const owner = await getOwner();
  if (!owner) redirect("/admin/login");
  return owner;
}
