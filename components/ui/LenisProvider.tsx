"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { loaderSignal } from "@/lib/loaderSignal";
import { lenisRef } from "@/lib/lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		});

		lenis.stop();
		lenisRef.set(lenis);
		lenis.on("scroll", ScrollTrigger.update);

		const raf = (time: number) => lenis.raf(time * 1000);
		gsap.ticker.add(raf);
		gsap.ticker.lagSmoothing(0);

		const off = loaderSignal.onComplete(() => lenis.start());

		return () => {
			off();
			gsap.ticker.remove(raf);
			lenis.destroy();
			lenisRef.set(null);
		};
	}, []);

	return <>{children}</>;
}
