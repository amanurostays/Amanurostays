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
  Wifi: <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700"><Wifi className="w-5 h-5" /></div>,
  Shirt: <div className="w-11 h-11 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700"><Shirt className="w-5 h-5" /></div>,
  Zap: <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600"><Zap className="w-5 h-5" /></div>,
  Utensils: <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600"><Utensils className="w-5 h-5" /></div>,
  ShieldCheck: <div className="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700"><ShieldCheck className="w-5 h-5" /></div>,
  Sparkles: <div className="w-11 h-11 rounded-xl bg-lime-100 flex items-center justify-center text-lime-700"><Sparkles className="w-5 h-5" /></div>,
};

export default function AmenitiesSection() {
  const amenityList = [
    {
      title: "High Speed 5G Wi-Fi",
      seoLabel: "High Speed 5G Wi-Fi Trivandrum",
      desc: "Fast, reliable high speed 5G Wi-Fi on all floors. Ideal for college online classes, remote IT work, exam preparation, and streaming.",
      icon: "Wifi",
      badge: "High Speed 5G Wi-Fi Included",
    },
    {
      title: "Washing Machine Facility",
      seoLabel: "PG with Washing Machine Trivandrum",
      desc: "Dedicated automatic washing machines for residents to do their personal laundry easily with well-ventilated drying space.",
      icon: "Shirt",
      badge: "Washing Machine Facility",
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
      seoLabel: "Alcohol & Drug-Free Safe PG",
      desc: "Strictly alcohol-free, drug-free & disturbance-free safe environment protected with continuous CCTV camera surveillance.",
      icon: "ShieldCheck",
      badge: "Safe & Alcohol/Drug-Free",
    },
    {
      title: "Scheduled Cleaning",
      seoLabel: "Clean & Sanitized Living",
      desc: "Scheduled professional cleaning of rooms, corridors, common areas, and washrooms for peak hygiene and cleanliness.",
      icon: "Sparkles",
      badge: "Scheduled Cleaning",
    },
  ];

  return (
    <section id="amenities" className="py-16 sm:py-20 bg-white text-slate-900 scroll-mt-20 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Proper Centering */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-teal-900 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Hassle-Free Daily Living</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-950 tracking-tight">
            Essential Facilities at our Mens PG in Trivandrum
          </h2>
          <p className="text-base text-slate-600">
            Everything you need for a peaceful, productive stay across Trivandrum. Perfect amenities tailored for a <strong className="text-teal-950 font-semibold">working men&apos;s PG</strong> and <strong className="text-teal-950 font-semibold">student PG in Trivandrum</strong>.
          </p>
        </div>

        {/* 6 Amenities Grid with Perfect 3x2 Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 items-stretch">
          {amenityList.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white hover:bg-emerald-50/30 border border-emerald-100 hover:border-emerald-300 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between h-full group"
            >
              <div>
                <div className="mb-4">
                  {iconMap[item.icon]}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700">
                    {item.seoLabel}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">{item.title}</h3>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-emerald-100 flex items-center gap-1.5 text-xs font-bold text-teal-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{item.badge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Food Arrangement Banner with Clean Rich Alignment */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-100/70 via-teal-50 to-white border border-emerald-200 text-slate-900 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1 text-xs font-bold text-teal-900">
                <Utensils className="w-3.5 h-3.5 text-emerald-700" />
                <span>PG with Food Trivandrum • Flexible Choice</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-teal-950">Need 3-times daily meals or room-only stay?</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                We offer optional 3-times homestyle food arrangements for residents who want it, giving both college students and working professionals complete freedom.
              </p>
            </div>
            <a
              href="#rooms"
              className="px-5 py-2.5 rounded-xl bg-teal-900 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Check Rooms &amp; Rates
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
