import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Briefcase, ShoppingBag, Stethoscope, Phone } from "lucide-react";

const propertyTypes = [
  { value: "office", label: "Office" },
  { value: "retail", label: "Retail / Storefront" },
  { value: "medical", label: "Medical / Clinic" },
  { value: "warehouse", label: "Warehouse / Industrial" },
  { value: "other", label: "Other" },
];

const frequencies = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Bi-Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "onetime", label: "One-Time" },
];

const verticals = [
  { icon: Briefcase, title: "Office Buildings", desc: "Daily and weekly cleans for offices and co-working spaces." },
  { icon: ShoppingBag, title: "Retail & Storefronts", desc: "Spotless presentation for the businesses your customers see first." },
  { icon: Stethoscope, title: "Medical & Clinics", desc: "Detailed sanitization for waiting rooms, exam rooms, and lobbies." },
  { icon: Building2, title: "Property Management", desc: "Reliable cleaning across multiple units, common areas, and amenities." },
];

const CommercialPage = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    property_type: "office",
    square_feet: "",
    frequency: "weekly",
    address: "",
    city: "",
    state: "MD",
    zip: "",
    message: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company_name || !form.contact_name || !form.email || !form.phone || !form.property_type) {
      toast({ title: "Missing info", description: "Please fill out the required fields.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("commercial_requests").insert({ ...form, status: "new" });
    setSubmitting(false);
    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
    } else {
      setSubmitted(true);
      toast({ title: "Request received", description: "We'll be in touch within 1 business day." });
    }
  };

  return (
    <>
      <SEOSchema
        pageTitle="Commercial & Office Cleaning in the DMV | Design Cleaning"
        pageDescription="Reliable commercial and office cleaning across the DMV. Offices, retail, medical, and property management. Request a custom quote."
        canonicalUrl="https://designcleaningdmv.com/commercial"
        pageType="service"
      />
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Commercial & Office Cleaning
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
              Reliable, professional cleaning for offices, retail, medical, and property management across the DMV.
            </p>
            <Button size="lg" variant="outline" asChild>
              <a href="tel:2029359934" className="flex items-center gap-2">
                <Phone className="w-5 h-5" /> Call (202) 935-9934
              </a>
            </Button>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {verticals.map((v) => (
                <div key={v.title} className="text-center bg-card border border-border rounded-xl p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-display text-lg font-semibold text-foreground mb-2">{v.title}</h2>
                  <p className="text-muted-foreground text-sm">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl">Request a Custom Commercial Quote</CardTitle>
                <p className="text-sm text-muted-foreground">Tell us about your space and we'll come back with a tailored quote within 1 business day.</p>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2">Thanks — we got it.</h3>
                    <p className="text-muted-foreground mb-6">We'll review your request and reach out within 1 business day.</p>
                    <Button asChild><Link to="/">Back to Home</Link></Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company_name">Company Name *</Label>
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
                      <div>
                        <Label htmlFor="property_type">Property Type *</Label>
                        <Select value={form.property_type} onValueChange={(v) => update("property_type", v)}>
                          <SelectTrigger id="property_type"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {propertyTypes.map((p) => (<SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="frequency">Frequency</Label>
                        <Select value={form.frequency} onValueChange={(v) => update("frequency", v)}>
                          <SelectTrigger id="frequency"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {frequencies.map((f) => (<SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="square_feet">Square Footage</Label>
                        <Input id="square_feet" value={form.square_feet} onChange={(e) => update("square_feet", e.target.value)} placeholder="e.g. 5000" />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" value={form.city} onChange={(e) => update("city", e.target.value)} />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" value={form.address} onChange={(e) => update("address", e.target.value)} />
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
                    <div>
                      <Label htmlFor="message">Tell us about your needs</Label>
                      <Textarea id="message" rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={submitting}>
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
