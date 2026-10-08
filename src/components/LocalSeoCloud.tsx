import { Search } from "lucide-react";

export default function LocalSeoCloud() {
  const keywordTags = [
    { label: "PG in Palayam (Near Sanskrit College & RBI)", query: "/pg-in-palayam" },
    { label: "PG in Pattom (Plamood & Medical College)", query: "/pg-in-pattom" },
    { label: "PG in Vellayambalam (Kowdiar & Ambalamukku)", query: "/pg-in-vellayambalam" },
    { label: "PG in Sasthamangalam (Edapazhanji & Vazhuthacaud)", query: "/pg-in-sasthamangalam" },
    { label: "Executive Dormitory on Monthly Basis", query: "/executive-dormitory-trivandrum" },
    { label: "PG in Trivandrum", query: "/#rooms" },
    { label: "Mens PG Trivandrum", query: "/#rooms" },
    { label: "Boys PG Trivandrum", query: "/#rooms" },
    { label: "Sharing rooms in Trivandrum", query: "/#rooms" },
    { label: "Sharing rooms PG Palayam", query: "/pg-in-palayam" },
    { label: "Budget Sharing rooms Trivandrum", query: "/#rooms" },
    { label: "Paying Guest in Trivandrum", query: "/#rooms" },
    { label: "Paying Guest Palayam", query: "/pg-in-palayam" },
    { label: "Student Stay Trivandrum", query: "/#rooms" },
    { label: "PG with food Trivandrum", query: "/#food" },
    { label: "Affordable PG Trivandrum (From ₹3,499)", query: "/#rooms" },
    { label: "Working men's PG Trivandrum", query: "/#amenities" },
    { label: "Student PG Trivandrum", query: "/#rooms" },
    { label: "High speed 5G Wi-Fi PG Trivandrum", query: "/#amenities" },
    { label: "PG with washing machine Trivandrum", query: "/#amenities" },
    { label: "Alcohol & Drug-Free Safe PG", query: "/#why-us" },
  ];

  return (
    <section aria-label="Local Search Tags" className="py-12 bg-gradient-to-b from-white to-emerald-50/30 border-t border-emerald-100 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="space-y-1 text-center md:text-left shrink-0">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-900">
              <Search className="w-3.5 h-3.5 text-emerald-700" />
              <span>Popular Local Searches</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-teal-950">
              Trivandrum Accommodation Index
            </h3>
            <p className="text-xs text-slate-500 max-w-sm">
              Quick links to find the best boys PG, student accommodation, and mens hostels in Palayam and Trivandrum.
            </p>
          </div>

          {/* Keyword tags flex pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 max-w-3xl">
            {keywordTags.map((tag, idx) => (
              <a
                key={idx}
                href={tag.query}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-emerald-100 hover:border-emerald-300 transition-all shadow-2xs hover:shadow-xs"
              >
                {tag.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
