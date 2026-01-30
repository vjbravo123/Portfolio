"use client";
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Zap, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Experience() {
const expList = [
  {
    role: "Full Stack Developer",
    company: "Zappy",
    duration: "Jan 2026 – Present",
    location: "India",
    logo: "/zappy.webp",
    points: [
      "Developing large-scale applications using Next.js, NestJS, Node.js, and MongoDB",
      "Building SEO-friendly and high-performance frontends improving Core Web Vitals",
      "Designing secure REST APIs using JWT and RBAC for user access control",
      "Deploying services on AWS EC2 and S3 ensuring scalable compute and storage"
    ],
    color: "from-green-500 to-emerald-400"
  },
  {
    role: "React.js Developer Intern",
    company: "ShikshaNation",
    duration: "Oct 2025 – Dec 2025",
    location: "Noida, India",
    logo: "/shiksha.webp",
    points: [
      "Migrated backend services to Strapi CMS for easier content management",
      "Implemented RBAC for Admin, Instructor, and Student roles",
      "Built reusable React components and improved UX, reducing load time"
    ],
    color: "from-purple-500 to-pink-500"
  },
   {
    role: "Full Stack Developer Intern",
    company: "CMTAI",
    duration: "Jul 2025 – Sept 2025",
    location: "Noida, India",
    logo: "/cmtai.webp",
    points: [
      "Built scalable MERN modules and optimized backend performance by 30%",
      "Designed secure authentication with RBAC and JWT",
      "Integrated REST APIs for production-ready applications"
    ],
    color: "from-blue-500 to-cyan-400"
  },
];


  return (
    <section className="relative py-28 px-6 bg-[#020617] overflow-hidden">
      {/* Background Noise & Glow */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative">

        {/* SECTION HEADER - FIXED CLIPPING */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4"
          >
            <Briefcase size={12} /> Work History
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight">
            Professional <br />
            {/* Added pr-8 and inline-block to prevent 'e' from clipping */}
            <span className="relative inline-block pr-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 italic leading-tight">
              Experience
            </span>
          </h2>
        </div>

        {/* TIMELINE COLUMN */}
        <div className="relative space-y-12">
          {/* Central Line for Desktop */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent hidden md:block"></div>

          {expList.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center justify-between w-full ${i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
            >
              {/* 1. THE CARD */}
              <div className="w-full md:w-[45%] group">
                <div className="relative p-[1px] rounded-[2.5rem] overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]">
                  {/* Animated Border Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-20 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative bg-[#0B1120] rounded-[2.5rem] p-8 h-full">
                    {/* Header: Logo & Company */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-14 h-14 rounded-2xl bg-white/5 border border-white/10 p-2 overflow-hidden shadow-inner">
                        <Image
                          src={exp.logo}
                          alt={`${exp.company} company logo`}
                          title={`${exp.company} company logo`}
                          fill
                          className="object-contain p-2 grayscale group-hover:grayscale-0 transition-all duration-500"
                        />



                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white leading-none mb-1">{exp.role}</h3>
                        <p className="text-blue-400 font-medium text-sm tracking-wide uppercase">{exp.company}</p>
                      </div>
                    </div>

                    {/* Meta: Location & Duration */}
                    <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-white/5">
                      <span className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Calendar size={14} className="text-blue-500" /> {exp.duration}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-500">
                        <MapPin size={14} className="text-purple-500" /> {exp.location}
                      </span>
                    </div>

                    {/* Key Contributions */}
                    <ul className="space-y-3">
                      {exp.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed">
                          <ChevronRight size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 2. THE CENTER NODE (Desktop Only) */}
              <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} blur-md rounded-full opacity-50 group-hover:opacity-100 animate-pulse`} />
                  <div className="relative w-4 h-4 rounded-full bg-white border-4 border-[#020617] z-10" />
                </div>
              </div>

              {/* 3. SPACER FOR LAYOUT BALANCE */}
              <div className="hidden md:block w-[45%]" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Side Decorative Text */}
      <div className="absolute top-1/2 -right-20 -rotate-90 hidden xl:block">
        <span className="text-9xl font-black text-white/[0.02] select-none tracking-widest uppercase">
          Career
        </span>
      </div>
    </section>
  );
}