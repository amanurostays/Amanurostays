import type { Metadata } from "next";
import LocationsPageView from "@/components/pages/LocationsPageView";
import { PG_DATA } from "@/config/pg-data";

export const metadata: Metadata = {
  title: "PG Branches & Hubs Across Trivandrum | Palayam, Pattom, Vellayambalam | Amanuro Stays",
  description:
    "Explore Amanuro Stays PG branches across Trivandrum: Palayam Hub (Palace PG), Pattom Hub, Vellayambalam, Sasthamangalam, and upcoming Technopark locations. Rooms from ₹3,499/mo.",
  alternates: {
    canonical: `${PG_DATA.seo.siteUrl}/locations`,
  },
  openGraph: {
    title: "PG Branches & Hubs Across Trivandrum | Amanuro Stays",
    description:
      "Well-connected PG accommodations in prime Trivandrum locations: Palayam, Pattom, Vellayambalam, and Sasthamangalam.",
    url: `${PG_DATA.seo.siteUrl}/locations`,
    siteName: PG_DATA.brand.displayName,
    images: [{ url: `${PG_DATA.seo.siteUrl}/amanuro-brand-logo.jpg`, width: 1024, height: 1024 }],
  },
};

export default function LocationsPage() {
  return <LocationsPageView />;
}
