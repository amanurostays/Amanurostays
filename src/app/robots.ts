import { MetadataRoute } from "next";
import { PG_DATA } from "@/config/pg-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${PG_DATA.seo.siteUrl}/sitemap.xml`,
  };
}
