import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSiteContent } from "@/hooks/useSiteContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Building2, Briefcase, ShoppingBag, Truck, HardHat, Phone, CheckCircle2,
} from "lucide-react";

const propertyTypes = [
  { value: "office", label: "Office" },
  { value: "retail", label: "Retail / Showroom" },
  { value: "medical", label: "Medical / Clinic" },
  { value: "warehouse", label: "Warehouse / Industrial" },
  { value: "post_construction", label: "Post-Construction" },
  { value: "other", label: "Other" },
];

const frequencies = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Bi-Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "onetime", label: "One-Time" },
];

const preferredTimes = [
  { value: "daytime", label: "Daytime (business hours)" },
  { value: "after_hours", label: "After hours / Evening" },
  { value: "weekends", label: "Weekends" },
  { value: "flexible", label: "Flexible" },
];

const categories = [
  { icon: Briefcase, key: "office", title: "Office Cleaning", desc: "Daily, weekly, and custom schedules for offices and co-working spaces." },
  { icon: Building2, key: "general", title: "General Commercial", desc: "Reliable cleaning for property management, common areas, and amenities." },
  { icon: ShoppingBag, key: "retail", title: "Retail & Showroom", desc: "Spotless presentation for the businesses your customers see first." },
  { icon: Truck, key: "tenant_turnover", title: "Move-Out / Tenant Turnover", desc: "Detailed turnover cleans for small offices between tenants." },
  { icon: HardHat, key: "post_construction", title: "Post-Construction", desc: "Custom-quoted post-build cleanup for offices and retail spaces." },
];

const pricingBands = [
  { range: "Under 1,000 sq ft", price: "from $120 / visit", note: "depending on frequency" },
  { range: "1,000 – 2,500 sq ft", price: "$150 – $250", note: "per visit, typical range" },
  { range: "2,500 – 5,000 sq ft", price: "$250 – $400", note: "per visit, typical range" },
  { range: "5,000+ sq ft or specialty", price: "Custom quote", note: "tailored scope & schedule" },
];

const defaultScope = [
  "Desk & surface wipe-downs",
  "Trash removal & liner replacement",
  "Restroom sanitation & restock",
  "Breakroom & kitchen wipe-down",
  "Vacuuming & floor care",
  "Entry glass & high-touch points",
  "Conference room reset",
  "Daily / weekly / custom scheduling",
];

const defaultAddOns = [
  "Interior glass & partitions",
  "Breakroom deep clean",
  "Restroom deep reset",
  "Floor buffing / polishing",
  "Carpet spot treatment",
  "Inside fridge / microwave",
  "Disinfection fogging",
  "Window cleaning (interior)",
];

const splitLines = (s: string, fallback: string[]) =>
  (s || fallback.join("\n")).split("\n").map((l) => l.trim()).filter(Boolean);

