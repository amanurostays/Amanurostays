import { Phone, MessageCircle, Mail, MapPin, ShieldCheck } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

export default function Footer() {
  const currentYear = "2026";

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-24 md:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                A
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {PG_DATA.brand.displayName}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {PG_DATA.brand.shortDescription}
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Palayam, Thiruvananthapuram, Kerala - 695034</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{PG_DATA.brand.email}</span>
              </div>

              <div className="text-[11px] text-emerald-400 font-semibold pt-1">
                ⭐ Budget &amp; Premium Stays Starting from ₹3,499/month
              </div>
            </div>
          </div>

          {/* Stay Options */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Stay Options
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Single Room (Premium)
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Double Sharing Room
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Triple Sharing Room
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Four Sharing (From ₹3,499)
                </a>
              </li>
              <li>
                <a href="#dormitory" className="hover:text-amber-400 transition-colors font-semibold text-amber-300 flex items-center gap-1">
                  <span>Dormitory Stays</span>
                  <span className="text-[10px] bg-amber-400/20 px-1 rounded">Soon</span>
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-white transition-colors">
                  Included Amenities
                </a>
              </li>
            </ul>
          </div>

          {/* Locations & SEO Keywords */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Trivandrum Locations
            </h4>
            <ul className="space-y-2 text-xs">
              {PG_DATA.branches.map((b) => (
                <li key={b.id}>
                  <a href="#branches" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
                    <span>{b.locality}</span>
                    <span className={`text-[10px] px-1 rounded ${
                      b.status === "Active" ? "bg-emerald-900/60 text-emerald-300" : "text-slate-500"
                    }`}>
                      {b.status}
                    </span>
                  </a>
                </li>
              ))}
              <li className="pt-2 text-[11px] text-slate-500">
                Expansion Roadmap: 4 to 5 more PGs opening across Trivandrum soon.
              </li>
            </ul>
          </div>

          {/* Business & Expansion Desk */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Expansion &amp; Partnership
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have a commercial building or property in Trivandrum (Technopark, Palayam, Vazhuthacaud)? Partner with Amanora Stays for long-term lease.
            </p>
            <div className="pt-1">
              <a
                href={`mailto:${PG_DATA.brand.email}?subject=Property%20Partnership%20in%20Trivandrum`}
                className="inline-block px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-500 transition-colors"
              >
                Property Partnership Desk
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Amanora Stays • Verified Gents Accommodation in Palayam, Trivandrum</span>
          </div>

          <div>
            &copy; {currentYear} {PG_DATA.brand.displayName} (amanorastays.in). All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
