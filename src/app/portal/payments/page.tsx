"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CreditCard,
  Plus,
  Search,
  MessageCircle,
  Download,
  Calendar,
  Building2,
  CheckCircle,
  Wallet,
  X,
  FileText,
} from "lucide-react";
import PortalNav from "@/components/portal/PortalNav";
import {
  OperationsStore,
  PGBranch,
  RentPayment,
  Resident,
  PortalUser,
} from "@/lib/operations-store";

function PaymentsContent() {
  const searchParams = useSearchParams();
  const preselectedResidentId = searchParams?.get("resident") || "";

  const [currentUser, setCurrentUser] = useState<PortalUser>(() => OperationsStore.getCurrentUser());
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [branches, setBranches] = useState<PGBranch[]>([]);
  const [payments, setPayments] = useState<RentPayment[]>(() => OperationsStore.getPayments("all"));
  const [residents, setResidents] = useState<Resident[]>(() => OperationsStore.getResidents("all"));
  const [showAddModal, setShowAddModal] = useState(false);

  // New Payment Form
  const [formData, setFormData] = useState({
    residentId: preselectedResidentId,
    amount: 4500,
    paymentDate: "",
    monthFor: "November 2026",
    paymentMode: "UPI" as const,
    transactionRef: "",
    notes: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      paymentDate: prev.paymentDate || new Date().toISOString().slice(0, 10),
    }));
  }, []);

  useEffect(() => {
    if (currentUser.role === "STAFF_CARETAKER" && currentUser.assignedBranchId) {
      setSelectedBranch(currentUser.assignedBranchId);
      loadData(currentUser.assignedBranchId);
    } else {
      loadData(selectedBranch);
    }
  }, [selectedBranch, currentUser]);

  useEffect(() => {
    if (preselectedResidentId) {
      const found = residents.find((r) => r.id === preselectedResidentId);
      if (found) {
        setFormData((prev) => ({
          ...prev,
          residentId: found.id,
          amount: found.monthlyRent,
        }));
        setShowAddModal(true);
      }
    }
  }, [preselectedResidentId, residents]);

  const loadData = (branch: string) => {
    setBranches(OperationsStore.getBranches());
    setPayments(OperationsStore.getPayments(branch));
    setResidents(OperationsStore.getResidents(branch));
  };

  const handleBranchChange = (branchId: string) => {
    setSelectedBranch(branchId);
    loadData(branchId);
  };

  const handleUserChange = (user: PortalUser) => {
    setCurrentUser(user);
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const resident = residents.find((r) => r.id === formData.residentId);
    if (!resident) {
      alert("Please select a resident");
      return;
    }

    OperationsStore.recordPayment({
      residentId: resident.id,
      residentName: resident.name,
      branchId: resident.branchId,
      amount: Number(formData.amount),
      paymentDate: formData.paymentDate || new Date().toISOString().slice(0, 10),
      monthFor: formData.monthFor,
      paymentMode: formData.paymentMode,
      transactionRef: formData.transactionRef,
      notes: formData.notes,
      recordedBy: currentUser.name,
    });

    setShowAddModal(false);
    loadData(selectedBranch);
  };

  const filteredPayments = payments.filter((p) => {
    return (
      p.residentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.monthFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.transactionRef && p.transactionRef.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const totalCollectedFiltered = filteredPayments.reduce((sum, p) => sum + Number(p.amount), 0);

  const getWhatsAppReceiptUrl = (payment: RentPayment) => {
    const resident = residents.find((r) => r.id === payment.residentId);
    const branchName = branches.find((b) => b.id === payment.branchId)?.name.replace(
      "Amanuro Stays - ",
      ""
    );
    const phone = resident?.whatsapp || resident?.phone.replace(/\D/g, "") || "";
    const cleanPhone = phone.startsWith("91") ? phone : "91" + phone;

    const msg = `*Amanuro Stays Rent Receipt*\n\nDear ${payment.residentName},\nWe have successfully received your payment of *₹${payment.amount.toLocaleString("en-IN")}* for *${payment.monthFor}*.\n\n• PG Branch: ${branchName}\n• Date: ${payment.paymentDate}\n• Mode: ${payment.paymentMode}\n• Ref ID: ${payment.transactionRef || "N/A"}\n\nThank you for choosing Amanuro Stays!`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
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
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-emerald-400" />
              <span>Rent & Collection Ledger</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Live record of all collected rents, payment modes, and digital WhatsApp receipts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Record Rent Payment</span>
            </button>
          </div>
        </div>

        {/* Collection Summary & Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold">Total Filtered</span>
              <div className="text-2xl font-extrabold text-white mt-1">
                ₹{totalCollectedFiltered.toLocaleString("en-IN")}
              </div>
              <span className="text-[11px] text-emerald-400">
                {filteredPayments.length} transactions in list
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>

          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search payments by resident name, month, or transaction ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 font-semibold">Resident</th>
                  <th className="py-3.5 px-4 font-semibold">PG Location</th>
                  <th className="py-3.5 px-4 font-semibold">Cycle / Month</th>
                  <th className="py-3.5 px-4 font-semibold">Amount</th>
                  <th className="py-3.5 px-4 font-semibold">Mode & Ref</th>
                  <th className="py-3.5 px-4 font-semibold">Date</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredPayments.map((p) => {
                  const branchObj = branches.find((b) => b.id === p.branchId);
                  const branchLabel = branchObj?.name.replace("Amanuro Stays - ", "") || p.branchId;

                  return (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 font-semibold text-white">{p.residentName}</td>
                      <td className="py-3 px-4 text-slate-300">{branchLabel}</td>
                      <td className="py-3 px-4 font-medium text-amber-300">{p.monthFor}</td>
                      <td className="py-3 px-4 font-bold text-emerald-400 text-sm">
                        ₹{p.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        <span className="font-medium bg-slate-800 px-2 py-0.5 rounded text-[11px] mr-1.5">
                          {p.paymentMode}
                        </span>
                        {p.transactionRef && (
                          <span className="text-[11px] font-medium tracking-wide text-slate-400">
                            {p.transactionRef}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-300 font-medium tabular-nums">{p.paymentDate}</td>
                      <td className="py-3 px-4 text-right">
                        <a
                          href={getWhatsAppReceiptUrl(p)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/20 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition"
                          title="Send receipt to resident on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="p-12 text-center text-slate-500 text-xs">
              {payments.length === 0
                ? "No rent payments recorded yet. Click 'Record Rent Payment' above to record rent collections."
                : "No payments found matching the current search."}
            </div>
          )}
        </div>
      </main>

      {/* Record Payment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              <span>Record Rent Collection</span>
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Enter payment received from resident. Updates resident status to Paid automatically.
            </p>

            <form onSubmit={handleRecordPayment} className="space-y-4">
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
                      amount: r ? r.monthlyRent : formData.amount,
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="">-- Choose Resident --</option>
                  {residents.map((r) => {
                    const branchShort = branches.find((b) => b.id === r.branchId)?.name.replace(
                      "Amanuro Stays - ",
                      ""
                    );
                    return (
                      <option key={r.id} value={r.id}>
                        {r.name} (Room {r.roomNo} • {branchShort}) - ₹{r.monthlyRent}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Amount Paid (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Payment Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.paymentDate}
                    onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    For Month Cycle *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.monthFor}
                    onChange={(e) => setFormData({ ...formData, monthFor: e.target.value })}
                    placeholder="November 2026"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Payment Mode *
                  </label>
                  <select
                    value={formData.paymentMode}
                    onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="UPI">UPI (GPay / PhonePe / Paytm)</option>
                    <option value="Cash">Cash (Received at Office)</option>
                    <option value="Bank Transfer">Bank Transfer / NEFT</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  UPI / Bank Reference Number
                </label>
                <input
                  type="text"
                  value={formData.transactionRef}
                  onChange={(e) => setFormData({ ...formData, transactionRef: e.target.value })}
                  placeholder="e.g. UPI-982341908 or GPay Txn ID"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                >
                  Confirm & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PaymentsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 text-sm">Loading payments...</div>}>
      <PaymentsContent />
    </Suspense>
  );
}
