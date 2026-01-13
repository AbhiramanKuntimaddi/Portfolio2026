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

interface SkillGroup {
	id: string;
	group: string;
	skills: string[];
	desc: string;
}

const technicalManifest: SkillGroup[] = [
	{
		id: "01",
		group: "The Logic",
		skills: ["C", "C++", "Java", "Python", "TypeScript", "React"],
		desc: "My core foundation. I build high-performance systems and scalable web architectures where clean logic meets type-safe precision.",
	},
	{
		id: "02",
		group: "The Engine",
		skills: ["Unreal Engine 5", "Unity 3D", "Blender"],
		desc: "Crafting immersive 3D environments. I specialize in spatial computing and real-time rendering pipelines for the next generation of XR.",
	},
	{
		id: "03",
		group: "The Canvas",
		skills: ["HTML", "CSS", "TailwindCSS", "Sass", "Figma"],
		desc: "Design-to-code execution. I bridge the gap between complex engineering and aesthetic interfaces with pixel-perfect attention to detail.",
	},
	{
		id: "04",
		group: "The Databases",
		skills: ["MySQL", "MSSQL", "PostgreSQL", "Oracle"],
		desc: "Relational architecture and optimization. I design data structures that ensure high availability and integrity for enterprise-scale systems.",
	},
];

export function Skills() {
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

	// Intro Fade Out (0.0 -> 0.12)
	const introOpacity = useTransform(smoothProgress, [0, 0.08, 0.12], [1, 1, 0]);
	const introScale = useTransform(smoothProgress, [0, 0.12], [1, 0.95]);
	const introBlur = useTransform(
		smoothProgress,
		[0.08, 0.12],
		["blur(0px)", "blur(10px)"]
	);

	// Content Reveal (0.12 -> 0.18)
	const contentOpacity = useTransform(smoothProgress, [0.12, 0.18], [0, 1]);
	const contentY = useTransform(smoothProgress, [0.12, 0.2], [40, 0]);

	// Background Digit Opacity
	const bgDigitOpacity = useTransform(smoothProgress, [0.12, 0.18], [0, 0.04]);

	useMotionValueEvent(smoothProgress, "change", (latest) => {
		const adjusted = Math.max(0, (latest - 0.15) / 0.85);
		const index = Math.min(
			Math.floor(adjusted * technicalManifest.length),
			technicalManifest.length - 1
		);
		if (index !== activeIndex) setActiveIndex(index);
	});

	return (
		<section className="bg-transparent">
			<div ref={containerRef} className="relative h-[800vh]">
				<div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
					<div className="max-w-7xl mx-auto w-full px-6 md:px-20 relative h-full flex items-center">
						{/* 1. Intro */}
						<motion.div
							style={{
								opacity: introOpacity,
								scale: introScale,
								filter: introBlur,
							}}
							className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 z-30 pointer-events-none">
							<span className="text-accent font-bold tracking-[0.35em] text-[10px] uppercase mb-6 block opacity-60">
								The Capabilities
							</span>
							<h2 className="text-5xl md:text-8xl font-bold text-foreground font-sans tracking-tight uppercase leading-[0.85] max-w-4xl">
								Mastering the <br />
								<span className="text-accent italic">Technical Stack.</span>
							</h2>
							<p className="mt-8 text-foreground/40 text-lg md:text-xl font-light max-w-xl">
								A deep dive into the languages, engines, and frameworks I use to
								translate complex problems into elegant digital solutions.
							</p>
						</motion.div>

						{/* 2. Main Interface */}
						<motion.div
							style={{ opacity: contentOpacity, y: contentY }}
							className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 w-full z-10">
							<div className="md:col-span-5 flex flex-col justify-center border-l border-foreground/5 pl-8 space-y-10">
								{technicalManifest.map((item, i) => {
									const start = 0.15 + (i / technicalManifest.length) * 0.85;
									const end =
										0.15 + ((i + 1) / technicalManifest.length) * 0.85;
									return (
										<GroupTitle
											key={item.id}
											title={item.group}
											progress={smoothProgress}
											range={[start, end]}
											isActive={activeIndex === i}
										/>
									);
								})}
							</div>

							<div className="md:col-span-7 h-100 flex items-center relative">
								{technicalManifest.map((item, i) => (
									<SkillContentBlock
										key={item.id}
										item={item}
										index={i}
										total={technicalManifest.length}
										progress={smoothProgress}
										offset={0.15}
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
								initial={{ y: "40%", opacity: 0 }}
								animate={{ y: "0%", opacity: 1 }}
								exit={{ y: "-40%", opacity: 0 }}
								transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
								className="block text-[30vw] font-bold text-foreground italic leading-none font-sans">
								{technicalManifest[activeIndex].id.slice(1)}
							</motion.span>
						</AnimatePresence>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

// Sub-components
interface GroupTitleProps {
	title: string;
	progress: MotionValue<number>;
	range: [number, number];
	isActive: boolean;
}

function GroupTitle({ title, progress, range, isActive }: GroupTitleProps) {
	const opacity = useTransform(
		progress,
		[range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
		[0.1, 1, 1, 0.1]
	);
	const x = useTransform(
		progress,
		[range[0], range[0] + 0.05, range[1]],
		[0, 20, 0]
	);

	return (
		<motion.h3
			style={{ opacity, x }}
			className={`text-2xl md:text-5xl font-light tracking-tighter uppercase transition-colors duration-500 ${
				isActive ? "text-accent" : "text-foreground"
			}`}>
			{title}
		</motion.h3>
	);
}

interface SkillContentProps {
	item: SkillGroup;
	index: number;
	total: number;
	progress: MotionValue<number>;
	offset: number;
}

function SkillContentBlock({
	item,
	index,
	total,
	progress,
	offset,
}: SkillContentProps) {
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

	return (
		<motion.div
			style={{ y, opacity, filter: blur }}
			className="absolute inset-0 flex flex-col justify-center space-y-8">
			<p className="text-foreground text-lg md:text-2xl leading-relaxed max-w-xl font-light italic">
				{item.desc}
			</p>

			<div className="flex flex-wrap gap-3">
				{item.skills.map((skill, idx) => (
					<span
						key={idx}
						className="px-4 py-2 border border-accent/20 text-foreground text-[12px] font-mono tracking-[0.3em] rounded-sm uppercase">
						{skill}
					</span>
				))}
			</div>

			<div className="flex items-center gap-3 pt-4">
				<div className="h-px w-12 bg-accent" />
				<span className="text-[9px] font-mono text-foreground/50 uppercase tracking-[0.5em]">
					STATION_{item.id}_OPTIMIZED
				</span>
			</div>
		</motion.div>
	);
}
