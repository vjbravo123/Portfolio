"use client";
import React from "react";
import { motion } from "framer-motion";
import { Code, Trophy, Users, Star, Target, MapPin, Calendar } from "lucide-react";

const hackathons = [
  {
    title: "Smart India Hackathon 2023",
    date: "Sept 2023",
    location: "National Level, India",
    description:
      "Selected for India's biggest hackathon. Engineered a data analytics solution for government public service delivery using the MERN stack.",
    icon: <Code className="w-6 h-6" />,
    color: "from-blue-600 to-cyan-400",
    badge: "Finalist",
    tags: ["Data Analytics", "Public Service", "MERN"]
  },
  {
    title: "College Tech Fest 2024",
    date: "March 2024",
    location: "Delhi University",
    description:
      "Won 1st Place in the Python coding competition. Developed optimized algorithms for advanced data processing and built a high-performance UI.",
    icon: <Trophy className="w-6 h-6" />,
    color: "from-yellow-500 to-orange-500",
    badge: "1st Place Winner",
    tags: ["Python", "Algorithms", "Optimization"]
  },
  {
    title: "University Hackathon 2024",
    date: "Nov 2024",
    location: "Delhi University",
    description:
      "Led a cross-functional team to win the Best Innovation Award. Orchestrated rapid prototyping and focused on intuitive UX architecture.",
    icon: <Users className="w-6 h-6" />,
    color: "from-purple-600 to-pink-500",
    badge: "Best Innovation",
    tags: ["Team Leadership", "Prototyping", "UX"]
  },
];

export default function Hackathons() {
  return (
    <section className="relative py-28 px-6 bg-[#020617] overflow-hidden">
      {/* Background Pulse Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4"
          >
            <Star size={12} fill="currentColor" /> Milestones
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight">
            Hackathons & <br />
            {/* Added pr-8 to fix clipping of 's' */}
            <span className="relative inline-block pr-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 italic leading-tight">
              Achievements
            </span>
          </h2>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative">
          {/* Animated Vertical Line */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-transparent hidden md:block" />

          <div className="space-y-16">
            {hackathons.map((hack, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center justify-between w-full ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* 1. THE ACHIEVEMENT CARD */}
                <div className="w-full md:w-[45%] group">
                  <div className="relative p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-500 overflow-hidden">
                    {/* Hover Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${hack.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    {/* Badge */}
                    <div className={`absolute top-6 right-6 px-3 py-1 rounded-full bg-gradient-to-r ${hack.color} text-[10px] font-black text-white uppercase tracking-tighter shadow-lg shadow-blue-500/20`}>
                      {hack.badge}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${hack.color} flex items-center justify-center text-white mb-6 shadow-xl`}>
                        {hack.icon}
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {hack.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-4 mb-4 text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {hack.date}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> {hack.location}</span>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">
                        "{hack.description}"
                      </p>

                      {/* Tech/Tags */}
                      <div className="flex flex-wrap gap-2">
                        {hack.tags.map((tag, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/5 text-gray-400 uppercase tracking-widest font-bold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. THE CENTER PULSE NODE (Desktop Only) */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center">
                  <div className="relative">
                     <div className={`absolute inset-0 bg-gradient-to-r ${hack.color} blur-md rounded-full opacity-50 group-hover:opacity-100 animate-pulse`} />
                     <div className="relative w-6 h-6 rounded-full bg-[#020617] border-2 border-white z-10 flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${hack.color}`} />
                     </div>
                  </div>
                </div>

                {/* 3. SPACER FOR LAYOUT BALANCE */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM MOTIVATIONAL QUOTE */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 text-center"
        >
          <p className="text-gray-500 italic text-sm max-w-lg mx-auto">
            "I love building things! From university days to professional development, I thrive in fast-paced collaborative environments."
          </p>
        </motion.div>
      </div>
    </section>
  );
}