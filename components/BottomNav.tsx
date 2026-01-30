"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Home, 
  FileText, 
  Rocket, 
  Loader2 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function DockIcon({ mouseX, icon, label, href, external, isActive, resetMouse }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsLoading(false);
    }
  }, [isActive]);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Made the spring faster (higher stiffness, higher damping) so it snaps back instantly
  const widthSync = useTransform(distance, [-100, 0, 100], [40, 60, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });

  const handleClick = () => {
    // 1. Reset the magnification immediately on click
    resetMouse();
    
    if (!external && !isActive && !href.includes('#')) {
      setIsLoading(true);
    }
  };

  return (
    <Link 
      href={href} 
      target={external ? "_blank" : "_self"}
      onClick={handleClick}
      prefetch={true} 
    >
      <motion.div
        ref={ref}
        style={{ width, height: width }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileTap={{ scale: 0.9 }}
        className={`relative flex items-center justify-center rounded-full border transition-all duration-200 ${
          isActive 
          ? "bg-blue-500/20 border-blue-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]" 
          : "bg-white/5 border-white/10 hover:border-white/30"
        } backdrop-blur-md group`}
      >
        <AnimatePresence>
          {isHovered && !isLoading && (
            <motion.span
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: -45, x: "-50%" }}
              exit={{ opacity: 0, y: 10, x: "-50%" }}
              className="absolute left-1/2 px-2 py-1 rounded bg-[#020617] border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest pointer-events-none shadow-xl"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>

        <motion.div 
          className={`${isActive ? "text-blue-400" : "text-gray-400 group-hover:text-white"} transition-colors`}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            React.cloneElement(icon, { size: 20 })
          )}
        </motion.div>

        {isActive && !isLoading && (
          <div className="absolute -bottom-1 w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
        )}
      </motion.div>
    </Link>
  );
}

export default function BottomNav() {
  const mouseX = useMotionValue(Infinity);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const resetMouse = () => mouseX.set(Infinity);

  const items = [
    { icon: <Home />, label: "Home", href: "/" },
    { icon: <Rocket />, label: "Projects", href: "/#projects" }, 
    { icon: <FileText />, label: "Blogs", href: "/blog" },
    { icon: <Github />, label: "GitHub", href: "https://github.com/vjbravo123", external: true },
    { icon: <Linkedin />, label: "LinkedIn", href: "https://linkedin.com/in/vivek-joshi0101", external: true },
  ];

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-[100] pointer-events-none px-4">
      <motion.nav
        // Mouse handlers for PC
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={resetMouse}
        
        // Touch handlers for Mobile (This fixes the "stuck" issue)
        onTouchMove={(e) => mouseX.set(e.touches[0].clientX)}
        onTouchStart={(e) => mouseX.set(e.touches[0].clientX)}
        onTouchEnd={resetMouse}   // Reset immediately when finger lifts
        onTouchCancel={resetMouse} // Reset if scroll cancels touch
        
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto flex items-end gap-3 px-4 py-3 rounded-full bg-[#020617]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] ring-1 ring-blue-500/20"
      >
        {items.map((item, idx) => (
          <DockIcon 
            key={idx} 
            mouseX={mouseX} 
            resetMouse={resetMouse}
            isActive={pathname === item.href} 
            {...item} 
          />
        ))}
      </motion.nav>
    </div>
  );
}