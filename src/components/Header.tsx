"use client";

import { useState } from "react";
import { MessageCircle, Menu, X, Calendar, MapPin, Sparkles, Phone } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

interface HeaderProps {
  onOpenEnquiry: (roomType?: string, branchName?: string) => void;
}

export default function Header({ onOpenEnquiry }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200 transition-all">
      {/* Top micro-announcement bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-3 h-3 mr-1 inline" /> Admissions Open
            </span>
            <span className="text-zinc-300 hidden md:inline">
              Palayam, Trivandrum • Single, Double, Triple &amp; Four Sharing • Starting from ₹3,499
            </span>
          </div>
          <div className="flex items-center gap-4 text-zinc-300">
            <button
              onClick={() => onOpenEnquiry()}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-medium">Book a Free Room Visit</span>
            </button>
            <span className="text-zinc-600 hidden sm:inline">|</span>
            <button
              onClick={() => onOpenEnquiry()}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Contact Us for Pricing</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              A
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                {PG_DATA.brand.displayName}
              </span>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden sm:block">
                Palayam, Trivandrum
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <a href="#rooms" className="hover:text-blue-600 transition-colors">
              Rooms &amp; Pricing
            </a>
            <a href="#dormitory" className="hover:text-amber-600 transition-colors flex items-center gap-1 font-semibold text-amber-700">
              <span>Dormitory</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">Soon</span>
            </a>
            <a href="#amenities" className="hover:text-blue-600 transition-colors">
              Amenities
            </a>
            <a href="#food-menu" className="hover:text-blue-600 transition-colors">
              Food Arrangement
            </a>
            <a href="#branches" className="hover:text-blue-600 transition-colors">
              Locations &amp; Expansion
            </a>
            <a href="#faqs" className="hover:text-blue-600 transition-colors">
              FAQs
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Contact for Price</span>
            </button>
            <button
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/30 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Visit</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenEnquiry()}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 cursor-pointer"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2.5 text-base font-medium text-slate-800">
            <a
              href="#rooms"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 rounded hover:bg-slate-50"
            >
              Rooms &amp; Pricing (Starting ₹3,499)
            </a>
            <a
              href="#dormitory"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 rounded hover:bg-amber-50 text-amber-800 font-semibold flex items-center justify-between"
            >
              <span>Dormitory Stays</span>
              <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded">Launching Soon</span>
            </a>
            <a
              href="#amenities"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 rounded hover:bg-slate-50"
            >
              Amenities
            </a>
            <a
              href="#food-menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 rounded hover:bg-slate-50"
            >
              3x Food Arrangement
            </a>
            <a
              href="#branches"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 rounded hover:bg-slate-50"
            >
              Locations (Palayam &amp; Upcoming Hubs)
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 rounded hover:bg-slate-50"
            >
              FAQs
            </a>
          </nav>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white bg-blue-600 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Free Visit</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
