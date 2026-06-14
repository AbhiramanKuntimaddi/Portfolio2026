import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data/projects";

const STATUS_DOT: Record<string, string> = {
	ONGOING: "bg-orange-400",
	COMPLETED: "bg-green-500",
	UPCOMING: "bg-violet-400",
	ARCHIVED: "bg-red-500",
};

export function generateStaticParams() {
	const slugs = new Set(projects.map((p) => p.link.replace("/archive/", "")));
	return Array.from(slugs).map((slug) => ({ slug }));
}

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const project = projects.find((p) => p.link === `/archive/${slug}`);
	if (!project) notFound();

	const images = (project as { images?: string[] }).images ?? [];

	return (
		<main className="relative z-10 min-h-dvh bg-background">
			<div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
				<Link
					href="/"
					className="group inline-flex items-baseline font-mono cursor-pointer mb-14 md:mb-20">
					<span className="text-accent mr-2 transition-transform duration-300 group-hover:-translate-x-1 font-bold select-none">
						&lt;
					</span>
					<span className="text-accent/70 text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-300 group-hover:text-foreground">
						back_to_index
					</span>
					<span className="text-accent/40 select-none">();</span>
				</Link>

				<div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
					<span className="text-accent font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase border-l border-accent/40 pl-4">
						{project.category}
					</span>
					<span className="text-foreground/40 font-mono text-[10px] md:text-[11px] tracking-widest">
						{project.year}
					</span>
					<span className="inline-flex items-center gap-2">
						<span
							className={`w-2 h-2 rounded-full ${
								STATUS_DOT[project.status] ?? "bg-foreground/30"
							}`}
						/>
						<span className="text-foreground/50 font-mono text-[10px] md:text-[11px] lowercase tracking-wide">
							{project.status.toLowerCase()}
						</span>
					</span>
				</div>

				<h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold text-foreground uppercase leading-[0.9] tracking-tight [word-spacing:0.1em]">
					{project.title}
				</h1>

				<p className="mt-8 md:mt-10 max-w-2xl text-foreground/65 text-lg md:text-xl font-light leading-relaxed">
					{project.description}
				</p>

				<div className="mt-10">
					<p className="font-mono text-[11px] text-foreground/40 tracking-wide mb-4">
						<span className="text-accent/60">{"// "}</span>built with
					</p>
					<div className="flex flex-wrap gap-2">
						{project.stack.map((tech) => (
							<span
								key={tech}
								className="px-3 py-1.5 bg-accent/5 border border-accent/20 text-accent text-[10px] font-mono tracking-widest uppercase rounded-sm">
								{tech}
							</span>
						))}
					</div>
				</div>

				{images.length > 0 && (
					<div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
						{images.map((src, i) => (
							// eslint-disable-next-line @next/next/no-img-element
							<img
								key={i}
								src={src}
								alt={`${project.title} — ${i + 1}`}
								className="w-full rounded-md border border-foreground/10 object-cover"
							/>
						))}
					</div>
				)}

				<div className="mt-16 border-t border-foreground/10 pt-8">
					<Link
						href="/#contact"
						className="group inline-flex items-baseline font-mono cursor-pointer">
						<span className="text-accent text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-300 group-hover:text-foreground">
							start_conversation
						</span>
						<span className="text-accent/40 select-none">();</span>
						<span className="text-accent ml-2 transition-transform duration-300 group-hover:translate-x-1 font-bold select-none">
							&gt;
						</span>
					</Link>
				</div>
			</div>
		</main>
	);
}
