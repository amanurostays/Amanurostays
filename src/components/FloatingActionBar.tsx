"use client";

import { MessageCircle, Phone, Calendar } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

interface FloatingActionBarProps {
  onOpenEnquiry: () => void;
}

export default function FloatingActionBar({ onOpenEnquiry }: FloatingActionBarProps) {
  return (
    <>
      {/* Desktop Floating WhatsApp Bubble (Bottom Right) */}
      <aside aria-label="Quick contact" className="hidden md:block fixed bottom-6 right-6 z-40">
        <a
          href={`https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent(
            PG_DATA.brand.whatsappDefaultMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
          <div className="text-left pr-1">
            <span className="block text-xs font-medium text-emerald-100">Need a room?</span>
            <span className="block text-sm font-bold leading-none">Chat on WhatsApp</span>
          </div>
        </a>
      </aside>

      {/* Mobile Sticky Bottom Conversion Bar */}
      <nav aria-label="Mobile quick actions" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-3 gap-2">
          {/* Direct Phone Call */}
          <a
            href={`tel:${PG_DATA.brand.primaryPhoneClean}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
          >
            <Phone className="w-4 h-4 text-blue-600 mb-0.5" />
            <span className="text-[11px] font-bold">Call Now</span>
          </a>

          {/* Direct WhatsApp Chat */}
          <a
            href={`https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent(
              PG_DATA.brand.whatsappDefaultMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
            <span className="text-[11px] font-bold">WhatsApp</span>
          </a>

          {/* Book Room Visit Modal */}
          <button
            onClick={onOpenEnquiry}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span className="text-[11px] font-bold">Book Visit</span>
          </button>
        </div>
      </nav>
    </>
  );
}
