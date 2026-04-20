import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Calendar, DollarSign, Users, Clock, RefreshCw, Trash2, UserCheck, Briefcase, Phone, Mail, MapPin, Car, Shield, Star, Image, FileText, MessageSquare, Tag, Building2, Bot, CalendarX } from "lucide-react";
import OurWorkManager from "@/components/admin/OurWorkManager";
import SiteContentManager from "@/components/admin/SiteContentManager";
import QuoteRequestsManager from "@/components/admin/QuoteRequestsManager";
import ServicePricingManager from "@/components/admin/ServicePricingManager";
import ServiceAreasManager from "@/components/admin/ServiceAreasManager";
import CommercialRequestsManager from "@/components/admin/CommercialRequestsManager";
import ChatbotLeadsManager from "@/components/admin/ChatbotLeadsManager";
import BlockedDatesManager from "@/components/admin/BlockedDatesManager";
import ReviewsManager from "@/components/admin/ReviewsManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

type BookingStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";

interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  beds: string;
  baths: string;
  sqft: number;
  service_type: string;
  frequency: string;
  add_ons: string[];
  total_price: number;
  preferred_date: string;
  special_instructions: string | null;
  pet_info: string | null;
  status: BookingStatus;
  created_at: string;
}

interface CleanerApplication {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  has_transportation: boolean;
  has_supplies: boolean;
  years_experience: number;
  has_insurance: boolean;
  can_provide_references: boolean;
  work_areas: string[];
  status: string;
  created_at: string;
}

