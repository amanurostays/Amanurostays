"use client";

import { useState, useEffect } from "react";
import { X, Calendar, MessageCircle, Phone, CheckCircle2, Building2, User, Sparkles } from "lucide-react";
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
  const [roomType, setRoomType] = useState(defaultRoomType || "Single Private");
  const [moveInTimeline, setMoveInTimeline] = useState("Within 7 Days");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultRoomType) setRoomType(defaultRoomType);
    if (defaultBranch) setBranch(defaultBranch);
  }, [defaultRoomType, defaultBranch]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Construct the WhatsApp Lead Message
    const text = `*New Room Visit & Booking Inquiry*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📍 *Preferred Branch:* ${branch}\n` +
      `🛏️ *Room Type:* ${roomType}\n` +
      `📅 *Move-in Timeline:* ${moveInTimeline}\n\n` +
      `Hi Zenith Living, I'd like to schedule a room visit for this requirement. Please confirm availability.`;

    const whatsappUrl = `https://wa.me/${PG_DATA.brand.whatsappNumber}?text=${encodeURIComponent(text)}`;

    setSubmitted(true);

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Confirmation • Zero Brokerage</span>
            </div>
            <h3 className="text-xl font-bold">Schedule a Free Room Visit</h3>
            <p className="text-xs text-slate-300">
              Experience the rooms, food, and facilities in person before deciding.
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Enquiry Sent to WhatsApp!</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Thank you, <strong>{name}</strong>! Your inquiry for <strong>{roomType}</strong> at <strong>{branch}</strong> is being processed. Our manager will reply on WhatsApp within minutes.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Phone / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Branch Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                    Select Branch
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                  >
                    {PG_DATA.branches.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.locality}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Room Type */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                    Room Type
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                  >
                    <option value="Single Private">Single Private (AC/Non-AC)</option>
                    <option value="Double Sharing">Double Sharing</option>
                    <option value="Triple Sharing">Triple Sharing</option>
                  </select>
                </div>
              </div>

              {/* Move-in Timeline */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1">
                  Expected Move-In Date
                </label>
                <select
                  value={moveInTimeline}
                  onChange={(e) => setMoveInTimeline(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="Immediately (Within 24-48 hrs)">Immediately (Within 24-48 hrs)</option>
                  <option value="Within 7 Days">Within 7 Days</option>
                  <option value="This Month">This Month</option>
                  <option value="Next Month (Advance Booking)">Next Month (Advance Booking)</option>
                </select>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Enquiry via WhatsApp &amp; Book Tour</span>
                </button>
              </div>

              <p className="text-center text-[11px] text-slate-500 pt-1">
                🔒 Your number is kept strictly private. Zero spam.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
