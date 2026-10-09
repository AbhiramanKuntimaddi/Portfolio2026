import { getDraft } from "@/lib/cms/content";
import { SkillsEditor } from "@/components/admin/editors";

export default async function SkillsPage() {
  return <SkillsEditor initial={await getDraft("skills")} />;
}
