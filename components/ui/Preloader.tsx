"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { loaderSignal } from "@/lib/loaderSignal";

export function Preloader() {
	const rootRef = useRef<HTMLDivElement>(null);
	const barRef = useRef<HTMLDivElement>(null);
	const numRef = useRef<HTMLSpanElement>(null);

	useGSAP(
		() => {
			const seen =
				typeof sessionStorage !== "undefined" &&
				sessionStorage.getItem("ak_preloaded");

			if (
				seen ||
				window.matchMedia("(prefers-reduced-motion: reduce)").matches
			) {
				gsap.set(rootRef.current, { display: "none" });
				loaderSignal.complete();
				return;
			}

			try {
				sessionStorage.setItem("ak_preloaded", "1");
			} catch {}

			const counter = { v: 0 };

			gsap
				.timeline()
				.to(barRef.current, { scaleX: 1, duration: 2, ease: "power2.inOut" }, 0)
				.to(
					counter,
					{
						v: 100,
						duration: 2,
						ease: "power2.inOut",
						onUpdate: () => {
							if (numRef.current)
								numRef.current.textContent = String(
									Math.round(counter.v)
								).padStart(3, "0");
						},
					},
					0
				)
				.to(
					[".pl-top", ".pl-num"],
					{ opacity: 0, duration: 0.4, ease: "power2.in" },
					">+0.25"
				)
				.to(
					rootRef.current,
					{
						yPercent: -100,
						duration: 1,
						ease: "expo.inOut",
						onComplete: () => loaderSignal.complete(),
					},
					">-0.1"
				);
		},
		{ scope: rootRef }
	);

	return (
		<div
			ref={rootRef}
			className="fixed inset-0 z-100 bg-background flex flex-col justify-between p-6 md:p-12 lg:p-16">
			<div className="pl-top flex justify-between items-center">
				<span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-accent/70">
					Portfolio_System
				</span>
				<span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-foreground/40">
					V.2026
				</span>
			</div>

			<div className="pl-num flex items-end justify-between">
				<span
					ref={numRef}
					className="text-[22vw] md:text-[14vw] font-bold leading-[0.8] text-foreground tracking-tight tabular-nums">
					000
				</span>
				<span className="hidden sm:block mb-4 text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/40">
					Loading_Assets
				</span>
			</div>

			<div className="w-full h-px bg-foreground/10 relative overflow-hidden">
				<div
					ref={barRef}
					className="absolute inset-0 bg-accent origin-left scale-x-0"
				/>
			</div>
		</div>
	);
}
