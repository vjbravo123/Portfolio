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
  Loader2 // Imported Loader icon
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function DockIcon({ mouseX, icon, label, href, external, isActive }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Track if this specific icon is loading
  const [isLoading, setIsLoading] = useState(false);

  // Reset loading state when the route actually changes or if we click a different tab
  useEffect(() => {
    if (isActive) {
      setIsLoading(false);
    }
  }, [isActive]);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-100, 0, 100], [40, 60, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const handleClick = () => {
    // Only set loading if it's an internal link and we aren't already there
    if (!external && !isActive) {
      setIsLoading(true);
    }
  };

  return (
    <Link 
      href={href} 
      target={external ? "_blank" : "_self"}
      onClick={handleClick}
      // Ensure Next.js tries to preload the data
      prefetch={true} 
    >
      <motion.div
        ref={ref}
        style={{ width, height: width }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileTap={{ scale: 0.9 }}
        className={`relative flex items-center justify-center rounded-full border transition-all duration-300 ${
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
            // The Spinner State
            <Loader2 className="animate-spin" size={20} />
          ) : (
            // The Normal Icon
            React.cloneElement(icon, { size: 20 })
          )}
        </motion.div>

        {/* Active Indicator Pulse */}
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

  const items = [
    { icon: <Home />, label: "Home", href: "/" },
    { icon: <Rocket />, label: "Projects", href: "/#projects" }, // Ensure path is absolute for hash links
    { icon: <FileText />, label: "Blogs", href: "/blog" },
    { icon: <Github />, label: "GitHub", href: "https://github.com/vjbravo123", external: true },
    { icon: <Linkedin />, label: "LinkedIn", href: "https://linkedin.com/in/vivek-joshi0101", external: true },
  ];

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-[100] pointer-events-none px-4">
      <motion.nav
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto flex items-end gap-3 px-4 py-3 rounded-full bg-[#020617]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] ring-1 ring-blue-500/20"
      >
        {items.map((item, idx) => (
          <DockIcon 
            key={idx} 
            mouseX={mouseX} 
            isActive={pathname === item.href} 
            {...item} 
          />
        ))}
      </motion.nav>
    </div>
  );
}