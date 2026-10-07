"use client";

import { Utensils, CheckCircle2, Sparkles, HeartHandshake, Flame } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

interface FoodSectionProps {
  onOpenEnquiry: () => void;
}

export default function FoodSection({ onOpenEnquiry }: FoodSectionProps) {
  return (
    <section id="food" className="py-16 sm:py-20 bg-gradient-to-b from-white via-emerald-50/40 to-white text-slate-900 scroll-mt-20 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading & Description with SEO Keywords */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-teal-900 border border-emerald-200">
              <Utensils className="w-3.5 h-3.5 text-emerald-700" />
              <span>PG with Food Trivandrum • Flexible Choice</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-950 tracking-tight leading-tight">
              3-Times Homestyle Food Arrangement
            </h2>

            <p className="text-base text-slate-600 leading-relaxed max-w-xl">
              Looking for a <strong className="text-teal-950 font-semibold">PG with food in Trivandrum</strong>? At Amanuro Stays, we offer a clean, hygienic 3-times homestyle meal arrangement available specifically for residents who want daily meals. Perfect for university scholars at our <strong className="text-teal-950 font-semibold">student PG</strong> and IT professionals staying at our <strong className="text-teal-950 font-semibold">working men&apos;s PG</strong>.
            </p>

            <div className="space-y-3 pt-1 w-full text-left">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Total Flexibility: Choose Stay + Food OR Stay-Only plan
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Breakfast, Lunch &amp; Dinner prepared fresh daily for subscribers
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Wholesome Kerala &amp; South Indian homestyle dishes
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-md shadow-emerald-700/20 transition-all hover:scale-102 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Inquire for Stay with Meal Options</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual highlights with Rich Card Styling */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-md space-y-5">
              <div className="flex items-center gap-3 pb-3.5 border-b border-emerald-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-teal-950">Homestyle Quality &amp; Hygiene</h3>
                  <p className="text-xs text-slate-500">Only for those who opt in — zero compulsory food fees</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wide">
                    Option A: Stay-Only Living
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Simple and flexible. You only pay for your accommodation and utilities with zero compulsory food charges.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wide">
                    Option B: Stay + 3x Daily Food Arrangement
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Hassle-free homestyle breakfast, lunch, and dinner provided daily so you can focus completely on your studies or work without worrying about meal hunting.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-teal-900 text-white flex items-start gap-3 shadow-xs">
                <HeartHandshake className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-100 leading-relaxed">
                  <strong className="text-white">Transparent Policy:</strong> You are never locked into a food contract you don&apos;t need. Inform our team during room selection to choose your plan.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
