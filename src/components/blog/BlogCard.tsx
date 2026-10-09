"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { BlogPostSummary } from "@/types/blog";

interface BlogCardProps {
  post: BlogPostSummary;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { slug, frontmatter } = post;
  const [imageError, setImageError] = useState(false);

  const formattedDate = frontmatter.date
    ? new Date(frontmatter.date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recently Published";

  const authorName = frontmatter.author?.name || "Amanuro Editorial Team";
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

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 overflow-hidden">
      {/* Cover Image Container */}
      <Link
        href={`/blog/${slug}`}
        className="relative block w-full aspect-[16/9] overflow-hidden bg-emerald-950/20"
      >
        <Image
          src={coverImageSrc}
          alt={frontmatter.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Badge overlay */}
        {frontmatter.category && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-amber-300 border border-amber-400/30 backdrop-blur-md">
            {frontmatter.category}
          </span>
        )}
      </Link>

      {/* Card Content Body */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 justify-between">
        <div>
          {/* Metadata Row: Date & Reading Time */}
          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mb-3">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{formattedDate}</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{frontmatter.readTime || "5 min read"}</span>
            </span>
          </div>

          {/* Title */}
          <h2 className="text-lg sm:text-xl font-bold text-teal-950 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug mb-2">
            <Link href={`/blog/${slug}`}>
              {frontmatter.title}
            </Link>
          </h2>

          {/* Excerpt */}
          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
            {frontmatter.excerpt || frontmatter.description}
          </p>

          {/* Tags */}
          {Array.isArray(frontmatter.tags) && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {frontmatter.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer: Author + Read Link */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
          {/* Author Badge */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-emerald-900 text-amber-300 flex items-center justify-center font-bold text-xs border border-emerald-700 shrink-0">
              {frontmatter.author?.avatar ? (
                <Image
                  src={frontmatter.author.avatar}
                  alt={authorName}
                  fill
                  className="object-cover"
                />
              ) : (
                <span>{authorInitials || <User className="w-4 h-4" />}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">
                {authorName}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                {frontmatter.author?.role || "Local Living Advisor"}
              </p>
            </div>
          </div>

          {/* Read CTA Link */}
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 hover:text-emerald-900 group-hover:translate-x-0.5 transition-all shrink-0"
          >
            <span>Read Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
