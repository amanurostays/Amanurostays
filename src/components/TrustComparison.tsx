import { Check, X, Shield, Award, Sparkles } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

export default function TrustComparison() {
  const comparisonRows = [
    {
      feature: "Starting Price",
      amanora: "Starting from ₹3,499 (Budget & Premium tiers)",
      localPg: "High unpredictable rates with hidden charges",
    },
    {
      feature: "Food Policy",
      amanora: "Flexible: 3x food arrangement for those who want it",
      localPg: "Compulsory bad food charges bundled in rent",
    },
    {
      feature: "High-Speed Wi-Fi",
      amanora: "Fast Wi-Fi on all floors for study & IT work",
      localPg: "Weak single shared router with constant buffering",
    },
    {
      feature: "Washing Machine & Utilities",
      amanora: "Washing machine, 24/7 water & power included",
      localPg: "Extra charges for laundry, frequent water cuts",
    },
    {
      feature: "Housekeeping & Hygiene",
      amanora: "Regular scheduled housekeeping & sanitization",
      localPg: "Neglected washrooms & irregular cleaning",
    },
    {
      feature: "Safety & Surveillance",
      amanora: "CCTV security & disciplined living environment",
      localPg: "No entry checks or safety monitoring",
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white text-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <Award className="w-3.5 h-3.5" />
            <span>The Amanora Stays Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Amanora Stays in Palayam?
          </h2>
          <p className="text-base text-slate-600">
            We provide clean, well-managed, and transparent living for students and working gentlemen in Trivandrum.
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
                      Key Facility
                    </th>
                    <th scope="col" className="py-4 px-6 font-extrabold text-blue-700 bg-blue-50/80 w-1/3 border-x border-blue-100">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>{PG_DATA.brand.displayName} (Palayam)</span>
                      </div>
                    </th>
                    <th scope="col" className="py-4 px-6 font-bold text-slate-500 w-1/3">
                      Typical Trivandrum Hostel / Local PG
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"}>
                      <td className="py-4 px-6 font-semibold text-slate-900">
                        {row.feature}
                      </td>
                      <td className="py-4 px-6 font-semibold text-emerald-700 bg-blue-50/30 border-x border-blue-100">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          </div>
                          <span>{row.amanora}</span>
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
            <h4 className="text-base font-bold text-slate-900">Affordable &amp; Flexible Rates</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Budget and Premium options starting from just ₹3,499. Pay only for what you use, with stay-only or food-included options.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
              2
            </div>
            <h4 className="text-base font-bold text-slate-900">Heart of Trivandrum</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Situated in Palayam near the University of Kerala, Government Secretariat, libraries, and central transit hubs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              3
            </div>
            <h4 className="text-base font-bold text-slate-900">Planned Citywide Network</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Expanding with 4–5 more PGs across Technopark, Kazhakkoottam, and Vazhuthacaud for convenient transfers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
