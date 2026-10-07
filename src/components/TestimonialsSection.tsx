import { Star, Quote, CheckCircle } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: "t1",
      author: "Akhil Nair",
      role: "Civil Service Aspirant @ Palayam",
      stayDuration: "Resident for 1 Year",
      location: "Palayam Hub",
      rating: 5,
      review: "Being in Palayam right near the State Central Library and University area has been a game-changer for my exam preparation. High-speed Wi-Fi, zero noise disturbances, and clean housekeeping make it the ideal place to stay.",
    },
    {
      id: "t2",
      author: "Midhun V.",
      role: "Software Engineer @ Technopark",
      stayDuration: "Resident for 8 Months",
      location: "Palayam Hub",
      rating: 5,
      review: "The starting price from ₹3,499 with washing machine and 24/7 power backup is the best value in Trivandrum. The optional food arrangement is great when I don't feel like cooking or eating outside.",
    },
    {
      id: "t3",
      author: "Vishnu Prasad",
      role: "PG Scholar @ University of Kerala",
      stayDuration: "Resident for 6 Months",
      location: "Palayam Hub",
      rating: 5,
      review: "Clean washrooms and peaceful environment. The management is transparent and very approachable. Highly recommended for any student or working professional looking for a PG in Trivandrum.",
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Resident Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Students &amp; Professionals in Trivandrum
          </h2>
          <p className="text-base text-slate-300">
            Here is what our residents have to say about staying at {PG_DATA.brand.displayName}.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between space-y-6 hover:border-slate-500 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-600" />
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{t.author}</h4>
                  <p className="text-xs text-lime-300 font-semibold">{t.role}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {t.location} • {t.stayDuration}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
            <span className="font-semibold text-white">
              ⭐ 4.9 out of 5 Resident Satisfaction
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-emerald-400 font-medium">Palayam, Thiruvananthapuram, Kerala</span>
          </div>
        </div>
      </div>
    </section>
  );
}
