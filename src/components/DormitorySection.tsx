"use client";

import Image from "next/image";
import { Sparkles, Bed, BellRing, CheckCircle2, ShieldCheck, Wifi, Clock, ArrowRight } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

interface DormitorySectionProps {
  onOpenEnquiry: (roomType?: string) => void;
}

export default function DormitorySection({ onOpenEnquiry }: DormitorySectionProps) {
  const { dormitory } = PG_DATA;

  return (
    <section id="dormitory" className="py-20 bg-gradient-to-b from-slate-900 to-indigo-950 text-white scroll-mt-20 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>EXCITING NEW CONCEPT • LAUNCHING SOON</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Executive Dormitory Stays
          </h2>

          <p className="text-base text-slate-300">
            Smart capsule &amp; pod-style accommodation coming soon to Palayam &amp; Technopark corridors in Trivandrum. Designed for job seekers, interns, exam aspirants, and budget travelers.
          </p>
        </div>

        {/* Dormitory Showcase Card */}
        <div className="mt-12 bg-slate-800/80 rounded-3xl border border-slate-700/80 overflow-hidden shadow-2xl backdrop-blur-md grid grid-cols-1 lg:grid-cols-12">
          {/* Image Side */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full overflow-hidden">
            <Image
              src={dormitory.image}
              alt="Dormitory stays at Amanora Stays Trivandrum"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 rounded-full text-xs font-black bg-amber-500 text-slate-950 uppercase tracking-wider shadow-lg">
                🚀 Launching Soon
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs text-slate-300 block">Anticipated Starting Price</span>
              <span className="text-2xl font-black text-white">Under ₹3,000 / month</span>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Capsule Living Concept
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Pre-Registrations Open
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Ultra-Affordable Pod Living with Zero Compromise on Privacy
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {dormitory.description}
              </p>

              {/* Highlights grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {dormitory.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pre-register CTA */}
            <div className="pt-6 border-t border-slate-700/80 space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onOpenEnquiry("Dormitory (Launching Soon)")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-lg shadow-amber-400/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <BellRing className="w-4 h-4 text-slate-950" />
                  <span>Join Early Bird Waitlist</span>
                </button>

                <button
                  onClick={() => onOpenEnquiry("Dormitory (Launching Soon)")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-white bg-slate-700/80 hover:bg-slate-700 border border-slate-600 transition-colors cursor-pointer"
                >
                  <span>Request Dormitory Updates</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                ⭐ Early bird pre-registered guests will receive priority bed allocation and exclusive launch pricing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
