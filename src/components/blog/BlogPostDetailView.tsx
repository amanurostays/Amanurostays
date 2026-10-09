"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ChevronRight,
  User,
  ArrowLeft,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActionBar from "@/components/FloatingActionBar";
import EnquiryModal from "@/components/EnquiryModal";
import TableOfContents from "@/components/blog/TableOfContents";
import SocialShare from "@/components/blog/SocialShare";
import {
  MidArticleCta,
  ArticleFooterBanner,
  SidebarBookingCard,
} from "@/components/blog/BlogConversionBox";
import BlogCard from "@/components/blog/BlogCard";
import { BlogPost, BlogPostSummary } from "@/types/blog";
import { PG_DATA } from "@/config/pg-data";

interface BlogPostDetailViewProps {
  post: BlogPost;
  relatedPosts: BlogPostSummary[];
}

export default function BlogPostDetailView({
  post,
  relatedPosts,
}: BlogPostDetailViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRoomType, setModalRoomType] = useState<string | undefined>(undefined);
  const [imageError, setImageError] = useState(false);

  const handleOpenEnquiry = (roomType?: string) => {
    setModalRoomType(roomType);
    setIsModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsModalOpen(false);
  };

  const { slug, frontmatter, content, headings } = post;

  const formattedDate = frontmatter.date
    ? new Date(frontmatter.date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recently Published";

  const authorName = frontmatter.author?.name || "Amanuro Editorial Team";
  const authorRole = frontmatter.author?.role || "Trivandrum Coliving & Student Housing Specialist";
  const authorInitials = authorName
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const coverImageSrc =
    !imageError && frontmatter.coverImage
      ? frontmatter.coverImage
      : "/amanuro-brand-logo.jpg";

  const postUrl = `${PG_DATA.seo.siteUrl}/blog/${slug}`;

  // Intelligently split content for mid-article CTA placement
  let part1 = content;
  let part2 = "";
  const h2Matches = [...content.matchAll(/<h2/g)];
  if (h2Matches.length >= 2) {
    const splitIndex = h2Matches[Math.min(2, h2Matches.length - 1)].index;
    if (typeof splitIndex === "number" && splitIndex > 0) {
      part1 = content.slice(0, splitIndex);
      part2 = content.slice(splitIndex);
    }
  }

  const proseClassNames =
    "blog-prose " +
    "[&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:text-teal-950 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pt-4 [&_h2]:border-t [&_h2]:border-slate-100 [&_h2]:scroll-mt-24 " +
    "[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:scroll-mt-24 " +
    "[&_p]:text-slate-700 [&_p]:leading-relaxed [&_p]:text-base [&_p]:sm:text-lg [&_p]:mb-5 " +
    "[&_a]:text-emerald-700 [&_a]:font-semibold [&_a]:underline [&_a]:decoration-emerald-300 [&_a]:underline-offset-4 hover:[&_a]:text-emerald-800 hover:[&_a]:decoration-emerald-600 " +
    "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:space-y-2 [&_ul]:text-slate-700 " +
    "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:space-y-2 [&_ol]:text-slate-700 " +
    "[&_li]:leading-relaxed " +
    "[&_blockquote]:border-l-4 [&_blockquote]:border-emerald-500 [&_blockquote]:bg-emerald-50/60 [&_blockquote]:p-4 [&_blockquote]:rounded-r-xl [&_blockquote]:my-6 [&_blockquote]:text-slate-800 [&_blockquote]:italic " +
    "[&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-slate-200 [&_table]:text-sm [&_table]:my-6 " +
    "[&_th]:border [&_th]:border-slate-200 [&_th]:p-3 [&_th]:bg-emerald-950 [&_th]:text-white [&_th]:font-bold [&_th]:text-left " +
    "[&_td]:border [&_td]:border-slate-200 [&_td]:p-3 [&_td]:text-slate-700 " +
    "[&_tr:nth-child(even)]:bg-emerald-50/30 " +
    "[&_code]:bg-slate-100 [&_code]:text-emerald-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono " +
    "[&_pre]:bg-slate-900 [&_pre]:text-slate-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-6 " +
    "[&_hr]:border-slate-200 [&_hr]:my-8";

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      {/* Sticky Site Header */}
      <Header onOpenEnquiry={() => handleOpenEnquiry(`Article Enquiry: ${frontmatter.title}`)} />

      <main className="flex-1">
        {/* Breadcrumb Navigation Strip */}
        <div className="bg-[#061e17] text-stone-300 py-2.5 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60 text-xs">
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-amber-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <Link href="/blog" className="hover:text-amber-300 transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="text-amber-300 font-bold truncate max-w-xs sm:max-w-md">
              {frontmatter.title}
            </span>
          </div>
        </div>

        {/* Article Header Banner */}
        <header className="relative bg-gradient-to-b from-[#0a271f] via-[#0d3429] to-[#08201a] text-white pt-10 pb-14 border-b border-emerald-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Back to Blog link */}
            <div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-amber-300 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All Articles</span>
              </Link>
            </div>

            {/* Badges: Category & Reading Time */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {frontmatter.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full font-bold bg-emerald-900/80 text-amber-300 border border-amber-400/30">
                  {frontmatter.category}
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium bg-emerald-950/60 text-emerald-200 border border-emerald-800">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>{formattedDate}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium bg-emerald-950/60 text-emerald-200 border border-emerald-800">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{frontmatter.readTime || "6 min read"}</span>
              </span>
            </div>

            {/* H1 Article Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {frontmatter.title}
            </h1>

            {/* Excerpt / Lead Paragraph */}
            {frontmatter.excerpt && (
              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
                {frontmatter.excerpt}
              </p>
            )}

            {/* Author Badge */}
            <div className="pt-2 flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden bg-emerald-900 text-amber-300 flex items-center justify-center font-bold text-sm border-2 border-amber-400/50 shadow-sm shrink-0">
                {frontmatter.author?.avatar ? (
                  <Image
                    src={frontmatter.author.avatar}
                    alt={authorName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span>{authorInitials || <User className="w-5 h-5" />}</span>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-snug">
                  {authorName}
                </p>
                <p className="text-xs text-amber-300/90 font-medium">
                  {authorRole}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Layout with 2-Column Desktop Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Primary Article Column */}
            <article className="lg:col-span-8 space-y-8">
              {/* Featured Cover Image */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-emerald-950/20 border border-emerald-100 shadow-md">
                <Image
                  src={coverImageSrc}
                  alt={frontmatter.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              </div>

              {/* Mobile Table of Contents */}
              {headings.length > 0 && (
                <div className="lg:hidden">
                  <TableOfContents headings={headings} />
                </div>
              )}

              {/* Compiled Markdown Body: Part 1 */}
              <div
                className={proseClassNames}
                dangerouslySetInnerHTML={{ __html: part1 }}
              />

              {/* Mid-Article Conversion Box */}
              <MidArticleCta
                postTitle={frontmatter.title}
                onOpenEnquiry={() =>
                  handleOpenEnquiry(`Mid-article CTA: ${frontmatter.title}`)
                }
              />

              {/* Compiled Markdown Body: Part 2 (if split) */}
              {part2 && (
                <div
                  className={proseClassNames}
                  dangerouslySetInnerHTML={{ __html: part2 }}
                />
              )}

              {/* Social Sharing Suite */}
              <SocialShare
                title={frontmatter.title}
                url={postUrl}
              />

              {/* Article Footer Conversion Banner */}
              <ArticleFooterBanner
                postTitle={frontmatter.title}
                onOpenEnquiry={() =>
                  handleOpenEnquiry(`Article Footer Banner: ${frontmatter.title}`)
                }
              />
            </article>

            {/* Desktop Sticky Sidebar */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                {/* Table of Contents */}
                <TableOfContents headings={headings} />

                {/* Quick Booking Card */}
                <SidebarBookingCard
                  postTitle={frontmatter.title}
                  onOpenEnquiry={() =>
                    handleOpenEnquiry(`Sidebar Card: ${frontmatter.title}`)
                  }
                />
              </div>
            </aside>
          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-12 border-t border-slate-200 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Continue Reading</span>
                  </span>
                  <h3 className="text-2xl font-bold text-teal-950 mt-1">
                    Related Trivandrum Guides
                  </h3>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900"
                >
                  <span>View all guides</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.slice(0, 3).map((related) => (
                  <BlogCard key={related.slug} post={related} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Standard Site Footer */}
      <Footer />

      {/* Floating Action Bar */}
      <FloatingActionBar
        onOpenEnquiry={() =>
          handleOpenEnquiry(`Floating Bar - Article: ${frontmatter.title}`)
        }
      />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={handleCloseEnquiry}
        defaultRoomType={modalRoomType}
      />
    </div>
  );
}
