import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { clashDisplay } from "../fonts";
import { site, personSchema, websiteSchema } from "@/lib/site";
import { getContent } from "@/lib/content/site";
import { getPublished, getPublishedSite } from "@/lib/cms/content";
import { PreviewBanner } from "@/components/ui/PreviewBanner";
import { hasLocale, locales, type Locale } from "@/lib/i18n";
import { DesignLab } from "design-lab";
import { designLabConfig } from "@/lib/designLab.config";
import { ContentProvider } from "@/components/providers/ContentProvider";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ClientChrome } from "@/components/ui/ClientChrome";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { Preloader } from "@/components/ui/Preloader";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const c = getContent(lang, await getPublished("copy"));
  const ogLocale = lang === "de" ? "de_DE" : "en_US";

  return {
    metadataBase: new URL(site.url),
    title: {
      default: c.meta.title,
      template: `%s — ${site.name}`,
    },
    description: c.meta.description,
    keywords: [...site.keywords],
    authors: [{ name: site.author, url: site.url }],
    creator: site.author,
    publisher: site.author,
    category: "technology",
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      url: `${site.url}/${lang}`,
      siteName: site.name,
      title: c.meta.title,
      description: c.meta.description,
      locale: ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: c.meta.title,
      description: c.meta.description,
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
    icons: { icon: "/favicon.ico" },
    manifest: "/manifest.webmanifest",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#040811",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const site = await getPublishedSite();
  const c = getContent(lang, site.copy);

  return (
    <html lang={lang} className={clashDisplay.variable}>
      <body className="antialiased relative bg-background min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        <ContentProvider value={{ locale: lang as Locale, c, data: site.data }}>
          <Preloader />
          <CustomCursor />
          <ClientChrome />
          <LanguageSwitch />
          <LenisProvider>
            <div className="relative z-10">{children}</div>
          </LenisProvider>
          {site.preview && <PreviewBanner />}
          {process.env.NODE_ENV === "development" && (
            <DesignLab config={designLabConfig} />
          )}
        </ContentProvider>
      </body>
    </html>
  );
}
