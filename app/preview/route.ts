import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getOwner } from "@/lib/auth";

const safePath = (value: string | null) =>
  value && value.startsWith("/") && !value.startsWith("//") ? value : "/en";

export async function GET(request: Request) {
  const owner = await getOwner();
  if (!owner) redirect("/admin/login");
  const path = safePath(new URL(request.url).searchParams.get("path"));
  (await draftMode()).enable();
  redirect(path);
}
