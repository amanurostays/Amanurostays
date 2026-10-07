"use client";

import { useState } from "react";
import { MapPin, Navigation, Building2, Check, Sparkles, Calendar } from "lucide-react";
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-teal-900 border border-emerald-200">
            <Building2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Trivandrum Network &amp; Rapid Expansion</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-950 tracking-tight">
            Our Locations in Trivandrum
          </h2>
          <p className="text-base text-slate-600">
            Currently operational at our prime hub in <strong>Palayam</strong>, with 4 to 5 more strategic branches launching across Trivandrum very soon!
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-teal-950 text-white shadow-lg shadow-teal-950/20 scale-105"
                    : "bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200"
                }`}
              >
                <MapPin className={`w-4 h-4 ${isSelected ? "text-lime-400" : "text-emerald-600"}`} />
                <span>{branch.locality}</span>
                {branch.isFlagship && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                    Now Open
                  </span>
                )}
                {branch.status === "Launching Soon" && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 font-medium">
                    Coming Soon
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
                  {activeBranch.status === "Active" ? "● Currently Open & Accepting Bookings" : "⏳ Expansion Phase — Launching Soon"}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {activeBranch.city}, Kerala
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {activeBranch.name}
              </h3>

              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                  <p>
                    <strong className="text-slate-800">Location:</strong> {activeBranch.address}
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <Navigation className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <p>
                    <strong className="text-slate-800">Landmarks:</strong> {activeBranch.landmark}
                  </p>
                </div>
              </div>

              {/* Transit & Accessibility Highlights */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Location Advantages
                </h4>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Quick access to Palayam &amp; Thampanoor central bus/train terminals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Walking distance to University of Kerala, libraries &amp; civil coaching centers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Direct bus routes to Technopark Phase 1, Phase 3 and Kazhakkoottam</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenEnquiry(undefined, activeBranch.name)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 transition-colors cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {activeBranch.status === "Active"
                      ? "Book Visit for Palayam Hub"
                      : "Pre-Register for this Location"}
                  </span>
                </button>
              </div>

              <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                <a
                  href={activeBranch.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold text-emerald-700 hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>View Palayam Location on Google Maps →</span>
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

        {/* 5-Year Expansion Note */}
        <div className="mt-8 text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-1">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-blue-600">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Expanding Across Trivandrum</span>
          </div>
          <p className="text-sm font-semibold text-slate-800">
            Planning 4–5 more PG branches in Trivandrum over the coming months.
          </p>
          <p className="text-xs text-slate-500">
            Looking for rooms near Kazhakkoottam, Technopark, or Karyavattom? Pre-register early to lock in early bird discounts.
          </p>
        </div>
      </div>
    </section>
  );
}
