-- Add the payment_proof_text column to the orders table
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS payment_proof_text TEXT;
