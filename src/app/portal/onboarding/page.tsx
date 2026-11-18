"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  UserPlus,
  Search,
  CheckCircle,
  Building2,
  Calendar,
  Phone,
  Home,
  Briefcase,
  ShieldCheck,
  Camera,
  Check,
  Copy,
  MessageCircle,
  Share2,
  X,
  CreditCard,
  UserCheck,
  ExternalLink,
} from "lucide-react";
import PortalNav from "@/components/portal/PortalNav";
import {
  OperationsStore,
  PGBranch,
  OnboardingApplication,
  PortalUser,
} from "@/lib/operations-store";

export default function OnboardingPage() {
  const [currentUser, setCurrentUser] = useState<PortalUser>(() =>
    OperationsStore.getCurrentUser()
  );
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("Pending Review");
  const [searchQuery, setSearchQuery] = useState("");
  const [branches, setBranches] = useState<PGBranch[]>([]);
  const [applications, setApplications] = useState<OnboardingApplication[]>([]);

  // Modals
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);
  const [allocatingApp, setAllocatingApp] = useState<OnboardingApplication | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Allocation Form State
  const [allocationForm, setAllocationForm] = useState({
    roomNo: "101",
    bedNo: "A",
    monthlyRent: 6500,
    securityDeposit: 5000,
    advancePaid: 5000,
    notes: "",
  });

  useEffect(() => {
    setBranches(OperationsStore.getBranches());
    if (currentUser.role === "STAFF_CARETAKER" && currentUser.assignedBranchId) {
      setSelectedBranch(currentUser.assignedBranchId);
      loadApps(currentUser.assignedBranchId);
    } else {
      loadApps(selectedBranch);
    }
  }, [selectedBranch, currentUser]);

  const loadApps = (branch: string) => {
    setApplications(OperationsStore.getOnboardingApplications(branch));
  };

  const handleBranchChange = (branchId: string) => {
    setSelectedBranch(branchId);
    loadApps(branchId);
  };

  const handleApprove = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allocatingApp) return;

    if (!allocationForm.roomNo.trim()) {
      alert("Please specify a room number for allocation.");
      return;
    }

    const res = OperationsStore.approveOnboarding(allocatingApp.id, {
      roomNo: allocationForm.roomNo.trim(),
      bedNo: allocationForm.bedNo.trim() || "A",
      monthlyRent: Number(allocationForm.monthlyRent),
      securityDeposit: Number(allocationForm.securityDeposit),
      advancePaid: Number(allocationForm.advancePaid),
      notes: allocationForm.notes.trim(),
    });

    setAllocatingApp(null);
    loadApps(selectedBranch);
    alert(`Resident ${res?.name} successfully admitted to Room ${allocationForm.roomNo}!`);
  };

  const handleDecline = (appId: string) => {
    if (confirm("Decline this application?")) {
      OperationsStore.updateOnboarding(appId, { status: "Declined" });
      loadApps(selectedBranch);
    }
  };

  const filteredApps = applications.filter((app) => {
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      app.name.toLowerCase().includes(q) ||
      app.phone.toLowerCase().includes(q) ||
      app.idNumber.toLowerCase().includes(q) ||
      app.id.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const pendingCount = applications.filter((a) => a.status === "Pending Review").length;
  const approvedCount = applications.filter((a) => a.status === "Approved").length;

  const publicJoinUrl = typeof window !== "undefined" ? `${window.location.origin}/join` : "https://amanuro.in/join";

  const handleCopy = () => {
    navigator.clipboard.writeText(publicJoinUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="portal-theme min-h-screen bg-slate-950 text-slate-100 antialiased">
      <PortalNav
        selectedBranch={selectedBranch}
        onBranchChange={handleBranchChange}
        currentUser={currentUser}
        onUserChange={setCurrentUser}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">New Joinees &amp; Self-Onboarding</h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {pendingCount} Pending Approval
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Review digital admission applications submitted by prospective residents. Approve and allocate rooms with 1 click.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowShareModal(true)}
              className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-emerald-400" />
              <span>Share Admission Link</span>
            </button>

            <Link
              href="/join"
              target="_blank"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-amber-500/20"
            >
              <span>Preview Public Form</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <span className="text-amber-400 text-[11px] block font-semibold uppercase">Pending Verification</span>
            <span className="text-2xl font-black text-amber-400">{pendingCount}</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <span className="text-emerald-400 text-[11px] block font-semibold uppercase">Approved &amp; Admitted</span>
            <span className="text-2xl font-black text-emerald-400">{approvedCount}</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm col-span-2 sm:col-span-1">
            <span className="text-slate-400 text-[11px] block font-semibold uppercase">Total Applications</span>
            <span className="text-2xl font-black text-white">{applications.length}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by Name, Phone, Aadhaar, Reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-center overflow-x-auto">
            {["all", "Pending Review", "Approved", "Declined"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  statusFilter === st
                    ? "bg-slate-800 text-amber-400 border border-slate-700"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {st === "all" ? "All" : st}
              </button>
            ))}
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApps.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-2">
              <UserPlus className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Applications Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Share the public link <strong>amanuro.in/join</strong> via WhatsApp with new joinees so they can submit their details.
              </p>
            </div>
          ) : (
            filteredApps.map((app) => {
              const branchObj = branches.find((b) => b.id === app.branchId);
              const branchLabel = branchObj?.name.replace("Amanuro Stays - ", "") || app.branchId;

              return (
                <div
                  key={app.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg transition space-y-4"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-black text-amber-300 text-sm">{app.id}</span>
                      <span className="text-base font-bold text-white">{app.name}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{branchLabel}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase ${
                          app.status === "Approved"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : app.status === "Declined"
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {app.status}
                      </span>

                      {app.status === "Pending Review" && (
                        <button
                          onClick={() => {
                            setAllocatingApp(app);
                            setAllocationForm({
                              roomNo: "101",
                              bedNo: "A",
                              monthlyRent: 6500,
                              securityDeposit: 5000,
                              advancePaid: 5000,
                              notes: `Admitted from application ${app.id}`,
                            });
                          }}
                          className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Approve &amp; Assign Room</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 3-Column Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Column 1: Contact & Work */}
                    <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 space-y-1.5">
                      <span className="text-slate-500 uppercase tracking-wider text-[10px] block font-semibold">
                        Contact &amp; Profession
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Phone:</span>
                        <span className="font-bold text-slate-200">{app.phone}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">WhatsApp:</span>
                        <span className="font-medium text-slate-200">{app.whatsapp || app.phone}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Work / College:</span>
                        <span className="font-medium text-amber-300">{app.workplaceOrCollege || "—"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Blood Group:</span>
                        <span className="font-bold text-rose-400">{app.bloodGroup || "—"}</span>
                      </div>
                    </div>

                    {/* Column 2: Stay & Emergency */}
                    <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 space-y-1.5">
                      <span className="text-slate-500 uppercase tracking-wider text-[10px] block font-semibold">
                        Stay &amp; Emergency
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Move-in Date:</span>
                        <span className="font-bold text-slate-200">{app.plannedMoveInDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Preference:</span>
                        <span className="font-medium text-slate-200">{app.roomPreference}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Guardian / Parent:</span>
                        <span className="font-medium text-slate-200">{app.emergencyContactName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Guardian Phone:</span>
                        <span className="font-medium text-slate-200">{app.emergencyContactPhone}</span>
                      </div>
                    </div>

                    {/* Column 3: Government ID Card */}
                    <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 space-y-2 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="text-slate-500 uppercase tracking-wider text-[10px] block font-semibold">
                          Government ID Proof
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">{app.idType}:</span>
                          <span className="font-bold text-amber-300 tracking-wide">{app.idNumber}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 line-clamp-1">
                          {app.permanentAddress}
                        </div>
                      </div>

                      {app.idPhotoUrl ? (
                        <button
                          onClick={() => setActivePhotoModal(app.idPhotoUrl!)}
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-2 rounded-lg text-xs font-semibold transition"
                        >
                          <Camera className="w-3.5 h-3.5 text-emerald-400" />
                          <span>View Scanned ID Photo</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-500 italic">No image uploaded</span>
                      )}
                    </div>
                  </div>

                  {/* Actions & WhatsApp button */}
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${app.whatsapp || app.phone}?text=${encodeURIComponent(
                          `Hi ${app.name}, we received your admission application for Amanuro Stays (${branchLabel}). We are reviewing room allocations and will confirm shortly!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/20 px-3 py-1.5 rounded-lg font-semibold transition"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Candidate</span>
                      </a>

                      <a
                        href={`tel:${app.phone}`}
                        className="inline-flex items-center gap-1 text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800/60"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>
                    </div>

                    {app.status === "Pending Review" && (
                      <button
                        onClick={() => handleDecline(app.id)}
                        className="text-slate-500 hover:text-rose-400 text-xs font-semibold"
                      >
                        Decline Application
                      </button>
                    )}

                    {app.status === "Approved" && (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Allocated Room {app.assignedRoomNo} ({app.assignedBedNo})</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Approve & Room Allocation Modal */}
      {allocatingApp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base text-white">Admit Resident: {allocatingApp.name}</h3>
              </div>
              <button onClick={() => setAllocatingApp(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Assign room, bed, and initial security deposit to officially register <strong>{allocatingApp.name}</strong> as an Active Resident in <strong>{branches.find(b => b.id === allocatingApp.branchId)?.name}</strong>.
            </p>

            <form onSubmit={handleApprove} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Room Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 102, 204"
                    value={allocationForm.roomNo}
                    onChange={(e) => setAllocationForm({ ...allocationForm, roomNo: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-bold focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Bed Identifier *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bed A, B, C"
                    value={allocationForm.bedNo}
                    onChange={(e) => setAllocationForm({ ...allocationForm, bedNo: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-bold focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Monthly Rent (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1000}
                    value={allocationForm.monthlyRent}
                    onChange={(e) => setAllocationForm({ ...allocationForm, monthlyRent: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-amber-400 font-bold focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Agreed Deposit (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={allocationForm.securityDeposit}
                    onChange={(e) => setAllocationForm({ ...allocationForm, securityDeposit: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-bold focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold text-slate-300 mb-1">
                    Advance Paid at Check-in (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={allocationForm.advancePaid}
                    onChange={(e) => setAllocationForm({ ...allocationForm, advancePaid: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-emerald-400 font-bold focus:outline-none focus:border-emerald-400"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Automatically records into Advance / Security Deposit Ledger.
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Paid via GPay, Key #4 handed over"
                  value={allocationForm.notes}
                  onChange={(e) => setAllocationForm({ ...allocationForm, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAllocatingApp(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition shadow-lg cursor-pointer"
                >
                  Confirm &amp; Admit Resident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Photo Viewer Modal */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl">
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold text-white mb-3">Resident Scanned ID Proof</h3>
            <div className="relative w-full max-h-[75vh] overflow-hidden rounded-2xl">
              <img src={activePhotoModal} alt="ID Proof" className="w-full h-auto object-contain rounded-2xl" />
            </div>
          </div>
        </div>
      )}

      {/* Share Admission Link Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-emerald-400" />
                <span>Share Digital Admission Form</span>
              </h3>
              <button onClick={() => setShowShareModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Send this link to prospective residents on WhatsApp so they can fill their details &amp; upload their ID card before check-in:
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-2 text-xs">
              <span className="font-bold text-amber-300 truncate">{publicJoinUrl}</span>
              <button
                onClick={handleCopy}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-3 py-1.5 rounded-xl transition shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
              </button>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Welcome to Amanuro Stays! Please fill out your digital admission form and upload your ID card for room check-in: ${publicJoinUrl}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition shadow-lg shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
