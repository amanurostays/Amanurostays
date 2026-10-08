import type { Metadata } from "next";
import LocationHubView from "@/components/LocationHubView";
import { PG_DATA } from "@/config/pg-data";

export const metadata: Metadata = {
  title: "Executive Dormitory in Trivandrum | Monthly Pod Stays for Exam Students",
  description:
    "Executive Dormitory on monthly basis in Trivandrum. Modern pod stays for PSC, UPSC & competitive exam students with quiet study rooms, high-speed 5G Wi-Fi, and calm environment.",
  keywords: [
    "executive dormitory trivandrum",
    "dormitory in trivandrum",
    "monthly dormitory trivandrum",
    "pod stay trivandrum",
    "student dormitory trivandrum",
    "exam study pg trivandrum",
    "dormitory palayam trivandrum",
  ],
  alternates: {
    canonical: `${PG_DATA.seo.siteUrl}/executive-dormitory-trivandrum`,
  },
  openGraph: {
    title: "Executive Dormitory in Trivandrum | Monthly Pod Stays for Exam Students",
    description:
      "Modern pod stays on monthly basis for exam students with quiet study rooms, 5G Wi-Fi, and calm environment in Trivandrum.",
    url: `${PG_DATA.seo.siteUrl}/executive-dormitory-trivandrum`,
    siteName: PG_DATA.brand.displayName,
    images: [{ url: "https://amanuro.in/amanuro-brand-logo.jpg", width: 1024, height: 1024 }],
  },
};

const dormitoryFaqs = [
  {
    question: "What is the Executive Dormitory model at Amanuro Stays?",
    answer:
      "Our Executive Dormitory is a modern pod-style stay offered on a monthly basis, specifically crafted for competitive exam students (UPSC, Kerala PSC, SSC, Banking) and career aspirants who need a quiet, focused study environment.",
  },
  {
    question: "Is the dormitory available on a daily basis?",
    answer:
      "Currently, the Executive Dormitory is offered on a monthly basis to preserve a quiet, dedicated, and undisrupted study environment. Daily basis stays may be introduced later.",
  },
  {
    question: "What facilities are provided in the Executive Dormitory?",
    answer:
      "Residents enjoy individual private pod-style bedding with reading lights, personal locker, high-speed 5G Wi-Fi, dedicated study desk zones, washing machine access, and optional 3-times daily homestyle meals.",
  },
  {
    question: "How do I pre-register or check availability?",
    answer:
      "You can tap 'Pre-Register / Inquire' or contact us directly on WhatsApp or Call at 6282830532 to secure your spot.",
  },
];

export default function ExecutiveDormitoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        name: "Amanuro Stays - Executive Dormitory Trivandrum",
        description:
          "Executive Dormitory on monthly basis in Trivandrum for exam students with dedicated study rooms and calm environment.",
        url: `${PG_DATA.seo.siteUrl}/executive-dormitory-trivandrum`,
        telephone: PG_DATA.brand.primaryPhoneClean,
        priceRange: "Starting from ₹3,499/month",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Palayam Central Hub",
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
            name: "Executive Dormitory Trivandrum",
            item: `${PG_DATA.seo.siteUrl}/executive-dormitory-trivandrum`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: dormitoryFaqs.map((faq) => ({
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
        hubName="Executive Dormitory"
        badgeText="Monthly Basis • Pod Stays for Exam Students"
        headline="Executive Dormitory in Trivandrum"
        subheadline="Pod Stays with Dedicated Study Rooms &amp; Calm Environment"
        metaIntro="Specifically created for competitive exam aspirants, UPSC/PSC students, and working professionals. Enjoy private pod stays on a monthly basis in a strictly quiet, alcohol-free, drug-free, and disciplined environment with 5G Wi-Fi, study zones, and homestyle food."
        coveredLocations={[
          "Central Palayam Hub",
          "Public Library Corridor",
          "Sanskrit College Zone",
          "Secretariat Coaching Hub",
          "University of Kerala Vicinity",
        ]}
        keyLandmarks={[
          "Dedicated quiet study zones & individual study desks",
          "High-speed 5G Wi-Fi for uninterrupted online lectures",
          "Strictly disturbance-free & exam-focused atmosphere",
          "Walking distance to State Central Library & coaching institutes",
        ]}
        address="Palayam Central Hub, Thiruvananthapuram, Kerala - 695034"
        status="Launching Soon"
        branchId="palayam-hub"
        isDormitorySpecial={true}
        customFaqs={dormitoryFaqs}
      />
    </>
  );
}
