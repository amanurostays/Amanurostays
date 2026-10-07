import { MapPin, Search } from "lucide-react";

export default function LocalSeoCloud() {
  const keywordTags = [
    { label: "PG in Trivandrum", query: "#rooms" },
    { label: "Mens PG Trivandrum", query: "#rooms" },
    { label: "Boys PG Trivandrum", query: "#rooms" },
    { label: "PG with food Trivandrum", query: "#food" },
    { label: "Affordable PG Trivandrum (Starts ₹3,499)", query: "#rooms" },
    { label: "Working men's PG Trivandrum", query: "#amenities" },
    { label: "Student PG Trivandrum", query: "#rooms" },
    { label: "PG with Wi-Fi Trivandrum", query: "#amenities" },
    { label: "PG with washing machine Trivandrum", query: "#amenities" },
    { label: "Single room PG Palayam", query: "#rooms" },
    { label: "Four sharing PG Trivandrum", query: "#rooms" },
    { label: "Daily stay dormitory Trivandrum", query: "#dormitory" },
    { label: "Gents hostel near University of Kerala", query: "#branches" },
    { label: "PG near Secretariat Trivandrum", query: "#branches" },
  ];

  return (
    <section aria-label="Local Search Tags" className="py-12 bg-slate-900 border-t border-emerald-950/80 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="space-y-1 text-center md:text-left shrink-0">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-400">
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              <span>Popular Local Searches</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Trivandrum Accommodation Index
            </h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Quick links to find the best boys PG, student accommodation, and mens hostels in Palayam and Trivandrum.
            </p>
          </div>

          {/* Keyword tags flex pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 max-w-3xl">
            {keywordTags.map((tag, idx) => (
              <a
                key={idx}
                href={tag.query}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-teal-950/80 hover:bg-emerald-900/60 text-slate-300 hover:text-lime-300 border border-emerald-900/40 hover:border-emerald-600/60 transition-all"
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
