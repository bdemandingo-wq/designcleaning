import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import { blogPosts } from "@/data/blogPosts";
import DOMPurify from "dompurify";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <>
      <SEOSchema
        pageTitle={`${post.title} | Design Cleaning`}
        pageDescription={post.excerpt}
        canonicalUrl={`https://designcleaningdmv.com/blog/${post.slug}`}
        pageType="blog"
        blogMeta={{
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          readTime: post.readTime,
          category: post.category,
        }}
        breadcrumbs={[
          { name: "Home", url: "https://designcleaningdmv.com" },
          { name: "Blog", url: "https://designcleaningdmv.com/blog" },
          { name: post.title, url: `https://designcleaningdmv.com/blog/${post.slug}` },
        ]}
      />
      <main className="min-h-screen">
        <Navbar />
        <article className="pt-24 pb-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
              {post.title}
            </h1>

            <div
              className="prose prose-lg max-w-none text-foreground prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />

            <div className="mt-16 p-8 bg-primary rounded-xl text-primary-foreground text-center">
              <h2 className="font-display text-2xl font-bold mb-3">Ready For A Cleaner Home?</h2>
              <p className="text-primary-foreground/80 mb-6">Book your cleaning today — simple pricing, professional results.</p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/booking" className="flex items-center gap-2">
                  Book Now <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </article>
        <Footer />
      </main>
    </>
  );
};

export default BlogPost;
