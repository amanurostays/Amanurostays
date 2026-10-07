import Image from "next/image";
import { Mail, MapPin, ShieldCheck, Phone, MessageCircle } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

export default function Footer() {
  const currentYear = "2026";

  return (
    <footer className="bg-teal-950 text-slate-400 pt-16 pb-24 md:pb-16 border-t border-emerald-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Amanora Stays Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-black tracking-tight text-white uppercase">
                {PG_DATA.brand.displayName}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              {PG_DATA.brand.shortDescription}
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Palayam, Thiruvananthapuram, Kerala - 695034</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-lime-400 shrink-0" />
                <span>{PG_DATA.brand.email}</span>
              </div>

              <div className="text-[11px] text-lime-300 font-bold pt-1">
                ⭐ Stays Starting from ₹3,499/month
              </div>
            </div>
          </div>

          {/* Stay Options */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-lime-400">
              Stay Options
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Single Room (Premium Tier)
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Double Sharing (Premium Tier)
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Triple Sharing (Budget Tier)
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Four Sharing (From ₹3,499)
                </a>
              </li>
              <li>
                <a href="#dormitory" className="hover:text-lime-300 transition-colors font-bold text-emerald-300 flex items-center gap-1">
                  <span>Executive Dormitory (Daily Basis)</span>
                  <span className="text-[10px] bg-lime-400/20 text-lime-300 px-1.5 rounded">Soon</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Amenities & Food */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-lime-400">
              Amenities &amp; Facilities
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#amenities" className="hover:text-white transition-colors">
                  High-Speed Wi-Fi
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-white transition-colors">
                  Washing Machine Facility
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-white transition-colors">
                  24/7 Water &amp; Electricity
                </a>
              </li>
              <li>
                <a href="#food" className="hover:text-white transition-colors">
                  3x Homestyle Food Arrangement
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-white transition-colors">
                  CCTV Security &amp; Housekeeping
                </a>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-lime-400">
              Trivandrum Locations
            </h4>
            <ul className="space-y-2 text-xs">
              {PG_DATA.branches.map((b) => (
                <li key={b.id}>
                  <a href="#branches" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{b.locality}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      b.status === "Active" ? "bg-emerald-900 text-lime-300" : "text-slate-400"
                    }`}>
                      {b.status}
                    </span>
                  </a>
                </li>
              ))}
              <li className="pt-2 text-[11px] text-slate-400">
                Planning 4–5 more PG branches across Trivandrum soon.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-emerald-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-lime-400" />
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
