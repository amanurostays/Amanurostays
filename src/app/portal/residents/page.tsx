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
  ShieldCheck,
  Printer,
  Camera,
  LogOut,
  Calculator,
  ArrowRight,
  FileText,
  AlertTriangle,
  Clock,
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

  // Feature Modals
  const [policeModalResident, setPoliceModalResident] = useState<Resident | null>(null);
  const [noticeModalResident, setNoticeModalResident] = useState<Resident | null>(null);
  const [settlementResident, setSettlementResident] = useState<Resident | null>(null);
  const [photoViewerUrl, setPhotoViewerUrl] = useState<string | null>(null);
  const [upcomingVacancies, setUpcomingVacancies] = useState<ReturnType<typeof OperationsStore.getUpcomingVacancies>>([]);

  // Notice Form State
  const [noticeFormDate, setNoticeFormDate] = useState("");

  // Settlement Form State
  const [settlementForm, setSettlementForm] = useState({
    pendingRentDeduction: 0,
    maintenanceDeduction: 0,
    paymentMode: "UPI" as "UPI" | "Cash" | "Bank Transfer",
    notes: "Security deposit refunded via GPay after room inspection.",
  });

  // New Resident Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    branchId: "palayam-hub",
    roomNo: "",
    bedNo: "Bed A",
    admissionDate: "",
    monthlyRent: 6500,
    securityDeposit: 5000,
    advancePaid: 5000,
    status: "Active" as const,
    idType: "Aadhaar Card",
    idNumber: "",
    idProofUrl: "",
    permanentAddress: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    workplaceOrCollege: "",
    bloodGroup: "O+",
    notes: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      admissionDate: prev.admissionDate || new Date().toISOString().slice(0, 10),
    }));
    const d = new Date();
    d.setDate(d.getDate() + 30);
    setNoticeFormDate(d.toISOString().slice(0, 10));
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
    setUpcomingVacancies(OperationsStore.getUpcomingVacancies());
  };

  const handleBranchChange = (branchId: string) => {
    setSelectedBranch(branchId);
    loadResidents(branchId);
  };

  const handleUserChange = (user: PortalUser) => {
    setCurrentUser(user);
  };

  // Image Upload or Camera Capture
  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setFormData((prev) => ({ ...prev, idProofUrl: base64 }));
      };
      reader.readAsDataURL(file);
    }
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
      bedNo: formData.bedNo || "Bed A",
      admissionDate: formData.admissionDate || new Date().toISOString().slice(0, 10),
      monthlyRent: Number(formData.monthlyRent),
      securityDeposit: Number(formData.securityDeposit),
      advancePaid: Number(formData.advancePaid || 0),
      status: formData.status,
      idType: formData.idType,
      idNumber: formData.idNumber,
      idProofUrl: formData.idProofUrl,
      permanentAddress: formData.permanentAddress,
      emergencyContactName: formData.emergencyContactName,
      emergencyContactPhone: formData.emergencyContactPhone,
      workplaceOrCollege: formData.workplaceOrCollege,
      bloodGroup: formData.bloodGroup,
      notes: formData.notes,
      paymentStatus: Number(formData.advancePaid || 0) > 0 ? "Paid" : "Pending",
    });

    setShowAddModal(false);
    // Reset form
    setFormData({
      name: "",
      phone: "",
      whatsapp: "",
      branchId: selectedBranch !== "all" ? selectedBranch : "palayam-hub",
      roomNo: "",
      bedNo: "Bed A",
      admissionDate: new Date().toISOString().slice(0, 10),
      monthlyRent: 6500,
      securityDeposit: 5000,
      advancePaid: 5000,
      status: "Active",
      idType: "Aadhaar Card",
      idNumber: "",
      idProofUrl: "",
      permanentAddress: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      workplaceOrCollege: "",
      bloodGroup: "O+",
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

  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeModalResident) return;
    OperationsStore.markResidentNotice(noticeModalResident.id, noticeFormDate);
    setNoticeModalResident(null);
    loadResidents(selectedBranch);
    alert(`${noticeModalResident.name} marked on notice until ${noticeFormDate}.`);
  };

  const handleCancelNotice = (id: string) => {
    if (confirm("Cancel notice period and mark resident as Active again?")) {
      OperationsStore.cancelResidentNotice(id);
      loadResidents(selectedBranch);
    }
  };

  const handleExecuteSettlement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settlementResident) return;

    const depositHeld = Number(settlementResident.advancePaid || settlementResident.securityDeposit || 0);
    const totalDeductions = Number(settlementForm.pendingRentDeduction) + Number(settlementForm.maintenanceDeduction);
    const netRefund = Math.max(0, depositHeld - totalDeductions);

    OperationsStore.settleResidentDeposit({
      residentId: settlementResident.id,
      refundAmount: netRefund,
      deductionAmount: totalDeductions,
      notes: `Rent Deduction: ₹${settlementForm.pendingRentDeduction}, Repairs/Cleaning: ₹${settlementForm.maintenanceDeduction}. ${settlementForm.notes}`,
      paymentMode: settlementForm.paymentMode,
      recordedBy: currentUser.name,
    });

    setSettlementResident(null);
    loadResidents(selectedBranch);
    alert(`Settlement complete! Refund of ₹${netRefund} logged and resident marked as Checked Out.`);
  };

  const filteredResidents = residents.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery) ||
      (r.idNumber && r.idNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.roomNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "Notice" && r.onNotice) ||
      r.status === statusFilter ||
      r.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="portal-theme min-h-screen bg-slate-950 text-slate-100 antialiased">
      <PortalNav
        selectedBranch={selectedBranch}
        onBranchChange={handleBranchChange}
        currentUser={currentUser}
        onUserChange={handleUserChange}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Notice & Vacancy Warning Alert Banner (Feature B) */}
        {upcomingVacancies.length > 0 && (
          <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Upcoming Vacancies Alert ({upcomingVacancies.length} Beds)</span>
                  <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-2 py-0.2 rounded-full uppercase">
                    Notice Tracker
                  </span>
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 mt-1">
                  {upcomingVacancies.map((v) => (
                    <span key={v.resident.id}>
                      <strong>{v.resident.name}</strong> (Room {v.resident.roomNo}, {v.branch?.locality}) &mdash;{" "}
                      <span className="text-amber-400 font-bold">
                        {v.daysLeft > 0 ? `${v.daysLeft} days left` : "Vacating today"}
                      </span>{" "}
                      ({v.resident.expectedCheckoutDate})
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/portal/onboarding"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition shrink-0 self-end md:self-center"
            >
              <span>View Joinees &amp; Pre-Book Beds →</span>
            </Link>
          </div>
        )}

        {/* Title & Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">Resident Directory</h1>
              <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full font-bold">
                {residents.length} Registered
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Complete resident database, ID card scanning, Kerala Police verification forms, and deposit settlement.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const csv = OperationsStore.exportResidentsCSV(selectedBranch);
                const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `amanuro-residents-${selectedBranch}.csv`;
                a.click();
              }}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Resident</span>
            </button>
          </div>
        </div>

        {/* Filter Strip */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by Name, Room, Phone, Aadhaar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-center overflow-x-auto">
            {["all", "Active", "Notice", "Checked Out"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  statusFilter === st
                    ? "bg-slate-800 text-amber-400 border border-slate-700"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {st === "all" ? "All" : st}
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
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition group space-y-4"
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

                    <div className="text-right space-y-1">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border block ${
                          res.status === "Notice"
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                            : res.status === "Checked Out"
                            ? "bg-slate-800 text-slate-400 border-slate-700"
                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        }`}
                      >
                        {res.status === "Notice" ? "🚨 On Notice" : res.status}
                      </span>
                    </div>
                  </div>

                  {/* Room & Dates */}
                  <div className="grid grid-cols-2 gap-2 mt-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                        Room &amp; Bed
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
                        Deposit Held
                      </span>
                      <span className="text-emerald-400 font-bold">
                        ₹{(res.advancePaid || 0).toLocaleString("en-IN")}{" "}
                        <span className="text-[10px] text-slate-400 font-normal">
                          / ₹{res.securityDeposit.toLocaleString("en-IN")}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* ID Card & Verification Details */}
                  <div className="mt-2.5 p-2.5 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-semibold block">
                        {res.idType || "Govt ID Proof"}
                      </span>
                      <span className="text-slate-200 font-bold">
                        {res.idNumber || "Not recorded"}
                      </span>
                    </div>

                    {res.idProofUrl ? (
                      <button
                        onClick={() => setPhotoViewerUrl(res.idProofUrl!)}
                        className="bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition"
                      >
                        <Camera className="w-3 h-3" />
                        <span>View ID</span>
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-500 italic">No image</span>
                    )}
                  </div>

                  {/* Notice Vacating Alert */}
                  {res.onNotice && res.expectedCheckoutDate && (
                    <div className="mt-2 p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300 flex items-center justify-between">
                      <span>Vacating on: <strong>{res.expectedCheckoutDate}</strong></span>
                      <button
                        onClick={() => handleCancelNotice(res.id)}
                        className="text-[10px] text-slate-400 hover:text-white underline"
                      >
                        Cancel Notice
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="space-y-2 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between gap-1.5 text-xs">
                    {/* Kerala Police Form Export Button (Feature A) */}
                    <button
                      onClick={() => setPoliceModalResident(res)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition"
                      title="Generate Kerala Police Tenant Verification Form"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>Police Form</span>
                    </button>

                    {/* Notice Period Toggle (Feature B) */}
                    {res.status !== "Checked Out" && (
                      <button
                        onClick={() => setNoticeModalResident(res)}
                        className={`px-2.5 py-1.5 rounded-lg font-semibold transition ${
                          res.onNotice
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                        }`}
                      >
                        <span>{res.onNotice ? "Edit Notice" : "Mark Notice"}</span>
                      </button>
                    )}

                    {/* Deposit Settlement / Checkout (Feature C) */}
                    {res.status !== "Checked Out" && (
                      <button
                        onClick={() => {
                          setSettlementResident(res);
                          setSettlementForm({
                            pendingRentDeduction: 0,
                            maintenanceDeduction: 0,
                            paymentMode: "UPI",
                            notes: "Security deposit refunded via GPay after room handover.",
                          });
                        }}
                        className="bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 px-2.5 py-1.5 rounded-lg font-semibold transition flex items-center gap-1"
                        title="Calculate deposit refund and check out"
                      >
                        <Calculator className="w-3.5 h-3.5 text-rose-400" />
                        <span>Settle</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-1">
                      <a
                        href={`tel:${res.phone}`}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                        title={`Call ${res.phone}`}
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={`https://wa.me/${res.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-500/20 transition"
                        title="Open WhatsApp chat"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>

                      {currentUser.role === "PARTNER_OWNER" && (
                        <button
                          onClick={() => handleDeleteResident(res.id, res.name)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition"
                          title="Delete Resident record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <Link
                      href={`/portal/payments?resident=${res.id}`}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                      <span>Collect Rent</span>
                    </Link>
                  </div>
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
          </div>
        )}
      </main>

      {/* Feature A: Kerala Police Tenant Verification Form Modal (Printable) */}
      {policeModalResident && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative font-sans space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Government of Kerala • Police Department
                </span>
                <h2 className="text-lg font-black text-slate-900">
                  Tenant / Inmate Information Form
                </h2>
              </div>
              <button
                onClick={() => setPoliceModalResident(null)}
                className="text-slate-400 hover:text-slate-800 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2 flex-1">
                  <div>
                    <strong className="block text-slate-600">1. Name of Inmate:</strong>
                    <span className="text-sm font-bold text-slate-950 uppercase">{policeModalResident.name}</span>
                  </div>

                  <div>
                    <strong className="block text-slate-600">2. Contact Numbers:</strong>
                    <span>Phone: {policeModalResident.phone} | WhatsApp: {policeModalResident.whatsapp}</span>
                  </div>

                  <div>
                    <strong className="block text-slate-600">3. Identity Document:</strong>
                    <span className="font-bold">{policeModalResident.idType || "Aadhaar Card"}: {policeModalResident.idNumber || "Not Provided"}</span>
                  </div>

                  <div>
                    <strong className="block text-slate-600">4. Permanent Home Address:</strong>
                    <p className="italic text-slate-800">{policeModalResident.permanentAddress || "As per ID card address proof."}</p>
                  </div>
                </div>

                {/* ID Photo box */}
                <div className="w-28 h-32 border border-slate-300 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center text-center p-1 shrink-0">
                  {policeModalResident.idProofUrl ? (
                    <img src={policeModalResident.idProofUrl} alt="Photo" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-slate-400">Photo / ID Scan</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                <div>
                  <strong className="block text-slate-600">5. Workplace / Educational Institution:</strong>
                  <span>{policeModalResident.workplaceOrCollege || "Trivandrum"}</span>
                </div>
                <div>
                  <strong className="block text-slate-600">6. Emergency / Guardian Contact:</strong>
                  <span>{policeModalResident.emergencyContactName || "Parent"} ({policeModalResident.emergencyContactPhone || policeModalResident.phone})</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                <div>
                  <strong className="block text-slate-600">7. PG Accommodation Address:</strong>
                  <span className="font-semibold">{branches.find(b => b.id === policeModalResident.branchId)?.name || "Amanuro Stays"}</span>
                  <p className="text-[11px] text-slate-600">Room No: {policeModalResident.roomNo} ({policeModalResident.bedNo})</p>
                </div>
                <div>
                  <strong className="block text-slate-600">8. Admission Date:</strong>
                  <span>{policeModalResident.admissionDate}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 bg-slate-50 p-3 rounded-xl text-[11px] text-slate-600">
                <strong>Declaration by PG Owner / Caretaker:</strong><br />
                The information furnished above has been verified with government photo identity documents produced at admission.
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setPoliceModalResident(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg"
              >
                <Printer className="w-4 h-4" />
                <span>Print Police Verification Form</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feature B: Mark Notice Period Modal */}
      {noticeModalResident && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>Notice Period: {noticeModalResident.name}</span>
              </h3>
              <button onClick={() => setNoticeModalResident(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Set the resident&apos;s planned departure date. This will alert your marketing &amp; admissions desk so the upcoming vacant bed can be pre-booked.
            </p>

            <form onSubmit={handleSaveNotice} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Expected Checkout Date *
                </label>
                <input
                  type="date"
                  required
                  value={noticeFormDate}
                  onChange={(e) => setNoticeFormDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-amber-300 font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Security Deposit Held</span>
                <span className="text-emerald-400 font-bold text-sm">
                  ₹{(noticeModalResident.advancePaid || noticeModalResident.securityDeposit || 0).toLocaleString("en-IN")}
                </span>
                <p className="text-[11px] text-slate-400">
                  Deductions for pending rent or damages can be calculated on checkout day.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNoticeModalResident(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl shadow-lg"
                >
                  Confirm Notice Period
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feature C: Deposit Refund & Settlement Calculator Modal */}
      {settlementResident && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-rose-400" />
                <span>Security Deposit Settlement</span>
              </h3>
              <button onClick={() => setSettlementResident(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Checkout settlement for <strong>{settlementResident.name}</strong> (Room {settlementResident.roomNo}). Calculate deductions and record net refund.
            </p>

            <form onSubmit={handleExecuteSettlement} className="space-y-3.5 text-xs">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
                <span className="text-slate-400 font-medium">Initial Security Deposit Collected:</span>
                <span className="text-base font-black text-emerald-400">
                  ₹{(settlementResident.advancePaid || settlementResident.securityDeposit || 0).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Deduct Pending Rent (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={settlementForm.pendingRentDeduction}
                    onChange={(e) => setSettlementForm({ ...settlementForm, pendingRentDeduction: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-rose-400 font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Deduct Repairs / Cleaning (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={settlementForm.maintenanceDeduction}
                    onChange={(e) => setSettlementForm({ ...settlementForm, maintenanceDeduction: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-rose-400 font-bold focus:outline-none"
                  />
                </div>
              </div>

              {/* Net Refund Calculation */}
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-400 block">Net Refund Amount to Pay</span>
                  <span className="text-[11px] text-slate-400">
                    Deposit Held &minus; Total Deductions (₹{settlementForm.pendingRentDeduction + settlementForm.maintenanceDeduction})
                  </span>
                </div>
                <div className="text-xl font-black text-emerald-300">
                  ₹{Math.max(
                    0,
                    Number(settlementResident.advancePaid || settlementResident.securityDeposit || 0) -
                      (settlementForm.pendingRentDeduction + settlementForm.maintenanceDeduction)
                  ).toLocaleString("en-IN")}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Refund Payment Mode
                  </label>
                  <select
                    value={settlementForm.paymentMode}
                    onChange={(e) => setSettlementForm({ ...settlementForm, paymentMode: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none"
                  >
                    <option value="UPI">UPI (GPay / PhonePe)</option>
                    <option value="Cash">Cash Handover</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Settlement Notes
                  </label>
                  <input
                    type="text"
                    value={settlementForm.notes}
                    onChange={(e) => setSettlementForm({ ...settlementForm, notes: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSettlementResident(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-lg cursor-pointer"
                >
                  Execute Refund &amp; Check Out
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Photo Viewer Modal */}
      {photoViewerUrl && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl">
            <button
              onClick={() => setPhotoViewerUrl(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold text-white mb-3">Resident Scanned ID Proof</h3>
            <div className="relative w-full max-h-[75vh] overflow-hidden rounded-2xl">
              <img src={photoViewerUrl} alt="ID Proof" className="w-full h-auto object-contain rounded-2xl" />
            </div>
          </div>
        </div>
      )}

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
              Enter resident details, ID proof, room assignment, and rent structure.
            </p>

            <form onSubmit={handleCreateResident} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
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
                  <label className="block font-semibold text-slate-300 mb-1">
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
                  <label className="block font-semibold text-slate-300 mb-1">
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
                <label className="block font-semibold text-slate-300 mb-1">
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
                  <label className="block font-semibold text-slate-300 mb-1">
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
                  <label className="block font-semibold text-slate-300 mb-1">
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

              {/* ID Scan & Type */}
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  Government ID Card Verification
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">ID Document</label>
                    <select
                      value={formData.idType}
                      onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    >
                      <option value="Aadhaar Card">Aadhaar Card</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Passport">Passport</option>
                      <option value="Voter ID">Voter ID</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">ID Number</label>
                    <input
                      type="text"
                      placeholder="e.g. Aadhaar 12-digit"
                      value={formData.idNumber}
                      onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Snap / Upload ID Photo</label>
                  <div className="flex items-center gap-2">
                    <label className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-amber-400" />
                      <span>{formData.idProofUrl ? "Photo Attached ✓" : "Snap / Upload ID"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageCapture}
                        className="hidden"
                      />
                    </label>
                    {formData.idProofUrl && (
                      <span className="text-[11px] text-emerald-400 font-semibold">Image loaded</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
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
                  <label className="block font-semibold text-slate-300 mb-1">
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
                <label className="block font-semibold text-emerald-400 mb-1">
                  Advance Collected at Admission (₹)
                </label>
                <input
                  type="number"
                  value={formData.advancePaid}
                  onChange={(e) => setFormData({ ...formData, advancePaid: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-emerald-500/40 rounded-xl px-3.5 py-2 text-sm text-emerald-300 font-bold focus:outline-none focus:border-emerald-400"
                  placeholder="e.g. 5000"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
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
                  <label className="block font-semibold text-slate-300 mb-1">
                    Workplace / College
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UST, Infosys"
                    value={formData.workplaceOrCollege}
                    onChange={(e) => setFormData({ ...formData, workplaceOrCollege: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Permanent Address
                </label>
                <input
                  type="text"
                  placeholder="House name, district, state & PIN"
                  value={formData.permanentAddress}
                  onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition cursor-pointer"
                >
                  Confirm &amp; Admit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
