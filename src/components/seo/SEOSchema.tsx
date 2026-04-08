import { Helmet } from 'react-helmet-async';

interface SEOSchemaProps {
  pageTitle: string;
  pageDescription: string;
  canonicalUrl: string;
  pageType?: 'home' | 'county' | 'blog' | 'service' | 'city';
  county?: string;
  cityName?: string;
  blogMeta?: { datePublished?: string; dateModified?: string; readTime?: string; category?: string };
  faqItems?: Array<{ q: string; a: string }>;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

const WEBSITE = "https://designcleaningdmv.com";
const BUSINESS_NAME = "Design Cleaning";
const PHONE = "(202) 935-9934";

const cleaningServiceSchema = {
  "@context": "https://schema.org",
  "@type": "CleaningService",
  "@id": `${WEBSITE}/#business`,
  "name": BUSINESS_NAME,
  "description": "Design Cleaning is a modern residential cleaning service built for reliability, simplicity, and professional execution.",
  "url": WEBSITE,
  "telephone": PHONE,
  "email": "DesignCleaning@proton.me",
  "foundingDate": "2025",
  "priceRange": "$$",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Cash, Credit Card, Debit Card",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Gaithersburg",
    "addressRegion": "MD",
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "City", "name": "Gaithersburg" },
    { "@type": "City", "name": "Washington DC" },
    { "@type": "City", "name": "Silver Spring" },
    { "@type": "City", "name": "Rockville" },
    { "@type": "City", "name": "Bethesda" },
    { "@type": "City", "name": "Germantown" },
  ],
  "knowsAbout": ["House Cleaning", "Deep Cleaning", "Move-In Cleaning", "Move-Out Cleaning", "Recurring Cleaning"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Design Cleaning Services",
    "itemListElement": [
      { "@type": "Offer", "name": "Standard Cleaning", "itemOffered": { "@type": "Service", "name": "Standard Cleaning" } },
      { "@type": "Offer", "name": "Deep Cleaning", "itemOffered": { "@type": "Service", "name": "Deep Cleaning" } },
      { "@type": "Offer", "name": "Move In/Out Cleaning", "itemOffered": { "@type": "Service", "name": "Move In/Out Cleaning" } },
    ]
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${WEBSITE}/#website`,
  "url": WEBSITE,
  "name": BUSINESS_NAME,
  "description": "Professional home cleaning made simple.",
  "publisher": { "@id": `${WEBSITE}/#business` }
};

const SEOSchema = ({ pageTitle, pageDescription, canonicalUrl, pageType = 'home', blogMeta, faqItems, breadcrumbs }: SEOSchemaProps) => {
  const isHome = pageType === 'home';

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, i) => ({
      "@type": "ListItem", "position": i + 1, "name": item.name, "item": item.url
    }))
  } : pageType !== 'home' ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": WEBSITE },
      { "@type": "ListItem", "position": 2, "name": pageTitle.replace(' | Design Cleaning', ''), "item": canonicalUrl }
    ]
  } : null;

  const faqSchema = faqItems && faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question", "name": item.q, "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  } : null;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={pageType === 'blog' ? 'article' : 'website'} />
      <meta property="og:site_name" content={BUSINESS_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      
      {isHome && <script type="application/ld+json">{JSON.stringify(cleaningServiceSchema)}</script>}
      {isHome && <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>}
      {breadcrumbSchema && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>}
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
    </Helmet>
  );
};

export default SEOSchema;
