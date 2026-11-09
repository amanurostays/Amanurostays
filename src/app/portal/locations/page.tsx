"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  Users,
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
} from "lucide-react";
import PortalNav from "@/components/portal/PortalNav";
import {
  OperationsStore,
  PGBranch,
  PortalUser,
} from "@/lib/operations-store";

export default function LocationsManagerPage() {
  const [currentUser, setCurrentUser] = useState<PortalUser>(() => OperationsStore.getCurrentUser());
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [branches, setBranches] = useState<PGBranch[]>([]);
  const [residents, setResidents] = useState(() => OperationsStore.getResidents("all"));

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState<PGBranch | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    locality: "",
    address: "",
    phone: "+91 6282830532",
    totalBeds: 45,
    status: "Active" as "Active" | "Coming Soon",
  });

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = () => {
    setBranches(OperationsStore.getBranches());
    setResidents(OperationsStore.getResidents("all"));
  };

  const handleSaveBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.locality) {
      alert("Please enter PG name and locality");
      return;
    }

    if (editingBranch) {
      // Update existing branch
      OperationsStore.updateBranch(editingBranch.id, {
        name: formData.name,
        locality: formData.locality,
        address: formData.address,
        phone: formData.phone,
        totalBeds: Number(formData.totalBeds),
        status: formData.status,
      });
      setEditingBranch(null);
    } else {
      // Add new branch
      OperationsStore.addBranch({
        name: formData.name.startsWith("Amanuro") ? formData.name : `Amanuro Stays - ${formData.name}`,
        locality: formData.locality,
        address: formData.address,
        phone: formData.phone,
        totalBeds: Number(formData.totalBeds),
        status: formData.status,
      });
    }

    setShowAddModal(false);
    setFormData({
      name: "",
      locality: "",
      address: "",
      phone: "+91 6282830532",
      totalBeds: 45,
      status: "Active",
    });
    loadBranches();
  };

  const handleOpenEdit = (branch: PGBranch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      locality: branch.locality,
      address: branch.address || "",
      phone: branch.phone || "+91 6282830532",
      totalBeds: branch.totalBeds,
      status: branch.status,
    });
    setShowAddModal(true);
  };

  const handleDeleteBranch = (id: string, name: string) => {
    const residentCount = residents.filter((r) => r.branchId === id).length;
    if (residentCount > 0) {
      if (
        !confirm(
          `Notice: There are ${residentCount} active resident records associated with ${name}. Deleting this branch may leave those residents unassigned. Continue?`
        )
      ) {
        return;
      }
    } else {
      if (!confirm(`Are you sure you want to remove ${name}?`)) {
        return;
      }
    }

    OperationsStore.deleteBranch(id);
    loadBranches();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <PortalNav
        selectedBranch={selectedBranch}
        onBranchChange={setSelectedBranch}
        currentUser={currentUser}
        onUserChange={setCurrentUser}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                Admin Property &amp; Capacity Control
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-amber-400" />
              <span>PG Locations &amp; Bed Capacity</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Add new PG branches, modify bed counts, or change location addresses anytime without editing code.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingBranch(null);
              setFormData({
                name: "",
                locality: "",
                address: "",
                phone: "+91 6282830532",
                totalBeds: 45,
                status: "Active",
              });
              setShowAddModal(true);
            }}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-amber-400/20 transition cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New PG Location</span>
          </button>
        </div>

        {/* PG Branch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {branches.map((b) => {
            const branchResidents = residents.filter((r) => r.branchId === b.id && r.status === "Active");
            const occupiedCount = branchResidents.length;
            const vacantCount = Math.max(0, b.totalBeds - occupiedCount);
            const occupancyPct = b.totalBeds > 0 ? Math.round((occupiedCount / b.totalBeds) * 100) : 0;

            return (
              <div
                key={b.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                        {b.locality}
                      </span>
                      <h3 className="font-bold text-lg text-white mt-1.5">{b.name}</h3>
                      {b.address && (
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{b.address}</span>
                        </p>
                      )}
                      {b.phone && (
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{b.phone}</span>
                        </p>
                      )}
                    </div>

                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                        b.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  {/* Bed Stats Meter */}
                  <div className="mt-5 p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Capacity &amp; Occupancy</span>
                      <span className="font-bold text-white">
                        {occupiedCount} / {b.totalBeds} Beds ({occupancyPct}%)
                      </span>
                    </div>

                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all"
                        style={{ width: `${Math.min(100, occupancyPct)}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>Occupied: <strong className="text-slate-200">{occupiedCount}</strong></span>
                      <span>Vacant: <strong className="text-emerald-400">{vacantCount}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 font-medium">
                    Branch ID: {b.id}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(b)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Edit Beds / Info</span>
                    </button>

                    <button
                      onClick={() => handleDeleteBranch(b.id, b.name)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition cursor-pointer"
                      title="Delete branch"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Add / Edit Branch Modal */}
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
              <Building2 className="w-5 h-5 text-amber-400" />
              <span>{editingBranch ? "Edit PG Branch Details" : "Add New PG Location"}</span>
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              {editingBranch
                ? "Update total bed count or contact details for this property."
                : "Create a new PG branch. It will immediately appear across all dropdowns and reports."}
            </p>

            <form onSubmit={handleSaveBranch} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  PG Branch Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Amanuro Stays - Kazhakkoottam Hub"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Locality / Area *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    placeholder="e.g. Technopark Phase 1"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Total Bed Count *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.totalBeds}
                    onChange={(e) => setFormData({ ...formData, totalBeds: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-bold text-amber-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Property Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Near Technopark Main Gate, Kazhakkoottam - 695582"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Contact Phone / Caretaker
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 6282830532"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Active">Active Property</option>
                    <option value="Coming Soon">Coming Soon / Expansion</option>
                  </select>
                </div>
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
                  {editingBranch ? "Save Changes" : "Create Branch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
