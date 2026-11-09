"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Receipt,
  Smartphone,
  Database,
  Building2,
  Shield,
  UserCheck,
  ArrowLeft,
  Banknote,
  MapPin,
  KeyRound,
  LogOut,
} from "lucide-react";
import { OperationsStore, PGBranch, PortalUser } from "@/lib/operations-store";

interface PortalNavProps {
  selectedBranch: string;
  onBranchChange: (branchId: string) => void;
  currentUser: PortalUser;
  onUserChange: (user: PortalUser) => void;
}

export default function PortalNav({
  selectedBranch,
  onBranchChange,
  currentUser,
  onUserChange,
}: PortalNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [branches, setBranches] = useState<PGBranch[]>([]);

  useEffect(() => {
    setBranches(OperationsStore.getBranches());
  }, [pathname]);

  const navItems = [
    {
      label: "Overview",
      href: "/portal/dashboard",
      icon: LayoutDashboard,
      roles: ["PARTNER_OWNER", "STAFF_CARETAKER"],
    },
    {
      label: "Residents",
      href: "/portal/residents",
      icon: Users,
      roles: ["PARTNER_OWNER", "STAFF_CARETAKER"],
    },
    {
      label: "Advance / Deposits",
      href: "/portal/advances",
      icon: Banknote,
      roles: ["PARTNER_OWNER", "STAFF_CARETAKER"],
      badge: "New",
    },
    {
      label: "Rent Payments",
      href: "/portal/payments",
      icon: CreditCard,
      roles: ["PARTNER_OWNER", "STAFF_CARETAKER"],
    },
    {
      label: "Expenses",
      href: "/portal/expenses",
      icon: Receipt,
      roles: ["PARTNER_OWNER", "STAFF_CARETAKER"],
    },
    {
      label: "PGs & Beds",
      href: "/portal/locations",
      icon: Building2,
      roles: ["PARTNER_OWNER"],
      badge: "Manage",
    },
    {
      label: "Staff Logins",
      href: "/portal/users",
      icon: KeyRound,
      roles: ["PARTNER_OWNER"],
    },
    {
      label: "Staff Entry",
      href: "/portal/staff-entry",
      icon: Smartphone,
      roles: ["PARTNER_OWNER", "STAFF_CARETAKER"],
      badge: "Mobile",
    },
    {
      label: "Cloud DB",
      href: "/portal/setup",
      icon: Database,
      roles: ["PARTNER_OWNER"],
      badge: "Supabase",
    },
  ];

  const handleLogout = () => {
    router.push("/portal");
  };

  const visibleNavItems = navItems.filter((item) =>
    item.roles.includes(currentUser.role)
  );

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-xl">
      {/* Top Banner & Multi-Location Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 mr-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 transition"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-medium">Public Site</span>
            </Link>

            <Link href="/portal/dashboard" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center font-bold text-slate-950 text-base shadow-lg shadow-amber-500/20">
                A
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base tracking-tight text-white">
                    Amanuro <span className="text-amber-400">Operations</span>
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/20 px-2 py-0.5 rounded-full">
                    {currentUser.role === "PARTNER_OWNER" ? "Admin" : "Staff"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">
                  User: <span className="text-slate-200 font-medium">{currentUser.name}</span>
                </p>
              </div>
            </Link>
          </div>

          {/* Branch Selector & User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dynamic PG Branch Dropdown */}
            <div className="relative">
              <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200">
                <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <select
                  value={selectedBranch}
                  onChange={(e) => onBranchChange(e.target.value)}
                  disabled={currentUser.role === "STAFF_CARETAKER"}
                  aria-label="Select PG Branch"
                  className="bg-transparent font-medium text-slate-100 focus:outline-none cursor-pointer pr-1 max-w-[150px] sm:max-w-[220px] truncate"
                >
                  {currentUser.role === "PARTNER_OWNER" && (
                    <option value="all" className="bg-slate-900 text-white">
                      🏢 All PG Hubs ({branches.length})
                    </option>
                  )}
                  {branches.map((b) => (
                    <option key={b.id} value={b.id} className="bg-slate-900 text-white">
                      {b.name.replace("Amanuro Stays - ", "")} ({b.totalBeds} Beds)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Logout / Switch Account"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden md:inline">Exit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Links Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 no-scrollbar">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                    isActive
                      ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? "bg-slate-900 text-amber-300"
                          : "bg-slate-800 text-slate-300 border border-slate-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
