import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProofBar from "@/components/SocialProofBar";
import Services from "@/components/Services";
import PricingCalculator from "@/components/PricingCalculator";
import SEOSchema from "@/components/seo/SEOSchema";
import Footer from "@/components/Footer";

const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const HomeFAQ = lazy(() => import("@/components/HomeFAQ"));
const ContactOptions = lazy(() => import("@/components/ContactOptions"));
const Contact = lazy(() => import("@/components/Contact"));
const BlogPreview = lazy(() => import("@/components/BlogPreview"));
const AIChatbot = lazy(() => import("@/components/AIChatbot"));
const StickyCallButton = lazy(() => import("@/components/seo/StickyCallButton"));

const homepageFaqs = [
  { q: "How much does cleaning cost in South Florida?", a: "Our standard cleaning starts at $120 for homes up to 750 sq ft. Deep cleaning starts at $220 and move-in/out cleaning starts at $280. Use our instant price calculator for your exact quote." },
  { q: "Are your cleaners background-checked?", a: "Yes! Every Pleasant Cleanings professional undergoes a thorough background check, is fully insured, and completes our professional training program." },
  { q: "Do I need to be home during the cleaning?", a: "No, many clients provide a spare key or door code. We're fully insured and bonded." },
  { q: "What cleaning products do you use?", a: "We use eco-friendly, non-toxic cleaning products safe for children, pets, and the environment." },
  { q: "What's your cancellation policy?", a: "We ask for at least 24 hours notice for cancellations." },
  { q: "Do you offer recurring cleaning discounts?", a: "Absolutely! Weekly service saves 15%, bi-weekly saves 10%, and monthly saves 5%." },
  { q: "What areas do you serve?", a: "We serve 12+ cities across South Florida including Pembroke Pines, Miramar, Coral Springs, Aventura, Doral, and more." },
  { q: "What's included in a deep clean vs. standard clean?", a: "A standard clean covers vacuuming, mopping, bathroom sanitization, kitchen cleaning, and dusting. A deep clean adds baseboards, inside cabinets, light fixtures, door handles, and detailed scrubbing." },
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
        pageTitle="House Cleaning Pembroke Pines, Broward County & South Florida | Pleasant Cleanings"
        pageDescription="Top-rated house cleaning in Pembroke Pines and South Florida. Pleasant Cleanings serves 12+ cities including Miramar, Coral Springs, Aventura & more. Instant online quotes. Call (786) 796-7445."
        canonicalUrl="https://pleasantcleanings.com"
        pageType="home"
        faqItems={homepageFaqs}
      />
      <main id="main-content" className="min-h-screen">
        <Navbar />
        <Hero />
        <SocialProofBar />
        <Services />
        <LazySection minHeight={350}><HowItWorks /></LazySection>
        <PricingCalculator />
        
        <LazySection minHeight={400}><WhyChooseUs /></LazySection>
        <LazySection minHeight={400}><Testimonials /></LazySection>
        <LazySection minHeight={400}><HomeFAQ /></LazySection>
        <LazySection minHeight={200}><ContactOptions /></LazySection>
        <LazySection minHeight={300}><BlogPreview /></LazySection>
        <LazySection minHeight={400}><Contact /></LazySection>
        
        <Footer />
        <LazySection minHeight={0}><StickyCallButton /></LazySection>
        <LazySection minHeight={0}><AIChatbot /></LazySection>
      </main>
    </>
  );
};

export default Index;
