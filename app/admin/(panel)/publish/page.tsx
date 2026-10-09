import { getStatuses } from "@/lib/cms/content";
import { PublishPanel } from "@/components/admin/PublishPanel";

export default async function PublishPage() {
  return <PublishPanel statuses={await getStatuses()} />;
}
