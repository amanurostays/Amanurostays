import { Phone, MessageCircle, Mail, MapPin, ShieldCheck, Heart } from "lucide-react";
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                Z
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {PG_DATA.brand.name}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {PG_DATA.brand.shortDescription}
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-300">
              <a
                href={`tel:${PG_DATA.brand.primaryPhoneClean}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{PG_DATA.brand.primaryPhone} (7 AM - 11 PM)</span>
              </a>

              <a
                href={`https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent(
                  PG_DATA.brand.whatsappDefaultMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: +{PG_DATA.brand.whatsappNumber}</span>
              </a>

              <a
                href={`mailto:${PG_DATA.brand.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>{PG_DATA.brand.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Explore Living
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Single Private AC Room
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Double Sharing Luxury
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Triple Sharing Economy
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-white transition-colors">
                  All Amenities &amp; Perks
                </a>
              </li>
              <li>
                <a href="#food-menu" className="hover:text-white transition-colors">
                  Daily Food &amp; Dining Menu
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white transition-colors">
                  Deposit &amp; Booking Rules
                </a>
              </li>
            </ul>
          </div>

          {/* Locations & SEO Keywords */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Our Locations
            </h4>
            <ul className="space-y-2 text-xs">
              {PG_DATA.branches.map((b) => (
                <li key={b.id}>
                  <a href="#branches" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
                    <span>{b.locality}</span>
                  </a>
                </li>
              ))}
              <li className="pt-2 text-[11px] text-slate-500">
                Expansion Roadmap: Bellandur, Marathahalli &amp; Whitefield launching soon.
              </li>
            </ul>
          </div>

          {/* Business & Expansion Desk */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Expansion &amp; Growth
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Property owner with a building in Bangalore? Partner with Zenith Living for guaranteed corporate lease yields.
            </p>
            <div className="pt-1">
              <a
                href={`mailto:${PG_DATA.brand.email}?subject=Property%20Partnership%20Enquiry`}
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
            <span>Official Website • 100% Verified Gents Accommodation • Zero Brokerage</span>
          </div>

          <div>
            &copy; {currentYear} {PG_DATA.brand.legalName}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
