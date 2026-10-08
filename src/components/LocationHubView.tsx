"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Check,
  Phone,
  MessageCircle,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Navigation,
  Wifi,
  Shirt,
  Utensils,
  Zap,
  Building2,
  ChevronRight,
  HelpCircle,
  ChevronDown
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActionBar from "@/components/FloatingActionBar";
import EnquiryModal from "@/components/EnquiryModal";
import TrustComparison from "@/components/TrustComparison";
import TestimonialsSection from "@/components/TestimonialsSection";
import { PG_DATA, RoomPlan } from "@/config/pg-data";

export interface LocationHubViewProps {
  hubName: string;
  badgeText: string;
  headline: string;
  subheadline: string;
  metaIntro: string;
  coveredLocations: string[];
  keyLandmarks: string[];
  address: string;
  status: "Active" | "Launching Soon";
  branchId?: string;
  isDormitorySpecial?: boolean;
  customFaqs: { question: string; answer: string }[];
}

export default function LocationHubView({
  hubName,
  badgeText,
  headline,
  subheadline,
  metaIntro,
  coveredLocations,
  keyLandmarks,
  address,
  status,
  branchId,
  isDormitorySpecial,
  customFaqs,
}: LocationHubViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRoomType, setModalRoomType] = useState<string | undefined>(undefined);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleOpenEnquiry = (roomType?: string) => {
    setModalRoomType(roomType);
    setIsModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header */}
      <Header onOpenEnquiry={() => handleOpenEnquiry()} />

      <main className="flex-1">
        {/* Breadcrumb Strip */}
        <div className="bg-[#061e17] text-stone-300 py-2.5 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60 text-xs">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <Link href="/" className="hover:text-amber-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
            <Link href="/#branches" className="hover:text-amber-300 transition-colors">
              Trivandrum Hubs
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-amber-300 font-bold">{hubName}</span>
          </div>
        </div>

        {/* Location Hero Banner */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0a271f] via-[#0d3429] to-[#08201a] text-white pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-emerald-950">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-gradient-to-tr from-emerald-500/10 via-amber-400/10 to-teal-500/10 blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Targeted Value Prop */}
              <div className="lg:col-span-7 space-y-5 text-center lg:text-left flex flex-col items-center lg:items-start">
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-900/60 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                  <span className="flex h-2 w-2 rounded-full bg-amber-400" />
                  <span>{badgeText}</span>
                </div>

                {/* H1 Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-[1.18] text-white">
                  {headline}
                  <span className="block text-2xl sm:text-3xl text-emerald-100 font-bold mt-1.5">
                    {subheadline}
                  </span>
                </h1>

                {/* Descriptive Paragraph */}
                <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
                  {metaIntro}
                </p>

                {/* Key Locations Covered Badges */}
                <div className="w-full p-4 rounded-2xl bg-[#061e17]/90 border border-emerald-800/60 text-left space-y-2">
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Key Locations &amp; Corridors Covered:
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {coveredLocations.map((loc, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-900/80 text-white border border-emerald-700/60 shadow-xs"
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bullet Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full pt-1 text-left">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#061e17]/80 border border-emerald-800/40">
                    <Wifi className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-xs font-semibold text-stone-200">High Speed 5G Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#061e17]/80 border border-emerald-800/40">
                    <Shirt className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                    <span className="text-xs font-semibold text-stone-200">Washing Machine</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#061e17]/80 border border-emerald-800/40">
                    <Utensils className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span className="text-xs font-semibold text-stone-200">3x Food Available</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#061e17]/80 border border-emerald-800/40">
                    <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="text-xs font-semibold text-stone-200">24/7 Water &amp; Power</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#061e17]/80 border border-emerald-800/40">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                    <span className="text-xs font-semibold text-stone-200">Alcohol &amp; Drug Free</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#061e17]/80 border border-emerald-800/40">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span className="text-xs font-semibold text-stone-200">Clean &amp; Disturbance Free</span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleOpenEnquiry(`Visit for ${hubName}`)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-extrabold text-stone-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Free Visit at {hubName}</span>
                  </button>

                  <a
                    href={`tel:${PG_DATA.brand.primaryPhoneClean}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all"
                  >
                    <Phone className="w-4 h-4 text-amber-300" />
                    <span>Call: 6282830532</span>
                  </a>
                </div>

                {/* WhatsApp button */}
                <a
                  href={`https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent(`Hi Amanuro Stays, I would like to inquire about room availability at ${hubName}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp 6282830532 for Instant Details</span>
                </a>
              </div>

              {/* Right Column: Room Plans snapshot */}
              <div className="lg:col-span-5 w-full">
                <div className="relative rounded-2xl bg-[#0c2f25]/90 border border-emerald-700/50 p-6 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center justify-between pb-3.5 border-b border-emerald-800/60">
                    <div>
                      <span className="text-[11px] uppercase font-bold tracking-wider text-amber-400">
                        {hubName} Stay Plans
                      </span>
                      <p className="text-sm font-bold text-white">Starting from ₹3,499/month</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {status === "Active" ? "Open & Accepting" : "Pre-Bookings"}
                    </span>
                  </div>

                  <div className="space-y-2.5 py-3.5">
                    {PG_DATA.roomPlans.map((room) => (
                      <div
                        key={room.id}
                        onClick={() => handleOpenEnquiry(`${room.title} (${hubName})`)}
                        className="group flex items-center justify-between p-3 rounded-xl bg-[#061e17]/90 hover:bg-[#07241c] border border-emerald-800/60 hover:border-amber-400/60 transition-all cursor-pointer"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                              {room.title}
                            </span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                              room.tier === "Premium" ? "bg-amber-400/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300"
                            }`}>
                              {room.tier}
                            </span>
                          </div>
                          <p className="text-xs text-stone-300">
                            {room.sharingType} Sharing • {room.specs.washroom}
                          </p>
                        </div>

                        <div className="text-right">
                          {room.hasStartingRate ? (
                            <div>
                              <div className="text-[10px] text-stone-400">From</div>
                              <div className="text-sm font-black text-amber-300">
                                ₹3,499/mo
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs font-semibold text-emerald-300">
                              Contact for Price
                            </div>
                          )}
                          <span className="text-[11px] font-medium text-amber-300 group-hover:underline flex items-center justify-end gap-0.5 mt-0.5">
                            Book <ArrowRight className="w-3 h-3 inline" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Call to Action Inside Card */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleOpenEnquiry(`Instant Inquiry - ${hubName}`)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Check Availability at {hubName}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Transit Details Section */}
        <section className="py-14 bg-emerald-50/40 border-b border-emerald-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-teal-900 border border-emerald-200">
                  <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Connectivity &amp; Proximity</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950">
                  Why {hubName} is the Ideal Base in Trivandrum
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Located in the heart of Trivandrum with quick access to all parts of the city and all-time availability. Whether you are preparing for exams, attending university classes, or commuting to your workplace, Amanuro Stays gives you the calm, disciplined, and safe atmosphere you need.
                </p>

                <div className="p-4 rounded-xl bg-white border border-emerald-200/80 shadow-xs space-y-2">
                  <span className="text-xs font-bold text-teal-950 uppercase tracking-wide block">
                    Key Landmarks Nearby:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {keyLandmarks.map((lm, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{lm}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Hub Address:</strong> {address}
                  </span>
                </div>
              </div>

              {/* Palayam Centered Map */}
              <div className="bg-white rounded-2xl border border-emerald-200 overflow-hidden shadow-md h-80 relative">
                <iframe
                  title={`Map showing ${hubName}`}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.567300713506!2d76.945532!3d8.502941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbb6a27e025d%3A0xbcfc11267b14d246!2sPalayam%2C%20Thiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000"
                  className="w-full h-full border-0 absolute inset-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Comparison */}
        <TrustComparison />

        {/* Real Testimonials */}
        <TestimonialsSection />

        {/* Location Specific FAQs */}
        <section className="py-14 sm:py-18 bg-white border-t border-emerald-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-teal-900 border border-emerald-200">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950">
                Questions About Staying in {hubName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Everything you need to know about rooms, amenities, food arrangement, and booking.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              {customFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-emerald-200 rounded-xl overflow-hidden bg-white shadow-2xs"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm text-teal-950 hover:bg-emerald-50/50 transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-emerald-700 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-emerald-100/60 bg-emerald-50/20">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center pt-6">
              <button
                onClick={() => handleOpenEnquiry(`FAQ Reachout - ${hubName}`)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-900 text-white font-bold text-xs hover:bg-teal-800 transition-colors shadow-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>Have More Questions? Schedule a Visit</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Bar */}
      <FloatingActionBar onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={handleCloseEnquiry}
        defaultRoomType={modalRoomType}
        defaultBranch={hubName}
      />
    </div>
  );
}
