"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCircle } from "react-icons/fi";

interface FooterProps {
	className?: string;
}

/**
 * Standard Footer Component
 * Optimized for a clean, technical exit at the bottom of the document flow.
 */
export const Footer: React.FC<FooterProps> = ({ className = "" }) => {
	const currentYear = new Date().getFullYear();

	return (
		<motion.footer
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.8, ease: "easeOut" }}
			className={`w-full px-6 md:px-20 pb-16 pt-32 bg-transparent ${className}`}>
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-0 items-start md:items-center border-t border-foreground/5 pt-10">
				{/* LEFT: System Info */}
				<div className="flex flex-col gap-2">
					<span className="text-[9px] font-mono tracking-[0.2em] text-foreground/30 uppercase">
						V.2026 // Portfolio System
					</span>
					<span className="text-[10px] font-mono tracking-widest text-foreground/40 uppercase">
						Crafted with React, Framer Motion & Tailwind
					</span>
				</div>

				{/* RIGHT: Status Indicators */}
				<div className="flex items-center gap-3">
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

			{/* FOOTER COPYRIGHT */}
			<div className="mt-12 text-center">
				<p className="text-[9px] font-mono text-foreground/20 tracking-[0.2em] uppercase">
					&copy; {currentYear} Abhiraman Kuntimaddi. All rights reserved.
				</p>
			</div>
		</motion.footer>
	);
};
