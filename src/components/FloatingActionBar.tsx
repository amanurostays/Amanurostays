"use client";

import { MessageCircle, Phone, Calendar, Sparkles } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

interface FloatingActionBarProps {
  onOpenEnquiry: () => void;
}

export default function FloatingActionBar({ onOpenEnquiry }: FloatingActionBarProps) {
  return (
    <>
      {/* Desktop Floating Action Bubble (Bottom Right) */}
      <aside aria-label="Quick contact" className="hidden md:block fixed bottom-6 right-6 z-40">
        <button
          onClick={onOpenEnquiry}
          className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-2xl shadow-blue-600/40 hover:scale-105 transition-all cursor-pointer"
        >
          <Calendar className="w-5 h-5 text-white" />
          <div className="text-left pr-1">
            <span className="block text-[11px] font-medium text-blue-100">Looking for a PG?</span>
            <span className="block text-sm font-bold leading-none">Inquire for Price &amp; Visit</span>
          </div>
        </button>
      </aside>

      {/* Mobile Sticky Bottom Conversion Bar */}
      <nav aria-label="Mobile quick actions" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-3 gap-2">
          {/* Contact for Rates */}
          <button
            onClick={onOpenEnquiry}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
            <span className="text-[11px] font-bold">Price Details</span>
          </button>

          {/* Dormitory Info */}
          <a
            href="#dormitory"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-600 mb-0.5" />
            <span className="text-[11px] font-bold">Dormitory</span>
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
