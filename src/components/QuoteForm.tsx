import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Sparkles, Check, ArrowRight, ArrowLeft } from "lucide-react";

type FormState = {
  frequency: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  squareFeet: string;
  bedrooms: string;
  bathrooms: string;
  currentCleanLevel: string;
  consentEmail: boolean;
  consentSms: boolean;
};

const initial: FormState = {
  frequency: "One-Time",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  squareFeet: "",
  bedrooms: "",
  bathrooms: "",
  currentCleanLevel: "",
  consentEmail: false,
  consentSms: false,
};

const QuoteForm = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validateStep1 = () => {
    const required: (keyof FormState)[] = ["frequency", "firstName", "lastName", "email", "phone", "address", "city", "state", "zip"];
    for (const k of required) {
      if (!String(form[k]).trim()) {
        toast.error(`Please fill in ${k.replace(/([A-Z])/g, " $1").toLowerCase()}`);
        return false;
      }
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!form.squareFeet.trim() || !form.bedrooms.trim() || !form.bathrooms.trim() || !form.currentCleanLevel) {
      toast.error("Please fill in all home details");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setSubmitting(true);
    try {
      const { error: dbError } = await supabase.from("quote_requests").insert({
        frequency: form.frequency,
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
        square_feet: form.squareFeet,
        bedrooms: form.bedrooms,
        bathrooms: form.bathrooms,
        current_clean_level: form.currentCleanLevel,
        consent_email: form.consentEmail,
        consent_sms: form.consentSms,
      });
      if (dbError) throw dbError;

      const { error: fnError } = await supabase.functions.invoke("send-quote-request", {
        body: {
          frequency: form.frequency,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          squareFeet: form.squareFeet,
          bedrooms: form.bedrooms,
          bathrooms: form.bathrooms,
          currentCleanLevel: form.currentCleanLevel,
          consentEmail: form.consentEmail,
          consentSms: form.consentSms,
        },
      });
      if (fnError) console.warn("Email notification failed:", fnError);

      setDone(true);
      toast.success("Quote request received! We'll be in touch within 15 minutes.");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please call us at (202) 935-9934.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-secondary/30 to-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left column — copy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Free Instant Quote</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Get a Free Cleaning Quote in 60 Seconds
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tell us about your home and we'll send a personalized quote. No credit card. No spam. Just a friendly response within 15 minutes.
            </p>
            <ul className="space-y-3">
              {["Trained, background-checked professionals", "Transparent pricing — no surprises", "100% satisfaction guarantee"].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column — form */}
          <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 border border-border">
            {done ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Thanks, {form.firstName}!</h3>
                <p className="text-muted-foreground">We received your request and will respond within 15 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Progress */}
                <div className="flex items-center gap-2 mb-6">
                  <div className={`h-2 flex-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
                  <div className={`h-2 flex-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
                </div>
                <p className="text-sm text-muted-foreground mb-4">Step {step} of 2</p>

                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">How often do you need cleaning?</Label>
                      <RadioGroup
                        value={form.frequency}
                        onValueChange={(v) => update("frequency", v)}
                        className="grid grid-cols-2 gap-3"
                      >
                        {["One-Time", "Recurring"].map((opt) => (
                          <label
                            key={opt}
                            className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                              form.frequency === opt ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                            }`}
                          >
                            <RadioGroupItem value={opt} className="sr-only" />
                            <span className="font-medium">{opt}</span>
                          </label>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" value={form.address} onChange={(e) => update("address", e.target.value)} />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-1">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" value={form.city} onChange={(e) => update("city", e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" value={form.state} onChange={(e) => update("state", e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP</Label>
                        <Input id="zip" value={form.zip} onChange={(e) => update("zip", e.target.value)} />
                      </div>
                    </div>

                    <Button type="button" onClick={handleNext} className="w-full" size="lg">
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="sqft">Square Feet</Label>
                      <Input id="sqft" type="number" value={form.squareFeet} onChange={(e) => update("squareFeet", e.target.value)} placeholder="e.g. 1500" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="beds">Bedrooms</Label>
                        <Input id="beds" type="number" value={form.bedrooms} onChange={(e) => update("bedrooms", e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="baths">Bathrooms</Label>
                        <Input id="baths" type="number" step="0.5" value={form.bathrooms} onChange={(e) => update("bathrooms", e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <Label>Current Level of Clean</Label>
                      <Select value={form.currentCleanLevel} onValueChange={(v) => update("currentCleanLevel", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Light">Light — Generally tidy</SelectItem>
                          <SelectItem value="Average">Average — Normal use</SelectItem>
                          <SelectItem value="Heavy">Heavy — Needs deep cleaning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3 pt-2">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <Checkbox checked={form.consentEmail} onCheckedChange={(v) => update("consentEmail", !!v)} className="mt-0.5" />
                        <span className="text-sm text-muted-foreground">I agree to receive promotional emails about offers and updates.</span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <Checkbox checked={form.consentSms} onCheckedChange={(v) => update("consentSms", !!v)} className="mt-0.5" />
                        <span className="text-sm text-muted-foreground">I agree to receive text messages from Design Cleaning. Msg & data rates may apply.</span>
                      </label>
                    </div>

                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                      </Button>
                      <Button type="submit" disabled={submitting} className="flex-[2]" size="lg">
                        {submitting ? "Sending..." : "Get a Free Quote"}
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground text-center pt-2">
                      By submitting, you agree to our privacy policy. We will never sell or share your information. Unsubscribe anytime.
                    </p>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
