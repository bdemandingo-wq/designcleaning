-- Make the bucket private (files not publicly accessible)
UPDATE storage.buckets 
SET public = false 
WHERE id = 'supply-pictures';

-- Drop permissive policies
DROP POLICY IF EXISTS "Anyone can upload supply pictures" ON storage.objects;
DROP POLICY IF EXISTS "Supply pictures are publicly accessible" ON storage.objects;

-- Allow unauthenticated uploads (for job applicants who aren't logged in)
-- This is necessary because the cleaner application form is public
CREATE POLICY "Anyone can upload supply pictures"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'supply-pictures');

-- Only admins can view/download supply pictures
CREATE POLICY "Admins can view supply pictures"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'supply-pictures' AND 
  public.has_role(auth.uid(), 'admin')
);