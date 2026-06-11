"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

function MaskWords({
	text,
	className,
	accentFrom,
}: {
	text: string;
	className: string;
	accentFrom?: number;
}) {
	return (
		<span className={className}>
			{text.split(" ").map((word, i) => (
				<span
					key={i}
					className="mask-word inline-block overflow-hidden mr-[0.25em] pb-[0.22em] -mb-[0.22em]">
					<span
						className={`word inline-block ${
							accentFrom !== undefined && i >= accentFrom
								? "text-accent italic font-medium"
								: ""
						}`}>
						{word}
					</span>
				</span>
			))}
		</span>
	);
}

export function AboutAct() {
	const rootRef = useRef<HTMLElement>(null);
	const imgRef = useRef<HTMLDivElement>(null);
	const tiltX = useRef<(v: number) => void>(null);
	const tiltY = useRef<(v: number) => void>(null);

	useGSAP(
		() => {
			if (!window.matchMedia("(pointer: coarse)").matches) {
				tiltX.current = gsap.quickTo(imgRef.current, "rotationX", {
					duration: 0.4,
					ease: "power3.out",
				});
				tiltY.current = gsap.quickTo(imgRef.current, "rotationY", {
					duration: 0.4,
					ease: "power3.out",
				});
			}
		},
		{ scope: rootRef }
	);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left - rect.width / 2;
		const y = e.clientY - rect.top - rect.height / 2;
		tiltX.current?.(gsap.utils.clamp(-5, 5, -(y / 150) * 5));
		tiltY.current?.(gsap.utils.clamp(-5, 5, (x / 150) * 5));
	};
	const handleMouseLeave = () => {
		tiltX.current?.(0);
		tiltY.current?.(0);
	};

	return (
		<section
			ref={rootRef}
			className="about-act absolute inset-0 flex items-center justify-center">
			<div className="about-content w-full max-w-6xl px-6 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
				<div className="lg:col-span-5 flex justify-center lg:justify-start relative">
					<div
						ref={imgRef}
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
						className="about-img relative w-full max-w-72"
						style={{ perspective: 1000, transformStyle: "preserve-3d" }}>
						<div className="absolute -inset-4 rounded-lg bg-linear-to-tr from-accent/25 to-background opacity-40 blur-3xl -z-10" />
						<div
							className="absolute -inset-3 border border-foreground/5 rounded-sm"
							style={{ transform: "translateZ(-10px)" }}
						/>
						<div
							className="about-img-inner relative aspect-4/5 overflow-hidden rounded-sm border border-foreground/10 shadow-2xl"
							style={{ transform: "translateZ(20px)" }}>
							<Image
								src="/images/Profile.jpg"
								alt="Abhiraman Kuntimaddi"
								fill
								priority
								className="about-photo object-cover"
							/>
						</div>
						<div
							className="absolute -bottom-4 left-1/2 bg-background px-4 py-2 border border-foreground/10 z-10 shadow-xl whitespace-nowrap"
							style={{ transform: "translateX(-50%) translateZ(50px)" }}>
							<span className="text-accent font-mono text-[10px] tracking-[0.3em] uppercase">
								SYSTEM_USER: ABHIRAMAN
							</span>
						</div>
					</div>
				</div>

				<div className="lg:col-span-7 flex flex-col justify-center space-y-12">
					<div className="about-quote max-w-2xl">
						<span className="about-quote-label text-accent font-bold tracking-[0.35em] text-[10px] uppercase mb-6 block opacity-60">
							The Philosophy
						</span>
						<blockquote className="text-[clamp(1.2rem,2.8vw,2.4rem)] font-light leading-snug text-foreground tracking-tight">
							<MaskWords
								text="“Design is not just what it looks like, it is how it works.”"
								className="inline"
								accentFrom={8}
							/>
						</blockquote>
						<cite className="about-cite mt-6 flex items-center gap-4 text-xs text-foreground/50 not-italic">
							<span className="h-px w-8 bg-foreground/20" />
							<span className="tracking-widest uppercase text-[10px]">
								Steve Jobs
							</span>
						</cite>
					</div>

					<div className="border-l border-foreground/10 pl-8 max-w-xl flex flex-col gap-6">
						<p className="text-foreground text-[clamp(1.1rem,1.9vw,1.5rem)] leading-relaxed font-light">
							<MaskWords
								className="about-p1"
								text="I build the unseen architecture — systems where behavior matters more than appearance. From backend services in Java or Python to modern web interfaces, I focus on clarity under real use."
							/>
						</p>
						<p className="text-foreground/60 text-[clamp(0.95rem,1.6vw,1.2rem)] leading-relaxed font-light italic">
							<MaskWords
								className="about-p2"
								text="Good software feels obvious. My work is about removing friction until complexity fades and intent remains."
							/>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
