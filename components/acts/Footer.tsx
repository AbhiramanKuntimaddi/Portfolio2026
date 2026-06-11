"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface FooterProps {
	className?: string;
}

export function Footer({ className = "" }: FooterProps) {
	const ref = useRef<HTMLElement>(null);
	const currentYear = new Date().getFullYear();

	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: ref.current,
					start: "top 92%",
					end: "top 55%",
					scrub: 1,
				},
			});

			tl.from(".footer-line", {
				scaleX: 0,
				transformOrigin: "left",
				duration: 0.5,
				ease: "power2.out",
			})
				.from(
					".footer-reveal",
					{
						opacity: 0,
						y: 40,
						filter: "blur(6px)",
						duration: 0.6,
						ease: "power3.out",
						stagger: 0.15,
					},
					"-=0.3"
				)
				.from(
					".footer-copy",
					{ opacity: 0, y: 20, duration: 0.5, ease: "power2.out" },
					"-=0.2"
				);
		},
		{ scope: ref }
	);

	return (
		<footer
			ref={ref}
			className={`w-full px-6 md:px-20 pb-16 pt-32 bg-transparent ${className}`}>
			<div className="max-w-7xl mx-auto relative pt-10">
				<div className="footer-line absolute top-0 left-0 h-px w-full bg-accent/30" />
				<div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0 items-start md:items-center">
					<div className="footer-reveal flex flex-col gap-2">
						<span className="text-[9px] font-mono tracking-[0.2em] text-foreground/30 uppercase">
							V.2026 // Portfolio System
						</span>
						<span className="text-[10px] font-mono tracking-widest text-foreground/40 uppercase">
							Crafted with Next.js, GSAP & Tailwind
						</span>
					</div>

					<div className="footer-reveal flex items-center gap-3">
						<div className="flex gap-2">
							<div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(27,84,255,0.3)]" />
							<div className="w-2 h-2 rounded-full bg-foreground/10" />
							<div className="w-2 h-2 rounded-full bg-foreground/10" />
						</div>
						<span className="text-[8px] font-mono tracking-[0.3em] text-foreground/20 uppercase">
							SYS_READY
						</span>
					</div>
				</div>

				<div className="footer-copy mt-12 text-center">
					<p className="text-[9px] font-mono text-foreground/20 tracking-[0.2em] uppercase">
						&copy; {currentYear} Abhiraman Kuntimaddi. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
