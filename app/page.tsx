"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CodeEditor from "@/components/CodeEditor";
import Typewriter from "@/components/Typewriter";
import {
  timeline,
  achievements,
  projects,
  skillCategories,
  services,
  heroData,
  aboutData,
  codeSnippets,
  contactInfo,
} from "./data";
import ResumeDownloadButton from "@/components/ResumeDownloadButton";
import { useTheme } from "@/components/ThemeProvider";
import NodeNetwork from "@/components/NodeNetwork";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [activeProjectCategory, setActiveProjectCategory] = useState("All");
  const [activeSkillCategory, setActiveSkillCategory] = useState("All");
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  // Smooth initial loading screen transition
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const filteredProjects = activeProjectCategory === "All"
    ? projects
    : projects.filter(p => p.category.includes(activeProjectCategory) || p.category === activeProjectCategory);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveServiceIndex((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const filteredSkills = activeSkillCategory === "All"
    ? skillCategories
    : skillCategories.filter(s => s.name === activeSkillCategory);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  // Show loading screen while fetching data
  if (isLoading) {
    return (
      <div
        className="fixed inset-0 min-h-screen z-[100] flex flex-col items-center justify-center overflow-hidden transition-colors duration-700"
        style={{ backgroundColor: "var(--bg-primary, #071233)" }}
      >
        <NodeNetwork />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center"
        >
          <div className="relative mb-8">
            {/* Pulsing ring */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-8 bg-cyan-500/20 rounded-full blur-2xl"
            />

            {/* Central spinning loader */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 border-2 rounded-full mx-auto relative"
              style={{ borderColor: "rgba(var(--accent-cyan-rgb), 0.3)", borderTopColor: "var(--accent-cyan)" }}
            >
              <div
                className="absolute inset-2 border rounded-full animate-[spin_1.5s_linear_infinite]"
                style={{ borderColor: "rgba(var(--accent-blue-rgb), 0.2)", borderTopColor: "var(--accent-blue)" }}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-white mb-2 terminal-heading tracking-widest neon-glow">
              INITIALIZING<span className="animate-pulse">...</span>
            </h2>
            <p className="font-mono text-sm uppercase tracking-widest" style={{ color: "var(--accent-cyan)", opacity: 0.6 }}>
              Connecting to neural network
            </p>
          </motion.div>
        </motion.div>

        {/* Binary stream effect in background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] font-mono text-[10px] break-all p-12 overflow-hidden leading-none select-none">
          {Array(20).fill("01101001 01101110 01101001 01110100 01101001 01100001 01101100 01101001 01111010 01101001 01101110 01100111 ").join("")}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative w-full pt-16">
      <Navbar />
      {/* Background grid effect - keep above code background but below content */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(var(--accent-cyan-rgb), 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--accent-cyan-rgb), 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          zIndex: 2,
        }}
      />

      {/* ==================== HOME SECTION ==================== */}
      <section id="home" className="min-h-screen flex items-center justify-center py-4 sm:py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center w-full max-w-8xl px-4 sm:px-7 mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center w-full">
            {/* Left Column: Intro Card */}
            <motion.div
              className="mx-auto bg-[var(--bg-card)] rounded-2xl p-6 sm:p-10 backdrop-blur-md corner-brackets w-full text-left"
              style={{ boxShadow: "0 0 40px rgba(0, 0, 0, 0.8)" }}
            >
              {/* Main Headline */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 terminal-heading neon-glow break-words"
                style={{
                  fontStyle: "normal",
                  color: "var(--text-primary)",
                  textShadow: "0 0 10px rgba(34, 211, 238, 0.25)",
                }}
              >
                <span className="text-white">Hi! I'm {heroData.name}</span>
              </motion.h1>

              {/* Role/Title */}
              <div className="h-10 sm:h-12 mb-3 sm:mb-4">
                <Typewriter
                  words={heroData.roles}
                  className="text-xl sm:text-2xl md:text-3xl text-white/90 terminal-heading bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
                />
              </div>

              {/* Tagline */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-10 max-w-2xl terminal-heading px-1"
              >
                {heroData.paragraph}
              </motion.p>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-4 mb-10 w-full max-w-md"
              >
                {heroData.stats.map((stat, i) => (
                  <div key={i} className="text-left">
                    <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: "var(--accent-cyan)" }}>
                      {stat.number}
                    </div>
                    <div className="text-sm opacity-60" style={{ color: "var(--accent-cyan)" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 items-start flex-wrap"
              >
                <a href="#projects">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 211, 238, 0.8)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 sm:px-8 py-2.5 sm:py-3 bg-cyan-500 text-black font-bold rounded-lg transition-all magnetic-btn pulse-glow w-full sm:w-auto text-center text-sm sm:text-base whitespace-nowrap"
                    style={{
                      boxShadow: "0 0 20px rgba(34, 211, 238, 0.5)",
                    }}
                  >
                    View My Projects
                  </motion.button>
                </a>

                <a href="#contact">
                  <motion.button
                    whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 1)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg transition-all hover:text-white magnetic-btn w-full sm:w-auto text-center"
                  >
                    Get In Touch
                  </motion.button>
                </a>

                <ResumeDownloadButton />
              </motion.div>
            </motion.div>

            {/* Right Column: Code Showcase */}
            <motion.div variants={itemVariants} className="w-full mt-8 lg:mt-0 flex justify-center lg:justify-center">
              <div className="w-full max-w-xl">
                <h2 className="text-2xl font-bold text-white mb-4 terminal-heading neon-glow text-left">
                  Code Showcase
                </h2>
                <CodeEditor snippets={codeSnippets} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ==================== PROJECTS SECTION ==================== */}
      <section id="projects" className="min-h-screen py-2 sm:py-2">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative z-10 max-w-7xl mx-auto px-4 bg-[var(--bg-card)] rounded-3xl py-12 backdrop-blur-sm"
          style={{ boxShadow: "0 0 60px rgba(7, 18, 51, 0.9)" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-8 corner-brackets">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white terminal-heading neon-glow"
              style={{ textShadow: "0 0 18px rgba(34, 211, 238, 0.25)" }}
            >
              My Projects
            </h2>
            <p className="text-white/80 text-lg terminal-heading">
              Explore the work I've created and the problems I've solved
            </p>
          </motion.div>

          {/* Project Tabs */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            {["All", "Game Development", "Full-Stack", "Frontend"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveProjectCategory(cat)}
                className={`px-4 py-2 rounded-full border transition-all text-sm font-bold terminal-heading ${activeProjectCategory === cat
                  ? "bg-cyan-500 text-black border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                  : "bg-[var(--bg-primary)] text-cyan-400 border-cyan-500/30 hover:border-cyan-400 hover:text-white"
                  }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-[var(--bg-card)] border border-cyan-500/30 rounded-xl p-6 overflow-hidden transition-all duration-300 hover:border-cyan-400/60 card-animated glow-border shimmer backdrop-blur-sm"
                style={{
                  boxShadow: "0 0 20px rgba(7, 18, 51, 0.8), 0 0 14px rgba(34, 211, 238, 0.1)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-cyan-500/10 group-hover:to-cyan-500/5 transition-all duration-300" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <div className="inline-block px-3 py-1 bg-cyan-500/20 text-white/90 text-xs font-bold rounded-full border border-cyan-500/30 terminal-heading">
                      {project.category}
                    </div>
                    <div className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${project.privacy === "Public"
                      ? "bg-green-500/20 text-green-300 border-green-500/30"
                      : "bg-red-500/20 text-red-300 border-red-500/30"
                      }`}>
                      {project.privacy}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 terminal-heading">{project.title}</h3>
                  <p className="text-white/80 mb-4 terminal-heading">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-[var(--bg-card)] border border-cyan-400/30 text-white/80 text-sm rounded terminal-heading"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.link}
                      className="text-white/80 hover:text-white font-semibold transition-colors flex items-center gap-2 terminal-heading"
                    >
                      View Project →
                    </a>
                    <a
                      href={project.github}
                      className="text-white/80 hover:text-white font-semibold transition-colors flex items-center gap-2 terminal-heading"
                    >
                      GitHub →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="min-h-screen py-8 sm:py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative z-10 max-w-6xl mx-auto px-4 bg-[var(--bg-card)] rounded-3xl py-12 backdrop-blur-sm"
          style={{ boxShadow: "0 0 60px rgba(7, 18, 51, 0.9)" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12 corner-brackets">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white terminal-heading neon-glow" style={{ textShadow: "0 0 18px rgba(34, 211, 238, 0.25)" }}>
              {aboutData.title}
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto terminal-heading">
              {aboutData.paragraph}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-white/80 text-lg leading-relaxed terminal-heading whitespace-pre-line">
                {aboutData.description}
              </p>

              <div className="pt-6">
                <h3 className="text-xl font-bold text-white mb-4 terminal-heading">Interests</h3>
                <div className="flex flex-wrap gap-3">
                  {aboutData.interests.map((interest, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 211, 238, 0.15)" }}
                      className="flex items-center gap-2 px-4 py-2 bg-cyan-900/20 border border-cyan-500/20 rounded-full text-sm text-cyan-300 cursor-default"
                    >
                      <span>{interest.icon}</span>
                      <span className="terminal-heading">{interest.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center">
              <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative w-64 h-64 rounded-lg overflow-hidden border-2 border-cyan-400/30 mb-6 card-animated glow-border" style={{ boxShadow: "0 0 24px rgba(34, 211, 238, 0.12)" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-white mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <p className="text-white/80 text-sm terminal-heading">Professional Developer</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-400/30 rounded-lg p-6 text-center w-full card-animated glow-border" style={{ boxShadow: "0 0 20px rgba(34, 211, 238, 0.06)" }}>
                <p className="text-white/80 italic terminal-heading">"Code is like humor. When you have to explain it, it's bad." - Cory House</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Timeline */}
          <motion.div variants={itemVariants} className="mt-20 space-y-8">
            <div className="animated-divider mb-8" />
            <h3 className="text-3xl sm:text-4xl font-bold text-white terminal-heading neon-glow" style={{ textShadow: "0 0 18px rgba(34, 211, 238, 0.2)" }}>
              Professional Journey
            </h3>

            <div className="space-y-8 relative pl-8 border-l border-cyan-500/20 ml-4 pb-2">
              {/* Timeline decorative end cap */}
              <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              <div className="absolute bottom-0 left-[-5px] w-2.5 h-2.5 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

              {timeline.map((job, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative pl-8"
                >
                  {/* Timeline node */}
                  <div className="absolute left-[-41px] top-6 w-5 h-5 bg-[var(--bg-primary)] border-2 border-cyan-500 rounded-full flex items-center justify-center z-10 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  </div>

                  {/* Connector line for item */}
                  <div className="absolute left-[-32px] top-8.5 w-8 h-[2px] bg-cyan-500/30" />

                  <motion.div
                    whileHover={{ x: 10, borderColor: "rgba(34, 211, 238, 0.4)", backgroundColor: "rgba(34, 211, 238, 0.05)" }}
                    className="bg-[var(--bg-primary)] border border-cyan-500/10 rounded-xl p-6 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                      <svg className="w-16 h-16 text-cyan-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" /></svg>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 relative z-10">
                      <div>
                        <h4 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors terminal-heading">
                          {job.title}
                        </h4>
                        <div className="flex items-center gap-2 text-cyan-300/80 font-mono text-sm">
                          <span>@ {job.company}</span>
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <span className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/20 rounded text-xs font-bold text-cyan-200 uppercase tracking-wider">
                          {job.year}
                        </span>
                      </div>
                    </div>

                    <p className="text-white/70 leading-relaxed terminal-heading relative z-10">
                      {job.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-24">
            <div className="animated-divider mb-12" />
            <div className="flex flex-col items-center mb-12">
              <h3 className="text-3xl sm:text-5xl font-bold text-white mb-4 neon-glow flex items-center gap-3">
                <span style={{ color: "var(--accent-cyan)" }}>⚡</span> Key Achievements
              </h3>
              <p className="font-mono text-sm uppercase tracking-widest" style={{ color: "var(--accent-cyan)", opacity: 0.6 }}>Milestones & Impact</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              {achievements.map((achievement: any, i: number) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative group perspective-1000"
                >
                  <div
                    className="absolute -inset-0.5 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"
                    style={{ background: `linear-gradient(to right, var(--accent-cyan), var(--accent-blue))` }}
                  />
                  <div className="relative h-full bg-[var(--bg-primary)] border rounded-2xl p-8 flex flex-col items-center text-center overflow-hidden backdrop-blur-xl transition-colors duration-300"
                    style={{ borderColor: "rgba(var(--accent-cyan), 0.2)" }}>
                    {/* Holographic grid background */}
                    <div
                      className="absolute inset-0 opacity-[0.03] pointer-events-none"
                      style={{
                        backgroundImage: `radial-gradient(var(--accent-cyan) 1px, transparent 1px)`,
                        backgroundSize: "20px 20px"
                      }}
                    />

                    <div className="mb-6 relative">
                      <div className="absolute inset-0 blur-2xl opacity-20" style={{ backgroundColor: "var(--accent-cyan)" }} />
                      <div className="text-5xl relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                        {achievement.icon || "🏆"}
                      </div>
                    </div>

                    <h4 className="text-2xl font-bold text-white mb-3 terminal-heading tracking-tight relative z-10">
                      {achievement.title}
                    </h4>

                    <p className="text-white/60 leading-relaxed terminal-heading text-sm relative z-10">
                      {achievement.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== SERVICES SECTION ==================== */}
      <section id="services" className="min-h-screen py-8 sm:py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative z-10 max-w-7xl mx-auto px-4 bg-[var(--bg-card)] rounded-3xl py-12 backdrop-blur-sm"
          style={{ boxShadow: "0 0 60px rgba(0, 0, 0, 0.9)" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12 corner-brackets">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white terminal-heading neon-glow" style={{ textShadow: "0 0 18px rgba(34, 211, 238, 0.25)" }}>
              Specialized Services
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto terminal-heading">
              Tailored solutions to elevate your digital presence
            </p>
          </motion.div>

          <div
            className="relative max-w-7xl mx-auto"
          >
            <div className="relative w-full h-[550px] flex items-center justify-center perspective-1000 overflow-hidden">
              {services.map((service, index) => {
                const len = services.length;
                const diff = (index - activeServiceIndex + len) % len;

                // Calculate position for continuous circle feel
                let position = "hidden";
                let xOffset = 0;
                let scale = 0.7;
                let opacity = 0;
                let zIndex = 0;
                let rotateY = 0;

                if (diff === 0) {
                  // Center card
                  position = "center";
                  xOffset = 0;
                  scale = 1;
                  opacity = 1;
                  zIndex = 10;
                  rotateY = 0;
                } else if (diff === 1 || diff === len - 1) {
                  // Adjacent cards (left and right)
                  position = diff === 1 ? "right" : "left";
                  xOffset = diff === 1 ? 65 : -65;
                  scale = 0.85;
                  opacity = 0.8;
                  zIndex = 5;
                  rotateY = diff === 1 ? -20 : 20;
                } else if (diff === 2 || diff === len - 2) {
                  // Far cards (barely visible)
                  position = diff === 2 ? "far-right" : "far-left";
                  xOffset = diff === 2 ? 130 : -130;
                  scale = 0.7;
                  opacity = 0.3;
                  zIndex = 1;
                  rotateY = diff === 2 ? -35 : 35;
                }

                return (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{
                      x: `${xOffset}%`,
                      scale: scale,
                      opacity: opacity,
                      zIndex: zIndex,
                      rotateY: rotateY,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 30,
                      mass: 1,
                    }}
                    className="absolute w-[300px] md:w-[350px] top-1/2 -translate-y-1/2 left-1/2 -ml-[150px] md:-ml-[175px]"
                    onClick={() => setActiveServiceIndex(index)}
                    style={{
                      willChange: 'transform, opacity',
                      pointerEvents: position === "center" ? 'auto' : 'none'
                    }}
                  >
                    <div className={`bg-[var(--bg-card)] border rounded-xl p-8 flex flex-col items-center text-center transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.6)] h-full relative cursor-pointer backdrop-blur-md
                    ${position === 'center' ? 'border-cyan-500 shadow-[0_0_30px_rgba(34,211,238,0.2)]' : 'border-cyan-500/30'}
                 `}>
                      <div className="text-4xl md:text-5xl mb-6 bg-cyan-500/10 p-4 rounded-full border border-cyan-500/20">
                        {service.icon === "WP" ? (
                          <span className="font-bold text-cyan-400">WP</span>
                        ) : (
                          service.icon
                        )}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 terminal-heading">{service.title}</h3>
                      <p className="text-white/70 mb-6 flex-grow terminal-heading">{service.description}</p>

                      <div className="flex flex-wrap gap-2 justify-center">
                        {service.tools.map((tool, i) => (
                          <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-cyan-300">
                            {tool}
                          </span>
                        ))}
                      </div>

                      {position !== 'center' && (
                        <div className="absolute inset-0 bg-black/30 rounded-xl transition-colors pointer-events-none" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Arrows */}
            <div className="flex justify-center gap-8 z-20 mt-4 relative">
              <button
                className="pointer-events-auto p-3 rounded-full bg-cyan-900/40 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:scale-110 transition-all backdrop-blur-sm"
                onClick={() => setActiveServiceIndex((prev) => (prev - 1 + services.length) % services.length)}
              >
                ◀
              </button>
              <button
                className="pointer-events-auto p-3 rounded-full bg-cyan-900/40 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:scale-110 transition-all backdrop-blur-sm"
                onClick={() => setActiveServiceIndex((prev) => (prev + 1) % services.length)}
              >
                ▶
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ==================== SKILLS SECTION ==================== */}
      <section id="skills" className="min-h-screen py-8 sm:py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-7 bg-[var(--bg-card)] rounded-3xl py-12 backdrop-blur-sm"
          style={{ boxShadow: "0 0 60px rgba(0, 0, 0, 0.9)" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-8 corner-brackets">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white terminal-heading neon-glow"
              style={{ textShadow: "0 0 18px rgba(34, 211, 238, 0.25)" }}
            >
              Skills & Expertise
            </h2>
            <p className="text-white/80 text-lg terminal-heading mb-6">
              Technologies and tools I work with
            </p>

            {/* Skill Tabs */}
            <div className="flex flex-wrap justify-center gap-4">
              {["All", "Frontend", "Backend", "Game Development", "AI/ML"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveSkillCategory(cat)}
                  className={`px-4 py-2 rounded-full border transition-all text-sm font-bold terminal-heading ${activeSkillCategory === cat
                    ? "bg-cyan-500 text-black border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                    : "bg-[var(--bg-primary)] text-cyan-400 border-cyan-500/30 hover:border-cyan-400 hover:text-white"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSkills.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                variants={itemVariants}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="group relative bg-[var(--bg-card)] border border-cyan-500/30 rounded-xl p-6 overflow-hidden transition-all duration-300 hover:border-cyan-400/60 card-animated glow-border shimmer backdrop-blur-sm"
                style={{
                  boxShadow: "0 0 20px rgba(0, 0, 0, 0.8), 0 0 14px rgba(34, 211, 238, 0.1)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-cyan-500/10 group-hover:to-cyan-500/5 transition-all duration-300" />

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-6 terminal-heading">{category.name}</h3>

                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        className="group/skill cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white/80 font-semibold text-sm terminal-heading">
                            {skill}
                          </span>
                        </div>
                        <div className="h-2 bg-cyan-900/30 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${70 + Math.random() * 25}%` }}
                            transition={{ delay: skillIndex * 0.08 + 0.15, duration: 0.6 }}
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ==================== CONTACT SECTION ==================== */}
      <section id="contact" className="min-h-screen py-8 sm:py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative z-10 max-w-7xl mx-auto px-4 bg-[var(--bg-card)] rounded-3xl py-12 backdrop-blur-sm"
          style={{ boxShadow: "0 0 60px rgba(0, 0, 0, 0.9)" }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12 corner-brackets">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white terminal-heading neon-glow"
              style={{ textShadow: "0 0 18px rgba(34, 211, 238, 0.25)" }}
            >
              Get In Touch
            </h2>
            <p className="text-white/80 text-lg terminal-heading">
              Have a project in mind? Let's collaborate!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-6 px-4 sm:px-8">
              <h3 className="text-2xl font-bold text-white mb-6 terminal-heading border-b border-white/10 pb-4">Connect With Me</h3>

              <div className="grid grid-cols-1 gap-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-cyan-500/20 bg-[var(--bg-primary)] hover:border-cyan-500/60 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all group backdrop-blur-sm"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-[var(--bg-card)] rounded-full text-2xl group-hover:scale-110 transition-transform border border-cyan-500/10 group-hover:border-cyan-500/30">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-cyan-400/70 uppercase font-bold tracking-wider mb-0.5">{item.name}</div>
                      <div className="text-white font-mono text-sm sm:text-base group-hover:text-cyan-300 transition-colors">{item.value}</div>
                    </div>
                    <div className="ml-auto text-white/20 group-hover:text-cyan-400 transition-colors">
                      →
                    </div>
                  </motion.a>
                ))}
              </div>

            </motion.div>

            {/* Contact Form */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-6 bg-[var(--bg-primary)] p-6 sm:p-8 rounded-2xl border border-cyan-500/20 shadow-inner"
            >
              <div>
                <label className="block text-cyan-400 font-semibold mb-2 terminal-heading text-sm uppercase tracking-wide">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-[var(--bg-card)] border border-cyan-900/30 rounded-lg text-white placeholder-white/20 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-cyan-400 font-semibold mb-2 terminal-heading text-sm uppercase tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-[var(--bg-card)] border border-cyan-900/30 rounded-lg text-white placeholder-white/20 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-cyan-400 font-semibold mb-2 terminal-heading text-sm uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 bg-[var(--bg-card)] border border-cyan-900/30 rounded-lg text-white placeholder-white/20 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300 resize-none"
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] border border-cyan-400/30 uppercase tracking-widest text-sm relative overflow-hidden group"
              >
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.form>
          </div>

          {/* Availability Cards */}
          <motion.div
            variants={itemVariants}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: (
                  <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Response Time",
                value: "Within 24 Hours",
                subtext: "Quick & Reliable"
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Availability",
                value: "Open for Projects",
                subtext: "Full-Time / Contract"
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Global Reach",
                value: "Remote First",
                subtext: "Working Worldwide"
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.03 }}
                className="relative group bg-[var(--bg-card)] border border-cyan-500/20 rounded-2xl p-8 text-center overflow-hidden backdrop-blur-md"
                style={{
                  boxShadow: "0 0 30px rgba(0, 0, 0, 0.6)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <motion.div
                  className="flex justify-center mb-6 relative z-10"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                >
                  <div className="p-4 bg-cyan-900/20 rounded-full border border-cyan-500/30 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all">
                    {item.icon}
                  </div>
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-2 terminal-heading group-hover:text-cyan-400 transition-colors relative z-10">
                  {item.title}
                </h3>
                <p className="text-white/90 font-medium text-lg mb-1 relative z-10">
                  {item.value}
                </p>
                <p className="text-white/50 text-sm relative z-10">
                  {item.subtext}
                </p>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white/60 terminal-heading">
            © {new Date().getFullYear()} {heroData.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
