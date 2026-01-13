"use client";

import { useRef } from "react";
import {
	motion,
	useScroll,
	useTransform,
	useSpring,
	useMotionValue,
	MotionValue,
} from "framer-motion";
import Image from "next/image";

// Individual word scrubbing
function ScrubbedWord({
	word,
	progress,
	start,
	end,
}: {
	word: string;
	progress: MotionValue<number>;
	start: number;
	end: number;
}) {
	const opacity = useTransform(progress, [start, end], [0.1, 1]);
	const y = useTransform(progress, [start, end], [10, 0]);
	return (
		<motion.span style={{ opacity, y }} className="inline-block mr-[0.25em]">
			{word}
		</motion.span>
	);
}

// Scrubbed text container
function ScrubbedText({
	text,
	progress,
	range,
}: {
	text: string;
	progress: MotionValue<number>;
	range: [number, number];
}) {
	const words = text.split(" ");
	return (
		<span>
			{words.map((word, i) => {
				const start = range[0] + (i / words.length) * (range[1] - range[0]);
				const end = start + (1 / words.length) * (range[1] - range[0]);
				return (
					<ScrubbedWord
						key={i}
						word={word}
						progress={progress}
						start={start}
						end={end}
					/>
				);
			})}
		</span>
	);
}

export function About() {
	const containerRef = useRef<HTMLDivElement>(null);

	// Scroll tracking
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	// IMAGE TRANSFORMS
	const imgScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1, 0.9]);
	const imgY = useTransform(smoothProgress, [0, 1], [50, -50]);
	const imgOpacity = useTransform(
		smoothProgress,
		[0, 0.1, 0.9, 1],
		[0, 1, 1, 0]
	);

	// IMAGE MOUSE TILT
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const rotateX = useSpring(useTransform(mouseY, [-150, 150], [5, -5]), {
		stiffness: 100,
		damping: 30,
	});
	const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-5, 5]), {
		stiffness: 100,
		damping: 30,
	});

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		mouseX.set(e.clientX - rect.left - rect.width / 2);
		mouseY.set(e.clientY - rect.top - rect.height / 2);
	};
	const handleMouseLeave = () => {
		mouseX.set(0);
		mouseY.set(0);
	};

	return (
		<section className="relative bg-transparent">
			<div ref={containerRef} className="relative h-[220vh]">
				<div className="sticky top-0 h-screen flex items-center justify-center">
					<div className="w-full max-w-6xl px-6 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
						{/* LEFT: IMAGE */}
						<div className="lg:col-span-5 flex justify-center lg:justify-start relative">
							<motion.div
								onMouseMove={handleMouseMove}
								onMouseLeave={handleMouseLeave}
								style={{
									rotateX,
									rotateY,
									scale: imgScale,
									y: imgY,
									opacity: imgOpacity,
									perspective: 1000,
									transformStyle: "preserve-3d",
								}}
								className="relative w-full max-w-72">
								{/* Glow background */}
								<div className="absolute -inset-4 rounded-lg bg-linear-to-tr from-[#001a4d] to-[#00072d] opacity-30 blur-3xl -z-10" />
								<div
									className="absolute -inset-3 border border-white/5 rounded-sm"
									style={{ transform: "translateZ(-10px)" }}
								/>
								<div
									className="relative aspect-4/5 overflow-hidden rounded-sm border border-white/10 shadow-2xl"
									style={{ transform: "translateZ(20px)" }}>
									<Image
										src="/images/Profile.jpg"
										alt="Abhiraman Kuntimaddi"
										fill
										priority
										className="object-cover"
									/>
								</div>
								<div
									className="absolute -bottom-4 left-1/2 bg-[#00072d] px-4 py-2 border border-white/10 z-10 shadow-xl whitespace-nowrap"
									style={{ transform: "translateX(-50%) translateZ(50px)" }}>
									<span className="text-accent font-mono text-[10px] tracking-[0.3em] uppercase">
										SYSTEM_USER: ABHIRAMAN
									</span>
								</div>
							</motion.div>
						</div>

						{/* RIGHT: TEXT */}
						<div className="lg:col-span-7 flex flex-col justify-center space-y-12">
							{/* Quote */}
							<motion.div
								style={{
									opacity: useTransform(
										smoothProgress,
										[0.05, 0.2, 0.8, 1],
										[0, 1, 1, 0.8]
									),
									y: useTransform(smoothProgress, [0, 1], [20, -20]),
									scale: useTransform(
										smoothProgress,
										[0, 0.1, 0.2],
										[0.95, 1.03, 1]
									),
								}}
								className="max-w-2xl">
								<span className="text-accent font-bold tracking-[0.35em] text-[10px] uppercase mb-6 block opacity-60">
									The Philosophy
								</span>
								<blockquote className="text-[clamp(1.2rem,2.8vw,2.4rem)] font-light leading-snug text-foreground tracking-tight">
									“Design is not just what it looks like,{" "}
									<span className="text-accent italic font-medium">
										it is how it works.
									</span>
									”
								</blockquote>
								<cite className="mt-6 flex items-center gap-4 text-xs text-foreground/50 not-italic">
									<span className="h-px w-8 bg-foreground/20" />
									<span className="tracking-widest uppercase text-[10px]">
										Steve Jobs
									</span>
								</cite>
							</motion.div>

							{/* Scrubbing paragraphs */}
							<div className="border-l border-foreground/10 pl-8 max-w-xl flex flex-col gap-6">
								<p className="text-foreground text-[clamp(1.1rem,1.9vw,1.5rem)] leading-relaxed font-light">
									<ScrubbedText
										text="I build the unseen architecture — systems where behavior matters more than appearance. From backend services in Java or Python to modern web interfaces, I focus on clarity under real use."
										progress={smoothProgress}
										range={[0.25, 0.65]}
									/>
								</p>
								<p className="text-foreground/60 text-[clamp(0.95rem,1.6vw,1.2rem)] leading-relaxed font-light italic">
									<ScrubbedText
										text="Good software feels obvious. My work is about removing friction until complexity fades and intent remains."
										progress={smoothProgress}
										range={[0.65, 0.95]}
									/>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
