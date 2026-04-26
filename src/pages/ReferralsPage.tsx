import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Gift, Copy, Check, Mail, MessageSquare, Share2, Wallet, ArrowRight, Loader2 } from "lucide-react";
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

const ReferralsPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { myCode, balance, shareUrl, loading } = useReferral();
  const navigate = useNavigate();
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

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Logged-out: prompt sign-in / sign-up
  if (!user) {
    return (
      <>
        <SEOSchema
          pageTitle="Refer a Friend, Earn $25 | Design Cleaning"
          pageDescription="Share Design Cleaning with friends. You both get $25 off when they book their first clean."
          canonicalUrl="https://designcleaningdmv.com/referrals"
          pageType="default"
        />
        <main className="min-h-screen">
          <Navbar />
          <section className="pt-32 pb-20 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <div className="container mx-auto px-4 max-w-2xl text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/15 mb-6">
                <Gift className="w-8 h-8" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Refer Friends. Earn $25 Each.
              </h1>
              <p className="text-white/90 text-lg mb-8">
                Sign in to grab your unique referral link. When a friend books their first
                clean, you both get $25 off automatically.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-white/90 font-semibold" asChild>
                  <Link to="/auth?mode=signup&redirect=/referrals">Create Account</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-emerald-700 bg-transparent"
                  asChild
                >
                  <Link to="/auth?redirect=/referrals">Sign In</Link>
                </Button>
              </div>
            </div>
          </section>
          <Footer />
        </main>
      </>
    );
  }

  return (
    <>
      <SEOSchema
        pageTitle="My Referral Link | Design Cleaning"
        pageDescription="Share your Design Cleaning referral link and earn $25 for every friend who books."
        canonicalUrl="https://designcleaningdmv.com/referrals"
        pageType="default"
      />
      <main className="min-h-screen bg-muted/30">
        <Navbar />

        {/* Hero */}
        <section className="pt-28 pb-12 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/15 mb-5">
              <Gift className="w-7 h-7" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Tell a Friend. Earn $25.
            </h1>
            <p className="text-white/90 max-w-xl mx-auto">
              Share your link below. When your friend books their first cleaning,
              you both get a $25 credit applied automatically.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl space-y-6">
            {/* Credit balance */}
            <Card className="p-6 bg-card border-2 border-primary/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Your available credit</p>
                  <p className="font-display text-3xl font-bold text-foreground">
                    ${balance.toFixed(2)}
                  </p>
                </div>
                <Button asChild>
                  <Link to="/booking">Book & Apply</Link>
                </Button>
              </div>
            </Card>

            {/* Share link */}
            <Card className="p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-1">
                Your unique link
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Share this link any way you like. Every friend who books gets $25 off — and so do you.
              </p>
              {loading || !shareUrl ? (
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              ) : (
                <>
                  <div className="flex gap-2 mb-4">
                    <Input value={shareUrl} readOnly className="font-mono text-sm" />
                    <Button onClick={handleCopy} className="shrink-0">
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
                      <a href={`mailto:?subject=${encodeURIComponent(shareSubject)}&body=${encodeURIComponent(shareBody)}`}>
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

            {/* How it works */}
            <Card className="p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">
                How it works
              </h2>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">1</span>
                  <span>Share your link with friends, family, or neighbors.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">2</span>
                  <span>They book their first cleaning through your link.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">3</span>
                  <span>Once their cleaning is complete, you both get $25 in credit added automatically.</span>
                </li>
              </ol>
            </Card>

            {/* Referral history */}
            <Card className="p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">
                Your referrals
              </h2>
              {referrals.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No referrals yet. Share your link above to get started!
                </p>
              ) : (
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
                            r.status === "completed"
                              ? "text-emerald-600"
                              : "text-amber-600"
                          }`}
                        >
                          {r.status === "completed" ? "Earned ✓" : "Pending"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ReferralsPage;
