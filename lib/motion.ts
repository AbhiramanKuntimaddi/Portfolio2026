import { Variants } from "framer-motion";

export const container: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.3,
		},
	},
};

export const fadeUp: Variants = {
	hidden: {
		opacity: 0,
		y: 40,
		filter: "blur(15px)",
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 1.4,
			ease: [0.16, 1, 0.3, 1],
		},
	},
};
