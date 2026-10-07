"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, MessageCircle, Calendar, Sparkles, Wind, Maximize2, Bath, Monitor } from "lucide-react";
import { PG_DATA, RoomPlan } from "@/config/pg-data";

interface RoomsSectionProps {
  onOpenEnquiry: (roomType?: string) => void;
}

export default function RoomsSection({ onOpenEnquiry }: RoomsSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filterOptions = ["All", "Single Private", "Double Sharing", "Triple Sharing"];

  const filteredRooms =
    selectedFilter === "All"
      ? PG_DATA.roomPlans
      : PG_DATA.roomPlans.filter((room) => room.sharingType === selectedFilter);

  return (
    <section id="rooms" className="py-20 bg-slate-50 text-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Pricing • Zero Brokerage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Curated Living Spaces for Gentlemen
          </h2>
          <p className="text-base text-slate-600">
            Every room is designed for maximum quietness, productivity, and restful sleep.
            Rent includes 3x meals, 300 Mbps Wi-Fi, power backup, and daily housekeeping.
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
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image & Badges */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <Image
                  src={room.image}
                  alt={`${room.title} at ${PG_DATA.brand.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                {/* Badge top-left */}
                {room.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
                    {room.badge}
                  </span>
                )}

                {/* Sharing label top-right */}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900/80 text-white backdrop-blur-md">
                  {room.sharingType}
                </span>

                {/* Price display inside image bottom */}
                <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between text-white">
                  <div>
                    <span className="text-2xl font-black">₹{room.pricePerMonth.toLocaleString("en-IN")}</span>
                    <span className="text-xs text-slate-200 font-medium"> / month</span>
                  </div>
                  {room.originalPrice && (
                    <span className="text-xs text-slate-300 line-through">
                      ₹{room.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>

              {/* Room Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {room.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{room.subtitle}</p>

                  {/* Spec Quick Badges */}
                  <div className="grid grid-cols-2 gap-2 mt-4 py-3 border-y border-slate-100 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>{room.specs.roomSize}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{room.specs.washroom}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Wind className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{room.specs.acAvailable ? "AC Equipped" : "Non-AC / Ventilated"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Monitor className="w-3.5 h-3.5 text-blue-600" />
                      <span>Work Desk + Chair</span>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Included with Room:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {room.features.slice(0, 5).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer CTAs for this room */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] text-slate-500 flex justify-between items-center">
                    <span>Deposit: <strong>{room.securityDeposit}</strong></span>
                    <span className="text-emerald-600 font-semibold">Zero Brokerage</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenEnquiry(room.sharingType)}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>Book Visit</span>
                    </button>

                    <a
                      href={`https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent(
                        `Hi Zenith Living, I am interested in the ${room.title} (₹${room.pricePerMonth}/mo). Is there a bed available to check out?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom inquiry note */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm max-w-2xl mx-auto">
          <p className="text-sm font-medium text-slate-800">
            Need customized accommodation for a team, company booking, or internship cohort?
          </p>
          <a
            href={`tel:${PG_DATA.brand.primaryPhoneClean}`}
            className="text-sm font-semibold text-blue-600 hover:underline mt-1 inline-block"
          >
            Call our Property Manager directly at {PG_DATA.brand.primaryPhone} →
          </a>
        </div>
      </div>
    </section>
  );
}
