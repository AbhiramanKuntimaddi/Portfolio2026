"use client";

import React, { useRef, useState } from "react";
import {
	motion,
	useScroll,
	useTransform,
	useSpring,
	useMotionValueEvent,
	MotionValue,
	AnimatePresence,
} from "framer-motion";

interface ExperienceData {
	id: string;
	year: string;
	title: string;
	company: string;
	desc: string;
	context: string;
}

const experiences: ExperienceData[] = [
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

export const Experience: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [currentYear, setCurrentYear] = useState<string>(experiences[0].year);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 60,
		damping: 25,
		restDelta: 0.001,
	});

	/**
	 * APPLE-STYLE REVEAL LOGIC
	 * 0.0 -> 0.15: Intro text is center stage, then scales/fades out.
	 * 0.10 -> 0.20: The Tracker and Experience items slide in from the blur.
	 */
	const introScale = useTransform(smoothProgress, [0, 0.1], [1, 0.95]);
	const introOpacity = useTransform(smoothProgress, [0, 0.08, 0.12], [1, 1, 0]);
	const introBlur = useTransform(
		smoothProgress,
		[0.08, 0.12],
		["blur(0px)", "blur(10px)"]
	);

	const contentOpacity = useTransform(smoothProgress, [0.12, 0.18], [0, 1]);
	const contentY = useTransform(smoothProgress, [0.12, 0.2], [20, 0]);

	useMotionValueEvent(smoothProgress, "change", (latest: number) => {
		// We map the experience cycle to start after the intro (0.15 to 1.0)
		const adjustedProgress = Math.max(0, (latest - 0.15) / 0.85);
		const index = Math.min(
			Math.floor(adjustedProgress * experiences.length),
			experiences.length - 1
		);
		if (experiences[index].year !== currentYear) {
			setCurrentYear(experiences[index].year);
		}
	});

	return (
		<section className="bg-transparent">
			<div ref={containerRef} className="relative h-[800vh]">
				<div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
					<div className="max-w-7xl mx-auto w-full px-6 md:px-20 relative h-full flex items-center">
						{/* 1. CINEMATIC INTRO HEADER */}
						<motion.div
							style={{
								opacity: introOpacity,
								scale: introScale,
								filter: introBlur,
							}}
							className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 z-30">
							<motion.span className="text-accent font-bold tracking-[0.35em] text-[10px] uppercase mb-6 block opacity-60">
								{"The work experience"}
							</motion.span>
							<h2 className="text-5xl md:text-7xl font-bold text-foreground font-sans tracking-tight uppercase leading-[0.9] max-w-4xl">
								Scaling systems through <br />
								<span className="text-accent italic">
									architectural precision.
								</span>
							</h2>
							<p className="mt-8 text-foreground/40 text-lg md:text-xl font-light max-w-xl font-sans">
								From high-load Java environments to spatial computing research,
								explore the timeline of my technical journey.
							</p>
						</motion.div>

						{/* 2. THE MAIN INTERFACE (Revealed on scroll) */}
						<motion.div
							style={{ opacity: contentOpacity, y: contentY }}
							className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 w-full z-10">
							{/* LEFT: THE TRACKER */}
							<div className="md:col-span-4 flex flex-col justify-center border-l border-foreground/10 pl-8">
								<div className="space-y-6">
									{experiences.map((exp, i) => {
										// Offset mapping so titles light up correctly after intro
										const start = 0.15 + (i / experiences.length) * 0.85;
										const end = 0.15 + ((i + 1) / experiences.length) * 0.85;
										return (
											<ExperienceTitle
												key={exp.id}
												title={exp.title}
												progress={smoothProgress}
												range={[start, end]}
												isActive={currentYear === exp.year}
											/>
										);
									})}
								</div>
							</div>

							{/* RIGHT: CONTENT BLOCKS */}
							<div className="md:col-span-8 h-125 flex items-center relative ml-0 md:ml-12">
								{experiences.map((exp, i) => (
									<ContentBlock
										key={exp.id}
										exp={exp}
										index={i}
										total={experiences.length}
										progress={smoothProgress}
										offset={0.15} // Start after intro
									/>
								))}
							</div>
						</motion.div>
					</div>

					{/* BACKGROUND YEAR (Apple-style subtle depth) */}
					<motion.div
						style={{
							opacity: useTransform(smoothProgress, [0.15, 0.25], [0, 0.05]),
						}}
						className="absolute -right-4 md:-right-10 bottom-0 pointer-events-none select-none flex overflow-hidden h-[30vw]">
						{currentYear.split("").map((digit, index) => (
							<RollingDigit key={`${index}-${digit}`} digit={digit} />
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
};

const RollingDigit: React.FC<{ digit: string }> = ({ digit }) => {
	return (
		<div className="relative h-[30vw] w-[18vw] md:w-[15vw] flex justify-center">
			<AnimatePresence mode="popLayout">
				<motion.span
					key={digit}
					initial={{ y: "20%", opacity: 0, filter: "blur(10px)" }}
					animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
					exit={{ y: "-20%", opacity: 0, filter: "blur(10px)" }}
					transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
					className="absolute text-[35vw] md:text-[25vw] font-bold text-foreground italic leading-none font-sans">
					{digit}
				</motion.span>
			</AnimatePresence>
		</div>
	);
};

const ExperienceTitle: React.FC<{
	title: string;
	progress: MotionValue<number>;
	range: [number, number];
	isActive: boolean;
}> = ({ title, progress, range, isActive }) => {
	const opacity = useTransform(
		progress,
		[range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
		[0.1, 1, 1, 0.1]
	);
	const x = useTransform(
		progress,
		[range[0], range[0] + 0.05, range[1]],
		[0, 10, 0]
	);

	return (
		<motion.h3
			style={{ opacity, x }}
			className={`text-xl md:text-2xl font-semibold tracking-tight uppercase font-sans transition-colors duration-500 ${
				isActive ? "text-accent" : "text-foreground"
			}`}>
			{title}
		</motion.h3>
	);
};

const ContentBlock: React.FC<{
	exp: ExperienceData;
	index: number;
	total: number;
	progress: MotionValue<number>;
	offset: number;
}> = ({ exp, index, total, progress, offset }) => {
	const sectionWidth = (1 - offset) / total;
	const start = offset + index * sectionWidth;
	const end = start + sectionWidth;

	const y = useTransform(
		progress,
		[start, start + 0.1 * sectionWidth, end - 0.1 * sectionWidth, end],
		[30, 0, 0, -30]
	);
	const opacity = useTransform(
		progress,
		[start, start + 0.1 * sectionWidth, end - 0.1 * sectionWidth, end],
		[0, 1, 1, 0]
	);
	const filter = useTransform(
		progress,
		[start, start + 0.05 * sectionWidth, end - 0.05 * sectionWidth, end],
		["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]
	);

	return (
		<motion.div
			style={{ y, opacity, filter }}
			className="absolute inset-0 flex flex-col justify-center space-y-6">
			<div className="flex items-center gap-4">
				<span className="text-accent font-mono text-[10px] font-bold tracking-[0.4em] uppercase">
					{exp.year} / {exp.context}
				</span>
				<div className="h-px w-16 bg-accent/30" />
			</div>
			<h2 className="text-5xl md:text-7xl font-bold text-foreground leading-[0.95] tracking-tighter uppercase font-sans">
				{exp.company}
			</h2>
			<p className="text-foreground/60 text-lg md:text-2xl font-light leading-relaxed max-w-xl italic font-sans">
				{exp.desc}
			</p>
		</motion.div>
	);
};
