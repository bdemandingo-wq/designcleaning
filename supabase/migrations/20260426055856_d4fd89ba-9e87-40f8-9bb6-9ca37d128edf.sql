-- 1. Referral codes (one per user)
CREATE TABLE public.referral_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own referral code"
  ON public.referral_codes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can look up codes for redemption"
  ON public.referral_codes FOR SELECT
  USING (true);

CREATE POLICY "Admins can view all referral codes"
  ON public.referral_codes FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 2. Referrals (referrer -> friend)
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_user_id UUID NOT NULL,
  referee_email TEXT,
  referee_user_id UUID,
  booking_id UUID,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | completed | cancelled
  reward_amount NUMERIC NOT NULL DEFAULT 25,
  rewarded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view referrals they made"
  ON public.referrals FOR SELECT
  USING (auth.uid() = referrer_user_id);

CREATE POLICY "Admins can view all referrals"
  ON public.referrals FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update referrals"
  ON public.referrals FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_referrals_updated_at
  BEFORE UPDATE ON public.referrals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. Customer credit balance
CREATE TABLE public.customer_credits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  balance NUMERIC NOT NULL DEFAULT 0,
  lifetime_earned NUMERIC NOT NULL DEFAULT 0,
  lifetime_used NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.customer_credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own credits"
  ON public.customer_credits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all credits"
  ON public.customer_credits FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update credits"
  ON public.customer_credits FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_customer_credits_updated_at
  BEFORE UPDATE ON public.customer_credits
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. Credit transactions (audit log)
CREATE TABLE public.credit_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  amount NUMERIC NOT NULL, -- positive = earned, negative = used
  reason TEXT NOT NULL, -- 'referral_referrer' | 'referral_referee' | 'booking_redemption' | 'admin_adjustment'
  referral_id UUID,
  booking_id UUID,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own credit transactions"
  ON public.credit_transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all transactions"
  ON public.credit_transactions FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 5. Booking columns for referral + credit tracking
ALTER TABLE public.bookings
  ADD COLUMN referral_code_used TEXT,
  ADD COLUMN credit_applied NUMERIC NOT NULL DEFAULT 0;

-- 6. Function: generate unique referral code
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_code TEXT;
  exists_check INT;
BEGIN
  LOOP
    new_code := upper(substring(md5(random()::text || clock_timestamp()::text) from 1 for 8));
    SELECT count(*) INTO exists_check FROM public.referral_codes WHERE code = new_code;
    EXIT WHEN exists_check = 0;
  END LOOP;
  RETURN new_code;
END;
$$;

-- 7. Function: auto-create referral code on signup
CREATE OR REPLACE FUNCTION public.create_referral_code_for_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.referral_codes (user_id, code)
  VALUES (NEW.id, public.generate_referral_code())
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.customer_credits (user_id, balance)
  VALUES (NEW.id, 0)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_referral ON auth.users;
CREATE TRIGGER on_auth_user_created_referral
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_referral_code_for_new_user();

-- 8. Backfill referral codes + credit rows for existing users
INSERT INTO public.referral_codes (user_id, code)
SELECT id, public.generate_referral_code()
FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO public.customer_credits (user_id, balance)
SELECT id, 0
FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

-- 9. Function: award referral credits when booking completes
CREATE OR REPLACE FUNCTION public.award_referral_on_completion()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_referrer_id UUID;
  v_referral_id UUID;
  v_reward NUMERIC := 25;
BEGIN
  -- Only fire when status becomes 'completed' and a referral code was used
  IF NEW.status = 'completed'
     AND (OLD.status IS DISTINCT FROM 'completed')
     AND NEW.referral_code_used IS NOT NULL
     AND NEW.customer_id IS NOT NULL THEN

    -- Look up the referrer
    SELECT user_id INTO v_referrer_id
    FROM public.referral_codes
    WHERE code = NEW.referral_code_used;

    -- Don't reward self-referrals
    IF v_referrer_id IS NULL OR v_referrer_id = NEW.customer_id THEN
      RETURN NEW;
    END IF;

    -- Don't double-reward (check if a referral already exists for this booking)
    IF EXISTS (SELECT 1 FROM public.referrals WHERE booking_id = NEW.id AND status = 'completed') THEN
      RETURN NEW;
    END IF;

    -- Insert referral record
    INSERT INTO public.referrals (referrer_user_id, referee_user_id, referee_email, booking_id, status, reward_amount, rewarded_at)
    VALUES (v_referrer_id, NEW.customer_id, NEW.customer_email, NEW.id, 'completed', v_reward, now())
    RETURNING id INTO v_referral_id;

    -- Credit the referrer
    UPDATE public.customer_credits
    SET balance = balance + v_reward,
        lifetime_earned = lifetime_earned + v_reward,
        updated_at = now()
    WHERE user_id = v_referrer_id;

    INSERT INTO public.credit_transactions (user_id, amount, reason, referral_id, booking_id, notes)
    VALUES (v_referrer_id, v_reward, 'referral_referrer', v_referral_id, NEW.id, 'Friend completed first cleaning');

    -- Credit the new customer (referee)
    UPDATE public.customer_credits
    SET balance = balance + v_reward,
        lifetime_earned = lifetime_earned + v_reward,
        updated_at = now()
    WHERE user_id = NEW.customer_id;

    INSERT INTO public.credit_transactions (user_id, amount, reason, referral_id, booking_id, notes)
    VALUES (NEW.customer_id, v_reward, 'referral_referee', v_referral_id, NEW.id, 'Welcome credit for first cleaning');
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS award_referral_on_booking_complete ON public.bookings;
CREATE TRIGGER award_referral_on_booking_complete
  AFTER UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.award_referral_on_completion();

-- 10. Indexes
CREATE INDEX idx_referrals_referrer ON public.referrals(referrer_user_id);
CREATE INDEX idx_referrals_booking ON public.referrals(booking_id);
CREATE INDEX idx_credit_transactions_user ON public.credit_transactions(user_id, created_at DESC);
CREATE INDEX idx_bookings_referral_code ON public.bookings(referral_code_used) WHERE referral_code_used IS NOT NULL;