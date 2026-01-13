import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";

export default function Home() {
	return (
		<main className="relative w-full">
			<Hero />
			<About />
      <Skills />
      <Experience />
		</main>
	);
}
