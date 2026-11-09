"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Database,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Server,
  Key,
  Globe,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import PortalNav from "@/components/portal/PortalNav";
import { OperationsStore, PortalUser } from "@/lib/operations-store";

export default function SupabaseSetupPage() {
  const [currentUser, setCurrentUser] = useState<PortalUser>(() => OperationsStore.getCurrentUser());
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [copied, setCopied] = useState(false);

  const sqlSchemaSnippet = `-- 1. PG Branches
CREATE TABLE IF NOT EXISTS public.pg_branches (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  locality TEXT NOT NULL,
  total_beds INT NOT NULL DEFAULT 45,
  status TEXT DEFAULT 'Active'
);

-- 2. Residents
CREATE TABLE IF NOT EXISTS public.residents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id TEXT NOT NULL REFERENCES public.pg_branches(id),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  room_no TEXT NOT NULL,
  bed_no TEXT,
  admission_date DATE NOT NULL DEFAULT CURRENT_DATE,
  monthly_rent NUMERIC(10,2) NOT NULL,
  security_deposit NUMERIC(10,2) DEFAULT 0,
  status TEXT DEFAULT 'Active'
);

-- 3. Payments
CREATE TABLE IF NOT EXISTS public.rent_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID REFERENCES public.residents(id),
  branch_id TEXT REFERENCES public.pg_branches(id),
  amount NUMERIC(10,2) NOT NULL,
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  month_for TEXT NOT NULL,
  payment_mode TEXT DEFAULT 'UPI',
  transaction_ref TEXT
);

-- 4. Expenses
CREATE TABLE IF NOT EXISTS public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id TEXT REFERENCES public.pg_branches(id),
  category TEXT NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
  paid_to TEXT,
  description TEXT
);`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSchemaSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <PortalNav
        selectedBranch={selectedBranch}
        onBranchChange={setSelectedBranch}
        currentUser={currentUser}
        onUserChange={setCurrentUser}
      />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cloud Database Sync</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-2 flex items-center gap-2">
            <Database className="w-6 h-6 text-indigo-400" />
            <span>Connect to Managed Supabase PostgreSQL</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Currently running in <strong>Live Local Mode</strong> (data is saved and ready to use in your
            browser). To enable real-time cloud sync across your phone and your partners&apos; devices in
            another city, connect a free Supabase database.
          </p>
        </div>

        {/* 3 Step Deployment Guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center text-sm">
              1
            </div>
            <h3 className="font-bold text-sm text-white">Create Free Project</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sign up for free at{" "}
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:underline inline-flex items-center gap-0.5"
              >
                supabase.com <ExternalLink className="w-3 h-3" />
              </a>{" "}
              and click &quot;New Project&quot; (Choose region Mumbai/India for lowest latency).
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-sm">
              2
            </div>
            <h3 className="font-bold text-sm text-white">Run SQL Schema</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Open the <strong>SQL Editor</strong> tab in your Supabase dashboard and run the
              pre-generated schema from the box below.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center text-sm">
              3
            </div>
            <h3 className="font-bold text-sm text-white">Add Environment Keys</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Add your Project URL and Anon Public Key to <code>.env.local</code>. Your partners and staff
              will instantly share the exact same database!
            </p>
          </div>
        </div>

        {/* SQL Schema Box with Copy Button */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-sm text-white">Ready-to-Run SQL Table Script</h3>
            </div>

            <button
              onClick={handleCopySql}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy SQL</span>
                </>
              )}
            </button>
          </div>

          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
            {sqlSchemaSnippet}
          </pre>

          <p className="text-[11px] text-slate-500">
            Note: The full file is also saved at{" "}
            <code className="text-slate-400">supabase-schema.sql</code> in your project root.
          </p>
        </div>

        {/* Environment Variables Reference */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-400" />
            <span>Environment Variables Configuration (.env.local)</span>
          </h3>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
            <div className="text-slate-500"># Amanuro Stays - Supabase Cloud Config</div>
            <div>NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co</div>
            <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...your_anon_key</div>
          </div>
        </div>
      </main>
    </div>
  );
}
