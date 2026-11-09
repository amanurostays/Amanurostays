"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  CreditCard,
  Receipt,
  TrendingUp,
  AlertCircle,
  MessageCircle,
  PlusCircle,
  Download,
  Building2,
  Calendar,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  CheckCircle,
  Banknote,
} from "lucide-react";
import PortalNav from "@/components/portal/PortalNav";
import {
  OperationsStore,
  PGBranch,
  PortalUser,
  EXPENSE_CATEGORIES,
} from "@/lib/operations-store";

export default function DashboardOverviewPage() {
  const [currentUser, setCurrentUser] = useState<PortalUser>(() => OperationsStore.getCurrentUser());
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [branches, setBranches] = useState<PGBranch[]>([]);
  const [stats, setStats] = useState(() => OperationsStore.getBranchStats("all"));
  const [recentPayments, setRecentPayments] = useState(() => OperationsStore.getPayments("all"));
  const [recentExpenses, setRecentExpenses] = useState(() => OperationsStore.getExpenses("all"));
  const [copiedAlert, setCopiedAlert] = useState(false);

  useEffect(() => {
    setBranches(OperationsStore.getBranches());
    if (currentUser.role === "STAFF_CARETAKER" && currentUser.assignedBranchId) {
      setSelectedBranch(currentUser.assignedBranchId);
      refreshData(currentUser.assignedBranchId);
    } else {
      refreshData(selectedBranch);
    }
  }, [selectedBranch, currentUser]);

  const refreshData = (branch: string) => {
    setStats(OperationsStore.getBranchStats(branch));
    setRecentPayments(OperationsStore.getPayments(branch));
    setRecentExpenses(OperationsStore.getExpenses(branch));
    setBranches(OperationsStore.getBranches());
  };

  const handleBranchChange = (branchId: string) => {
    setSelectedBranch(branchId);
    refreshData(branchId);
  };

  const handleUserChange = (user: PortalUser) => {
    setCurrentUser(user);
  };

  const handleExportCSV = () => {
    const csvContent = OperationsStore.exportResidentsCSV(selectedBranch);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `amanuro-residents-${selectedBranch}-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedAlert(true);
    setTimeout(() => setCopiedAlert(false), 3000);
  };

  const currentBranchName =
    selectedBranch === "all"
      ? "All Amanuro Hubs (Combined Operations)"
      : branches.find((b) => b.id === selectedBranch)?.name || selectedBranch;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col portal-theme">
      <PortalNav
        selectedBranch={selectedBranch}
        onBranchChange={handleBranchChange}
        currentUser={currentUser}
        onUserChange={handleUserChange}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Welcome & Multi-Location Context Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                {currentUser.role === "PARTNER_OWNER" ? "Partner / Executive View" : "Staff Operations"}
              </span>
              <span className="text-xs text-slate-400">• Real-Time Sync</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              <span>{currentBranchName}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Active tracking for daily admissions, advance deposits, rent collection, and expense accounting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/portal/residents"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-amber-400/20 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Admission</span>
            </Link>

            <Link
              href="/portal/advances"
              className="bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 px-3.5 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition font-semibold"
            >
              <Banknote className="w-4 h-4 text-emerald-400" />
              <span>Advances</span>
            </Link>

            <Link
              href="/portal/payments"
              className="bg-slate-800 hover:bg-slate-700 text-white font-medium border border-slate-700 px-3.5 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition"
            >
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Record Rent</span>
            </Link>

            <button
              onClick={handleExportCSV}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
              title="Download resident data as Excel/CSV"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>{copiedAlert ? "Exported!" : "Export CSV"}</span>
            </button>
          </div>
        </div>

        {/* Executive KPI Grid (5 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* 1. Bed Occupancy */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Bed Occupancy</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {stats.occupiedBeds}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                / {stats.totalCapacity} Beds
              </span>
            </div>
            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] mb-1 font-medium">
                <span className="text-slate-400">{stats.occupancyRate}% Filled</span>
                <span className="text-emerald-400 font-semibold">{stats.vacantBeds} Vacant</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, stats.occupancyRate)}%` }}
                />
              </div>
            </div>
          </div>

          {/* 2. Advance / Deposits Held */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Advance Deposits</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Banknote className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-xs text-emerald-400 font-bold">₹</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {stats.totalAdvanceHeld.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="mt-3 text-[11px] text-emerald-400/90 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Total deposit held in trust</span>
            </p>
          </div>

          {/* 3. Monthly Collections */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Rent Collected</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-xs text-emerald-400 font-bold">₹</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {stats.totalCollected.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
              <span>{recentPayments.length} payments recorded</span>
            </p>
          </div>

          {/* 4. Pending / Overdue Rent */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Pending / Due Rent</span>
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-xs text-rose-400 font-bold">₹</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {stats.totalPendingRent.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="mt-3 text-[11px] text-rose-300/90 flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>{stats.overdueResidents.length} residents overdue</span>
            </p>
          </div>

          {/* 5. Net Operating Surplus */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Net Surplus</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-xs text-amber-400 font-bold">₹</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {stats.netOperating.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="mt-3 text-[11px] text-slate-400">
              After ₹{stats.totalExpenses.toLocaleString("en-IN")} expenses
            </p>
          </div>
        </div>

        {/* Middle Section: Overdue Rent Defaulters & Expense Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overdue Rent Notice / Action Card (2 Columns) */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <h2 className="font-bold text-base text-white">Pending Rent Follow-Up</h2>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {stats.overdueResidents.length} Residents Pending
              </span>
            </div>

            {stats.overdueResidents.length === 0 ? (
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-8 text-center">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">All Clear!</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  No overdue rent for the selected PG branch.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {stats.overdueResidents.map((res) => {
                  const branchLabel = branches.find((b) => b.id === res.branchId)?.name.replace(
                    "Amanuro Stays - ",
                    ""
                  );
                  const whatsappMsg = encodeURIComponent(
                    `Hi ${res.name}, this is a gentle reminder regarding your monthly rent of ₹${res.monthlyRent} for Amanuro Stays (${branchLabel}, Room ${res.roomNo}). Please clear the pending rent via UPI/Cash at your earliest convenience. Thank you!`
                  );

                  return (
                    <div
                      key={res.id}
                      className="bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-white">{res.name}</span>
                          <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                            Room {res.roomNo} ({res.bedNo})
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            {res.paymentStatus}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-3">
                          <span>{branchLabel}</span>
                          <span>•</span>
                          <span>Last Paid: {res.lastPaidMonth || "None recorded"}</span>
                          <span>•</span>
                          <span className="font-semibold text-rose-400">
                            Due: ₹{res.monthlyRent.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <a
                          href={`https://wa.me/${res.whatsapp}?text=${whatsappMsg}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                          title="Open WhatsApp chat with pre-written reminder"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Reminder</span>
                        </a>

                        <Link
                          href={`/portal/payments?resident=${res.id}`}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition"
                        >
                          Collect
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Expense Breakdown by Head (1 Column) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-amber-400" />
                  <h2 className="font-bold text-base text-white">Expenses by Head</h2>
                </div>
                <Link
                  href="/portal/expenses"
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium"
                >
                  View All →
                </Link>
              </div>

              <div className="space-y-3.5">
                {EXPENSE_CATEGORIES.slice(0, 6).map((cat) => {
                  const amount = stats.categoryTotals[cat] || 0;
                  const total = stats.totalExpenses > 0 ? stats.totalExpenses : 1;
                  const pct = Math.round((amount / total) * 100);

                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-medium">{cat}</span>
                        <span className="font-semibold text-white">
                          ₹{amount.toLocaleString("en-IN")}
                          <span className="text-[10px] text-slate-500 font-normal ml-1">({pct}%)</span>
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Total Tracked Outflow</span>
              <span className="text-base font-bold text-white">
                ₹{stats.totalExpenses.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Side-by-Side Recent Payments & Expenses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Collections */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>Recent Rent Collections</span>
              </h3>
              <Link href="/portal/payments" className="text-xs text-slate-400 hover:text-white">
                See all ({recentPayments.length}) →
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentPayments.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  No rent payments recorded yet.
                </div>
              ) : (
                recentPayments.slice(0, 4).map((pay) => (
                  <div
                    key={pay.id}
                    className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{pay.residentName}</div>
                      <div className="text-[11px] text-slate-400">
                        {pay.monthFor} • via {pay.paymentMode} {pay.transactionRef ? `(${pay.transactionRef})` : ""}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-400 text-sm">
                        +₹{pay.amount.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-slate-500">{pay.paymentDate}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Outflows / Expenses */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Receipt className="w-4 h-4 text-rose-400" />
                <span>Recent Recorded Expenses</span>
              </h3>
              <Link href="/portal/expenses" className="text-xs text-slate-400 hover:text-white">
                See all ({recentExpenses.length}) →
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentExpenses.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  No expenses recorded yet.
                </div>
              ) : (
                recentExpenses.slice(0, 4).map((exp) => (
                  <div
                    key={exp.id}
                    className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{exp.category}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
                        {exp.description || exp.paidTo}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-rose-400 text-sm">
                        -₹{exp.amount.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-slate-500">{exp.expenseDate}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
