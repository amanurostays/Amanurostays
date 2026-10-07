"use client";

import { MessageCircle, Calendar, Phone } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

interface FloatingActionBarProps {
  onOpenEnquiry: () => void;
}

export default function FloatingActionBar({ onOpenEnquiry }: FloatingActionBarProps) {
  const whatsappUrl = `https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent("Hi Amanuro Stays, I would like to know details about room availability and pricing.")}`;

  return (
    <>
      {/* Desktop Floating Action Group (Bottom Right) */}
      <aside aria-label="Quick contact" className="hidden md:flex flex-col items-end gap-2 fixed bottom-6 right-6 z-40">
        {/* Direct Call Pill */}
        <a
          href={`tel:${PG_DATA.brand.primaryPhoneClean}`}
          className="group flex items-center gap-2.5 bg-white text-teal-950 hover:text-emerald-900 px-3.5 py-2 rounded-full shadow-md border border-emerald-200 hover:border-emerald-400 transition-all hover:scale-102"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <div className="text-left pr-1">
            <span className="block text-[9px] uppercase font-bold text-slate-400">Call Us</span>
            <span className="block text-xs font-bold text-teal-950 leading-none">6282830532</span>
          </div>
        </a>

        {/* WhatsApp Floating Pill */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-full shadow-md transition-all hover:scale-102"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white">
            <MessageCircle className="w-3.5 h-3.5" />
          </div>
          <div className="text-left pr-1">
            <span className="block text-[9px] uppercase font-bold text-emerald-100">WhatsApp</span>
            <span className="block text-xs font-bold text-white leading-none">9048575403</span>
          </div>
        </a>

        {/* Inquire & Book Visit Button */}
        <button
          onClick={onOpenEnquiry}
          className="group flex items-center gap-2.5 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-2.5 rounded-full shadow-lg shadow-emerald-900/25 transition-all cursor-pointer hover:scale-102"
        >
          <Calendar className="w-4 h-4 text-emerald-200" />
          <span className="text-xs font-bold">Inquire / Book Visit</span>
        </button>
      </aside>

      {/* Mobile Sticky Bottom Conversion Bar */}
      <nav aria-label="Mobile quick actions" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-100 px-3 py-2 shadow-lg">
        <div className="grid grid-cols-3 gap-2">
          {/* Call 6282830532 */}
          <a
            href={`tel:${PG_DATA.brand.primaryPhoneClean}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-teal-950 border border-emerald-200 transition-colors"
          >
            <Phone className="w-4 h-4 text-emerald-700 mb-0.5" />
            <span className="text-[11px] font-bold">Call</span>
          </a>

          {/* WhatsApp 9048575403 */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4 mb-0.5" />
            <span className="text-[11px]">WhatsApp</span>
          </a>

          {/* Book Room Visit Modal */}
          <button
            onClick={onOpenEnquiry}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 text-white font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-emerald-200 mb-0.5" />
            <span className="text-[11px]">Inquire</span>
          </button>
        </div>
      </nav>
    </>
  );
}
