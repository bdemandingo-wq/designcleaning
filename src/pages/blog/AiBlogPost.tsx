import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Sparkles } from "lucide-react";
import DOMPurify from "dompurify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOSchema from "@/components/seo/SEOSchema";
import StickyCallButton from "@/components/seo/StickyCallButton";
import RelatedLinks from "@/components/seo/RelatedLinks";
import AuthorBio from "@/components/seo/AuthorBio";
import { supabase } from "@/integrations/supabase/client";

interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  read_time: string;
  published_at: string;
}

const AiBlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        navigate('/blog');
        return;
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error || !data) {
        console.error('Error fetching blog post:', error);
        navigate('/blog');
        return;
      }

      setPost(data);
      setLoading(false);
    };

    fetchPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!post) {
    return null;
  }

  const publishedDate = new Date(post.published_at).toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <>
      <SEOSchema
        pageTitle={`${post.title} | Pleasant Cleanings`}
        pageDescription={post.excerpt}
        canonicalUrl={`https://pleasantcleanings.com/blog/ai/${slug}`}
        pageType="blog"
        county="South Florida"
      />
      <main className="min-h-screen">
        <Navbar />
        
        <article className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 bg-accent/10 text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                  <Sparkles className="w-3 h-3" />
                  AI Generated
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {publishedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {post.read_time}
                </span>
              </div>
            </header>

            <div 
              className="prose prose-lg max-w-none [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:font-display [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-foreground [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:text-muted-foreground [&>p]:mb-4 [&>ul]:list-disc [&>ul]:list-inside [&>ul]:text-muted-foreground [&>ul]:space-y-2 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:text-muted-foreground [&>ol]:space-y-2 [&>ol]:mb-6"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(post.content, {
                  ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br', 'span'],
                  ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
                })
              }}
            />

            <div className="bg-primary/10 rounded-xl p-6 mt-8">
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                Ready for Professional Cleaning?
              </h3>
              <p className="text-muted-foreground mb-4">
                Let Pleasant Cleanings handle your cleaning needs. We serve all of South Florida 
                with eco-friendly, professional cleaning services.
              </p>
              <Link 
                to="/#booking"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Book Your Cleaning
              </Link>
            </div>
          </div>
        </article>

        <AuthorBio />
        <RelatedLinks currentPage={`/blog/ai/${slug}`} pageType="blog" />
        <Footer />
        <StickyCallButton />
      </main>
    </>
  );
};

export default AiBlogPost;
