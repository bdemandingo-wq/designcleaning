import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import { blogPosts as staticPosts } from "@/data/blogPosts";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>(staticPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("slug, title, excerpt, category, read_time")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (data && data.length > 0) {
        const dbPosts: BlogPost[] = data.map((p) => ({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          category: p.category,
          readTime: p.read_time,
        }));
        // Merge: DB posts first, then static posts that aren't duplicates
        const dbSlugs = new Set(dbPosts.map((p) => p.slug));
        const uniqueStatic = staticPosts.filter((p) => !dbSlugs.has(p.slug));
        setPosts([...dbPosts, ...uniqueStatic]);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <SEOSchema
        pageTitle="Cleaning Tips & Blog | Design Cleaning"
        pageDescription="Expert cleaning tips, guides, and advice from Design Cleaning. Learn how to keep your home spotless with our professional insights."
        canonicalUrl="https://designcleaningdmv.com/blog"
        pageType="blog"
      />
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Cleaning Tips & Insights</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Expert advice, practical guides, and professional tips to keep your home spotless.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {posts.map((post) => (
                <Card key={post.slug} className="border border-border shadow-sm hover:shadow-md transition-shadow group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold mb-4">Ready For A Cleaner Home?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">Book your cleaning today and let Design Cleaning handle the rest.</p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/booking">Book Your Cleaning</Link>
            </Button>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Blog;
