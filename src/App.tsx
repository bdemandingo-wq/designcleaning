import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToHash from "@/components/ScrollToHash";
import ChatbotWidget from "@/components/ChatbotWidget";
import StickyMobileCTA from "@/components/StickyMobileCTA";
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
const OurWorkPage = lazy(() => import("./pages/OurWorkPage"));
const ResidentialPage = lazy(() => import("./pages/ResidentialPage"));
const CommercialPage = lazy(() => import("./pages/CommercialPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const AirbnbTurnoverPage = lazy(() => import("./pages/AirbnbTurnoverPage"));
const ReviewSubmit = lazy(() => import("./pages/ReviewSubmit"));
const ReferralsPage = lazy(() => import("./pages/ReferralsPage"));

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
        <Route path="/our-work" element={<OurWorkPage />} />
        <Route path="/residential" element={<ResidentialPage />} />
        <Route path="/commercial" element={<CommercialPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/airbnb-turnover" element={<AirbnbTurnoverPage />} />
        <Route path="/review/:token" element={<ReviewSubmit />} />
        <Route path="/referrals" element={<ReferralsPage />} />

        {/* City Landing Pages — Core MD */}
        <Route path="/gaithersburg-cleaning" element={<CityLandingPage cityName="Gaithersburg" citySlug="gaithersburg-cleaning" />} />
        <Route path="/rockville-cleaning" element={<CityLandingPage cityName="Rockville" citySlug="rockville-cleaning" />} />
        <Route path="/bethesda-cleaning" element={<CityLandingPage cityName="Bethesda" citySlug="bethesda-cleaning" />} />
        <Route path="/silver-spring-cleaning" element={<CityLandingPage cityName="Silver Spring" citySlug="silver-spring-cleaning" />} />
        <Route path="/germantown-cleaning" element={<CityLandingPage cityName="Germantown" citySlug="germantown-cleaning" />} />

        {/* Extended Maryland */}
        <Route path="/potomac-cleaning" element={<CityLandingPage cityName="Potomac" citySlug="potomac-cleaning" />} />
        <Route path="/north-bethesda-cleaning" element={<CityLandingPage cityName="North Bethesda" citySlug="north-bethesda-cleaning" />} />
        <Route path="/chevy-chase-cleaning" element={<CityLandingPage cityName="Chevy Chase" citySlug="chevy-chase-cleaning" />} />
        <Route path="/kensington-cleaning" element={<CityLandingPage cityName="Kensington" citySlug="kensington-cleaning" />} />
        <Route path="/takoma-park-cleaning" element={<CityLandingPage cityName="Takoma Park" citySlug="takoma-park-cleaning" />} />
        <Route path="/bowie-cleaning" element={<CityLandingPage cityName="Bowie" citySlug="bowie-cleaning" />} />
        <Route path="/college-park-cleaning" element={<CityLandingPage cityName="College Park" citySlug="college-park-cleaning" />} />
        <Route path="/laurel-cleaning" element={<CityLandingPage cityName="Laurel" citySlug="laurel-cleaning" />} />

        {/* Washington DC */}
        <Route path="/washington-dc-cleaning" element={<CityLandingPage cityName="Washington DC" citySlug="washington-dc-cleaning" />} />
        <Route path="/northwest-dc-cleaning" element={<CityLandingPage cityName="Northwest DC" citySlug="northwest-dc-cleaning" />} />
        <Route path="/northeast-dc-cleaning" element={<CityLandingPage cityName="Northeast DC" citySlug="northeast-dc-cleaning" />} />
        <Route path="/downtown-dc-cleaning" element={<CityLandingPage cityName="Downtown DC" citySlug="downtown-dc-cleaning" />} />

        {/* Northern Virginia */}
        <Route path="/arlington-cleaning" element={<CityLandingPage cityName="Arlington" citySlug="arlington-cleaning" />} />
        <Route path="/alexandria-cleaning" element={<CityLandingPage cityName="Alexandria" citySlug="alexandria-cleaning" />} />
        <Route path="/falls-church-cleaning" element={<CityLandingPage cityName="Falls Church" citySlug="falls-church-cleaning" />} />
        <Route path="/mclean-cleaning" element={<CityLandingPage cityName="McLean" citySlug="mclean-cleaning" />} />
        <Route path="/tysons-cleaning" element={<CityLandingPage cityName="Tysons" citySlug="tysons-cleaning" />} />
        
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
            <StickyMobileCTA />
            <ChatbotWidget />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
