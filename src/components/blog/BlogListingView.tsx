"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Sparkles, MessageCircle, Phone, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActionBar from "@/components/FloatingActionBar";
import EnquiryModal from "@/components/EnquiryModal";
import BlogSearchFilter from "@/components/blog/BlogSearchFilter";
import { BlogPostSummary } from "@/types/blog";
import { PG_DATA } from "@/config/pg-data";

interface BlogListingViewProps {
  posts: BlogPostSummary[];
  categories: string[];
  tags: string[];
}

export default function BlogListingView({
  posts,
  categories,
  tags,
}: BlogListingViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRoomType, setModalRoomType] = useState<string | undefined>(undefined);

  const handleOpenEnquiry = (roomType?: string) => {
    setModalRoomType(roomType);
    setIsModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      {/* Sticky Site Header */}
      <Header onOpenEnquiry={() => handleOpenEnquiry("Blog Inquiry")} />

      <main className="flex-1">
        {/* Breadcrumb Strip */}
        <div className="bg-[#061e17] text-stone-300 py-2.5 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60 text-xs">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <Link href="/" className="hover:text-amber-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-amber-300 font-bold">Blog &amp; Local Guides</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0a271f] via-[#0d3429] to-[#08201a] text-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-emerald-950">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-gradient-to-tr from-emerald-500/10 via-amber-400/10 to-teal-500/10 blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-900/80 text-amber-300 border border-amber-400/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Amanuro Stays • Local Living &amp; Accommodation Guides</span>
            </div>

            {/* Main Page Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
              Trivandrum PG, Coliving &amp; Student Living Guides
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
              Curated insider advice for college students, Kerala PSC/IAS aspirants, and Technopark IT professionals. Discover where to live, monthly costs, and prime hubs across Trivandrum.
            </p>

            {/* Quick Location Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-emerald-200/60 font-semibold mr-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Our Hubs:</span>
              </span>
              <Link
                href="/pg-in-palayam"
                className="px-3 py-1 rounded-full bg-emerald-950/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-700/50 transition-colors"
              >
                Palayam
              </Link>
              <Link
                href="/pg-in-pattom"
                className="px-3 py-1 rounded-full bg-emerald-950/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-700/50 transition-colors"
              >
                Pattom
              </Link>
              <Link
                href="/pg-in-vellayambalam"
                className="px-3 py-1 rounded-full bg-emerald-950/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-700/50 transition-colors"
              >
                Vellayambalam
              </Link>
              <Link
                href="/pg-in-sasthamangalam"
                className="px-3 py-1 rounded-full bg-emerald-950/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-700/50 transition-colors"
              >
                Sasthamangalam
              </Link>
              <Link
                href="/executive-dormitory-trivandrum"
                className="px-3 py-1 rounded-full bg-emerald-950/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-700/50 transition-colors"
              >
                Executive Dormitory
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section with Search & Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <BlogSearchFilter
            posts={posts}
            categories={categories}
            tags={tags}
          />
        </section>

        {/* High-Converting Bottom Banner */}
        <section className="bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/60">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-extrabold">
                Ready to move in?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Verified Mens PG &amp; Coliving Starting at ₹3,499/mo
              </h2>
              <p className="text-sm text-emerald-100/80 max-w-xl">
                Zero brokerage, high-speed 5G Wi-Fi, automatic washing machine, and optional 3x homestyle Kerala meals across 5 prime city hubs.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href={`https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent(
                  "Hi Amanuro Stays, I was reading your blog and want to inquire about room availability."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={() => handleOpenEnquiry("Blog Bottom CTA")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-stone-950 font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Schedule a Free Visit</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Standard Site Footer */}
      <Footer />

      {/* Floating Action Bar */}
      <FloatingActionBar onOpenEnquiry={() => handleOpenEnquiry("Floating Action Bar")} />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={handleCloseEnquiry}
        defaultRoomType={modalRoomType}
      />
    </div>
  );
}
