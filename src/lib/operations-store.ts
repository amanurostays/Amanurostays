// Amanuro Operations Store & Supabase Data Layer

export type UserRole = "PARTNER_OWNER" | "STAFF_CARETAKER";

export interface PortalUser {
  id: string;
  username: string; // e.g. "admin", "palayam.staff"
  email: string;
  password?: string; // Stored password / PIN
  name: string;
  role: UserRole;
  assignedBranchId?: string; // Optional for staff
}

export interface PGBranch {
  id: string;
  name: string;
  locality: string;
  address?: string;
  phone?: string;
  totalBeds: number;
  status: "Active" | "Coming Soon";
}

export interface Resident {
  id: string;
  branchId: string;
  name: string;
  phone: string;
  whatsapp: string;
  roomNo: string;
  bedNo: string;
  admissionDate: string; // YYYY-MM-DD
  monthlyRent: number;
  securityDeposit: number; // Agreed advance/deposit
  advancePaid: number; // Actual advance collected
  advanceStatus?: "Paid" | "Partial" | "Pending" | "Refunded" | "Adjusted";
  advanceDate?: string;
  status: "Active" | "Notice" | "Checked Out";
  idProofUrl?: string; // photo/scan of ID card
  idType?: string; // e.g. "Aadhaar Card", "Driving License", "Passport", "Voter ID"
  idNumber?: string; // e.g. "9876 5432 1098"
  permanentAddress?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  workplaceOrCollege?: string;
  bloodGroup?: string;
  onNotice?: boolean;
  noticeDate?: string;
  expectedCheckoutDate?: string;
  depositRefunded?: number;
  depositDeductions?: number;
  depositSettlementDate?: string;
  depositSettlementNotes?: string;
  notes?: string;
  lastPaymentDate?: string;
  lastPaidMonth?: string;
  paymentStatus?: "Paid" | "Pending" | "Overdue";
}

export type TicketCategory =
  | "Wi-Fi & Internet"
  | "Plumbing & Water"
  | "Electrical & Geyser"
  | "Room & Bathroom Cleaning"
  | "Bed, Furniture & Lock"
  | "Noise, Common Area & Others";

export interface MaintenanceTicket {
  id: string; // e.g. "TKT-1042"
  branchId: string;
  roomNo: string;
  bedNo?: string;
  residentName: string;
  residentPhone: string;
  category: TicketCategory;
  urgency: "Normal" | "Urgent";
  description: string;
  photoUrl?: string;
  status: "Reported" | "In Progress" | "Resolved";
  reportedDate: string; // YYYY-MM-DD
  reportedTime?: string;
  assignedTo?: string;
  resolvedDate?: string;
  repairCost?: number;
  resolutionNotes?: string;
  expenseId?: string;
}

export interface OnboardingApplication {
  id: string; // e.g. "APP-8291"
  branchId: string;
  name: string;
  phone: string;
  whatsapp: string;
  permanentAddress: string;
  workplaceOrCollege: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  bloodGroup?: string;
  idType: "Aadhaar Card" | "Driving License" | "Passport" | "Voter ID";
  idNumber: string;
  idPhotoUrl?: string;
  roomPreference?: string;
  plannedMoveInDate: string;
  status: "Pending Review" | "Approved" | "Declined";
  submittedAt: string;
  assignedRoomNo?: string;
  assignedBedNo?: string;
  monthlyRent?: number;
  securityDeposit?: number;
  advancePaid?: number;
  notes?: string;
}

export interface RentPayment {
  id: string;
  residentId: string;
  residentName: string;
  branchId: string;
  amount: number;
  paymentDate: string;
  monthFor: string;
  paymentMode: "UPI" | "Cash" | "Bank Transfer";
  transactionRef?: string;
  notes?: string;
  recordedBy?: string;
}

export interface AdvanceRecord {
  id: string;
  residentId: string;
  residentName: string;
  branchId: string;
  type: "COLLECTED" | "REFUNDED" | "ADJUSTED_TO_RENT";
  amount: number;
  date: string;
  paymentMode: "UPI" | "Cash" | "Bank Transfer";
  transactionRef?: string;
  notes?: string;
  recordedBy?: string;
}

