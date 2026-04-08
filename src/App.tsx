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

// Lazy load non-critical routes
const BookingForm = lazy(() => import("./pages/BookingForm"));
const Confirmation = lazy(() => import("./pages/Confirmation"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const CustomerPortal = lazy(() => import("./pages/CustomerPortal"));
const CleanerApplication = lazy(() => import("./pages/CleanerApplication"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Service pages
const StandardCleaning = lazy(() => import("./pages/StandardCleaning"));
const DeepCleaning = lazy(() => import("./pages/DeepCleaning"));
const MoveInOutCleaning = lazy(() => import("./pages/MoveInOutCleaning"));
const UpholsteryCleaning = lazy(() => import("./pages/UpholsteryCleaning"));
const AirbnbCleaning = lazy(() => import("./pages/AirbnbCleaning"));
const OfficeCleaning = lazy(() => import("./pages/OfficeCleaning"));
const PostConstructionCleaning = lazy(() => import("./pages/PostConstructionCleaning"));

// Info pages
const Blog = lazy(() => import("./pages/Blog"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const ContractorRateSheet = lazy(() => import("./pages/ContractorRateSheet"));

// South Florida city landing pages
const PembrokePinesCleaning = lazy(() => import("./pages/cities/PembrokePinesCleaning"));
const MiramarCleaning = lazy(() => import("./pages/cities/MiramarCleaning"));
const CoralSpringsCleaning = lazy(() => import("./pages/cities/CoralSpringsCleaning"));
const AventuraCleaning = lazy(() => import("./pages/cities/AventuraCleaning"));
const DoralCleaning = lazy(() => import("./pages/cities/DoralCleaning"));
const BocaRatonCleaning = lazy(() => import("./pages/cities/BocaRatonCleaning"));
const CoralGablesCleaning = lazy(() => import("./pages/cities/CoralGablesCleaning"));
const SunriseCleaning = lazy(() => import("./pages/cities/SunriseCleaning"));
const DavieCleaning = lazy(() => import("./pages/cities/DavieCleaning"));
const HomesteadCleaning = lazy(() => import("./pages/cities/HomesteadCleaning"));
const CoconutGroveCleaning = lazy(() => import("./pages/cities/CoconutGroveCleaning"));
const MiamiBeachCleaning = lazy(() => import("./pages/cities/MiamiBeachCleaning"));

// Blog posts
const BrowardCostGuide = lazy(() => import("./pages/blog/BrowardCostGuide"));
const MiamiPermitRules = lazy(() => import("./pages/blog/MiamiPermitRules"));
const PalmBeachSeasonalDiscounts = lazy(() => import("./pages/blog/PalmBeachSeasonalDiscounts"));
const MoveInOutCleaningChecklist = lazy(() => import("./pages/blog/MoveInOutCleaningChecklist"));
const DeepCleaningVsStandardCleaning = lazy(() => import("./pages/blog/DeepCleaningVsStandardCleaning"));
const PetFriendlyCleaningTips = lazy(() => import("./pages/blog/PetFriendlyCleaningTips"));
const HurricaneSeasonCleaningPrep = lazy(() => import("./pages/blog/HurricaneSeasonCleaningPrep"));
const HowToPrepareForCleaningService = lazy(() => import("./pages/blog/HowToPrepareForCleaningService"));
const SpringCleaningGuide = lazy(() => import("./pages/blog/SpringCleaningGuide"));
const EcoFriendlyCleaningProducts = lazy(() => import("./pages/blog/EcoFriendlyCleaningProducts"));
const AllergyFreeHomeCleaning = lazy(() => import("./pages/blog/AllergyFreeHomeCleaning"));
const HolidayCleaningChecklist = lazy(() => import("./pages/blog/HolidayCleaningChecklist"));
const BathroomDeepCleaningGuide = lazy(() => import("./pages/blog/BathroomDeepCleaningGuide"));
const KitchenCleaningHacks = lazy(() => import("./pages/blog/KitchenCleaningHacks"));
const AirbnbTurnoverCleaningTips = lazy(() => import("./pages/blog/AirbnbTurnoverCleaningTips"));
const MoldPreventionFlorida = lazy(() => import("./pages/blog/MoldPreventionFlorida"));
const CondoCleaningRules = lazy(() => import("./pages/blog/CondoCleaningRules"));
const PostConstructionCleaningGuide = lazy(() => import("./pages/blog/PostConstructionCleaningGuide"));
const AiBlogPost = lazy(() => import("./pages/blog/AiBlogPost"));

const queryClient = new QueryClient();

const AppRoutes = () => {
  usePageTracking();
  
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/my-bookings" element={<CustomerPortal />} />
        <Route path="/apply" element={<CleanerApplication />} />
        
        {/* Service Pages */}
        <Route path="/standard-cleaning" element={<StandardCleaning />} />
        <Route path="/deep-cleaning" element={<DeepCleaning />} />
        <Route path="/move-in-out-cleaning" element={<MoveInOutCleaning />} />
        <Route path="/upholstery-cleaning" element={<UpholsteryCleaning />} />
        <Route path="/airbnb-cleaning" element={<AirbnbCleaning />} />
        <Route path="/office-cleaning" element={<OfficeCleaning />} />
        <Route path="/post-construction-cleaning" element={<PostConstructionCleaning />} />
        
        {/* Info Pages */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/contractor-rate-sheet" element={<ContractorRateSheet />} />
        
        {/* South Florida City Landing Pages */}
        <Route path="/pembroke-pines-cleaning" element={<PembrokePinesCleaning />} />
        <Route path="/miramar-cleaning" element={<MiramarCleaning />} />
        <Route path="/coral-springs-cleaning" element={<CoralSpringsCleaning />} />
        <Route path="/aventura-cleaning" element={<AventuraCleaning />} />
        <Route path="/doral-cleaning" element={<DoralCleaning />} />
        <Route path="/boca-raton-cleaning" element={<BocaRatonCleaning />} />
        <Route path="/coral-gables-cleaning" element={<CoralGablesCleaning />} />
        <Route path="/sunrise-cleaning" element={<SunriseCleaning />} />
        <Route path="/davie-cleaning" element={<DavieCleaning />} />
        <Route path="/homestead-cleaning" element={<HomesteadCleaning />} />
        <Route path="/coconut-grove-cleaning" element={<CoconutGroveCleaning />} />
        <Route path="/miami-beach-cleaning" element={<MiamiBeachCleaning />} />
        
        {/* Blog Posts */}
        <Route path="/blog/broward-cost-guide" element={<BrowardCostGuide />} />
        <Route path="/blog/miami-permit-rules" element={<MiamiPermitRules />} />
        <Route path="/blog/palm-beach-seasonal-discounts" element={<PalmBeachSeasonalDiscounts />} />
        <Route path="/blog/move-in-out-cleaning-checklist" element={<MoveInOutCleaningChecklist />} />
        <Route path="/blog/deep-cleaning-vs-standard-cleaning" element={<DeepCleaningVsStandardCleaning />} />
        <Route path="/blog/pet-friendly-cleaning-tips" element={<PetFriendlyCleaningTips />} />
        <Route path="/blog/hurricane-season-cleaning-prep" element={<HurricaneSeasonCleaningPrep />} />
        <Route path="/blog/how-to-prepare-for-cleaning-service" element={<HowToPrepareForCleaningService />} />
        <Route path="/blog/spring-cleaning-guide-south-florida" element={<SpringCleaningGuide />} />
        <Route path="/blog/eco-friendly-cleaning-products" element={<EcoFriendlyCleaningProducts />} />
        <Route path="/blog/allergy-free-home-cleaning" element={<AllergyFreeHomeCleaning />} />
        <Route path="/blog/holiday-cleaning-checklist" element={<HolidayCleaningChecklist />} />
        <Route path="/blog/bathroom-deep-cleaning-guide" element={<BathroomDeepCleaningGuide />} />
        <Route path="/blog/kitchen-cleaning-hacks" element={<KitchenCleaningHacks />} />
        <Route path="/blog/airbnb-turnover-cleaning-tips" element={<AirbnbTurnoverCleaningTips />} />
        <Route path="/blog/mold-prevention-florida-homes" element={<MoldPreventionFlorida />} />
        <Route path="/blog/condo-cleaning-rules-south-florida" element={<CondoCleaningRules />} />
        <Route path="/blog/post-construction-cleaning-guide" element={<PostConstructionCleaningGuide />} />
        
        {/* AI-Generated Blog Posts */}
        <Route path="/blog/ai/:slug" element={<AiBlogPost />} />
        
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
