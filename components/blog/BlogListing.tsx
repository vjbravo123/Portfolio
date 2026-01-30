// components/blog/BlogListing.tsx
import { BlogService } from "@/services/blog.services";
import BlogWrapper from "./BlogWrapper"; // Adjust path based on your folder structure
import { Sparkles } from "lucide-react";

// Define a fallback for when no image exists
const FALLBACK_IMAGE = "/placeholder.jpg";

interface BlogListingProps {
  category?: string;
  search?: string;
}

export default async function BlogListing({ category = "All", search = "" }: BlogListingProps) {
  // 1. Fetch Data
  // Note: Since this is a Server Component, we can fetch directly here
  const allPosts = await BlogService.getRecentPosts(); 
  
  // 2. FILTER LOGIC
  let filteredPosts = allPosts;

  if (category && category !== "All") {
    filteredPosts = filteredPosts.filter((p: any) => 
      p.tags?.some((t: string) => t.toLowerCase() === category.toLowerCase()) || 
      p.category === category
    );
  }

  if (search) {
    const lowerSearch = search.toLowerCase();
    filteredPosts = filteredPosts.filter((p: any) => 
      p.title.toLowerCase().includes(lowerSearch) || 
      p.excerpt?.toLowerCase().includes(lowerSearch)
    );
  }

  // 3. SERIALIZATION & IMAGE NORMALIZATION
  const cleanPosts = JSON.parse(JSON.stringify(filteredPosts)).map((post: any) => {
    
    // --- IMAGE NORMALIZATION LOGIC ---
    let imageUrl = FALLBACK_IMAGE;

    if (post.coverImage) {
      if (typeof post.coverImage === "string" && post.coverImage.trim() !== "") {
        // CASE A: Old format (String)
        imageUrl = post.coverImage;
      } else if (typeof post.coverImage === "object" && post.coverImage.url) {
        // CASE B: New format (Object with .url)
        imageUrl = post.coverImage.url;
      }
    }

    return {
      ...post,
      coverImage: imageUrl 
    };
  });

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-zinc-950 pb-20">
      
      {/* --- HEADER --- */}
      <div className="relative w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-[10px] font-bold uppercase tracking-widest border border-indigo-100 dark:border-indigo-800">
            <Sparkles size={12} /> The Blog
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
            Writings for <span className="text-indigo-600">Builders</span> & Designers
          </h1>
          
          {/* Subtitle */}
          <p className="max-w-xl mx-auto text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            Latest insights on engineering, design patterns, and career growth.
          </p>

        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="container mx-auto px-4 md:px-6 relative z-20 -mt-10">
        <div className="bg-slate-50 dark:bg-zinc-950 rounded-t-[2.5rem] pt-10">
           {/* PASS THE NORMALIZED POSTS HERE */}
           <BlogWrapper posts={cleanPosts} />
        </div>
      </div>
    </section>
  );
}