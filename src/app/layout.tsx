import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { PG_DATA } from "@/config/pg-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
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
        url: "/logo.png",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
