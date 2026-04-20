import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";

type ContentMap = Record<string, string>;

const CITIES = [
  { slug: "gaithersburg", name: "Gaithersburg" },
  { slug: "washington-dc", name: "Washington DC" },
  { slug: "silver-spring", name: "Silver Spring" },
  { slug: "rockville", name: "Rockville" },
  { slug: "bethesda", name: "Bethesda" },
  { slug: "germantown", name: "Germantown" },
  { slug: "potomac", name: "Potomac" },
  { slug: "bowie", name: "Bowie" },
  { slug: "college-park", name: "College Park" },
  { slug: "laurel", name: "Laurel" },
];

const SiteContentManager = () => {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_content").select("*");
      const map: ContentMap = {};
      (data || []).forEach((row) => (map[row.key] = row.value));
      setContent(map);
      setLoading(false);
    })();
  }, []);

  const setField = (key: string, value: string) =>
    setContent((prev) => ({ ...prev, [key]: value }));

  const saveKeys = async (keys: string[], label: string) => {
    setSavingKey(label);
    const results = await Promise.all(
      keys.map((key) =>
        supabase
          .from("site_content")
          .upsert(
            { key, value: content[key] ?? "", updated_at: new Date().toISOString() },
            { onConflict: "key" }
          )
      )
    );
    const hasError = results.some((r) => r.error);
    toast({
      title: hasError ? "Error" : "Saved",
      description: hasError ? `Failed to save ${label}.` : `${label} updated.`,
      variant: hasError ? "destructive" : "default",
    });
    setSavingKey(null);
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading…</div>;
  }

  // Helper to render a single text/textarea field
  const Field = ({ label, k, multi = false, rows = 2 }: { label: string; k: string; multi?: boolean; rows?: number }) => (
    <div>
      <Label htmlFor={k}>{label}</Label>
      {multi ? (
        <Textarea id={k} rows={rows} value={content[k] || ""} onChange={(e) => setField(k, e.target.value)} />
      ) : (
        <Input id={k} value={content[k] || ""} onChange={(e) => setField(k, e.target.value)} />
      )}
    </div>
  );

  const homepageKeys = [
    "home_hero_headline", "home_hero_subhead", "home_hero_cta_primary", "home_hero_cta_secondary",
    "home_trust_badge_1", "home_trust_badge_2", "home_trust_badge_3", "home_trust_badge_4",
    "home_service_card_standard_title", "home_service_card_standard_desc", "home_service_card_standard_price", "home_service_card_standard_cta",
    "home_service_card_deep_title", "home_service_card_deep_desc", "home_service_card_deep_price", "home_service_card_deep_cta",
    "home_service_card_moveinout_title", "home_service_card_moveinout_desc", "home_service_card_moveinout_price", "home_service_card_moveinout_cta",
    "home_service_card_airbnb_title", "home_service_card_airbnb_desc", "home_service_card_airbnb_price", "home_service_card_airbnb_cta",
    "home_service_card_commercial_title", "home_service_card_commercial_desc", "home_service_card_commercial_price", "home_service_card_commercial_cta",
    "home_howitworks_step_1_title", "home_howitworks_step_1_desc",
    "home_howitworks_step_2_title", "home_howitworks_step_2_desc",
    "home_howitworks_step_3_title", "home_howitworks_step_3_desc",
    "home_pricing_preview_headline", "home_pricing_preview_note",
    "home_why_reliability_title", "home_why_reliability_desc",
    "home_why_transparency_title", "home_why_transparency_desc",
    "home_why_scheduling_title", "home_why_scheduling_desc",
    "home_final_cta_headline", "home_final_cta_subhead",
  ];

  return (
    <div className="space-y-8">
      {/* Homepage Copy */}
      <Card>
        <CardHeader>
          <CardTitle>Homepage Copy</CardTitle>
          <p className="text-sm text-muted-foreground">
            Edit every text block on the home page. Leave a field blank to fall back to the default.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Hero Section</p>
            <Field label="Headline" k="home_hero_headline" multi rows={2} />
            <Field label="Subheadline" k="home_hero_subhead" multi rows={3} />
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Primary CTA label" k="home_hero_cta_primary" />
              <Field label="Secondary CTA label" k="home_hero_cta_secondary" />
            </div>
          </div>

          <div className="space-y-3 border-t pt-4">
            <p className="text-sm font-semibold text-foreground">Trust Badges (4)</p>
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Badge 1" k="home_trust_badge_1" />
              <Field label="Badge 2" k="home_trust_badge_2" />
              <Field label="Badge 3" k="home_trust_badge_3" />
              <Field label="Badge 4" k="home_trust_badge_4" />
            </div>
          </div>

          {(["standard", "deep", "moveinout", "airbnb", "commercial"] as const).map((s) => (
            <div key={s} className="space-y-3 border-t pt-4">
              <p className="text-sm font-semibold text-foreground capitalize">Service Card: {s}</p>
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Title" k={`home_service_card_${s}_title`} />
                <Field label="Price label" k={`home_service_card_${s}_price`} />
              </div>
              <Field label="Description" k={`home_service_card_${s}_desc`} multi rows={2} />
              <Field label="CTA label" k={`home_service_card_${s}_cta`} />
            </div>
          ))}

          <div className="space-y-3 border-t pt-4">
            <p className="text-sm font-semibold text-foreground">How It Works (3 steps)</p>
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid md:grid-cols-2 gap-3">
                <Field label={`Step ${i} title`} k={`home_howitworks_step_${i}_title`} />
                <Field label={`Step ${i} description`} k={`home_howitworks_step_${i}_desc`} multi rows={2} />
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t pt-4">
            <p className="text-sm font-semibold text-foreground">Pricing Preview Block</p>
            <Field label="Headline" k="home_pricing_preview_headline" />
            <Field label="Note" k="home_pricing_preview_note" multi rows={3} />
          </div>

          <div className="space-y-3 border-t pt-4">
            <p className="text-sm font-semibold text-foreground">Why Choose Design Cleaning</p>
            {(["reliability", "transparency", "scheduling"] as const).map((k) => (
              <div key={k} className="grid md:grid-cols-2 gap-3">
                <Field label={`${k} title`} k={`home_why_${k}_title`} />
                <Field label={`${k} description`} k={`home_why_${k}_desc`} multi rows={2} />
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t pt-4">
            <p className="text-sm font-semibold text-foreground">Final CTA Block</p>
            <Field label="Headline" k="home_final_cta_headline" />
            <Field label="Subheadline" k="home_final_cta_subhead" multi rows={2} />
          </div>

          <Button onClick={() => saveKeys(homepageKeys, "Homepage Copy")} disabled={savingKey === "Homepage Copy"}>
            <Save className="w-4 h-4 mr-2" />
            {savingKey === "Homepage Copy" ? "Saving…" : "Save Homepage Copy"}
          </Button>
        </CardContent>
      </Card>

      {/* Links */}
      <Card>
        <CardHeader>
          <CardTitle>External Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="google_reviews_url">Google Reviews URL</Label>
            <Input
              id="google_reviews_url"
              value={content.google_reviews_url || ""}
              onChange={(e) => setField("google_reviews_url", e.target.value)}
              placeholder="https://g.page/r/..."
            />
          </div>
          <div>
            <Label htmlFor="gift_card_url">Gift Card Purchase URL</Label>
            <Input
              id="gift_card_url"
              value={content.gift_card_url || ""}
              onChange={(e) => setField("gift_card_url", e.target.value)}
              placeholder="https://..."
            />
          </div>
          <Button
            onClick={() => saveKeys(["google_reviews_url", "gift_card_url"], "Links")}
            disabled={savingKey === "Links"}
          >
            <Save className="w-4 h-4 mr-2" />
            {savingKey === "Links" ? "Saving…" : "Save Links"}
          </Button>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <Card>
        <CardHeader>
          <CardTitle>Homepage Testimonials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border border-border rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-muted-foreground">Testimonial {i}</p>
              <div>
                <Label htmlFor={`t${i}_text`}>Quote</Label>
                <Textarea
                  id={`t${i}_text`}
                  rows={3}
                  value={content[`testimonial_${i}_text`] || ""}
                  onChange={(e) => setField(`testimonial_${i}_text`, e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor={`t${i}_name`}>Name</Label>
                  <Input
                    id={`t${i}_name`}
                    value={content[`testimonial_${i}_name`] || ""}
                    onChange={(e) => setField(`testimonial_${i}_name`, e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`t${i}_location`}>Location</Label>
                  <Input
                    id={`t${i}_location`}
                    value={content[`testimonial_${i}_location`] || ""}
                    onChange={(e) => setField(`testimonial_${i}_location`, e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            onClick={() =>
              saveKeys(
                [1, 2, 3, 4, 5].flatMap((i) => [
                  `testimonial_${i}_text`,
                  `testimonial_${i}_name`,
                  `testimonial_${i}_location`,
                ]),
                "Testimonials"
              )
            }
            disabled={savingKey === "Testimonials"}
          >
            <Save className="w-4 h-4 mr-2" />
            {savingKey === "Testimonials" ? "Saving…" : "Save Testimonials"}
          </Button>
        </CardContent>
      </Card>

      {/* Chatbot */}
      <Card>
        <CardHeader>
          <CardTitle>Chatbot Widget</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="chatbot_provider">Provider</Label>
            <Select
              value={content.chatbot_provider || "none"}
              onValueChange={(v) => setField("chatbot_provider", v)}
            >
              <SelectTrigger id="chatbot_provider">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None — show built-in placeholder</SelectItem>
                <SelectItem value="tidio">Tidio</SelectItem>
                <SelectItem value="intercom">Intercom</SelectItem>
                <SelectItem value="custom">Custom (paste &lt;script&gt; tag)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              "None" shows our built-in chat bubble with phone/email links. Pick a provider and paste your key/script below to swap it in.
            </p>
          </div>
          <div>
            <Label htmlFor="chatbot_key">
              {content.chatbot_provider === "tidio" && "Tidio Public Key"}
              {content.chatbot_provider === "intercom" && "Intercom App ID"}
              {content.chatbot_provider === "custom" && "Custom <script> markup"}
              {(!content.chatbot_provider || content.chatbot_provider === "none") && "Key / Script (unused for None)"}
            </Label>
            {content.chatbot_provider === "custom" ? (
              <Textarea
                id="chatbot_key"
                rows={6}
                value={content.chatbot_key || ""}
                onChange={(e) => setField("chatbot_key", e.target.value)}
                placeholder="<script>...</script>"
              />
            ) : (
              <Input
                id="chatbot_key"
                value={content.chatbot_key || ""}
                onChange={(e) => setField("chatbot_key", e.target.value)}
                placeholder={
                  content.chatbot_provider === "tidio"
                    ? "abc123xyz"
                    : content.chatbot_provider === "intercom"
                    ? "xxxxxxxx"
                    : ""
                }
              />
            )}
          </div>
          <Button
            onClick={() => saveKeys(["chatbot_provider", "chatbot_key"], "Chatbot")}
            disabled={savingKey === "Chatbot"}
          >
            <Save className="w-4 h-4 mr-2" />
            {savingKey === "Chatbot" ? "Saving…" : "Save Chatbot"}
          </Button>
        </CardContent>
      </Card>

      {/* City copy */}
      <Card>
        <CardHeader>
          <CardTitle>City Page Intros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {CITIES.map((c) => {
            const key = `city_${c.slug}_intro`;
            return (
              <div key={c.slug}>
                <Label htmlFor={key}>{c.name}</Label>
                <Textarea
                  id={key}
                  rows={2}
                  value={content[key] || ""}
                  onChange={(e) => setField(key, e.target.value)}
                />
              </div>
            );
          })}
          <Button
            onClick={() =>
              saveKeys(
                CITIES.map((c) => `city_${c.slug}_intro`),
                "City Copy"
              )
            }
            disabled={savingKey === "City Copy"}
          >
            <Save className="w-4 h-4 mr-2" />
            {savingKey === "City Copy" ? "Saving…" : "Save City Copy"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteContentManager;
