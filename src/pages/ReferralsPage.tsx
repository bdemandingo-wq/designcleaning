import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Gift,
  Copy,
  Check,
  Mail,
  MessageSquare,
  Share2,
  Wallet,
  Loader2,
  Phone,
  Heart,
  Users,
  DollarSign,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useReferral } from "@/hooks/useReferral";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEOSchema from "@/components/seo/SEOSchema";

interface ReferralRow {
  id: string;
  referee_email: string | null;
  status: string;
  reward_amount: number;
  rewarded_at: string | null;
  created_at: string;
}

const PHONE_DISPLAY = "(202) 935-9934";
const PHONE_HREF = "tel:+12029359934";

const ReferralsPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { myCode, balance, shareUrl, loading } = useReferral();
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState<ReferralRow[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("referrals")
      .select("id, referee_email, status, reward_amount, rewarded_at, created_at")
      .eq("referrer_user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setReferrals(data ?? []));
  }, [user, balance]);

  const handleCopy = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2200);
  };

  const shareSubject = "Try Design Cleaning — $25 off your first clean";
  const shareBody = shareUrl
    ? `Hey! I use Design Cleaning for my home and they're great. Use my link to get $25 off your first clean: ${shareUrl}`
    : "";

  return (
    <>
      <SEOSchema
        pageTitle="Refer a Friend, Get $25 | Design Cleaning"
        pageDescription="Love Design Cleaning? Refer a friend — when they book their first clean, you both get $25 off. No limit on referrals."
        canonicalUrl="https://designcleaningdmv.com/referrals"
        pageType="service"
      />
      <main className="min-h-screen bg-background">
        <Navbar />

        {/* HERO */}
        <section className="pt-28 pb-20 bg-gradient-to-b from-blue-50 via-blue-50/40 to-background">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
              <Gift className="w-4 h-4" />
              Earn While You Share
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Refer a Friend, Get $25
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Love our cleaning service? Share the sparkle with friends and family! When they
              book their first cleaning, you both save $25.
            </p>

            <div className="flex justify-center mb-8">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 text-base rounded-lg shadow-lg"
                asChild
              >
                <a href={PHONE_HREF} className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call to Refer: {PHONE_DISPLAY}
                </a>
              </Button>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/60 text-blue-700 text-sm">
              <Heart className="w-4 h-4" />
              No limit on referrals — earn unlimited credits!
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-14">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-10 md:gap-8">
              {[
                {
                  icon: Users,
                  title: "Share with Friends",
                  desc: "Tell your friends and family about Design Cleaning services.",
                },
                {
                  icon: Gift,
                  title: "They Book & Clean",
                  desc: "When they book their first cleaning and mention your name, they get $25 off.",
                },
                {
                  icon: DollarSign,
                  title: "You Earn Credit",
                  desc: "Once their cleaning is complete, you receive $25 credit toward your next service.",
                },
              ].map((step, i) => (
                <div key={step.title} className="text-center">
                  <div className="relative inline-block mb-5">
                    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto">
                      <step.icon className="w-9 h-9 text-blue-600" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shadow-md">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TWO BENEFIT CARDS */}
        <section className="py-16 bg-blue-50/30">
          <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-6">
            <Card className="p-8 border-2 border-blue-100">
              <h3 className="font-display text-2xl font-bold text-foreground mb-5">
                For You (The Referrer)
              </h3>
              <ul className="space-y-3">
                {[
                  ["$25 credit", "for each successful referral"],
                  ["No limit", "on how many friends you can refer"],
                  ["Stack credits", "toward free cleanings"],
                ].map(([bold, rest]) => (
                  <li key={bold} className="flex gap-3 text-foreground">
                    <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>{bold}</strong> {rest}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8 border-2 border-blue-100">
              <h3 className="font-display text-2xl font-bold text-foreground mb-5">
                For Your Friend
              </h3>
              <ul className="space-y-3">
                {[
                  ["$25 off", "their first cleaning service"],
                  ["No minimum", "booking required"],
                  ["Same great service", "you already love"],
                ].map(([bold, rest]) => (
                  <li key={bold} className="flex gap-3 text-foreground">
                    <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>{bold}</strong> {rest}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* PROGRAM DETAILS */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-10">
              Program Details
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              {[
                "Referral credit is applied after the referred friend's first cleaning is complete.",
                "Your friend must mention your name when booking to activate the referral.",
                "Credits can be used toward any Design Cleaning service.",
                "Credits do not expire and can be combined.",
                "Both new and existing customers can refer friends.",
                "Referred friends must be first-time Design Cleaning customers.",
                "Design Cleaning reserves the right to modify or end this program at any time.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-background">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Start Referring Today!
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Call us to refer a friend or have them mention your name when booking. It's that simple!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 rounded-lg"
                asChild
              >
                <a href={PHONE_HREF} className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call {PHONE_DISPLAY}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold px-8 py-6 rounded-lg"
                asChild
              >
                <Link to="/booking">Book Your Cleaning</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* LOGGED-IN DASHBOARD (kept for existing users) */}
        {!authLoading && user && (
          <section className="py-16 bg-muted/30 border-t border-border">
            <div className="container mx-auto px-4 max-w-3xl space-y-6">
              <div className="text-center mb-2">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Your Referral Dashboard
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Share your unique link to track referrals automatically.
                </p>
              </div>

              <Card className="p-6 bg-card border-2 border-blue-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Wallet className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Your available credit</p>
                    <p className="font-display text-3xl font-bold text-foreground">
                      ${balance.toFixed(2)}
                    </p>
                  </div>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link to="/booking">Book & Apply</Link>
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  Your unique link
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Every friend who books gets $25 off — and so do you.
                </p>
                {loading || !shareUrl ? (
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                ) : (
                  <>
                    <div className="flex gap-2 mb-4">
                      <Input value={shareUrl} readOnly className="font-mono text-sm" />
                      <Button onClick={handleCopy} className="shrink-0 bg-blue-600 hover:bg-blue-700">
                        {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">
                      Your code: <span className="font-mono font-semibold text-foreground">{myCode}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`sms:?body=${encodeURIComponent(shareBody)}`}>
                          <MessageSquare className="w-4 h-4 mr-1.5" /> Text
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={`mailto:?subject=${encodeURIComponent(shareSubject)}&body=${encodeURIComponent(shareBody)}`}
                        >
                          <Mail className="w-4 h-4 mr-1.5" /> Email
                        </a>
                      </Button>
                      {typeof navigator !== "undefined" && "share" in navigator && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigator
                              .share({ title: shareSubject, text: shareBody, url: shareUrl })
                              .catch(() => {})
                          }
                        >
                          <Share2 className="w-4 h-4 mr-1.5" /> Share
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </Card>

              {referrals.length > 0 && (
                <Card className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    Your referrals
                  </h3>
                  <div className="space-y-3">
                    {referrals.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {r.referee_email ?? "Friend"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(r.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-foreground">
                            ${Number(r.reward_amount).toFixed(0)}
                          </p>
                          <p
                            className={`text-xs font-medium ${
                              r.status === "completed" ? "text-blue-600" : "text-amber-600"
                            }`}
                          >
                            {r.status === "completed" ? "Earned ✓" : "Pending"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </section>
        )}

        <Footer />
      </main>
    </>
  );
};

export default ReferralsPage;
