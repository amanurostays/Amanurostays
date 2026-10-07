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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/amanuro-brand-logo.jpg", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/amanuro-brand-logo.jpg" },
    ],
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
        url: "https://amanuro.in/amanuro-brand-logo.jpg",
        width: 1024,
        height: 1024,
        alt: `${PG_DATA.brand.displayName} - Affordable PG in the heart of Trivandrum`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PG_DATA.seo.metaTitle,
    description: PG_DATA.seo.metaDescription,
    images: ["https://amanuro.in/amanuro-brand-logo.jpg"],
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
        {/* Favicons & App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />

        {/* Primary Meta Tags for Social & WhatsApp Crawlers */}
        <meta name="title" content="Affordable PG in the heart of Trivandrum | Amanuro Stays" />
        <meta property="og:site_name" content="Amanuro Stays" />
        <meta property="og:title" content="Affordable PG in the heart of Trivandrum | Amanuro Stays" />
        <meta property="og:description" content="Affordable & comfortable Mens PG in Palayam, Trivandrum starting from ₹3,499. High-speed Wi-Fi, washing machine, 24/7 water & power, and homestyle food." />
        <meta property="og:url" content="https://amanuro.in" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://amanuro.in/amanuro-brand-logo.jpg" />
        <meta property="og:image:secure_url" content="https://amanuro.in/amanuro-brand-logo.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:image:alt" content="Amanuro Stays - Affordable PG in the heart of Trivandrum" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Affordable PG in the heart of Trivandrum | Amanuro Stays" />
        <meta name="twitter:description" content="Affordable & comfortable Mens PG in Palayam, Trivandrum starting from ₹3,499. High-speed Wi-Fi, washing machine, 24/7 water & power, and homestyle food." />
        <meta name="twitter:image" content="https://amanuro.in/amanuro-brand-logo.jpg" />

        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-white text-stone-900 selection:bg-emerald-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
