"use client";

import React, { useRef, useState, ChangeEvent, FormEvent } from "react";
import {
	motion,
	Variants,
	useScroll,
	useTransform,
	useSpring,
	AnimatePresence,
} from "framer-motion";

const container: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.2 },
	},
};

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
	},
};

interface FormData {
	name: string;
	email: string;
	message: string;
}

export const Contact: React.FC = () => {
	const targetRef = useRef<HTMLDivElement>(null);
	const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS">("IDLE");
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		message: "",
	});

	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start end", "end start"],
	});
	const smoothScroll = useSpring(scrollYProgress, {
		stiffness: 60,
		damping: 20,
		mass: 0.5,
	});

	const contentOpacity = useTransform(
		smoothScroll,
		[0, 0.2, 0.8, 1],
		[0, 1, 1, 0]
	);
	const contentScale = useTransform(smoothScroll, [0, 0.2], [0.95, 1]);

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus("SENDING");
		setTimeout(() => setStatus("SUCCESS"), 1500);
		setTimeout(() => setStatus("IDLE"), 4000);
	};

	return (
		<section
			id="contact"
			ref={targetRef}
			className="relative min-h-screen bg-transparent py-24 md:py-32">
			<motion.div
				style={{ opacity: contentOpacity, scale: contentScale }}
				variants={container}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
				{/* HEADER */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24">
					<motion.div variants={fadeUp} className="lg:col-span-8">
						<h2 className="text-[clamp(2.5rem,8vw,6rem)] font-bold text-foreground leading-[0.85] uppercase tracking-tight">
							Initialize
							<br />
							<span className="text-accent tracking-wide italic font-medium">
								Transmission
							</span>
						</h2>
						<p className="mt-4 text-foreground/70 font-sans text-sm md:text-base tracking-wide font-light leading-relaxed">
							Reach out via the form below or connect with me on the socials.
						</p>
						<div className="flex items-center gap-6 mt-6">
							<div className="h-px w-12 bg-accent/50" />
							<p className="text-[10px] tracking-widest text-accent uppercase font-normal">
								/ Contact_Interface_v1.0
							</p>
						</div>
					</motion.div>
				</div>

				{/* FORM & SOCIALS */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
					{/* FORM */}
					<motion.div variants={fadeUp} className="lg:col-span-7">
						<form onSubmit={handleSubmit} className="space-y-16">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
								<InputField
									label="01_Identity"
									name="name"
									placeholder="Your full name"
									value={formData.name}
									onChange={handleInputChange}
								/>
								<InputField
									label="02_Secure_Channel"
									name="email"
									type="email"
									placeholder="Your email address"
									value={formData.email}
									onChange={handleInputChange}
								/>
							</div>

							<InputField
								label="03_Transmission_Data"
								name="message"
								placeholder="Type your message here..."
								value={formData.message}
								onChange={handleInputChange}
								textarea
							/>

							<motion.button
								type="submit"
								disabled={status !== "IDLE"}
								className="group relative flex items-baseline font-mono pt-8">
								<span className="text-accent mr-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-bold select-none">
									&gt;
								</span>
								<div className="flex flex-col">
									<div className="flex items-baseline gap-1">
										<span className="text-accent text-[11px] md:text-xs font-bold tracking-widest uppercase transition-colors duration-500 group-hover:text-foreground">
											{status === "IDLE"
												? "Execute Send"
												: status === "SENDING"
													? "Transmitting..."
													: "Data Received"}
										</span>
										<span className="text-accent/40 select-none">();</span>
									</div>
									<div className="mt-1 h-px w-full bg-accent/20 relative overflow-hidden">
										<motion.div
											initial={false}
											animate={{ x: status === "IDLE" ? "-100%" : "0%" }}
											className="absolute inset-0 bg-accent"
										/>
									</div>
								</div>
							</motion.button>
						</form>
					</motion.div>

					{/* SOCIALS */}
					<motion.div
						variants={fadeUp}
						className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-foreground/10 lg:pl-16 pt-12 lg:pt-0">
						<h3 className="text-accent font-bold tracking-widest text-[10px] uppercase mb-12 opacity-60">
							Alternate Channels
						</h3>
						<div className="space-y-10">
							{["LinkedIn", "GitHub", "Email"].map((label, i) => (
								<motion.a
									key={i}
									href="#"
									whileHover={{ x: 8 }}
									className="group block border-b border-foreground/10 pb-4">
									<span className="block text-[10px] uppercase tracking-widest text-foreground/60 mb-2 font-normal opacity-60 group-hover:opacity-100 transition-opacity">
										{label}
									</span>
									<span className="text-xl md:text-2xl text-foreground font-medium transition-colors group-hover:text-accent">
										{label === "Email" ? "hello@domain.com" : `@username_${i}`}
									</span>
								</motion.a>
							))}
						</div>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
};

const InputField = ({
	label,
	name,
	type = "text",
	placeholder,
	value,
	onChange,
	textarea = false,
}: {
	label: string;
	name: string;
	type?: string;
	placeholder: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	textarea?: boolean;
}) => (
	<div className="flex flex-col gap-3 relative group border-b border-foreground/10 pb-2 focus-within:border-accent/50 transition-colors duration-500">
		<label className="text-foreground font-semibold tracking-widest text-[10px] uppercase opacity-40 group-focus-within:opacity-100 transition-opacity">
			{label}
		</label>
		<div className="relative overflow-hidden">
			{textarea ? (
				<textarea
					required
					name={name}
					rows={4}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className="bg-transparent border-none outline-none text-foreground font-sans text-lg md:text-xl placeholder:text-foreground/20 tracking-widest resize-none w-full relative z-10"
				/>
			) : (
				<input
					required
					name={name}
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className="bg-transparent border-none outline-none text-foreground font-sans text-lg md:text-xl placeholder:text-foreground/20 tracking-widest w-full relative z-10"
				/>
			)}
			<AnimatePresence>
				{!value && (
					<motion.span
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 0.1, x: 0 }}
						exit={{ opacity: 0, x: 10, filter: "blur(5px)" }}
						className="absolute left-0 top-0 text-foreground pointer-events-none font-sans text-lg md:text-xl tracking-widest whitespace-nowrap">
						{placeholder}
					</motion.span>
				)}
			</AnimatePresence>
		</div>
		<motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent w-0 group-focus-within:w-full transition-all duration-500 ease-in-out" />
	</div>
);
