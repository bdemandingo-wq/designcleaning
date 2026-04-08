import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import StickyCallButton from "@/components/seo/StickyCallButton";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost { slug: string; title: string; excerpt: string; date: string; readTime: string; category: string; isAiGenerated?: boolean; }

const staticBlogPosts: BlogPost[] = [
  { slug: "deep-cleaning-vs-standard-cleaning", title: "How Often Should You Deep Clean Your Home in South Florida?", excerpt: "Not sure whether to book a standard or deep cleaning? Here's everything you need to know for your South Florida home.", date: "January 2025", readTime: "6 min read", category: "Guides" },
  { slug: "how-to-prepare-for-cleaning-service", title: "Top 5 Benefits of Hiring a Professional Cleaning Service in Pembroke Pines", excerpt: "A little preparation goes a long way! Here's how to get the most out of your professional cleaning.", date: "January 2025", readTime: "5 min read", category: "Tips" },
  { slug: "eco-friendly-cleaning-products", title: "Eco-Friendly Cleaning: Why It Matters for Your Family and the Environment", excerpt: "Protect your family and the environment with sustainable cleaning solutions.", date: "January 2025", readTime: "5 min read", category: "Tips" },
  { slug: "move-in-out-cleaning-checklist", title: "The Ultimate Move In/Out Cleaning Checklist for South Florida", excerpt: "Moving? This comprehensive checklist ensures you get your deposit back and start fresh.", date: "January 2025", readTime: "7 min read", category: "Guides" },
  { slug: "pet-friendly-cleaning-tips", title: "Pet-Friendly Home Cleaning Tips for Florida Pet Owners", excerpt: "Love your pets but struggling with hair and odors? Expert tips to keep your home fresh and clean.", date: "January 2025", readTime: "6 min read", category: "Tips" },
  { slug: "hurricane-season-cleaning-prep", title: "Hurricane Season Home Cleaning & Prep Guide for South Florida", excerpt: "Prepare your home before the storm and clean up after with our guide.", date: "January 2025", readTime: "8 min read", category: "Seasonal" },
  { slug: "broward-cost-guide", title: "2025 Cost Guide for Cleaning Services in Broward County", excerpt: "Planning your cleaning budget? Here's what you need to know about South Florida costs.", date: "January 2025", readTime: "5 min read", category: "Pricing" },
  { slug: "spring-cleaning-guide-south-florida", title: "Spring Cleaning Guide for South Florida Homes", excerpt: "Spring means pollen, humidity, and the perfect time for a deep clean.", date: "December 2024", readTime: "6 min read", category: "Seasonal" },
  { slug: "airbnb-turnover-cleaning-tips", title: "Airbnb & Vacation Rental Turnover Cleaning Tips", excerpt: "Maximize your rental reviews with quick and thorough turnover cleaning.", date: "December 2024", readTime: "6 min read", category: "Guides" },
  { slug: "bathroom-deep-cleaning-guide", title: "Complete Bathroom Deep Cleaning Guide", excerpt: "Tackle soap scum, mold, and grime with our step-by-step guide.", date: "December 2024", readTime: "8 min read", category: "Guides" },
  { slug: "kitchen-cleaning-hacks", title: "10 Kitchen Cleaning Hacks That Save Time", excerpt: "Make kitchen cleaning faster with pro tips from South Florida's experts.", date: "December 2024", readTime: "4 min read", category: "Tips" },
  { slug: "mold-prevention-florida-homes", title: "Mold Prevention Guide for Florida Homes", excerpt: "Florida's humidity creates perfect conditions for mold. Learn prevention tips.", date: "December 2024", readTime: "7 min read", category: "Health" },
  { slug: "post-construction-cleaning-guide", title: "Post-Construction Cleaning: What to Expect", excerpt: "Just finished a renovation? Everything about post-construction cleaning.", date: "December 2024", readTime: "6 min read", category: "Guides" },
];

const categories = ["All", "Guides", "Tips", "Seasonal", "Pricing", "Health"];

const Blog = () => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>(staticBlogPosts);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchAiPosts = async () => {
      const { data: aiPosts } = await supabase.from('blog_posts').select('slug, title, excerpt, category, read_time, published_at').eq('is_published', true).order('published_at', { ascending: false });
      if (aiPosts && aiPosts.length > 0) {
        const formatted: BlogPost[] = aiPosts.map(p => ({ slug: `ai/${p.slug}`, title: p.title, excerpt: p.excerpt, date: new Date(p.published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), readTime: p.read_time, category: p.category, isAiGenerated: true }));
        setAllPosts([...formatted, ...staticBlogPosts]);
      }
    };
    fetchAiPosts();
  }, []);

  const filteredPosts = selectedCategory === "All" ? allPosts : allPosts.filter(p => p.category === selectedCategory);

  return (
    <>
      <SEOSchema pageTitle="Cleaning Tips & Guides Blog | Pleasant Cleanings" pageDescription="Expert cleaning tips for South Florida homeowners. Deep cleaning, pet care, hurricane prep & more." canonicalUrl="https://pleasantcleanings.com/blog" pageType="blog" />
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Cleaning Tips & Guides</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Expert advice for keeping your South Florida home sparkling clean.</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map(c => (
                <button key={c} onClick={() => setSelectedCategory(c)} className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${c === selectedCategory ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10"}`}>{c}</button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <article key={post.slug} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">{post.category}</span>
                      {post.isAiGenerated && <span className="flex items-center gap-1 bg-accent/10 text-accent-foreground text-xs font-medium px-2 py-1 rounded-full"><Sparkles className="w-3 h-3" />New</span>}
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                    <h2 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="w-3 h-3" />{post.date}</span>
                      <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all">Read More <ArrowRight className="w-4 h-4" /></Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Ready for a Sparkling Clean Home?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Let Pleasant Cleanings handle the cleaning. Serving Pembroke Pines and South Florida.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#booking" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">Get Free Quote</Link>
              <a href="tel:+17867967445" className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors">Call (786) 796-7445</a>
            </div>
          </div>
        </section>
        <Footer />
        <StickyCallButton />
      </main>
    </>
  );
};

export default Blog;
