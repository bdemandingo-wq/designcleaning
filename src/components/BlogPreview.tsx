import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  { slug: "deep-cleaning-vs-standard-cleaning", title: "How Often Should You Deep Clean Your Home in South Florida?", category: "Guides" },
  { slug: "how-to-prepare-for-cleaning-service", title: "Top 5 Benefits of Hiring a Professional Cleaning Service in Pembroke Pines", category: "Tips" },
  { slug: "eco-friendly-cleaning-products", title: "Eco-Friendly Cleaning: Why It Matters for Your Family and the Environment", category: "Tips" },
];

const BlogPreview = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="font-display text-3xl font-bold text-foreground">From Our Blog</h2>
          <Link to="/blog" className="text-primary font-medium hover:underline flex items-center gap-1">
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link 
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all group"
            >
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                {post.category}
              </span>
              <h3 className="font-display text-lg font-semibold text-foreground mt-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