const statusColors: Record<BookingStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  in_progress: "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const Admin = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [applications, setApplications] = useState<CleanerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("bookings");
  const [generatingBlog, setGeneratingBlog] = useState(false);
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate("/auth");
      } else if (!isAdmin) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
        navigate("/");
      } else {
        fetchBookings();
        fetchApplications();
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load bookings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from("cleaner_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load applications.",
        variant: "destructive",
      });
    }
  };

  const updateApplicationStatus = async (appId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("cleaner_applications")
        .update({ status: newStatus })
        .eq("id", appId);

      if (error) throw error;

      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
      );

      toast({
        title: "Status updated",
        description: `Application status changed to ${newStatus}.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchBookings();
    fetchApplications();
  };

  const handleGenerateBlog = async () => {
    setGeneratingBlog(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");
      const res = await supabase.functions.invoke("generate-blog-post", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.error) throw res.error;
      const result = res.data;
      if (result.skipped) {
        toast({ title: "Skipped", description: "A similar blog post already exists." });
      } else {
        toast({ title: "Blog Post Created!", description: `"${result.post?.title}" has been published.` });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to generate blog post.", variant: "destructive" });
    } finally {
      setGeneratingBlog(false);
    }
  };

  const updateStatus = async (bookingId: string, newStatus: BookingStatus) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId);

      if (error) throw error;

      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );

      toast({
        title: "Status updated",
        description: `Booking status changed to ${newStatus}.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
    }
  };

  const deleteBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingId);

      if (error) throw error;

      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      toast({
        title: "Booking deleted",
        description: "The booking has been removed.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete booking.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    revenue: bookings
      .filter((b) => b.status === "completed")
      .reduce((sum, b) => sum + Number(b.total_price), 0),
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            
            <span className="font-display text-xl font-bold text-foreground">Admin Dashboard</span>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold">{stats.confirmed}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">${stats.revenue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <TabsList>
              <TabsTrigger value="bookings" className="gap-2">
                <Calendar className="w-4 h-4" />
                Bookings ({bookings.length})
              </TabsTrigger>
              <TabsTrigger value="applications" className="gap-2">
                <Briefcase className="w-4 h-4" />
                Applicants ({applications.length})
              </TabsTrigger>
              <TabsTrigger value="quotes" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Quote Requests
              </TabsTrigger>
              <TabsTrigger value="commercial" className="gap-2">
                <Building2 className="w-4 h-4" />
                Commercial
              </TabsTrigger>
              <TabsTrigger value="chatbot" className="gap-2">
                <Bot className="w-4 h-4" />
                Chatbot
              </TabsTrigger>
              <TabsTrigger value="pricing" className="gap-2">
                <Tag className="w-4 h-4" />
                Pricing
              </TabsTrigger>
              <TabsTrigger value="areas" className="gap-2">
                <MapPin className="w-4 h-4" />
                Service Areas
              </TabsTrigger>
              <TabsTrigger value="ourwork" className="gap-2">
                <Image className="w-4 h-4" />
                Our Work
              </TabsTrigger>
              <TabsTrigger value="content" className="gap-2">
                <FileText className="w-4 h-4" />
                Site Content
              </TabsTrigger>
              <TabsTrigger value="reviews" className="gap-2">
                <Star className="w-4 h-4" />
                Reviews
              </TabsTrigger>
              <TabsTrigger value="calendar" className="gap-2">
                <CalendarX className="w-4 h-4" />
                Calendar
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleGenerateBlog} disabled={generatingBlog}>
                {generatingBlog ? "Generating..." : "Generate Blog Post"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No bookings yet.</p>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-foreground">{booking.customer_name}</h3>
                              <Badge className={statusColors[booking.status]}>
                                {booking.status.replace("_", " ")}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground">
                              <p>📧 {booking.customer_email}</p>
                              <p>📞 {booking.customer_phone}</p>
                              <p>📅 {booking.preferred_date}</p>
                              <p>💰 ${booking.total_price}</p>
                            </div>
                            <div className="mt-2 text-sm">
                              <p className="text-foreground">
                                {booking.service_type} • {booking.frequency} • {booking.sqft.toLocaleString()} sq ft
                              </p>
                              <p className="text-muted-foreground">{booking.address}</p>
                            </div>
                            {booking.special_instructions && (
                              <p className="mt-2 text-sm text-muted-foreground">
                                <strong>Notes:</strong> {booking.special_instructions}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Select
                              value={booking.status}
                              onValueChange={(value) => updateStatus(booking.id, value as BookingStatus)}
                            >
                              <SelectTrigger className="w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Booking</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete {booking.customer_name}'s booking? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteBooking(booking.id)}
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
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Cleaner Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No applications yet.</p>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-foreground">{app.name}</h3>
                              <Badge className={
                                app.status === "approved" ? "bg-green-100 text-green-800 border-green-200" :
                                app.status === "rejected" ? "bg-red-100 text-red-800 border-red-200" :
                                "bg-yellow-100 text-yellow-800 border-yellow-200"
                              }>
                                {app.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-muted-foreground">
                              <p className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {app.email}</p>
                              {app.phone && <p className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {app.phone}</p>}
                              <p className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> {app.years_experience} yrs experience</p>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2 text-sm">
                              {app.has_transportation && (
                                <Badge variant="outline" className="gap-1 text-xs"><Car className="w-3 h-3" /> Has Transport</Badge>
                              )}
                              {app.has_supplies && (
                                <Badge variant="outline" className="gap-1 text-xs">🧹 Has Supplies</Badge>
                              )}
                              {app.has_insurance && (
                                <Badge variant="outline" className="gap-1 text-xs"><Shield className="w-3 h-3" /> Insured</Badge>
                              )}
                              {app.can_provide_references && (
                                <Badge variant="outline" className="gap-1 text-xs"><UserCheck className="w-3 h-3" /> References</Badge>
                              )}
                            </div>
                            <div className="mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {app.work_areas.join(", ")}</span>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Applied {new Date(app.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Select
                              value={app.status}
                              onValueChange={(value) => updateApplicationStatus(app.id, value)}
                            >
                              <SelectTrigger className="w-36">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quotes">
            <QuoteRequestsManager />
          </TabsContent>

          <TabsContent value="commercial">
            <CommercialRequestsManager />
          </TabsContent>

          <TabsContent value="chatbot">
            <ChatbotLeadsManager />
          </TabsContent>

          <TabsContent value="pricing">
            <ServicePricingManager />
          </TabsContent>

          <TabsContent value="areas">
            <ServiceAreasManager />
          </TabsContent>

          <TabsContent value="ourwork">
            <OurWorkManager />
          </TabsContent>

          <TabsContent value="content">
            <SiteContentManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
