"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Download, Code2, Rocket, Globe, Database, Cpu } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // 1. Optimization: Detect screen size for responsiveness
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollY } = useScroll();

    // 2. Fix TypeScript Error: Handle the 'isMobile' logic inside useTransform
    // This ensures we always pass a MotionValue to useSpring
    const y1Raw = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : 200]);
    const y2Raw = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : -150]);

    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
    const y1 = useSpring(y1Raw, springConfig);
    const y2 = useSpring(y2Raw, springConfig);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen lg:min-h-[110vh] w-full flex items-center justify-center overflow-hidden bg-[#020617] pt-28 pb-12 lg:pt-0 lg:pb-0"
        >
            {/* BACKGROUND (Optimized CSS-only pattern) */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">

                {/* LEFT CONTENT: THE ARCHITECT (Text & Skills) */}
                {/* order-2 on mobile ensures text comes AFTER the image */}
                <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Available for Hire • Noida & Ghaziabad
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black leading-[1.1] text-white tracking-tighter">
                            VIVEK <br />
                            <span className="relative inline-block pr-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 italic leading-none">
                                JOSHI
                            </span>
                        </h1>

                        <h2 className="mt-6 text-2xl md:text-3xl font-light text-gray-400 flex items-center gap-3">
                            <Code2 className="text-blue-500" />
                            Full Stack MERN Developer
                        </h2>

                        <p className="mt-6 max-w-xl text-lg text-gray-400 leading-relaxed italic border-l-2 border-blue-500/50 pl-6">
                            "Crafting high-performance digital experiences with React.js, Next.js, and Node.js. Specializing in turning complex business logic into seamless, scalable web applications."
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://drive.google.com/file/d/1QUAxrJ8HF7YPoqtm50V6TCvIo7-BUA_x/view"
                                className="group relative px-8 py-4 bg-blue-600 text-white font-bold rounded-full overflow-hidden flex items-center gap-3"
                            >
                                <Download size={20} className="relative z-10" />
                                <span className="relative z-10">Download CV</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </motion.a>

                            <motion.button
                                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                                className="px-8 py-4 border border-white/10 text-white font-medium rounded-full backdrop-blur-sm flex items-center gap-2"
                            >
                                Explore Projects <Rocket size={18} />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* TECH STACK STICKERS - Perfectly visible and colorful */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap gap-4 md:gap-6 pt-10 opacity-70 grayscale-0 hover:grayscale-0 transition-all duration-700 relative z-30"
                    >
                        <div className="flex items-center gap-2 text-white font-bold text-sm md:text-base"><Database size={20} className="text-blue-400" /> MongoDB</div>
                        <div className="flex items-center gap-2 text-white font-bold text-sm md:text-base"><Cpu size={20} className="text-purple-400" /> Express</div>
                        <div className="flex items-center gap-2 text-white font-bold text-sm md:text-base"><Globe size={20} className="text-cyan-400" /> React.js</div>
                        <div className="flex items-center gap-2 text-white font-bold text-sm md:text-base"><Rocket size={20} className="text-green-400" /> Node.js</div>
                    </motion.div>
                </div>

                {/* 3. RIGHT CONTENT: THE VISUAL (Portrait Image) */}
                {/* order-1 on mobile ensures the image stays at the top */}
                <div className="lg:col-span-5 relative order-1 lg:order-2">
                    <motion.div style={{ y: y2 }} className="relative z-20">
                        {/* Morphing Shape Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-[30% 70% 70% 30% / 30% 30% 70% 70%] animate-[morph_10s_ease-in-out_infinite] blur-2xl"></div>

                        {/* The Portrait Container */}
                        <div className="relative w-full max-w-[320px] md:max-w-none mx-auto aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                            <Image
                                src="/dp.webp"
                                alt="Portrait of Vivek Joshi — Full Stack MERN Developer"
                                title="Portrait of Vivek Joshi — Full Stack MERN Developer"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                                priority
                            />



                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>

                            {/* Floating ID Card */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
                            >
                                <p className="text-[10px] text-blue-400 font-mono tracking-tighter uppercase">Based in</p>
                                <p className="text-white font-bold">Ghaziabad, India 🇮🇳</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Decorative Parallax Circles (Hidden on mobile to prevent clutter) */}
                    <motion.div
                        style={{ y: y1 }}
                        className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl border border-blue-500/20 z-0 hidden lg:block"
                    ></motion.div>
                </div>
            </div>

            {/* 4. MOUSE SCROLL INDICATOR (Hidden on mobile) */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
                <span className="text-[10px] text-gray-500 uppercase tracking-[0.5em]">Scroll</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-blue-500 to-transparent"></div>
            </div>
        </section>
    );
}