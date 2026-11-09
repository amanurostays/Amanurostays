-- ====================================================================
-- AMANURO STAYS - OPERATIONS & MULTI-PG DASHBOARD SCHEMA
-- Clean setup: drops old versions and recreates the full schema
-- ====================================================================

-- 0. Clean up any existing older schema versions
DROP TABLE IF EXISTS public.advance_deposits CASCADE;
DROP TABLE IF EXISTS public.rent_payments CASCADE;
DROP TABLE IF EXISTS public.expenses CASCADE;
DROP TABLE IF EXISTS public.residents CASCADE;
DROP TABLE IF EXISTS public.portal_users CASCADE;
DROP TABLE IF EXISTS public.pg_branches CASCADE;

-- 1. PG Branches Table
CREATE TABLE public.pg_branches (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  locality TEXT NOT NULL,
  city TEXT DEFAULT 'Trivandrum',
  address TEXT,
  phone TEXT DEFAULT '+91 6282830532',
  total_beds INT NOT NULL DEFAULT 45,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Initial PG Branches
INSERT INTO public.pg_branches (id, name, locality, address, total_beds, status)
VALUES 
  ('palayam-hub', 'Amanuro Stays - Palayam Hub', 'Palayam Hub', 'Palayam, Thiruvananthapuram, Kerala - 695034', 50, 'Active'),
  ('pattom-hub', 'Amanuro Stays - Pattom Hub', 'Pattom Hub', 'Pattom Hub, Thiruvananthapuram, Kerala - 695004', 45, 'Active'),
  ('vellayambalam-hub', 'Amanuro Stays - Vellayambalam Hub', 'Vellayambalam Hub', 'Vellayambalam Hub, Thiruvananthapuram - 695010', 45, 'Active'),
  ('sasthamangalam-hub', 'Amanuro Stays - Sasthamangalam Hub', 'Sasthamangalam Hub', 'Sasthamangalam Hub, Thiruvananthapuram - 695010', 40, 'Active');

-- 2. Residents Table
CREATE TABLE public.residents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id TEXT NOT NULL REFERENCES public.pg_branches(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  room_no TEXT NOT NULL,
  bed_no TEXT,
  admission_date DATE NOT NULL DEFAULT CURRENT_DATE,
  monthly_rent NUMERIC(10, 2) NOT NULL DEFAULT 6500,
  security_deposit NUMERIC(10, 2) NOT NULL DEFAULT 5000,
  advance_paid NUMERIC(10, 2) NOT NULL DEFAULT 5000,
  advance_status TEXT DEFAULT 'Paid',
  advance_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'Active',
  id_proof_url TEXT,
  notes TEXT,
  last_payment_date DATE,
  last_paid_month TEXT,
  payment_status TEXT DEFAULT 'Paid',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Rent Payments Table
CREATE TABLE public.rent_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID REFERENCES public.residents(id) ON DELETE CASCADE,
  resident_name TEXT NOT NULL,
  branch_id TEXT NOT NULL REFERENCES public.pg_branches(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL,
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  month_for TEXT NOT NULL,
  payment_mode TEXT NOT NULL DEFAULT 'UPI',
  transaction_ref TEXT,
  notes TEXT,
  recorded_by TEXT DEFAULT 'Staff',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Advance / Security Deposits Ledger
CREATE TABLE public.advance_deposits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID REFERENCES public.residents(id) ON DELETE CASCADE,
  resident_name TEXT NOT NULL,
  branch_id TEXT NOT NULL REFERENCES public.pg_branches(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'COLLECTED',
  amount NUMERIC(10, 2) NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  payment_mode TEXT NOT NULL DEFAULT 'UPI',
  transaction_ref TEXT,
  notes TEXT,
  recorded_by TEXT DEFAULT 'Staff',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Expenses Table
CREATE TABLE public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id TEXT NOT NULL REFERENCES public.pg_branches(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
  paid_to TEXT,
  description TEXT,
  receipt_url TEXT,
  recorded_by TEXT DEFAULT 'Staff',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Portal Users & Staff Credentials
CREATE TABLE public.portal_users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'STAFF_CARETAKER',
  assigned_branch_id TEXT REFERENCES public.pg_branches(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Default Admin & Staff Accounts
INSERT INTO public.portal_users (id, username, password, email, name, role, assigned_branch_id)
VALUES
  ('usr-admin', 'admin', 'admin@amanuro', 'admin@amanuro.in', 'Managing Partner / Admin', 'PARTNER_OWNER', NULL),
  ('usr-palayam', 'palayam.staff', 'staff123', 'palayam@amanuro.in', 'Palayam Caretaker', 'STAFF_CARETAKER', 'palayam-hub'),
  ('usr-pattom', 'pattom.staff', 'staff123', 'pattom@amanuro.in', 'Pattom Caretaker', 'STAFF_CARETAKER', 'pattom-hub'),
  ('usr-vellayambalam', 'vellayambalam.staff', 'staff123', 'vellayambalam@amanuro.in', 'Vellayambalam Caretaker', 'STAFF_CARETAKER', 'vellayambalam-hub'),
  ('usr-sasthamangalam', 'sasthamangalam.staff', 'staff123', 'sasthamangalam@amanuro.in', 'Sasthamangalam Caretaker', 'STAFF_CARETAKER', 'sasthamangalam-hub');

-- 7. Row Level Security & Access Policies
ALTER TABLE public.pg_branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.residents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rent_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advance_deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portal_users ENABLE ROW LEVEL SECURITY;

-- Allow full read/write access via Supabase Client
CREATE POLICY "Public access pg_branches" ON public.pg_branches FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access residents" ON public.residents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access rent_payments" ON public.rent_payments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access advance_deposits" ON public.advance_deposits FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access expenses" ON public.expenses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access portal_users" ON public.portal_users FOR ALL USING (true) WITH CHECK (true);
