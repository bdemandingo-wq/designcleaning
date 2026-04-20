import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, CalendarX } from "lucide-react";

interface BlockedDate {
  id: string;
  blocked_date: string;
  reason: string | null;
  created_at: string;
}

const BlockedDatesManager = () => {
  const { toast } = useToast();
  const [dates, setDates] = useState<BlockedDate[]>([]);
  const [reason, setReason] = useState("");
  const [picked, setPicked] = useState<Date | undefined>();
  const [loading, setLoading] = useState(true);

  const fetchDates = async () => {
    const { data, error } = await supabase
      .from("booking_blocked_dates")
      .select("*")
      .order("blocked_date", { ascending: true });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setDates(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDates();
  }, []);

  const addDate = async () => {
    if (!picked) {
      toast({ title: "Pick a date", variant: "destructive" });
      return;
    }
    const iso = format(picked, "yyyy-MM-dd");
    const { error } = await supabase.from("booking_blocked_dates").insert({
      blocked_date: iso,
      reason: reason.trim() || null,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Date blocked", description: iso });
    setPicked(undefined);
    setReason("");
    fetchDates();
  };

  const deleteDate = async (id: string) => {
    const { error } = await supabase.from("booking_blocked_dates").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    fetchDates();
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Block a Date
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Calendar
            mode="single"
            selected={picked}
            onSelect={setPicked}
            disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
            className="rounded-md border pointer-events-auto"
          />
          <Input
            placeholder="Reason (optional, e.g. Holiday)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <Button onClick={addDate} className="w-full" disabled={!picked}>
            Block this date
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarX className="w-5 h-5" />
            Blocked Dates ({dates.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground text-sm">Loading…</p>
          ) : dates.length === 0 ? (
            <p className="text-muted-foreground text-sm">No blocked dates.</p>
          ) : (
            <div className="space-y-2 max-h-[420px] overflow-y-auto">
              {dates.map((d) => (
                <div key={d.id} className="flex items-center justify-between border rounded-lg p-3">
                  <div>
                    <p className="font-semibold">{format(new Date(d.blocked_date + "T00:00:00"), "EEE, MMM d, yyyy")}</p>
                    {d.reason && <p className="text-xs text-muted-foreground">{d.reason}</p>}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteDate(d.id)}
                    className="text-destructive hover:text-destructive"
                  >
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

export default BlockedDatesManager;
