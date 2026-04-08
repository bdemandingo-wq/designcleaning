import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import StickyCallButton from "@/components/seo/StickyCallButton";
import RelatedLinks from "@/components/seo/RelatedLinks";
import AuthorBio from "@/components/seo/AuthorBio";

const PembrokePinesPermitRules = () => {
  return (
    <>
      <SEOSchema
        pageTitle="Cleaning Permit Rules Pembroke Pines 2025 | Pleasant Cleanings"
        pageDescription="Pembroke Pines cleaning permit rules for 2025. Condo requirements, HOA policies, and what to know before hiring a cleaning service in Pembroke Pines. Free consultation!"
        canonicalUrl="https://pleasantcleanings.com/blog/miami-permit-rules"
        pageType="blog"
        county="Broward County"
        blogMeta={{ datePublished: "2025-01-10", readTime: "6 min", category: "Local Guides" }}
      />
      <main className="min-h-screen">
        <Navbar />
        
        <article className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link to="/service-areas" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Pembroke Pines Cleaning
            </Link>

            <header className="mb-12">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  January 2025
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  4 min read
                </span>
              </div>
              
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Permit Rules for Cleaning Services in Pembroke Pines
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Living in a Pembroke Pines condo or HOA community? Here's what you need to know about 
                <Link to="/service-areas" className="text-primary hover:underline mx-1">hiring cleaning services in Broward County</Link>.
              </p>
            </header>

            <div className="prose prose-lg max-w-none">
              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                Condo Building Requirements in Pembroke Pines
              </h2>
              <p className="text-muted-foreground mb-6">
                Many Pembroke Pines condos require cleaning services to be registered with building management. 
                At Pleasant Cleanings, we handle this for you—we're registered with major buildings throughout 
                <Link to="/service-areas" className="text-primary hover:underline mx-1">Broward County</Link>.
              </p>

              <div className="bg-muted p-6 rounded-xl mb-8">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">Common Condo Requirements</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Proof of liability insurance (we have it!)</li>
                  <li>• Background check documentation</li>
                  <li>• Service hours restrictions (typically 8AM-6PM)</li>
                  <li>• Loading dock/service elevator usage</li>
                </ul>
              </div>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                HOA Policies in Coral Gables & Aventura
              </h2>
              <p className="text-muted-foreground mb-6">
                Upscale neighborhoods in Coral Gables and Aventura often have specific HOA rules. 
                Our <Link to="/service-areas" className="text-primary hover:underline">professional cleaning team</Link> is experienced 
                with these communities and follows all guidelines.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                Pembroke Pines Business Requirements
              </h2>
              <p className="text-muted-foreground mb-6">
                Professional cleaning services in Pembroke Pines must have:
              </p>
              <ul className="space-y-2 text-muted-foreground mb-8">
                <li>• Local business tax receipt</li>
                <li>• General liability insurance</li>
                <li>• Workers' compensation (for employees)</li>
              </ul>
              <p className="text-muted-foreground mb-6">
                Pleasant Cleanings meets all <a href="https://www.coj.net" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Broward County</a> requirements 
                and is fully licensed, bonded, and insured.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                Tips for Hiring a Cleaning Service
              </h2>
              <ol className="space-y-2 text-muted-foreground mb-8 list-decimal list-inside">
                <li>Check with your building/HOA first about any requirements</li>
                <li>Ask the cleaning service for proof of insurance</li>
                <li>Confirm they have experience in your building type</li>
                <li>Get a written estimate before booking</li>
              </ol>

              <div className="bg-primary/10 p-6 rounded-xl">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  Need Help with Your Building's Requirements?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Our team is experienced with Pembroke Pines condos and HOA communities. Call <a href="tel:+17867967445" className="text-primary font-semibold">(786) 796-7445</a> or 
                  <Link to="/#booking" className="text-primary hover:underline ml-1">book online</Link> for 
                  <Link to="/service-areas" className="text-primary hover:underline ml-1">Pembroke Pines cleaning services</Link>.
                </p>
                <p className="text-sm text-muted-foreground">
                  Also serving <Link to="/service-areas" className="text-primary hover:underline">Broward County</Link> and 
                  <Link to="/service-areas" className="text-primary hover:underline ml-1">Palm Beach County</Link>.
                </p>
              </div>
            </div>
          </div>
        </article>

        <AuthorBio />
        <RelatedLinks currentPage="/blog/miami-permit-rules" pageType="blog" />
        <Footer />
        <StickyCallButton />
      </main>
    </>
  );
};

export default PembrokePinesPermitRules;
