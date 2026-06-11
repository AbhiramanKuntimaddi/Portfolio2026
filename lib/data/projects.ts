export interface Project {
	id: string;
	title: string;
	category: string;
	description: string;
	stack: string[];
	year: string;
	link: string;
	status: "COMPLETED" | "ONGOING" | "ARCHIVED";
}

export const projects: Project[] = [
	{
		id: "01",
		title: "SP Design Studio",
		category: "Full-Stack Architecture // CMS",
		description:
			"Complete architectural redesign and development. Integrated a headless Payload CMS with PostgreSQL for dynamic content management.",
		stack: ["NextJS", "Payload CMS", "PostgreSQL", "TailwindCSS"],
		year: "2026",
		link: "/archive/sp-design-studio",
		status: "ONGOING",
	},
	{
		id: "02",
		title: "Autonomous Simulation",
		category: "Master Thesis // Robotics",
		description:
			"Simulation-based tool for off-road autonomous vehicles using Unreal Engine 5. Rigorous scenario testing & analysis.",
		stack: ["Unreal Engine", "C++", "Python"],
		year: "2025",
		link: "/archive/autonomous-simulation",
		status: "COMPLETED",
	},
	{
		id: "03",
		title: "XR Frameworks",
		category: "Research // Spatial Computing",
		description:
			"Evaluated MR/VR/AR frameworks for industrial XR contexts. Benchmarked OpenXR, Unity, and Unreal Engine.",
		stack: ["Unity", "OpenXR", "Unreal Engine"],
		year: "2025",
		link: "/archive/xr-frameworks",
		status: "COMPLETED",
	},
	{
		id: "04",
		title: "SM-Chemicals",
		category: "Web Architecture",
		description:
			"Interactive product catalog platform optimized for industrial chemical inventories. Built for data integrity.",
		stack: ["ReactJS", "PHP", "JavaScript"],
		year: "2024",
		link: "/archive/sm-chemicals",
		status: "COMPLETED",
	},
	{
		id: "05",
		title: "Avirbhava",
		category: "Engineering Portfolio",
		description:
			"High-fidelity portfolio platform for a civil engineering firm, highlighting complex structural projects.",
		stack: ["JavaScript", "HTML", "PHP"],
		year: "2024",
		link: "/archive/avirbhava",
		status: "ARCHIVED",
	},
];
