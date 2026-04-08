import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProofBar from "@/components/SocialProofBar";
import Services from "@/components/Services";
import PricingCalculator from "@/components/PricingCalculator";
import SEOSchema from "@/components/seo/SEOSchema";
import Footer from "@/components/Footer";

const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const MembershipSection = lazy(() => import("@/components/MembershipSection"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const HomeFAQ = lazy(() => import("@/components/HomeFAQ"));
const ServiceAreaSection = lazy(() => import("@/components/ServiceAreaSection"));
const TrustSection = lazy(() => import("@/components/TrustSection"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));
const Contact = lazy(() => import("@/components/Contact"));

const homepageFaqs = [
  { q: "How do I book a cleaning?", a: "Visit our booking page, select your service, enter your home details, choose your preferred date and time, and confirm. Takes under 5 minutes." },
  { q: "Are your cleaners background-checked?", a: "Yes. Every Design Cleaning professional is thoroughly background-checked, trained, and fully insured." },
  { q: "Do I need to be home during the cleaning?", a: "No. Many clients provide a key or door code. We're fully insured and bonded." },
  { q: "What's your cancellation policy?", a: "We ask for at least 24 hours notice for cancellations or rescheduling." },
  { q: "Do you offer recurring plans?", a: "Yes! Weekly, biweekly, or monthly cleaning with discounted rates and priority scheduling." },
  { q: "What areas do you serve?", a: "We currently serve Gaithersburg and Washington DC." },
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
        pageTitle="Professional Home Cleaning in Gaithersburg | Design Cleaning"
        pageDescription="Design Cleaning offers reliable, professional home cleaning in Gaithersburg and Washington DC. Book online in minutes. Standard, deep, move-in/out & recurring plans. Call (202) 935-9934."
        canonicalUrl="https://designcleaningdmv.com"
        pageType="home"
        faqItems={homepageFaqs}
      />
      <main id="main-content" className="min-h-screen">
        <Navbar />
        <Hero />
        <SocialProofBar />
        <LazySection minHeight={350}><HowItWorks /></LazySection>
        <Services />
        <LazySection minHeight={400}><MembershipSection /></LazySection>
        <LazySection minHeight={400}><WhyChooseUs /></LazySection>
        <PricingCalculator />
        <LazySection minHeight={300}><ServiceAreaSection /></LazySection>
        <LazySection minHeight={300}><TrustSection /></LazySection>
        <LazySection minHeight={400}><Testimonials /></LazySection>
        <LazySection minHeight={400}><HomeFAQ /></LazySection>
        <LazySection minHeight={200}><FinalCTA /></LazySection>
        <LazySection minHeight={400}><Contact /></LazySection>
        <Footer />
      </main>
    </>
  );
};

export default Index;
