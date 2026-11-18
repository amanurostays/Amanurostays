"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Wrench,
  CheckCircle2,
  Clock,
  Wifi,
  Droplet,
  Zap,
  Sparkles,
  Bed,
  Volume2,
  Camera,
  MessageCircle,
  Search,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Building2,
} from "lucide-react";
import {
  OperationsStore,
  PGBranch,
  MaintenanceTicket,
  TicketCategory,
} from "@/lib/operations-store";

const CATEGORIES: Array<{
  name: TicketCategory;
  icon: React.ElementType;
  desc: string;
}> = [
  { name: "Wi-Fi & Internet", icon: Wifi, desc: "Speed, disconnects, router" },
  { name: "Plumbing & Water", icon: Droplet, desc: "Tap, flush, shower, leakage" },
  { name: "Electrical & Geyser", icon: Zap, desc: "Light, switch, fan, hot water" },
  { name: "Room & Bathroom Cleaning", icon: Sparkles, desc: "Housekeeping, dustbin, mop" },
  { name: "Bed, Furniture & Lock", icon: Bed, desc: "Cot, mattress, door lock, cupboard" },
  { name: "Noise, Common Area & Others", icon: Volume2, desc: "Noise, kitchen, washing machine" },
];

function HelpPageContent() {
  const searchParams = useSearchParams();
  const preBranch = searchParams?.get("branch") || "";
  const preRoom = searchParams?.get("room") || "";

  const [activeTab, setActiveTab] = useState<"new" | "track">("new");
  const [branches, setBranches] = useState<PGBranch[]>([]);
  const [submittedTicket, setSubmittedTicket] = useState<MaintenanceTicket | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    branchId: "palayam-hub",
    roomNo: preRoom,
    bedNo: "A",
    residentName: "",
    residentPhone: "",
    category: "Wi-Fi & Internet" as TicketCategory,
    urgency: "Normal" as "Normal" | "Urgent",
    description: "",
    photoUrl: "",
  });

  // Track State
  const [trackQuery, setTrackQuery] = useState("");
  const [trackedTickets, setTrackedTickets] = useState<MaintenanceTicket[] | null>(null);

  useEffect(() => {
    const list = OperationsStore.getBranches();
    setBranches(list);
    if (preBranch && list.some((b) => b.id === preBranch)) {
      setFormData((prev) => ({ ...prev, branchId: preBranch }));
    } else if (list.length > 0) {
      setFormData((prev) => ({ ...prev, branchId: list[0].id }));
    }
  }, [preBranch]);

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPhotoPreview(base64);
        setFormData((prev) => ({ ...prev, photoUrl: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.roomNo.trim() || !formData.residentName.trim() || !formData.description.trim()) {
      alert("Please fill Room Number, Your Name, and describe the issue.");
      return;
    }

    const ticket = OperationsStore.createTicket({
      branchId: formData.branchId,
      roomNo: formData.roomNo.trim(),
      bedNo: formData.bedNo?.trim() || "A",
      residentName: formData.residentName.trim(),
      residentPhone: formData.residentPhone.trim(),
      category: formData.category,
      urgency: formData.urgency,
      description: formData.description.trim(),
      photoUrl: formData.photoUrl,
    });

    setSubmittedTicket(ticket);
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;
    const clean = trackQuery.trim().toUpperCase();
    const all = OperationsStore.getTickets();
    const matches = all.filter(
      (t) =>
        t.id.toUpperCase() === clean ||
        t.residentPhone.includes(trackQuery.trim()) ||
        t.roomNo === trackQuery.trim()
    );
    setTrackedTickets(matches);
  };

  const selectedBranchObj = branches.find((b) => b.id === (submittedTicket?.branchId || formData.branchId));
  const branchName = selectedBranchObj?.name || "Amanuro Stays";
  const branchPhone = selectedBranchObj?.phone || "+91 6282830532";

  const getWhatsAppAlertUrl = (ticket: MaintenanceTicket) => {
    const msg = encodeURIComponent(
      `Hi Caretaker (${branchName}), I have lodged a maintenance request from Room ${ticket.roomNo} (${ticket.bedNo || ""}).\n\nTicket ID: #${ticket.id}\nCategory: ${ticket.category}\nUrgency: ${ticket.urgency}\nIssue: ${ticket.description}\n\nPlease look into this at your earliest convenience.`
    );
    const cleanPhone = branchPhone.replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 antialiased selection:bg-amber-500/20 selection:text-amber-300">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Top Branding */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white border border-emerald-400/30 shadow-md">
              <Image src="/amanuro-brand-logo.jpg" alt="Amanuro Stays" fill className="object-contain p-0.5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition">
              AMANURO STAYS
            </span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-white">Resident Support &amp; Maintenance Desk</h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Report any Wi-Fi, plumbing, cleaning, or electrical issue. Our caretakers will resolve it promptly.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl gap-1 mt-2">
            <button
              onClick={() => {
                setActiveTab("new");
                setSubmittedTicket(null);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === "new"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Report New Issue
            </button>
            <button
              onClick={() => setActiveTab("track")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "track"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Ticket Status</span>
            </button>
          </div>
        </div>

        {/* Tab 1: New Ticket Form or Success Screen */}
        {activeTab === "new" && (
          <>
            {submittedTicket ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
                  <Wrench className="w-9 h-9" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Ticket Logged Successfully</span>
                  </span>
                  <h2 className="text-2xl font-black text-white">#{submittedTicket.id}</h2>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Reported for <strong>Room {submittedTicket.roomNo}</strong> at {branchName}.
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-left space-y-2.5 max-w-md mx-auto text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Current Status</span>
                    <span className="inline-flex items-center gap-1.5 font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase text-[10px]">
                      <Clock className="w-3 h-3 animate-spin" />
                      <span>{submittedTicket.status}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Category</span>
                    <span className="font-medium text-slate-200">{submittedTicket.category}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Priority</span>
                    <span
                      className={`font-bold ${
                        submittedTicket.urgency === "Urgent" ? "text-rose-400" : "text-slate-200"
                      }`}
                    >
                      {submittedTicket.urgency}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Reported Issue</span>
                    <p className="text-slate-300 italic">&quot;{submittedTicket.description}&quot;</p>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <a
                    href={getWhatsAppAlertUrl(submittedTicket)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-2xl text-sm shadow-xl shadow-emerald-600/20 transition hover:scale-101"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Quick Alert to Caretaker on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmittedTicket(null);
                      setPhotoPreview(null);
                      setFormData((prev) => ({ ...prev, description: "", photoUrl: "" }));
                    }}
                    className="block w-full text-xs text-slate-400 hover:text-white transition font-medium"
                  >
                    + Report Another Maintenance Issue
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6"
              >
                {/* Branch & Room Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider pb-1 border-b border-slate-800">
                    <Building2 className="w-4 h-4" />
                    <span>1. Location &amp; Room Number</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        PG Branch *
                      </label>
                      <select
                        value={formData.branchId}
                        onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        {branches.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.locality}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Room Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 102, 204"
                        value={formData.roomNo}
                        onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Bed (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bed A, B"
                        value={formData.bedNo}
                        onChange={(e) => setFormData({ ...formData, bedNo: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Resident Contact */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul S"
                        value={formData.residentName}
                        onChange={(e) => setFormData({ ...formData, residentName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        WhatsApp / Mobile No *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="For status updates"
                        value={formData.residentPhone}
                        onChange={(e) => setFormData({ ...formData, residentPhone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Category Selection */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider pb-1 border-b border-slate-800">
                    2. Select Problem Category *
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = formData.category === cat.name;

                      return (
                        <button
                          key={cat.name}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: cat.name })}
                          className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition cursor-pointer ${
                            isSelected
                              ? "bg-amber-500/10 border-amber-500 text-white shadow-md shadow-amber-500/10"
                              : "bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${
                              isSelected
                                ? "bg-amber-500 text-slate-950 font-bold"
                                : "bg-slate-800 text-slate-300"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold leading-tight">{cat.name}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                              {cat.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Issue Description & Photo Snap */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400 uppercase tracking-wider pb-1 border-b border-slate-800">
                    <span>3. Describe Issue &amp; Photo</span>
                    <div className="flex items-center gap-2">
                      <label className="text-[11px] text-slate-400 font-medium">Urgency:</label>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            urgency: formData.urgency === "Normal" ? "Urgent" : "Normal",
                          })
                        }
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition ${
                          formData.urgency === "Urgent"
                            ? "bg-rose-500 text-white border-rose-400 animate-pulse"
                            : "bg-slate-800 text-slate-300 border-slate-700"
                        }`}
                      >
                        {formData.urgency === "Urgent" ? "🚨 Urgent" : "Normal"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      required
                      placeholder="e.g. Wi-Fi signal dropping in Room 204 or hot water geyser switch tripping..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Photo Snap or Upload */}
                  <div className="border border-slate-800 rounded-2xl p-3 bg-slate-950/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {photoPreview ? (
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-amber-500/50 shrink-0">
                          <img src={photoPreview} alt="Issue preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center shrink-0">
                          <Camera className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <span className="text-xs font-semibold text-white block">
                          Attach Photo of Problem (Optional)
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Helps the caretaker bring the exact spare part needed.
                        </span>
                      </div>
                    </div>

                    <label className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition shrink-0 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5" />
                      <span>{photoPreview ? "Change Photo" : "Snap / Upload"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageCapture}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-3.5 px-6 rounded-2xl text-sm sm:text-base shadow-xl shadow-amber-500/20 transition hover:scale-101 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Lodge Maintenance Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-slate-500 mt-2">
                    Amanuro Caretakers attend to critical maintenance tickets within 2 to 4 hours.
                  </p>
                </div>
              </form>
            )}
          </>
        )}

        {/* Tab 2: Track Existing Tickets */}
        {activeTab === "track" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 animate-in fade-in duration-200">
            <form onSubmit={handleTrackSearch} className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300">
                Enter your Ticket ID (e.g. TKT-1042) or Mobile Number
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. TKT-1042 or 9876543210"
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 uppercase tracking-wider"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition shrink-0 cursor-pointer"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Track Results */}
            {trackedTickets !== null && (
              <div className="space-y-3 pt-2">
                {trackedTickets.length === 0 ? (
                  <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-8 text-center text-xs text-slate-400">
                    No tickets found matching &quot;{trackQuery}&quot;. Please verify the Ticket ID or phone number.
                  </div>
                ) : (
                  trackedTickets.map((t) => (
                    <div
                      key={t.id}
                      className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-amber-300 text-sm">#{t.id}</span>
                          <span className="text-xs text-slate-400">Room {t.roomNo}</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                            t.status === "Resolved"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : t.status === "In Progress"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}
                        >
                          {t.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-300">
                        <strong>Category:</strong> {t.category}
                      </div>
                      <p className="text-xs text-slate-400 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                        &quot;{t.description}&quot;
                      </p>

                      {t.resolutionNotes && (
                        <div className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 p-2.5 rounded-xl">
                          <strong>Resolution Note:</strong> {t.resolutionNotes}
                        </div>
                      )}

                      <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-800/60">
                        <span>Reported: {t.reportedDate} {t.reportedTime ? `• ${t.reportedTime}` : ""}</span>
                        {t.status !== "Resolved" && (
                          <a
                            href={getWhatsAppAlertUrl(t)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-400 hover:underline flex items-center gap-1"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>Message Caretaker</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function HelpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center text-xs">Loading helpdesk...</div>}>
      <HelpPageContent />
    </Suspense>
  );
}
