"use client";

import { useState } from "react";
import BlogToolbar from "@/components/blog/BlogToolbar"; 
import { cn } from "@/lib/utils"; 
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { format, isValid } from "date-fns";
import { ArrowRight, Clock, User, Sparkles } from "lucide-react";

// --- CONFIGURATION ---
const FALLBACK_IMAGE = "/placeholder.jpg"; 
const BASE_URL = "/blog"; 

// --- TYPES ---
interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string | { url: string };
  createdAt?: string;
  readTime?: string | number;
  tags?: string[];
  category?: string;
  author?: {
    name?: string;
    image?: string;
  };
}

interface BlogWrapperProps {
  posts: BlogPost[];
}

// --- HELPERS ---
const formatDate = (dateString?: string) => {
  if (!dateString) return "Recent";
  try {
    const date = new Date(dateString);
    return isValid(date) ? format(date, "MMM d, yyyy") : "Recent";
  } catch {
    return "Recent";
  }
};

const getImageUrl = (post: BlogPost) => {
  if (!post.coverImage) return FALLBACK_IMAGE;
  if (typeof post.coverImage === "string" && post.coverImage.trim() !== "") {
    return post.coverImage;
  }
  if (typeof post.coverImage === "object" && post.coverImage.url) {
    return post.coverImage.url;
  }
  return FALLBACK_IMAGE;
};

// --- MAIN COMPONENT ---
export default function BlogWrapper({ posts }: BlogWrapperProps) {
  // State is shared with the Toolbar
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-8 md:space-y-10 pb-20">
      
      {/* 1. TOOLBAR (Search, Categories, View Toggle) */}
      <BlogToolbar view={view} setView={setView} />

      {/* 2. RESULT METADATA */}
      <div className="px-2 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
             {posts.length} {posts.length === 1 ? "Publication" : "Publications"} Found
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800" />
        </div>
      </div>

      {/* 3. POSTS GRID/LIST */}
      {posts.length > 0 ? (
        <motion.div 
          layout
          className={cn(
            "grid gap-6 md:gap-8",
            view === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1 max-w-5xl mx-auto"
          )}
        >
          <AnimatePresence mode="popLayout">
            {posts.map((post) => (
              <motion.div
                layout="position"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                key={post._id}
                className="h-full"
              >
                {view === "grid" ? <GridCard post={post} /> : <ListCard post={post} />}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

// ---------------------------------------------------------
// SUB-COMPONENT: GRID CARD
// ---------------------------------------------------------
function GridCard({ post }: { post: BlogPost }) {
  const imageSrc = getImageUrl(post);

  return (
    <Link 
      href={`${BASE_URL}/${post.slug}`}
      className="group flex flex-col h-full bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image 
          src={imageSrc} 
          alt={post.title || "Blog post"} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform" 
        />
        <div className="absolute top-4 left-4 z-10">
           <span className="px-3 py-1.5 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 rounded-full shadow-sm border border-zinc-200 dark:border-zinc-700/50">
             {post.tags?.[0] || post.category || "Article"}
           </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6 md:p-8">
        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-3">
           <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime || "5"} min</span>
           <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
           <span>{formatDate(post.createdAt)}</span>
        </div>

        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 line-clamp-2 leading-[1.2] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {post.title}
        </h3>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
          {post.excerpt || "Click to read more about this topic..."}
        </p>

        <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-sm">
           <div className="flex items-center gap-2.5 font-semibold text-zinc-700 dark:text-zinc-300">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900 dark:to-zinc-800 flex items-center justify-center text-[10px] text-indigo-600 dark:text-indigo-300 ring-2 ring-white dark:ring-zinc-900">
                <User size={14} />
              </div>
              {post.author?.name ? post.author.name.split(' ')[0] : "Editor"}
           </div>
           <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wide group-hover:translate-x-1 transition-transform">
             Read <ArrowRight size={12} />
           </span>
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------
// SUB-COMPONENT: LIST CARD
// ---------------------------------------------------------
function ListCard({ post }: { post: BlogPost }) {
  const imageSrc = getImageUrl(post);

  return (
    <Link 
      href={`${BASE_URL}/${post.slug}`}
      className="group flex flex-col md:flex-row gap-6 p-4 md:p-5 bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all hover:shadow-lg hover:shadow-indigo-500/5"
    >
      <div className="relative w-full md:w-80 lg:w-96 aspect-video md:aspect-[16/10] rounded-2xl overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800">
        <Image 
          src={imageSrc} 
          alt={post.title || "Blog post"} 
          fill 
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>

      <div className="flex flex-col justify-center py-2 flex-1 pr-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-800">
             {post.tags?.[0] || post.category || "Blog"}
          </span>
          <span className="text-xs text-zinc-400 font-medium">
             {formatDate(post.createdAt)}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
          {post.title}
        </h3>
        
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 line-clamp-2 md:line-clamp-2 text-sm md:text-base">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-6 text-sm font-semibold text-zinc-900 dark:text-white">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                <User size={12} />
             </div>
             {post.author?.name || "Admin"}
          </div>
          <div className="flex items-center gap-2 text-zinc-400 font-normal">
             <Clock size={14} /> 
             <span>{post.readTime || "5"} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------
// SUB-COMPONENT: EMPTY STATE
// ---------------------------------------------------------
function EmptyState() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[3rem] bg-zinc-50/50 dark:bg-zinc-900/50"
    >
      <div className="w-20 h-20 bg-white dark:bg-zinc-800 rounded-3xl flex items-center justify-center mb-6 shadow-sm ring-4 ring-zinc-50 dark:ring-zinc-950">
        <Sparkles className="text-indigo-400" size={32} />
      </div>
      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">No articles found</h3>
      <p className="text-zinc-500 max-w-sm mt-2 mx-auto">
        We couldn't find any posts matching your current filters. Try searching for something else.
      </p>
    </motion.div>
  );
}