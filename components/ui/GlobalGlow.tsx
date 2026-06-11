"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function GlobalGlow() {
	const ref = useRef<HTMLDivElement>(null);
	const pos = useRef({ x: 0, y: 0 });

	useGSAP(
		() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

			const el = ref.current!;
			pos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

			const render = () => {
				el.style.setProperty("--glow-x", `${pos.current.x}px`);
				el.style.setProperty("--glow-y", `${pos.current.y}px`);
			};
			render();

			const xTo = gsap.quickTo(pos.current, "x", {
				duration: 0.6,
				ease: "power3.out",
				onUpdate: render,
			});
			const yTo = gsap.quickTo(pos.current, "y", {
				duration: 0.6,
				ease: "power3.out",
				onUpdate: render,
			});

			const onMove = (e: MouseEvent) => {
				xTo(e.clientX);
				yTo(e.clientY);
			};

			window.addEventListener("mousemove", onMove);
			return () => window.removeEventListener("mousemove", onMove);
		},
		{ scope: ref }
	);

	return (
		<div
			ref={ref}
			className="pointer-events-none fixed inset-0 z-0"
			style={{
				background:
					"radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(27, 84, 255, 0.15) 0%, rgba(27, 84, 255, 0.08) 25%, rgba(27, 84, 255, 0.02) 50%, transparent 80%)",
				mixBlendMode: "screen",
			}}
		/>
	);
}
