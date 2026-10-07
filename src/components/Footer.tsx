import Image from "next/image";
import { Mail, MapPin, ShieldCheck, Phone, MessageCircle } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

export default function Footer() {
  const currentYear = "2026";

  return (
    <footer className="bg-gradient-to-b from-[#0a271f] via-[#082019] to-[#051510] text-stone-300 pt-16 pb-24 md:pb-16 border-t border-emerald-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-13 h-13 shrink-0 rounded-xl overflow-hidden bg-[#FAF9F6] p-0.5 border border-amber-500/40 shadow-md">
                <Image
                  src="/amanuro-brand-logo.jpg"
                  alt="Amanuro Stays Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white uppercase block leading-tight">
                  {PG_DATA.brand.displayName}
                </span>
                <span className="text-[10px] text-amber-400 font-bold tracking-wider">
                  Comfort. Living. Belonging.
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-100/80 leading-relaxed max-w-sm">
              {PG_DATA.brand.shortDescription}
            </p>

            <div className="pt-2 flex flex-col gap-2.5 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Palayam, Thiruvananthapuram, Kerala - 695034</span>
              </div>

              <a
                href={`tel:${PG_DATA.brand.primaryPhoneClean}`}
                className="flex items-center gap-2 text-stone-200 hover:text-white font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Call: +91 6282830532</span>
              </a>

              <a
                href={`https://wa.me/${PG_DATA.brand.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-300 hover:text-amber-300 font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: +91 9048575403</span>
              </a>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                <span>{PG_DATA.brand.email}</span>
              </div>

              <div className="text-[11px] text-amber-300 font-extrabold pt-1">
                ⭐ Stays Starting from ₹3,499/month
              </div>
            </div>
          </div>

          {/* Stay Options */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
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
                <a href="#dormitory" className="hover:text-amber-300 transition-colors font-bold text-emerald-300 flex items-center gap-1.5">
                  <span>Executive Dormitory (Monthly Basis)</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 rounded border border-amber-400/30">Soon</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Amenities & Food */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Amenities &amp; Facilities
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#amenities" className="hover:text-white transition-colors">
                  High Speed 5G Wi-Fi
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
                <a href="#why-us" className="hover:text-white transition-colors">
                  Safe &amp; Alcohol/Drug-Free
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-white transition-colors">
                  Scheduled Cleaning &amp; CCTV
                </a>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Trivandrum Locations
            </h4>
            <ul className="space-y-2 text-xs">
              {PG_DATA.branches.map((b) => (
                <li key={b.id}>
                  <a href="#branches" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{b.locality}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      b.status === "Active" ? "bg-emerald-900/80 text-amber-300 border border-emerald-700/60" : "text-stone-400"
                    }`}>
                      {b.status}
                    </span>
                  </a>
                </li>
              ))}
              <li className="pt-2 text-[11px] text-stone-400">
                Planning 4–5 more PG branches across Trivandrum soon.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Amanuro Stays • Verified Gents Accommodation in Palayam, Trivandrum</span>
          </div>

          <div>
            &copy; {currentYear} {PG_DATA.brand.displayName} (amanuro.in). All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
