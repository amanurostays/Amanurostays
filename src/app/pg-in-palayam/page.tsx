import type { Metadata } from "next";
import LocationHubView from "@/components/LocationHubView";
import { PG_DATA } from "@/config/pg-data";

export const metadata: Metadata = {
  title: "Best Mens PG in Palayam Trivandrum | Near Sanskrit College & RBI",
  description:
    "Looking for a safe, affordable Mens PG in Palayam, Trivandrum? Amanuro Stays offers comfortable student & gents accommodation near Sanskrit College, RBI, Secretariat & University from ₹3,499/mo with 5G Wi-Fi, washing machine & food.",
  keywords: [
    "pg in palayam trivandrum",
    "mens pg palayam",
    "paying guest in palayam trivandrum",
    "hostel near sanskrit college trivandrum",
    "pg near rbi trivandrum",
    "student pg palayam",
    "boys pg palayam trivandrum",
    "gents hostel palayam",
  ],
  alternates: {
    canonical: `${PG_DATA.seo.siteUrl}/pg-in-palayam`,
  },
  openGraph: {
    title: "Best Mens PG in Palayam Trivandrum | Near Sanskrit College & RBI",
    description:
      "Comfortable Mens PG & Paying Guest stay in Palayam, Trivandrum starting from ₹3,499/month. High-speed 5G Wi-Fi, washing machine, and homestyle food.",
    url: `${PG_DATA.seo.siteUrl}/pg-in-palayam`,
    siteName: PG_DATA.brand.displayName,
    images: [{ url: "https://amanuro.in/amanuro-brand-logo.jpg", width: 1024, height: 1024 }],
  },
};

const palayamFaqs = [
  {
    question: "Where is Amanuro Stays Palayam Hub located?",
    answer:
      "Our Palayam Hub is located in central Palayam, Trivandrum, within walking distance of Sanskrit College, the Reserve Bank of India (RBI), Secretariat, and the University of Kerala campus.",
  },
  {
    question: "What is the monthly rent for rooms in Palayam?",
    answer:
      "Room plans start from ₹3,499/month for sharing accommodation. We offer budget and premium tiers with high-speed 5G Wi-Fi, washing machine facility, and 24/7 water and electricity included.",
  },
  {
    question: "Is food available at the Palayam PG?",
    answer:
      "Yes! We provide an optional 3-times homestyle Kerala food arrangement (breakfast, lunch, and dinner) prepared in hygienic, clean conditions.",
  },
  {
    question: "Is it suitable for exam students and college students?",
    answer:
      "Yes, Palayam Hub is strictly alcohol-free, drug-free, and disturbance-free, specifically designed with quiet study environments for competitive exam aspirants and students.",
  },
];

export default function PgInPalayamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        name: "Amanuro Stays - Palayam Hub",
        description:
          "Affordable Mens PG and Student accommodation in Palayam, Trivandrum near Sanskrit College and RBI.",
        url: `${PG_DATA.seo.siteUrl}/pg-in-palayam`,
        telephone: PG_DATA.brand.primaryPhoneClean,
        priceRange: "₹3,499 - ₹7,500",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Palayam",
          addressLocality: "Trivandrum",
          addressRegion: "Kerala",
          postalCode: "695034",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 8.5029,
          longitude: 76.9535,
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
            name: "PG in Palayam",
            item: `${PG_DATA.seo.siteUrl}/pg-in-palayam`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: palayamFaqs.map((faq) => ({
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
        hubName="Palayam Hub"
        badgeText="Flagship Central Hub • Palayam, Trivandrum"
        headline="Premier Mens PG in Palayam, Trivandrum"
        subheadline="Near Sanskrit College, RBI &amp; Secretariat"
        metaIntro="Looking for an affordable, safe PG in Palayam? Amanuro Stays provides student and working men's accommodation with high-speed 5G Wi-Fi, washing machine, scheduled cleaning, and optional 3-times homestyle food starting from ₹3,499/month."
        coveredLocations={[
          "Sanskrit College",
          "RBI (Reserve Bank of India)",
          "Government Secretariat",
          "University of Kerala",
          "MG Road Corridor",
          "Ayurveda College Junction",
        ]}
        keyLandmarks={[
          "2 mins from Sanskrit College & Library",
          "Opposite / Walking to RBI & Secretariat",
          "Direct access to University of Kerala Campus",
          "All-time bus connectivity across Trivandrum",
        ]}
        address="Palayam, Thiruvananthapuram, Kerala - 695034"
        status="Active"
        branchId="palayam-hub"
        customFaqs={palayamFaqs}
      />
    </>
  );
}
