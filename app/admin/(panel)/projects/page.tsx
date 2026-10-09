import { getDraft } from "@/lib/cms/content";
import { ProjectsEditor } from "@/components/admin/editors";

export default async function ProjectsPage() {
  return <ProjectsEditor initial={await getDraft("projects")} />;
}
