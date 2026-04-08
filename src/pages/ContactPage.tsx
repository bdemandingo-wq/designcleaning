import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import SEOSchema from "@/components/seo/SEOSchema";

const ContactPage = () => {
  return (
    <>
      <SEOSchema
        pageTitle="Contact Us | Design Cleaning"
        pageDescription="Contact Design Cleaning for professional home cleaning in [PRIMARY_CITY]. Call [PHONE] or email [EMAIL]."
        canonicalUrl="https://[DOMAIN]/contact"
      />
      <main id="main-content" className="min-h-screen">
        <Navbar />
        <div className="pt-16">
          <Contact />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default ContactPage;
