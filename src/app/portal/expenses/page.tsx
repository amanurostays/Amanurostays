"use client";

import React, { useState, useEffect } from "react";
import {
  Receipt,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  Building2,
  Tag,
  DollarSign,
  X,
  FileImage,
  Upload,
} from "lucide-react";
import PortalNav from "@/components/portal/PortalNav";
import {
  OperationsStore,
  PGBranch,
  EXPENSE_CATEGORIES,
  Expense,
  ExpenseCategory,
  PortalUser,
} from "@/lib/operations-store";

export default function ExpensesPage() {
  const [currentUser, setCurrentUser] = useState<PortalUser>(() => OperationsStore.getCurrentUser());
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [branches, setBranches] = useState<PGBranch[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>(() => OperationsStore.getExpenses("all"));
  const [showAddModal, setShowAddModal] = useState(false);

  // New Expense Form
  const [formData, setFormData] = useState({
    branchId: "palayam-hub",
    category: "Mess & Groceries" as ExpenseCategory,
    amount: 1500,
    expenseDate: "",
    paidTo: "",
    description: "",
    receiptUrl: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      expenseDate: prev.expenseDate || new Date().toISOString().slice(0, 10),
    }));
  }, []);

  useEffect(() => {
    if (currentUser.role === "STAFF_CARETAKER" && currentUser.assignedBranchId) {
      setSelectedBranch(currentUser.assignedBranchId);
      loadExpenses(currentUser.assignedBranchId);
    } else {
      loadExpenses(selectedBranch);
    }
  }, [selectedBranch, currentUser]);

  const loadExpenses = (branch: string) => {
    setBranches(OperationsStore.getBranches());
    setExpenses(OperationsStore.getExpenses(branch));
  };

  const handleBranchChange = (branchId: string) => {
    setSelectedBranch(branchId);
    loadExpenses(branchId);
  };

  const handleUserChange = (user: PortalUser) => {
    setCurrentUser(user);
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || formData.amount <= 0) {
      alert("Please enter a valid expense amount");
      return;
    }

    OperationsStore.addExpense({
      branchId: formData.branchId,
      category: formData.category,
      amount: Number(formData.amount),
      expenseDate: formData.expenseDate || new Date().toISOString().slice(0, 10),
      paidTo: formData.paidTo,
      description: formData.description,
      receiptUrl: formData.receiptUrl,
      recordedBy: currentUser.name,
    });

    setShowAddModal(false);
    // Reset form
    setFormData({
      branchId: selectedBranch !== "all" ? selectedBranch : "palayam-hub",
      category: "Mess & Groceries",
      amount: 1000,
      expenseDate: new Date().toISOString().slice(0, 10),
      paidTo: "",
      description: "",
      receiptUrl: "",
    });
    loadExpenses(selectedBranch);
  };

  const filteredExpenses = expenses.filter((e) => {
    const matchesCategory = selectedCategory === "all" || e.category === selectedCategory;
    const matchesSearch =
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.paidTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalExpenseSum = filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const handleExportCSV = () => {
    const csvContent = OperationsStore.exportExpensesCSV(selectedBranch);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `amanuro-expenses-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <Receipt className="w-6 h-6 text-rose-400" />
              <span>Expense Accounting & Heads</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Track operational expenses by category: food/mess, KSEB power, water, repairs, building rent, and staff.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  branchId: selectedBranch !== "all" ? selectedBranch : "palayam-hub",
                }));
                setShowAddModal(true);
              }}
              className="bg-rose-500 hover:bg-rose-400 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-rose-500/20 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Record New Expense</span>
            </button>
          </div>
        </div>

        {/* Top Outflow Bar & Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold">Total Outflow</span>
              <div className="text-2xl font-extrabold text-white mt-1">
                ₹{totalExpenseSum.toLocaleString("en-IN")}
              </div>
              <span className="text-[11px] text-rose-400">
                Across {filteredExpenses.length} entries
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
          </div>

          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search expenses by vendor, description, or head..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Expense Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
              selectedCategory === "all"
                ? "bg-rose-500 text-white font-semibold"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            All Heads
          </button>
          {EXPENSE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-rose-500 text-white font-semibold"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Expenses Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 font-semibold">Date</th>
                  <th className="py-3.5 px-4 font-semibold">PG Location</th>
                  <th className="py-3.5 px-4 font-semibold">Expense Head</th>
                  <th className="py-3.5 px-4 font-semibold">Vendor / Recipient</th>
                  <th className="py-3.5 px-4 font-semibold">Description</th>
                  <th className="py-3.5 px-4 font-semibold">Recorded By</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredExpenses.map((e) => {
                  const branchObj = branches.find((b) => b.id === e.branchId);
                  const branchLabel = branchObj?.name.replace("Amanuro Stays - ", "") || e.branchId;

                  return (
                    <tr key={e.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 text-slate-300 font-medium tabular-nums">{e.expenseDate}</td>
                      <td className="py-3 px-4 text-slate-300">{branchLabel}</td>
                      <td className="py-3 px-4">
                        <span className="bg-rose-500/10 text-rose-300 border border-rose-500/20 px-2 py-0.5 rounded text-[11px] font-semibold">
                          {e.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-white">{e.paidTo || "—"}</td>
                      <td className="py-3 px-4 text-slate-400 max-w-xs truncate">{e.description}</td>
                      <td className="py-3 px-4 text-slate-500 text-[11px]">{e.recordedBy || "Staff"}</td>
                      <td className="py-3 px-4 text-right font-bold text-rose-400 text-sm">
                        -₹{e.amount.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredExpenses.length === 0 && (
            <div className="p-12 text-center text-slate-500 text-xs">
              {expenses.length === 0
                ? "No expense records yet. Click 'Add Expense Entry' above to track maintenance, electricity, groceries, etc."
                : "No expense records found matching current filters."}
            </div>
          )}
        </div>
      </main>

      {/* Add Expense Modal */}
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
              <Receipt className="w-5 h-5 text-rose-400" />
              <span>Record Daily Expense</span>
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Enter bills, vendor payments, maintenance, or grocery purchases.
            </p>

            <form onSubmit={handleCreateExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  PG Branch *
                </label>
                <select
                  value={formData.branchId}
                  onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Expense Head (Category) *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {EXPENSE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
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
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Expense Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.expenseDate}
                    onChange={(e) => setFormData({ ...formData, expenseDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Paid To / Vendor Name
                </label>
                <input
                  type="text"
                  value={formData.paidTo}
                  onChange={(e) => setFormData({ ...formData, paidTo: e.target.value })}
                  placeholder="e.g. Chalakkuzhy Veggies, KSEB, Plumber Babu"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description / Item Details
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. 15kg tomatoes, cooking oil, dishwash soap"
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
                  className="bg-rose-500 hover:bg-rose-400 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-rose-500/20 transition cursor-pointer"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
