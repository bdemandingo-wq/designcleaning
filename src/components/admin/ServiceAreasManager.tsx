import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Save } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AreaRow {
  id: string;
  slug: string;
  name: string;
  state: string;
  travel_fee: number;
  tier: string;
  is_active: boolean;
  sort_order: number;
}

const ServiceAreasManager = () => {
  const [rows, setRows] = useState<AreaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchRows = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("service_areas")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setRows((data as AreaRow[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const updateRow = (id: string, patch: Partial<AreaRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const saveRow = async (row: AreaRow) => {
    setSaving(row.id);
    const { error } = await supabase
      .from("service_areas")
      .update({
        slug: row.slug,
        name: row.name,
        state: row.state,
        travel_fee: row.travel_fee,
        tier: row.tier,
        is_active: row.is_active,
        sort_order: row.sort_order,
      })
      .eq("id", row.id);
    setSaving(null);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved", description: `${row.name} updated.` });
    }
  };

  const deleteRow = async (id: string) => {
    const { error } = await supabase.from("service_areas").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      setRows((prev) => prev.filter((r) => r.id !== id));
      toast({ title: "Deleted", description: "Service area removed." });
    }
  };

  const addArea = async () => {
    const nextOrder = rows.length ? Math.max(...rows.map((r) => r.sort_order)) + 1 : 1;
    const { data, error } = await supabase
      .from("service_areas")
      .insert({
        slug: `new-city-${Date.now()}`,
        name: "New City",
        state: "MD",
        travel_fee: 0,
        tier: "standard",
        is_active: true,
        sort_order: nextOrder,
      })
      .select()
      .single();
    if (error) {
      toast({ title: "Add failed", description: error.message, variant: "destructive" });
    } else if (data) {
      setRows((prev) => [...prev, data as AreaRow]);
      toast({ title: "Added", description: "Edit the slug & name then save." });
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading service areas...</p>;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Service Areas</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Cities where you operate. The slug must match your city landing page URL (e.g. <code>bethesda-cleaning</code> →
              <code>/bethesda-cleaning</code>).
            </p>
          </div>
          <Button size="sm" onClick={addArea}>
            <Plus className="w-4 h-4 mr-1" /> Add Area
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="p-2 font-medium">Order</th>
                <th className="p-2 font-medium">Name</th>
                <th className="p-2 font-medium">Slug</th>
                <th className="p-2 font-medium">State</th>
                <th className="p-2 font-medium">Tier</th>
                <th className="p-2 font-medium">Travel Fee</th>
                <th className="p-2 font-medium">Active</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="p-2">
                    <Input
                      type="number"
                      value={row.sort_order}
                      onChange={(e) => updateRow(row.id, { sort_order: Number(e.target.value) })}
                      className="w-16"
                    />
                  </td>
                  <td className="p-2">
                    <Input value={row.name} onChange={(e) => updateRow(row.id, { name: e.target.value })} className="w-40" />
                  </td>
                  <td className="p-2">
                    <Input value={row.slug} onChange={(e) => updateRow(row.id, { slug: e.target.value })} className="w-48" />
                  </td>
                  <td className="p-2">
                    <Input value={row.state} onChange={(e) => updateRow(row.id, { state: e.target.value })} className="w-16" />
                  </td>
                  <td className="p-2">
                    <Input value={row.tier} onChange={(e) => updateRow(row.id, { tier: e.target.value })} className="w-28" />
                  </td>
                  <td className="p-2">
                    <Input
                      type="number"
                      step="0.01"
                      value={row.travel_fee}
                      onChange={(e) => updateRow(row.id, { travel_fee: Number(e.target.value) })}
                      className="w-24"
                    />
                  </td>
                  <td className="p-2">
                    <Switch checked={row.is_active} onCheckedChange={(v) => updateRow(row.id, { is_active: v })} />
                  </td>
                  <td className="p-2">
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => saveRow(row)} disabled={saving === row.id}>
                        <Save className="w-3 h-3" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="text-destructive">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete {row.name}?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This city will be removed from all public listings. Existing landing pages won't be deleted, but they
                              will 404 from listings.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteRow(row.id)} className="bg-destructive text-destructive-foreground">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-muted-foreground">
                    No service areas yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceAreasManager;
