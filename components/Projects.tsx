"use client";

import { useRef, useState } from "react";
import {
	motion,
	useScroll,
	useTransform,
	useSpring,
	useMotionValueEvent,
	MotionValue,
	AnimatePresence,
} from "framer-motion";
import { FiLock } from "react-icons/fi";

interface Project {
	id: string;
	title: string;
	category: string;
	description: string;
	stack: string[];
	year: string;
	link: string;
	status: "COMPLETED" | "ONGOING" | "ARCHIVED";
}

const projects: Project[] = [
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

export function Projects() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 70,
		damping: 30,
		restDelta: 0.001,
	});

	// Intro fade & scale
	const introOpacity = useTransform(smoothProgress, [0, 0.08, 0.12], [1, 1, 0]);
	const introScale = useTransform(smoothProgress, [0, 0.12], [1, 0.95]);
	const introBlur = useTransform(
		smoothProgress,
		[0.08, 0.12],
		["blur(0px)", "blur(10px)"]
	);

	// Content reveal
	const contentOpacity = useTransform(smoothProgress, [0.12, 0.18], [0, 1]);
	const contentY = useTransform(smoothProgress, [0.12, 0.2], [20, 0]);

	// Background digit opacity
	const bgDigitOpacity = useTransform(smoothProgress, [0.12, 0.18], [0, 0.04]);

	// Update active index based on scroll
	useMotionValueEvent(smoothProgress, "change", (latest: number) => {
		const adjusted = Math.max(0, (latest - 0.15) / 0.85);
		const index = Math.min(
			Math.floor(adjusted * projects.length),
			projects.length - 1
		);
		if (index !== activeIndex) setActiveIndex(index);
	});

	return (
		<section className="bg-transparent">
			<div ref={containerRef} className="relative h-[800vh]">
				<div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
					<div className="max-w-7xl mx-auto w-full px-6 md:px-20 relative h-full flex items-center">
						{/* Intro Section */}
						<motion.div
							style={{
								opacity: introOpacity,
								scale: introScale,
								filter: introBlur,
							}}
							className="absolute inset-0 flex flex-col justify-center z-30 px-6 md:px-20 pointer-events-none">
							<span className="text-accent font-bold tracking-widest text-[10px] uppercase mb-6 opacity-60">
								ARCHIVE_2024-2026
							</span>
							<h2 className="text-5xl md:text-8xl font-bold font-sans text-foreground uppercase leading-[0.85] tracking-tight max-w-4xl">
								Project <br />
								<span className="text-accent italic">Evolution.</span>
							</h2>
							<p className="mt-8 text-foreground/40 text-lg md:text-xl font-light max-w-xl font-sans">
								A chronological deconstruction of my latest deployments.
							</p>
						</motion.div>

						{/* Main content */}
						<motion.div
							style={{ opacity: contentOpacity, y: contentY }}
							className="relative w-full z-10">
							<div className="max-w-3xl relative">
								{projects.map((project, i) => (
									<ProjectBlock
										key={project.id}
										project={project}
										index={i}
										total={projects.length}
										progress={smoothProgress}
										offset={0.15}
										isActive={i === activeIndex}
									/>
								))}
							</div>
						</motion.div>
					</div>

					{/* Background Digit */}
					<motion.div
						style={{ opacity: bgDigitOpacity }}
						className="absolute right-10 bottom-10 pointer-events-none select-none">
						<AnimatePresence mode="popLayout">
							<motion.span
								key={activeIndex}
								initial={{ y: "40%", opacity: 0, filter: "blur(15px)" }}
								animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
								exit={{ y: "-40%", opacity: 0, filter: "blur(15px)" }}
								transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
								className="block text-[30vw] font-bold text-foreground italic leading-none font-sans select-none pointer-events-none">
								{projects[activeIndex].id.startsWith("0")
									? projects[activeIndex].id.slice(1)
									: projects[activeIndex].id}
							</motion.span>
						</AnimatePresence>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

// Project block sub-component
interface ProjectBlockProps {
	project: Project;
	index: number;
	total: number;
	progress: MotionValue<number>;
	offset: number;
	isActive: boolean;
}

function ProjectBlock({
	project,
	index,
	total,
	progress,
	offset,
	isActive,
}: ProjectBlockProps) {
	const sectionWidth = (1 - offset) / total;
	const start = offset + index * sectionWidth;
	const end = start + sectionWidth;

	const y = useTransform(
		progress,
		[start, start + 0.05, end - 0.05, end],
		[40, 0, 0, -40]
	);
	const opacity = useTransform(
		progress,
		[start, start + 0.05, end - 0.05, end],
		[0, 1, 1, 0]
	);
	const blur = useTransform(
		progress,
		[start, start + 0.05, end - 0.05, end],
		["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]
	);

	const pointerEvents = isActive ? "auto" : "none";

	return (
		<motion.div
			style={{ y, opacity, filter: blur, pointerEvents }}
			className="absolute inset-0 flex flex-col justify-center space-y-6 md:space-y-8">
			{/* META */}
			<div className="flex items-center gap-4">
				<span className="text-accent font-mono text-[10px] tracking-[0.2em] uppercase border-l border-accent/40 pl-4">
					{project.category}
				</span>
				<span className="text-foreground/40 font-mono text-[10px] tracking-widest">
					{project.year}
				</span>
			</div>

			{/* TITLE */}
			<h3 className="text-4xl md:text-7xl font-bold text-foreground uppercase tracking-tight leading-[0.9]">
				{project.title}
			</h3>

			{/* DESCRIPTION */}
			<p className="text-foreground/60 text-lg md:text-xl font-light leading-relaxed max-w-xl italic">
				{project.description}
			</p>

			{/* STACK */}
			<div className="flex flex-wrap gap-2">
				{project.stack.map((tech) => (
					<span
						key={tech}
						className="px-3 py-1 bg-accent/5 border border-accent/20 text-accent text-[9px] font-mono tracking-widest uppercase rounded-sm">
						{tech}
					</span>
				))}
			</div>

			{/* CTA + STATUS */}
			<div className="pt-4 flex items-center gap-6">
				{project.status !== "ARCHIVED" ? (
					<a
						href={project.link}
						className="group relative flex items-center gap-3 px-6 py-3 border border-accent/30 overflow-hidden transition-colors duration-300">
						<div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
						<span className="relative z-10 text-[11px] font-mono tracking-[0.3em] uppercase text-accent group-hover:text-background transition-colors duration-300">
							Access_Full_Briefing
						</span>
						<svg
							className="relative z-10 w-4 h-4 text-accent group-hover:text-background group-hover:translate-x-1 transition-all duration-300"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</a>
				) : (
					<div className="flex items-center gap-3 px-6 py-3 border border-accent/20 bg-accent/10 opacity-40 cursor-not-allowed">
						<span className="text-[11px] font-mono tracking-[0.3em] uppercase text-accent/60">
							DATA_RESTRICTED
						</span>
						<FiLock className="w-4 h-4 text-accent/60" />
					</div>
				)}

				{/* STATUS */}
				<div className="hidden sm:flex flex-col border-l border-foreground/10 pl-6">
					<div className="flex items-center gap-2">
						<div
							className={`w-2 h-2 rounded-full ${
								project.status === "ONGOING"
									? "bg-orange-400 animate-pulse shadow-[0_0_6px_rgba(251,146,60,0.8)]"
									: project.status === "COMPLETED"
										? "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]"
										: "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.7)]"
							}`}
						/>
						<span className="text-[8px] font-mono text-foreground/60 uppercase tracking-widest">
							Status: {project.status}
						</span>
					</div>

					<span className="text-[8px] font-mono text-foreground/30 uppercase tracking-widest mt-1">
						Node: {project.id}
					</span>
				</div>
			</div>
		</motion.div>
	);
}
