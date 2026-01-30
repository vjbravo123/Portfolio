import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ArrowRight, Clock, User } from "lucide-react";
// Import the interface if it's exported, or redefine it locally
import type { BlogPost } from "@/components/blog/RecentPosts"; 

export default function BlogCard({ post }: { post: BlogPost }) {
  
  // Safe date helper
  const formatDate = (dateString: string | Date) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return "";
    }
  };

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm transition-shadow hover:shadow-md">
        
        {/* IMAGE CONTAINER */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-zinc-800">
            {/* --- FIX IS HERE: Use .url and .alt --- */}
            <Image
              src={post.coverImage?.url || "/placeholder.jpg"}
              alt={post.coverImage?.alt || post.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Tag Overlay */}
            {post.tags?.[0] && (
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide border border-white/20">
                {post.tags[0]}
              </div>
            )}
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 p-6">
          <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-zinc-500 mb-3">
            <span className="flex items-center gap-1">
               <User size={12} />
               {post.author?.name || "Admin"}
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="flex items-center gap-1">
               <Clock size={12} />
               {post.readingTime || 5} min read
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2">
            {post.title}
          </h3>

          <p className="text-sm text-slate-600 dark:text-zinc-400 line-clamp-2 mb-4 flex-1">
            {post.snippet || post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-zinc-800">
            <span className="text-xs font-semibold text-slate-400 dark:text-zinc-500">
               {formatDate(post.createdAt)}
            </span>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
               Read <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}