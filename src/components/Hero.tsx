"use client";

import { Calendar, ShieldCheck, Wifi, Utensils, MessageCircle, ArrowRight, MapPin, Sparkles, Shirt, Zap } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

interface HeroProps {
  onOpenEnquiry: (roomType?: string, branchName?: string) => void;
}

export default function Hero({ onOpenEnquiry }: HeroProps) {
  const flagship = PG_DATA.branches[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-950 via-slate-900 to-teal-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background ambient lighting in sync with Amanora brand */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-lime-400/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-emerald-500/15 text-lime-300 border border-emerald-500/30">
              <span className="flex h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
              <span>Palayam, Trivandrum • Men&apos;s PG &amp; Coliving</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
              Comfortable Living at{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-emerald-400 to-teal-300">
                {PG_DATA.brand.displayName}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Quality accommodation for students and gentlemen in the heart of Trivandrum. Single, Double, Triple &amp; Four sharing stays starting from just <strong className="text-lime-300 font-extrabold">₹3,499/month</strong>. Contact us for complete room packages and pricing details.
            </p>

            {/* Key Bullet Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-teal-900/40 border border-emerald-800/40">
                <Wifi className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">High-Speed Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-teal-900/40 border border-emerald-800/40">
                <Shirt className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Washing Machine</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-teal-900/40 border border-emerald-800/40">
                <Zap className="w-4 h-4 text-lime-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Water &amp; Electricity</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-teal-900/40 border border-emerald-800/40">
                <Utensils className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">3x Food Arrangement</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-teal-900/40 border border-emerald-800/40">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Security &amp; CCTV</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-teal-900/40 border border-emerald-800/40">
                <Sparkles className="w-4 h-4 text-lime-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Regular Housekeeping</span>
              </div>
            </div>

            {/* Action Buttons: Lead Funnel */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
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
                <span>Contact Us for Price Details</span>
              </button>
            </div>

            {/* Location & Expansion Callout */}
            <div className="pt-6 border-t border-teal-900/60 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Currently at Palayam • Near Kerala University &amp; Secretariat</span>
              </div>
              <div className="hidden sm:block text-slate-600">•</div>
              <span className="text-lime-400 font-semibold">
                Expanding soon to Technopark, Vazhuthacaud &amp; Karyavattom
              </span>
            </div>
          </div>

          {/* Right Column: Room Plans Snapshot */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-teal-950/80 border border-emerald-800/60 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-emerald-800/50">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-lime-400">
                    Stay Options &amp; Plans
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
                          <div className="text-xs text-slate-400">From</div>
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
                    Pod stays for exam students &amp; daily travelers
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
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
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
