import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Star, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ReviewSubmit = () => {
  const { token } = useParams<{ token: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState<boolean | null>(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [submitted, setSubmitted] = useState<"approved" | "pending" | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (!token) {
      setValid(false);
      setLoading(false);
      return;
    }
    (async () => {
      const { data, error } = await supabase.functions.invoke("get-review-token", {
        body: null,
        method: "GET" as any,
        headers: {},
      } as any).catch(() => ({ data: null, error: true }));
      // Fallback: invoke via fetch since GET with query params isn't standard for invoke
      const url = `https://qscroubuymspatqhqimh.supabase.co/functions/v1/get-review-token?token=${encodeURIComponent(token)}`;
      try {
        const res = await fetch(url, {
          headers: { apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzY3JvdWJ1eW1zcGF0cWhxaW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NTY5OTAsImV4cCI6MjA5MTIzMjk5MH0.sbSocwctJ68OWH4M6C2ykSrvqjKbPd9YsOPNx_aWqvM" },
        });
        const json = await res.json();
        if (!json.valid) {
          setValid(false);
        } else if (json.status === "approved" || json.status === "rejected") {
          setValid(true);
          setAlreadySubmitted(true);
        } else {
          setValid(true);
          if (json.customer_name) setName(json.customer_name);
          if (json.location) setLocation(json.location);
        }
      } catch {
        setValid(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }
    if (reviewText.trim().length < 10) {
      toast({ title: "Please write at least 10 characters", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-review", {
        body: { token, rating, review_text: reviewText.trim(), customer_name: name, location },
      });
      if (error) throw error;
      setSubmitted((data as any)?.status === "approved" ? "approved" : "pending");
    } catch (err: any) {
      toast({ title: "Submission failed", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Leave a Review | Design Cleaning</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-screen bg-muted py-8 sm:py-12 px-3 sm:px-4">
        <div className="max-w-xl mx-auto">
          <Card className="shadow-elevated">
            <CardContent className="p-6 sm:p-8">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-2">
                Share Your Experience
              </h1>
              <p className="text-center text-muted-foreground mb-6">Design Cleaning</p>

              {loading && <p className="text-center text-muted-foreground py-8">Loading…</p>}

              {!loading && valid === false && (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-3" />
                  <p className="font-semibold text-foreground mb-1">Link not valid</p>
                  <p className="text-sm text-muted-foreground mb-6">This review link has expired or is incorrect.</p>
                  <Button asChild variant="outline"><Link to="/">Back to Home</Link></Button>
                </div>
              )}

              {!loading && valid && alreadySubmitted && (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
                  <p className="font-semibold text-foreground mb-1">You've already submitted a review</p>
                  <p className="text-sm text-muted-foreground mb-6">Thank you!</p>
                  <Button asChild variant="outline"><Link to="/">Back to Home</Link></Button>
                </div>
              )}

              {!loading && valid && !alreadySubmitted && submitted && (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
                  <p className="font-semibold text-foreground mb-1">Thank you!</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    {submitted === "approved"
                      ? "Your review is now live. We appreciate your feedback."
                      : "Your feedback has been received. We'll review and post it shortly."}
                  </p>
                  <Button asChild variant="outline"><Link to="/">Back to Home</Link></Button>
                </div>
              )}

              {!loading && valid && !alreadySubmitted && !submitted && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label className="block mb-2">Your rating *</Label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          onMouseEnter={() => setHover(s)}
                          onMouseLeave={() => setHover(0)}
                          aria-label={`${s} star${s > 1 ? "s" : ""}`}
                          className="p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                        >
                          <Star
                            className={`w-9 h-9 transition-colors ${
                              (hover || rating) >= s ? "fill-accent text-accent" : "text-muted-foreground/40"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review">Tell us about your experience *</Label>
                    <Textarea
                      id="review"
                      rows={5}
                      placeholder="What stood out? What could we improve?"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      required
                      minLength={10}
                      maxLength={2000}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={120} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">City/Area (optional)</Label>
                      <Input
                        id="location"
                        placeholder="e.g. Bethesda"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        maxLength={120}
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                    {submitting ? "Submitting…" : "Submit Review"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ReviewSubmit;
