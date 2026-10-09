import { getDraft } from "@/lib/cms/content";
import { ExperienceEditor } from "@/components/admin/editors";

export default async function ExperiencePage() {
  return <ExperienceEditor initial={await getDraft("experience")} />;
}
