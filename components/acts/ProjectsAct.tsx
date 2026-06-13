"use client";

import { FiLock } from "react-icons/fi";
import { projects } from "@/lib/data/projects";
import { RollingDigit } from "@/components/ui/RollingDigit";

export function ProjectsAct({ activeIndex }: { activeIndex: number }) {
	return (
		<section className="projects-act absolute inset-0 flex items-center overflow-hidden">
			<div className="max-w-7xl mx-auto w-full px-6 md:px-20 relative h-full flex items-center">
				<div className="projects-intro absolute inset-0 flex flex-col justify-center z-30 px-6 md:px-20 pointer-events-none">
					<span className="projects-intro-label text-accent font-bold tracking-widest text-[10px] uppercase mb-6 opacity-60">
						ARCHIVE_2024-2026
					</span>
					<h2 className="text-5xl md:text-8xl font-bold font-sans text-foreground uppercase leading-[0.85] tracking-tight max-w-4xl [word-spacing:0.14em]">
						<span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
							<span className="projects-intro-line block">Project</span>
						</span>
						<span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
							<span className="projects-intro-line block text-accent italic">
								Evolution.
							</span>
						</span>
					</h2>
					<p className="projects-intro-p mt-8 text-foreground/40 text-lg md:text-xl font-light max-w-xl font-sans">
						A chronological deconstruction of my latest deployments.
					</p>
				</div>

				<div className="projects-content relative w-full z-10">
					<div className="max-w-3xl relative">
						{projects.map((project, i) => (
							<div
								key={project.id}
								className="project-block absolute inset-0 flex flex-col justify-center space-y-6 md:space-y-8"
								style={{ pointerEvents: i === activeIndex ? "auto" : "none" }}>
								<div className="flex items-center gap-4">
									<span className="text-accent font-mono text-[10px] tracking-[0.2em] uppercase border-l border-accent/40 pl-4">
										{project.category}
									</span>
									<span className="text-foreground/40 font-mono text-[10px] tracking-widest">
										{project.year}
									</span>
								</div>

								<h3 className="text-4xl md:text-7xl font-bold text-foreground uppercase tracking-tight leading-[0.9] [word-spacing:0.14em]">
									{project.title}
								</h3>

								<p className="text-foreground/60 text-lg md:text-xl font-light leading-relaxed max-w-xl italic">
									{project.description}
								</p>

								<div className="flex flex-wrap gap-2">
									{project.stack.map((tech) => (
										<span
											key={tech}
											className="px-3 py-1 bg-accent/5 border border-accent/20 text-accent text-[9px] font-mono tracking-widest uppercase rounded-sm">
											{tech}
										</span>
									))}
								</div>

								<div className="pt-4 flex items-center gap-6">
									{project.status !== "ARCHIVED" ? (
										<a
											href={project.link}
											className="group relative flex items-center gap-3 px-6 py-3 border border-accent/30 overflow-hidden transition-colors duration-300">
											<div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
											<span className="relative z-10 text-[11px] font-mono tracking-wide text-accent group-hover:text-background transition-colors duration-300 lowercase">
												read more
											</span>
											<svg
												className="relative z-10 w-4 h-4 text-accent group-hover:text-background group-hover:translate-x-1 transition-all duration-300"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={1.5}
													d="M17 8l4 4m0 0l-4 4m4-4H3"
												/>
											</svg>
										</a>
									) : (
										<div className="flex items-center gap-3 px-6 py-3 border border-accent/20 bg-accent/10 opacity-40 cursor-not-allowed">
											<span className="text-[11px] font-mono tracking-wide text-accent/60 lowercase">
												archived
											</span>
											<FiLock className="w-4 h-4 text-accent/60" />
										</div>
									)}

									<div className="hidden sm:flex flex-col border-l border-foreground/10 pl-6">
										<div className="flex items-center gap-2">
											<div className={`w-2 h-2 rounded-full ${
													project.status === "ONGOING"
													? "bg-orange-400 animate-pulse shadow-[0_0_6px_rgba(251,146,60,0.8)]"
													: project.status === "COMPLETED"
														? "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]"
														: project.status === "UPCOMING"
														? "bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,0.8)]"
														: "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.7)]"
												}`}
												/>
											<span className="text-[9px] font-mono text-foreground/50 lowercase tracking-wide">
												{project.status.toLowerCase()}
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="projects-bgdigit absolute right-10 bottom-10 pointer-events-none select-none">
				<RollingDigit
					digit={
						projects[activeIndex].id.startsWith("0")
							? projects[activeIndex].id.slice(1)
							: projects[activeIndex].id
					}
					className="block text-[30vw] font-bold text-foreground italic leading-none font-sans"
				/>
			</div>
		</section>
	);
}
