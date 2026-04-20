import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Instagram, ExternalLink } from "lucide-react";

interface WorkCard {
  id: string;
  platform: string;
  image_url: string;
  caption: string;
  post_url: string;
  sort_order: number;
}

const OurWorkPage = () => {
  const [igHandle, setIgHandle] = useState("@designcleaningdmv");
  const [igUrl, setIgUrl] = useState("https://www.instagram.com/designcleaningdmv/");
  const [ttHandle, setTtHandle] = useState("@designcleaningdmv");
  const [ttUrl, setTtUrl] = useState("https://www.tiktok.com/@designcleaningdmv");
  const [instagramCards, setInstagramCards] = useState<WorkCard[]>([]);
  const [tiktokCards, setTiktokCards] = useState<WorkCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [contentRes, cardsRes] = await Promise.all([
        supabase.from("site_content").select("*"),
        supabase.from("work_cards").select("*").order("sort_order", { ascending: true }),
      ]);

      if (contentRes.data) {
        contentRes.data.forEach((row) => {
          if (row.key === "instagram_handle") setIgHandle(row.value);
          if (row.key === "instagram_url") setIgUrl(row.value);
          if (row.key === "tiktok_handle") setTtHandle(row.value);
          if (row.key === "tiktok_url") setTtUrl(row.value);
        });
      }

      if (cardsRes.data) {
        setInstagramCards(cardsRes.data.filter((c) => c.platform === "instagram"));
        setTiktokCards(cardsRes.data.filter((c) => c.platform === "tiktok"));
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>See Our Work | Design Cleaning</title>
        <meta
          name="description"
          content="Browse our cleaning results on Instagram and TikTok. See real before & after transformations by Design Cleaning in the DMV area."
        />
      </Helmet>
      <Navbar />
      <main id="main-content" className="pt-16">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              See Our Work
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Real results from real homes. Follow us on Instagram and TikTok to see our latest cleaning transformations.
            </p>
          </div>
        </section>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Instagram Section */}
            {instagramCards.length > 0 && (
              <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                  <div className="flex items-center gap-3 mb-8">
                    <Instagram className="w-7 h-7 text-pink-500" />
                    <h2 className="font-display text-2xl md:text-3xl font-bold">Instagram</h2>
                    <a
                      href={igUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-sm font-medium text-primary hover:underline flex items-center gap-1"
                    >
                      {igHandle} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
                    {instagramCards.map((post) => (
                      <a
                        key={post.id}
                        href={post.post_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 snap-start group"
                      >
                        <div className="w-64 h-64 md:w-72 md:h-72 rounded-xl overflow-hidden relative">
                          <img
                            src={post.image_url}
                            alt={post.caption}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                            <p className="text-white text-sm p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                              {post.caption}
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* TikTok Section */}
            {tiktokCards.length > 0 && (
              <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                  <div className="flex items-center gap-3 mb-8">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.1a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.47z" />
                    </svg>
                    <h2 className="font-display text-2xl md:text-3xl font-bold">TikTok</h2>
                    <a
                      href={ttUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-sm font-medium text-primary hover:underline flex items-center gap-1"
                    >
                      {ttHandle} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
                    {tiktokCards.map((video) => (
                      <a
                        key={video.id}
                        href={video.post_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 snap-start group"
                      >
                        <div className="w-48 h-80 md:w-56 md:h-96 rounded-xl overflow-hidden relative">
                          <img
                            src={video.image_url}
                            alt={video.caption}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                            <p className="text-white text-xs font-medium">{video.caption}</p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Want Results Like These?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Book your cleaning today and see the Design Cleaning difference for yourself.
            </p>
            <a
              href="/booking"
              className="inline-block bg-accent text-accent-foreground font-semibold px-8 py-3 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Book Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default OurWorkPage;
