"use client";

import { MessageCircle, Calendar, Sparkles } from "lucide-react";

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
          className="group flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white px-5 py-3 rounded-full shadow-2xl shadow-emerald-700/40 hover:scale-105 transition-all cursor-pointer"
        >
          <Calendar className="w-5 h-5 text-white" />
          <div className="text-left pr-1">
            <span className="block text-[11px] font-semibold text-emerald-100">Looking for a PG?</span>
            <span className="block text-sm font-bold leading-none">Inquire for Price &amp; Visit</span>
          </div>
        </button>
      </aside>

      {/* Mobile Sticky Bottom Conversion Bar */}
      <nav aria-label="Mobile quick actions" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-100 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-3 gap-2">
          {/* Contact for Rates */}
          <button
            onClick={onOpenEnquiry}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-teal-900 border border-emerald-200 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-700 mb-0.5" />
            <span className="text-[11px] font-bold">Price Details</span>
          </button>

          {/* Dormitory Info */}
          <a
            href="#dormitory"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-lime-50 hover:bg-lime-100 text-teal-950 border border-lime-200 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-emerald-700 mb-0.5" />
            <span className="text-[11px] font-bold">Daily Pods</span>
          </a>

          {/* Book Room Visit Modal */}
          <button
            onClick={onOpenEnquiry}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-sm transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span className="text-[11px] font-bold">Book Visit</span>
          </button>
        </div>
      </nav>
    </>
  );
}
