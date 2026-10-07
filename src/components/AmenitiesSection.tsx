import {
  Wifi,
  Shirt,
  Zap,
  Utensils,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

const iconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="w-6 h-6 text-emerald-600" />,
  Shirt: <Shirt className="w-6 h-6 text-teal-600" />,
  Zap: <Zap className="w-6 h-6 text-lime-500" />,
  Utensils: <Utensils className="w-6 h-6 text-emerald-700" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-teal-700" />,
  Sparkles: <Sparkles className="w-6 h-6 text-lime-600" />,
};

export default function AmenitiesSection() {
  const amenityList = [
    {
      title: "High-Speed Wi-Fi",
      seoLabel: "PG with Wi-Fi Trivandrum",
      desc: "Fast, reliable mesh internet on all floors. Ideal for college online classes, remote IT work, Zoom meetings, and streaming.",
      icon: "Wifi",
      badge: "High-Speed Wi-Fi Included",
    },
    {
      title: "Washing Machine Facility",
      seoLabel: "PG with Washing Machine Trivandrum",
      desc: "Dedicated automatic washing machines for residents to do their personal laundry easily with well-ventilated drying space.",
      icon: "Shirt",
      badge: "Self-Service Laundry",
    },
    {
      title: "24/7 Water & Electricity",
      seoLabel: "Continuous Utilities",
      desc: "Continuous running water and reliable electricity so you never face interruptions during study hours or work shifts.",
      icon: "Zap",
      badge: "24/7 Power & Water",
    },
    {
      title: "3 Times Food Arrangement",
      seoLabel: "PG with Food Trivandrum",
      desc: "Fresh, hygienic homestyle breakfast, lunch, and dinner arrangements available for residents who want daily meals.",
      icon: "Utensils",
      badge: "Optional For Those Who Want It",
    },
    {
      title: "Round-the-Clock Security",
      seoLabel: "Safe Mens PG Trivandrum",
      desc: "Premises protected with continuous CCTV camera surveillance and secure entry management to ensure total peace of mind.",
      icon: "ShieldCheck",
      badge: "CCTV Surveillance",
    },
    {
      title: "Regular Housekeeping",
      seoLabel: "Clean & Sanitized Living",
      desc: "Scheduled professional cleaning of rooms, corridors, common areas, and washrooms for peak hygiene and cleanliness.",
      icon: "Sparkles",
      badge: "Daily / Scheduled Cleaning",
    },
  ];

  return (
    <section id="amenities" className="py-20 bg-white text-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Proper Centering */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Hassle-Free Daily Living
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-950 tracking-tight">
            Essential Facilities at our Mens PG in Trivandrum
          </h2>
          <p className="text-base text-slate-600">
            Everything you need for a peaceful, productive stay in Palayam. Perfect amenities tailored for a <strong>working men&apos;s PG</strong> and <strong>student PG in Trivandrum</strong>.
          </p>
        </div>

        {/* 6 Amenities Grid with Perfect 3x2 Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12 items-stretch">
          {amenityList.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-emerald-100 flex items-center justify-center mb-4">
                  {iconMap[item.icon]}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700">
                    {item.seoLabel}
                  </span>
                  <h3 className="text-lg font-bold text-teal-950">{item.title}</h3>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{item.badge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Food Arrangement Banner with Clean Alignment */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-teal-950 border border-emerald-800/60 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1 text-xs font-bold text-lime-400">
                <Utensils className="w-3.5 h-3.5" />
                <span>PG with Food Trivandrum • Flexible Choice</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold">Need 3-times daily meals or room-only stay?</h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                We offer optional 3-times homestyle food arrangements for residents who want it, giving both college students and working professionals complete freedom.
              </p>
            </div>
            <a
              href="#rooms"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Check Rooms &amp; Rates
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
