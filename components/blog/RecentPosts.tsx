import { BlogService } from "@/services/blog.services";
import BlogCard from "@/components/Home/BlogCard";
import { Newspaper, ArrowRight, Zap, Layers } from "lucide-react";
import Link from "next/link";

// --- Types (Matched to Mongoose Model) ---
export interface BlogPost {
  _id: string | number;
  title: string;
  slug: string;
  snippet?: string;
  excerpt?: string;
  // Nested Image Object from Model
  coverImage?: {
    url: string;
    alt: string;
    credit?: string;
  };
  createdAt: string | Date;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  readingTime?: number;
  stats?: {
    views: number;
    likes: number;
  };
}

interface RecentPostsProps {
  category?: string;
  className?: string;
}

export default async function RecentPosts({ category, className = "" }: RecentPostsProps) {
  // 1. Fetch Data
  // Passing the category (e.g., "tech") to the service
  const posts: BlogPost[] = await BlogService.getRecentPosts(category);
  
  const hasPosts = posts && posts.length > 0;

  // --- EMPTY STATE ---
  if (!hasPosts) {
    return (
      <div className={`w-full py-12 px-4 ${className}`}>
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[300px] rounded-3xl border border-dashed border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 text-center p-8">
          <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm flex items-center justify-center mb-4">
            <Newspaper className="text-slate-400" size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            No articles found
          </h3>
          <p className="text-slate-500 mt-2">
            We couldn't find any posts for <span className="font-semibold text-indigo-600">"{category}"</span>.
          </p>
          <div className="mt-6">
             <Link href="/" className="text-sm font-bold text-slate-600 underline underline-offset-4 hover:text-indigo-600">
                Clear Filters
             </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`relative w-full py-16 md:py-24 overflow-hidden ${className}`}>
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none -z-10">
        <div className="absolute top-0 left-[10%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-100 dark:border-indigo-900/50">
              <Zap size={12} className="fill-current" />
              <span>Latest Updates</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              {category ? (
                <span className="capitalize">{category} Articles</span>
              ) : (
                <span>Recent <span className="text-slate-400 dark:text-zinc-600">Insights</span></span>
              )}
            </h2>
          </div>

          <div className="flex items-center gap-4">
             <Link 
               href="/blog"
               className="hidden sm:flex group items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-sm font-bold text-slate-700 dark:text-zinc-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-500/10 transition-all"
             >
               View All
               <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-12">
          {posts.map((post, index) => (
            <div 
              key={post._id.toString()} 
              className="flex flex-col h-full opacity-0 animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BlogCard post={post} /> 
            </div>
          ))}
        </div>

        {/* --- MOBILE FOOTER --- */}
        <div className="mt-12 sm:hidden flex justify-center">
          <Link 
            href="/blog"
            className="flex w-full justify-center items-center gap-2 px-6 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm"
          >
            Explore All
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}