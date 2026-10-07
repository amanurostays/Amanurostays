"use client";

import { Calendar, ShieldCheck, Wifi, Utensils, MessageCircle, ArrowRight, MapPin, Sparkles, Shirt, Zap, CheckCircle2 } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

interface HeroProps {
  onOpenEnquiry: (roomType?: string, branchName?: string) => void;
}

export default function Hero({ onOpenEnquiry }: HeroProps) {
  const flagship = PG_DATA.branches[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-950 via-slate-900 to-teal-950 text-white pt-10 pb-20 lg:pt-16 lg:pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-lime-400/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Core Value Proposition & Primary SEO Keywords */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-emerald-500/15 text-lime-300 border border-emerald-500/30">
              <span className="flex h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
              <span>Palayam, Trivandrum • Top Rated Mens PG &amp; Boys PG</span>
            </div>

            {/* Main H1 Headline with High-Intent SEO Keywords */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
              Comfortable Living at{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-emerald-400 to-teal-300">
                Amanora Stays
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-3xl text-emerald-200 font-bold mt-2">
                Premier Mens PG in Trivandrum
              </span>
            </h1>

            {/* Subtitle seamlessly integrating user's target keywords */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Looking for an <strong className="text-white font-semibold">affordable PG in Trivandrum</strong>? Amanora Stays is the ideal <strong className="text-white font-semibold">student PG</strong> and <strong className="text-white font-semibold">working men&apos;s PG in Trivandrum</strong> located in Palayam. Fully equipped <strong className="text-white font-semibold">boys PG</strong> with high-speed Wi-Fi, washing machine, 24/7 water &amp; electricity, and optional 3-times homestyle food starting from just <strong className="text-lime-300 font-extrabold">₹3,499/month</strong>.
            </p>

            {/* Key Bullet Highlights with Keyword Mapping */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full pt-1 text-left">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-teal-900/40 border border-emerald-800/40">
                <Wifi className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">PG with Wi-Fi Trivandrum</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-teal-900/40 border border-emerald-800/40">
                <Shirt className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">PG with Washing Machine</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-teal-900/40 border border-emerald-800/40">
                <Utensils className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">PG with Food Trivandrum</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-teal-900/40 border border-emerald-800/40">
                <Zap className="w-4 h-4 text-lime-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">24/7 Water &amp; Electricity</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-teal-900/40 border border-emerald-800/40">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">Working Men&apos;s PG</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-teal-900/40 border border-emerald-800/40">
                <Sparkles className="w-4 h-4 text-lime-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">Student PG Trivandrum</span>
              </div>
            </div>

            {/* Action Buttons: High-Conversion Lead Funnel */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3 w-full sm:w-auto">
              <button
                onClick={() => onOpenEnquiry()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-lg shadow-emerald-700/30 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule a Free Visit</span>
              </button>

              <button
                onClick={() => onOpenEnquiry(undefined, flagship.name)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-bold text-teal-950 bg-lime-400 hover:bg-lime-300 shadow-lg shadow-lime-400/20 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-teal-950" />
                <span>Contact for Price Details</span>
              </button>
            </div>

            {/* Location & Expansion Callout */}
            <div className="pt-5 border-t border-teal-900/60 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-400 w-full">
              <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Palayam Hub: Near Kerala University, Secretariat &amp; Central Library</span>
              </div>
              <div className="hidden sm:block text-slate-600">•</div>
              <span className="text-lime-400 font-semibold">
                Upcoming Branches: Technopark, Kazhakkoottam &amp; Vazhuthacaud
              </span>
            </div>
          </div>

          {/* Right Column: Room Plans Snapshot with Perfect Vertical Alignment */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl bg-teal-950/80 border border-emerald-800/60 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-emerald-800/50">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-lime-400">
                    Stay Options in Palayam
                  </span>
                  <p className="text-sm font-semibold text-white">Starting from ₹3,499</p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/20 text-lime-300 border border-emerald-500/30">
                  Admissions Open
                </span>
              </div>

              {/* Room Cards Highlights */}
              <div className="space-y-3 py-4">
                {PG_DATA.roomPlans.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => onOpenEnquiry(`${room.title} (${room.tier})`, flagship.name)}
                    className="group flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-emerald-900/60 hover:border-emerald-500/50 transition-all cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {room.title}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          room.tier === "Premium" ? "bg-teal-500/30 text-teal-300" : "bg-emerald-500/30 text-emerald-300"
                        }`}>
                          {room.tier}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {room.sharingType} Sharing • {room.specs.washroom}
                      </p>
                    </div>

                    <div className="text-right">
                      {room.hasStartingRate ? (
                        <div>
                          <div className="text-[11px] text-slate-400">From</div>
                          <div className="text-sm font-black text-lime-300">
                            ₹3,499/mo
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs font-semibold text-emerald-300">
                          Contact for Price
                        </div>
                      )}
                      <span className="text-[11px] font-medium text-emerald-400 group-hover:underline flex items-center justify-end gap-0.5 mt-0.5">
                        Inquire <ArrowRight className="w-3 h-3 inline" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dormitory daily preview pill */}
              <div
                onClick={() => onOpenEnquiry("Dormitory (Daily Basis)", flagship.name)}
                className="mt-1 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between cursor-pointer hover:bg-emerald-500/20 transition-colors"
              >
                <div>
                  <span className="text-xs font-bold text-lime-300 block">
                    🚀 Executive Dormitory (Daily Basis)
                  </span>
                  <span className="text-[11px] text-slate-300">
                    Pod stays for exam students &amp; daily visitors
                  </span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-lime-400 text-teal-950">
                  Launching Soon
                </span>
              </div>

              {/* Instant Enquiry Trigger */}
              <div className="pt-4">
                <button
                  onClick={() => onOpenEnquiry(undefined, flagship.name)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Enquire Availability &amp; Price Details</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
