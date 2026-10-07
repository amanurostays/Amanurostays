import { PG_DATA } from "@/config/pg-data";

export default function JsonLd() {
  const flagship = PG_DATA.branches.find((b) => b.isFlagship) || PG_DATA.branches[0];

  // 1. LocalBusiness / LodgingBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${PG_DATA.seo.siteUrl}/#organization`,
    name: PG_DATA.brand.legalName,
    alternateName: PG_DATA.brand.name,
    description: PG_DATA.brand.shortDescription,
    url: PG_DATA.seo.siteUrl,
    telephone: PG_DATA.brand.primaryPhoneClean,
    email: PG_DATA.brand.email,
    priceRange: "₹7,800 - ₹16,500/month",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Credit Card, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: flagship.address,
      addressLocality: flagship.locality,
      addressRegion: "Karnataka",
      postalCode: "560034",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: flagship.coordinates.latitude,
      longitude: flagship.coordinates.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:00",
        closes: "23:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: PG_DATA.brand.overallRating.toString(),
      reviewCount: PG_DATA.brand.totalReviewsCount.toString(),
      bestRating: "5",
      worstRating: "1",
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
          name: room.title,
          description: room.subtitle,
          numberOfRooms: 1,
          floorSize: {
            "@type": "QuantitativeValue",
            value: room.specs.roomSize,
          },
        },
        price: room.pricePerMonth,
        priceCurrency: "INR",
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
        name: "Facilities",
        item: `${PG_DATA.seo.siteUrl}#amenities`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Branches",
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
