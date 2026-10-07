"use client";

import { Utensils, CheckCircle2, Clock, Sparkles, HeartHandshake } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

interface FoodSectionProps {
  onOpenEnquiry: () => void;
}

export default function FoodSection({ onOpenEnquiry }: FoodSectionProps) {
  return (
    <section id="food-menu" className="py-20 bg-amber-50/50 text-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-200/80 text-amber-900">
              <Utensils className="w-3.5 h-3.5" />
              <span>Optional Meal Arrangement</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              3-Times Homestyle Food Arrangement
            </h2>

            <p className="text-base text-slate-700 leading-relaxed">
              We understand that every resident has different preferences. At {PG_DATA.brand.displayName}, we offer an in-house hygienic food arrangement for residents who want daily meals, prepared fresh with authentic Kerala and South Indian taste.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-slate-800">
                  Optional: Choose Stay + Food OR Stay-Only plan
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-slate-800">
                  Breakfast, Lunch &amp; Dinner prepared fresh daily
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-slate-800">
                  RO purified drinking water &amp; hygienic cooking methods
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Inquire About Meal Plans &amp; Rates</span>
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-200/80 shadow-md space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-700" />
                  <h3 className="text-lg font-bold text-slate-900">Meal Schedule for Subscribers</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-100 text-amber-800">
                  For Those Who Want It
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-xs font-bold text-amber-800 tracking-wide block uppercase mb-1">
                    Morning Breakfast (7:30 AM - 9:30 AM)
                  </span>
                  <p className="text-sm text-slate-700 font-medium">
                    Fresh Kerala breakfast favourites: Idli Sambar, Dosa, Puttu &amp; Kadala, Appam, Upma, Tea &amp; Coffee.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-xs font-bold text-amber-800 tracking-wide block uppercase mb-1">
                    Afternoon Lunch (12:30 PM - 2:30 PM)
                  </span>
                  <p className="text-sm text-slate-700 font-medium">
                    Homestyle Kerala Meals: Rice, Sambar, Moru Curry, Thoran, Mezhukkupuratti, Curd, and Fish/Egg options.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-xs font-bold text-amber-800 tracking-wide block uppercase mb-1">
                    Evening Dinner (8:00 PM - 10:00 PM)
                  </span>
                  <p className="text-sm text-slate-700 font-medium">
                    Hot Chapati / Rice, Dal Fry, Fresh vegetable curries, and periodic special non-veg / chicken dishes.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <strong>Total Flexibility:</strong> Not interested in mess food? No problem! You only pay for your accommodation and utilities.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
