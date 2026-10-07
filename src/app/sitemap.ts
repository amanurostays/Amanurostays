import { MetadataRoute } from "next";
import { PG_DATA } from "@/config/pg-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = PG_DATA.seo.siteUrl;
  const lastMod = new Date("2026-10-01");

  return [
    {
      url: baseUrl,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}#rooms`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}#amenities`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}#food-menu`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}#branches`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}#faqs`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