const CommercialPage = () => {
  const { toast } = useToast();
  const { get } = useSiteContent();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const heroTitle = get("commercial_hero_title", "Commercial & Office Cleaning in the DMV");
  const heroSub = get(
    "commercial_hero_sub",
    "Reliable, professional cleaning for offices, retail, medical, and property management. Quote-led pricing built around your space and schedule."
  );
  const scopeList = splitLines(get("commercial_scope_list", ""), defaultScope);
  const addOnsList = splitLines(get("commercial_addons_list", ""), defaultAddOns);

  const [form, setForm] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    property_type: "office",
    square_feet: "",
    restrooms: "",
    frequency: "weekly",
    preferred_time: "daytime",
    address: "",
    city: "",
    state: "MD",
    zip: "",
    message: "",
  });
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const toggleAddOn = (a: string) =>
    setSelectedAddOns((cur) => (cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company_name || !form.contact_name || !form.email || !form.phone || !form.property_type) {
      toast({ title: "Missing info", description: "Please fill out the required fields.", variant: "destructive" });
      return;
    }
    setSubmitting(true);

    // Persist to DB. Append add-ons + preferred time into message so we don't need a schema change.
    const enrichedMessage = [
      form.message?.trim(),
      selectedAddOns.length ? `Requested add-ons: ${selectedAddOns.join(", ")}` : "",
      form.preferred_time ? `Preferred time: ${form.preferred_time}` : "",
      form.restrooms ? `Restrooms: ${form.restrooms}` : "",
    ].filter(Boolean).join("\n");

    const { error } = await supabase.from("commercial_requests").insert({
      company_name: form.company_name,
      contact_name: form.contact_name,
      email: form.email,
      phone: form.phone,
      property_type: form.property_type,
      square_feet: form.square_feet,
      frequency: form.frequency,
      address: form.address,
      city: form.city,
      state: form.state,
      zip: form.zip,
      message: enrichedMessage,
      status: "new",
    });

    if (error) {
      setSubmitting(false);
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      return;
    }

    // Fire email notification (non-blocking on UX)
    try {
      await supabase.functions.invoke("send-commercial-request", {
        body: { ...form, restrooms: form.restrooms, add_ons: selectedAddOns },
      });
    } catch (err) {
      console.error("Email notification failed:", err);
    }

    setSubmitting(false);
    setSubmitted(true);
    toast({ title: "Request received", description: "We'll be in touch within 1 business day." });
  };

  return (
    <>
      <SEOSchema
        pageTitle="Commercial & Office Cleaning DMV | Custom Quote | Design Cleaning"
        pageDescription="Office, retail, medical, and post-construction cleaning across the DMV. Custom quotes with daily, weekly, or after-hours scheduling."
        canonicalUrl="https://designcleaningdmv.com/commercial"
        pageType="service"
      />
      <main className="min-h-screen">
        <Navbar />

        {/* Hero */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {heroTitle}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">{heroSub}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <a href="#commercial-quote">Request Custom Quote</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:2029359934" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" /> (202) 935-9934
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-foreground mb-3">
                Service Categories
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every commercial space is different — we tailor scope, schedule, and pricing to fit yours.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {categories.map((c) => (
                <div key={c.key} className="text-center bg-card border border-border rounded-xl p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <c.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-2">{c.title}</h3>
                  <p className="text-muted-foreground text-sm">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing guidance */}
        <section className="py-16 bg-muted/40">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-foreground mb-3">
                Starting Price Guidance
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ranges below are a starting point. Final pricing depends on frequency, scope, and access.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pricingBands.map((b) => (
                <Card key={b.range} className="border-border">
                  <CardContent className="p-6 text-center">
                    <div className="text-sm text-muted-foreground mb-2">{b.range}</div>
                    <div className="font-display text-xl font-bold text-foreground mb-1">{b.price}</div>
                    <div className="text-xs text-muted-foreground">{b.note}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Scope + Add-ons */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl">What's Included</CardTitle>
                <p className="text-sm text-muted-foreground">Standard office cleaning scope.</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {scopeList.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl">Available Add-Ons</CardTitle>
                <p className="text-sm text-muted-foreground">Mix and match to build your scope.</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {addOnsList.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quote form */}
        <section id="commercial-quote" className="py-20 bg-muted scroll-mt-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl">Request a Custom Commercial Quote</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Tell us about your space and we'll come back with a tailored quote within 1 business day.
                </p>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2">Thanks — we got it.</h3>
                    <p className="text-muted-foreground mb-6">
                      We'll review your request and reach out within 1 business day.
                    </p>
                    <Button asChild><Link to="/">Back to Home</Link></Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company_name">Business Name *</Label>
                        <Input id="company_name" value={form.company_name} onChange={(e) => update("company_name", e.target.value)} required />
                      </div>
                      <div>
                        <Label htmlFor="contact_name">Contact Name *</Label>
                        <Input id="contact_name" value={form.contact_name} onChange={(e) => update("contact_name", e.target.value)} required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Property Address</Label>
                        <Input id="address" value={form.address} onChange={(e) => update("address", e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" value={form.city} onChange={(e) => update("city", e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input id="state" value={form.state} onChange={(e) => update("state", e.target.value)} />
                        </div>
                        <div>
                          <Label htmlFor="zip">ZIP</Label>
                          <Input id="zip" value={form.zip} onChange={(e) => update("zip", e.target.value)} />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="property_type">Service Type *</Label>
                        <Select value={form.property_type} onValueChange={(v) => update("property_type", v)}>
                          <SelectTrigger id="property_type"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {propertyTypes.map((p) => (
                              <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="square_feet">Approximate Sq Ft</Label>
                        <Input id="square_feet" value={form.square_feet} onChange={(e) => update("square_feet", e.target.value)} placeholder="e.g. 5000" />
                      </div>
                      <div>
                        <Label htmlFor="restrooms">Number of Restrooms</Label>
                        <Input id="restrooms" value={form.restrooms} onChange={(e) => update("restrooms", e.target.value)} placeholder="e.g. 2" />
                      </div>
                      <div>
                        <Label htmlFor="frequency">Frequency Requested</Label>
                        <Select value={form.frequency} onValueChange={(v) => update("frequency", v)}>
                          <SelectTrigger id="frequency"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {frequencies.map((f) => (
                              <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="preferred_time">Preferred Service Time</Label>
                        <Select value={form.preferred_time} onValueChange={(v) => update("preferred_time", v)}>
                          <SelectTrigger id="preferred_time"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {preferredTimes.map((t) => (
                              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {addOnsList.length > 0 && (
                      <div>
                        <Label className="block mb-2">Add-Ons (optional)</Label>
                        <div className="grid sm:grid-cols-2 gap-2 bg-background border border-border rounded-md p-4">
                          {addOnsList.map((a) => {
                            const id = `addon-${a}`;
                            const checked = selectedAddOns.includes(a);
                            return (
                              <label key={a} htmlFor={id} className="flex items-center gap-2 cursor-pointer text-sm">
                                <Checkbox
                                  id={id}
                                  checked={checked}
                                  onCheckedChange={() => toggleAddOn(a)}
                                />
                                <span>{a}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="message">Special Requests</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Anything we should know — access details, special equipment, security, etc."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                      disabled={submitting}
                    >
                      {submitting ? "Sending..." : "Request Custom Quote"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default CommercialPage;
