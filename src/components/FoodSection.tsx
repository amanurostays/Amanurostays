"use client";

import { Utensils, CheckCircle2, Clock, Sparkles, HeartHandshake } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

interface FoodSectionProps {
  onOpenEnquiry: () => void;
}

export default function FoodSection({ onOpenEnquiry }: FoodSectionProps) {
  const { foodDetails } = PG_DATA;

  return (
    <section id="food-menu" className="py-20 bg-amber-50/50 text-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Food Story & Standards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-200/80 text-amber-900">
              <Utensils className="w-3.5 h-3.5" />
              <span>In-House Hygienic Kitchen</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Food That Reminds You of Home, Not a Mess.
            </h2>

            <p className="text-base text-slate-700 leading-relaxed">
              We know bad food ruins your health and mood. At {PG_DATA.brand.name}, our professional in-house chefs cook fresh, nutritious meals every single day with top-grade ingredients, fresh vegetables, and zero reused oil.
            </p>

            <div className="space-y-3 pt-2">
              {foodDetails.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-800">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-amber-700 hover:bg-amber-800 shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Visit & Taste Complimentary Food</span>
              </button>
            </div>
          </div>

          {/* Right Column: Menu Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-200/80 shadow-md space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-700" />
                  <h3 className="text-lg font-bold text-slate-900">Daily Dining Schedule</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
                  Unlimited Servings
                </span>
              </div>

              <div className="space-y-4">
                {foodDetails.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 hover:border-amber-400 transition-colors"
                  >
                    <span className="text-xs font-bold text-amber-800 tracking-wide block uppercase mb-1">
                      {item.label}
                    </span>
                    <p className="text-sm text-slate-700 font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Special Note Box */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <strong>Office / College Friendly:</strong> Have early morning shift or university class? We provide hot lunchbox packing before 8:30 AM so you never miss a home meal.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
