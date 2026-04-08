import { Helmet } from 'react-helmet-async';

interface SEOSchemaProps {
  pageTitle: string;
  pageDescription: string;
  canonicalUrl: string;
  pageType?: 'home' | 'county' | 'blog' | 'service' | 'city';
  county?: string;
  cityName?: string;
  blogMeta?: {
    datePublished?: string;
    dateModified?: string;
    readTime?: string;
    category?: string;
  };
  faqItems?: Array<{ q: string; a: string }>;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

const WEBSITE = "https://pleasantcleanings.com";
const BUSINESS_NAME = "Pleasant Cleanings";
const PHONE = "+1-786-796-7445";

const cleaningServiceSchema = {
  "@context": "https://schema.org",
  "@type": "CleaningService",
  "@id": `${WEBSITE}/#business`,
  "name": BUSINESS_NAME,
  "alternateName": ["Pleasant Cleanings"],
  "description": "Pleasant Cleanings offers reliable and professional cleaning services serving South Florida. We specialize in Residential, Commercial, and Airbnb cleanings.",
  "url": WEBSITE,
  "telephone": PHONE,
  "email": "support@pleasantcleanings.com",
  "foundingDate": "2025",
  "priceRange": "$$",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Cash, Credit Card, Debit Card",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Pembroke Pines",
    "addressRegion": "FL",
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "City", "name": "Pembroke Pines" },
    { "@type": "City", "name": "Miramar" },
    { "@type": "City", "name": "Coral Springs" },
    { "@type": "City", "name": "Aventura" },
    { "@type": "City", "name": "Doral" },
    { "@type": "City", "name": "Boca Raton" },
    { "@type": "City", "name": "Coral Gables" },
    { "@type": "City", "name": "Sunrise" },
    { "@type": "City", "name": "Davie" },
    { "@type": "City", "name": "Homestead" },
    { "@type": "City", "name": "Coconut Grove" },
    { "@type": "City", "name": "Miami Beach" },
    { "@type": "AdministrativeArea", "name": "Broward County" },
    { "@type": "AdministrativeArea", "name": "Palm Beach County" }
  ],
  "knowsAbout": ["House Cleaning", "Deep Cleaning", "Move-In Cleaning", "Move-Out Cleaning", "Upholstery Cleaning", "Eco-Friendly Cleaning", "Commercial Cleaning", "Airbnb Cleaning", "Post-Construction Cleaning"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Pleasant Cleanings Services",
    "itemListElement": [
      { "@type": "Offer", "name": "Standard House Cleaning", "price": "120", "priceCurrency": "USD", "itemOffered": { "@type": "Service", "name": "Standard Cleaning" } },
      { "@type": "Offer", "name": "Deep House Cleaning", "price": "220", "priceCurrency": "USD", "itemOffered": { "@type": "Service", "name": "Deep Cleaning" } },
      { "@type": "Offer", "name": "Move In / Move Out Cleaning", "price": "280", "priceCurrency": "USD", "itemOffered": { "@type": "Service", "name": "Move In/Out Cleaning" } },
      { "@type": "Offer", "name": "Upholstery Cleaning", "itemOffered": { "@type": "Service", "name": "Upholstery Cleaning" } }
    ]
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${WEBSITE}/#website`,
  "url": WEBSITE,
  "name": BUSINESS_NAME,
  "description": "Professional house cleaning in Pembroke Pines & South Florida. Quality, consistency & customer satisfaction.",
  "publisher": { "@id": `${WEBSITE}/#business` }
};

const SEOSchema = ({ pageTitle, pageDescription, canonicalUrl, pageType = 'home', county, cityName, blogMeta, faqItems, breadcrumbs }: SEOSchemaProps) => {
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
      { "@type": "ListItem", "position": 2, "name": pageTitle.replace(' | Pleasant Cleanings', ''), "item": canonicalUrl }
    ]
  } : null;

  const faqSchema = faqItems && faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question", "name": item.q, "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  } : null;

  const blogPostingSchema = pageType === 'blog' ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
    "datePublished": blogMeta?.datePublished || "2025-01-15",
    "dateModified": blogMeta?.dateModified || "2025-03-08",
    "author": { "@type": "Organization", "name": BUSINESS_NAME, "url": WEBSITE },
    "publisher": { "@type": "Organization", "name": BUSINESS_NAME },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
    ...(blogMeta?.category && { "articleSection": blogMeta.category }),
    ...(blogMeta?.readTime && { "timeRequired": `PT${blogMeta.readTime.replace(/\D/g, '')}M` })
  } : null;

  const serviceSchema = pageType === 'service' ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": pageTitle.replace(' | Pleasant Cleanings', ''),
    "description": pageDescription,
    "url": canonicalUrl,
    "provider": { "@id": `${WEBSITE}/#business` },
    "areaServed": { "@type": "City", "name": "Pembroke Pines, FL" },
    "termsOfService": `${WEBSITE}/faq`
  } : null;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={pageType === 'blog' ? 'article' : 'website'} />
      <meta property="og:site_name" content={BUSINESS_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="geo.region" content="US-FL" />
      <meta name="geo.placename" content="Pembroke Pines" />
      <link rel="alternate" hrefLang="en-us" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      
      {isHome && <script type="application/ld+json">{JSON.stringify(cleaningServiceSchema)}</script>}
      {isHome && <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>}
      {!isHome && <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "CleaningService", "@id": `${WEBSITE}/#business`, "name": BUSINESS_NAME, "url": WEBSITE, "telephone": PHONE })}</script>}
      {breadcrumbSchema && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>}
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      {blogPostingSchema && <script type="application/ld+json">{JSON.stringify(blogPostingSchema)}</script>}
      {serviceSchema && <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>}
    </Helmet>
  );
};

export default SEOSchema;
