"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";
import { DEV_BYPASS, isAdminEmail } from "@/lib/auth";
import {
  clearFailures,
  getClientIp,
  lockedMinutes,
  recordFailure,
} from "@/lib/security/throttle";

export type LoginState = { error: string | null };

export async function signIn(
  _prev: LoginState,
  form: FormData,
): Promise<LoginState> {
  if (DEV_BYPASS) redirect("/admin");
  if (!supabaseConfigured())
    return {
      error:
        "Supabase isn't connected. For local editing set ADMIN_DEV=true in .env.local.",
    };

  const email = String(form.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(form.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };

  const ip = await getClientIp();
  const locked = await lockedMinutes(ip, email);
  if (locked)
    return { error: `Too many attempts. Try again in ${locked} min.` };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !(await isAdminEmail(email))) {
    if (!error) await supabase.auth.signOut();
    await recordFailure(ip, email);
    return { error: "That email and password don't match." };
  }

  await clearFailures(ip, email);
  redirect("/admin");
}
