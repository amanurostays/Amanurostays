"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Plus,
  Phone,
  MessageCircle,
  CreditCard,
  Building2,
  Calendar,
  X,
  CheckCircle,
  AlertCircle,
  Download,
  Trash2,
  Edit2,
} from "lucide-react";
import PortalNav from "@/components/portal/PortalNav";
import {
  OperationsStore,
  PGBranch,
  Resident,
  PortalUser,
} from "@/lib/operations-store";

export default function ResidentsDirectoryPage() {
  const [currentUser, setCurrentUser] = useState<PortalUser>(() => OperationsStore.getCurrentUser());
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [branches, setBranches] = useState<PGBranch[]>([]);
  const [residents, setResidents] = useState<Resident[]>(() => OperationsStore.getResidents("all"));
  const [showAddModal, setShowAddModal] = useState(false);

  // New Resident Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    branchId: "palayam-hub",
    roomNo: "",
    bedNo: "",
    admissionDate: "",
    monthlyRent: 4500,
    securityDeposit: 4500,
    advancePaid: 4500,
    status: "Active" as const,
    notes: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      admissionDate: prev.admissionDate || new Date().toISOString().slice(0, 10),
    }));
  }, []);

  useEffect(() => {
    setBranches(OperationsStore.getBranches());
    if (currentUser.role === "STAFF_CARETAKER" && currentUser.assignedBranchId) {
      setSelectedBranch(currentUser.assignedBranchId);
      loadResidents(currentUser.assignedBranchId);
    } else {
      loadResidents(selectedBranch);
    }
  }, [selectedBranch, currentUser]);

  const loadResidents = (branch: string) => {
    setResidents(OperationsStore.getResidents(branch));
  };

  const handleBranchChange = (branchId: string) => {
    setSelectedBranch(branchId);
    loadResidents(branchId);
  };

  const handleUserChange = (user: PortalUser) => {
    setCurrentUser(user);
  };

  const handleCreateResident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.roomNo) {
      alert("Please fill in Name, Phone, and Room Number.");
      return;
    }

    const cleanWhatsapp = formData.whatsapp
      ? formData.whatsapp.replace(/\D/g, "")
      : formData.phone.replace(/\D/g, "");

    OperationsStore.addResident({
      name: formData.name,
      phone: formData.phone,
      whatsapp: cleanWhatsapp.startsWith("91") ? cleanWhatsapp : "91" + cleanWhatsapp,
      branchId: formData.branchId,
      roomNo: formData.roomNo,
      bedNo: formData.bedNo || "Bed 1",
      admissionDate: formData.admissionDate || new Date().toISOString().slice(0, 10),
      monthlyRent: Number(formData.monthlyRent),
      securityDeposit: Number(formData.securityDeposit),
      advancePaid: Number(formData.advancePaid || 0),
      status: formData.status,
      notes: formData.notes,
      paymentStatus: "Pending",
    });

    setShowAddModal(false);
    // Reset form
    setFormData({
      name: "",
      phone: "",
      whatsapp: "",
      branchId: selectedBranch !== "all" ? selectedBranch : "palayam-hub",
      roomNo: "",
      bedNo: "",
      admissionDate: new Date().toISOString().slice(0, 10),
      monthlyRent: 4500,
      securityDeposit: 4500,
      advancePaid: 4500,
      status: "Active",
      notes: "",
    });
    loadResidents(selectedBranch);
  };

  const handleDeleteResident = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from active records?`)) {
      OperationsStore.deleteResident(id);
      loadResidents(selectedBranch);
    }
  };

  const filteredResidents = residents.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery) ||
      r.roomNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const csvContent = OperationsStore.exportResidentsCSV(selectedBranch);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `amanuro-residents-${new Date().toISOString().slice(0, 10)}.csv`);
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
        {/* Header with Title and Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-amber-400" />
              <span>Resident Database</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Active residents, room allocations, admission dates, and rent status.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
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
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-amber-400/20 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Resident</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by name, room, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Status:</span>
            {["all", "Active", "Notice", "Checked Out"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                  statusFilter === st
                    ? "bg-slate-800 text-amber-400 border border-slate-700"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {st === "all" ? "All Status" : st}
              </button>
            ))}
          </div>
        </div>

        {/* Resident Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResidents.map((res) => {
            const branchObj = branches.find((b) => b.id === res.branchId);
            const branchShort = branchObj?.name.replace("Amanuro Stays - ", "") || res.branchId;

            return (
              <div
                key={res.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition group"
              >
                <div>
                  {/* Top info */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base text-white">{res.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="font-medium text-slate-300">{branchShort}</span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                        res.paymentStatus === "Paid"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : res.paymentStatus === "Overdue"
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {res.paymentStatus || "Pending"}
                    </span>
                  </div>

                  {/* Room & Dates */}
                  <div className="grid grid-cols-2 gap-2 mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                        Room & Bed
                      </span>
                      <span className="text-slate-200 font-semibold">
                        Room {res.roomNo} • {res.bedNo}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                        Admission Date
                      </span>
                      <span className="text-slate-200 font-medium">{res.admissionDate}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                        Monthly Rent
                      </span>
                      <span className="text-amber-400 font-bold">
                        ₹{res.monthlyRent.toLocaleString("en-IN")}/mo
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                        Advance / Deposit
                      </span>
                      <span className="text-emerald-400 font-bold">
                        ₹{(res.advancePaid || 0).toLocaleString("en-IN")}{" "}
                        <span className="text-[10px] text-slate-400 font-normal">
                          / ₹{res.securityDeposit.toLocaleString("en-IN")}
                        </span>
                      </span>
                    </div>
                  </div>

                  {res.notes && (
                    <p className="text-xs text-slate-400 mt-3 italic line-clamp-2">
                      &quot;{res.notes}&quot;
                    </p>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${res.phone}`}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      title={`Call ${res.phone}`}
                    >
                      <Phone className="w-4 h-4 text-slate-300" />
                    </a>

                    <a
                      href={`https://wa.me/${res.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-500/20 transition"
                      title="Open WhatsApp chat"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>

                    {currentUser.role === "PARTNER_OWNER" && (
                      <button
                        onClick={() => handleDeleteResident(res.id, res.name)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition"
                        title="Delete Resident record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <Link
                    href={`/portal/payments?resident=${res.id}`}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-amber-400/50 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                    <span>Collect Rent</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredResidents.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">
              {residents.length === 0 ? "No residents registered yet" : "No residents match criteria"}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {residents.length === 0
                ? "Click 'Add New Resident' above to register your first resident with bed allocation and deposit."
                : "Try adjusting your search query or branch filter."}
            </p>
            {residents.length === 0 && (
              <button
                onClick={() => {
                  setFormData({
                    branchId: branches[0]?.id || "palayam",
                    name: "",
                    phone: "",
                    whatsapp: "",
                    roomNo: "",
                    bedNo: "A",
                    monthlyRent: 6500,
                    securityDeposit: 5000,
                    advancePaid: 5000,
                    admissionDate: new Date().toISOString().slice(0, 10),
                    status: "Active",
                    notes: "",
                  });
                  setShowAddModal(true);
                }}
                className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs hover:from-amber-400 hover:to-amber-500 transition shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add First Resident</span>
              </button>
            )}
          </div>
        )}
      </main>

      {/* Add Resident Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-400" />
              <span>Admit New Resident</span>
            </h2>
            <p className="text-xs text-slate-400 mb-5">
              Enter resident details, room assignment, and rent structure.
            </p>

            <form onSubmit={handleCreateResident} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Nair"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98471 23456"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="919847123456"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  PG Branch *
                </label>
                <select
                  value={formData.branchId}
                  onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.totalBeds} Beds)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Room Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.roomNo}
                    onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
                    placeholder="e.g. 101 or P-202"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Bed Identifier
                  </label>
                  <input
                    type="text"
                    value={formData.bedNo}
                    onChange={(e) => setFormData({ ...formData, bedNo: e.target.value })}
                    placeholder="e.g. Bed A / Single"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Monthly Rent (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.monthlyRent}
                    onChange={(e) => setFormData({ ...formData, monthlyRent: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Agreed Deposit (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.securityDeposit}
                    onChange={(e) => setFormData({ ...formData, securityDeposit: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-400 mb-1">
                  Advance Collected at Admission (₹)
                </label>
                <input
                  type="number"
                  value={formData.advancePaid}
                  onChange={(e) => setFormData({ ...formData, advancePaid: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-emerald-500/40 rounded-xl px-3.5 py-2 text-sm text-emerald-300 font-bold focus:outline-none focus:border-emerald-400"
                  placeholder="e.g. 4500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Date of Admission *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.admissionDate}
                    onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Occupancy Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Active">Active</option>
                    <option value="Notice">Notice Period</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Notes / Work Details
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Student at Sanskrit college / Working professional"
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
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-amber-400/20 transition cursor-pointer"
                >
                  Save Resident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