export const EXPENSE_CATEGORIES = [
  "Mess & Groceries",
  "Electricity (KSEB)",
  "Water & Sanitation",
  "Maintenance & Repairs",
  "Building Rent / Lease",
  "Staff Salaries",
  "WiFi & Internet",
  "Housekeeping & Waste",
  "Miscellaneous",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export interface Expense {
  id: string;
  branchId: string;
  category: ExpenseCategory;
  amount: number;
  expenseDate: string;
  paidTo: string;
  description: string;
  receiptUrl?: string;
  recordedBy?: string;
}

export const INITIAL_BRANCHES: PGBranch[] = [
  {
    id: "palayam-hub",
    name: "Amanuro Stays - Palayam Hub",
    locality: "Palayam Hub",
    address: "Palayam, Thiruvananthapuram, Kerala - 695034",
    phone: "+91 6282830532",
    totalBeds: 50,
    status: "Active",
  },
  {
    id: "pattom-hub",
    name: "Amanuro Stays - Pattom Hub",
    locality: "Pattom Hub",
    address: "Pattom Hub, Thiruvananthapuram, Kerala - 695004",
    phone: "+91 6282830532",
    totalBeds: 45,
    status: "Active",
  },
  {
    id: "vellayambalam-hub",
    name: "Amanuro Stays - Vellayambalam Hub",
    locality: "Vellayambalam Hub",
    address: "Vellayambalam Hub, Thiruvananthapuram - 695010",
    phone: "+91 6282830532",
    totalBeds: 45,
    status: "Active",
  },
  {
    id: "sasthamangalam-hub",
    name: "Amanuro Stays - Sasthamangalam Hub",
    locality: "Sasthamangalam Hub",
    address: "Sasthamangalam Hub, Thiruvananthapuram - 695010",
    phone: "+91 6282830532",
    totalBeds: 40,
    status: "Active",
  },
];

export const INITIAL_USERS: PortalUser[] = [
  {
    id: "user-admin",
    username: "admin",
    email: "admin@amanuro.in",
    password: "admin@amanuro",
    name: "Amanuro Managing Partner",
    role: "PARTNER_OWNER",
  },
  {
    id: "user-staff-palayam",
    username: "palayam.staff",
    email: "palayam.staff@amanuro.in",
    password: "staff123",
    name: "Sunil (Palayam Warden)",
    role: "STAFF_CARETAKER",
    assignedBranchId: "palayam-hub",
  },
  {
    id: "user-staff-pattom",
    username: "pattom.staff",
    email: "pattom.staff@amanuro.in",
    password: "staff123",
    name: "Manoj (Pattom Caretaker)",
    role: "STAFF_CARETAKER",
    assignedBranchId: "pattom-hub",
  },
  {
    id: "user-staff-vellayambalam",
    username: "vellayambalam.staff",
    email: "vellayambalam.staff@amanuro.in",
    password: "staff123",
    name: "Praveen (Vellayambalam Staff)",
    role: "STAFF_CARETAKER",
    assignedBranchId: "vellayambalam-hub",
  },
  {
    id: "user-staff-sasthamangalam",
    username: "sasthamangalam.staff",
    email: "sasthamangalam.staff@amanuro.in",
    password: "staff123",
    name: "Rajesh (Sasthamangalam Warden)",
    role: "STAFF_CARETAKER",
    assignedBranchId: "sasthamangalam-hub",
  },
];

const INITIAL_RESIDENTS: Resident[] = [];

const INITIAL_PAYMENTS: RentPayment[] = [];

const INITIAL_ADVANCES: AdvanceRecord[] = [];

const INITIAL_EXPENSES: Expense[] = [];

const STORAGE_KEYS = {
  USER: "amanuro_portal_user",
  USERS_LIST: "amanuro_users_list",
  BRANCHES: "amanuro_branches",
  RESIDENTS: "amanuro_residents",
  PAYMENTS: "amanuro_payments",
  ADVANCES: "amanuro_advances",
  EXPENSES: "amanuro_expenses",
  TICKETS: "amanuro_tickets",
  ONBOARDING: "amanuro_onboarding",
};

export class OperationsStore {
  static isClient(): boolean {
    return typeof window !== "undefined";
  }

  static checkStorageVersion(): void {
    if (!this.isClient()) return;
    const currentVer = localStorage.getItem("amanuro_store_version");
    if (currentVer !== "v2_empty_clean") {
      localStorage.removeItem(STORAGE_KEYS.RESIDENTS);
      localStorage.removeItem(STORAGE_KEYS.PAYMENTS);
      localStorage.removeItem(STORAGE_KEYS.ADVANCES);
      localStorage.removeItem(STORAGE_KEYS.EXPENSES);
      localStorage.setItem("amanuro_store_version", "v2_empty_clean");
    }
  }

  // --- Dynamic PG Branches Management ---
  static getBranches(): PGBranch[] {
    if (!this.isClient()) return INITIAL_BRANCHES;
    const data = localStorage.getItem(STORAGE_KEYS.BRANCHES);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEYS.BRANCHES, JSON.stringify(INITIAL_BRANCHES));
    return INITIAL_BRANCHES;
  }

  static addBranch(branch: Omit<PGBranch, "id"> & { id?: string }): PGBranch {
    const list = this.getBranches();
    const slug =
      branch.id ||
      branch.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    const newBranch: PGBranch = {
      id: slug || `pg-${Date.now()}`,
      name: branch.name,
      locality: branch.locality,
      address: branch.address || "",
      phone: branch.phone || "+91 6282830532",
      totalBeds: Number(branch.totalBeds) || 40,
      status: branch.status || "Active",
    };

    list.push(newBranch);
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.BRANCHES, JSON.stringify(list));
    }
    return newBranch;
  }

  static updateBranch(id: string, updates: Partial<PGBranch>): PGBranch | null {
    const list = this.getBranches();
    const index = list.findIndex((b) => b.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updates };
      if (this.isClient()) {
        localStorage.setItem(STORAGE_KEYS.BRANCHES, JSON.stringify(list));
      }
      return list[index];
    }
    return null;
  }

  static deleteBranch(id: string): void {
    const list = this.getBranches().filter((b) => b.id !== id);
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.BRANCHES, JSON.stringify(list));
    }
  }

  // --- User Accounts & Authentication ---
  static getUsers(): PortalUser[] {
    if (!this.isClient()) return INITIAL_USERS;
    const data = localStorage.getItem(STORAGE_KEYS.USERS_LIST);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  }

  static authenticate(loginId: string, passwordAttempt: string): PortalUser | null {
    const cleanId = loginId.trim().toLowerCase();
    const cleanPass = passwordAttempt.trim();

    const users = this.getUsers();
    const matched = users.find(
      (u) =>
        u.username.toLowerCase() === cleanId ||
        u.email.toLowerCase() === cleanId
    );

    if (matched) {
      // If password matches or is default
      if (!matched.password || matched.password === cleanPass) {
        this.setCurrentUser(matched);
        return matched;
      }
    }
    return null;
  }

  static addUser(user: Omit<PortalUser, "id">): PortalUser {
    const list = this.getUsers();
    const newUser: PortalUser = {
      ...user,
      id: "user-" + Date.now(),
      username: user.username.trim().toLowerCase(),
    };
    list.push(newUser);
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(list));
    }
    return newUser;
  }

  static updateUser(id: string, updates: Partial<PortalUser>): void {
    const list = this.getUsers();
    const index = list.findIndex((u) => u.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updates };
      if (this.isClient()) {
        localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(list));
      }
    }
  }

  static deleteUser(id: string): void {
    const list = this.getUsers().filter((u) => u.id !== id);
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(list));
    }
  }

  static getCurrentUser(): PortalUser {
    if (!this.isClient()) return INITIAL_USERS[0];
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(INITIAL_USERS[0]));
    return INITIAL_USERS[0];
  }

  static setCurrentUser(user: PortalUser): void {
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
  }

  // --- Residents ---
  static getResidents(branchId?: string): Resident[] {
    if (!this.isClient()) return INITIAL_RESIDENTS;
    this.checkStorageVersion();
    const data = localStorage.getItem(STORAGE_KEYS.RESIDENTS);
    let list: Resident[] = INITIAL_RESIDENTS;
    if (data) {
      try {
        list = JSON.parse(data);
      } catch {
        list = INITIAL_RESIDENTS;
      }
    } else {
      localStorage.setItem(STORAGE_KEYS.RESIDENTS, JSON.stringify(INITIAL_RESIDENTS));
    }
    if (branchId && branchId !== "all") {
      return list.filter((r) => r.branchId === branchId);
    }
    return list;
  }

  static addResident(resident: Omit<Resident, "id">): Resident {
    const list = this.getResidents();
    const advancePaid = Number(resident.advancePaid || 0);
    const securityDeposit = Number(resident.securityDeposit || 0);

    let advanceStatus: Resident["advanceStatus"] = "Pending";
    if (advancePaid >= securityDeposit && securityDeposit > 0) {
      advanceStatus = "Paid";
    } else if (advancePaid > 0) {
      advanceStatus = "Partial";
    }

    const newResident: Resident = {
      ...resident,
      id: "res-" + Date.now(),
      securityDeposit,
      advancePaid,
      advanceStatus: resident.advanceStatus || advanceStatus,
      status: resident.status || "Active",
      paymentStatus: resident.paymentStatus || "Pending",
    };
    list.unshift(newResident);

    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.RESIDENTS, JSON.stringify(list));

      // If advance was paid at admission, automatically log advance record
      if (advancePaid > 0) {
        this.recordAdvance({
          residentId: newResident.id,
          residentName: newResident.name,
          branchId: newResident.branchId,
          type: "COLLECTED",
          amount: advancePaid,
          date: newResident.admissionDate || new Date().toISOString().slice(0, 10),
          paymentMode: "UPI",
          notes: "Advance deposit collected at admission",
          recordedBy: "Staff / Admission Desk",
        });
      }
    }
    return newResident;
  }

  static updateResident(id: string, updates: Partial<Resident>): void {
    const list = this.getResidents();
    const index = list.findIndex((r) => r.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updates };
      if (this.isClient()) {
        localStorage.setItem(STORAGE_KEYS.RESIDENTS, JSON.stringify(list));
      }
    }
  }

  static deleteResident(id: string): void {
    const list = this.getResidents().filter((r) => r.id !== id);
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.RESIDENTS, JSON.stringify(list));
    }
  }

  // --- Advance / Security Deposit Ledger ---
  static getAdvanceRecords(branchId?: string): AdvanceRecord[] {
    if (!this.isClient()) return INITIAL_ADVANCES;
    this.checkStorageVersion();
    const data = localStorage.getItem(STORAGE_KEYS.ADVANCES);
    let list: AdvanceRecord[] = INITIAL_ADVANCES;
    if (data) {
      try {
        list = JSON.parse(data);
      } catch {
        list = INITIAL_ADVANCES;
      }
    } else {
      localStorage.setItem(STORAGE_KEYS.ADVANCES, JSON.stringify(INITIAL_ADVANCES));
    }
    if (branchId && branchId !== "all") {
      return list.filter((a) => a.branchId === branchId);
    }
    return list;
  }

  static recordAdvance(record: Omit<AdvanceRecord, "id">): AdvanceRecord {
    const list = this.getAdvanceRecords();
    const newRecord: AdvanceRecord = {
      ...record,
      id: "adv-" + Date.now(),
    };
    list.unshift(newRecord);

    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.ADVANCES, JSON.stringify(list));

      // Update resident's advance status and total paid
      const resident = this.getResidents().find((r) => r.id === record.residentId);
      if (resident) {
        let currentAdvance = Number(resident.advancePaid || 0);
        if (record.type === "COLLECTED") {
          currentAdvance += Number(record.amount);
        } else if (record.type === "REFUNDED" || record.type === "ADJUSTED_TO_RENT") {
          currentAdvance = Math.max(0, currentAdvance - Number(record.amount));
        }

        const depositGoal = Number(resident.securityDeposit || 0);
        let newStatus: Resident["advanceStatus"] = "Pending";
        if (currentAdvance >= depositGoal && depositGoal > 0) {
          newStatus = "Paid";
        } else if (currentAdvance > 0) {
          newStatus = "Partial";
        } else if (record.type === "REFUNDED") {
          newStatus = "Refunded";
        } else if (record.type === "ADJUSTED_TO_RENT") {
          newStatus = "Adjusted";
        }

        this.updateResident(record.residentId, {
          advancePaid: currentAdvance,
          advanceStatus: newStatus,
          advanceDate: record.date,
        });
      }
    }
    return newRecord;
  }

  // --- Payments ---
  static getPayments(branchId?: string): RentPayment[] {
    if (!this.isClient()) return INITIAL_PAYMENTS;
    this.checkStorageVersion();
    const data = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
    let list: RentPayment[] = INITIAL_PAYMENTS;
    if (data) {
      try {
        list = JSON.parse(data);
      } catch {
        list = INITIAL_PAYMENTS;
      }
    } else {
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(INITIAL_PAYMENTS));
    }
    if (branchId && branchId !== "all") {
      return list.filter((p) => p.branchId === branchId);
    }
    return list;
  }

  static recordPayment(payment: Omit<RentPayment, "id">): RentPayment {
    const list = this.getPayments();
    const newPayment: RentPayment = {
      ...payment,
      id: "pay-" + Date.now(),
    };
    list.unshift(newPayment);
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(list));
      this.updateResident(payment.residentId, {
        paymentStatus: "Paid",
        lastPaymentDate: payment.paymentDate,
        lastPaidMonth: payment.monthFor,
      });
    }
    return newPayment;
  }

  // --- Expenses ---
  static getExpenses(branchId?: string): Expense[] {
    if (!this.isClient()) return INITIAL_EXPENSES;
    this.checkStorageVersion();
    const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    let list: Expense[] = INITIAL_EXPENSES;
    if (data) {
      try {
        list = JSON.parse(data);
      } catch {
        list = INITIAL_EXPENSES;
      }
    } else {
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(INITIAL_EXPENSES));
    }
    if (branchId && branchId !== "all") {
      return list.filter((e) => e.branchId === branchId);
    }
    return list;
  }

  static addExpense(expense: Omit<Expense, "id">): Expense {
    const list = this.getExpenses();
    const newExpense: Expense = {
      ...expense,
      id: "exp-" + Date.now(),
    };
    list.unshift(newExpense);
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(list));
    }
    return newExpense;
  }

  // --- Analytics & Aggregates ---
  static getBranchStats(branchId?: string) {
    const branches = this.getBranches();
    const residents = this.getResidents(branchId);
    const payments = this.getPayments(branchId);
    const expenses = this.getExpenses(branchId);
    const advances = this.getAdvanceRecords(branchId);

    // Bed capacity from dynamic branches
    const relevantBranches =
      branchId && branchId !== "all"
        ? branches.filter((b) => b.id === branchId)
        : branches;
    const totalCapacity = relevantBranches.reduce((sum, b) => sum + Number(b.totalBeds), 0);

    const activeResidents = residents.filter((r) => r.status === "Active");
    const noticeResidents = residents.filter((r) => r.status === "Notice");
    const occupiedBeds = activeResidents.length + noticeResidents.length;
    const vacantBeds = Math.max(0, totalCapacity - occupiedBeds);
    const occupancyRate = totalCapacity > 0 ? Math.round((occupiedBeds / totalCapacity) * 100) : 0;

    // Financials
    const totalCollected = payments.reduce((sum, p) => sum + Number(p.amount), 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const netOperating = totalCollected - totalExpenses;

    // Total Advance / Security Deposit Held across residents
    const totalAdvanceHeld = residents
      .filter((r) => r.status === "Active" || r.status === "Notice")
      .reduce((sum, r) => sum + Number(r.advancePaid || 0), 0);

    const totalAdvanceAgreed = residents
      .filter((r) => r.status === "Active" || r.status === "Notice")
      .reduce((sum, r) => sum + Number(r.securityDeposit || 0), 0);

    // Overdue & Pending Rent
    const overdueResidents = residents.filter(
      (r) => r.status === "Active" && (r.paymentStatus === "Overdue" || r.paymentStatus === "Pending")
    );
    const totalPendingRent = overdueResidents.reduce((sum, r) => sum + Number(r.monthlyRent), 0);

    // Expenses by Category
    const categoryTotals: Record<string, number> = {};
    EXPENSE_CATEGORIES.forEach((cat) => {
      categoryTotals[cat] = 0;
    });
    expenses.forEach((e) => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + Number(e.amount);
    });

    return {
      totalCapacity,
      occupiedBeds,
      vacantBeds,
      occupancyRate,
      totalCollected,
      totalExpenses,
      netOperating,
      totalAdvanceHeld,
      totalAdvanceAgreed,
      totalPendingRent,
      overdueResidents,
      categoryTotals,
      advancesCount: advances.length,
    };
  }

  // --- Export Utilities ---
  static exportResidentsCSV(branchId?: string): string {
    const list = this.getResidents(branchId);
    const headers = [
      "ID",
      "Name",
      "Phone",
      "PG Branch",
      "Room",
      "Bed",
      "Admission Date",
      "Monthly Rent (₹)",
      "Agreed Advance Deposit (₹)",
      "Advance Collected (₹)",
      "Advance Status",
      "Status",
      "Payment Status",
      "Last Paid Month",
    ];
    const rows = list.map((r) => [
      r.id,
      `"${r.name}"`,
      r.phone,
      r.branchId,
      r.roomNo,
      r.bedNo,
      r.admissionDate,
      r.monthlyRent,
      r.securityDeposit,
      r.advancePaid || 0,
      r.advanceStatus || "Pending",
      r.status,
      r.paymentStatus || "Pending",
      r.lastPaidMonth || "N/A",
    ]);
    return [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  }

  // --- Notice Period & Vacating Forecast (Feature B) ---
  static markResidentNotice(id: string, expectedCheckoutDate: string): void {
    const list = this.getResidents();
    const index = list.findIndex((r) => r.id === id);
    if (index !== -1) {
      list[index] = {
        ...list[index],
        status: "Notice",
        onNotice: true,
        noticeDate: new Date().toISOString().slice(0, 10),
        expectedCheckoutDate,
      };
      if (this.isClient()) {
        localStorage.setItem(STORAGE_KEYS.RESIDENTS, JSON.stringify(list));
      }
    }
  }

  static cancelResidentNotice(id: string): void {
    const list = this.getResidents();
    const index = list.findIndex((r) => r.id === id);
    if (index !== -1) {
      list[index] = {
        ...list[index],
        status: "Active",
        onNotice: false,
        noticeDate: undefined,
        expectedCheckoutDate: undefined,
      };
      if (this.isClient()) {
        localStorage.setItem(STORAGE_KEYS.RESIDENTS, JSON.stringify(list));
      }
    }
  }

  static getUpcomingVacancies(): Array<{ resident: Resident; branch?: PGBranch; daysLeft: number }> {
    if (!this.isClient()) return [];
    const residents = this.getResidents();
    const branches = this.getBranches();
    const noticeResidents = residents.filter((r) => r.onNotice && r.expectedCheckoutDate);
    const today = new Date().toISOString().slice(0, 10);

    return noticeResidents
      .map((r) => {
        const branch = branches.find((b) => b.id === r.branchId);
        const diffMs = new Date(r.expectedCheckoutDate!).getTime() - new Date(today).getTime();
        const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        return { resident: r, branch, daysLeft };
      })
      .sort((a, b) => a.daysLeft - b.daysLeft);
  }

  // --- Deposit Settlement & Refund Calculator (Feature C) ---
  static settleResidentDeposit(params: {
    residentId: string;
    refundAmount: number;
    deductionAmount: number;
    notes?: string;
    paymentMode: "UPI" | "Cash" | "Bank Transfer";
    recordedBy?: string;
  }): AdvanceRecord | null {
    const residents = this.getResidents();
    const resident = residents.find((r) => r.id === params.residentId);
    if (!resident) return null;

    const dateToday = new Date().toISOString().slice(0, 10);

    // Record refund transaction in advance ledger
    const refundRecord = this.recordAdvance({
      residentId: resident.id,
      residentName: resident.name,
      branchId: resident.branchId,
      type: "REFUNDED",
      amount: params.refundAmount,
      date: dateToday,
      paymentMode: params.paymentMode,
      notes: `Deposit settlement: Refund ₹${params.refundAmount} (Deductions: ₹${params.deductionAmount}). ${params.notes || ""}`,
      recordedBy: params.recordedBy || "Admin / Settlement Desk",
    });

    // Update resident profile
    this.updateResident(resident.id, {
      status: "Checked Out",
      onNotice: false,
      advanceStatus: "Refunded",
      depositRefunded: params.refundAmount,
      depositDeductions: params.deductionAmount,
      depositSettlementDate: dateToday,
      depositSettlementNotes: params.notes,
    });

    return refundRecord;
  }

  // --- Maintenance & Complaints Desk (Feature D) ---
  static getTickets(branchId?: string, statusFilter?: string): MaintenanceTicket[] {
    if (!this.isClient()) return [];
    const data = localStorage.getItem(STORAGE_KEYS.TICKETS);
    let list: MaintenanceTicket[] = [];
    if (data) {
      try {
        list = JSON.parse(data);
      } catch {
        list = [];
      }
    }
    if (branchId && branchId !== "all") {
      list = list.filter((t) => t.branchId === branchId);
    }
    if (statusFilter && statusFilter !== "all") {
      list = list.filter((t) => t.status === statusFilter);
    }
    return list;
  }

  static createTicket(ticket: Omit<MaintenanceTicket, "id" | "reportedDate" | "status"> & { id?: string; status?: MaintenanceTicket["status"] }): MaintenanceTicket {
    const list = this.getTickets();
    const ticketSeq = Math.floor(1000 + Math.random() * 9000);
    const newTicket: MaintenanceTicket = {
      ...ticket,
      id: ticket.id || `TKT-${ticketSeq}`,
      reportedDate: new Date().toISOString().slice(0, 10),
      reportedTime: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      status: ticket.status || "Reported",
    };
    list.unshift(newTicket);
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(list));
    }
    return newTicket;
  }

  static updateTicket(id: string, updates: Partial<MaintenanceTicket>): MaintenanceTicket | null {
    const list = this.getTickets();
    const index = list.findIndex((t) => t.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updates };
      if (this.isClient()) {
        localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(list));
      }
      return list[index];
    }
    return null;
  }

  static deleteTicket(id: string): void {
    const list = this.getTickets().filter((t) => t.id !== id);
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(list));
    }
  }

  static convertTicketToExpense(params: {
    ticketId: string;
    cost: number;
    paidTo: string;
    description: string;
    recordedBy?: string;
  }): Expense | null {
    const tickets = this.getTickets();
    const ticket = tickets.find((t) => t.id === params.ticketId);
    if (!ticket) return null;

    // Create Maintenance & Repair expense
    const expense = this.addExpense({
      branchId: ticket.branchId,
      category: "Maintenance & Repairs",
      amount: Number(params.cost),
      expenseDate: new Date().toISOString().slice(0, 10),
      paidTo: params.paidTo || "Technician / Repair Vendor",
      description: `[Ticket #${ticket.id}] Room ${ticket.roomNo} (${ticket.category}): ${params.description || ticket.description}`,
      recordedBy: params.recordedBy || "Staff / Tickets Desk",
    });

    // Update ticket with expense reference and marked as Resolved
    this.updateTicket(ticket.id, {
      status: "Resolved",
      resolvedDate: new Date().toISOString().slice(0, 10),
      repairCost: Number(params.cost),
      resolutionNotes: `Repaired by ${params.paidTo}. Cost: ₹${params.cost}.`,
      expenseId: expense.id,
    });

    return expense;
  }

  // --- Self-Onboarding Applications (New Joinees) ---
  static getOnboardingApplications(branchId?: string, statusFilter?: string): OnboardingApplication[] {
    if (!this.isClient()) return [];
    const data = localStorage.getItem(STORAGE_KEYS.ONBOARDING);
    let list: OnboardingApplication[] = [];
    if (data) {
      try {
        list = JSON.parse(data);
      } catch {
        list = [];
      }
    }
    if (branchId && branchId !== "all") {
      list = list.filter((a) => a.branchId === branchId);
    }
    if (statusFilter && statusFilter !== "all") {
      list = list.filter((a) => a.status === statusFilter);
    }
    return list;
  }

  static submitOnboarding(app: Omit<OnboardingApplication, "id" | "status" | "submittedAt">): OnboardingApplication {
    const list = this.getOnboardingApplications();
    const appSeq = Math.floor(1000 + Math.random() * 9000);
    const newApp: OnboardingApplication = {
      ...app,
      id: `APP-${appSeq}`,
      status: "Pending Review",
      submittedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    list.unshift(newApp);
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.ONBOARDING, JSON.stringify(list));
    }
    return newApp;
  }

  static updateOnboarding(id: string, updates: Partial<OnboardingApplication>): void {
    const list = this.getOnboardingApplications();
    const index = list.findIndex((a) => a.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updates };
      if (this.isClient()) {
        localStorage.setItem(STORAGE_KEYS.ONBOARDING, JSON.stringify(list));
      }
    }
  }

  static approveOnboarding(
    appId: string,
    allocation: {
      roomNo: string;
      bedNo: string;
      monthlyRent: number;
      securityDeposit: number;
      advancePaid: number;
      notes?: string;
    }
  ): Resident | null {
    const apps = this.getOnboardingApplications();
    const app = apps.find((a) => a.id === appId);
    if (!app) return null;

    // Create active resident record
    const newResident = this.addResident({
      branchId: app.branchId,
      name: app.name,
      phone: app.phone,
      whatsapp: app.whatsapp || app.phone,
      roomNo: allocation.roomNo,
      bedNo: allocation.bedNo,
      admissionDate: new Date().toISOString().slice(0, 10),
      monthlyRent: Number(allocation.monthlyRent),
      securityDeposit: Number(allocation.securityDeposit),
      advancePaid: Number(allocation.advancePaid),
      idType: app.idType,
      idNumber: app.idNumber,
      idProofUrl: app.idPhotoUrl,
      permanentAddress: app.permanentAddress,
      emergencyContactName: app.emergencyContactName,
      emergencyContactPhone: app.emergencyContactPhone,
      workplaceOrCollege: app.workplaceOrCollege,
      bloodGroup: app.bloodGroup,
      notes: allocation.notes || `Admitted via Self-Onboarding Form (${app.id})`,
      status: "Active",
      paymentStatus: allocation.advancePaid > 0 ? "Paid" : "Pending",
    });

    // Mark application as Approved
    this.updateOnboarding(app.id, {
      status: "Approved",
      assignedRoomNo: allocation.roomNo,
      assignedBedNo: allocation.bedNo,
      monthlyRent: allocation.monthlyRent,
      securityDeposit: allocation.securityDeposit,
      advancePaid: allocation.advancePaid,
    });

    return newResident;
  }

  // --- Branch-Wise Monthly Profit & Loss Statement (Feature F) ---
  static getBranchPnL(monthFor?: string): Array<{
    branchId: string;
    branchName: string;
    locality: string;
    activeResidents: number;
    totalRentCollected: number;
    totalAdvanceCollected: number;
    totalInflow: number;
    totalExpenses: number;
    netOperatingProfit: number;
    profitMargin: number;
    categoryExpenses: Record<string, number>;
  }> {
    if (!this.isClient()) return [];
    const branches = this.getBranches();
    const residents = this.getResidents();
    const payments = this.getPayments();
    const advances = this.getAdvanceRecords();
    const expenses = this.getExpenses();

    // Default to current month if not specified
    const currentMonthLabel =
      monthFor ||
      new Date().toLocaleString("en-IN", { month: "long", year: "numeric" });

    return branches.map((branch) => {
      const branchResidents = residents.filter((r) => r.branchId === branch.id && r.status === "Active");
      
      // Rent collected for this branch (matching month if specified)
      const branchPayments = payments.filter((p) => {
        if (p.branchId !== branch.id) return false;
        if (monthFor && p.monthFor !== monthFor) return false;
        return true;
      });
      const totalRentCollected = branchPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0);

      // Advances collected
      const branchAdvances = advances.filter((a) => a.branchId === branch.id && a.type === "COLLECTED");
      const totalAdvanceCollected = branchAdvances.reduce((sum, a) => sum + Number(a.amount || 0), 0);

      const totalInflow = totalRentCollected + totalAdvanceCollected;

      // Expenses for this branch
      const branchExpenses = expenses.filter((e) => e.branchId === branch.id);
      const totalExpenses = branchExpenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

      const categoryExpenses: Record<string, number> = {};
      branchExpenses.forEach((e) => {
        categoryExpenses[e.category] = (categoryExpenses[e.category] || 0) + Number(e.amount || 0);
      });

      const netOperatingProfit = totalInflow - totalExpenses;
      const profitMargin = totalInflow > 0 ? Math.round((netOperatingProfit / totalInflow) * 100) : 0;

      return {
        branchId: branch.id,
        branchName: branch.name,
        locality: branch.locality,
        activeResidents: branchResidents.length,
        totalRentCollected,
        totalAdvanceCollected,
        totalInflow,
        totalExpenses,
        netOperatingProfit,
        profitMargin,
        categoryExpenses,
      };
    });
  }

  static exportExpensesCSV(branchId?: string): string {
    const list = this.getExpenses(branchId);
    const headers = ["ID", "Date", "PG Branch", "Category", "Amount (₹)", "Paid To", "Description", "Recorded By"];
    const rows = list.map((e) => [
      e.id,
      e.expenseDate,
      e.branchId,
      `"${e.category}"`,
      e.amount,
      `"${e.paidTo || ""}"`,
      `"${e.description || ""}"`,
      `"${e.recordedBy || ""}"`,
    ]);
    return [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  }
}
