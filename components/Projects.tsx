"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Server, Monitor, Globe } from "lucide-react";
import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      title: "Attendance Manager",
      img: "/CAM.webp",
      desc: "A production-grade MERN solution with role-based dashboards, automated PDF reports, and real-time class tracking.",
      live: "https://college-attendance-manager-fe.vercel.app/",
      fe: "https://github.com/vjbravo123/College_attendance_manager_fe.git",
      be: "https://github.com/vjbravo123/College_attendance_manager_be.git",
      tech: ["MongoDB", "Express", "React", "Node.js"],
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: "YouTube Studio Clone",
      img: "/YT.webp",
      desc: "Advanced video streaming platform with search algorithms, real-time recommendations, and a high-performance UI.",
      live: "https://creative-semolina-33808f.netlify.app/",
      fe: "https://github.com/vjbravo123/Youtube-clone-FE.git",
      be: "https://github.com/vjbravo123/Youtube-clone-BE.git",
      tech: ["React", "RapidAPI", "Tailwind", "Axios"],
      color: "from-red-600 to-pink-500"
    },
    {
      title: "V-Chat Messenger",
      img: "/V.webp",
      desc: "Real-time communication app using Socket.io, featuring instant messaging, group channels, and online status.",
      live: "https://v-chat-fe.vercel.app/",
      fe: "https://github.com/vjbravo123/VChat-FE.git",
      be: "https://github.com/vjbravo123/VChat-BE.git",
      tech: ["Socket.io", "Node.js", "Express", "JWT"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Open Library",
      img: "/OL.webp",
      desc: "A digital library system featuring book previews, category filtering, and a custom-built book carousel.",
      live: "https://open-library-fe.vercel.app/",
      fe: "https://github.com/vjbravo123/Open-Library-FE.git",
      be: "https://github.com/vjbravo123/Open-Library-BE.git",
      tech: ["React", "MongoDB", "Express", "Cloudinary"],
      color: "from-emerald-500 to-teal-400"
    },
  ];

  return (
    <section className="relative py-28 px-6 bg-[#020617] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 blur-[150px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto">

        {/* SECTION HEADER */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 w-fit"
          >
            <Monitor size={12} /> Portfolio
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter">
            Featured <br />
            <span className="relative inline-block pr-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 italic leading-[1.1]">
              Projects
            </span>
          </h2>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative flex flex-col bg-slate-900/40 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden"
            >
              {/* IMAGE SECTION WITH UPDATED HOVER OPTIONS */}
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={p.img}
                  alt={`${p.title} – project preview screenshot`}
                  title={`${p.title} project preview image`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                />




                {/* Overlay on hover - Three options now */}
                <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[4px] flex items-center justify-center gap-4">
                  {/* Option 1: Frontend Code */}
                  <a
                    href={p.fe}
                    target="_blank"
                    className="p-4 bg-white/10 rounded-full hover:bg-blue-500 transition-all hover:scale-110 border border-white/20 group/icon"
                    title="Frontend Source Code"
                  >
                    <Github className="text-white" size={22} />
                  </a>

                  {/* Option 2: LIVE LINK (Center & Highlighted) */}
                  <a
                    href={p.live}
                    target="_blank"
                    className="p-5 bg-blue-600 rounded-full hover:bg-blue-400 transition-all hover:scale-120 border border-white/30 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    title="Live Preview"
                  >
                    <Globe className="text-white animate-pulse" size={28} />
                  </a>

                  {/* Option 3: Backend Code */}
                  <a
                    href={p.be}
                    target="_blank"
                    className="p-4 bg-white/10 rounded-full hover:bg-purple-600 transition-all hover:scale-110 border border-white/20"
                    title="Backend Source Code"
                  >
                    <Server className="text-white" size={22} />
                  </a>
                </div>
              </div>

              {/* CONTENT SECTION */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">{p.title}</h3>
                  <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${p.color} shadow-[0_0_15px_rgba(255,255,255,0.5)]`} />
                </div>

                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 flex-grow italic">
                  "{p.desc}"
                </p>

                {/* TECH STACK */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {p.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-300 bg-white/5 rounded-full border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* BOTTOM CTA */}
                <a
                  href={p.live}
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-bold rounded-2xl group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-400 group-hover:text-white transition-all duration-500 shadow-xl"
                >
                  Explore Project <ExternalLink size={18} />
                </a>
              </div>

              {/* Corner Accent Glow */}
              <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${p.color} opacity-[0.03] group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}