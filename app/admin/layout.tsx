import type { Metadata } from "next";
import "../globals.css";
import { clashDisplay } from "../fonts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Abhiraman Kuntimaddi",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={clashDisplay.variable}>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
