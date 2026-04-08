-- Drop existing SELECT policies on bookings
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Customers can view their own bookings" ON public.bookings;

-- Create PERMISSIVE SELECT policies (OR logic - either condition grants access)
-- Admins can view all bookings
CREATE POLICY "Admins can view all bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Customers can only view their own bookings (must be authenticated and match customer_id)
CREATE POLICY "Customers can view their own bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (customer_id = auth.uid());