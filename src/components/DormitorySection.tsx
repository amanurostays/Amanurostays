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
    <section id="dormitory" className="py-20 bg-gradient-to-b from-teal-950 via-slate-900 to-teal-950 text-white scroll-mt-20 relative overflow-hidden">
      {/* Decorative background glow in sync with Amanora brand */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-lime-400/20 text-lime-300 border border-lime-400/30">
            <Sparkles className="w-4 h-4 text-lime-300" />
            <span>DAILY BASIS STAYS • LAUNCHING SOON</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Executive Dormitory (Daily Basis)
          </h2>

          <p className="text-base text-slate-300">
            Smart capsule &amp; pod-style accommodation coming soon to Palayam, Trivandrum. Designed specifically for daily basis stays—ideal for exam candidates, interviewees, and transit visitors.
          </p>
        </div>

        {/* Dormitory Showcase Card */}
        <div className="mt-12 bg-teal-950/70 rounded-3xl border border-emerald-800/60 overflow-hidden shadow-2xl backdrop-blur-md grid grid-cols-1 lg:grid-cols-12">
          {/* Image Side */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full overflow-hidden">
            <Image
              src={dormitory.image}
              alt="Daily basis dormitory stays at Amanora Stays Trivandrum"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/40 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 rounded-full text-xs font-black bg-lime-400 text-teal-950 uppercase tracking-wider shadow-lg">
                🚀 Launching Soon
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs text-emerald-200 block font-semibold flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-lime-400" /> Stay Model
              </span>
              <span className="text-xl font-bold text-white">Daily Basis Stay (Not Monthly)</span>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-emerald-500/20 text-lime-300 border border-emerald-500/30">
                  Per-Day Flexible Booking
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-teal-500/20 text-teal-200 border border-teal-500/30">
                  Pre-Registrations Open
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Ultra-Affordable Daily Pod Living for Short-Term Visitors
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {dormitory.description}
              </p>

              {/* Highlights grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {dormitory.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-teal-950 bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 shadow-lg shadow-lime-400/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <BellRing className="w-4 h-4 text-teal-950" />
                  <span>Notify Me on Launch</span>
                </button>

                <button
                  onClick={() => onOpenEnquiry("Dormitory (Daily Basis - Launching Soon)")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-white bg-teal-900/80 hover:bg-teal-900 border border-emerald-700/60 transition-colors cursor-pointer"
                >
                  <span>Inquire for Daily Stay Dates</span>
                  <ArrowRight className="w-4 h-4 text-lime-300" />
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                ⭐ Ideal for exam attendees (PSC/UPSC/Kerala University), conference delegates, and short-term visitors in Palayam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
