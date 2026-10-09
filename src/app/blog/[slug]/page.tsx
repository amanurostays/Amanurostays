import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
} from "@/lib/blog";
import { PG_DATA } from "@/config/pg-data";
import BlogPostDetailView from "@/components/blog/BlogPostDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const baseUrl = PG_DATA.seo.siteUrl;
  const postUrl = `${baseUrl}/blog/${slug}`;
  const canonicalUrl = post.frontmatter.canonicalUrl || postUrl;

  const coverImg = post.frontmatter.coverImage;
  const imageUrl = coverImg
    ? coverImg.startsWith("http")
      ? coverImg
      : `${baseUrl}${coverImg}`
    : `${baseUrl}/amanuro-brand-logo.jpg`;

  const authorName = post.frontmatter.author?.name || "Amanuro Editorial Team";

  return {
    title: `${post.frontmatter.title} | Amanuro Stays`,
    description: post.frontmatter.description,
    keywords: post.frontmatter.tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: postUrl,
      siteName: PG_DATA.brand.displayName,
      type: "article",
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.date,
      authors: [authorName],
      tags: post.frontmatter.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const baseUrl = PG_DATA.seo.siteUrl;
  const postUrl = `${baseUrl}/blog/${slug}`;
  const coverImg = post.frontmatter.coverImage;
  const imageUrl = coverImg
    ? coverImg.startsWith("http")
      ? coverImg
      : `${baseUrl}${coverImg}`
    : `${baseUrl}/amanuro-brand-logo.jpg`;

  const relatedPosts = getRelatedPosts(slug, 3);

  // Schema.org structured data graph (BlogPosting & BreadcrumbList)
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        isPartOf: {
          "@type": "WebPage",
          "@id": postUrl,
        },
        headline: post.frontmatter.title,
        description: post.frontmatter.description,
        url: postUrl,
        datePublished: post.frontmatter.date,
        dateModified: post.frontmatter.date,
        inLanguage: "en-IN",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": postUrl,
        },
        image: [imageUrl],
        author: {
          "@type": "Person",
          name: post.frontmatter.author?.name || "Amanuro Editorial Team",
          jobTitle:
            post.frontmatter.author?.role ||
            "Trivandrum Coliving & Student Housing Specialist",
        },
        publisher: {
          "@type": "Organization",
          name: "Amanuro Stays",
          url: baseUrl,
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/amanuro-brand-logo.jpg`,
            width: 1024,
            height: 1024,
          },
        },
        articleSection: post.frontmatter.category,
        keywords: Array.isArray(post.frontmatter.tags)
          ? post.frontmatter.tags.join(", ")
          : "",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${postUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${baseUrl}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.frontmatter.title,
            item: postUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData),
        }}
      />
      <BlogPostDetailView
        post={post}
        relatedPosts={relatedPosts}
      />
    </>
  );
}
