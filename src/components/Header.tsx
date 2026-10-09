"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, Menu, X, Calendar, Phone, Sparkles } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

interface HeaderProps {
  onOpenEnquiry: (roomType?: string, branchName?: string) => void;
}

export default function Header({ onOpenEnquiry }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all">
      {/* Top emerald & gold accent stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-800 via-teal-600 to-amber-500" />

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3.5 group py-1.5">
            <div className="relative w-13 h-13 sm:w-14 sm:h-14 shrink-0 rounded-xl overflow-hidden bg-white border border-emerald-200/80 shadow-sm group-hover:scale-105 transition-transform">
              <Image
                src="/amanuro-brand-logo.jpg"
                alt="Amanuro Stays - Mens PG & Paying Guest in Trivandrum"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-teal-950 group-hover:text-emerald-700 transition-colors uppercase leading-tight">
                  {PG_DATA.brand.displayName}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-emerald-700 uppercase">
                Across Trivandrum • Mens PG &amp; Stays
              </p>
            </div>
          </a>

          {/* Desktop Nav Links with Rich Colors */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-bold tracking-wide text-slate-700">
            <a href="#rooms" className="hover:text-emerald-700 transition-colors py-1">
              Rooms &amp; Pricing
            </a>
            <a href="#dormitory" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 py-1">
              <span>Dormitory</span>
              <span className="text-[10px] bg-emerald-100 text-teal-900 border border-emerald-300 px-1.5 py-0.2 rounded-full font-bold">Monthly</span>
            </a>
            <a href="#amenities" className="hover:text-emerald-700 transition-colors py-1">
              Amenities
            </a>
            <a href="#food" className="hover:text-emerald-700 transition-colors py-1">
              3x Food
            </a>
            <a href="#branches" className="hover:text-emerald-700 transition-colors py-1">
              Locations
            </a>
            <a href="#why-us" className="hover:text-emerald-700 transition-colors py-1">
              Why Us
            </a>
            <a href="/blog" className="hover:text-emerald-700 transition-colors py-1 flex items-center gap-1">
              <span>Blog &amp; Guides</span>
            </a>
            <a href="#faqs" className="hover:text-emerald-700 transition-colors py-1">
              FAQs
            </a>
          </nav>

          {/* Desktop Executive Action Cluster */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={`tel:${PG_DATA.brand.primaryPhoneClean}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-teal-950 bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200/80 shadow-2xs transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>Call: 6282830532</span>
            </a>
            <a
              href={`https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent("Hi Amanuro Stays, I would like to inquire about room availability and pricing.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-md shadow-emerald-700/25 transition-all hover:scale-102 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Visit</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-1.5">
            <a
              href={`tel:${PG_DATA.brand.primaryPhoneClean}`}
              className="p-2 rounded-lg text-teal-950 bg-emerald-50 border border-emerald-200"
              aria-label="Call Amanuro Stays"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
            </a>
            <a
              href={`https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent("Hi Amanuro Stays, I would like to inquire about room availability.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-white bg-emerald-600 shadow-xs"
              aria-label="WhatsApp Amanuro Stays"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-800 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2 text-sm font-bold text-slate-800">
            <a
              href="#rooms"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 text-slate-800 transition-colors"
            >
              Rooms &amp; Pricing (Starts from ₹3,499)
            </a>
            <a
              href="#dormitory"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-emerald-50 text-teal-900 font-bold flex items-center justify-between transition-colors"
            >
              <span>Executive Dormitory (Monthly Basis)</span>
              <span className="text-[10px] bg-emerald-100 text-teal-900 border border-emerald-300 px-2 py-0.5 rounded-full">Launching Soon</span>
            </a>
            <a
              href="#amenities"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 text-slate-800 transition-colors"
            >
              Essential Amenities
            </a>
            <a
              href="#food"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 text-slate-800 transition-colors"
            >
              3x Homestyle Food Arrangement
            </a>
            <a
              href="#branches"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 text-slate-800 transition-colors"
            >
              Locations (Palayam &amp; Upcoming Hubs)
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 text-slate-800 transition-colors"
            >
              Why Choose Amanuro Stays
            </a>
            <a
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 text-slate-800 transition-colors flex items-center justify-between"
            >
              <span>Blog &amp; Local Guides</span>
              <span className="text-[10px] bg-emerald-100 text-teal-900 border border-emerald-300 px-2 py-0.5 rounded-full font-bold">New</span>
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 text-slate-800 transition-colors"
            >
              Frequently Asked Questions
            </a>
          </nav>
          <div className="pt-3 border-t border-emerald-100 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${PG_DATA.brand.primaryPhoneClean}`}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg font-bold text-xs text-teal-950 bg-emerald-50 border border-emerald-200"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>Call: 6282830532</span>
              </a>
              <a
                href={`https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent("Hi Amanuro Stays, I would like to inquire about room availability.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg font-bold text-xs text-white bg-emerald-600 shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 cursor-pointer shadow-md shadow-emerald-700/20"
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
