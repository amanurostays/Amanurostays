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
    <section className="py-16 sm:py-20 bg-white text-slate-900 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-teal-900 border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Resident Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-950 tracking-tight">
            Trusted by Students &amp; Professionals in Trivandrum
          </h2>
          <p className="text-base text-slate-600">
            Here is what our residents have to say about staying at {PG_DATA.brand.displayName}.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-gradient-to-b from-white to-emerald-50/30 border border-emerald-100 shadow-sm hover:border-emerald-300 hover:shadow-md flex flex-col justify-between space-y-6 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-emerald-200" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-emerald-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-teal-950">{t.author}</h4>
                  <p className="text-[11px] text-emerald-700 font-semibold">{t.role}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-teal-900 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-md">
                    {t.stayDuration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
