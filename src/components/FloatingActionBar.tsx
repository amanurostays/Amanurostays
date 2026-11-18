"use client";

import { MessageCircle, Calendar, Phone } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

// GA4 event helpers
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackCall(location: string) {
  window.gtag?.("event", "phone_call_click", {
    event_category: "Contact",
    event_label: location,
  });
}

function trackWhatsApp(location: string) {
  window.gtag?.("event", "whatsapp_click", {
    event_category: "Contact",
    event_label: location,
  });
}

interface FloatingActionBarProps {
  onOpenEnquiry: () => void;
}

export default function FloatingActionBar({ onOpenEnquiry }: FloatingActionBarProps) {
  const whatsappUrl = `https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent("Hi Amanuro Stays, I would like to know details about room availability and pricing.")}`;

  return (
    <>
      {/* Desktop Floating Action Group (Bottom Right) */}
      <aside aria-label="Quick contact" className="hidden lg:flex flex-col items-end gap-2.5 fixed bottom-6 right-6 z-40">
        {/* Direct Call Floating Button */}
        <a
          href={`tel:${PG_DATA.brand.primaryPhoneClean}`}
          onClick={() => trackCall("floating_bar_desktop")}
          className="group flex items-center gap-2 bg-white hover:bg-emerald-50 text-teal-950 px-3.5 py-2 rounded-full shadow-md border border-emerald-200/80 hover:border-emerald-400 transition-all hover:scale-105"
          title="Call Amanuro Stays"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-700" />
          <span className="text-xs font-bold leading-none">6282830532</span>
        </a>

        {/* WhatsApp Floating Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsApp("floating_bar_desktop")}
          className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-full shadow-md shadow-emerald-950/20 transition-all hover:scale-105"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs font-bold leading-none">WhatsApp</span>
        </a>

        {/* Schedule Visit Button */}
        <button
          type="button"
          onClick={onOpenEnquiry}
          className="group flex items-center gap-2 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-2.5 rounded-full shadow-lg shadow-emerald-900/25 transition-all cursor-pointer hover:scale-105"
        >
          <Calendar className="w-4 h-4 text-amber-300" />
          <span className="text-xs font-extrabold leading-none">Schedule Visit</span>
        </button>
      </aside>

      {/* Mobile Sticky Bottom Conversion Bar */}
      <nav aria-label="Mobile quick actions" className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-100 px-3 py-2 shadow-lg">
        <div className="grid grid-cols-3 gap-2">
          {/* Call 6282830532 */}
          <a
            href={`tel:${PG_DATA.brand.primaryPhoneClean}`}
            onClick={() => trackCall("floating_bar_mobile")}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-teal-950 border border-emerald-200 transition-colors"
          >
            <Phone className="w-4 h-4 text-emerald-700 mb-0.5" />
            <span className="text-[11px] font-bold">Call</span>
          </a>

          {/* WhatsApp 6282830532 */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsApp("floating_bar_mobile")}
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
