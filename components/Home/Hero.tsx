"use client";

import React, { useState, useEffect } from "react";
import { 
  motion, 
  useSpring, 
  useMotionValue, 
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Cpu, 
  Search, 
  Zap, 
  Activity,
  ArrowRight,
  Terminal,
  Fingerprint
} from "lucide-react";

// --- CONFIGURATION ---
const TARGET_LINK = "./bloglisting";

const FEATURED_POST = {
  category: "Architecture",
  title: "The Monolith Breaker",
  subtitle: "Deconstructing massive legacy codebases into micro-frontends without losing your sanity.",
  date: "Jan 29, 2026",
  image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop"
};

const LATEST_DROPS = [
  { id: 1, title: "React 19: The Good Parts", tag: "Frontend" },
  { id: 2, title: "Postgres vs. The World", tag: "Database" },
  { id: 3, title: "Designing for Dark Mode", tag: "UI/UX" },
];

const CODE_PARTICLES = ["const", "vivek_joshi", "=>", "{ }", "0x1", "&&"];

// --- COMPONENTS ---

// 1. CUSTOM LIQUID CURSOR
const LiquidCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999] hidden md:block"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    />
  );
};

// 2. BACKGROUND ANIMATION
const ActiveBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    {CODE_PARTICLES.map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: Math.random() * 100 }}
        animate={{ opacity: [0, 0.3, 0], y: [0, -100], x: Math.random() * 40 - 20 }}
        transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 5 }}
        className="absolute text-zinc-800 font-mono font-bold text-xl select-none"
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
      >
        {item}
      </motion.div>
    ))}
    <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-indigo-950/20 via-[#000000]/50 to-transparent" />
  </div>
);

// 3. THE BRANDING TEXT
const BrandingTitle = () => {
  return (
    <div className="relative inline-block bg-black group cursor-default">
      {/* Video Background Layer */}
      <div className="absolute inset-0 z-10 mix-blend-multiply pointer-events-none">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-196-large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Text Layer */}
      <div className="relative z-0 flex flex-col items-start select-none">
        
        {/* WORD 1: JOSHI'S */}
        <h1 className="text-[13vw] leading-[0.85] font-black tracking-tighter text-white relative z-10 transition-transform duration-500 md:group-hover:-translate-y-4">
          JOSHI'S
        </h1>

        {/* WORD 2: ARCHIVE */}
        {/* Mobile: separate. Desktop: overlapping. */}
        <h1 className="text-[13vw] leading-[0.85] font-black tracking-tighter text-white relative z-20 
                       mt-2 ml-0 
                       md:-mt-[3.5vw] md:ml-[0.5vw] 
                       transition-transform duration-500 
                       md:group-hover:translate-y-4 
                       group-hover:text-indigo-100">
          ARCHIVE
        </h1>

      </div>
      
      {/* Decorative Label */}
      <div className="absolute top-[40%] -right-12 rotate-90 hidden md:block z-30">
        <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
          EST. 2026 // V.J.
        </span>
      </div>
    </div>
  );
};

