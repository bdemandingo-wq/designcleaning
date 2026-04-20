import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, RefreshCw, Mail, Phone, MapPin, Home, Calendar } from "lucide-react";

interface QuoteRequest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  square_feet: string;
  bedrooms: string;
  bathrooms: string;
  frequency: string;
  current_clean_level: string;
  consent_email: boolean;
  consent_sms: boolean;
  status: string;
  created_at: string;
}

const statusOptions = ["new", "contacted", "quoted", "won", "lost"] as const;

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
  quoted: "bg-purple-100 text-purple-800 border-purple-200",
  won: "bg-green-100 text-green-800 border-green-200",
  lost: "bg-red-100 text-red-800 border-red-200",
};

const QuoteRequestsManager = () => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setQuotes(data || []);
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to load quote requests.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("quote_requests")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
      setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
      toast({ title: "Updated", description: `Status set to ${status}.` });
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
    }
  };

  const deleteQuote = async (id: string) => {
    try {
      const { error } = await supabase.from("quote_requests").delete().eq("id", id);
      if (error) throw error;
      setQuotes((prev) => prev.filter((q) => q.id !== id));
      toast({ title: "Deleted", description: "Quote request removed." });
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to delete quote request.",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchQuotes();
  };

  const stats = {
    total: quotes.length,
    new: quotes.filter((q) => q.status === "new").length,
    won: quotes.filter((q) => q.status === "won").length,
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading…</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Quote Requests</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {stats.total} total · {stats.new} new · {stats.won} won
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {quotes.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No quote requests yet.</p>
        ) : (
          <div className="space-y-4">
            {quotes.map((q) => (
              <div
                key={q.id}
                className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-semibold text-foreground">
                        {q.first_name} {q.last_name}
                      </h3>
                      <Badge className={statusColors[q.status] || statusColors.new}>
                        {q.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(q.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <p className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        <a href={`mailto:${q.email}`} className="hover:text-primary truncate">
                          {q.email}
                        </a>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        <a href={`tel:${q.phone}`} className="hover:text-primary">
                          {q.phone}
                        </a>
                      </p>
                      <p className="flex items-center gap-1.5 sm:col-span-2">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">
                          {q.address}, {q.city}, {q.state} {q.zip}
                        </span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Home className="w-3.5 h-3.5" />
                        {q.square_feet} sq ft · {q.bedrooms} bd · {q.bathrooms} ba
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {q.frequency} · {q.current_clean_level}
                      </p>
                    </div>
                    <div className="mt-2 flex gap-2 text-xs flex-wrap">
                      {q.consent_email && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          Email OK
                        </span>
                      )}
                      {q.consent_sms && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          SMS OK
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Select
                      value={q.status}
                      onValueChange={(v) => updateStatus(q.id, v)}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete quote request?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently remove {q.first_name} {q.last_name}'s
                            request. This cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteQuote(q.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuoteRequestsManager;
