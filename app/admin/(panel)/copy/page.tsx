import { getDraft } from "@/lib/cms/content";
import { CopyEditor } from "@/components/admin/CopyEditor";

export default async function CopyPage() {
  return <CopyEditor initial={await getDraft("copy")} />;
}
