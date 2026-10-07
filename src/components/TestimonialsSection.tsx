import { Star, Quote, CheckCircle } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: "t1",
      author: "Anandhu",
      role: "Resident",
      rating: 5,
      review: "Good and safe rooms,Good behavior to interact from the owner.Affordable rate.",
    },
    {
      id: "t2",
      author: "Ijas",
      role: "Resident",
      rating: 5,
      review: "One of the best PG experiences I have had. The rooms and common areas are kept clean and hygienic. all the basic facilities available. atmosphere is quiet and peaceful, and the management is very supportive whenever we need anything. Definitely recommend Best PG for anyone looking for a comfortable stay in Trivandrum.",
    },
    {
      id: "t3",
      author: "Noble Baiju",
      role: "Resident",
      rating: 5,
      review: "My overall experience staying at this PG was good. The rooms were clean and comfortable, and the facilities provided were satisfactory. The location is convenient, and the atmosphere is pleasant for both students and working professionals. Overall, it was a comfortable and hassle-free stay. Would recommend it to others looking for a good PG accommodation.",
    },
    {
      id: "t4",
      author: "Prathyush Das",
      role: "Student Resident",
      rating: 5,
      review: "The perfect pg for students- wifi, filtered water, bathroom, bed, pillow.. all included...it was very comfortable to spend our time here",
    },
    {
      id: "t5",
      author: "Abaze Shone",
      role: "Resident",
      rating: 5,
      review: "I've been here for a month and the service here is exceptional.ive been in tvm in more than 3 pgs and I can assure that it is one of best pg basis on service,environment,ambience, and the owner is very friendly u can feel home all services are available wash machine,purified drinking water,and the provided mess is also good",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white text-slate-900 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-teal-900 border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Genuine Resident Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-950 tracking-tight">
            Trusted by Residents in Trivandrum
          </h2>
          <p className="text-base text-slate-600">
            Real feedback from students and professionals staying with {PG_DATA.brand.displayName}.
          </p>
        </div>

        {/* Testimonials Grid: 5 Cards (3 on top row, 2 centered below) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
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
                    Verified Stay
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
