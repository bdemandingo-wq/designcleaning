import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, GripVertical, Upload, ExternalLink } from "lucide-react";
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

interface SiteContent {
  [key: string]: string;
}

interface WorkCard {
  id: string;
  platform: string;
  image_url: string;
  caption: string;
  post_url: string;
  sort_order: number;
}

const OurWorkManager = () => {
  const [siteContent, setSiteContent] = useState<SiteContent>({});
  const [cards, setCards] = useState<WorkCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [contentRes, cardsRes] = await Promise.all([
      supabase.from("site_content").select("*"),
      supabase.from("work_cards").select("*").order("sort_order", { ascending: true }),
    ]);

    if (contentRes.data) {
      const map: SiteContent = {};
      contentRes.data.forEach((row) => {
        map[row.key] = row.value;
      });
      setSiteContent(map);
    }

    if (cardsRes.data) {
      setCards(cardsRes.data);
    }

    setLoading(false);
  };

  const saveSocialHandles = async () => {
    setSaving(true);
    const keys = ["instagram_handle", "instagram_url", "tiktok_handle", "tiktok_url"];
    const updates = keys.map((key) =>
      supabase
        .from("site_content")
        .update({ value: siteContent[key] || "", updated_at: new Date().toISOString() })
        .eq("key", key)
    );

    const results = await Promise.all(updates);
    const hasError = results.some((r) => r.error);

    toast({
      title: hasError ? "Error" : "Saved",
      description: hasError ? "Failed to save some fields." : "Social handles updated.",
      variant: hasError ? "destructive" : "default",
    });
    setSaving(false);
  };

  const uploadImage = async (cardId: string, file: File) => {
    setUploadingFor(cardId);
    const ext = file.name.split(".").pop();
    const path = `${cardId}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("work-photos")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      setUploadingFor(null);
      return;
    }

    const { data: urlData } = supabase.storage.from("work-photos").getPublicUrl(path);
    const publicUrl = urlData.publicUrl;

    const { error: updateError } = await supabase
      .from("work_cards")
      .update({ image_url: publicUrl })
      .eq("id", cardId);

    if (updateError) {
      toast({ title: "Error", description: "Image uploaded but failed to update card.", variant: "destructive" });
    } else {
      setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, image_url: publicUrl } : c)));
      toast({ title: "Image uploaded", description: "Card image updated." });
    }
    setUploadingFor(null);
  };

  const addCard = async () => {
    const maxOrder = cards.length > 0 ? Math.max(...cards.map((c) => c.sort_order)) : 0;
    const { data, error } = await supabase
      .from("work_cards")
      .insert({
        platform: "instagram",
        image_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=600&fit=crop",
        caption: "New work photo",
        post_url: siteContent.instagram_url || "",
        sort_order: maxOrder + 1,
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: "Failed to add card.", variant: "destructive" });
    } else if (data) {
      setCards((prev) => [...prev, data]);
      toast({ title: "Card added", description: "New card created. Edit it below." });
    }
  };

  const updateCard = async (id: string, field: keyof WorkCard, value: string | number) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));

    const { error } = await supabase
      .from("work_cards")
      .update({ [field]: value })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: `Failed to update ${field}.`, variant: "destructive" });
      fetchData();
    }
  };

  const deleteCard = async (id: string) => {
    const { error } = await supabase.from("work_cards").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete card.", variant: "destructive" });
    } else {
      setCards((prev) => prev.filter((c) => c.id !== id));
      toast({ title: "Deleted", description: "Card removed." });
    }
  };

  const moveCard = async (id: string, direction: "up" | "down") => {
    const idx = cards.findIndex((c) => c.id === id);
    if (idx < 0) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= cards.length) return;

    const updated = [...cards];
    const tempOrder = updated[idx].sort_order;
    updated[idx].sort_order = updated[swapIdx].sort_order;
    updated[swapIdx].sort_order = tempOrder;
    [updated[idx], updated[swapIdx]] = [updated[swapIdx], updated[idx]];
    setCards(updated);

    await Promise.all([
      supabase.from("work_cards").update({ sort_order: updated[idx].sort_order }).eq("id", updated[idx].id),
      supabase.from("work_cards").update({ sort_order: updated[swapIdx].sort_order }).eq("id", updated[swapIdx].id),
    ]);
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading...</div>;
  }

  const instagramCards = cards.filter((c) => c.platform === "instagram");
  const tiktokCards = cards.filter((c) => c.platform === "tiktok");

  return (
    <div className="space-y-8">
      {/* Social Handles */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Handles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ig-handle">Instagram Handle</Label>
              <Input
                id="ig-handle"
                value={siteContent.instagram_handle || ""}
                onChange={(e) => setSiteContent((p) => ({ ...p, instagram_handle: e.target.value }))}
                placeholder="@designcleaningdmv"
              />
            </div>
            <div>
              <Label htmlFor="ig-url">Instagram Profile URL</Label>
              <Input
                id="ig-url"
                value={siteContent.instagram_url || ""}
                onChange={(e) => setSiteContent((p) => ({ ...p, instagram_url: e.target.value }))}
                placeholder="https://www.instagram.com/designcleaningdmv/"
              />
            </div>
            <div>
              <Label htmlFor="tt-handle">TikTok Handle</Label>
              <Input
                id="tt-handle"
                value={siteContent.tiktok_handle || ""}
                onChange={(e) => setSiteContent((p) => ({ ...p, tiktok_handle: e.target.value }))}
                placeholder="@designcleaningdmv"
              />
            </div>
            <div>
              <Label htmlFor="tt-url">TikTok Profile URL</Label>
              <Input
                id="tt-url"
                value={siteContent.tiktok_url || ""}
                onChange={(e) => setSiteContent((p) => ({ ...p, tiktok_url: e.target.value }))}
                placeholder="https://www.tiktok.com/@designcleaningdmv"
              />
            </div>
          </div>
          <Button onClick={saveSocialHandles} disabled={saving}>
            {saving ? "Saving..." : "Save Handles"}
          </Button>
        </CardContent>
      </Card>

      {/* Work Cards */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gallery Cards ({cards.length})</CardTitle>
          <Button size="sm" onClick={addCard}>
            <Plus className="w-4 h-4 mr-1" /> Add Card
          </Button>
        </CardHeader>
        <CardContent>
          {cards.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No cards yet. Add one above.</p>
          ) : (
            <div className="space-y-4">
              {/* Instagram cards */}
              {instagramCards.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Instagram ({instagramCards.length})</h3>
                  <div className="space-y-3">
                    {instagramCards.map((card) => (
                      <CardRow
                        key={card.id}
                        card={card}
                        uploadingFor={uploadingFor}
                        fileInputRefs={fileInputRefs}
                        onUpload={uploadImage}
                        onUpdate={updateCard}
                        onDelete={deleteCard}
                        onMove={moveCard}
                        isFirst={cards[0]?.id === card.id}
                        isLast={cards[cards.length - 1]?.id === card.id}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* TikTok cards */}
              {tiktokCards.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">TikTok ({tiktokCards.length})</h3>
                  <div className="space-y-3">
                    {tiktokCards.map((card) => (
                      <CardRow
                        key={card.id}
                        card={card}
                        uploadingFor={uploadingFor}
                        fileInputRefs={fileInputRefs}
                        onUpload={uploadImage}
                        onUpdate={updateCard}
                        onDelete={deleteCard}
                        onMove={moveCard}
                        isFirst={cards[0]?.id === card.id}
                        isLast={cards[cards.length - 1]?.id === card.id}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

interface CardRowProps {
  card: WorkCard;
  uploadingFor: string | null;
  fileInputRefs: React.MutableRefObject<Record<string, HTMLInputElement | null>>;
  onUpload: (id: string, file: File) => void;
  onUpdate: (id: string, field: keyof WorkCard, value: string | number) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, dir: "up" | "down") => void;
  isFirst: boolean;
  isLast: boolean;
}

const CardRow = ({ card, uploadingFor, fileInputRefs, onUpload, onUpdate, onDelete, onMove, isFirst, isLast }: CardRowProps) => (
  <div className="border border-border rounded-lg p-4 flex flex-col lg:flex-row gap-4">
    {/* Thumbnail */}
    <div className="flex-shrink-0">
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted relative">
        <img src={card.image_url} alt={card.caption} className="w-full h-full object-cover" />
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={(el) => { fileInputRefs.current[card.id] = el; }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(card.id, file);
        }}
      />
      <Button
        variant="outline"
        size="sm"
        className="mt-2 w-20 text-xs"
        onClick={() => fileInputRefs.current[card.id]?.click()}
        disabled={uploadingFor === card.id}
      >
        {uploadingFor === card.id ? "..." : <><Upload className="w-3 h-3 mr-1" /> Upload</>}
      </Button>
    </div>

    {/* Fields */}
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <Label className="text-xs">Caption</Label>
        <Input
          value={card.caption}
          onChange={(e) => onUpdate(card.id, "caption", e.target.value)}
          placeholder="Caption"
        />
      </div>
      <div>
        <Label className="text-xs">Post/Video URL</Label>
        <div className="flex gap-1">
          <Input
            value={card.post_url}
            onChange={(e) => onUpdate(card.id, "post_url", e.target.value)}
            placeholder="https://..."
          />
          {card.post_url && (
            <a href={card.post_url} target="_blank" rel="noopener noreferrer" className="flex items-center px-2 text-muted-foreground hover:text-foreground">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
      <div>
        <Label className="text-xs">Platform</Label>
        <Select value={card.platform} onValueChange={(v) => onUpdate(card.id, "platform", v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="tiktok">TikTok</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs">Image URL (or upload)</Label>
        <Input
          value={card.image_url}
          onChange={(e) => onUpdate(card.id, "image_url", e.target.value)}
          placeholder="https://..."
        />
      </div>
    </div>

    {/* Actions */}
    <div className="flex lg:flex-col items-center gap-1 flex-shrink-0">
      <Button variant="ghost" size="icon" onClick={() => onMove(card.id, "up")} disabled={isFirst} title="Move up">
        <GripVertical className="w-4 h-4" />
        <span className="sr-only">Up</span>
      </Button>
      <Button variant="ghost" size="icon" onClick={() => onMove(card.id, "down")} disabled={isLast} title="Move down">
        <GripVertical className="w-4 h-4 rotate-180" />
        <span className="sr-only">Down</span>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
            <Trash2 className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Card</AlertDialogTitle>
            <AlertDialogDescription>Remove "{card.caption}" from the gallery? This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(card.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
);

export default OurWorkManager;
