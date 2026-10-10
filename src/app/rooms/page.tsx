import type { Metadata } from "next";
import RoomsPageView from "@/components/pages/RoomsPageView";
import { PG_DATA } from "@/config/pg-data";

export const metadata: Metadata = {
  title: "Rooms & Pricing - Single & Sharing PG Rooms in Trivandrum | Amanuro Stays",
  description:
    "Explore single, double, triple, and four sharing room plans across Trivandrum starting from ₹3,499/month. High-speed 5G Wi-Fi, automatic laundry, clean washrooms, and flexible meal plans.",
  alternates: {
    canonical: `${PG_DATA.seo.siteUrl}/rooms`,
  },
  openGraph: {
    title: "Rooms & Pricing - Single & Sharing PG Rooms in Trivandrum | Amanuro Stays",
    description:
      "Comfortable budget & premium PG rooms for students and working professionals in Trivandrum starting from ₹3,499/month.",
    url: `${PG_DATA.seo.siteUrl}/rooms`,
    siteName: PG_DATA.brand.displayName,
    images: [{ url: `${PG_DATA.seo.siteUrl}/amanuro-brand-logo.jpg`, width: 1024, height: 1024 }],
  },
};

export default function RoomsPage() {
  return <RoomsPageView />;
}
