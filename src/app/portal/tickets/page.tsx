"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Wrench,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  MessageCircle,
  Building2,
  Trash2,
  Receipt,
  ExternalLink,
  QrCode,
  Copy,
  Check,
  Camera,
  X,
  Phone,
  AlertTriangle,
} from "lucide-react";
import PortalNav from "@/components/portal/PortalNav";
import {
  OperationsStore,
  PGBranch,
  MaintenanceTicket,
  TicketCategory,
  PortalUser,
} from "@/lib/operations-store";

export default function TicketsPage() {
  const [currentUser, setCurrentUser] = useState<PortalUser>(() =>
    OperationsStore.getCurrentUser()
  );
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [branches, setBranches] = useState<PGBranch[]>([]);
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([]);

  // Modals
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);
  const [showExpenseModal, setShowExpenseModal] = useState<MaintenanceTicket | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Expense Conversion Form
  const [expenseForm, setExpenseForm] = useState({
    cost: 350,
    paidTo: "Local Plumber / Electrician",
    description: "",
  });

  useEffect(() => {
    setBranches(OperationsStore.getBranches());
    if (currentUser.role === "STAFF_CARETAKER" && currentUser.assignedBranchId) {
      setSelectedBranch(currentUser.assignedBranchId);
      loadTickets(currentUser.assignedBranchId);
    } else {
      loadTickets(selectedBranch);
    }
  }, [selectedBranch, currentUser]);

  const loadTickets = (branch: string) => {
    setTickets(OperationsStore.getTickets(branch));
  };

  const handleBranchChange = (branchId: string) => {
    setSelectedBranch(branchId);
    loadTickets(branchId);
  };

  const handleStatusChange = (ticketId: string, newStatus: MaintenanceTicket["status"]) => {
    OperationsStore.updateTicket(ticketId, {
      status: newStatus,
      resolvedDate: newStatus === "Resolved" ? new Date().toISOString().slice(0, 10) : undefined,
    });
    loadTickets(selectedBranch);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this maintenance ticket record?")) {
      OperationsStore.deleteTicket(id);
      loadTickets(selectedBranch);
    }
  };

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showExpenseModal) return;

    OperationsStore.convertTicketToExpense({
      ticketId: showExpenseModal.id,
      cost: Number(expenseForm.cost),
      paidTo: expenseForm.paidTo.trim(),
      description: expenseForm.description.trim() || showExpenseModal.description,
      recordedBy: currentUser.name,
    });

    setShowExpenseModal(null);
    loadTickets(selectedBranch);
    alert(`₹${expenseForm.cost} expense successfully logged into Expense Ledger!`);
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      t.id.toLowerCase().includes(q) ||
      t.roomNo.toLowerCase().includes(q) ||
      t.residentName.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const reportedCount = tickets.filter((t) => t.status === "Reported").length;
  const inProgressCount = tickets.filter((t) => t.status === "In Progress").length;
  const resolvedCount = tickets.filter((t) => t.status === "Resolved").length;

  const getWhatsAppResolutionUrl = (ticket: MaintenanceTicket) => {
    const msg = encodeURIComponent(
      `Hi ${ticket.residentName}, your maintenance request #${ticket.id} (${ticket.category}, Room ${ticket.roomNo}) has been RESOLVED by the Amanuro Stays team. Please check and let us know if you need anything else. Thank you!`
    );
    const cleanPhone = ticket.residentPhone.replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  const publicHelpUrl = typeof window !== "undefined" ? `${window.location.origin}/help` : "https://amanuro.in/help";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicHelpUrl);
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
              <h1 className="text-xl sm:text-2xl font-black text-white">Tickets &amp; Complaints Desk</h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {reportedCount} Pending
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Live maintenance tracking from residents. Resolve issues and link repair expenses with 1 click.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQrModal(true)}
              className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>Room QR &amp; Public Link</span>
            </button>

            <Link
              href="/help"
              target="_blank"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-amber-500/20"
            >
              <span>+ Open Public Form</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <span className="text-slate-400 text-[11px] block font-semibold uppercase">Total Logged</span>
            <span className="text-xl font-black text-white">{tickets.length}</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <span className="text-amber-400 text-[11px] block font-semibold uppercase">Reported / Open</span>
            <span className="text-xl font-black text-amber-400">{reportedCount}</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <span className="text-blue-400 text-[11px] block font-semibold uppercase">In Progress</span>
            <span className="text-xl font-black text-blue-400">{inProgressCount}</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <span className="text-emerald-400 text-[11px] block font-semibold uppercase">Resolved</span>
            <span className="text-xl font-black text-emerald-400">{resolvedCount}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by Room, Ticket #, Resident, Issue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-center overflow-x-auto">
            {["all", "Reported", "In Progress", "Resolved"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
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

        {/* Tickets Table / List */}
        <div className="space-y-3">
          {filteredTickets.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-2">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">All Clear! No Active Complaints</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No tickets match the selected filters. Residents can submit issues via <strong>amanuro.in/help</strong>.
              </p>
            </div>
          ) : (
            filteredTickets.map((t) => {
              const branchObj = branches.find((b) => b.id === t.branchId);
              const branchLabel = branchObj?.locality || t.branchId;

              return (
                <div
                  key={t.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-lg transition space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-black text-amber-300 text-sm">#{t.id}</span>
                      <span className="text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded-md">
                        Room {t.roomNo} ({t.bedNo || "Bed A"})
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{branchLabel}</span>
                      </span>
                      {t.urgency === "Urgent" && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          🚨 Urgent
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <select
                        value={t.status}
                        onChange={(e) => handleStatusChange(t.id, e.target.value as any)}
                        className={`text-xs font-bold px-3 py-1 rounded-xl border focus:outline-none cursor-pointer ${
                          t.status === "Resolved"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : t.status === "In Progress"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        }`}
                      >
                        <option value="Reported">🟡 Reported</option>
                        <option value="In Progress">🔵 In Progress</option>
                        <option value="Resolved">🟢 Resolved</option>
                      </select>

                      <button
                        onClick={() => handleDelete(t.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition"
                        title="Delete Ticket"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="md:col-span-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-semibold">Category:</span>
                        <span className="bg-slate-950 border border-slate-800 px-2.5 py-0.5 rounded-md text-slate-200 font-semibold">
                          {t.category}
                        </span>
                      </div>

                      <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 text-slate-300">
                        &quot;{t.description}&quot;
                      </div>

                      {t.resolutionNotes && (
                        <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-2.5 text-emerald-300 text-xs">
                          <strong>Resolution:</strong> {t.resolutionNotes}
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 space-y-2 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="text-slate-500 uppercase tracking-wider text-[10px] block font-semibold">
                          Reported By
                        </span>
                        <div className="font-bold text-white text-sm">{t.residentName}</div>
                        <div className="text-slate-400 font-medium">{t.residentPhone}</div>
                        <div className="text-[11px] text-slate-500">
                          {t.reportedDate} {t.reportedTime ? `• ${t.reportedTime}` : ""}
                        </div>
                      </div>

                      {t.photoUrl && (
                        <button
                          onClick={() => setActivePhotoModal(t.photoUrl!)}
                          className="w-full mt-2 inline-flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-2 rounded-lg text-xs font-semibold transition"
                        >
                          <Camera className="w-3.5 h-3.5 text-amber-400" />
                          <span>View Problem Photo</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      {/* WhatsApp Notify */}
                      <a
                        href={getWhatsAppResolutionUrl(t)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/20 px-3 py-1.5 rounded-lg font-semibold transition"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Notify Resident on WhatsApp</span>
                      </a>

                      <a
                        href={`tel:${t.residentPhone}`}
                        className="inline-flex items-center gap-1 text-slate-400 hover:text-white px-2 py-1.5 rounded-lg bg-slate-800/60"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>
                    </div>

                    {/* Convert to Expense Button */}
                    <button
                      onClick={() => {
                        setShowExpenseModal(t);
                        setExpenseForm({
                          cost: t.repairCost || 350,
                          paidTo: "Local Technician",
                          description: `[Ticket #${t.id}] Room ${t.roomNo} ${t.category}`,
                        });
                      }}
                      className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-rose-950/60 text-slate-200 hover:text-rose-300 border border-slate-700 hover:border-rose-500/30 px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer"
                    >
                      <Receipt className="w-3.5 h-3.5 text-rose-400" />
                      <span>{t.expenseId ? "Expense Recorded ✓" : "+ Add to Branch Expenses"}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

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
            <h3 className="text-sm font-bold text-white mb-3">Resident Attached Photo</h3>
            <div className="relative w-full max-h-[75vh] overflow-hidden rounded-2xl">
              <img src={activePhotoModal} alt="Complaint Photo" className="w-full h-auto object-contain rounded-2xl" />
            </div>
          </div>
        </div>
      )}

      {/* Convert to Expense Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-rose-400" />
                <h3 className="font-bold text-base text-white">Log Repair Cost as Expense</h3>
              </div>
              <button onClick={() => setShowExpenseModal(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Record repair costs for <strong>Ticket #{showExpenseModal.id}</strong> (Room {showExpenseModal.roomNo}). This will automatically create an entry under <em>Maintenance &amp; Repairs</em> in your Expense Ledger.
            </p>

            <form onSubmit={handleSaveExpense} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Repair Amount (₹) *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={expenseForm.cost}
                  onChange={(e) => setExpenseForm({ ...expenseForm, cost: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-rose-400 font-bold focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Paid To / Vendor / Technician Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Electrician Babu, Hardware store"
                  value={expenseForm.paidTo}
                  onChange={(e) => setExpenseForm({ ...expenseForm, paidTo: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Description / Parts Replaced
                </label>
                <input
                  type="text"
                  placeholder="e.g. Replaced geyser heating coil and switch"
                  value={expenseForm.description}
                  onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowExpenseModal(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold px-4 py-2 rounded-xl transition shadow-lg cursor-pointer"
                >
                  Save to Expenses &amp; Mark Resolved
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code & Share Link Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 text-center">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <QrCode className="w-5 h-5 text-amber-400" />
                <span>Room QR Code &amp; Public Link</span>
              </h3>
              <button onClick={() => setShowQrModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Share this link with residents or print QR stickers to paste on room doors and common area notice boards:
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-2 text-xs">
              <span className="font-bold text-amber-300 truncate">{publicHelpUrl}</span>
              <button
                onClick={handleCopyLink}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-3 py-1.5 rounded-xl transition shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
              </button>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-2xl p-4 text-xs text-emerald-300 text-left space-y-1">
              <strong className="block text-emerald-400">💡 Pro Tip for Wardens:</strong>
              <p>Residents can also append their room number (e.g. <code>amanuro.in/help?room=204</code>) to prefill the room number automatically!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
