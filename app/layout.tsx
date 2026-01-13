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
			{/* Apply the Rich Black background to the body */}
			<body className="antialiased relative bg-[#00072d] min-h-screen">
				<GlobalGlow />
				{/* Ensure children are relative so they stay above the fixed glow */}
				<div className="relative z-10">{children}</div>
			</body>
		</html>
	);
}
