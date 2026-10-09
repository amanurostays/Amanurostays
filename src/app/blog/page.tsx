import { Metadata } from "next";
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/blog";
import { PG_DATA } from "@/config/pg-data";
import BlogListingView from "@/components/blog/BlogListingView";

export const metadata: Metadata = {
  title: "Blog - PG & Coliving Guides in Trivandrum | Amanuro Stays",
  description:
    "Explore comprehensive guides on student PGs, coliving for IT professionals, living costs, and accommodation options in Trivandrum by Amanuro Stays.",
  alternates: {
    canonical: `${PG_DATA.seo.siteUrl}/blog`,
  },
  openGraph: {
    title: "Blog - PG & Coliving Guides in Trivandrum | Amanuro Stays",
    description:
      "Explore comprehensive guides on student PGs, coliving for IT professionals, living costs, and accommodation options in Trivandrum by Amanuro Stays.",
    url: `${PG_DATA.seo.siteUrl}/blog`,
    siteName: PG_DATA.brand.displayName,
    type: "website",
    images: [
      {
        url: `${PG_DATA.seo.siteUrl}/amanuro-brand-logo.jpg`,
        width: 1200,
        height: 630,
        alt: "Amanuro Stays Blog - Trivandrum PG & Coliving Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - PG & Coliving Guides in Trivandrum | Amanuro Stays",
    description:
      "Explore comprehensive guides on student PGs, coliving for IT professionals, living costs, and accommodation options in Trivandrum by Amanuro Stays.",
    images: [`${PG_DATA.seo.siteUrl}/amanuro-brand-logo.jpg`],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <BlogListingView
      posts={posts}
      categories={categories}
      tags={tags}
    />
  );
}
