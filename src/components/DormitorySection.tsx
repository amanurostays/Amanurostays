"use client";

import Image from "next/image";
import { Sparkles, BellRing, CheckCircle2, ArrowRight, CalendarDays } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

interface DormitorySectionProps {
  onOpenEnquiry: (roomType?: string) => void;
}

export default function DormitorySection({ onOpenEnquiry }: DormitorySectionProps) {
  const { dormitory } = PG_DATA;

  return (
    <section id="dormitory" className="py-16 sm:py-20 bg-gradient-to-b from-white via-emerald-50/30 to-white text-slate-900 scroll-mt-20 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>DAILY BASIS STAYS • LAUNCHING SOON</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-950 tracking-tight">
            Executive Dormitory (Daily Basis)
          </h2>

          <p className="text-base text-slate-600">
            Smart capsule &amp; pod-style accommodation coming soon to Palayam, Trivandrum. Designed specifically for daily basis stays—ideal for exam candidates, interviewees, and transit visitors.
          </p>
        </div>

        {/* Dormitory Showcase Card - Balanced Rich Canvas */}
        <div className="mt-12 bg-gradient-to-br from-teal-950 via-[#0a382e] to-emerald-950 text-white rounded-3xl border border-emerald-700/60 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          {/* Image Side */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full overflow-hidden bg-emerald-950">
            <Image
              src={dormitory.image}
              alt="Daily basis dormitory stays at Amanuro Stays Trivandrum"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061a14] via-[#061a14]/40 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 rounded-full text-xs font-black bg-amber-400 text-stone-950 uppercase tracking-wider shadow-md">
                🚀 Launching Soon
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-amber-400" /> Stay Model
              </span>
              <span className="text-xl font-bold text-white">Daily Basis Stay (Not Monthly)</span>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Per-Day Flexible Booking
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-500/30">
                  Pre-Registrations Open
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Ultra-Affordable Daily Pod Living for Short-Term Visitors
              </h3>

              <p className="text-sm text-stone-300 leading-relaxed">
                {dormitory.description}
              </p>

              {/* Highlights grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {dormitory.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pre-register CTA */}
            <div className="pt-6 border-t border-emerald-800/60 space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onOpenEnquiry("Dormitory (Daily Basis - Launching Soon)")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-extrabold text-stone-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <BellRing className="w-4 h-4" />
                  <span>Notify Me on Launch</span>
                </button>

                <button
                  onClick={() => onOpenEnquiry("Dormitory (Daily Basis - Launching Soon)")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors cursor-pointer"
                >
                  <span>Inquire for Daily Stay Dates</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>

              <p className="text-[11px] text-stone-400">
                ⭐ Ideal for exam attendees (PSC/UPSC/Kerala University), conference delegates, and short-term visitors in Palayam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
