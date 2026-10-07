import { Check, X, Shield, Award, Sparkles } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

export default function TrustComparison() {
  return (
    <section id="why-us" className="py-20 bg-white text-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <Award className="w-3.5 h-3.5" />
            <span>The Zenith Living Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tired of Unprofessional PG Landlords?
          </h2>
          <p className="text-base text-slate-600">
            We built Zenith Living to eliminate every single frustration men face when renting accommodation in Bangalore.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-12 overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-sm">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="py-4 px-6 font-bold text-slate-700 w-1/3">
                      Key Feature
                    </th>
                    <th scope="col" className="py-4 px-6 font-extrabold text-blue-700 bg-blue-50/80 w-1/3 border-x border-blue-100">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>{PG_DATA.brand.name} (Our Promise)</span>
                      </div>
                    </th>
                    <th scope="col" className="py-4 px-6 font-bold text-slate-500 w-1/3">
                      Typical Local Gents PG
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {PG_DATA.comparisonTable.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"}>
                      <td className="py-4 px-6 font-semibold text-slate-900">
                        {row.feature}
                      </td>
                      <td className="py-4 px-6 font-semibold text-emerald-700 bg-blue-50/30 border-x border-blue-100">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          </div>
                          <span>{row.zenith}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-500">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                            <X className="w-3.5 h-3.5 text-rose-500" />
                          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              1
            </div>
            <h4 className="text-base font-bold text-slate-900">100% Refundable Deposit</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              When you give a standard 30-day notice, your security deposit is returned directly to your UPI/bank on the day of vacating. Zero bogus deduction drama.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
              2
            </div>
            <h4 className="text-base font-bold text-slate-900">Same-Day Maintenance SLA</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tap leaking? Wi-Fi router glitch? Dedicated in-house maintenance technicians resolve 95% of tickets within 6 hours.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              3
            </div>
            <h4 className="text-base font-bold text-slate-900">Zero Curfew Restriction</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Biometric entry gives working professionals complete freedom for late-night shifts and weekend travel while keeping unauthorized visitors strictly out.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
