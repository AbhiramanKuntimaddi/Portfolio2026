import type { Metadata } from "next";
import "./globals.css";
import { GlobalGlow } from "@/components/ui/GlobalGlow";

export const metadata: Metadata = {
	title: "Abhiraman Kuntimaddi",
	description: "INTELLIGENT SYSTEMS ENGINEER",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className="antialiased relative bg-[#00072d] min-h-screen">
				{/* Global mouse-follow glow */}
				<GlobalGlow />

				{/* Main content is above the glow */}
				<div className="relative z-10">{children}</div>
			</body>
		</html>
	);
}
