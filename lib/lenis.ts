import type Lenis from "lenis";

let instance: Lenis | null = null;

export const lenisRef = {
	get: () => instance,
	set: (l: Lenis | null) => {
		instance = l;
	},
};
