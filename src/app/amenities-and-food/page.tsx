import type { Metadata } from "next";
import FoodAmenitiesPageView from "@/components/pages/FoodAmenitiesPageView";
import { PG_DATA } from "@/config/pg-data";

export const metadata: Metadata = {
  title: "Food & Amenities - 3x Meals, 5G Wi-Fi & Laundry in Trivandrum | Amanuro Stays",
  description:
    "Discover our flexible 3-times homestyle Kerala food arrangement, high-speed 5G Wi-Fi on all floors, automatic washing machines, 24/7 power & water, and CCTV security at Amanuro Stays.",
  alternates: {
    canonical: `${PG_DATA.seo.siteUrl}/amenities-and-food`,
  },
  openGraph: {
    title: "Food & Amenities - 3x Meals, 5G Wi-Fi & Laundry | Amanuro Stays Trivandrum",
    description:
      "Wholesome Kerala food arrangements, 5G Wi-Fi, automatic laundry machines, and round-the-clock utilities across Trivandrum PG hubs.",
    url: `${PG_DATA.seo.siteUrl}/amenities-and-food`,
    siteName: PG_DATA.brand.displayName,
    images: [{ url: `${PG_DATA.seo.siteUrl}/amanuro-brand-logo.jpg`, width: 1024, height: 1024 }],
  },
};

export default function FoodAmenitiesPage() {
  return <FoodAmenitiesPageView />;
}
