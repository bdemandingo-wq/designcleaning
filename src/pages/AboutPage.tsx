import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import { ShieldCheck, Users, Target, Heart } from "lucide-react";

const values = [
  { icon: Target, title: "Our Mission", description: "To provide dependable home cleaning so you can focus on what matters. We make booking a cleaning as simple as ordering a service online." },
  { icon: ShieldCheck, title: "Vetted Professionals", description: "Every cleaner on our team is thoroughly background-checked, trained to our service standards, and fully insured before their first assignment." },
  { icon: Users, title: "Consistent Quality", description: "We follow structured cleaning checklists to ensure every home receives the same high standard of service, every single time." },
  { icon: Heart, title: "Customer First", description: "We believe in transparent pricing, honest communication, and going above and beyond to make sure every client is satisfied." },
];

const AboutPage = () => {
  return (
    <>
      <SEOSchema
        pageTitle="About Us | Design Cleaning"
        pageDescription="Design Cleaning is a modern residential cleaning service built for reliability, simplicity, and professional execution."
        canonicalUrl="https://[DOMAIN]/about"
      />
      <main id="main-content" className="min-h-screen">
        <Navbar />
        <div className="pt-16">
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">About Design Cleaning</h1>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
                A modern cleaning service built for reliability, simplicity, and professional execution.
              </p>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
              <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                Design Cleaning is a modern residential cleaning service built for reliability, simplicity, and professional execution. We make booking a cleaning as simple as ordering a service online — fast booking, structured service delivery, and trusted cleaning professionals. Our mission is to provide dependable home cleaning so you can focus on what matters.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {values.map((v) => (
                  <div key={v.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <v.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default AboutPage;
