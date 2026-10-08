"use client";

import { useState } from "react";
import { MapPin, Navigation, Building2, Check, Sparkles, Calendar, Phone, MessageCircle } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

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
    <section id="branches" className="py-16 sm:py-20 bg-white text-slate-900 scroll-mt-20 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-teal-900 border border-emerald-200">
            <Building2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Locations Across Trivandrum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-950 tracking-tight">
            Our Hubs Across Trivandrum
          </h2>
          <p className="text-base text-slate-600">
            We have sufficient branches and prime hubs across Trivandrum with quick access to all parts of the city and all-time availability.
          </p>

          {/* Prime Connectivity Hubs Cloud */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5 text-xs">
            <span className="font-bold text-teal-950 mr-1">Major Hubs:</span>
            {PG_DATA.hubs.map((hub, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 text-teal-900 border border-emerald-200/80 font-semibold"
              >
                {hub}
              </span>
            ))}
          </div>
        </div>

        {/* Branch Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-8 pb-10">
          {PG_DATA.branches.map((branch) => {
            const isSelected = branch.id === selectedBranchId;
            return (
              <button
                key={branch.id}
                onClick={() => setSelectedBranchId(branch.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-teal-900 text-white shadow-md shadow-teal-900/20"
                    : "bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-emerald-200"
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-emerald-300" : "text-emerald-600"}`} />
                <span>{branch.locality}</span>
                {branch.status === "Active" ? (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 font-bold border border-emerald-300/60">
                    Open
                  </span>
                ) : (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-bold border border-amber-300/60">
                    Coming Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Branch Detail Box */}
        <div className="bg-white rounded-2xl border border-emerald-100 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Info Side */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                  activeBranch.status === "Active"
                    ? "bg-emerald-100 text-teal-900 border border-emerald-200"
                    : "bg-amber-100 text-amber-900 border border-amber-200"
                }`}>
                  {activeBranch.status === "Active" ? "● Currently Open & Accepting Bookings" : "⏳ Coming Soon"}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {activeBranch.city}, Kerala
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-teal-950">
                {activeBranch.name}
              </h3>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-slate-900">Location:</strong> {activeBranch.address}
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <Navigation className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-slate-900">Landmarks:</strong> {activeBranch.landmark}
                  </p>
                </div>
              </div>

              {/* Designated Covered Locations for this Hub - The single designated place for detailed sub-locations */}
              {activeBranch.coveredLocations && activeBranch.coveredLocations.length > 0 && (
                <div className="p-3.5 rounded-xl bg-teal-50/70 border border-emerald-200 space-y-1.5">
                  <span className="text-[11px] font-bold text-teal-950 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    Key Locations Covered Under {activeBranch.locality}:
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {activeBranch.coveredLocations.map((loc, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-teal-950 border border-emerald-200/90 shadow-2xs"
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Transit & Accessibility Highlights */}
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                <h4 className="text-[11px] font-bold text-teal-950 uppercase tracking-wide">
                  Location Highlights
                </h4>
                <ul className="text-xs text-slate-700 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Quick access to all parts of the city and all-time availability</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Prime hubs near Sanskrit College, RBI, Secretariat, University &amp; Transit Corridors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Strictly alcohol-free, drug-free &amp; disturbance-free safe environment</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => onOpenEnquiry(undefined, activeBranch.name)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {activeBranch.status === "Active"
                      ? "Book Visit for this Branch"
                      : "Pre-Register for this Location"}
                  </span>
                </button>

                <div className="flex gap-2">
                  <a
                    href={`tel:${PG_DATA.brand.primaryPhoneClean}`}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-teal-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                    title="Call 6282830532"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent(`Hi Amanuro Stays, I would like to inquire about availability at ${activeBranch.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-2xs"
                    title="WhatsApp 6282830532"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <a
                  href="https://maps.google.com/?q=Palayam+Thiruvananthapuram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>View Palayam Central Hub on Google Maps →</span>
                </a>
                <span className="text-slate-500 font-medium">
                  Direct Line: <strong className="text-teal-950">6282830532</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Map Side - Centered on Palayam */}
          <div className="lg:col-span-6 bg-slate-100 relative min-h-[320px] lg:min-h-full">
            <iframe
              title="Map of Amanuro Stays Palayam Hub"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.567300713506!2d76.945532!3d8.502941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbb6a27e025d%3A0xbcfc11267b14d246!2sPalayam%2C%20Thiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000"
              className="w-full h-full border-0 absolute inset-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Network Expansion Note */}
        <div className="mt-8 text-center p-5 rounded-2xl bg-gradient-to-r from-emerald-100/60 via-teal-50 to-white border border-emerald-200 max-w-2xl mx-auto space-y-1 shadow-xs">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-teal-900">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Sufficient Branches Across Trivandrum</span>
          </div>
          <p className="text-xs font-bold text-teal-950">
            We have sufficient branches and network hubs across Trivandrum with quick access to all parts of the city and all-time availability.
          </p>
          <p className="text-[11px] text-slate-600">
            Planning continuous expansion all over Trivandrum including Technopark / Kazhakkoottam corridor.
          </p>
        </div>
      </div>
    </section>
  );
}
