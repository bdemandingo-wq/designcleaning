import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Upload, X } from "lucide-react";

const applicationSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  hasTransportation: z.boolean(),
  hasSupplies: z.boolean(),
  yearsExperience: z.number().min(0).max(50),
  hasInsurance: z.boolean(),
  canProvideReferences: z.boolean(),
  workAreas: z.array(z.string()).min(1, "Please select at least one work area"),
});
type ApplicationFormData = z.infer<typeof applicationSchema>;

const workAreaOptions = [
  { id: "pembroke-pines", label: "Pembroke Pines" },
  { id: "miramar", label: "Miramar" },
  { id: "coral-springs", label: "Coral Springs / Sunrise" },
  { id: "aventura-doral", label: "Aventura / Doral" },
  { id: "boca-coral-gables", label: "Boca Raton / Coral Gables" },
  { id: "miami-beach", label: "Miami Beach / Coconut Grove" },
  { id: "davie-homestead", label: "Davie / Homestead" },
];

const CleanerApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { name: "", email: "", phone: "", hasTransportation: false, hasSupplies: false, yearsExperience: 0, hasInsurance: false, canProvideReferences: false, workAreas: [] },
  });

  const workAreas = watch("workAreas");
  const handleWorkAreaChange = (areaId: string, checked: boolean) => {
    const current = workAreas || [];
    setValue("workAreas", checked ? [...current, areaId] : current.filter(id => id !== areaId));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files) setUploadedFiles(prev => [...prev, ...Array.from(e.target.files!)]); };
  const removeFile = (index: number) => setUploadedFiles(prev => prev.filter((_, i) => i !== index));

  const uploadFiles = async (): Promise<string[]> => {
    const filenames: string[] = [];
    for (const file of uploadedFiles) {
      const fileName = `${crypto.randomUUID()}.${file.name.split(".").pop()}`;
      const { error } = await supabase.storage.from("supply-pictures").upload(fileName, file);
      if (error) throw error;
      filenames.push(fileName);
    }
    return filenames;
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    try {
      let pictureUrls: string[] = [];
      if (uploadedFiles.length > 0) { setUploading(true); pictureUrls = await uploadFiles(); setUploading(false); }
      const { error } = await supabase.from("cleaner_applications").insert({
        name: data.name, email: data.email, phone: data.phone,
        has_transportation: data.hasTransportation, has_supplies: data.hasSupplies,
        years_experience: data.yearsExperience, has_insurance: data.hasInsurance,
        can_provide_references: data.canProvideReferences, supply_pictures: pictureUrls, work_areas: data.workAreas,
      });
      if (error) throw error;

      try { await supabase.functions.invoke("send-sms-notification", { body: { type: "cleaner_application", data: { name: data.name, email: data.email, phone: data.phone } } }); } catch {}

      toast({ title: "Application Submitted!", description: "We'll review and get back to you soon." });
      navigate("/");
    } catch (error: any) {
      toast({ title: "Error", description: "Failed to submit. Please try again.", variant: "destructive" });
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            
            <span className="font-display text-xl font-bold text-foreground">Pleasant Cleanings</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"><ArrowLeft className="h-4 w-4" />Back to Home</Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-display">Join Our Team</CardTitle>
            <CardDescription>Apply to become a Pleasant Cleanings professional</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div><Label htmlFor="name">Full Name *</Label><Input id="name" {...register("name")} className="mt-1" />{errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}</div>
                <div><Label htmlFor="email">Email *</Label><Input id="email" type="email" {...register("email")} className="mt-1" />{errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}</div>
                <div><Label htmlFor="phone">Phone *</Label><Input id="phone" type="tel" {...register("phone")} className="mt-1" />{errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}</div>
                <div><Label htmlFor="yearsExperience">Years of Experience *</Label><Input id="yearsExperience" type="number" min={0} max={50} {...register("yearsExperience", { valueAsNumber: true })} className="mt-1" /></div>
              </div>

              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="font-semibold text-foreground">Requirements</h3>
                {[
                  { id: "hasTransportation", label: "Do you have reliable transportation?" },
                  { id: "hasSupplies", label: "Do you have your own cleaning supplies?" },
                  { id: "hasInsurance", label: "Do you have liability insurance?" },
                  { id: "canProvideReferences", label: "Can you provide references?" },
                ].map(item => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <Checkbox id={item.id} checked={watch(item.id as any)} onCheckedChange={(checked) => setValue(item.id as any, !!checked)} />
                    <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="font-semibold text-foreground">Service Areas *</h3>
                <div className="space-y-3">
                  {workAreaOptions.map(area => (
                    <div key={area.id} className="flex items-center space-x-3">
                      <Checkbox id={area.id} checked={workAreas?.includes(area.id)} onCheckedChange={(checked) => handleWorkAreaChange(area.id, !!checked)} />
                      <Label htmlFor={area.id} className="cursor-pointer">{area.label}</Label>
                    </div>
                  ))}
                </div>
                {errors.workAreas && <p className="text-sm text-destructive">{errors.workAreas.message}</p>}
              </div>

              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="font-semibold text-foreground">Supply Pictures (optional)</h3>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input type="file" id="supplyPictures" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
                  <label htmlFor="supplyPictures" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" /><span className="text-sm text-muted-foreground">Click to upload</span>
                  </label>
                </div>
                {uploadedFiles.length > 0 && <div className="space-y-2">{uploadedFiles.map((file, i) => (
                  <div key={i} className="flex items-center justify-between bg-muted/50 rounded-lg px-4 py-2">
                    <span className="text-sm truncate">{file.name}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(i)}><X className="h-4 w-4" /></Button>
                  </div>
                ))}</div>}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{uploading ? "Uploading..." : "Submitting..."}</> : "Submit Application"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CleanerApplication;
