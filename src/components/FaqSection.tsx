"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Search, MessageCircle } from "lucide-react";
import { PG_DATA, FaqItem } from "@/config/pg-data";

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
    "Food & Mess",
    "Amenities & Utilities",
    "Location & Rules",
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
    <section id="faqs" className="py-20 bg-slate-50 text-slate-900 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clear Answers &amp; Full Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600">
            Everything you need to know about our room options, flexible meal arrangements, utilities, and location in Palayam.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. food, Wi-Fi, pricing, Palayam)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Items */}
        <div className="mt-8 space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      <p>{faq.answer}</p>
                      <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400 font-medium">
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
        <div className="mt-10 text-center p-6 bg-white rounded-2xl border border-slate-200 max-w-xl mx-auto space-y-2">
          <h4 className="text-sm font-bold text-slate-900">Have a question not listed here?</h4>
          <p className="text-xs text-slate-500">
            Our team is available 7 days a week to clarify any room inquiries or visit schedules.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-blue-800 bg-blue-100 hover:bg-blue-200 transition-colors cursor-pointer"
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
