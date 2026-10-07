"use client";

import { useState } from "react";
import { MapPin, Phone, MessageCircle, Navigation, Building2, Check, Clock } from "lucide-react";
import { PG_DATA, Branch } from "@/config/pg-data";

interface BranchesSectionProps {
  onOpenEnquiry: (roomType?: string, branchName?: string) => void;
}

export default function BranchesSection({ onOpenEnquiry }: BranchesSectionProps) {
  const [selectedBranchId, setSelectedBranchId] = useState<string>(
    PG_DATA.branches[0].id
  );

  const activeBranch =
    PG_DATA.branches.find((b) => b.id === selectedBranchId) || PG_DATA.branches[0];

  return (
    <section id="branches" className="py-20 bg-slate-100/70 text-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            <Building2 className="w-3.5 h-3.5" />
            <span>Expanding Across Prime Tech Corridors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Prime Locations
          </h2>
          <p className="text-base text-slate-600">
            Conveniently located within 5 to 10 minutes of major tech parks, metro stations, food streets, and gyms.
          </p>
        </div>

        {/* Branch Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-8 pb-10">
          {PG_DATA.branches.map((branch) => {
            const isSelected = branch.id === selectedBranchId;
            return (
              <button
                key={branch.id}
                onClick={() => setSelectedBranchId(branch.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                <MapPin className={`w-4 h-4 ${isSelected ? "text-emerald-400" : "text-blue-600"}`} />
                <span>{branch.locality}</span>
                {branch.isFlagship && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-medium">
                    Flagship
                  </span>
                )}
                {branch.status === "Opening Soon" && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium">
                    Upcoming
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Branch Detail Box */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Info Side */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                  activeBranch.status === "Active"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}>
                  {activeBranch.status === "Active" ? "● Currently Accepting Bookings" : "⏳ Pre-Registrations Open"}
                </span>
                <span className="text-xs text-slate-600 font-medium">
                  Capacity: {activeBranch.totalBeds} Beds
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {activeBranch.name}
              </h3>

              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                  <p>
                    <strong className="text-slate-800">Address:</strong> {activeBranch.address}
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <Navigation className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <p>
                    <strong className="text-slate-800">Landmark:</strong> {activeBranch.landmark}
                  </p>
                </div>
              </div>

              {/* Transit & Accessibility Highlights */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Transit & Neighborhood Connectivity
                </h4>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Walking distance to quick bus stops and auto stands</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Surrounded by popular cafes, cult.fit/gyms, supermarkets, & laundry</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Safe, well-lit residential street with CCTV perimeter</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenEnquiry(undefined, activeBranch.name)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <span>Book Visit for this Branch</span>
                </button>

                <a
                  href={`https://wa.me/${activeBranch.whatsapp}?text=${encodeURIComponent(
                    `Hello, I would like to inquire about bed availability at ${activeBranch.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <a
                  href={`tel:${activeBranch.phone}`}
                  className="flex items-center gap-1.5 font-medium text-slate-700 hover:text-blue-600"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>{activeBranch.phone}</span>
                </a>

                <a
                  href={activeBranch.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold text-blue-600 hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps →</span>
                </a>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="lg:col-span-6 bg-slate-200 relative min-h-[350px] lg:min-h-full">
            <iframe
              title={`Map of ${activeBranch.name}`}
              src={activeBranch.mapEmbedUrl}
              className="w-full h-full border-0 absolute inset-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
