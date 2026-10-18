"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { currentTheme, availableThemes, setThemeByName } = useTheme();
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  // Map theme names to cute emojis
  const getThemeEmoji = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("dark") || n.includes("black")) return "🌙";
    if (n.includes("cyberpunk")) return "🤖";
    if (n.includes("matrix")) return "🧪";
    if (n.includes("neon")) return "🌈";
    if (n.includes("light")) return "☀️";
    if (n.includes("solarized")) return "🌅";
    if (n.includes("midnight")) return "🌌";
    if (n.includes("ocean")) return "🌊";
    if (n.includes("forest")) return "🌲";
    return "🎨";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setIsThemeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const navbarHeight = 64; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }

    setIsOpen(false);
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => item.href.replace("#", ""));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 w-full z-[120] border-b"
      style={{
        background: "var(--bg-nav)",
        backdropFilter: "blur(15px)",
        borderColor: "rgba(var(--accent-cyan-rgb), 0.2)"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Text Only */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center group cursor-pointer"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors"
            >
              Sabiha<span className="text-blue-500">.</span>
            </motion.span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-2 transition-colors relative group ${activeSection === item.href.replace("#", "")
                    ? "text-cyan-400"
                    : "text-cyan-300 hover:text-cyan-400"
                    }`}
                >
                  {item.name}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                    initial={{ width: activeSection === item.href.replace("#", "") ? "100%" : 0 }}
                    animate={{ width: activeSection === item.href.replace("#", "") ? "100%" : 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </a>
            ))}

            {/* Theme Dropdown (Desktop) */}
            <div className="relative ml-4" ref={themeDropdownRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-cyan-300 border border-cyan-500/30 transition-all"
              >
                <span>{getThemeEmoji(currentTheme)}</span>
                <span className="text-sm font-medium">{currentTheme}</span>
                <svg className={`w-4 h-4 transition-transform ${isThemeOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>

              <AnimatePresence>
                {isThemeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl bg-[var(--bg-card)] border border-cyan-500/20 shadow-xl py-2 z-50 overflow-hidden backdrop-blur-xl"
                  >
                    <div className="max-h-64 overflow-y-auto custom-scrollbar">
                      {availableThemes.map((theme) => (
                        <button
                          key={theme.name}
                          onClick={() => {
                            setThemeByName(theme.name);
                            setIsThemeOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-cyan-500/10 transition-colors ${currentTheme === theme.name ? 'text-cyan-400 bg-cyan-500/5' : 'text-white/70'}`}
                        >
                          <span>{getThemeEmoji(theme.name)}</span>
                          <span>{theme.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            {/* Theme Dropdown (Mobile Toggle Trigger) */}
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className="p-2 rounded-full bg-white/5 text-cyan-300 border border-cyan-500/30"
            >
              {getThemeEmoji(currentTheme)}
            </button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-cyan-400"
              whileHover={{ scale: 1.1 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden pb-4 border-t border-cyan-500/20"
          >
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <div className={`block px-4 py-2 transition-colors ${activeSection === item.href.replace("#", "")
                  ? "text-cyan-400"
                  : "text-cyan-300 hover:text-cyan-400"
                  }`}>
                  {item.name}
                </div>
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
