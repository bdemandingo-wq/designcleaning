
-- Add time_slot and review tracking to bookings
ALTER TABLE public.bookings 
  ADD COLUMN IF NOT EXISTS time_slot TEXT CHECK (time_slot IN ('morning','afternoon')),
  ADD COLUMN IF NOT EXISTS review_email_sent_at TIMESTAMPTZ;

-- Blocked dates table
CREATE TABLE IF NOT EXISTS public.booking_blocked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocked_date DATE NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.booking_blocked_dates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view blocked dates" ON public.booking_blocked_dates FOR SELECT USING (true);
CREATE POLICY "Admins manage blocked dates insert" ON public.booking_blocked_dates FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage blocked dates update" ON public.booking_blocked_dates FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage blocked dates delete" ON public.booking_blocked_dates FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  location TEXT,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  review_token TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public view approved reviews" ON public.reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Admins view all reviews" ON public.reviews FOR SELECT USING (has_role(auth.uid(),'admin'));
CREATE POLICY "Anyone can submit review" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins update reviews" ON public.reviews FOR UPDATE USING (has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete reviews" ON public.reviews FOR DELETE USING (has_role(auth.uid(),'admin'));

CREATE TRIGGER reviews_updated_at BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_token ON public.reviews(review_token);
CREATE INDEX IF NOT EXISTS idx_bookings_date_slot ON public.bookings(preferred_date, time_slot);
