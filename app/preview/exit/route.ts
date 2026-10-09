import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

const safePath = (value: string | null) =>
  value && value.startsWith("/") && !value.startsWith("//") ? value : "/en";

export async function GET(request: Request) {
  (await draftMode()).disable();
  redirect(safePath(new URL(request.url).searchParams.get("path")));
}
