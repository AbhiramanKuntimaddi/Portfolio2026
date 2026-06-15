import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site, personSchema, websiteSchema } from "@/lib/site";
import { GlobalGlow } from "@/components/ui/GlobalGlow";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { Preloader } from "@/components/ui/Preloader";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.author, url: site.url }],
  creator: site.author,
  publisher: site.author,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: "@abhiraman",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#040811",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased relative bg-background min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        <Preloader />
        <GlobalGlow />
        <CustomCursor />
        <LenisProvider>
          <div className="relative z-10">{children}</div>
        </LenisProvider>
      </body>
    </html>
  );
}
