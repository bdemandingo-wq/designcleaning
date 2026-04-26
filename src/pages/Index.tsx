import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QuoteForm from "@/components/QuoteForm";
import TrustBadges from "@/components/TrustBadges";
import ServiceCards from "@/components/ServiceCards";
import HowItWorks from "@/components/HowItWorks";
import PricingPreview from "@/components/PricingPreview";
import SEOSchema from "@/components/seo/SEOSchema";
import Footer from "@/components/Footer";

const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const PrimaryServiceAreas = lazy(() => import("@/components/PrimaryServiceAreas"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const HomeFAQ = lazy(() => import("@/components/HomeFAQ"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));
const ReferralBanner = lazy(() => import("@/components/ReferralBanner"));
const ServiceMap = lazy(() => import("@/components/ServiceMap"));

const homepageFaqs = [
  { q: "How do I book a cleaning?", a: "Visit our pricing page, get your free estimate in 60 seconds, then choose your preferred date and confirm. Takes under 5 minutes." },
  { q: "Are your cleaners background-checked?", a: "Yes. Every Design Cleaning professional is thoroughly background-checked, trained, and fully insured." },
  { q: "Do I need to be home during the cleaning?", a: "No. Many clients provide a key or door code. We're fully insured and bonded." },
  { q: "What's your cancellation policy?", a: "We ask for at least 24 hours notice for cancellations or rescheduling." },
  { q: "Do you offer recurring plans?", a: "Yes — weekly, biweekly, or monthly with discounted rates and priority scheduling." },
  { q: "What areas do you serve?", a: "We serve Gaithersburg, Rockville, Bethesda, Silver Spring, Washington DC, and the surrounding DMV region." },
];

const LazySection = ({ children, minHeight = 200 }: { children: React.ReactNode; minHeight?: number }) => (
  <Suspense fallback={<div style={{ minHeight }} aria-hidden="true" />}>
    {children}
  </Suspense>
);

const Index = () => {
  return (
    <>
      <SEOSchema
        pageTitle="Professional Home Cleaning in the DMV | Design Cleaning"
        pageDescription="Reliable home cleaning across Gaithersburg, Rockville, Bethesda, Silver Spring & DC. Transparent pricing, easy online booking. Free estimate in 60 seconds."
        canonicalUrl="https://designcleaningdmv.com"
        pageType="home"
        faqItems={homepageFaqs}
      />
      <main id="main-content" className="min-h-screen">
        <Navbar />
        <Hero />
        <QuoteForm />
        <TrustBadges />
        <ServiceCards />
        <HowItWorks />
        <PricingPreview />
        <LazySection minHeight={400}><WhyChooseUs /></LazySection>
        <LazySection minHeight={350}><PrimaryServiceAreas /></LazySection>
        <LazySection minHeight={400}><Testimonials /></LazySection>
        <LazySection minHeight={400}><HomeFAQ /></LazySection>
        <LazySection minHeight={350}><ReferralBanner /></LazySection>
        <LazySection minHeight={300}><FinalCTA /></LazySection>
        <Footer />
      </main>
    </>
  );
};

export default Index;
