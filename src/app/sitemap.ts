import { MetadataRoute } from "next";
import { PG_DATA } from "@/config/pg-data";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = PG_DATA.seo.siteUrl;
  const lastMod = new Date("2026-10-09T00:00:00Z");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastMod,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: lastMod,
      changeFrequency: "daily",
      priority: 0.8,
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

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => {
    const postDate = post.frontmatter.date ? new Date(post.frontmatter.date) : lastMod;
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: isNaN(postDate.getTime()) ? lastMod : postDate,
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...blogPosts];
}
