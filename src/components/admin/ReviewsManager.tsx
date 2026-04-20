import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Check, X, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Review {
  id: string;
  customer_name: string;
  location: string | null;
  rating: number;
  review_text: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

const ReviewsManager = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setReviews((data as Review[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    const { error } = await supabase.from("reviews").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: `Review ${status}` });
    fetchReviews();
  };

  const deleteReview = async (id: string) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    fetchReviews();
  };

  const statusColor = (s: string) =>
    s === "approved"
      ? "bg-green-100 text-green-800 border-green-200"
      : s === "rejected"
      ? "bg-red-100 text-red-800 border-red-200"
      : "bg-yellow-100 text-yellow-800 border-yellow-200";

  // Filter out blank pending rows (token sent, customer hasn't submitted yet)
  const displayed = reviews.filter((r) => r.review_text && r.review_text.trim().length > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Reviews ({displayed.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : displayed.length === 0 ? (
          <p className="text-muted-foreground">No reviews submitted yet.</p>
        ) : (
          <div className="space-y-4">
            {displayed.map((r) => (
              <div key={r.id} className="border rounded-lg p-4">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-semibold">{r.customer_name}</h3>
                  {r.location && <span className="text-sm text-muted-foreground">{r.location}</span>}
                  <Badge className={statusColor(r.status)}>{r.status}</Badge>
                  <div className="flex gap-0.5 ml-auto">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < r.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground mb-3 whitespace-pre-wrap">{r.review_text}</p>
                <p className="text-xs text-muted-foreground mb-3">{format(new Date(r.created_at), "PPp")}</p>
                <div className="flex gap-2 flex-wrap">
                  {r.status !== "approved" && (
                    <Button size="sm" onClick={() => updateStatus(r.id, "approved")} className="gap-1">
                      <Check className="w-4 h-4" /> Approve
                    </Button>
                  )}
                  {r.status !== "rejected" && (
                    <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, "rejected")} className="gap-1">
                      <X className="w-4 h-4" /> Reject
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteReview(r.id)}
                    className="text-destructive hover:text-destructive ml-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewsManager;
