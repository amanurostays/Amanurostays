import type { Metadata } from "next";
import LocationHubView from "@/components/LocationHubView";
import { PG_DATA } from "@/config/pg-data";

export const metadata: Metadata = {
  title: "Best Mens PG in Pattom Trivandrum | Plamood, Medical College & Kumarapuram",
  description:
    "Affordable Mens PG in Pattom Hub, Trivandrum covering Plamood, Medical College, and Kumarapuram. From ₹3,499/mo with high-speed 5G Wi-Fi, washing machine, 24/7 power & food arrangement.",
  keywords: [
    "pg in pattom trivandrum",
    "mens pg pattom",
    "paying guest in pattom",
    "pg near medical college trivandrum",
    "pg in plamood",
    "pg in kumarapuram trivandrum",
    "boys hostel pattom",
    "student pg pattom",
  ],
  alternates: {
    canonical: `${PG_DATA.seo.siteUrl}/pg-in-pattom`,
  },
  openGraph: {
    title: "Best Mens PG in Pattom Trivandrum | Plamood, Medical College & Kumarapuram",
    description:
      "Comfortable Mens PG & Student stay in Pattom Hub, Trivandrum starting from ₹3,499/month. High-speed 5G Wi-Fi, washing machine, and homestyle food.",
    url: `${PG_DATA.seo.siteUrl}/pg-in-pattom`,
    siteName: PG_DATA.brand.displayName,
    images: [{ url: "https://amanuro.in/amanuro-brand-logo.jpg", width: 1024, height: 1024 }],
  },
};

const pattomFaqs = [
  {
    question: "Which areas are covered under Amanuro Stays Pattom Hub?",
    answer:
      "Our Pattom Hub covers Plamood, Medical College, and Kumarapuram, giving easy transit access to Medical College Hospital, PSC Office, Kesavadasapuram, and PMG.",
  },
  {
    question: "What is the rent for Mens PG in Pattom?",
    answer:
      "Accommodation starts from ₹3,499/month for sharing rooms. We have budget and premium room options with high-speed 5G Wi-Fi, washing machine, and 24/7 water and electricity.",
  },
  {
    question: "Is Pattom Hub suitable for medical students and PSC aspirants?",
    answer:
      "Yes, Pattom Hub provides a quiet, alcohol-free, drug-free, and disturbance-free environment with study desks, ideal for Government Medical College students and competitive exam candidates.",
  },
  {
    question: "How do I schedule a visit to the Pattom PG?",
    answer:
      "You can tap 'Schedule Free Visit' or call / WhatsApp us directly at 6282830532 to book an instant room viewing.",
  },
];

export default function PgInPattomPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        name: "Amanuro Stays - Pattom Hub",
        description:
          "Affordable Mens PG and Student accommodation in Pattom Hub, Trivandrum covering Plamood, Medical College and Kumarapuram.",
        url: `${PG_DATA.seo.siteUrl}/pg-in-pattom`,
        telephone: PG_DATA.brand.primaryPhoneClean,
        priceRange: "₹3,499 - ₹7,500",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Pattom Hub",
          addressLocality: "Trivandrum",
          addressRegion: "Kerala",
          postalCode: "695004",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 8.5241,
          longitude: 76.9416,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: PG_DATA.seo.siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "PG in Pattom",
            item: `${PG_DATA.seo.siteUrl}/pg-in-pattom`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: pattomFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocationHubView
        hubName="Pattom Hub"
        badgeText="Open &amp; Active • Pattom Hub, Trivandrum"
        headline="Affordable Mens PG in Pattom, Trivandrum"
        subheadline="Covering Plamood • Medical College • Kumarapuram"
        metaIntro="Stay comfortably in our Pattom Hub with quick access to Government Medical College, Kerala PSC Office, Plamood, and Kumarapuram. Safe, clean, and equipped with high-speed 5G Wi-Fi, washing machine, and homestyle food from ₹3,499/month."
        coveredLocations={[
          "Plamood",
          "Medical College",
          "Kumarapuram",
          "Kerala PSC Office Corridor",
          "Kesavadasapuram Junction",
          "Pattom Junction",
        ]}
        keyLandmarks={[
          "Minutes to Trivandrum Government Medical College",
          "Close to Plamood & PMG Corridor",
          "Convenient access to Kumarapuram coaching centers",
          "24/7 public bus transit availability",
        ]}
        address="Pattom Hub, Thiruvananthapuram, Kerala - 695004"
        status="Active"
        branchId="pattom-hub"
        customFaqs={pattomFaqs}
      />
    </>
  );
}
