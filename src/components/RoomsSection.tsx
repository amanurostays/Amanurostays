"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Calendar, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { PG_DATA, RoomPlan } from "@/config/pg-data";

interface RoomsSectionProps {
  onOpenEnquiry: (roomType?: string) => void;
}

export default function RoomsSection({ onOpenEnquiry }: RoomsSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filterOptions = ["All", "Premium", "Budget", "Single", "Double", "Triple", "Four"];

  const filteredRooms = PG_DATA.roomPlans.filter((room) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Premium") return room.tier === "Premium";
    if (selectedFilter === "Budget") return room.tier === "Budget";
    return room.sharingType === selectedFilter;
  });

  return (
    <section id="rooms" className="py-16 sm:py-20 bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/30 text-slate-900 scroll-mt-20 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Proper Centering & High-Intent SEO Keywords */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-teal-900 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Student PG &amp; Working Men&apos;s PG Trivandrum • Starting from ₹3,499</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-950 tracking-tight">
            Single, Double, Triple &amp; Four Sharing Rooms
          </h2>
          <p className="text-base text-slate-600">
            Looking for an <strong className="text-teal-900 font-semibold">affordable PG in Trivandrum</strong>? Amanuro Stays offers well-ventilated, fully furnished rooms for college students and working bachelors in Palayam. Stays start from ₹3,499. Contact us for complete room packages.
          </p>
        </div>

        {/* Filter Pills Centered */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-8 pb-10">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedFilter(option)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === option
                  ? "bg-teal-900 text-white shadow-md shadow-teal-900/20"
                  : "bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-emerald-200"
              }`}
            >
              {option === "Premium" ? "⭐ Premium Stays" : option === "Budget" ? "💰 Budget Stays" : option}
            </button>
          ))}
        </div>

        {/* Rooms Grid: Perfectly Aligned 4-Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="flex flex-col justify-between h-full bg-white rounded-2xl overflow-hidden border border-emerald-100 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group"
            >
              {/* Image & Badges */}
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={room.image}
                    alt={`${room.title} - Mens PG Trivandrum`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/85 via-teal-950/20 to-transparent" />

                  {/* Tier Badge top-left */}
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold shadow-md text-white ${
                    room.tier === "Premium"
                      ? "bg-teal-700 border border-teal-500/50"
                      : "bg-emerald-600 border border-emerald-400/50"
                  }`}>
                    {room.tier} Tier
                  </span>

                  {/* Sharing label top-right */}
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-white backdrop-blur-md shadow-sm">
                    {room.sharingType} Sharing
                  </span>

                  {/* Price Display */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    {room.hasStartingRate ? (
                      <div>
                        <div className="text-[10px] text-emerald-200 font-medium">Monthly Tariff</div>
                        <div className="text-xl font-black text-lime-300">
                          Starting from ₹3,499
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-[10px] text-emerald-200 font-medium">Pricing Details</div>
                        <div className="text-sm font-bold text-white">
                          Contact us for price details
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Room Details */}
                <div className="p-4 space-y-3">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {room.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{room.subtitle}</p>

                  {/* Quick specs */}
                  <div className="py-2.5 px-3 rounded-lg bg-emerald-50/60 border border-emerald-100 text-xs text-slate-700 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Washroom:</span>
                      <span className="font-semibold text-teal-950">{room.specs.washroom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ventilation:</span>
                      <span className="font-semibold text-teal-950">{room.specs.ventilation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Storage:</span>
                      <span className="font-semibold text-teal-950">{room.specs.storage}</span>
                    </div>
                  </div>

                  {/* Key Included Features */}
                  <div className="pt-1 space-y-1.5">
                    <p className="text-[10px] font-bold text-teal-950 uppercase tracking-wider">
                      Included with Stay:
                    </p>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {room.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-[11px]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer CTAs for this room */}
              <div className="p-4 pt-0 space-y-2 mt-auto">
                <div className="text-[11px] text-center font-medium text-teal-900 bg-emerald-50/80 py-1 px-2 rounded border border-emerald-100">
                  Contact us for exact price details
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onOpenEnquiry(`${room.title} (${room.tier})`)}
                    className="w-full flex items-center justify-center gap-1 py-2 px-2 rounded-lg text-xs font-bold text-white bg-teal-900 hover:bg-teal-800 transition-colors cursor-pointer shadow-xs"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Visit</span>
                  </button>

                  <button
                    onClick={() => onOpenEnquiry(`${room.title} (${room.tier})`)}
                    className="w-full flex items-center justify-center gap-1 py-2 px-2 rounded-lg text-xs font-bold text-teal-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-200 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Inquire Rate</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dormitory Promo Banner inside Rooms Section */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-100/70 via-teal-50 to-white border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Looking for Short-Term / Daily Stay Pods in Trivandrum?</span>
            </div>
            <h4 className="text-lg font-bold text-teal-950">
              Executive Dormitory (Daily Basis) — Launching Soon in Palayam!
            </h4>
            <p className="text-xs text-slate-600">
              Specialized per-day pod accommodation for exam candidates, interviewees, and transit visitors.
            </p>
          </div>

          <a
            href="#dormitory"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-900 hover:bg-teal-800 text-white font-bold text-xs tracking-wide shadow-md transition-all whitespace-nowrap cursor-pointer shrink-0"
          >
            <span>View Daily Dormitory</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
