import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GlobalGlow } from "@/components/ui/GlobalGlow";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { Preloader } from "@/components/ui/Preloader";

export const metadata: Metadata = {
  title: "Abhiraman Kuntimaddi",
  description: "INTELLIGENT SYSTEMS ENGINEER",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#040811",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased relative bg-background min-h-screen">
        <Preloader />
        <GlobalGlow />
        <LenisProvider>
          <div className="relative z-10">{children}</div>
        </LenisProvider>
      </body>
    </html>
  );
}