// 4. SCANNER CARD
const ScannerCard = () => {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="relative group w-full aspect-[16/9] md:aspect-[21/9] rounded-none md:rounded-2xl overflow-hidden border border-white/10 bg-zinc-900"
    >
      <Image 
        src={FEATURED_POST.image} 
        alt="Featured" 
        fill 
        className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-in-out" 
      />
      {/* Laser Beam */}
      <div className="absolute inset-0 w-full h-[2px] bg-indigo-500 shadow-[0_0_30px_rgba(99,102,241,1)] animate-scan opacity-80 pointer-events-none z-20" />
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-30 bg-gradient-to-t from-black via-black/40 to-transparent">
        <div className="flex justify-between items-end">
          <div className="max-w-2xl transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white text-black text-[10px] uppercase font-bold tracking-widest rounded-full">
                Latest Log
              </span>
              <span className="text-xs font-mono text-indigo-400 animate-pulse flex items-center gap-1">
                <Activity size={12} /> LIVE SIGNAL
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-indigo-200 transition-colors">
              {FEATURED_POST.title}
            </h2>
            <p className="text-zinc-300 text-sm md:text-lg hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {FEATURED_POST.subtitle}
            </p>
          </div>
          
          {/* LINK: Featured Post Button */}
          <Link href={TARGET_LINK} className="hidden md:flex h-16 w-16 rounded-full bg-indigo-600 text-white items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group-hover:scale-110 shadow-lg shadow-indigo-900/50">
            <ArrowUpRight size={28} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN PAGE ---

export default function JoshiArchiveHero() {
  const [hoveredLog, setHoveredLog] = useState<number | null>(null);

  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-x-hidden font-sans selection:bg-indigo-500/90 selection:text-white">
      <LiquidCursor />
      <ActiveBackground />

      {/* HEADER NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 md:px-12 pointer-events-none">
         {/* LINK: Name / Logo */}
         <Link href={TARGET_LINK} className="pointer-events-auto flex items-center gap-3 group">
           <div className="w-10 h-10 bg-zinc-900 border border-white/10 text-white flex items-center justify-center font-bold text-xs rounded-xl group-hover:bg-white group-hover:text-black transition-colors">
             VJ
           </div>
           <div className="flex flex-col">
             <span className="hidden md:block font-bold text-sm tracking-widest group-hover:text-indigo-400 transition-colors">
               VIVEK JOSHI
             </span>
             <span className="text-[10px] text-zinc-500 font-mono">FULL STACK ENG.</span>
           </div>
         </Link>
         
         <div className="pointer-events-auto flex gap-4">
            {/* LINK: Search Button */}
            <Link href={TARGET_LINK} className="p-3 rounded-full bg-zinc-900 border border-white/10 hover:bg-white hover:text-black transition-colors">
               <Search size={18} />
            </Link>
         </div>
      </nav>

      <div className="relative pt-32 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto">
        
        {/* HERO TITLE SECTION */}
        <div className="relative mb-16 pb-8">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }} 
             animate={{ opacity: 1, scale: 1 }} 
             transition={{ duration: 0.8 }}
             className="relative z-10"
          >
             <div className="mb-4 flex items-center gap-2 text-xs font-mono text-zinc-500">
                <Terminal size={12} />
                <span>ROOT/USERS/JOSHI/PUBLIC_LOGS</span>
             </div>
             
             {/* THE BRANDING COMPONENT */}
             <BrandingTitle />

          </motion.div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 max-w-xs hidden lg:block text-right z-0">
             <p className="text-xs font-mono text-zinc-500 leading-relaxed uppercase tracking-widest border-r-2 border-zinc-800 pr-4">
               Engineering reality <br/>
               from abstract logic. <br/><br/>
               <span className="text-white">System Status: Online</span>
             </p>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           
           {/* LEFT: Stats */}
           <div className="hidden lg:flex lg:col-span-2 flex-col justify-between h-full py-2">
              <div className="space-y-8">
                 <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase text-zinc-600 font-bold">Tech Stack</span>
                    <span className="flex items-center gap-2 text-sm font-bold"><Cpu size={14} className="text-indigo-500"/> Next.js 15</span>
                    <span className="flex items-center gap-2 text-sm font-bold"><Zap size={14} className="text-yellow-500"/> React 19</span>
                 </div>
                 <div className="flex flex-col gap-2">
                     <span className="text-[10px] uppercase text-zinc-600 font-bold">ID</span>
                     <span className="flex items-center gap-2 text-sm font-bold"><Fingerprint size={14} className="text-zinc-500"/> 0xJOSHI</span>
                 </div>
              </div>
              <div className="rotate-180 text-[10px] uppercase tracking-widest text-zinc-600" style={{ writingMode: 'vertical-rl' }}>
                 SCROLL_DOWN_
              </div>
           </div>

           {/* CENTER: Hero Card */}
           <div className="lg:col-span-7">
              <ScannerCard />
           </div>

           {/* RIGHT: List */}
           <div className="lg:col-span-3 flex flex-col justify-end">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Activity size={14} /> Incoming Logs
              </h3>
              
              <div className="flex flex-col">
                 {LATEST_DROPS.map((drop) => (
                    // LINK: List Items
                    <Link
                      key={drop.id}
                      href={TARGET_LINK}
                      onMouseEnter={() => setHoveredLog(drop.id)}
                      onMouseLeave={() => setHoveredLog(null)}
                      className="group relative py-5 border-b border-white/10 block"
                    >
                       <div className="flex items-center justify-between relative z-10">
                          <div className="flex flex-col">
                             <span className="text-[10px] font-mono text-indigo-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                               {drop.tag}
                             </span>
                             <span className="text-base font-bold text-zinc-300 group-hover:text-white transition-colors">
                               {drop.title}
                             </span>
                          </div>
                          <ArrowRight className="text-indigo-500 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                       </div>
                       
                       <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-4 px-4 rounded-lg z-0" />
                    </Link>
                 ))}
              </div>
              
              {/* LINK: View All Archives */}
              <Link href={TARGET_LINK} className="mt-8 block w-full">
                <button className="w-full py-4 border border-dashed border-zinc-800 hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-400 text-zinc-500 text-xs font-bold uppercase tracking-widest transition-all rounded-lg">
                    View All Archives
                </button>
              </Link>
           </div>
        </div>
      </div>

      {/* FOOTER TICKER */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 py-2 overflow-hidden pointer-events-none z-40 hidden md:block">
        <div className="flex gap-12 animate-ticker text-zinc-700">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="flex items-center gap-4 text-[10px] font-mono">
               <span className="text-indigo-900 font-bold">VIVEK JOSHI</span>
               <span className="w-1 h-1 bg-zinc-800 rounded-full"/>
               <span>ENGINEERING</span>
               <span className="w-1 h-1 bg-zinc-800 rounded-full"/>
               <span>DESIGN</span>
             </div>
           ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
      `}</style>
    </section>
  );
}