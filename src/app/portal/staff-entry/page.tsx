"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Smartphone,
  CreditCard,
  UserPlus,
  Receipt,
  CheckCircle2,
  Clock,
  Building2,
  ChevronRight,
  ArrowLeft,
  X,
  MessageCircle,
  Banknote,
} from "lucide-react";
import PortalNav from "@/components/portal/PortalNav";
import {
  OperationsStore,
  PGBranch,
  EXPENSE_CATEGORIES,
  Resident,
  RentPayment,
  Expense,
  AdvanceRecord,
  PortalUser,
} from "@/lib/operations-store";

export default function StaffQuickEntryPage() {
  const [currentUser, setCurrentUser] = useState<PortalUser>(() => OperationsStore.getCurrentUser());
  const [assignedBranch, setAssignedBranch] = useState<string>("palayam-hub");
  const [branches, setBranches] = useState<PGBranch[]>([]);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [todayPayments, setTodayPayments] = useState<RentPayment[]>([]);
  const [todayExpenses, setTodayExpenses] = useState<Expense[]>([]);

  // Modal controls
  const [activeModal, setActiveModal] = useState<"rent" | "advance" | "admission" | "expense" | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Quick Rent Form
  const [rentForm, setRentForm] = useState<{
    residentId: string;
    amount: number;
    monthFor: string;
    paymentMode: "UPI" | "Cash" | "Bank Transfer";
    transactionRef: string;
  }>({
    residentId: "",
    amount: 4500,
    monthFor: "November 2026",
    paymentMode: "UPI",
    transactionRef: "",
  });

  // Quick Advance Form
  const [advanceForm, setAdvanceForm] = useState<{
    residentId: string;
    amount: number;
    paymentMode: "UPI" | "Cash" | "Bank Transfer";
    transactionRef: string;
    notes: string;
  }>({
    residentId: "",
    amount: 4500,
    paymentMode: "UPI",
    transactionRef: "",
    notes: "Security deposit advance",
  });

  // Quick Admission Form
  const [admitForm, setAdmitForm] = useState({
    name: "",
    phone: "",
    roomNo: "",
    bedNo: "Bed 1",
    monthlyRent: 4500,
    securityDeposit: 4500,
    advancePaid: 4500,
    admissionDate: "",
  });

  useEffect(() => {
    setAdmitForm((prev) => ({
      ...prev,
      admissionDate: prev.admissionDate || new Date().toISOString().slice(0, 10),
    }));
  }, []);

  // Quick Expense Form
  const [expenseForm, setExpenseForm] = useState({
    category: "Mess & Groceries" as any,
    amount: 500,
    paidTo: "",
    description: "",
  });

  useEffect(() => {
    setBranches(OperationsStore.getBranches());
    const branch = currentUser.assignedBranchId || "palayam-hub";
    setAssignedBranch(branch);
    loadBranchData(branch);
  }, [currentUser]);

  const loadBranchData = (branch: string) => {
    setBranches(OperationsStore.getBranches());
    const resList = OperationsStore.getResidents(branch);
    setResidents(resList);

    const pays = OperationsStore.getPayments(branch);
    setTodayPayments(pays.slice(0, 3));

    const exps = OperationsStore.getExpenses(branch);
    setTodayExpenses(exps.slice(0, 3));
  };

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleQuickRentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = residents.find((r) => r.id === rentForm.residentId);
    if (!res) {
      alert("Please select a resident");
      return;
    }

    OperationsStore.recordPayment({
      residentId: res.id,
      residentName: res.name,
      branchId: assignedBranch,
      amount: Number(rentForm.amount),
      paymentDate: new Date().toISOString().slice(0, 10),
      monthFor: rentForm.monthFor,
      paymentMode: rentForm.paymentMode,
      transactionRef: rentForm.transactionRef,
      recordedBy: currentUser.name,
    });

    setActiveModal(null);
    setRentForm({
      residentId: "",
      amount: 4500,
      monthFor: "November 2026",
      paymentMode: "UPI",
      transactionRef: "",
    });
    loadBranchData(assignedBranch);
    showNotification(`₹${rentForm.amount} rent recorded for ${res.name}!`);
  };

  const handleQuickAdvanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = residents.find((r) => r.id === advanceForm.residentId);
    if (!res) {
      alert("Please select a resident");
      return;
    }

    OperationsStore.recordAdvance({
      residentId: res.id,
      residentName: res.name,
      branchId: assignedBranch,
      type: "COLLECTED",
      amount: Number(advanceForm.amount),
      date: new Date().toISOString().slice(0, 10),
      paymentMode: advanceForm.paymentMode,
      transactionRef: advanceForm.transactionRef,
      notes: advanceForm.notes,
      recordedBy: currentUser.name,
    });

    setActiveModal(null);
    setAdvanceForm({
      residentId: "",
      amount: 4500,
      paymentMode: "UPI",
      transactionRef: "",
      notes: "Security deposit advance",
    });
    loadBranchData(assignedBranch);
    showNotification(`₹${advanceForm.amount} security deposit saved for ${res.name}!`);
  };

  const handleQuickAdmitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!admitForm.name || !admitForm.phone || !admitForm.roomNo) {
      alert("Name, Phone, and Room are required");
      return;
    }

    const clean = admitForm.phone.replace(/\D/g, "");
    OperationsStore.addResident({
      name: admitForm.name,
      phone: admitForm.phone,
      whatsapp: clean.startsWith("91") ? clean : "91" + clean,
      branchId: assignedBranch,
      roomNo: admitForm.roomNo,
      bedNo: admitForm.bedNo,
      admissionDate: admitForm.admissionDate || new Date().toISOString().slice(0, 10),
      monthlyRent: Number(admitForm.monthlyRent),
      securityDeposit: Number(admitForm.securityDeposit),
      advancePaid: Number(admitForm.advancePaid || 0),
      status: "Active",
      paymentStatus: "Pending",
    });

    setActiveModal(null);
    setAdmitForm({
      name: "",
      phone: "",
      roomNo: "",
      bedNo: "Bed 1",
      monthlyRent: 4500,
      securityDeposit: 4500,
      advancePaid: 4500,
      admissionDate: new Date().toISOString().slice(0, 10),
    });
    loadBranchData(assignedBranch);
    showNotification(`New resident ${admitForm.name} admitted successfully!`);
  };

  const handleQuickExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseForm.amount || expenseForm.amount <= 0) {
      alert("Valid amount is required");
      return;
    }

    OperationsStore.addExpense({
      branchId: assignedBranch,
      category: expenseForm.category,
      amount: Number(expenseForm.amount),
      expenseDate: new Date().toISOString().slice(0, 10),
      paidTo: expenseForm.paidTo,
      description: expenseForm.description,
      recordedBy: currentUser.name,
    });

    setActiveModal(null);
    setExpenseForm({
      category: "Mess & Groceries",
      amount: 500,
      paidTo: "",
      description: "",
    });
    loadBranchData(assignedBranch);
    showNotification(`₹${expenseForm.amount} expense saved for ${expenseForm.category}!`);
  };

  const branchObj = branches.find((b) => b.id === assignedBranch);
  const branchName = branchObj?.name.replace("Amanuro Stays - ", "") || assignedBranch;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <PortalNav
        selectedBranch={assignedBranch}
        onBranchChange={(b) => {
          setAssignedBranch(b);
          loadBranchData(b);
        }}
        currentUser={currentUser}
        onUserChange={setCurrentUser}
      />

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-5 space-y-5">
        {/* Branch & Staff Info Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/80 rounded-2xl p-4 shadow-xl flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
              Staff Mobile Entry
            </span>
            <h2 className="text-base font-bold text-white flex items-center gap-1.5 mt-1">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>{branchName}</span>
            </h2>
            <p className="text-xs text-slate-400">Staff: {currentUser.name}</p>
          </div>

          <div className="text-right">
            <div className="text-xl font-extrabold text-white">{residents.length}</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">
              Active Residents
            </div>
          </div>
        </div>

        {/* Success Alert Toast */}
        {successToast && (
          <div className="bg-emerald-500 text-slate-950 font-bold text-xs p-3.5 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        {/* 4 Large Mobile Quick-Action Touch Cards */}
        <div className="space-y-3">
          {/* Action 1: Collect Rent */}
          <button
            onClick={() => setActiveModal("rent")}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-2xl p-4 flex items-center justify-between shadow-xl shadow-emerald-950/50 transition cursor-pointer active:scale-98"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-base font-bold leading-tight">Collect Monthly Rent</div>
                <div className="text-xs text-emerald-100/80 mt-0.5">
                  Record UPI or Cash &amp; trigger receipt
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-emerald-200" />
          </button>

          {/* Action 2: Collect Advance / Deposit */}
          <button
            onClick={() => setActiveModal("advance")}
            className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white rounded-2xl p-4 flex items-center justify-between shadow-xl shadow-teal-950/50 transition cursor-pointer active:scale-98"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Banknote className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-base font-bold leading-tight">Collect Advance / Deposit</div>
                <div className="text-xs text-teal-100/80 mt-0.5">
                  Record security deposit received
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-teal-200" />
          </button>

          {/* Action 3: Add Daily Expense */}
          <button
            onClick={() => setActiveModal("expense")}
            className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white rounded-2xl p-4 flex items-center justify-between shadow-xl shadow-rose-950/50 transition cursor-pointer active:scale-98"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-base font-bold leading-tight">Log Daily Expense</div>
                <div className="text-xs text-rose-100/80 mt-0.5">
                  Groceries, repairs, cleaning, bills
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-rose-200" />
          </button>

          {/* Action 4: New Admission */}
          <button
            onClick={() => setActiveModal("admission")}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-2xl p-4 flex items-center justify-between shadow-xl shadow-amber-950/50 transition cursor-pointer active:scale-98"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-black/10 flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-slate-950" />
              </div>
              <div className="text-left">
                <div className="text-base font-bold leading-tight">Admit New Resident</div>
                <div className="text-xs text-slate-900/80 mt-0.5">
                  Check-in with rent &amp; advance entry
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-900" />
          </button>
        </div>

        {/* Recent Branch Activity Log */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Recent Branch Entries</span>
            </h3>
            <Link href="/portal/dashboard" className="text-[11px] text-amber-400 hover:underline">
              Full Dashboard →
            </Link>
          </div>

          <div className="space-y-2">
            {todayPayments.map((p) => (
              <div
                key={p.id}
                className="bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-white">{p.residentName}</span>
                  <div className="text-[10px] text-slate-400">Rent • {p.paymentMode}</div>
                </div>
                <span className="font-bold text-emerald-400">+₹{p.amount.toLocaleString("en-IN")}</span>
              </div>
            ))}

            {todayExpenses.map((e) => (
              <div
                key={e.id}
                className="bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-white">{e.category}</span>
                  <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
                    {e.description || e.paidTo}
                  </div>
                </div>
                <span className="font-bold text-rose-400">-₹{e.amount.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Quick Rent Modal */}
      {activeModal === "rent" && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-5 shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              <span>Collect Monthly Rent</span>
            </h3>

            <form onSubmit={handleQuickRentSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Select Resident *
                </label>
                <select
                  required
                  value={rentForm.residentId}
                  onChange={(e) => {
                    const r = residents.find((res) => res.id === e.target.value);
                    setRentForm({
                      ...rentForm,
                      residentId: e.target.value,
                      amount: r ? r.monthlyRent : rentForm.amount,
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="">-- Choose Resident --</option>
                  {residents.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} (Room {r.roomNo}) - Rent: ₹{r.monthlyRent}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={rentForm.amount}
                    onChange={(e) => setRentForm({ ...rentForm, amount: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Month Cycle
                  </label>
                  <input
                    type="text"
                    required
                    value={rentForm.monthFor}
                    onChange={(e) => setRentForm({ ...rentForm, monthFor: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Payment Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["UPI", "Cash"] as const).map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => setRentForm({ ...rentForm, paymentMode: mode })}
                      className={`py-2.5 rounded-xl text-xs font-bold transition ${
                        rentForm.paymentMode === mode
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-slate-950 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  UPI Ref / Txn ID (Optional)
                </label>
                <input
                  type="text"
                  value={rentForm.transactionRef}
                  onChange={(e) => setRentForm({ ...rentForm, transactionRef: e.target.value })}
                  placeholder="e.g. GPay ID"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-emerald-500/25 transition cursor-pointer"
              >
                Confirm &amp; Save Payment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Quick Advance Modal */}
      {activeModal === "advance" && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-5 shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Banknote className="w-5 h-5 text-teal-400" />
              <span>Collect Security Deposit / Advance</span>
            </h3>

            <form onSubmit={handleQuickAdvanceSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Select Resident *
                </label>
                <select
                  required
                  value={advanceForm.residentId}
                  onChange={(e) => {
                    const r = residents.find((res) => res.id === e.target.value);
                    setAdvanceForm({
                      ...advanceForm,
                      residentId: e.target.value,
                      amount: r ? r.securityDeposit : advanceForm.amount,
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-teal-400"
                >
                  <option value="">-- Choose Resident --</option>
                  {residents.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} (Room {r.roomNo}) - Deposit: ₹{r.securityDeposit} (Paid: ₹{r.advancePaid || 0})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Advance Amount (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={advanceForm.amount}
                  onChange={(e) => setAdvanceForm({ ...advanceForm, amount: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-white font-bold text-teal-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Payment Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["UPI", "Cash"] as const).map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => setAdvanceForm({ ...advanceForm, paymentMode: mode })}
                      className={`py-2.5 rounded-xl text-xs font-bold transition ${
                        advanceForm.paymentMode === mode
                          ? "bg-teal-500 text-slate-950"
                          : "bg-slate-950 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ref / Notes (Optional)
                </label>
                <input
                  type="text"
                  value={advanceForm.notes}
                  onChange={(e) => setAdvanceForm({ ...advanceForm, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-teal-500/25 transition cursor-pointer"
              >
                Record Advance Deposit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Quick Expense Modal */}
      {activeModal === "expense" && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-5 shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-rose-400" />
              <span>Log Daily Expense</span>
            </h3>

            <form onSubmit={handleQuickExpenseSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Expense Head *
                </label>
                <select
                  value={expenseForm.category}
                  onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-white"
                >
                  {EXPENSE_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Amount in Rupees (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={expenseForm.amount}
                  onChange={(e) => setExpenseForm({ ...expenseForm, amount: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-lg font-bold text-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Paid To / Vendor
                </label>
                <input
                  type="text"
                  value={expenseForm.paidTo}
                  onChange={(e) => setExpenseForm({ ...expenseForm, paidTo: e.target.value })}
                  placeholder="e.g. Vegetables store / Plumber"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Notes / Description
                </label>
                <input
                  type="text"
                  value={expenseForm.description}
                  onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                  placeholder="e.g. 5kg potatoes & coconut oil"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-400 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-rose-500/25 transition cursor-pointer"
              >
                Record Expense
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Quick Admission Modal */}
      {activeModal === "admission" && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto p-5 shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-amber-400" />
              <span>Admit New Resident</span>
            </h3>

            <form onSubmit={handleQuickAdmitSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={admitForm.name}
                  onChange={(e) => setAdmitForm({ ...admitForm, name: e.target.value })}
                  placeholder="e.g. Anand R."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={admitForm.phone}
                  onChange={(e) => setAdmitForm({ ...admitForm, phone: e.target.value })}
                  placeholder="+91 98470 12345"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Room No *
                  </label>
                  <input
                    type="text"
                    required
                    value={admitForm.roomNo}
                    onChange={(e) => setAdmitForm({ ...admitForm, roomNo: e.target.value })}
                    placeholder="101"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Bed Identifier
                  </label>
                  <input
                    type="text"
                    value={admitForm.bedNo}
                    onChange={(e) => setAdmitForm({ ...admitForm, bedNo: e.target.value })}
                    placeholder="Bed A"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Monthly Rent (₹)
                  </label>
                  <input
                    type="number"
                    value={admitForm.monthlyRent}
                    onChange={(e) =>
                      setAdmitForm({ ...admitForm, monthlyRent: Number(e.target.value) })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Agreed Deposit (₹)
                  </label>
                  <input
                    type="number"
                    value={admitForm.securityDeposit}
                    onChange={(e) =>
                      setAdmitForm({ ...admitForm, securityDeposit: Number(e.target.value) })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-400 mb-1">
                  Advance Collected at Admission (₹)
                </label>
                <input
                  type="number"
                  value={admitForm.advancePaid}
                  onChange={(e) =>
                    setAdmitForm({ ...admitForm, advancePaid: Number(e.target.value) })
                  }
                  className="w-full bg-slate-950 border border-emerald-500/40 rounded-xl p-2.5 text-sm text-emerald-300 font-bold"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-amber-400/25 transition cursor-pointer"
              >
                Save &amp; Check In
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
