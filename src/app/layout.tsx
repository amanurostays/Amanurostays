import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { PG_DATA } from "@/config/pg-data";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(PG_DATA.seo.siteUrl),
  title: {
    default: PG_DATA.seo.metaTitle,
    template: `%s | ${PG_DATA.brand.displayName}`,
  },
  description: PG_DATA.seo.metaDescription,
  keywords: PG_DATA.seo.keywords,
  authors: [{ name: PG_DATA.brand.name }],
  creator: PG_DATA.brand.name,
  publisher: PG_DATA.brand.legalName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PG_DATA.seo.siteUrl,
    title: PG_DATA.seo.metaTitle,
    description: PG_DATA.seo.metaDescription,
    siteName: PG_DATA.brand.displayName,
    images: [
      {
        url: "/amanuro-brand-logo.jpg",
        width: 800,
        height: 800,
        alt: `${PG_DATA.brand.displayName} - Mens PG in Trivandrum`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PG_DATA.seo.metaTitle,
    description: PG_DATA.seo.metaDescription,
    images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80"],
  },
  alternates: {
    canonical: PG_DATA.seo.siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-white text-stone-900 selection:bg-emerald-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
