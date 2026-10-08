import { MetadataRoute } from "next";
import { PG_DATA } from "@/config/pg-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = PG_DATA.seo.siteUrl;
  const lastMod = new Date();

  return [
    {
      url: baseUrl,
      lastModified: lastMod,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pg-in-palayam`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pg-in-pattom`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pg-in-vellayambalam`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pg-in-sasthamangalam`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/executive-dormitory-trivandrum`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
