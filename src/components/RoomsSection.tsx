"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Calendar, Sparkles, MessageCircle, Phone, ArrowRight, ShieldCheck, Bed } from "lucide-react";
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
    <section id="rooms" className="py-20 bg-slate-50 text-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Budget &amp; Premium Stays • Starting from ₹3,499</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Single, Double, Triple &amp; Four Sharing Rooms
          </h2>
          <p className="text-base text-slate-600">
            Tailored for students and working professionals in Palayam, Trivandrum. Whether you need complete single room privacy or an economical shared stay, we have you covered.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-8 pb-10">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedFilter(option)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                selectedFilter === option
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {option === "Premium" ? "⭐ Premium Stays" : option === "Budget" ? "💰 Budget Stays" : option}
            </button>
          ))}
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image & Badges */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image
                  src={room.image}
                  alt={`${room.title} at ${PG_DATA.brand.displayName} Palayam Trivandrum`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Tier Badge top-left */}
                <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-md ${
                  room.tier === "Premium" ? "bg-indigo-600" : "bg-emerald-600"
                }`}>
                  {room.tier} Tier
                </span>

                {/* Sharing label top-right */}
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-950/80 text-white backdrop-blur-md">
                  {room.sharingType} Sharing
                </span>

                {/* Price Display */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs text-slate-300 font-medium">Starting from</div>
                  <div className="text-xl font-black">
                    ₹{room.startingPrice.toLocaleString("en-IN")}{" "}
                    <span className="text-[11px] font-normal text-slate-300">/ month</span>
                  </div>
                </div>
              </div>

              {/* Room Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {room.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{room.subtitle}</p>

                  {/* Quick specs */}
                  <div className="mt-3 py-2.5 px-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Washroom:</span>
                      <span className="font-semibold">{room.specs.washroom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ventilation:</span>
                      <span className="font-semibold">{room.specs.ventilation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Storage:</span>
                      <span className="font-semibold">{room.specs.storage}</span>
                    </div>
                  </div>

                  {/* Key Included Features */}
                  <div className="mt-4 space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                      Included with Stay:
                    </p>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {room.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-[11px]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer CTAs for this room */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] text-center font-medium text-blue-700 bg-blue-50 py-1.5 px-2 rounded-md">
                    Contact us for exact price details &amp; packages
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenEnquiry(`${room.title} (${room.tier})`)}
                      className="w-full flex items-center justify-center gap-1 py-2.5 px-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Visit</span>
                    </button>

                    <button
                      onClick={() => onOpenEnquiry(`${room.title} (${room.tier})`)}
                      className="w-full flex items-center justify-center gap-1 py-2.5 px-2 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
                      <span>Inquire Rate</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dormitory Promo Banner inside Rooms Section */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-300/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Looking for Capsule / Pod / Dormitory Living?</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Executive Dormitory Stays — Launching Soon in Trivandrum!
            </h4>
            <p className="text-xs text-slate-600">
              Ultra-economical individual pods for exam students, interns, and short-term visits.
            </p>
          </div>

          <a
            href="#dormitory"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            <span>View Dormitory Details</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
