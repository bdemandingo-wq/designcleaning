
-- Drop the permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can create a booking" ON public.bookings;

-- Create a more secure INSERT policy:
-- Authenticated users must set customer_id to their own uid
-- Unauthenticated users (guest checkout) can still insert with NULL customer_id
CREATE POLICY "Users can create bookings" ON public.bookings
FOR INSERT
WITH CHECK (
  (auth.uid() IS NULL) OR (customer_id = auth.uid())
);

-- Create trigger to auto-set customer_id for authenticated users
CREATE OR REPLACE FUNCTION public.set_booking_customer_id()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  IF auth.uid() IS NOT NULL AND NEW.customer_id IS NULL THEN
    NEW.customer_id = auth.uid();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_booking_customer_id_trigger
  BEFORE INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_booking_customer_id();
