import { PG_DATA } from "@/config/pg-data";

export default function JsonLd() {
  const flagship = PG_DATA.branches.find((b) => b.isFlagship) || PG_DATA.branches[0];

  // 1. LocalBusiness / LodgingBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${PG_DATA.seo.siteUrl}/#organization`,
    name: PG_DATA.brand.displayName,
    alternateName: PG_DATA.brand.name,
    description: PG_DATA.brand.shortDescription,
    url: PG_DATA.seo.siteUrl,
    telephone: PG_DATA.brand.primaryPhoneClean || undefined,
    email: PG_DATA.brand.email,
    priceRange: "Starting from ₹3,499/month",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Bank Transfer",
    keywords: PG_DATA.seo.keywords.join(", "),
    address: {
      "@type": "PostalAddress",
      streetAddress: flagship.address,
      addressLocality: flagship.locality,
      addressRegion: "Kerala",
      postalCode: "695034",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: flagship.coordinates.latitude,
      longitude: flagship.coordinates.longitude,
    },
    amenityFeature: PG_DATA.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity.title,
      value: true,
      description: amenity.description,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Men's PG Accommodation Plans",
      itemListElement: PG_DATA.roomPlans.map((room) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Accommodation",
          name: `${room.title} (${room.tier} Tier)`,
          description: room.subtitle,
          numberOfRooms: 1,
        },
        price: PG_DATA.brand.startingPrice,
        priceCurrency: "INR",
        description: room.startingPriceText,
      })),
    },
  };

  // 2. FAQ Schema for Google Rich Snippets & AEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PG_DATA.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // 3. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
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
        name: "Rooms & Pricing",
        item: `${PG_DATA.seo.siteUrl}#rooms`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Dormitory",
        item: `${PG_DATA.seo.siteUrl}#dormitory`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Amenities",
        item: `${PG_DATA.seo.siteUrl}#amenities`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Locations",
        item: `${PG_DATA.seo.siteUrl}#branches`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
