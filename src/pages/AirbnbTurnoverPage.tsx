import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BedDouble, Sparkles, Camera, Package, Clock, Trash2, KeyRound, Check, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PRICE_BANDS = [
  { key: "studio", label: "Studio / 1 Bedroom", range: "$120 – $150" },
  { key: "two", label: "2 Bedroom", range: "$150 – $180" },
  { key: "three", label: "3 Bedroom", range: "$180 – $220" },
  { key: "four", label: "4 Bedroom", range: "$220 – $260" },
  { key: "five", label: "5+ Bedroom", range: "Custom quote" },
];

const ADDONS = [
  { key: "linen", icon: Package, label: "Linen Service", price: "$25 – $40" },
  { key: "restock", icon: Sparkles, label: "Restocking", price: "$20" },
  { key: "rush", icon: Clock, label: "Same-Day Rush", price: "+$40" },
  { key: "trash", icon: Trash2, label: "Trash Haul", price: "$25" },
  { key: "early", icon: KeyRound, label: "Early Check-In", price: "+$25 – $40" },
  { key: "report", icon: Camera, label: "Damage Photo Report", price: "Included" },
];

const WHY = [
  "Same-day & back-to-back turnover slots",
  "Hotel-grade bed styling and linen swaps",
  "Photo report of damage or low supplies sent immediately",
  "Direct line to your dedicated turnover lead",
  "Insured, vetted, background-checked cleaners only",
];

const AirbnbTurnoverPage = () => {
  const { get } = useSiteContent();
  const f = (k: string, fb: string) => get(`airbnb_${k}`, fb);
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    bedrooms: "",
    frequency: "",
    notes: "",
  });

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.bedrooms) {
      toast({ title: "Missing info", description: "Please fill name, email, phone, and bedrooms.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const [first_name, ...rest] = form.name.trim().split(" ");
    const last_name = rest.join(" ") || "—";
    const { error } = await supabase.from("quote_requests").insert({
      first_name,
      last_name,
      email: form.email,
      phone: form.phone,
      address: form.address || "Airbnb property",
      city: form.city || "—",
      state: "—",
      zip: form.zip || "—",
      square_feet: "—",
      bedrooms: form.bedrooms,
      bathrooms: "—",
      frequency: form.frequency || "as-needed",
      current_clean_level: `Airbnb Turnover Quote — ${form.notes || "no notes"}`,
      consent_email: true,
      consent_sms: false,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Couldn't submit", description: error.message, variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "Request received", description: "We'll be in touch within 15 minutes during business hours." });
  };

  return (
    <>
      <SEOSchema
        pageTitle="Airbnb Turnover Cleaning in the DMV | Design Cleaning"
        pageDescription="Reliable Airbnb turnover cleaning across DC, MD, VA. Linen swaps, restocking, same-day turnovers, photo reports. Request a host quote in 60 seconds."
        canonicalUrl="https://designcleaningdmv.com/airbnb-turnover"
        pageType="service"
      />
      <main className="min-h-screen">
        <Navbar />

        {/* Hero */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
              <BedDouble className="w-4 h-4" /> For Hosts & Property Managers
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {f("hero_headline", "Airbnb Turnover Cleaning Hosts Trust")}
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              {f(
                "hero_subhead",
                "Same-day changeovers, hotel-grade presentation, and a damage photo report after every clean. Built to protect your 5-star rating — and your free time.",
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <a href="#quote">Request Host Quote</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:2029359934" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" /> (202) 935-9934
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Price Bands */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                {f("bands_title", "Turnover Price Ranges")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {f(
                  "bands_subtitle",
                  "Final price depends on property size, condition, supplies, and turnover window. Tell us about your listing and we'll send a fixed per-turnover quote.",
                )}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {PRICE_BANDS.map((b) => (
                <Card key={b.key} className="hover:border-primary/50 transition-all">
                  <CardContent className="p-5 text-center">
                    <p className="text-sm text-muted-foreground mb-2">{f(`band_${b.key}_label`, b.label)}</p>
                    <p className="font-display text-xl font-bold text-primary">
                      {f(`band_${b.key}_range`, b.range)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-6">
              {f("bands_disclaimer", "Ranges shown for transparency. Your custom quote will be a single fixed per-turnover price — no surprises.")}
            </p>
          </div>
        </section>

        {/* Add-ons */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-foreground mb-3">
                {f("addons_title", "Host Add-Ons")}
              </h2>
              <p className="text-muted-foreground">
                {f("addons_subtitle", "Optional services for hosts who want a true hands-off experience.")}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {ADDONS.map((a) => (
                <Card key={a.key}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <a.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {f(`addon_${a.key}_label`, a.label)}
                        </p>
                        <p className="text-sm text-primary font-medium">
                          {f(`addon_${a.key}_price`, a.price)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why hosts pick us */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-display text-3xl font-bold text-center text-foreground mb-8">
              {f("why_title", "Why Hosts Pick Design Cleaning")}
            </h2>
            <ul className="space-y-3">
              {WHY.map((w, i) => (
                <li key={i} className="flex items-start gap-3 bg-muted rounded-lg p-4">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{f(`why_${i + 1}`, w)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Quote form */}
        <section id="quote" className="py-20 bg-muted scroll-mt-24">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                {f("quote_title", "Get Your Host Quote")}
              </h2>
              <p className="text-muted-foreground">
                {f("quote_subtitle", "Tell us about your listing. We'll send a per-turnover price within 15 minutes during business hours.")}
              </p>
            </div>
            {submitted ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">Request received</h3>
                  <p className="text-muted-foreground mb-6">
                    We'll send your turnover quote shortly. Need it sooner? Call (202) 935-9934.
                  </p>
                  <Button asChild>
                    <Link to="/">Back to home</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="abnb_name">Full name *</Label>
                        <Input id="abnb_name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
                      </div>
                      <div>
                        <Label htmlFor="abnb_email">Email *</Label>
                        <Input id="abnb_email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="abnb_phone">Phone *</Label>
                        <Input id="abnb_phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                      </div>
                      <div>
                        <Label htmlFor="abnb_bedrooms">Bedrooms *</Label>
                        <Select value={form.bedrooms} onValueChange={(v) => update("bedrooms", v)}>
                          <SelectTrigger id="abnb_bedrooms"><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="studio">Studio / 1 BR</SelectItem>
                            <SelectItem value="2">2 BR</SelectItem>
                            <SelectItem value="3">3 BR</SelectItem>
                            <SelectItem value="4">4 BR</SelectItem>
                            <SelectItem value="5+">5+ BR</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="abnb_address">Property address</Label>
                      <Input id="abnb_address" value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Street + unit" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="abnb_city">City</Label>
                        <Input id="abnb_city" value={form.city} onChange={(e) => update("city", e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="abnb_zip">ZIP</Label>
                        <Input id="abnb_zip" value={form.zip} onChange={(e) => update("zip", e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="abnb_freq">Expected turnover frequency</Label>
                      <Select value={form.frequency} onValueChange={(v) => update("frequency", v)}>
                        <SelectTrigger id="abnb_freq"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="as-needed">As needed</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="multi-weekly">Multiple per week</SelectItem>
                          <SelectItem value="monthly">A few per month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="abnb_notes">Anything else? (linen, supply, access notes)</Label>
                      <Textarea id="abnb_notes" rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} />
                    </div>
                    <Button
                      type="submit"
                      disabled={submitting}
                      size="lg"
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      {submitting ? "Sending…" : "Request My Quote"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      We respond in 15 minutes or less during business hours.
                    </p>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default AirbnbTurnoverPage;
