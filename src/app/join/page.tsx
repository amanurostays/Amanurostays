"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Building2,
  CheckCircle2,
  Upload,
  User,
  Phone,
  Home,
  Briefcase,
  AlertCircle,
  Camera,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Calendar,
  Sparkles,
} from "lucide-react";
import { OperationsStore, PGBranch } from "@/lib/operations-store";

function JoinPageContent() {
  const searchParams = useSearchParams();
  const preselectedBranch = searchParams?.get("branch") || "";

  const [branches, setBranches] = useState<PGBranch[]>([]);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const [idPreview, setIdPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    branchId: "palayam-hub",
    permanentAddress: "",
    workplaceOrCollege: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    bloodGroup: "O+",
    idType: "Aadhaar Card" as "Aadhaar Card" | "Driving License" | "Passport" | "Voter ID",
    idNumber: "",
    idPhotoUrl: "",
    roomPreference: "Double Sharing",
    plannedMoveInDate: "",
    notes: "",
  });

  useEffect(() => {
    const list = OperationsStore.getBranches();
    setBranches(list);
    if (preselectedBranch && list.some((b) => b.id === preselectedBranch)) {
      setFormData((prev) => ({ ...prev, branchId: preselectedBranch }));
    } else if (list.length > 0) {
      setFormData((prev) => ({ ...prev, branchId: list[0].id }));
    }
    setFormData((prev) => ({
      ...prev,
      plannedMoveInDate: prev.plannedMoveInDate || new Date().toISOString().slice(0, 10),
    }));
  }, [preselectedBranch]);

  // Handle Photo / ID Card file or Camera capture
  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setIdPreview(base64);
        setFormData((prev) => ({ ...prev, idPhotoUrl: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.idNumber.trim()) {
      alert("Please enter Name, Phone Number, and ID Number.");
      return;
    }

    const app = OperationsStore.submitOnboarding({
      branchId: formData.branchId,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      whatsapp: (formData.whatsapp.trim() || formData.phone.trim()).replace(/[^0-9]/g, ""),
      permanentAddress: formData.permanentAddress.trim(),
      workplaceOrCollege: formData.workplaceOrCollege.trim(),
      emergencyContactName: formData.emergencyContactName.trim(),
      emergencyContactPhone: formData.emergencyContactPhone.trim(),
      bloodGroup: formData.bloodGroup,
      idType: formData.idType,
      idNumber: formData.idNumber.trim(),
      idPhotoUrl: formData.idPhotoUrl,
      roomPreference: formData.roomPreference,
      plannedMoveInDate: formData.plannedMoveInDate,
      notes: formData.notes.trim(),
    });

    setSubmittedAppId(app.id);
  };

  const selectedBranchObj = branches.find((b) => b.id === formData.branchId);
  const selectedBranchName = selectedBranchObj?.name || "Amanuro Stays";
  const branchPhone = selectedBranchObj?.phone || "+91 6282830532";

  const getWhatsAppMessageUrl = () => {
    const msg = encodeURIComponent(
      `Hi Amanuro Stays, I have submitted my digital admission form for ${selectedBranchName}!\n\nApplication Reference: ${submittedAppId}\nName: ${formData.name}\nPhone: ${formData.phone}\nMove-in Date: ${formData.plannedMoveInDate}\nPreferred Room: ${formData.roomPreference}\n\nPlease review and confirm my room allocation.`
    );
    const cleanPhone = branchPhone.replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 antialiased selection:bg-amber-500/20 selection:text-amber-300">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white border border-emerald-400/30 shadow-md">
              <Image src="/amanuro-brand-logo.jpg" alt="Amanuro Stays" fill className="object-contain p-0.5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition">
              AMANURO STAYS
            </span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-white">Digital Resident Admission Form</h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Fill your basic details and snap your ID proof to fast-track your room check-in.
          </p>
        </div>

        {/* Success Screen */}
        {submittedAppId ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Application Received
              </span>
              <h2 className="text-2xl font-extrabold text-white">Welcome, {formData.name}!</h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Your admission application has been registered for <strong>{selectedBranchName}</strong>.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-left space-y-2 max-w-md mx-auto">
              <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Application Reference</span>
                <span className="font-bold text-amber-300 text-sm tracking-wide">{submittedAppId}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">PG Location</span>
                <span className="font-medium text-slate-200">{selectedBranchName}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Room Preference</span>
                <span className="font-medium text-slate-200">{formData.roomPreference}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Move-in Date</span>
                <span className="font-medium text-slate-200">{formData.plannedMoveInDate}</span>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <a
                href={getWhatsAppMessageUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-2xl text-sm shadow-xl shadow-emerald-600/20 transition hover:scale-101"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Notify Caretaker on WhatsApp</span>
              </a>

              <Link
                href="/"
                className="block text-xs text-slate-400 hover:text-white transition font-medium"
              >
                ← Return to Amanuro Stays Homepage
              </Link>
            </div>
          </div>
        ) : (
          /* Admission Form */
          <form
            onSubmit={handleSubmit}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6"
          >
            {/* Step 1: Location & Move-in */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider pb-1 border-b border-slate-800">
                <Building2 className="w-4 h-4" />
                <span>1. Select PG Branch & Room Type</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred PG Hub *
                  </label>
                  <select
                    value={formData.branchId}
                    onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.locality})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Sharing Preference *
                  </label>
                  <select
                    value={formData.roomPreference}
                    onChange={(e) => setFormData({ ...formData, roomPreference: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Single Room">Single Room (Premium)</option>
                    <option value="Double Sharing">Double Sharing (2 Beds)</option>
                    <option value="Triple Sharing">Triple Sharing (3 Beds)</option>
                    <option value="Four Sharing">Four Sharing (Budget from ₹3,499)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Planned Move-In Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.plannedMoveInDate}
                    onChange={(e) => setFormData({ ...formData, plannedMoveInDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Resident Personal Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider pb-1 border-b border-slate-800">
                <User className="w-4 h-4" />
                <span>2. Resident Personal Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="As shown on your ID card"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone / Calling Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp Number (for receipts)
                  </label>
                  <input
                    type="tel"
                    placeholder="Leave blank if same as phone"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Company / College Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UST, Infosys, Govt College"
                    value={formData.workplaceOrCollege}
                    onChange={(e) => setFormData({ ...formData, workplaceOrCollege: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Blood Group
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Permanent Home Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="House name, street, district, state & PIN code"
                    value={formData.permanentAddress}
                    onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Parent / Emergency Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Father, mother, or guardian name"
                    value={formData.emergencyContactName}
                    onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Emergency Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Parent / Guardian mobile"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Government ID Scan & Upload */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-amber-400 uppercase tracking-wider pb-1 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>3. Government ID Verification & Photo</span>
                </div>
                <span className="text-[10px] text-slate-500 font-normal lowercase">Required by Kerala Police</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ID Document Type *
                  </label>
                  <select
                    value={formData.idType}
                    onChange={(e) => setFormData({ ...formData, idType: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Passport">Passport</option>
                    <option value="Voter ID">Voter ID Card</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ID Card Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 12-digit Aadhaar / DL No"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 uppercase tracking-wider"
                  />
                </div>

                {/* ID Photo Scan / Upload */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Snap or Upload Photo of ID Card (Front)
                  </label>

                  <div className="border-2 border-dashed border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 text-center transition bg-slate-950/50 relative">
                    {idPreview ? (
                      <div className="space-y-3">
                        <div className="relative w-full max-w-xs h-40 mx-auto rounded-xl overflow-hidden border border-slate-700 shadow-md">
                          <img src={idPreview} alt="ID Card Preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium transition">
                            <span>Retake / Change Photo</span>
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
                    ) : (
                      <div className="space-y-2 py-2">
                        <div className="w-12 h-12 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center mx-auto">
                          <Camera className="w-6 h-6" />
                        </div>
                        <p className="text-xs text-slate-300 font-semibold">
                          Take a photo with your mobile camera or upload from gallery
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Supports PNG, JPG, JPEG up to 10MB
                        </p>
                        <label className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer shadow-md transition">
                          <Camera className="w-4 h-4" />
                          <span>Snap / Upload ID Card</span>
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleImageCapture}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Special Requests / Food Requirements (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Vegetarian preference, late night check-in time..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-3.5 px-6 rounded-2xl text-sm sm:text-base shadow-xl shadow-amber-500/20 transition hover:scale-101 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Submit Digital Admission</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-slate-500 mt-2">
                🔒 Your details are stored securely and used solely for tenant verification & stay records at Amanuro Stays.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function JoinPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center text-xs">Loading admission form...</div>}>
      <JoinPageContent />
    </Suspense>
  );
}
