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
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));

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
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        
        {/* City Landing Pages */}
        <Route path="/gaithersburg-cleaning" element={<CityLandingPage cityName="Gaithersburg" citySlug="gaithersburg" />} />
        <Route path="/washington-dc-cleaning" element={<CityLandingPage cityName="Washington DC" citySlug="washington-dc" />} />
        <Route path="/silver-spring-cleaning" element={<CityLandingPage cityName="Silver Spring" citySlug="silver-spring" />} />
        <Route path="/rockville-cleaning" element={<CityLandingPage cityName="Rockville" citySlug="rockville" />} />
        <Route path="/bethesda-cleaning" element={<CityLandingPage cityName="Bethesda" citySlug="bethesda" />} />
        <Route path="/germantown-cleaning" element={<CityLandingPage cityName="Germantown" citySlug="germantown" />} />
        <Route path="/potomac-cleaning" element={<CityLandingPage cityName="Potomac" citySlug="potomac" />} />
        <Route path="/bowie-cleaning" element={<CityLandingPage cityName="Bowie" citySlug="bowie" />} />
        <Route path="/college-park-cleaning" element={<CityLandingPage cityName="College Park" citySlug="college-park" />} />
        <Route path="/laurel-cleaning" element={<CityLandingPage cityName="Laurel" citySlug="laurel" />} />
        
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
