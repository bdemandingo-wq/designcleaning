import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Save } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PricingRow {
  id: string;
  service_type: string;
  tier_index: number;
  max_sqft: number;
  label: string;
  base_price: number;
  is_active: boolean;
}

const SERVICE_TYPES = [
  { value: "standard", label: "Standard Cleaning" },
  { value: "deep", label: "Deep Cleaning" },
  { value: "moveinout", label: "Move In/Move Out" },
  { value: "recurring", label: "Recurring Cleaning" },
];

const ServicePricingManager = () => {
  const [rows, setRows] = useState<PricingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("standard");
  const { toast } = useToast();

  const fetchRows = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("service_pricing")
      .select("*")
      .order("service_type")
      .order("tier_index");
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setRows((data as PricingRow[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const updateRow = (id: string, patch: Partial<PricingRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const saveRow = async (row: PricingRow) => {
    setSaving(row.id);
    const { error } = await supabase
      .from("service_pricing")
      .update({
        max_sqft: row.max_sqft,
        label: row.label,
        base_price: row.base_price,
        is_active: row.is_active,
        tier_index: row.tier_index,
      })
      .eq("id", row.id);
    setSaving(null);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved", description: "Pricing tier updated." });
    }
  };

  const deleteRow = async (id: string) => {
    const { error } = await supabase.from("service_pricing").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      setRows((prev) => prev.filter((r) => r.id !== id));
      toast({ title: "Deleted", description: "Pricing tier removed." });
    }
  };

  const addTier = async (serviceType: string) => {
    const existing = rows.filter((r) => r.service_type === serviceType);
    const nextIndex = existing.length ? Math.max(...existing.map((r) => r.tier_index)) + 1 : 0;
    const lastSqft = existing.length ? Math.max(...existing.map((r) => r.max_sqft)) : 750;
    const newSqft = lastSqft + 300;
    const { data, error } = await supabase
      .from("service_pricing")
      .insert({
        service_type: serviceType,
        tier_index: nextIndex,
        max_sqft: newSqft,
        label: `Up to ${newSqft} sf`,
        base_price: 0,
        is_active: true,
      })
      .select()
      .single();
    if (error) {
      toast({ title: "Add failed", description: error.message, variant: "destructive" });
    } else if (data) {
      setRows((prev) => [...prev, data as PricingRow]);
      toast({ title: "Added", description: "New tier created." });
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading pricing...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Pricing</CardTitle>
        <p className="text-sm text-muted-foreground">
          Edit base prices for each square-footage tier per service type. Changes are immediately reflected on the booking calculator.
        </p>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 flex-wrap h-auto">
            {SERVICE_TYPES.map((s) => (
              <TabsTrigger key={s.value} value={s.value}>
                {s.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {SERVICE_TYPES.map((s) => {
            const serviceRows = rows.filter((r) => r.service_type === s.value).sort((a, b) => a.tier_index - b.tier_index);
            return (
              <TabsContent key={s.value} value={s.value} className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">{serviceRows.length} tier(s)</p>
                  <Button size="sm" onClick={() => addTier(s.value)}>
                    <Plus className="w-4 h-4 mr-1" /> Add Tier
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-muted-foreground">
                        <th className="p-2 font-medium">Order</th>
                        <th className="p-2 font-medium">Max sq ft</th>
                        <th className="p-2 font-medium">Label</th>
                        <th className="p-2 font-medium">Price ($)</th>
                        <th className="p-2 font-medium">Active</th>
                        <th className="p-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceRows.map((row) => (
                        <tr key={row.id} className="border-b">
                          <td className="p-2">
                            <Input
                              type="number"
                              value={row.tier_index}
                              onChange={(e) => updateRow(row.id, { tier_index: Number(e.target.value) })}
                              className="w-20"
                            />
                          </td>
                          <td className="p-2">
                            <Input
                              type="number"
                              value={row.max_sqft}
                              onChange={(e) => updateRow(row.id, { max_sqft: Number(e.target.value) })}
                              className="w-28"
                            />
                          </td>
                          <td className="p-2">
                            <Input
                              value={row.label}
                              onChange={(e) => updateRow(row.id, { label: e.target.value })}
                              className="w-40"
                            />
                          </td>
                          <td className="p-2">
                            <Input
                              type="number"
                              step="0.01"
                              value={row.base_price}
                              onChange={(e) => updateRow(row.id, { base_price: Number(e.target.value) })}
                              className="w-28"
                            />
                          </td>
                          <td className="p-2">
                            <Switch
                              checked={row.is_active}
                              onCheckedChange={(v) => updateRow(row.id, { is_active: v })}
                            />
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
                                    <AlertDialogTitle>Delete tier?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This removes the {row.label} tier from {s.label}. Cannot be undone.
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
                      {serviceRows.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-4 text-center text-muted-foreground">
                            No tiers yet. Click "Add Tier" to create one.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ServicePricingManager;
