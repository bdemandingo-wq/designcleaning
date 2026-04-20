-- Site content key-value store
CREATE TABLE IF NOT EXISTS public.site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site_content" ON public.site_content
  FOR SELECT USING (true);

CREATE POLICY "Admins can update site_content" ON public.site_content
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert site_content" ON public.site_content
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.work_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL DEFAULT 'instagram' CHECK (platform IN ('instagram', 'tiktok')),
  image_url text NOT NULL,
  caption text NOT NULL DEFAULT '',
  post_url text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.work_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read work_cards" ON public.work_cards
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert work_cards" ON public.work_cards
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update work_cards" ON public.work_cards
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete work_cards" ON public.work_cards
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO storage.buckets (id, name, public)
VALUES ('work-photos', 'work-photos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read work-photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'work-photos');

CREATE POLICY "Admins can upload work-photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'work-photos'
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can delete work-photos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'work-photos'
    AND public.has_role(auth.uid(), 'admin')
  );

INSERT INTO public.site_content (key, value) VALUES
  ('instagram_handle', '@designcleaningdmv'),
  ('instagram_url', 'https://www.instagram.com/designcleaningdmv/'),
  ('tiktok_handle', '@designcleaningdmv'),
  ('tiktok_url', 'https://www.tiktok.com/@designcleaningdmv')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.work_cards (platform, image_url, caption, post_url, sort_order) VALUES
  ('instagram', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=600&fit=crop', 'Sparkling kitchen after a deep clean', 'https://www.instagram.com/designcleaningdmv/', 1),
  ('instagram', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=600&fit=crop', 'Bathroom transformation', 'https://www.instagram.com/designcleaningdmv/', 2),
  ('instagram', 'https://images.unsplash.com/photo-1527515637462-cee1395c108c?w=600&h=600&fit=crop', 'Window cleaning perfection', 'https://www.instagram.com/designcleaningdmv/', 3),
  ('instagram', 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&h=600&fit=crop', 'Move-out deep clean complete', 'https://www.instagram.com/designcleaningdmv/', 4),
  ('instagram', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop', 'Living room refresh', 'https://www.instagram.com/designcleaningdmv/', 5),
  ('instagram', 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=600&h=600&fit=crop', 'Spotless countertops every time', 'https://www.instagram.com/designcleaningdmv/', 6),
  ('tiktok', 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=700&fit=crop', 'Satisfying kitchen deep clean', 'https://www.tiktok.com/@designcleaningdmv', 7),
  ('tiktok', 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=700&fit=crop', 'Cleaning hacks you need to know', 'https://www.tiktok.com/@designcleaningdmv', 8),
  ('tiktok', 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=400&h=700&fit=crop', 'Before & after bathroom transformation', 'https://www.tiktok.com/@designcleaningdmv', 9),
  ('tiktok', 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=700&fit=crop', 'Day in the life of a cleaner', 'https://www.tiktok.com/@designcleaningdmv', 10),
  ('tiktok', 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=700&fit=crop', 'Move-out cleaning timelapse', 'https://www.tiktok.com/@designcleaningdmv', 11);