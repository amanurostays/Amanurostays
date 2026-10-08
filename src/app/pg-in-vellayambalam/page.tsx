import type { Metadata } from "next";
import LocationHubView from "@/components/LocationHubView";
import { PG_DATA } from "@/config/pg-data";

export const metadata: Metadata = {
  title: "Best Mens PG in Vellayambalam Trivandrum | Kowdiar, Ambalamukku & Peroorkada",
  description:
    "Looking for a quality Mens PG in Vellayambalam Hub, Trivandrum? Covering Kowdiar, Ambalamukku, and Peroorkada. Safe, disturbance-free living from ₹3,499/mo with 5G Wi-Fi, washing machine & food.",
  keywords: [
    "pg in vellayambalam trivandrum",
    "mens pg vellayambalam",
    "pg in kowdiar trivandrum",
    "pg in ambalamukku",
    "pg in peroorkada",
    "paying guest vellayambalam",
    "boys hostel kowdiar",
    "student pg vellayambalam",
  ],
  alternates: {
    canonical: `${PG_DATA.seo.siteUrl}/pg-in-vellayambalam`,
  },
  openGraph: {
    title: "Best Mens PG in Vellayambalam Trivandrum | Kowdiar, Ambalamukku & Peroorkada",
    description:
      "Comfortable Mens PG & Student stay in Vellayambalam Hub, Trivandrum starting from ₹3,499/month. High-speed 5G Wi-Fi, washing machine, and homestyle food.",
    url: `${PG_DATA.seo.siteUrl}/pg-in-vellayambalam`,
    siteName: PG_DATA.brand.displayName,
    images: [{ url: "https://amanuro.in/amanuro-brand-logo.jpg", width: 1024, height: 1024 }],
  },
};

const vellayambalamFaqs = [
  {
    question: "Which areas are covered under Vellayambalam Hub?",
    answer:
      "Our Vellayambalam Hub covers Kowdiar, Ambalamukku, and Peroorkada, offering peaceful living with swift connectivity to Museum, Kanakakkunnu, and Nanthencode.",
  },
  {
    question: "What is the monthly pricing in Vellayambalam Hub?",
    answer:
      "Room plans start from ₹3,499/month. Both budget and premium sharing rooms come with high-speed 5G Wi-Fi, washing machine, and 24/7 power and water.",
  },
  {
    question: "Is there 3-times daily food available?",
    answer:
      "Yes, we provide an optional 3-times homestyle Kerala food arrangement prepared fresh daily.",
  },
  {
    question: "How do I book a visit at the Vellayambalam PG?",
    answer:
      "Simply click 'Schedule Free Visit' or call / WhatsApp us at 6282830532 to view rooms today.",
  },
];

export default function PgInVellayambalamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        name: "Amanuro Stays - Vellayambalam Hub",
        description:
          "Affordable Mens PG and Student accommodation in Vellayambalam Hub covering Kowdiar, Ambalamukku and Peroorkada in Trivandrum.",
        url: `${PG_DATA.seo.siteUrl}/pg-in-vellayambalam`,
        telephone: PG_DATA.brand.primaryPhoneClean,
        priceRange: "₹3,499 - ₹7,500",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Vellayambalam Hub",
          addressLocality: "Trivandrum",
          addressRegion: "Kerala",
          postalCode: "695010",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 8.5115,
          longitude: 76.9602,
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
            name: "PG in Vellayambalam",
            item: `${PG_DATA.seo.siteUrl}/pg-in-vellayambalam`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: vellayambalamFaqs.map((faq) => ({
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
        hubName="Vellayambalam Hub"
        badgeText="Open &amp; Active • Vellayambalam Hub, Trivandrum"
        headline="Premier Mens PG in Vellayambalam, Trivandrum"
        subheadline="Covering Kowdiar • Ambalamukku • Peroorkada"
        metaIntro="Enjoy upscale, serene living in our Vellayambalam Hub covering Kowdiar, Ambalamukku, and Peroorkada. Safe, disturbance-free accommodation equipped with high-speed 5G Wi-Fi, washing machine, and homestyle food from ₹3,499/month."
        coveredLocations={[
          "Kowdiar",
          "Ambalamukku",
          "Peroorkada",
          "Museum &amp; Kanakakkunnu Junction",
          "Nanthencode Corridor",
          "Vellayambalam Junction",
        ]}
        keyLandmarks={[
          "Minutes to Kowdiar Palace avenue & parks",
          "Direct access to Ambalamukku & Peroorkada bus routes",
          "Calm, upscale neighborhood with quiet study environment",
          "Proximity to Museum, Keltron, and civil offices",
        ]}
        address="Vellayambalam Hub, Thiruvananthapuram, Kerala - 695010"
        status="Active"
        branchId="vellayambalam-hub"
        customFaqs={vellayambalamFaqs}
      />
    </>
  );
}
