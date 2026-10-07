"use client";

import { useState, useEffect } from "react";
import { X, Calendar, MessageCircle, Phone, CheckCircle2, User, Sparkles } from "lucide-react";
import { PG_DATA } from "@/config/pg-data";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRoomType?: string;
  defaultBranch?: string;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  defaultRoomType,
  defaultBranch,
}: EnquiryModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState(defaultBranch || PG_DATA.branches[0].name);
  const [roomType, setRoomType] = useState(defaultRoomType || "Four Sharing (Budget - Starts ₹3,499)");
  const [moveInTimeline, setMoveInTimeline] = useState("Immediately (Within 24-48 hrs)");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultRoomType) setRoomType(defaultRoomType);
    if (defaultBranch) setBranch(defaultBranch);
  }, [defaultRoomType, defaultBranch]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // If whatsapp is configured in pg-data.ts, open WhatsApp
    if (PG_DATA.brand.whatsappNumber && PG_DATA.brand.whatsappNumber.length > 5) {
      const text = `*New Stay & Price Inquiry - Amanuro Stays*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Contact Number:* ${phone}\n` +
        `📍 *Branch:* ${branch}\n` +
        `🛏️ *Room Preference:* ${roomType}\n` +
        `📅 *Move-in Date:* ${moveInTimeline}\n\n` +
        `Hi Amanuro Stays, please share current room availability and exact pricing details.`;

      const whatsappUrl = `https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, "_blank");
    }

    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-100/70 via-teal-50 to-white border-b border-emerald-100 p-5 sm:p-6 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Palayam, Trivandrum • Starting from ₹3,499</span>
            </div>
            <h3 className="text-lg font-bold text-teal-950">Inquire for Exact Price Details</h3>
            <p className="text-xs text-slate-600">
              Schedule a free visit or request live availability &amp; room rates.
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-emerald-50 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-800">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-teal-950">Enquiry Received!</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>! Your inquiry for <strong>{roomType}</strong> at <strong>{branch}</strong> has been noted. Our team will contact you at <strong>{phone}</strong> with exact room rates and visit availability.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={`tel:${PG_DATA.brand.primaryPhoneClean}`}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-teal-950 font-bold text-xs border border-emerald-200"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Call 6282830532</span>
                </a>
                <a
                  href={`https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent(`Hi Amanuro Stays, I just submitted an inquiry for ${roomType}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp 9048575403</span>
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="px-4 py-2 rounded-xl bg-teal-900 text-white font-bold text-xs hover:bg-teal-800 transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-emerald-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-2xs"
                  />
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-emerald-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-2xs"
                  />
                </div>
              </div>

              {/* Branch Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Branch
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-emerald-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white shadow-2xs"
                  >
                    {PG_DATA.branches.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.locality} ({b.status})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Room Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Room Type
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-emerald-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white shadow-2xs"
                  >
                    <option value="Single Room (Premium Tier)">Single Room (Premium Tier)</option>
                    <option value="Double Sharing (Premium Tier)">Double Sharing (Premium Tier)</option>
                    <option value="Triple Sharing (Budget Tier)">Triple Sharing (Budget Tier)</option>
                    <option value="Four Sharing (Budget - Starts ₹3,499)">Four Sharing (Budget - Starts ₹3,499)</option>
                    <option value="Dormitory (Launching Soon)">Dormitory (Launching Soon)</option>
                  </select>
                </div>
              </div>

              {/* Move-in Timeline */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Expected Move-In Date
                </label>
                <select
                  value={moveInTimeline}
                  onChange={(e) => setMoveInTimeline(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl border border-emerald-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white shadow-2xs"
                >
                  <option value="Immediately (Within 24-48 hrs)">Immediately (Within 24-48 hrs)</option>
                  <option value="Within 7 Days">Within 7 Days</option>
                  <option value="This Month">This Month</option>
                  <option value="Next Month (Advance Booking)">Next Month (Advance Booking)</option>
                </select>
              </div>

              {/* Action Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Submit Inquiry &amp; Request Price Details</span>
                </button>
              </div>

              <div className="pt-2 text-center text-xs text-slate-500 space-y-1">
                <p>
                  Prefer speaking right away?{" "}
                  <a href={`tel:${PG_DATA.brand.primaryPhoneClean}`} className="font-bold text-teal-950 hover:underline">
                    Call 6282830532
                  </a>{" "}
                  or{" "}
                  <a
                    href={`https://wa.me/${PG_DATA.brand.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-700 hover:underline"
                  >
                    WhatsApp 9048575403
                  </a>
                </p>
                <p className="text-[11px] text-slate-400">
                  Your contact details are kept strictly private. Zero spam.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
