// app/blog/BlogContent.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { blogs } from "@/data/blogs";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function BlogContent() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(blogs.map((b) => b.category))];

  const filteredBlogs = filter === "All" 
    ? blogs 
    : blogs.filter((b) => b.category === filter);

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-6"
          >
            Insights & Tutorials
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6">
            TECHNICAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 italic">
              WRITINGS
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
            Sharing my journey through full-stack development, architectural patterns, and lessons learned while building 15+ production-grade web apps.
          </p>
        </header>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all border ${
                filter === cat 
                ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
                : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* BLOG GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex flex-col bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-blue-400 uppercase">
                  {post.category}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 italic">
                  "{post.excerpt}"
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex gap-2">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">#{tag}</span>
                    ))}
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-blue-600 transition-all"
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}