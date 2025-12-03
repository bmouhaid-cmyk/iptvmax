-- 1. Add the payment_proof_url column to the orders table
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS payment_proof_url TEXT;

-- 2. Create the 'payment-proofs' storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-proofs', 'payment-proofs', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Set up security policies for the bucket

-- Policy 1: Allow anyone to view the files (Public Read)
-- This allows you to view the proofs easily from the dashboard or admin panel
DROP POLICY IF EXISTS "Public View" ON storage.objects;
CREATE POLICY "Public View"
ON storage.objects FOR SELECT
USING ( bucket_id = 'payment-proofs' );

-- Policy 2: Allow authenticated users to upload files
-- This ensures only logged-in users can upload proofs
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'payment-proofs' );
