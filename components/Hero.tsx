"use client";

import React, { useRef } from "react";
import {
	motion,
	Variants,
	useScroll,
	useTransform,
	useSpring,
} from "framer-motion";

const container: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15, delayChildren: 0.3 },
	},
};

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 40, filter: "blur(15px)" },
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
	},
};

export const Hero = () => {
	const targetRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start start", "end start"],
	});

	// ELASTIC PHYSICS CONFIGURATION
	// stiffness: Higher = faster response.
	// damping: Lower = more "springy" oscillation / elasticity.
	const smoothScroll = useSpring(scrollYProgress, {
		stiffness: 60, // Reduced for a more "drifting" feel
		damping: 20, // Reduced to allow for a slight elastic bounce
		mass: 0.5, // Added mass for momentum
		restDelta: 0.001,
	});

	// CONTENT ANIMATIONS (Tied to smoothScroll for the elastic effect)
	const contentScale = useTransform(smoothScroll, [0, 0.5], [1, 0.85]);
	const contentOpacity = useTransform(smoothScroll, [0, 0.45], [1, 0]);
	const contentBlur = useTransform(
		smoothScroll,
		[0, 0.45],
		["blur(0px)", "blur(25px)"]
	);

	// Sub-parallax for the metadata (moves faster than the rest for depth)
	const metaY = useTransform(smoothScroll, [0, 1], [0, -150]);

	// NAVIGATE_DOWN BUTTON ANIMATIONS
	const navDownOpacity = useTransform(smoothScroll, [0, 0.1], [1, 0]);
	const navDownY = useTransform(smoothScroll, [0, 0.1], [0, 30]);

	return (
		<section
			ref={targetRef}
			className="relative h-[125vh] bg-transparent overflow-visible">
			<div className="sticky top-0 z-10 h-screen w-full flex flex-col p-6 md:p-12 lg:p-16 overflow-hidden">
				<motion.div
					style={{
						opacity: contentOpacity,
						scale: contentScale,
						filter: contentBlur,
					}}
					variants={container}
					initial="hidden"
					animate="visible"
					className="flex-1 flex flex-col justify-center max-w-400 mx-auto w-full">
					{/* HEADER: NAME & TITLE */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24 md:mb-32">
						<motion.div variants={fadeUp} className="lg:col-span-8">
							<h2 className="text-[clamp(3rem,10vw,7rem)] font-bold text-foreground leading-[0.85] uppercase tracking-[0.025em]">
								Abhiraman
								<br />
								<span className="text-accent tracking-[0.05em]">
									Kuntimaddi
								</span>
							</h2>
							<div className="flex items-center gap-6 mt-8">
								<div className="h-px w-12 bg-accent/50" />
								<p className="text-sm md:text-lg tracking-[0.3em] text-accent font-medium uppercase">
									Software Developer
								</p>
							</div>
						</motion.div>

						<motion.div
							variants={fadeUp}
							className="lg:col-span-4 lg:text-right lg:pt-4">
							<p className="text-xs md:text-sm lg:text-base text-foreground/60 font-mono uppercase tracking-[0.2em] leading-relaxed">
								Based in Germany
								<br />
								M.Sc Computer Sciences
								<br />
								Specializing in Scalable Systems
							</p>
						</motion.div>
					</div>

					{/* OBJECTIVE */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end">
						<motion.div variants={fadeUp} className="lg:col-span-8">
							<h3 className="text-accent font-bold tracking-[0.4em] text-[10px] uppercase mb-8 opacity-60">
								The Objective
							</h3>
							<h1 className="text-[clamp(1.5rem,4.5vw,3rem)] font-medium uppercase leading-[1.2] text-foreground tracking-[-0.02em] max-w-4xl">
								Bridging the gap between
								<span className="text-foreground/40 font-light italic tracking-[0.03em]">
									{" "}
									complex backend architecture{" "}
								</span>
								and
								<span className="text-accent italic font-semibold tracking-[0.05em]">
									{" "}
									seamless human interaction
								</span>
								.
							</h1>
						</motion.div>

						<motion.div
							variants={fadeUp}
							className="lg:col-span-4 flex lg:justify-end items-end">
							<a
								href="#contact"
								className="group relative flex items-baseline font-mono cursor-pointer">
								<span className="text-accent mr-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-bold select-none">
									&gt;
								</span>
								<div className="flex flex-col">
									<div className="flex items-baseline gap-1">
										<span className="text-accent text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-500 group-hover:text-white">
											Start_Conversation
										</span>
										<span className="text-accent/40 select-none">();</span>
									</div>
									<div className="mt-1 h-px w-full bg-accent/20 relative overflow-hidden">
										<div className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
									</div>
								</div>
							</a>
						</motion.div>
					</div>

					{/* METADATA STRIP with Elastic Parallax */}
					<motion.div
						style={{ y: metaY }}
						variants={fadeUp}
						className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-12 border-t border-foreground/5 pt-12">
						{[
							{
								label: "PROFESSIONAL ROOTS",
								desc: "Building industrial systems & scalable solutions",
							},
							{
								label: "CREATIVE FOCUS",
								desc: "Crafting interfaces, websites & digital experiences",
							},
							{ label: "ACADEMIC FOUNDATION", desc: "M.Sc Computer Science" },
						].map((item, i) => (
							<div key={i} className="flex flex-col gap-2">
								<span className="text-[11px] sm:text-sm uppercase tracking-[0.25em] text-accent/50 font-bold">
									{item.label}
								</span>
								<span className="text-sm text-foreground/60 font-medium tracking-wide leading-snug">
									{item.desc}
								</span>
							</div>
						))}
					</motion.div>
				</motion.div>

				{/* THE BUTTON */}
				<motion.div
					style={{ opacity: navDownOpacity, y: navDownY }}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 2.2, duration: 1 }}
					className="flex justify-center pb-4 md:pb-8">
					<button
						onClick={() =>
							window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
						}
						className="group relative flex items-baseline font-mono cursor-pointer">
						<span className="text-accent mr-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-bold select-none">
							&gt;
						</span>
						<div className="flex flex-col">
							<div className="flex items-baseline gap-1">
								<span className="text-accent/60 text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-500 group-hover:text-foreground">
									Navigate_Down
								</span>
								<span className="text-accent/30 select-none text-[10px]">
									();
								</span>
							</div>
							<div className="mt-1 h-px w-full bg-accent/10 relative overflow-hidden">
								<div className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
							</div>
						</div>
					</button>
				</motion.div>
			</div>
		</section>
	);
};
