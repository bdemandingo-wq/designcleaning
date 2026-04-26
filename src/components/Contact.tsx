import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Search, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useServiceAreas } from "@/hooks/useServiceAreas";
import { Link } from "react-router-dom";

const Contact = () => {
  const { get } = useSiteContent();
  const { areas } = useServiceAreas(true);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [zip, setZip] = useState("");
  const [zipResult, setZipResult] = useState<null | { covered: boolean; cityName?: string }>(null);

  const heading = get("contact_heading", "We're here to help.");
  const lead = get(
    "contact_lead",
    "Questions, custom quotes, or special requests — reach out and a real person will respond within 15 minutes during business hours."
  );
  const phoneNumber = get("contact_phone", "(202) 935-9934");
  const phoneTel = phoneNumber.replace(/\D/g, "");
  const emailAddr = get("contact_email", "DesignCleaning@proton.me");
  const hours = get("contact_hours", "Mon–Sat: 7am–7pm · Sun: 9am–5pm");
  const areaSummary = get("contact_area_summary", "Serving Gaithersburg, DC, and the greater DMV");

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: phoneNumber,
      subtitle: "Response in 15 minutes or less",
      href: `tel:${phoneTel}`,
    },
    {
      icon: Mail,
      title: "Email",
      value: emailAddr,
      subtitle: "Reply within 24 hours",
      href: `mailto:${emailAddr}`,
    },
    {
      icon: Clock,
      title: "Hours",
      value: hours,
      subtitle: "By appointment outside hours",
    },
    {
      icon: MapPin,
      title: "Service Area",
      value: areaSummary,
      subtitle: "See full list below",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await supabase.functions.invoke("send-sms-notification", {
        body: { type: "contact", data: formData },
      });
      toast({ title: "Message sent", description: "We'll be in touch shortly." });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Notification error:", err);
      toast({ title: "Something went wrong", description: "Please call us at " + phoneNumber, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const checkZip = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = zip.trim();
    if (!/^\d{5}$/.test(cleaned)) {
      setZipResult({ covered: false });
      return;
    }
    // Heuristic: any active service area indicates coverage. Since we don't store
    // per-zip data, treat as covered if any active areas exist; otherwise prompt to call.
    if (areas.length > 0) {
      setZipResult({ covered: true });
    } else {
      setZipResult({ covered: false });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {heading}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">{lead}</p>
        </div>



        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Left: contact info + service area check */}
          <div className="space-y-5">
            {contactInfo.map((info) => {
              const inner = (
                <CardContent className="flex items-start gap-4 p-5 min-h-[44px]">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {info.title}
                    </p>
                    <p className="font-semibold text-foreground break-words">{info.value}</p>
                    <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                  </div>
                </CardContent>
              );
              return info.href ? (
                <a key={info.title} href={info.href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
                  <Card className="shadow-sm hover:shadow-md hover:border-primary/40 transition-all">
                    {inner}
                  </Card>
                </a>
              ) : (
                <Card key={info.title} className="shadow-sm">
                  {inner}
                </Card>
              );
            })}

            {/* Service area check tool */}
            <Card className="border-primary/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="w-4 h-4 text-primary" aria-hidden="true" />
                  <h2 className="font-display font-semibold text-foreground">Check your area</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Enter your ZIP code to confirm we serve your neighborhood.
                </p>
                <form onSubmit={checkZip} className="flex gap-2">
                  <Input
                    inputMode="numeric"
                    pattern="\d{5}"
                    maxLength={5}
                    placeholder="ZIP code"
                    value={zip}
                    onChange={(e) => {
                      setZip(e.target.value.replace(/\D/g, ""));
                      setZipResult(null);
                    }}
                    aria-label="ZIP code"
                  />
                  <Button type="submit" className="min-h-[44px]">Check</Button>
                </form>
                {zipResult && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`mt-3 flex items-start gap-2 text-sm rounded-md p-3 ${
                      zipResult.covered
                        ? "bg-primary/10 text-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {zipResult.covered ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>
                          Likely covered. <Link to="/#booking" className="text-primary font-medium underline">Get an instant quote →</Link>
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>
                          Not sure about that ZIP. Call <a href={`tel:${phoneTel}`} className="text-primary font-medium underline">{phoneNumber}</a> and we'll confirm in seconds.
                        </span>
                      </>
                    )}
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-3">
                  Or browse all <Link to="/service-areas" className="underline hover:text-primary">service areas →</Link>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right: contact form */}
          <Card className="shadow-md">
            <CardContent className="p-6 md:p-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-1">
                Send us a message
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Prefer to talk? Call <a href={`tel:${phoneTel}`} className="text-primary underline font-medium">{phoneNumber}</a>.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="min-h-[44px]"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="min-h-[44px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone (optional)</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="min-h-[44px]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">How can we help?</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell us about your home, scheduling needs, or any special requests…"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full font-semibold bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg min-h-[48px]"
                >
                  {submitting ? "Sending…" : "Send Message"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  We respond within 15 minutes during business hours.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
