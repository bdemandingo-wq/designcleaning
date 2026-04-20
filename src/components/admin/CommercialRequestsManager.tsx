import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CommercialRequest {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  property_type: string;
  square_feet: string | null;
  frequency: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: "bg-yellow-100 text-yellow-800 border-yellow-200",
  contacted: "bg-blue-100 text-blue-800 border-blue-200",
  quoted: "bg-purple-100 text-purple-800 border-purple-200",
  won: "bg-green-100 text-green-800 border-green-200",
  lost: "bg-red-100 text-red-800 border-red-200",
};

const CommercialRequestsManager = () => {
  const [requests, setRequests] = useState<CommercialRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("commercial_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setRequests((data as CommercialRequest[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("commercial_requests").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } else {
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      toast({ title: "Status updated" });
    }
  };

  const deleteRequest = async (id: string) => {
    const { error } = await supabase.from("commercial_requests").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      setRequests((prev) => prev.filter((r) => r.id !== id));
      toast({ title: "Deleted" });
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading commercial requests...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commercial Requests ({requests.length})</CardTitle>
        <p className="text-sm text-muted-foreground">
          B2B leads from the commercial inquiry form. (Form UI not yet built — submissions will appear here once it's live.)
        </p>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No commercial requests yet.</p>
        ) : (
          <div className="space-y-4">
            {requests.map((r) => (
              <div key={r.id} className="border border-border rounded-lg p-4">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-semibold text-foreground">{r.company_name}</h3>
                      <Badge className={STATUS_COLORS[r.status] || ""}>{r.status}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-muted-foreground">
                      <p>👤 {r.contact_name}</p>
                      <p>📧 {r.email}</p>
                      <p>📞 {r.phone}</p>
                      <p>🏢 {r.property_type}{r.square_feet ? ` • ${r.square_feet} sq ft` : ""}</p>
                      {r.frequency && <p>🔁 {r.frequency}</p>}
                      {(r.city || r.state) && <p>📍 {[r.address, r.city, r.state, r.zip].filter(Boolean).join(", ")}</p>}
                    </div>
                    {r.message && (
                      <p className="mt-2 text-sm text-foreground bg-muted rounded p-2">
                        <strong>Message:</strong> {r.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v)}>
                      <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="quoted">Quoted</SelectItem>
                        <SelectItem value="won">Won</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete request?</AlertDialogTitle>
                          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteRequest(r.id)} className="bg-destructive text-destructive-foreground">
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

export default CommercialRequestsManager;
