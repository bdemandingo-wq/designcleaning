import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, User, Mail, Phone, Home, MapPin, MessageSquare, PawPrint, CalendarIcon, AlertTriangle, Sun, Moon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useBookingAvailability } from "@/hooks/useBookingAvailability";
import { useReferral } from "@/hooks/useReferral";
import { Gift } from "lucide-react";

interface BookingState { sqft: number; serviceType: string; frequency: string; addOns: string[]; totalPrice: string; }

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const booking = location.state as BookingState | null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", beds: "", baths: "", accessInstructions: "", focusAreas: "", hasPets: "", petDetails: "" });
  const [preferredDate, setPreferredDate] = useState<Date | undefined>();
  const [timeSlot, setTimeSlot] = useState<"morning" | "afternoon" | "">("");
  const { isDateUnavailable, slotAvailable, loading: availLoading } = useBookingAvailability();
  const { getStoredReferralCode, balance: creditBalance, clearStoredReferralCode } = useReferral();
  const referralCode = getStoredReferralCode();
  const totalNum = parseFloat(booking?.totalPrice ?? "0") || 0;
  const creditApplied = Math.min(creditBalance, Math.max(0, totalNum));
  const finalTotal = Math.max(0, totalNum - creditApplied);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);
  minDate.setHours(0, 0, 0, 0);

  // Reset slot if it becomes unavailable for chosen date
  useEffect(() => {
    if (preferredDate && timeSlot && !slotAvailable(preferredDate, timeSlot as "morning" | "afternoon")) {
      setTimeSlot("");
    }
  }, [preferredDate, timeSlot, slotAvailable]);

  useEffect(() => { if (!booking) navigate({ pathname: "/", hash: "#booking" }, { replace: true }); }, [booking, navigate]);
  if (!booking) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preferredDate) {
      toast({ title: "Pick a date", description: "Please select your preferred service date.", variant: "destructive" });
      return;
    }
    if (!timeSlot) {
      toast({ title: "Pick a time slot", description: "Please choose Morning or Afternoon.", variant: "destructive" });
      return;
    }
    if (!slotAvailable(preferredDate, timeSlot)) {
      toast({ title: "Slot just filled up", description: "Please pick another time or date.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error: dbError } = await supabase.from("bookings").insert({
        customer_name: formData.name, customer_email: formData.email, customer_phone: formData.phone,
        address: formData.address, beds: formData.beds, baths: formData.baths, sqft: booking.sqft,
        service_type: booking.serviceType, frequency: booking.frequency, add_ons: booking.addOns,
        total_price: parseFloat(booking.totalPrice),
        preferred_date: format(preferredDate, "yyyy-MM-dd"),
        time_slot: timeSlot,
        special_instructions: `${formData.accessInstructions}\n\nFocus Areas: ${formData.focusAreas}`.trim() || null,
        pet_info: formData.hasPets !== "no" ? `${formData.hasPets} - ${formData.petDetails}` : null,
        status: "pending" as const,
      } as any);
      if (dbError) { toast({ title: "Error", description: "Failed to save booking.", variant: "destructive" }); setIsSubmitting(false); return; }

      if (typeof window.gtag === "function") window.gtag("event", "generate_lead", { event_category: "booking", value: parseFloat(booking.totalPrice) || 0, currency: "USD" });

      try { await supabase.functions.invoke("send-sms-notification", { body: { type: "booking", data: { customerName: formData.name, customerPhone: formData.phone, serviceType: booking.serviceType, totalPrice: booking.totalPrice } } }); } catch {}

      const slotLabel = timeSlot === "morning" ? "Morning (8am–12pm)" : "Afternoon (12pm–5pm)";
      navigate("/confirmation", { state: { ...booking, ...formData, preferredDate: `${format(preferredDate, "EEEE, MMMM d, yyyy")} • ${slotLabel}` } });
    } catch { toast({ title: "Error", description: "Something went wrong.", variant: "destructive" }); }
    finally { setIsSubmitting(false); }
  };

  const handleInputChange = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen bg-muted py-8 sm:py-12 px-3 sm:px-4">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 sm:mb-6 min-h-[44px]"><ArrowLeft className="w-4 h-4" />Back to pricing</button>
        <Card className="shadow-elevated">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">Complete Your Booking</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Provide your details to schedule your cleaning.</p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-display font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wide">Same / Next Day Cleaning?</p>
                <p className="text-sm text-amber-700 dark:text-amber-500"><p className="text-sm text-amber-700 dark:text-amber-500">Call us at <a href="tel:2029359934" className="font-semibold underline">(202) 935-9934</a></p></p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div className="min-w-0"><p className="text-sm text-muted-foreground">Your Service</p><p className="font-semibold text-foreground break-words">{booking.serviceType} • {booking.frequency}</p><p className="text-sm text-muted-foreground">{booking.sqft.toLocaleString()} sq ft</p></div>
                <div className="sm:text-right"><p className="text-sm text-muted-foreground">Total</p><p className="text-2xl font-bold text-primary">${booking.totalPrice}</p></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h2 className="font-semibold text-foreground flex items-center gap-2"><CalendarIcon className="w-4 h-4 text-primary" />Preferred Date & Time</h2>
                <Popover><PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left min-h-[44px]", !preferredDate && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{preferredDate ? format(preferredDate, "EEEE, MMMM d, yyyy") : "Pick a date"}</Button>
                </PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={preferredDate} onSelect={setPreferredDate} disabled={(date) => date < minDate || isDateUnavailable(date)} initialFocus className="p-3 pointer-events-auto" /></PopoverContent></Popover>
                {availLoading && <p className="text-xs text-muted-foreground">Checking availability…</p>}
                {preferredDate && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Choose a time slot:</p>
                    <div className="grid grid-cols-2 gap-3">
                      {(["morning", "afternoon"] as const).map((slot) => {
                        const available = slotAvailable(preferredDate, slot);
                        const selected = timeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={!available}
                            onClick={() => setTimeSlot(slot)}
                            className={cn(
                              "rounded-lg border-2 p-4 text-left transition-all min-h-[72px]",
                              selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                              !available && "opacity-50 cursor-not-allowed bg-muted",
                            )}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {slot === "morning" ? <Sun className="w-4 h-4 text-primary" /> : <Moon className="w-4 h-4 text-primary" />}
                              <span className="font-semibold text-foreground capitalize">{slot}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {slot === "morning" ? "8am – 12pm" : "12pm – 5pm"}
                            </p>
                            {!available && <p className="text-xs text-destructive mt-1">Fully booked</p>}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-muted-foreground">We'll confirm exact arrival time via text.</p>
                  </div>
                )}
              </div>


              <div className="space-y-4">
                <h2 className="font-semibold text-foreground flex items-center gap-2"><User className="w-4 h-4 text-primary" />Contact</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label htmlFor="name">Full Name *</Label><Input id="name" value={formData.name} onChange={e => handleInputChange("name", e.target.value)} required /></div>
                  <div className="space-y-2"><Label htmlFor="phone">Phone *</Label><div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input id="phone" type="tel" placeholder="(202) 555-0123" className="pl-10" value={formData.phone} onChange={e => handleInputChange("phone", e.target.value)} required /></div></div>
                </div>
                <div className="space-y-2"><Label htmlFor="email">Email *</Label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input id="email" type="email" className="pl-10" value={formData.email} onChange={e => handleInputChange("email", e.target.value)} required /></div></div>
              </div>

              <div className="space-y-4">
                <h2 className="font-semibold text-foreground flex items-center gap-2"><Home className="w-4 h-4 text-primary" />Property</h2>
                <div className="space-y-2"><Label htmlFor="address">Address *</Label><div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input id="address" placeholder="123 Main St, Gaithersburg, MD" className="pl-10" value={formData.address} onChange={e => handleInputChange("address", e.target.value)} required /></div></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Bedrooms *</Label><Select value={formData.beds} onValueChange={v => handleInputChange("beds", v)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{["1","2","3","4","5","6+"].map(v => <SelectItem key={v} value={v}>{v} Bedroom{v!=="1"?"s":""}</SelectItem>)}</SelectContent></Select></div>
                  <div className="space-y-2"><Label>Bathrooms *</Label><Select value={formData.baths} onValueChange={v => handleInputChange("baths", v)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{["1","1.5","2","2.5","3","3.5","4+"].map(v => <SelectItem key={v} value={v}>{v} Bathroom{v!=="1"?"s":""}</SelectItem>)}</SelectContent></Select></div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="font-semibold text-foreground flex items-center gap-2"><MessageSquare className="w-4 h-4 text-primary" />Special Instructions</h2>
                <Textarea id="access" placeholder="Access instructions, focus areas, etc." rows={3} value={formData.accessInstructions} onChange={e => handleInputChange("accessInstructions", e.target.value)} />
                <div className="space-y-4">
                  <div className="flex items-center gap-2"><PawPrint className="w-4 h-4 text-primary" /><Label>Pets?</Label></div>
                  <Select value={formData.hasPets} onValueChange={v => handleInputChange("hasPets", v)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="no">No pets</SelectItem><SelectItem value="dog">Dog(s)</SelectItem><SelectItem value="cat">Cat(s)</SelectItem><SelectItem value="both">Dogs & Cats</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select>
                  {formData.hasPets && formData.hasPets !== "no" && <Input placeholder="Pet details" value={formData.petDetails} onChange={e => handleInputChange("petDetails", e.target.value)} />}
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full text-lg font-semibold" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Confirm Booking"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingForm;
