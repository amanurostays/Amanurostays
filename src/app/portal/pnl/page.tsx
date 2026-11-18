"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Download,
  Building2,
  Calendar,
  PieChart,
  Percent,
  Receipt,
  CreditCard,
  Banknote,
  Users,
} from "lucide-react";
import PortalNav from "@/components/portal/PortalNav";
import {
  OperationsStore,
  PGBranch,
  PortalUser,
} from "@/lib/operations-store";

export default function PnLPage() {
  const [currentUser, setCurrentUser] = useState<PortalUser>(() =>
    OperationsStore.getCurrentUser()
  );
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("November 2026");

  const [pnlData, setPnlData] = useState<ReturnType<typeof OperationsStore.getBranchPnL>>([]);

  useEffect(() => {
    const cur = new Date().toLocaleString("en-IN", { month: "long", year: "numeric" });
    setSelectedMonth(cur);
  }, []);

  useEffect(() => {
    loadPnL();
  }, [selectedMonth, selectedBranch]);

  const loadPnL = () => {
    const data = OperationsStore.getBranchPnL(selectedMonth);
    if (selectedBranch && selectedBranch !== "all") {
      setPnlData(data.filter((d) => d.branchId === selectedBranch));
    } else {
      setPnlData(data);
    }
  };

  const handleBranchChange = (branchId: string) => {
    setSelectedBranch(branchId);
  };

  // Portfolio aggregates
  const portfolioInflow = pnlData.reduce((sum, d) => sum + d.totalInflow, 0);
  const portfolioExpenses = pnlData.reduce((sum, d) => sum + d.totalExpenses, 0);
  const portfolioProfit = portfolioInflow - portfolioExpenses;
  const portfolioMargin =
    portfolioInflow > 0 ? Math.round((portfolioProfit / portfolioInflow) * 100) : 0;
  const totalActiveResidents = pnlData.reduce((sum, d) => sum + d.activeResidents, 0);

  const monthsList = [
    "November 2026",
    "October 2026",
    "September 2026",
    "August 2026",
    "July 2026",
  ];

  const handleExportCSV = () => {
    const headers = [
      "Branch",
      "Locality",
      "Active Residents",
      "Rent Collected (₹)",
      "Advances Collected (₹)",
      "Total Inflow (₹)",
      "Total Expenses (₹)",
      "Net Profit (₹)",
      "Margin (%)",
    ];
    const rows = pnlData.map((d) => [
      `"${d.branchName}"`,
      `"${d.locality}"`,
      d.activeResidents,
      d.totalRentCollected,
      d.totalAdvanceCollected,
      d.totalInflow,
      d.totalExpenses,
      d.netOperatingProfit,
      `${d.profitMargin}%`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `amanuro-pnl-${selectedMonth.replace(/\s+/g, "-")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">Monthly Profit &amp; Loss Statement</h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Partner View
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Compare revenue, operational outflows by head, and net profit margins across all Amanuro Stays branches.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-bold text-amber-300 focus:outline-none"
            >
              {monthsList.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <button
              onClick={handleExportCSV}
              className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export P&amp;L CSV</span>
            </button>
          </div>
        </div>

        {/* Portfolio Summary Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Total Inflow (Rent + Adv)</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">
              ₹{portfolioInflow.toLocaleString("en-IN")}
            </div>
            <span className="text-[11px] text-slate-500 block">
              {totalActiveResidents} Active residents
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Operational Outflow</span>
              <ArrowDownRight className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black text-rose-400">
              ₹{portfolioExpenses.toLocaleString("en-IN")}
            </div>
            <span className="text-[11px] text-slate-500 block">
              Mess, bills, repairs, rent &amp; staff
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Net Operating Profit</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div
              className={`text-2xl font-black ${
                portfolioProfit >= 0 ? "text-amber-300" : "text-rose-400"
              }`}
            >
              ₹{portfolioProfit.toLocaleString("en-IN")}
            </div>
            <span className="text-[11px] text-slate-500 block">
              {selectedMonth} Earnings
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Overall Profit Margin</span>
              <Percent className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">{portfolioMargin}%</div>
            <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden mt-2 border border-slate-800">
              <div
                className="bg-gradient-to-r from-emerald-500 to-amber-500 h-full rounded-full transition-all"
                style={{ width: `${Math.max(0, Math.min(100, portfolioMargin))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Branch Cards */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Branch-by-Branch Performance ({selectedMonth})</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {pnlData.map((d) => (
              <div
                key={d.branchId}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5"
              >
                {/* Branch Top Header */}
                <div className="flex items-start justify-between border-b border-slate-800/80 pb-4">
                  <div>
                    <h3 className="text-base font-extrabold text-white">{d.branchName}</h3>
                    <p className="text-xs text-slate-400">{d.locality} • {d.activeResidents} Occupied Beds</p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Net Profit
                    </span>
                    <span
                      className={`text-lg font-black ${
                        d.netOperatingProfit >= 0 ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      ₹{d.netOperatingProfit.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] text-slate-400 block font-semibold">
                      {d.profitMargin}% margin
                    </span>
                  </div>
                </div>

                {/* Inflow vs Outflow Mini Summary */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950/70 border border-slate-800 rounded-2xl text-xs">
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] block font-semibold">Rent Inflow</span>
                    <span className="font-bold text-slate-200">₹{d.totalRentCollected.toLocaleString("en-IN")}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] block font-semibold">Advances</span>
                    <span className="font-bold text-emerald-400">₹{d.totalAdvanceCollected.toLocaleString("en-IN")}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] block font-semibold">Total Expenses</span>
                    <span className="font-bold text-rose-400">₹{d.totalExpenses.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Expense Breakdown by Head */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Expense Outflows by Head
                  </span>

                  {Object.keys(d.categoryExpenses).length === 0 ? (
                    <p className="text-xs text-slate-500 italic p-3 text-center bg-slate-950/40 rounded-xl">
                      No expenses logged for this branch yet.
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      {Object.entries(d.categoryExpenses).map(([cat, amt]) => {
                        const pct = d.totalExpenses > 0 ? Math.round((amt / d.totalExpenses) * 100) : 0;
                        return (
                          <div key={cat} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-300 font-medium">{cat}</span>
                              <div className="space-y-0.5 text-right">
                                <span className="font-bold text-rose-300">₹{amt.toLocaleString("en-IN")}</span>
                                <span className="text-[10px] text-slate-500 ml-1.5">({pct}%)</span>
                              </div>
                            </div>
                            <div className="w-full bg-slate-950 rounded-full h-1 overflow-hidden">
                              <div
                                className="bg-rose-500/80 h-full rounded-full"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Quick Action Links */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <Link
                    href={`/portal/payments?branch=${d.branchId}`}
                    className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>View Collections →</span>
                  </Link>

                  <Link
                    href={`/portal/expenses?branch=${d.branchId}`}
                    className="text-rose-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>View All Expenses →</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
