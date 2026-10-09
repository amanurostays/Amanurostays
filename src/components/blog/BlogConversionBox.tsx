"use client";

import { MessageCircle, Phone, Calendar, Sparkles, CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";
import { PG_DATA } from "@/config/pg-data";

interface MidArticleCtaProps {
  postTitle: string;
  onOpenEnquiry?: () => void;
}

export function MidArticleCta({ postTitle, onOpenEnquiry }: MidArticleCtaProps) {
  const whatsappUrl = `https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent(
    `Hi Amanuro Stays, I am reading '${postTitle}' and want to enquire about rooms.`
  )}`;

  return (
    <div className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0a271f] via-[#0d3429] to-[#08201a] text-white border border-emerald-800/80 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-900/80 text-amber-300 border border-amber-400/30">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Zero Brokerage Verified Stays</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            Looking for a clean, verified PG in Trivandrum?
          </h3>

          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl leading-relaxed">
            Rooms starting from ₹3,499/month in Palayam, Pattom, Vellayambalam &amp; Sasthamangalam. High-speed 5G Wi-Fi, automatic washing machine, and optional 3x homestyle Kerala meals.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          {onOpenEnquiry && (
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-stone-950 font-extrabold text-xs shadow-md transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Check Availability</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface ArticleFooterBannerProps {
  postTitle: string;
  onOpenEnquiry?: () => void;
}

export function ArticleFooterBanner({ postTitle, onOpenEnquiry }: ArticleFooterBannerProps) {
  const whatsappUrl = `https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent(
    `Hi Amanuro Stays, I finished reading '${postTitle}' and would like to check room options and rates.`
  )}`;

  return (
    <div className="my-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#071c16] via-[#0b2b22] to-[#051510] text-white border border-emerald-900/80 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wider text-amber-400 font-extrabold">
            Amanuro Stays • Trivandrum Coliving Network
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Find Your Ideal Stay in Trivandrum from ₹3,499/Month
          </h3>
          <p className="text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
            Whether you are preparing for Kerala PSC at Palayam, interning near Medical College, or working at Technopark, Amanuro Stays provides verified rooms with complete peace of mind.
          </p>
        </div>

        {/* Value Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2 text-xs text-emerald-100/90 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Single, Double, Triple &amp; 4-Sharing</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Executive Dormitory Pods for Exam Prep</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>High-Speed 5G Wi-Fi &amp; Power Backup</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Automatic Washing Machine Access</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Homestyle Kerala 3x Daily Meals</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>100% Drug-Free &amp; Peaceful Culture</span>
          </div>
        </div>

        {/* Location hubs strip */}
        <div className="pt-4 border-t border-emerald-900/60 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-stone-400 font-semibold mr-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Explore Hubs:</span>
          </span>
          <Link
            href="/pg-in-palayam"
            className="px-3 py-1 rounded-full bg-emerald-950/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 transition-colors"
          >
            Palayam
          </Link>
          <Link
            href="/pg-in-pattom"
            className="px-3 py-1 rounded-full bg-emerald-950/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 transition-colors"
          >
            Pattom
          </Link>
          <Link
            href="/pg-in-vellayambalam"
            className="px-3 py-1 rounded-full bg-emerald-950/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 transition-colors"
          >
            Vellayambalam
          </Link>
          <Link
            href="/pg-in-sasthamangalam"
            className="px-3 py-1 rounded-full bg-emerald-950/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 transition-colors"
          >
            Sasthamangalam
          </Link>
          <Link
            href="/executive-dormitory-trivandrum"
            className="px-3 py-1 rounded-full bg-emerald-950/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 transition-colors"
          >
            Executive Dormitory
          </Link>
        </div>

        {/* Buttons */}
        <div className="pt-4 flex flex-wrap items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${PG_DATA.brand.primaryPhoneClean}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-900/90 hover:bg-teal-800 text-white font-bold text-xs border border-teal-700/60 transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4 text-amber-300" />
            <span>Call +91 6282830532</span>
          </a>

          {onOpenEnquiry && (
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-stone-950 font-extrabold text-xs shadow-md transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule a Visit</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface SidebarBookingCardProps {
  postTitle: string;
  onOpenEnquiry?: () => void;
}

export function SidebarBookingCard({ postTitle, onOpenEnquiry }: SidebarBookingCardProps) {
  const whatsappUrl = `https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent(
    `Hi Amanuro Stays, I am interested in booking a room after reading '${postTitle}'.`
  )}`;

  return (
    <div className="bg-gradient-to-b from-[#0a271f] to-[#061e17] rounded-2xl border border-emerald-800 text-white p-5 space-y-4 shadow-sm">
      <div className="space-y-1">
        <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
          Amanuro Stays
        </span>
        <h4 className="text-base font-bold text-white leading-tight">
          Quick Room Booking &amp; Inquiry
        </h4>
        <p className="text-xs text-emerald-100/70">
          Starting at ₹3,499/mo in Trivandrum. Zero brokerage.
        </p>
      </div>

      <div className="space-y-2 pt-1">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-sm transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Inquiry</span>
        </a>

        <a
          href={`tel:${PG_DATA.brand.primaryPhoneClean}`}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-900/80 hover:bg-teal-800 text-white font-bold text-xs border border-teal-700/60 transition-colors"
        >
          <Phone className="w-4 h-4 text-amber-300" />
          <span>Call: 6282830532</span>
        </a>

        {onOpenEnquiry && (
          <button
            onClick={onOpenEnquiry}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-slate-700 transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule a Visit</span>
          </button>
        )}
      </div>
    </div>
  );
}
