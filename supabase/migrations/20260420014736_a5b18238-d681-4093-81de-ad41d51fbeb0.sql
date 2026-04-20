-- =====================================================
-- 1. SERVICE_PRICING TABLE
-- =====================================================
CREATE TABLE public.service_pricing (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_type TEXT NOT NULL,
  tier_index INTEGER NOT NULL,
  max_sqft INTEGER NOT NULL,
  label TEXT NOT NULL,
  base_price NUMERIC NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(service_type, tier_index)
);

ALTER TABLE public.service_pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read service_pricing"
  ON public.service_pricing FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert service_pricing"
  ON public.service_pricing FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update service_pricing"
  ON public.service_pricing FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete service_pricing"
  ON public.service_pricing FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_service_pricing_updated_at
  BEFORE UPDATE ON public.service_pricing
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- 2. SERVICE_AREAS TABLE
-- =====================================================
CREATE TABLE public.service_areas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'MD',
  travel_fee NUMERIC NOT NULL DEFAULT 0,
  tier TEXT NOT NULL DEFAULT 'standard',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.service_areas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read service_areas"
  ON public.service_areas FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert service_areas"
  ON public.service_areas FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update service_areas"
  ON public.service_areas FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete service_areas"
  ON public.service_areas FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_service_areas_updated_at
  BEFORE UPDATE ON public.service_areas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- 3. COMMERCIAL_REQUESTS TABLE
-- =====================================================
CREATE TABLE public.commercial_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  property_type TEXT NOT NULL,
  square_feet TEXT,
  frequency TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.commercial_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit commercial requests"
  ON public.commercial_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view commercial requests"
  ON public.commercial_requests FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update commercial requests"
  ON public.commercial_requests FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete commercial requests"
  ON public.commercial_requests FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_commercial_requests_updated_at
  BEFORE UPDATE ON public.commercial_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- 4. GIFT_CARDS TABLE
-- =====================================================
CREATE TABLE public.gift_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  amount NUMERIC NOT NULL,
  buyer_name TEXT,
  buyer_email TEXT,
  recipient_name TEXT,
  recipient_email TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  stripe_session_id TEXT,
  redeemed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.gift_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view gift cards"
  ON public.gift_cards FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert gift cards"
  ON public.gift_cards FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update gift cards"
  ON public.gift_cards FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete gift cards"
  ON public.gift_cards FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_gift_cards_updated_at
  BEFORE UPDATE ON public.gift_cards
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- SEED: SERVICE_PRICING (current calculator data)
-- =====================================================
INSERT INTO public.service_pricing (service_type, tier_index, max_sqft, label, base_price) VALUES
  ('standard', 0, 750, 'Up to 750 sf', 108),
  ('standard', 1, 1000, 'Up to 1000 sf', 143),
  ('standard', 2, 1250, 'Up to 1250 sf', 178),
  ('standard', 3, 1500, 'Up to 1500 sf', 213),
  ('standard', 4, 1800, 'Up to 1800 sf', 248),
  ('standard', 5, 2100, 'Up to 2100 sf', 283),
  ('standard', 6, 2400, 'Up to 2400 sf', 313),
  ('standard', 7, 2700, 'Up to 2700 sf', 368),
  ('standard', 8, 3000, 'Up to 3000 sf', 423),
  ('standard', 9, 3300, 'Up to 3300 sf', 478),
  ('standard', 10, 3600, 'Up to 3600 sf', 533),
  ('standard', 11, 4000, 'Up to 4000 sf', 588),
  ('standard', 12, 4400, 'Up to 4400 sf', 643),
  ('deep', 0, 750, 'Up to 750 sf', 208),
  ('deep', 1, 1000, 'Up to 1000 sf', 243),
  ('deep', 2, 1250, 'Up to 1250 sf', 278),
  ('deep', 3, 1500, 'Up to 1500 sf', 313),
  ('deep', 4, 1800, 'Up to 1800 sf', 348),
  ('deep', 5, 2100, 'Up to 2100 sf', 383),
  ('deep', 6, 2400, 'Up to 2400 sf', 438),
  ('deep', 7, 2700, 'Up to 2700 sf', 493),
  ('deep', 8, 3000, 'Up to 3000 sf', 548),
  ('deep', 9, 3300, 'Up to 3300 sf', 603),
  ('deep', 10, 3600, 'Up to 3600 sf', 658),
  ('deep', 11, 4000, 'Up to 4000 sf', 713),
  ('deep', 12, 4400, 'Up to 4400 sf', 768),
  ('moveinout', 0, 750, 'Up to 750 sf', 283),
  ('moveinout', 1, 1000, 'Up to 1000 sf', 318),
  ('moveinout', 2, 1250, 'Up to 1250 sf', 353),
  ('moveinout', 3, 1500, 'Up to 1500 sf', 388),
  ('moveinout', 4, 1800, 'Up to 1800 sf', 423),
  ('moveinout', 5, 2100, 'Up to 2100 sf', 458),
  ('moveinout', 6, 2400, 'Up to 2400 sf', 513),
  ('moveinout', 7, 2700, 'Up to 2700 sf', 568),
  ('moveinout', 8, 3000, 'Up to 3000 sf', 623),
  ('moveinout', 9, 3300, 'Up to 3300 sf', 678),
  ('moveinout', 10, 3600, 'Up to 3600 sf', 733),
  ('moveinout', 11, 4000, 'Up to 4000 sf', 788),
  ('moveinout', 12, 4400, 'Up to 4400 sf', 843),
  ('recurring', 0, 750, 'Up to 750 sf', 108),
  ('recurring', 1, 1000, 'Up to 1000 sf', 143),
  ('recurring', 2, 1250, 'Up to 1250 sf', 178),
  ('recurring', 3, 1500, 'Up to 1500 sf', 213),
  ('recurring', 4, 1800, 'Up to 1800 sf', 248),
  ('recurring', 5, 2100, 'Up to 2100 sf', 283),
  ('recurring', 6, 2400, 'Up to 2400 sf', 313),
  ('recurring', 7, 2700, 'Up to 2700 sf', 368),
  ('recurring', 8, 3000, 'Up to 3000 sf', 423),
  ('recurring', 9, 3300, 'Up to 3300 sf', 478),
  ('recurring', 10, 3600, 'Up to 3600 sf', 533),
  ('recurring', 11, 4000, 'Up to 4000 sf', 588),
  ('recurring', 12, 4400, 'Up to 4400 sf', 643);

-- =====================================================
-- SEED: SERVICE_AREAS (current DMV city list)
-- =====================================================
INSERT INTO public.service_areas (slug, name, state, travel_fee, tier, sort_order) VALUES
  ('gaithersburg-cleaning', 'Gaithersburg', 'MD', 0, 'standard', 1),
  ('washington-dc-cleaning', 'Washington DC', 'DC', 0, 'standard', 2),
  ('silver-spring-cleaning', 'Silver Spring', 'MD', 0, 'standard', 3),
  ('rockville-cleaning', 'Rockville', 'MD', 0, 'standard', 4),
  ('bethesda-cleaning', 'Bethesda', 'MD', 0, 'premium', 5),
  ('germantown-cleaning', 'Germantown', 'MD', 0, 'standard', 6),
  ('potomac-cleaning', 'Potomac', 'MD', 0, 'premium', 7),
  ('bowie-cleaning', 'Bowie', 'MD', 0, 'standard', 8),
  ('college-park-cleaning', 'College Park', 'MD', 0, 'standard', 9),
  ('laurel-cleaning', 'Laurel', 'MD', 0, 'standard', 10);