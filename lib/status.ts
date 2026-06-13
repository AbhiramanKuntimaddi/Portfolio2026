import { projects, type Project } from "@/lib/data/projects";

export type SiteStatusState = "available" | "working" | "away";

export interface SiteStatusLine {
	state: SiteStatusState;
	label: string;
}

export const job: { weekday: SiteStatusLine; weekend: SiteStatusLine } = {
	weekday: {
		state: "working",
		label: "9-to-5 at SoftDeCC · side projects after hours",
	},
	weekend: {
		state: "available",
		label: "off the clock · weekend builds welcome",
	},
};

export function openProjects(): Project[] {
	return projects.filter(
		(p) => p.status === "ONGOING" || p.status === "UPCOMING"
	);
}
