"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Smartphone,
  Lock,
  User,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  HelpCircle,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import { OperationsStore } from "@/lib/operations-store";

export default function PortalLoginPage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showDemoHelp, setShowDemoHelp] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!loginId || !password) {
      setErrorMsg("Please enter both User ID and Password");
      return;
    }

    const authenticatedUser = OperationsStore.authenticate(loginId, password);

    if (!authenticatedUser) {
      setErrorMsg("Invalid User ID or Password. Check credentials below.");
      return;
    }

    // Route based on role
    if (authenticatedUser.role === "PARTNER_OWNER") {
      router.push("/portal/dashboard");
    } else {
      router.push("/portal/staff-entry");
    }
  };

  const handleQuickFill = (u: string, p: string) => {
    setLoginId(u);
    setPassword(p);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 portal-theme">
      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6">
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Website</span>
        </Link>
        <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Amanuro Cloud Operations</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md mx-auto w-full my-auto">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Subtle Glows */}
          <div className="absolute -top-24 -right-24 w-52 h-52 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Brand Header */}
          <div className="text-center mb-6 relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center font-bold text-slate-950 text-2xl mx-auto mb-3 shadow-xl shadow-amber-500/20">
              A
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Amanuro Operations Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Secure login for Managing Partners &amp; PG Branch Caretakers
            </p>
          </div>

          {/* Error Notice */}
          {errorMsg && (
            <div className="mb-4 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                User ID / Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="e.g. admin or palayam.staff"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Password</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition cursor-pointer text-sm"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* One-Click Quick Fill Credentials Helper */}
          <div className="mt-5 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setShowDemoHelp(!showDemoHelp)}
              className="w-full text-xs text-amber-400/90 hover:text-amber-300 flex items-center justify-center gap-1.5 font-medium cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showDemoHelp ? "Hide Default Login Credentials" : "View Pre-configured User IDs & Passwords"}</span>
            </button>

            {showDemoHelp && (
              <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800/80 text-[11px] text-slate-400 font-semibold">
                  <span>Role &amp; Account</span>
                  <span>Click to Test</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-purple-300 block">Managing Partner (Admin)</span>
                    <span className="text-[10px] text-slate-400 font-medium tracking-wide">admin / admin@amanuro</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickFill("admin", "admin@amanuro")}
                    className="text-[10px] bg-purple-950/60 text-purple-300 border border-purple-500/30 px-2 py-1 rounded hover:bg-purple-900/60 font-semibold"
                  >
                    Auto-Fill
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-900">
                  <div>
                    <span className="font-bold text-emerald-300 block">Palayam Staff (Caretaker)</span>
                    <span className="text-[10px] text-slate-400 font-medium tracking-wide">palayam.staff / staff123</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickFill("palayam.staff", "staff123")}
                    className="text-[10px] bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded hover:bg-emerald-900/60 font-semibold"
                  >
                    Auto-Fill
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-900">
                  <div>
                    <span className="font-bold text-emerald-300 block">Pattom Staff (Caretaker)</span>
                    <span className="text-[10px] text-slate-400 font-medium tracking-wide">pattom.staff / staff123</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickFill("pattom.staff", "staff123")}
                    className="text-[10px] bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded hover:bg-emerald-900/60 font-semibold"
                  >
                    Auto-Fill
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom info */}
      <div className="max-w-5xl mx-auto w-full text-center pt-6 text-xs text-slate-600">
        © 2026 Amanuro Stays. All rights reserved. • Multi-branch Operations System
      </div>
    </div>
  );
}
