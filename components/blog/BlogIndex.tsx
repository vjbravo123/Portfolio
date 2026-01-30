"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { format, parseISO } from "date-fns";
import {
  Search,
  LayoutGrid,
  List as ListIcon,
  X,
  Clock,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils"; // Ensure you have a cn utility or use clsx/tailwind-merge

// --- CONFIGURATION ---
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1499750310159-5b5f22693851?q=80&w=2500&auto=format&fit=crop"; 
const CATEGORIES = ["All", "Tech", "Design", "Product", "Engineering", "Tutorials", "Career"];

// --- TYPES ---
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  createdAt: string;
  readTime: number | string;
  tags: string[];
  category: string;
  author: { name: string; image?: string | null };
}

// --- MAIN COMPONENT ---
export default function BlogIndex({ initialPosts }: { initialPosts: BlogPost[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [inputValue, setInputValue] = useState(searchParams.get("search") || "");
  
  // URL State Sync
  const activeCategory = searchParams.get("category") || "All";
  const activeSearch = searchParams.get("search") || "";

  // Update URL helper
  const updateParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (!value || value === "All") params.delete(key);
      else params.set(key, value);
    });
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== activeSearch) {
        updateParams({ search: inputValue });
      }
    }, 400); // 400ms debounce
    return () => clearTimeout(timer);
  }, [inputValue]);

  // Filter Logic (Memoized for speed)
  const filteredPosts = useMemo(() => {
    let result = initialPosts;

    if (activeCategory !== "All") {
      result = result.filter(
        (p) =>
          p.category.toLowerCase() === activeCategory.toLowerCase() ||
          p.tags.some((t) => t.toLowerCase() === activeCategory.toLowerCase())
      );
    }

    if (activeSearch) {
      const q = activeSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      );
    }

    return result;
  }, [initialPosts, activeCategory, activeSearch]);

  return (
    <section className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans selection:bg-indigo-500/30">
      
      {/* Background Noise Texture for Premium Feel */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-0"></div>

      {/* --- HERO SECTION --- */}
      <div className="relative pt-32 pb-16 md:pt-48 md:pb-24 px-6 container mx-auto z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 dark:bg-indigo-500/10 rounded-full border border-indigo-100 dark:border-indigo-500/20">
            The Blog
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
            Insights on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
              Design & Code.
            </span>
          </h1>
          <p className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
            Explorations in software engineering, interface design, and the creative process behind building digital products.
          </p>
        </motion.div>
      </div>

      {/* --- TOOLBAR --- */}
      <div className="sticky top-4 z-40 px-4 container mx-auto mb-10">
        <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 p-2 rounded-2xl shadow-lg shadow-neutral-200/20 dark:shadow-black/20 flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Categories */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full md:w-auto mask-fade-sides py-1 px-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => updateParams({ category: cat })}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                  activeCategory === cat
                    ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-md"
                    : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Toggle */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative group w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search articles..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-neutral-100 dark:bg-neutral-800 border-none rounded-xl py-2.5 pl-10 pr-8 text-sm focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-neutral-500"
              />
              {inputValue && (
                <button 
                  onClick={() => setInputValue("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-red-500"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="h-8 w-[1px] bg-neutral-200 dark:bg-neutral-800 mx-1 hidden md:block" />

            <div className="flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl shrink-0">
              <button
                onClick={() => setView("grid")}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  view === "grid" ? "bg-white dark:bg-neutral-700 shadow-sm text-indigo-600" : "text-neutral-400"
                )}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setView("list")}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  view === "list" ? "bg-white dark:bg-neutral-700 shadow-sm text-indigo-600" : "text-neutral-400"
                )}
              >
                <ListIcon size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT --- */}
      <div className="container mx-auto px-6 pb-32 z-10 relative">
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            <motion.div
              layout
              className={cn(
                "grid gap-6",
                view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto"
              )}
            >
              {filteredPosts.map((post) => (
                <BlogCard key={post._id} post={post} view={view} />
              ))}
            </motion.div>
          ) : (
            <EmptyState />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// --- SUB-COMPONENTS ---

function BlogCard({ post, view }: { post: BlogPost; view: "grid" | "list" }) {
  const dateStr = post.createdAt ? format(parseISO(post.createdAt), "MMM d, yyyy") : "";

  // Grid View
  if (view === "grid") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <Link href={`/bloglisting/${post.slug}`} className="group block h-full">
          <article className="h-full flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300">
            {/* Image */}
            <div className="relative aspect-[1.4] overflow-hidden">
              <Image
                src={post.coverImage || FALLBACK_IMAGE}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md text-xs font-bold uppercase tracking-wider rounded-lg border border-white/20">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                <time>{dateStr}</time>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={12}/> {post.readTime}m read</span>
              </div>
              
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-600 dark:text-neutral-300 overflow-hidden relative">
                    {post.author.image ? (
                        <Image src={post.author.image} alt={post.author.name} fill className="object-cover" />
                    ) : (
                        post.author.name.charAt(0)
                    )}
                  </div>
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{post.author.name}</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-all">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          </article>
        </Link>
      </motion.div>
    );
  }

  // List View
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/bloglisting/${post.slug}`} className="group block">
        <article className="flex flex-col md:flex-row gap-6 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 items-center">
          <div className="relative w-full md:w-64 aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden shrink-0">
            <Image
              src={post.coverImage || FALLBACK_IMAGE}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                {post.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="text-xs text-neutral-500">{dateStr}</span>
            </div>

            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-3 group-hover:text-indigo-600 transition-colors truncate">
              {post.title}
            </h3>
            
            <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2 mb-4">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-md">
                {post.readTime} min read
              </span>
            </div>
          </div>

          <div className="hidden md:flex px-4 text-neutral-300 group-hover:text-indigo-600 transition-colors">
            <ArrowUpRight size={24} />
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-full mb-6">
        <Filter className="w-8 h-8 text-neutral-400" />
      </div>
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">No articles found</h3>
      <p className="text-neutral-500 max-w-md">
        We couldn't find any articles matching your search. Try adjusting your filters or search terms.
      </p>
    </motion.div>
  );
}