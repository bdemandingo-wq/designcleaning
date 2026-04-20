import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Conversation {
  id: string;
  flow_type: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  estimate_amount: number | null;
  converted_to_booking: boolean;
  status: string;
  answers: any;
  created_at: string;
}

interface AbandonedLead {
  id: string;
  flow_type: string;
  customer_name: string | null;
  customer_email: string;
  customer_phone: string | null;
  estimate_amount: number | null;
  followup_sent: boolean;
  followup_sent_at: string | null;
  created_at: string;
}

const ChatbotLeadsManager = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [leads, setLeads] = useState<AbandonedLead[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: convs }, { data: ls }] = await Promise.all([
      (supabase.from("chatbot_conversations") as any).select("*").order("created_at", { ascending: false }).limit(100),
      (supabase.from("abandoned_leads") as any).select("*").order("created_at", { ascending: false }).limit(100),
    ]);
    setConversations((convs as Conversation[]) || []);
    setLeads((ls as AbandonedLead[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const deleteConv = async (id: string) => {
    await (supabase.from("chatbot_conversations") as any).delete().eq("id", id);
    setConversations((prev) => prev.filter((c) => c.id !== id));
    toast({ title: "Conversation deleted" });
  };

  const deleteLead = async (id: string) => {
    await (supabase.from("abandoned_leads") as any).delete().eq("id", id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
    toast({ title: "Lead deleted" });
  };

  if (loading) return <p className="text-muted-foreground py-8 text-center">Loading…</p>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Abandoned Leads ({leads.length})</CardTitle>
          <Button variant="outline" size="sm" onClick={fetchAll}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">No abandoned leads yet.</p>
          ) : (
            <div className="space-y-3">
              {leads.map((l) => (
                <div key={l.id} className="border border-border rounded-lg p-4 flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{l.customer_name || "Anonymous"}</h4>
                      <Badge variant={l.flow_type === "residential" ? "default" : "secondary"}>{l.flow_type}</Badge>
                      {l.followup_sent ? (
                        <Badge className="bg-green-100 text-green-800">Follow-up sent</Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <p>📧 {l.customer_email}</p>
                      <p>📞 {l.customer_phone || "—"}</p>
                      <p>💰 {l.estimate_amount ? `$${Number(l.estimate_amount).toFixed(2)}` : "—"}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(l.created_at).toLocaleString()}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteLead(l.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Chatbot Conversations ({conversations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {conversations.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">No conversations yet.</p>
          ) : (
            <div className="space-y-3">
              {conversations.map((c) => (
                <div key={c.id} className="border border-border rounded-lg p-4 flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{c.customer_name || "Anonymous"}</h4>
                      <Badge variant={c.flow_type === "residential" ? "default" : "secondary"}>{c.flow_type}</Badge>
                      <Badge variant="outline">{c.status}</Badge>
                      {c.converted_to_booking && <Badge className="bg-green-100 text-green-800">Booked</Badge>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <p>📧 {c.customer_email || "—"}</p>
                      <p>📞 {c.customer_phone || "—"}</p>
                      <p>💰 {c.estimate_amount ? `$${Number(c.estimate_amount).toFixed(2)}` : "—"}</p>
                    </div>
                    <details className="mt-2 text-xs">
                      <summary className="cursor-pointer text-primary">View answers</summary>
                      <pre className="bg-muted rounded p-2 mt-1 overflow-x-auto">{JSON.stringify(c.answers, null, 2)}</pre>
                    </details>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(c.created_at).toLocaleString()}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteConv(c.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotLeadsManager;
