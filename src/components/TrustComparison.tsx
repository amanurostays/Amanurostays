import { Check, X, Award, Sparkles } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

export default function TrustComparison() {
  const comparisonRows = [
    {
      feature: "Environment & Atmosphere",
      amanuro: "Alcohol-free, Drug-free & Disturbance-free safe environment (not the typical old lodge setup)",
      localPg: "Unchecked crowds, disturbances, old neglected lodge atmosphere",
      highlight: true,
    },
    {
      feature: "Starting Price",
      amanuro: "Starting from ₹3,499 (Budget & Premium sharing options)",
      localPg: "High unpredictable rates with hidden charges",
    },
    {
      feature: "Food Policy",
      amanuro: "Flexible: 3x food arrangement for those who want it (or stay-only)",
      localPg: "Compulsory bad food charges bundled in rent",
    },
    {
      feature: "High Speed 5G Wi-Fi",
      amanuro: "Fast, reliable high speed 5G Wi-Fi on all floors for study & IT work",
      localPg: "Weak single shared router with constant buffering",
    },
    {
      feature: "Washing Machine & Utilities",
      amanuro: "Washing machine, 24/7 water & power included",
      localPg: "Extra charges for laundry, frequent water cuts",
    },
    {
      feature: "Scheduled Cleaning & Hygiene",
      amanuro: "Scheduled cleaning of common areas, washrooms & corridors",
      localPg: "Neglected washrooms & irregular cleaning",
    },
    {
      feature: "Safety & Surveillance",
      amanuro: "Continuous CCTV security & disciplined living environment",
      localPg: "No entry checks or safety monitoring",
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-gradient-to-b from-white via-emerald-50/30 to-white text-slate-900 scroll-mt-20 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-teal-900 border border-emerald-200">
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            <span>The Amanuro Stays Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-950 tracking-tight">
            Why Choose Amanuro Stays?
          </h2>
          <p className="text-base text-slate-600">
            We provide clean, well-managed, and disciplined living for students and working gentlemen across Trivandrum.
          </p>
        </div>

        {/* Highlighted Banner: Alcohol-free & Drug-free safe environment */}
        <div className="mt-8 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-[#0a382e] to-teal-950 text-white border-2 border-amber-400/50 shadow-xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-400 text-stone-950">
                Core Standard
              </span>
              <span className="text-sm font-extrabold text-amber-300">
                Safe, Disciplined &amp; Quiet Living
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-200 font-medium">
              <strong className="text-white font-bold">Alcohol-free, Drug-free, Disturbance-free safe and secure environment</strong> — not the typical old lodge setup. Designed for exam preparation, career focus, and peaceful living.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-8 overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-emerald-200 rounded-2xl shadow-sm">
              <table className="min-w-full divide-y divide-emerald-100 text-left text-sm">
                <thead>
                  <tr>
                    <th scope="col" className="py-4 px-6 font-bold text-slate-700 bg-slate-100/80 w-1/3">
                      Key Facility
                    </th>
                    <th scope="col" className="py-4 px-6 font-extrabold text-white bg-teal-950 w-1/3 border-x-2 border-emerald-600">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-lime-400" />
                        <span>{PG_DATA.brand.displayName}</span>
                      </div>
                    </th>
                    <th scope="col" className="py-4 px-6 font-semibold text-slate-500 bg-slate-100/80 w-1/3">
                      Typical Trivandrum Hostel / Local PG
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100 bg-white">
                  {comparisonRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={row.highlight ? "bg-amber-50/50 border-y-2 border-amber-300" : idx % 2 === 0 ? "bg-white" : "bg-emerald-50/20"}
                    >
                      <td className="py-3.5 px-6 font-semibold text-slate-900">
                        {row.feature}
                        {row.highlight && (
                          <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-amber-400 text-stone-950 font-black uppercase">
                            Must Read
                          </span>
                        )}
                      </td>
                      <td className={`py-3.5 px-6 font-bold text-teal-950 ${row.highlight ? "bg-amber-100/70 text-emerald-950" : "bg-emerald-50/70"} border-x-2 border-emerald-600/40`}>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 font-black" />
                          <span>{row.amanuro}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-6 text-slate-500">
                        <div className="flex items-center gap-2">
                          <X className="w-4 h-4 text-rose-500 shrink-0" />
                          <span>{row.localPg}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 3 Pillar Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="p-6 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all space-y-2 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-teal-950 font-black text-xs">
              01
            </div>
            <h4 className="text-base font-bold text-teal-950 group-hover:text-emerald-700 transition-colors">Affordable &amp; Flexible Rates</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Budget and Premium sharing rooms starting from just ₹3,499. Pay only for what you use, with stay-only or food-included options.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all space-y-2 group">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-teal-950 font-black text-xs">
              02
            </div>
            <h4 className="text-base font-bold text-teal-950 group-hover:text-emerald-700 transition-colors">Alcohol &amp; Drug-Free Security</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Strictly alcohol-free, drug-free &amp; disturbance-free safe environment. Peaceful study atmosphere, not the typical old lodge setup.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all space-y-2 group">
            <div className="w-9 h-9 rounded-xl bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-950 font-black text-xs">
              03
            </div>
            <h4 className="text-base font-bold text-teal-950 group-hover:text-emerald-700 transition-colors">Sufficient Branches in Trivandrum</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sufficient hubs across Trivandrum (Palayam, Pattom, Edappazhanji &amp; expansion corridors) with quick access to all parts of the city.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
