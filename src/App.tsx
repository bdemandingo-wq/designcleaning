import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToHash from "@/components/ScrollToHash";
import { AuthProvider } from "@/contexts/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import usePageTracking from "@/hooks/usePageTracking";
import Index from "./pages/Index";

const BookingForm = lazy(() => import("./pages/BookingForm"));
const Confirmation = lazy(() => import("./pages/Confirmation"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const CustomerPortal = lazy(() => import("./pages/CustomerPortal"));
const NotFound = lazy(() => import("./pages/NotFound"));

// New pages
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const MembershipPage = lazy(() => import("./pages/MembershipPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const FAQ = lazy(() => import("./pages/FAQ"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const Sitemap = lazy(() => import("./pages/Sitemap"));

// City pages
const CityLandingPage = lazy(() => import("./pages/cities/CityLandingPage"));

const queryClient = new QueryClient();

const AppRoutes = () => {
  usePageTracking();
  
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/my-bookings" element={<CustomerPortal />} />
        <Route path="/sitemap" element={<Sitemap />} />
        
        {/* City Landing Pages */}
        <Route path="/[CITY_1_SLUG]-cleaning" element={<CityLandingPage cityName="[CITY_1]" citySlug="[CITY_1_SLUG]" />} />
        <Route path="/[CITY_2_SLUG]-cleaning" element={<CityLandingPage cityName="[CITY_2]" citySlug="[CITY_2_SLUG]" />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToHash />
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
