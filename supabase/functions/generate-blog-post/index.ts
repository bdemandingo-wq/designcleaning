import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('Origin') || '';
  const isAllowed = origin.includes('.lovable.app') || origin.includes('.lovableproject.com') ||
    origin.includes('designcleaningdmv.com') ||
    origin.startsWith('http://localhost:');
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'https://designcleaningdmv.com',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

const CLEANING_TOPICS = [
  "Quick cleaning hacks for busy DMV professionals",
  "How to maintain a clean home during allergy season in Maryland",
  "Pet-friendly cleaning solutions for DMV homeowners",
  "Best practices for cleaning homes in Gaithersburg",
  "Seasonal deep cleaning checklist for Maryland homeowners",
  "Green cleaning tips for eco-conscious families in the DMV",
  "Organizing tips for apartments in Washington DC",
  "How to clean and maintain hardwood floors in humid climates",
  "Tips for keeping your Airbnb spotless between guests",
  "Cleaning tips for homes with allergies in the DMV",
  "Best products for removing mildew in bathrooms",
  "Kitchen deep cleaning tips for holiday entertaining",
  "How to prepare your home for professional cleaners",
  "Decluttering strategies for a stress-free home",
  "Cleaning tips for new parents in the DMV area",
  "How to maintain pristine white surfaces in your home",
  "Tips for cleaning after a rainstorm in Maryland",
  "How to keep your garage clean and organized",
  "Cleaning checklist for vacation rental properties",
  "How to deep clean upholstery and fabric furniture",
  "Tips for maintaining hardwood floors in Maryland homes",
  "Cleaning tips for home offices and workspaces",
  "How to clean and sanitize children's toys and playrooms",
  "Tips for removing tough stains from carpets",
  "How to maintain a clean and fresh-smelling closet",
  "Move-in cleaning checklist for DMV renters",
  "How to keep your Bethesda home sparkling year-round",
  "Spring cleaning guide for Silver Spring homeowners",
  "Best cleaning routines for busy Rockville families",
  "Deep cleaning tips before hosting guests in your DC home",
];

const CATEGORIES = ["Tips", "Guides", "Seasonal", "Health", "Home Care"];

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');

    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_ANON_KEY) throw new Error('Supabase credentials not configured');

    // Auth check
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '').trim();

    if (token !== SUPABASE_ANON_KEY) {
      // Manual call - require admin
      if (!authHeader?.startsWith('Bearer ')) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      const userSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { global: { headers: { Authorization: authHeader } } });
      const { data: { user }, error: authError } = await userSupabase.auth.getUser();
      if (authError || !user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      const adminCheckSupabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      const { data: roleData } = await adminCheckSupabase.from('user_roles').select('role').eq('user_id', user.id).eq('role', 'admin').maybeSingle();
      if (!roleData) {
        return new Response(JSON.stringify({ error: 'Forbidden: Admin access required' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    }

    const serviceSupabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: existingPosts } = await serviceSupabase.from('blog_posts').select('slug, title');
    const existingTitles = new Set((existingPosts || []).map((p: { title: string }) => p.title.toLowerCase()));

    let topic = CLEANING_TOPICS[Math.floor(Math.random() * CLEANING_TOPICS.length)];
    let attempts = 0;
    while (existingTitles.has(topic.toLowerCase()) && attempts < 10) {
      topic = CLEANING_TOPICS[Math.floor(Math.random() * CLEANING_TOPICS.length)];
      attempts++;
    }

    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    console.log(`Generating blog post about: ${topic}`);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${LOVABLE_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a professional content writer for Design Cleaning, a modern residential cleaning service in the DMV region (DC, Maryland & Virginia). Write engaging, SEO-optimized blog posts about cleaning tips and home care. Your content should be helpful and relevant to DMV homeowners. Include local references to Gaithersburg, Washington DC, Silver Spring, Rockville, Bethesda, Germantown, Potomac, Bowie, College Park, and Laurel when appropriate.`
          },
          {
            role: 'user',
            content: `Write a blog post about: "${topic}"

Return your response in the following JSON format:
{
  "title": "SEO-optimized title (50-60 characters)",
  "excerpt": "Engaging summary (150-160 characters)",
  "content": "Full blog post content in HTML format with proper headings (h2, h3), paragraphs, and lists. Around 800-1200 words.",
  "read_time": "X min read"
}

The content should include:
- An engaging introduction
- 3-5 main sections with subheadings
- Practical tips and actionable advice
- A call-to-action mentioning Design Cleaning services
- Proper HTML formatting (use <h2>, <h3>, <p>, <ul>, <li>, <strong> tags)`
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      if (response.status === 429) return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      if (response.status === 402) return new Response(JSON.stringify({ error: 'Payment required' }), { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiData = await response.json();
    const aiContent = aiData.choices?.[0]?.message?.content;
    if (!aiContent) throw new Error('No content generated');

    let blogData;
    try {
      const jsonMatch = aiContent.match(/```json\s*([\s\S]*?)\s*```/) || aiContent.match(/```\s*([\s\S]*?)\s*```/) || [null, aiContent];
      blogData = JSON.parse((jsonMatch[1] || aiContent).trim());
    } catch {
      throw new Error('Failed to parse AI-generated content');
    }

    const slug = blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 100);
    const { data: existingSlug } = await serviceSupabase.from('blog_posts').select('slug').eq('slug', slug).single();
    if (existingSlug) {
      return new Response(JSON.stringify({ message: 'Blog post with similar title already exists', skipped: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const { data: newPost, error: insertError } = await serviceSupabase.from('blog_posts').insert({
      title: blogData.title, slug, excerpt: blogData.excerpt, content: blogData.content,
      category, read_time: blogData.read_time || '5 min read', is_published: true,
    }).select().single();

    if (insertError) throw new Error(`Failed to save blog post: ${insertError.message}`);
    console.log('Blog post created:', newPost.title);

    return new Response(JSON.stringify({ success: true, post: { id: newPost.id, title: newPost.title, slug: newPost.slug, category: newPost.category } }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
