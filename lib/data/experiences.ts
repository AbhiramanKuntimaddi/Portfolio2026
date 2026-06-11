export interface ExperienceData {
	id: string;
	year: string;
	title: string;
	company: string;
	desc: string;
	context: string;
}

export const experiences: ExperienceData[] = [
	{
		id: "01",
		year: "2024",
		title: "Java Developer",
		company: "SoftDeCC Software",
		desc: "Architecting E-Learning ecosystems. High-load Java EE systems meets complex SQL optimization.",
		context: "CURRENT_STATION",
	},
	{
		id: "02",
		year: "2022",
		title: "Master's Thesis",
		company: "RPTU Kaiserslautern",
		desc: "Where scientific computing meets high-performance visualization. A deep dive into intelligent systems.",
		context: "ACADEMIC_MILESTONE",
	},
	{
		id: "03",
		year: "2021",
		title: "XR Frameworks",
		company: "RPTU Kaiserslautern",
		desc: "Benchmarking the future of spatial computing. Unity, Unreal, and the OpenXR standard.",
		context: "RESEARCH_PHASE",
	},
	{
		id: "04",
		year: "2018",
		title: "Full-Stack Engineer",
		company: "SM Chemicals",
		desc: "Translating industrial scale into digital precision. Building robust product ecosystems.",
		context: "INDUSTRIAL_LOGIC",
	},
	{
		id: "05",
		year: "2018",
		title: "Vision AI",
		company: "PetPals Startup",
		desc: "Neural networks in the palm of your hand. Implementing real-time animal recognition.",
		context: "EMERGING_TECH",
	},
];
