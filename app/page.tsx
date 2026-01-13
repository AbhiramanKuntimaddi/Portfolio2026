import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
	return (
		<main className="relative w-full">
			<Hero />
			<About />
			<Skills />
			<Experience />
			<Projects />
			<Contact />
			<Footer />
		</main>
	);
}
