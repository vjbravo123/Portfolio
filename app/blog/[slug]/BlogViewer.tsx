// app/blog/[slug]/BlogViewer.tsx
"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";

export default function BlogViewer({ post }: { post: any }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      {/* READING PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        {/* BACK BUTTON */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors mb-12 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to all articles
        </Link>

        {/* HEADER */}
        <header className="mb-12">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-blue-400 mb-6">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              {post.category}
            </span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-8">
            {post.title}
          </h1>

          <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              className="object-cover"
              priority 
            />
          </div>
        </header>

        {/* CONTENT AREA */}
        <article className="prose prose-invert prose-blue max-w-none">
          <div 
            className="text-gray-300 leading-relaxed text-lg 
            [&>h2]:text-white [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6
            [&>h3]:text-white [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-4
            [&>p]:mb-6
            [&>pre]:bg-black/50 [&>pre]:p-6 [&>pre]:rounded-2xl [&>pre]:border [&>pre]:border-white/10 [&>pre]:overflow-x-auto
            [&>code]:text-cyan-400 [&>code]:font-mono [&>code]:text-sm"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>

        {/* FOOTER / AUTHOR INFO */}
        <footer className="mt-20 pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/50">
                <Image src="/dp.webp" alt="Vivek Joshi" width={64} height={64} className="object-cover" />
              </div>
              <div>
                <p className="text-white font-bold">Written by Vivek Joshi</p>
                <p className="text-gray-500 text-sm">Full Stack Developer & Technical Writer</p>
              </div>
            </div>
            
            <button 
              onClick={() => {
                navigator.share({ title: post.title, url: window.location.href });
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <Share2 size={18} /> Share Article
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}