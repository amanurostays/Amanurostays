"use client";

import { useState, useMemo } from "react";
import { Search, X, Tag, Sparkles, SlidersHorizontal, RotateCcw } from "lucide-react";
import { BlogPostSummary } from "@/types/blog";
import BlogCard from "@/components/blog/BlogCard";

interface BlogSearchFilterProps {
  posts: BlogPostSummary[];
  categories: string[];
  tags: string[];
}

export default function BlogSearchFilter({
  posts,
  categories,
  tags,
}: BlogSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filtered posts based on active search query, category, and tag
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const { frontmatter } = post;

      // Category filter
      if (
        selectedCategory !== "All" &&
        frontmatter.category?.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // Tag filter
      if (selectedTag) {
        const postTags = (frontmatter.tags || []).map((t) => t.toLowerCase());
        if (!postTags.includes(selectedTag.toLowerCase())) {
          return false;
        }
      }

      // Search query filter (search across title, description, excerpt, and tags)
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const titleMatch = frontmatter.title.toLowerCase().includes(query);
        const descMatch = (frontmatter.description || "")
          .toLowerCase()
          .includes(query);
        const excerptMatch = (frontmatter.excerpt || "")
          .toLowerCase()
          .includes(query);
        const tagMatch = (frontmatter.tags || []).some((t) =>
          t.toLowerCase().includes(query)
        );
        const catMatch = (frontmatter.category || "")
          .toLowerCase()
          .includes(query);

        if (
          !titleMatch &&
          !descMatch &&
          !excerptMatch &&
          !tagMatch &&
          !catMatch
        ) {
          return false;
        }
      }

      return true;
    });
  }, [posts, searchQuery, selectedCategory, selectedTag]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTag(null);
  };

  const isFiltered =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedTag !== null;

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls Bar */}
      <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-4 sm:p-6 space-y-5">
        {/* Search Input Row */}
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-emerald-700 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides by topic, college, area, or keywords..."
            className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-emerald-200/80 bg-emerald-50/20 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills Navigation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
              <span>Filter by Category</span>
            </span>
            {isFiltered && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === "All"
                  ? "bg-emerald-900 text-amber-300 border border-amber-400/30 shadow-sm shadow-emerald-950/20"
                  : "bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200"
              }`}
            >
              All Articles ({posts.length})
            </button>

            {categories.map((category) => {
              const count = posts.filter(
                (p) =>
                  p.frontmatter.category?.toLowerCase() ===
                  category.toLowerCase()
              ).length;
              const isSelected =
                selectedCategory.toLowerCase() === category.toLowerCase();

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-emerald-900 text-amber-300 border border-amber-400/30 shadow-sm shadow-emerald-950/20"
                      : "bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200"
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Tag Pills (if available) */}
        {tags.length > 0 && (
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Tag className="w-3 h-3 text-emerald-600" />
              <span>Popular Tags:</span>
            </span>
            {tags.slice(0, 10).map((tag) => {
              const isTagActive =
                selectedTag?.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTag(isTagActive ? null : tag)
                  }
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isTagActive
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-emerald-50/60 hover:bg-emerald-100/70 text-emerald-800 border border-emerald-100"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Active Filter Metrics */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-600 px-1">
        <div>
          Showing <span className="text-emerald-800">{filteredPosts.length}</span>{" "}
          {filteredPosts.length === 1 ? "guide" : "guides"}
          {isFiltered && (
            <span className="text-slate-400 font-normal ml-1">
              (filtered from {posts.length} total)
            </span>
          )}
        </div>
      </div>

      {/* Posts Grid or Empty State */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        /* Zero posts in repo */
        <div className="bg-emerald-50/50 rounded-2xl border border-emerald-200/60 p-10 sm:p-14 text-center max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800">
            <Sparkles className="w-7 h-7 text-emerald-700" />
          </div>
          <h3 className="text-xl font-bold text-teal-950">
            Articles Coming Soon
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our local accommodation guides and coliving advice for Trivandrum are currently being curated. Check back shortly for in-depth insights into Palayam, Pattom, Technopark, and budget living!
          </p>
        </div>
      ) : (
        /* Zero matches for active filter */
        <div className="bg-white rounded-2xl border border-slate-200 p-10 sm:p-14 text-center max-w-xl mx-auto space-y-4 shadow-sm">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700">
            <Search className="w-7 h-7 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            No Guides Found
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            We couldn&apos;t find any articles matching your search query or filters.
            Try different keywords like &quot;student&quot;, &quot;technopark&quot;, or &quot;budget&quot;.
          </p>
          <div className="pt-2">
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
