"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
	name: string;
	email: string;
	message: string;
}

const channels = [
	{
		label: "LinkedIn",
		value: "abhiraman-kuntimaddi",
		href: "https://www.linkedin.com/in/abhiraman-kuntimaddi-93b037112",
		external: true,
	},
	{
		label: "GitHub",
		value: "AbhiramanKuntimaddi",
		href: "https://github.com/AbhiramanKuntimaddi",
		external: true,
	},
	{
		label: "Instagram",
		value: "@abhiraman.kuntimaddi",
		href: "https://www.instagram.com/abhiraman.kuntimaddi/",
		external: true,
	},
	{
		label: "Email",
		value: "abhiraman21696@gmail.com",
		href: "mailto:abhiraman21696@gmail.com",
		external: false,
	},
];

export function ContactAct() {
	const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS">("IDLE");
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		message: "",
	});

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
		<section className="contact-act absolute inset-0 flex items-center overflow-y-auto py-16">
			<div className="contact-wrap max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 md:mb-16">
					<div className="lg:col-span-8">
						<h2 className="text-[clamp(2.5rem,8vw,6rem)] font-bold text-foreground leading-[0.85] uppercase tracking-tight">
							<span className="block overflow-visible">
								<span className="contact-headline-line block">Initialize</span>
							</span>
							<span className="block overflow-visible">
								<span className="contact-headline-line block text-accent tracking-wide italic font-medium">
									Transmission
								</span>
							</span>
						</h2>
						<p className="contact-sub mt-4 text-foreground/70 font-sans text-sm md:text-base tracking-wide font-light leading-relaxed">
							Reach out via the form below, the channels listed, or directly at{" "}
							<a
								href="mailto:abhiraman21696@icloud.com"
								className="text-accent hover:underline">
								abhiraman21696@icloud.com
							</a>
							.
						</p>
						<div className="contact-sub flex items-center gap-6 mt-6">
							<div className="h-px w-12 bg-accent/50" />
							<p className="text-[10px] tracking-widest text-accent uppercase font-normal">
								/ Contact_Interface_v1.0
							</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
					<div className="contact-fade lg:col-span-7">
						<form onSubmit={handleSubmit} className="space-y-12">
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

							<button
								type="submit"
								disabled={status !== "IDLE"}
								className="group relative flex items-baseline font-mono pt-4 cursor-pointer disabled:cursor-default">
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
										<div
											className={`absolute inset-0 bg-accent transition-transform duration-500 ${
												status === "IDLE" ? "-translate-x-full" : "translate-x-0"
											}`}
										/>
									</div>
								</div>
							</button>
						</form>
					</div>

					<div className="contact-fade lg:col-span-5 border-t lg:border-t-0 lg:border-l border-foreground/10 lg:pl-16 pt-12 lg:pt-0">
						<h3 className="text-accent font-bold tracking-widest text-[10px] uppercase mb-10 opacity-60">
							Alternate Channels
						</h3>
						<div className="space-y-8">
							{channels.map((c) => (
								<a
									key={c.label}
									href={c.href}
									{...(c.external
										? { target: "_blank", rel: "noopener noreferrer" }
										: {})}
									className="group flex items-center justify-between border-b border-foreground/10 pb-4 transition-transform duration-300 hover:translate-x-2">
									<span className="text-xl md:text-2xl text-foreground font-medium transition-colors group-hover:text-accent">
										{c.label}
									</span>
									<span className="text-accent font-mono text-sm opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
										↗
									</span>
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function InputField({
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
}) {
	return (
		<div className="flex flex-col gap-3 relative group border-b border-foreground/10 pb-2 focus-within:border-accent/50 transition-colors duration-500">
			<label className="text-foreground font-semibold tracking-widest text-[10px] uppercase opacity-40 group-focus-within:opacity-100 transition-opacity">
				{label}
			</label>
			<div className="relative overflow-hidden">
				{textarea ? (
					<textarea
						required
						name={name}
						rows={3}
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
			</div>
			<div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent w-0 group-focus-within:w-full transition-all duration-500 ease-in-out" />
		</div>
	);
}
