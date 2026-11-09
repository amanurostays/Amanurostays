"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Banknote,
  Plus,
  Search,
  MessageCircle,
  Download,
  Calendar,
  Building2,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  X,
  Wallet,
  ShieldCheck,
} from "lucide-react";
import PortalNav from "@/components/portal/PortalNav";
import {
  OperationsStore,
  PGBranch,
  Resident,
  AdvanceRecord,
  PortalUser,
} from "@/lib/operations-store";

export default function AdvanceDepositsPage() {
  const [currentUser, setCurrentUser] = useState<PortalUser>(() => OperationsStore.getCurrentUser());
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [branches, setBranches] = useState<PGBranch[]>([]);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [advances, setAdvances] = useState<AdvanceRecord[]>([]);

  // Modals
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    residentId: "",
    amount: 4500,
    date: "",
    paymentMode: "UPI" as "UPI" | "Cash" | "Bank Transfer",
    transactionRef: "",
    notes: "Security deposit / Advance collected",
    type: "COLLECTED" as "COLLECTED" | "REFUNDED" | "ADJUSTED_TO_RENT",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      date: prev.date || new Date().toISOString().slice(0, 10),
    }));
  }, []);

  useEffect(() => {
    setBranches(OperationsStore.getBranches());
    if (currentUser.role === "STAFF_CARETAKER" && currentUser.assignedBranchId) {
      setSelectedBranch(currentUser.assignedBranchId);
      loadData(currentUser.assignedBranchId);
    } else {
      loadData(selectedBranch);
    }
  }, [selectedBranch, currentUser]);

  const loadData = (branch: string) => {
    setResidents(OperationsStore.getResidents(branch));
    setAdvances(OperationsStore.getAdvanceRecords(branch));
  };

  const handleBranchChange = (branchId: string) => {
    setSelectedBranch(branchId);
    loadData(branchId);
  };

  const handleUserChange = (user: PortalUser) => {
    setCurrentUser(user);
  };

  const handleRecordAdvance = (e: React.FormEvent) => {
    e.preventDefault();
    const resident = residents.find((r) => r.id === formData.residentId);
    if (!resident) {
      alert("Please select a resident");
      return;
    }

    OperationsStore.recordAdvance({
      residentId: resident.id,
      residentName: resident.name,
      branchId: resident.branchId,
      type: formData.type,
      amount: Number(formData.amount),
      date: formData.date || new Date().toISOString().slice(0, 10),
      paymentMode: formData.paymentMode,
      transactionRef: formData.transactionRef,
      notes: formData.notes,
      recordedBy: currentUser.name,
    });

    setShowCollectModal(false);
    setShowRefundModal(false);
    loadData(selectedBranch);
  };

  // Filtered residents with advances
  const filteredResidents = residents.filter((r) => {
    return (
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery) ||
      r.roomNo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalAdvanceHeld = residents
    .filter((r) => r.status === "Active" || r.status === "Notice")
    .reduce((sum, r) => sum + Number(r.advancePaid || 0), 0);

  const totalAdvanceAgreed = residents
    .filter((r) => r.status === "Active" || r.status === "Notice")
    .reduce((sum, r) => sum + Number(r.securityDeposit || 0), 0);

  const pendingAdvanceTotal = Math.max(0, totalAdvanceAgreed - totalAdvanceHeld);

  const getWhatsAppAdvanceReceiptUrl = (r: Resident) => {
    const branchName = branches.find((b) => b.id === r.branchId)?.name.replace("Amanuro Stays - ", "");
    const cleanPhone = r.whatsapp || r.phone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone;

    const msg = `*Amanuro Stays - Advance / Security Deposit Receipt*\n\nDear ${r.name},\nWe acknowledge receipt of your Security Deposit / Advance payment of *₹${(r.advancePaid || 0).toLocaleString("en-IN")}* for Room ${r.roomNo} at *Amanuro Stays (${branchName})*.\n\n• Agreed Deposit: ₹${r.securityDeposit.toLocaleString("en-IN")}\n• Status: ${r.advanceStatus || "Paid"}\n• Deposit is refundable / adjustable as per stay terms upon notice.\n\nThank you for choosing Amanuro Stays!`;

    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <PortalNav
        selectedBranch={selectedBranch}
        onBranchChange={handleBranchChange}
        currentUser={currentUser}
        onUserChange={handleUserChange}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                Security Deposits &amp; Advances
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
              <Banknote className="w-6 h-6 text-emerald-400" />
              <span>Resident Advance Ledger</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Track collected security deposits, pending advance balances, and checkout refunds.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setFormData({
                  residentId: "",
                  amount: 4500,
                  date: new Date().toISOString().slice(0, 10),
                  paymentMode: "UPI",
                  transactionRef: "",
                  notes: "Security deposit advance collected",
                  type: "COLLECTED",
                });
                setShowCollectModal(true);
              }}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Collect Advance</span>
            </button>

            <button
              onClick={() => {
                setFormData({
                  residentId: "",
                  amount: 4500,
                  date: new Date().toISOString().slice(0, 10),
                  paymentMode: "Bank Transfer",
                  transactionRef: "",
                  notes: "Advance deposit refund on check-out",
                  type: "REFUNDED",
                });
                setShowRefundModal(true);
              }}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Refund / Adjust</span>
            </button>
          </div>
        </div>

        {/* Advance Financial Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Total Advance Held in Trust</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-xs text-emerald-400 font-bold">₹</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {totalAdvanceHeld.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Security deposits in hand from active residents
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Agreed Security Target</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-xs text-blue-400 font-bold">₹</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {totalAdvanceAgreed.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Total required deposit based on room agreements
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Pending Advance Collections</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-xs text-amber-400 font-bold">₹</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {pendingAdvanceTotal.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="mt-2 text-[11px] text-amber-400/90 font-medium">
              Partial or unpaid advance balance remaining
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search resident advance by name, room, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        {/* Resident Advance Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 font-semibold">Resident</th>
                  <th className="py-3.5 px-4 font-semibold">PG Location</th>
                  <th className="py-3.5 px-4 font-semibold">Room & Bed</th>
                  <th className="py-3.5 px-4 font-semibold">Agreed Deposit</th>
                  <th className="py-3.5 px-4 font-semibold">Advance Paid</th>
                  <th className="py-3.5 px-4 font-semibold">Balance Due</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredResidents.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-slate-500 text-xs">
                      {residents.length === 0
                        ? "No residents registered yet. Once residents are added, advance deposits will appear here."
                        : "No residents match the current search or branch filter."}
                    </td>
                  </tr>
                ) : (
                  filteredResidents.map((r) => {
                  const branchObj = branches.find((b) => b.id === r.branchId);
                  const branchLabel = branchObj?.name.replace("Amanuro Stays - ", "") || r.branchId;
                  const balanceDue = Math.max(0, Number(r.securityDeposit) - Number(r.advancePaid || 0));

                  return (
                    <tr key={r.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{r.name}</div>
                        <div className="text-[11px] text-slate-400 font-normal tracking-wide">{r.phone}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{branchLabel}</td>
                      <td className="py-3 px-4 font-semibold text-slate-200">
                        Room {r.roomNo} ({r.bedNo})
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-300">
                        ₹{r.securityDeposit.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-400 text-sm">
                        ₹{(r.advancePaid || 0).toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-4">
                        {balanceDue > 0 ? (
                          <span className="font-semibold text-amber-400">
                            ₹{balanceDue.toLocaleString("en-IN")}
                          </span>
                        ) : (
                          <span className="text-slate-500 font-normal">Nil</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                            r.advanceStatus === "Paid"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : r.advanceStatus === "Partial"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          }`}
                        >
                          {r.advanceStatus || "Pending"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {(r.advancePaid || 0) > 0 ? (
                          <a
                            href={getWhatsAppAdvanceReceiptUrl(r)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/20 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition"
                            title="Send deposit receipt on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Receipt</span>
                          </a>
                        ) : (
                          <button
                            onClick={() => {
                              setFormData({
                                residentId: r.id,
                                amount: r.securityDeposit,
                                date: new Date().toISOString().slice(0, 10),
                                paymentMode: "UPI",
                                transactionRef: "",
                                notes: "Initial security deposit",
                                type: "COLLECTED",
                              });
                              setShowCollectModal(true);
                            }}
                            className="text-[11px] text-amber-400 hover:underline"
                          >
                            + Collect
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            </table>
          </div>
        </div>

        {/* Recent Advance Transaction History */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Banknote className="w-4 h-4 text-emerald-400" />
            <span>Recent Advance Transactions History</span>
          </h3>

          <div className="space-y-2">
            {advances.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No advance transactions recorded yet.
              </div>
            ) : (
              advances.map((adv) => (
                <div
                  key={adv.id}
                  className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{adv.residentName}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          adv.type === "COLLECTED"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-rose-500/10 text-rose-400"
                        }`}
                      >
                        {adv.type}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {adv.date} • via {adv.paymentMode} {adv.notes ? `• ${adv.notes}` : ""}
                    </div>
                  </div>

                  <div
                    className={`font-bold text-sm ${
                      adv.type === "COLLECTED" ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {adv.type === "COLLECTED" ? "+" : "-"}₹{adv.amount.toLocaleString("en-IN")}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Collect / Refund Modal */}
      {(showCollectModal || showRefundModal) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setShowCollectModal(false);
                setShowRefundModal(false);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Banknote className="w-5 h-5 text-emerald-400" />
              <span>
                {showCollectModal ? "Record Advance Collection" : "Record Advance Refund / Adjustment"}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              {showCollectModal
                ? "Enter security deposit received from resident at admission or installment."
                : "Record advance refund given back to resident upon vacating."}
            </p>

            <form onSubmit={handleRecordAdvance} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Select Resident *
                </label>
                <select
                  required
                  value={formData.residentId}
                  onChange={(e) => {
                    const r = residents.find((res) => res.id === e.target.value);
                    setFormData({
                      ...formData,
                      residentId: e.target.value,
                      amount: r ? (showRefundModal ? r.advancePaid || 0 : r.securityDeposit) : formData.amount,
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="">-- Choose Resident --</option>
                  {residents.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} (Room {r.roomNo}) - Deposit: ₹{r.securityDeposit} (Paid: ₹{r.advancePaid || 0})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Amount (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Payment Mode
                  </label>
                  <select
                    value={formData.paymentMode}
                    onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="UPI">UPI (GPay / PhonePe)</option>
                    <option value="Cash">Cash at Office</option>
                    <option value="Bank Transfer">Bank Transfer / NEFT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Transaction ID / Ref
                  </label>
                  <input
                    type="text"
                    value={formData.transactionRef}
                    onChange={(e) => setFormData({ ...formData, transactionRef: e.target.value })}
                    placeholder="e.g. UPI-998231"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Notes
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCollectModal(false);
                    setShowRefundModal(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
