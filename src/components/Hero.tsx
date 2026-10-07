"use client";

import { MessageCircle, Phone, Calendar, ShieldCheck, Wifi, Utensils, Star, CheckCircle, ArrowRight, MapPin } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

interface HeroProps {
  onOpenEnquiry: (roomType?: string, branchName?: string) => void;
}

export default function Hero({ onOpenEnquiry }: HeroProps) {
  const flagship = PG_DATA.branches[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-600/20 via-indigo-500/10 to-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-blue-500/10 text-blue-300 border border-blue-500/25">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Bangalore&apos;s Rated #1 Premium Men&apos;s Coliving PG</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Upgrade Your Stay.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
                Live with Comfort,
              </span>{" "}
              Focus on Your Goals.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Designed exclusively for ambitious gentlemen, working professionals, and students.
              Enjoy hotel-grade comfort with <strong className="text-white font-semibold">3-times homestyle meals</strong>,{" "}
              <strong className="text-white font-semibold">300 Mbps Wi-Fi</strong>,{" "}
              <strong className="text-white font-semibold">daily housekeeping</strong>, and{" "}
              <strong className="text-white font-semibold">zero brokerage</strong>.
            </p>

            {/* Key Bullet Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-left">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <Utensils className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">3x Daily Meals</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <Wifi className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">300 Mbps Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Biometric Entry</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">1-Mo. Deposit</span>
              </div>
            </div>

            {/* Action Buttons: High-conversion funnel */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              <button
                onClick={() => onOpenEnquiry()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule a Free Visit</span>
              </button>

              <a
                href={`https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent(
                  "Hi Zenith Living! I'm interested in room availability and pricing. Can you assist me?"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-400/20 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5 fill-emerald-950 text-emerald-400" />
                <span>WhatsApp Enquiry</span>
              </a>

              <a
                href={`tel:${PG_DATA.brand.primaryPhoneClean}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Social Proof Bar */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-white text-sm">{PG_DATA.brand.overallRating}/5</span>
                <span>(380+ Verified Google Reviews)</span>
              </div>
              <div className="hidden sm:block text-slate-600">•</div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Prime Koramangala & HSR Layout Hubs</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Quick Availability Check */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-800/90 border border-slate-700 p-6 shadow-2xl backdrop-blur-xl">
              {/* Top Banner inside card */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/80">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
                    Instant Room Availability
                  </span>
                  <p className="text-sm font-semibold text-white">Find Your Perfect Bed</p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Fast Response &lt; 5 Min
                </span>
              </div>

              {/* Room Cards Highlights */}
              <div className="space-y-3 py-4">
                {PG_DATA.roomPlans.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => onOpenEnquiry(room.sharingType, flagship.name)}
                    className="group flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-700/60 hover:border-blue-500/50 transition-all cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {room.sharingType}
                        </span>
                        {room.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-medium">
                            {room.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">
                        {room.specs.roomSize} • Attached Washroom {room.specs.acAvailable && "• AC"}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-bold text-white">
                        ₹{room.pricePerMonth.toLocaleString("en-IN")}
                        <span className="text-[11px] font-normal text-slate-400">/mo</span>
                      </div>
                      <span className="text-[11px] font-medium text-emerald-400 group-hover:underline flex items-center justify-end gap-0.5">
                        Inquire <ArrowRight className="w-3 h-3 inline" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Instant WhatsApp Funnel CTA */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent(
                    "Hi Zenith Living, I'd like to check today's available rooms and schedule an in-person visit."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-sm shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Check Live Availability on WhatsApp</span>
                </a>
              </div>

              {/* Trust Subtext */}
              <p className="text-center text-[11px] text-slate-400 pt-3">
                🔒 No advance booking fee required for property tour. Visit first, decide later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
