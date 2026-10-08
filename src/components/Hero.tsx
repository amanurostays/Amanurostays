"use client";

import { Calendar, ShieldCheck, Wifi, Utensils, MessageCircle, ArrowRight, MapPin, Sparkles, Shirt, Zap, Phone } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

interface HeroProps {
  onOpenEnquiry: (roomType?: string, branchName?: string) => void;
}

export default function Hero({ onOpenEnquiry }: HeroProps) {
  const flagship = PG_DATA.branches[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a271f] via-[#0d3429] to-[#08201a] text-white pt-10 pb-20 lg:pt-16 lg:pb-24 border-b border-emerald-950">
      {/* Subtle warm golden-emerald ambient atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-gradient-to-tr from-emerald-500/10 via-amber-400/10 to-teal-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Core Value Proposition & Authoritative Messaging */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-900/60 text-amber-300 border border-amber-400/30 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-amber-400" />
              <span>Across Trivandrum • Premier Mens PG, Paying Guest &amp; Homestay</span>
            </div>

            {/* Main H1 Headline with Confident Typography */}
            <h1 className="text-3xl sm:text-5xl lg:text-[46px] font-black tracking-tight leading-[1.14] text-white">
              Comfortable Living at{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-emerald-200">
                {PG_DATA.brand.displayName}
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-3xl text-emerald-100 font-bold mt-2">
                Premier Mens PG &amp; Paying Guest in Trivandrum
              </span>
            </h1>

            {/* Subtitle seamlessly integrating user's target keywords */}
            <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl leading-relaxed">
              Looking for an <strong className="text-white font-semibold">affordable PG in Trivandrum</strong> or a trusted <strong className="text-white font-semibold">Paying Guest stay</strong>? Amanuro Stays is the ideal <strong className="text-white font-semibold">student PG</strong>, <strong className="text-white font-semibold">working men&apos;s PG</strong>, and comfortable <strong className="text-white font-semibold">boys lodge &amp; homestay</strong> with multiple hubs across Trivandrum. Safe, alcohol-free, drug-free &amp; disturbance-free living equipped with <strong className="text-white font-semibold">high speed 5G Wi-Fi</strong>, washing machine, 24/7 water &amp; electricity, and optional 3-times homestyle food starting from just <strong className="text-amber-300 font-black">₹3,499/month</strong>.
            </p>

            {/* Key Bullet Highlights with Refined Depth */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full pt-1 text-left">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#061e17]/80 border border-emerald-800/40">
                <Wifi className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-stone-200">High Speed 5G Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#061e17]/80 border border-emerald-800/40">
                <Shirt className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="text-xs font-semibold text-stone-200">PG with Washing Machine</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#061e17]/80 border border-emerald-800/40">
                <Utensils className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="text-xs font-semibold text-stone-200">PG with Food Trivandrum</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#061e17]/80 border border-emerald-800/40">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-semibold text-stone-200">24/7 Water &amp; Electricity</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#061e17]/80 border border-emerald-800/40">
                <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="text-xs font-semibold text-stone-200">Safe Alcohol &amp; Drug-Free</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#061e17]/80 border border-emerald-800/40">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="text-xs font-semibold text-stone-200">Student &amp; Working Men PG</span>
              </div>
            </div>

            {/* Action Buttons: Confident Luxury CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2 w-full sm:w-auto">
              <button
                onClick={() => onOpenEnquiry()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-extrabold text-stone-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule a Free Visit</span>
              </button>

              <button
                onClick={() => onOpenEnquiry(undefined, flagship.name)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all hover:scale-[1.02] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-amber-300" />
                <span>Contact for Price Details</span>
              </button>
            </div>

            {/* Direct Instant Contact strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold pt-1">
              <a
                href={`tel:${PG_DATA.brand.primaryPhoneClean}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-950/90 hover:bg-black border border-emerald-700/60 text-white transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call: <strong className="text-amber-300">6282830532</strong></span>
              </a>
              <a
                href={`https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent("Hi Amanuro Stays, I would like to inquire about room availability.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: <strong>9048575403</strong></span>
              </a>
            </div>

            {/* Location & Expansion Callout */}
            <div className="pt-4 border-t border-emerald-900/60 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-stone-400 w-full">
              <div className="flex items-center gap-1.5 text-stone-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Hubs Open: Palayam, Pattom, Vellayambalam &amp; Sasthamangalam</span>
              </div>
              <span className="hidden sm:inline text-stone-600">•</span>
              <span className="text-amber-300 font-semibold">
                Quick access to all parts of Trivandrum
              </span>
            </div>
          </div>

          {/* Right Column: Room Plans Snapshot with Balanced Luxury Card Styling */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl bg-[#0c2f25]/90 border border-emerald-700/50 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3.5 border-b border-emerald-800/60">
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-wider text-amber-400">
                    Stay Options Across Trivandrum
                  </span>
                  <p className="text-sm font-bold text-white">Starting from ₹3,499/mo</p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Admissions Open
                </span>
              </div>

              {/* Room Cards Highlights */}
              <div className="space-y-2.5 py-3.5">
                {PG_DATA.roomPlans.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => onOpenEnquiry(`${room.title} (${room.tier})`, flagship.name)}
                    className="group flex items-center justify-between p-3 rounded-xl bg-[#061e17]/90 hover:bg-[#07241c] border border-emerald-800/60 hover:border-amber-400/60 transition-all cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                          {room.title}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          room.tier === "Premium" ? "bg-amber-400/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300"
                        }`}>
                          {room.tier}
                        </span>
                      </div>
                      <p className="text-xs text-stone-300">
                        {room.sharingType} Sharing • {room.specs.washroom}
                      </p>
                    </div>

                    <div className="text-right">
                      {room.hasStartingRate ? (
                        <div>
                          <div className="text-[10px] text-stone-400">From</div>
                          <div className="text-sm font-black text-amber-300">
                            ₹3,499/mo
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs font-semibold text-emerald-300">
                          Contact for Price
                        </div>
                      )}
                      <span className="text-[11px] font-medium text-amber-300 group-hover:underline flex items-center justify-end gap-0.5 mt-0.5">
                        Inquire <ArrowRight className="w-3 h-3 inline" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dormitory monthly preview pill */}
              <div
                onClick={() => onOpenEnquiry("Executive Dormitory (Monthly Basis)", flagship.name)}
                className="mt-1 p-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/50 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <span className="text-xs font-bold text-amber-300 block">
                    🚀 Executive Dormitory (Monthly Basis)
                  </span>
                  <span className="text-[11px] text-stone-300">
                    Pod stays for exam students with study rooms &amp; calm environment
                  </span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-400 text-stone-950">
                  Launching Soon
                </span>
              </div>

              {/* Instant Enquiry Trigger */}
              <div className="pt-3.5">
                <button
                  onClick={() => onOpenEnquiry(undefined, flagship.name)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
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
