"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, Menu, X, Calendar, Sparkles } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

interface HeaderProps {
  onOpenEnquiry: (roomType?: string, branchName?: string) => void;
}

export default function Header({ onOpenEnquiry }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-emerald-100/80 transition-all">
      {/* Top micro-announcement bar */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-lime-400/20 text-lime-300 border border-lime-400/30">
              <Sparkles className="w-3 h-3 mr-1 inline" /> Admissions Open
            </span>
            <span className="text-zinc-300 hidden md:inline">
              Palayam, Trivandrum • Stays Starting from ₹3,499 • High-Speed Wi-Fi &amp; 3x Food Arrangement
            </span>
          </div>
          <div className="flex items-center gap-4 text-zinc-300">
            <button
              onClick={() => onOpenEnquiry()}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-lime-400" />
              <span className="font-medium">Book a Free Room Visit</span>
            </button>
            <span className="text-zinc-600 hidden sm:inline">|</span>
            <button
              onClick={() => onOpenEnquiry()}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Contact for Price Details</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand using uploaded logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/logo.png"
                alt="Amanora Stays Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-teal-950 group-hover:text-emerald-700 transition-colors uppercase">
                {PG_DATA.brand.displayName}
              </span>
              <p className="text-[11px] font-bold text-emerald-700 tracking-wider hidden sm:block">
                PALAYAM, TRIVANDRUM
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <a href="#rooms" className="hover:text-emerald-700 transition-colors">
              Rooms &amp; Pricing
            </a>
            <a href="#dormitory" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
              <span>Dormitory (Daily)</span>
              <span className="text-[10px] bg-lime-100 text-teal-900 border border-lime-300/80 px-1.5 py-0.2 rounded-full font-bold">Soon</span>
            </a>
            <a href="#amenities" className="hover:text-emerald-700 transition-colors">
              Amenities
            </a>
            <a href="#food" className="hover:text-emerald-700 transition-colors">
              Food Arrangement
            </a>
            <a href="#branches" className="hover:text-emerald-700 transition-colors">
              Locations
            </a>
            <a href="#faqs" className="hover:text-emerald-700 transition-colors">
              FAQs
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-teal-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700" />
              <span>Contact for Price</span>
            </button>
            <button
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Visit</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenEnquiry()}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 cursor-pointer"
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
          <nav className="flex flex-col space-y-2.5 text-base font-semibold text-slate-800">
            <a
              href="#rooms"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 rounded hover:bg-emerald-50 hover:text-emerald-800"
            >
              Rooms (Starts from ₹3,499)
            </a>
            <a
              href="#dormitory"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 rounded hover:bg-emerald-50 text-teal-800 font-bold flex items-center justify-between"
            >
              <span>Dormitory (Daily Basis)</span>
              <span className="text-xs bg-lime-100 text-teal-900 border border-lime-300 px-2 py-0.5 rounded-full">Launching Soon</span>
            </a>
            <a
              href="#amenities"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 rounded hover:bg-emerald-50 hover:text-emerald-800"
            >
              Amenities
            </a>
            <a
              href="#food"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 rounded hover:bg-emerald-50 hover:text-emerald-800"
            >
              3x Food Arrangement
            </a>
            <a
              href="#branches"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 rounded hover:bg-emerald-50 hover:text-emerald-800"
            >
              Locations (Palayam &amp; Upcoming Hubs)
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 rounded hover:bg-emerald-50 hover:text-emerald-800"
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
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 cursor-pointer shadow-md"
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
