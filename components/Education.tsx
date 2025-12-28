"use client";
import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, ExternalLink, Award, BookOpen, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function Education() {
  const eduList = [
    {
      title: "B.Sc (Computer Science)",
      year: "2021 - 2024",
      inst: "Maharaja Agrasen College, University of Delhi",
      link: "https://mac.du.ac.in/",
      logo: "https://mac.du.ac.in/images/logo.png",
      desc: "Focused on Computer Science fundamentals, Data Structures, and Algorithms.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      title: "Full Stack Developer Certification",
      year: "2024",
      inst: "Internshala Trainings + NSDC",
      logo: "https://internshala.com/static/images/homepage/in.png",
      desc: "Comprehensive training in MERN Stack, REST APIs, and Cloud Deployment.",
      color: "from-yellow-500 to-orange-500",
      badge: "Professional"
    },
    {
      title: "Senior Secondary (XII)",
      year: "2021",
      inst: "SBV Rouse Avenue, New Delhi",
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/95/CBSE_new_logo.svg/512px-CBSE_new_logo.svg.png',
      score: "88%",
      desc: "Science Stream with a focus on Mathematics and Physics.",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Secondary (X)",
      year: "2019",
      inst: "St Thomas School Sahibabad",
      link: "https://sahib.stthomasghaziabad.org/",
      logo: "https://resources.edunexttechnologies.com/web-data/sts-thomas/images/logo-mm.png",
      score: "87%",
      desc: "Completed secondary education with distinction in Science and Math.",
      color: "from-green-500 to-emerald-400",
    },
  ];

  return (
    <section className="relative py-24 px-6 bg-[#020617] overflow-hidden">
      {/* 1. FIXED BACKGROUND RADIAL */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4"
          >
            <BookOpen size={12} /> Academic Background
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight">
            Education & <br />
            {/* FIXED: pr-10 and leading-tight to stop letter clipping */}
            <span className="relative inline-block pr-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 italic leading-[1.1]">
              Certifications
            </span>
          </h2>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eduList.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
            >
              {/* 2. FIXED HOVER GLOW: Added subtle border glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`} />
              <div className={`absolute -inset-px bg-gradient-to-br ${edu.color} opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500 -z-10`} />

              <div className="relative z-10">
                {/* Header: Logo & Title */}
                <div className="flex items-start justify-between mb-6 gap-4">
                  <div className="flex items-center gap-4">
                    {/* FIXED: Image container width/height fixed to prevent squashing */}
                    <div className="relative w-14 h-14 rounded-2xl bg-white p-2 shadow-xl flex-shrink-0 flex items-center justify-center">
                      <Image
                        src={edu.logo}
                        alt={`${edu.inst} institution logo`}
                        title={`${edu.inst} institution logo`}
                        width={56}
                        height={56}
                        className="object-contain max-w-full max-h-full"
                      />




                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                        {edu.title}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium mt-1">{edu.year}</p>
                    </div>
                  </div>

                  {/* Score/Badge - Hidden on very small screens to prevent overlap */}
                  <div className="hidden sm:block">
                    {edu.score && (
                      <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                        {edu.score}
                      </div>
                    )}
                    {edu.badge && (
                      <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                        {edu.badge}
                      </div>
                    )}
                  </div>
                </div>

                {/* Institution Name */}
                <div className="mb-6">
                  {edu.link ? (
                    <a
                      href={edu.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-semibold underline underline-offset-4 decoration-blue-500/50"
                    >
                      {edu.inst} <ExternalLink size={14} className="opacity-50" />
                    </a>
                  ) : (
                    <p className="text-gray-300 text-sm font-semibold">{edu.inst}</p>
                  )}
                </div>
              </div>

              {/* Description & Decorative Icon Bottom Row */}
              <div className="relative z-10 mt-auto pt-6 border-t border-white/5 flex items-end justify-between">
                <p className="text-gray-400 text-sm leading-relaxed max-w-[80%] italic">
                  "{edu.desc}"
                </p>

                {/* 3. FIXED DECORATIVE ICON: Moved to relative z-0 so it doesn't block text links */}
                <GraduationCap
                  className="text-white/[0.03] group-hover:text-blue-500/10 transition-colors duration-700 pointer-events-none absolute -bottom-4 -right-4"
                  size={120}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}