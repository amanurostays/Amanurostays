import type { Metadata } from "next";
import LocationHubView from "@/components/LocationHubView";
import { PG_DATA } from "@/config/pg-data";

export const metadata: Metadata = {
  title: "Best Mens PG in Sasthamangalam Trivandrum | Edapazhanji, Jagathi & Vazhuthacaud",
  description:
    "Affordable Mens PG in Sasthamangalam Hub, Trivandrum covering Edapazhanji, Jagathi, and Vazhuthacaud. Starting from ₹3,499/mo with 5G Wi-Fi, washing machine, scheduled cleaning & food.",
  keywords: [
    "pg in sasthamangalam trivandrum",
    "mens pg sasthamangalam",
    "pg in edapazhanji",
    "pg in vazhuthacaud trivandrum",
    "pg in jagathi",
    "paying guest sasthamangalam",
    "student pg edapazhanji",
    "boys hostel vazhuthacaud",
  ],
  alternates: {
    canonical: `${PG_DATA.seo.siteUrl}/pg-in-sasthamangalam`,
  },
  openGraph: {
    title: "Best Mens PG in Sasthamangalam Trivandrum | Edapazhanji, Jagathi & Vazhuthacaud",
    description:
      "Comfortable Mens PG & Student stay in Sasthamangalam Hub, Trivandrum starting from ₹3,499/month. High-speed 5G Wi-Fi, washing machine, and homestyle food.",
    url: `${PG_DATA.seo.siteUrl}/pg-in-sasthamangalam`,
    siteName: PG_DATA.brand.displayName,
    images: [{ url: "https://amanuro.in/amanuro-brand-logo.jpg", width: 1024, height: 1024 }],
  },
};

const sasthamangalamFaqs = [
  {
    question: "Which areas are covered under Sasthamangalam Hub?",
    answer:
      "Our Sasthamangalam Hub covers Edapazhanji, Jagathi, and Vazhuthacaud, providing rapid connectivity to Pangode, Cotton Hill, and Women's College corridor.",
  },
  {
    question: "What is the rent for Mens PG in Sasthamangalam Hub?",
    answer:
      "Prices start from ₹3,499/month for sharing accommodation with high-speed 5G Wi-Fi, washing machine, and 24/7 water and electricity.",
  },
  {
    question: "Is food facility available?",
    answer:
      "Yes, an optional 3-times homestyle Kerala food arrangement (breakfast, lunch, dinner) is available for all residents.",
  },
  {
    question: "Is the atmosphere peaceful for students and working men?",
    answer:
      "Absolutely. Amanuro Stays is strictly alcohol-free, drug-free, and disturbance-free, offering a disciplined, well-maintained stay environment.",
  },
];

export default function PgInSasthamangalamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        name: "Amanuro Stays - Sasthamangalam Hub",
        description:
          "Affordable Mens PG and Student accommodation in Sasthamangalam Hub covering Edapazhanji, Jagathi and Vazhuthacaud in Trivandrum.",
        url: `${PG_DATA.seo.siteUrl}/pg-in-sasthamangalam`,
        telephone: PG_DATA.brand.primaryPhoneClean,
        priceRange: "₹3,499 - ₹7,500",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Sasthamangalam Hub",
          addressLocality: "Trivandrum",
          addressRegion: "Kerala",
          postalCode: "695010",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 8.5042,
          longitude: 76.9712,
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
            name: "PG in Sasthamangalam",
            item: `${PG_DATA.seo.siteUrl}/pg-in-sasthamangalam`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: sasthamangalamFaqs.map((faq) => ({
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
        hubName="Sasthamangalam Hub"
        badgeText="Open &amp; Active • Sasthamangalam Hub, Trivandrum"
        headline="Premier Mens PG in Sasthamangalam, Trivandrum"
        subheadline="Covering Edapazhanji • Jagathi • Vazhuthacaud"
        metaIntro="Enjoy prime city living in our Sasthamangalam Hub covering Edapazhanji, Jagathi, and Vazhuthacaud. Ideal for students and professionals seeking a disturbance-free atmosphere equipped with 5G Wi-Fi, washing machine, and homestyle food from ₹3,499/month."
        coveredLocations={[
          "Edapazhanji",
          "Jagathi",
          "Vazhuthacaud",
          "Pangode Military Camp Junction",
          "Cotton Hill Corridor",
          "Sasthamangalam Junction",
        ]}
        keyLandmarks={[
          "Quick commute to Vazhuthacaud coaching hubs & colleges",
          "Close to Edapazhanji junction commercial amenities",
          "Serene residential pocket ideal for exam study",
          "Multiple direct bus routes across Trivandrum",
        ]}
        address="Sasthamangalam Hub, Thiruvananthapuram, Kerala - 695010"
        status="Active"
        branchId="sasthamangalam-hub"
        customFaqs={sasthamangalamFaqs}
      />
    </>
  );
}
