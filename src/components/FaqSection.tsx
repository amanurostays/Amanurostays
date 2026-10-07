"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Search, MessageCircle } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

interface FaqSectionProps {
  onOpenEnquiry?: () => void;
}

export default function FaqSection({ onOpenEnquiry }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Pricing & Booking",
    "Food & Meals",
    "Amenities & Utilities",
    "Location & Dormitory",
  ];

  const filteredFaqs = PG_DATA.faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-16 sm:py-20 bg-gradient-to-b from-white via-emerald-50/20 to-white text-slate-900 scroll-mt-20 border-b border-emerald-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-teal-900 border border-emerald-200">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Clear Answers &amp; Full Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600">
            Everything you need to know about our room options, flexible meal arrangements, utilities, and location in Palayam.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. food, Wi-Fi, pricing, Palayam)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-emerald-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-2xs"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-teal-900 text-white shadow-md shadow-teal-900/20"
                    : "bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-emerald-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Items */}
        <div className="mt-8 space-y-2.5">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-emerald-100 hover:border-emerald-300 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-bold">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-emerald-600 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-emerald-800" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-emerald-100 bg-emerald-50/40">
                      <p>{faq.answer}</p>
                      <div className="mt-2.5 flex items-center gap-2 text-[11px] text-emerald-700 font-bold">
                        <span>Category: {faq.category}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-slate-500 text-sm">
              No matching questions found. Have a specific question? Ask us directly!
            </div>
          )}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-10 text-center p-6 bg-gradient-to-r from-emerald-100/70 via-teal-50 to-white rounded-2xl border border-emerald-200 max-w-xl mx-auto space-y-2 shadow-xs">
          <h4 className="text-sm font-bold text-teal-950">Have a question not listed here?</h4>
          <p className="text-xs text-slate-600">
            Our team is available 7 days a week to clarify any room inquiries or visit schedules.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-900 hover:bg-teal-800 transition-colors cursor-pointer shadow-md shadow-teal-900/20"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Contact for Details &amp; Availability →</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
