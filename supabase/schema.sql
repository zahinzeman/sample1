-- ==============================================================================
-- AURELLE STUDIO — SUPABASE DATABASE SCHEMA
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/xbndqvzkvzyqvofjjpvg/sql/new
-- ==============================================================================

-- 1. Create inquiries table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT NOT NULL DEFAULT 'Residential Interiors',
  location TEXT,
  estimated_budget TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'archived'))
);

-- 2. Create subscribers table for journal/newsletter updates
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  email TEXT UNIQUE NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- 4. Inquiries Policies:
-- Allow anyone (public/anon) to insert a new inquiry
DROP POLICY IF EXISTS "Enable insert for everyone" ON public.inquiries;
CREATE POLICY "Enable insert for everyone"
  ON public.inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users (studio staff) to view inquiries
DROP POLICY IF EXISTS "Enable read access for authenticated users only" ON public.inquiries;
CREATE POLICY "Enable read access for authenticated users only"
  ON public.inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update inquiry status
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.inquiries;
CREATE POLICY "Enable update for authenticated users only"
  ON public.inquiries
  FOR UPDATE
  TO authenticated
  USING (true);

-- 5. Subscribers Policies:
-- Allow anyone to subscribe
DROP POLICY IF EXISTS "Enable insert for subscribers" ON public.subscribers;
CREATE POLICY "Enable insert for subscribers"
  ON public.subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to view subscribers
DROP POLICY IF EXISTS "Enable read for authenticated subscribers" ON public.subscribers;
CREATE POLICY "Enable read for authenticated subscribers"
  ON public.subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- 6. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers(email);

-- Comments for Supabase Dashboard Documentation
COMMENT ON TABLE public.inquiries IS 'Client project inquiries and consultation requests for Aurelle Studio';
COMMENT ON TABLE public.subscribers IS 'Subscribers to the Aurelle Studio architectural journal and editorial updates';
