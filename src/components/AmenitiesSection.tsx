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
  Wifi: <Wifi className="w-6 h-6 text-blue-600" />,
  Shirt: <Shirt className="w-6 h-6 text-cyan-600" />,
  Zap: <Zap className="w-6 h-6 text-amber-500" />,
  Utensils: <Utensils className="w-6 h-6 text-emerald-600" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
  Sparkles: <Sparkles className="w-6 h-6 text-violet-600" />,
};

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-20 bg-white text-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Hassle-Free Daily Living
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-950 tracking-tight">
            Essential Facilities &amp; Amenities
          </h2>
          <p className="text-base text-slate-600">
            Everything you need for a comfortable stay in Palayam, Trivandrum—without the hidden landlord costs or maintenance stress.
          </p>
        </div>

        {/* Exact 6 Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {PG_DATA.amenities.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                  {iconMap[item.iconName] || <CheckCircle2 className="w-6 h-6 text-blue-600" />}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.highlight && (
                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{item.highlight}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Food Arrangement Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-teal-950 border border-emerald-800/60 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1 text-xs font-bold text-lime-400">
                <Utensils className="w-3.5 h-3.5" />
                <span>Flexible Food Arrangements</span>
              </div>
              <h4 className="text-lg font-bold">Need 3-times daily meals or only stay?</h4>
              <p className="text-xs text-slate-300">
                We offer optional 3-times homestyle meal arrangements for residents who want it, giving you total freedom to choose according to your lifestyle.
              </p>
            </div>
            <a
              href="#rooms"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 font-bold text-xs tracking-wide shadow-md transition-all whitespace-nowrap"
            >
              Check Rooms &amp; Rates
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
