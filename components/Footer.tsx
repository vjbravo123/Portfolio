"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  ArrowUpRight, 
  MapPin, 
  Heart, 
  ChevronUp 
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#020617] pt-24 pb-12 px-6 overflow-hidden border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* TOP SECTION: CALL TO ACTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none mb-6">
              LET'S BUILD <br />
              <span className="relative inline-block pr-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 italic">
                SOMETHING GREAT
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md italic">
              Currently available for freelance opportunities and full-time roles in <span className="text-white font-medium">Noida, Ghaziabad, and Remote.</span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 lg:justify-end"
          >
            <a 
              href="mailto:vjoshii822@gmail.com"
              className="px-8 py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-xl shadow-blue-500/10"
            >
              Start a Conversation <Mail size={18} />
            </a>
            <button 
              onClick={scrollToTop}
              className="p-4 bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center group"
            >
              <ChevronUp className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* MIDDLE SECTION: LINKS & SEO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/5">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-white tracking-tighter">
              VIVEK<span className="text-blue-500">.</span>JOSHI
            </h3>
            <div className="flex gap-4">
              {[
                { icon: <Github size={20} />, href: "https://github.com/vjbravo123" },
                { icon: <Linkedin size={20} />, href: "#" },
                { icon: <Twitter size={20} />, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-400/5 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">Navigation</h4>
            <ul className="space-y-4">
              {["Home", "Projects", "Experience", "Education"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-white flex items-center gap-1 group transition-colors">
                    {link} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services / Keywords (SEO) */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">Expertise</h4>
            <ul className="space-y-2 text-sm text-gray-500 font-medium">
              <li className="hover:text-blue-400 transition-colors cursor-default">Full Stack MERN Dev</li>
              <li className="hover:text-blue-400 transition-colors cursor-default">React.js Specialist</li>
              <li className="hover:text-blue-400 transition-colors cursor-default">Next.js Architecture</li>
              <li className="hover:text-blue-400 transition-colors cursor-default">REST API Design</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">Connect</h4>
            <div className="space-y-4">
              <a href="mailto:vjoshii822@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail size={18} className="text-blue-500" /> vjoshii822@gmail.com
              </a>
              <a href="tel:+918588947924" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Phone size={18} className="text-purple-500" /> +91 8588947924
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} className="text-red-500" /> Ghaziabad / Noida, IN
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: COPYRIGHT & LOCAL SEO */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm flex items-center gap-2">
            © 2025 Vivek Joshi. Made with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> in India.
          </p>
          
          {/* Subtle Local SEO Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-widest font-bold text-gray-600">
            <span>React Developer Noida</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full my-auto" />
            <span>Full Stack Developer Ghaziabad</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full my-auto" />
            <span>MERN Expert India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}