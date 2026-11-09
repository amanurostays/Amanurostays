"use client";

import React, { useState, useEffect } from "react";
import {
  KeyRound,
  Plus,
  Edit2,
  Trash2,
  Shield,
  UserCheck,
  Building2,
  Lock,
  Eye,
  EyeOff,
  X,
  CheckCircle,
} from "lucide-react";
import PortalNav from "@/components/portal/PortalNav";
import {
  OperationsStore,
  PortalUser,
  PGBranch,
} from "@/lib/operations-store";

export default function UsersManagerPage() {
  const [currentUser, setCurrentUser] = useState<PortalUser>(() => OperationsStore.getCurrentUser());
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [users, setUsers] = useState<PortalUser[]>([]);
  const [branches, setBranches] = useState<PGBranch[]>([]);

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<PortalUser | null>(null);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  // Form State
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "STAFF_CARETAKER" as "PARTNER_OWNER" | "STAFF_CARETAKER",
    assignedBranchId: "palayam-hub",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setUsers(OperationsStore.getUsers());
    setBranches(OperationsStore.getBranches());
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.name) {
      alert("Username, Name, and Password are required");
      return;
    }

    if (editingUser) {
      OperationsStore.updateUser(editingUser.id, {
        username: formData.username,
        name: formData.name,
        email: formData.email || `${formData.username}@amanuro.in`,
        password: formData.password,
        role: formData.role,
        assignedBranchId: formData.role === "STAFF_CARETAKER" ? formData.assignedBranchId : undefined,
      });
      setEditingUser(null);
    } else {
      OperationsStore.addUser({
        username: formData.username,
        name: formData.name,
        email: formData.email || `${formData.username}@amanuro.in`,
        password: formData.password,
        role: formData.role,
        assignedBranchId: formData.role === "STAFF_CARETAKER" ? formData.assignedBranchId : undefined,
      });
    }

    setShowModal(false);
    setFormData({
      username: "",
      name: "",
      email: "",
      password: "",
      role: "STAFF_CARETAKER",
      assignedBranchId: "palayam-hub",
    });
    loadData();
  };

  const handleOpenEdit = (user: PortalUser) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      name: user.name,
      email: user.email,
      password: user.password || "staff123",
      role: user.role,
      assignedBranchId: user.assignedBranchId || "palayam-hub",
    });
    setShowModal(true);
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete access for ${name}?`)) {
      OperationsStore.deleteUser(id);
      loadData();
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
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
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                Access &amp; Security Control
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
              <KeyRound className="w-6 h-6 text-purple-400" />
              <span>User IDs &amp; Passwords Management</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Create separate logins for caretakers/staff and partners. Manage passwords and branch permissions directly.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingUser(null);
              setFormData({
                username: "",
                name: "",
                email: "",
                password: "staff" + Math.floor(100 + Math.random() * 900),
                role: "STAFF_CARETAKER",
                assignedBranchId: "palayam-hub",
              });
              setShowModal(true);
            }}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-purple-600/20 transition cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Staff Login</span>
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 font-semibold">User / Staff Name</th>
                  <th className="py-3.5 px-4 font-semibold">Login User ID</th>
                  <th className="py-3.5 px-4 font-semibold">Role</th>
                  <th className="py-3.5 px-4 font-semibold">Assigned PG Branch</th>
                  <th className="py-3.5 px-4 font-semibold">Password</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map((u) => {
                  const branchObj = branches.find((b) => b.id === u.assignedBranchId);
                  const branchLabel = u.role === "PARTNER_OWNER" ? "All PG Branches (Full Access)" : branchObj?.name.replace("Amanuro Stays - ", "") || "Unassigned";
                  const isVisible = showPasswords[u.id];

                  return (
                    <tr key={u.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{u.name}</div>
                        <div className="text-[11px] text-slate-400">{u.email}</div>
                      </td>

                      <td className="py-3 px-4 font-semibold text-amber-300 tracking-wide">
                        {u.username}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            u.role === "PARTNER_OWNER"
                              ? "bg-purple-500/10 text-purple-300 border-purple-500/30"
                              : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          }`}
                        >
                          {u.role === "PARTNER_OWNER" ? (
                            <>
                              <Shield className="w-3 h-3" />
                              <span>Admin / Partner</span>
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-3 h-3" />
                              <span>Staff / Caretaker</span>
                            </>
                          )}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-300">{branchLabel}</td>

                      <td className="py-3 px-4 text-slate-200">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold tracking-wide">
                            {isVisible ? u.password : "••••••••"}
                          </span>
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(u.id)}
                            className="text-slate-500 hover:text-slate-300 p-0.5"
                            title={isVisible ? "Hide" : "Show"}
                          >
                            {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(u)}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3 text-amber-400" />
                            <span>Edit</span>
                          </button>

                          {u.username !== "admin" && (
                            <button
                              onClick={() => handleDeleteUser(u.id, u.name)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition cursor-pointer"
                              title="Delete user"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Instructions Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2 text-xs text-slate-400">
          <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>How Staff &amp; Partners Log In</span>
          </h4>
          <p>
            When staff or partners visit <code>/portal</code>, they enter their designated <strong>User ID</strong> and <strong>Password</strong>. Staff are automatically routed to their assigned PG with quick entry mode; Partners have full administrative access.
          </p>
        </div>
      </main>

      {/* Add / Edit User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-purple-400" />
              <span>{editingUser ? "Edit Account / Password" : "Create New Login"}</span>
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Set credentials and assign PG branch permissions.
            </p>

            <form onSubmit={handleSaveUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name / Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sunil (Palayam Warden)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Login User ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="e.g. palayam.staff"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-medium text-amber-300 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Password *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="e.g. staff123"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="STAFF_CARETAKER">Staff / Caretaker (Restricted to assigned PG)</option>
                  <option value="PARTNER_OWNER">Partner / Owner (Full Access to all PGs)</option>
                </select>
              </div>

              {formData.role === "STAFF_CARETAKER" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Assigned PG Branch
                  </label>
                  <select
                    value={formData.assignedBranchId}
                    onChange={(e) => setFormData({ ...formData, assignedBranchId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-purple-600/20 transition cursor-pointer"
                >
                  Save Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
