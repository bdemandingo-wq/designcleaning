-- Create cleaner applications table
CREATE TABLE public.cleaner_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  has_transportation BOOLEAN NOT NULL DEFAULT false,
  has_supplies BOOLEAN NOT NULL DEFAULT false,
  years_experience INTEGER NOT NULL DEFAULT 0,
  has_insurance BOOLEAN NOT NULL DEFAULT false,
  can_provide_references BOOLEAN NOT NULL DEFAULT false,
  supply_pictures TEXT[] DEFAULT '{}',
  work_areas TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cleaner_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit an application
CREATE POLICY "Anyone can submit an application"
ON public.cleaner_applications
FOR INSERT
WITH CHECK (true);

-- Admins can view all applications
CREATE POLICY "Admins can view all applications"
ON public.cleaner_applications
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update applications
CREATE POLICY "Admins can update applications"
ON public.cleaner_applications
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_cleaner_applications_updated_at
BEFORE UPDATE ON public.cleaner_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for supply pictures
INSERT INTO storage.buckets (id, name, public) VALUES ('supply-pictures', 'supply-pictures', true);

-- Allow anyone to upload supply pictures
CREATE POLICY "Anyone can upload supply pictures"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'supply-pictures');

-- Allow public access to view supply pictures
CREATE POLICY "Supply pictures are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'supply-pictures');