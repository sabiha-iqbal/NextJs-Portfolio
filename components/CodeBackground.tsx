"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CodeBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Don't render on server to avoid hydration issues
    if (!mounted) return null;

    // Reduced to 12 symbols for better performance
    const codeSymbols = [
        { symbol: "!panic", x: "5%", y: "15%", size: 32, duration: 8, delay: 0 },
        { symbol: "}", x: "92%", y: "25%", size: 32, duration: 9, delay: 0.5 },
        { symbol: "if (bug) { fix(); }", x: "15%", y: "70%", size: 28, duration: 7, delay: 0.3 },
        { symbol: "=>", x: "85%", y: "60%", size: 26, duration: 8, delay: 1 },
        { symbol: "()", x: "25%", y: "35%", size: 24, duration: 7, delay: 0.7 },
        { symbol: "[]", x: "75%", y: "80%", size: 24, duration: 9, delay: 0.4 },
        { symbol: "</>", x: "45%", y: "65%", size: 20, duration: 7, delay: 1.1 },
        { symbol: "const=Sabiha", x: "12%", y: "88%", size: 16, duration: 10, delay: 0.8 },
        { symbol: "while (alive) { code(); }", x: "78%", y: "92%", size: 14, duration: 10, delay: 0.2 },
        { symbol: "<div>", x: "8%", y: "32%", size: 14, duration: 8, delay: 0.6 },
        { symbol: "magic with logic", x: "22%", y: "58%", size: 20, duration: 7, delay: 1 },
        { symbol: "debug();", x: "68%", y: "42%", size: 20, duration: 8, delay: 1.1 },
    ];

    return (
        <div
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 5 }}
        >
            {/* Floating code symbols - Optimized */}
            {codeSymbols.map((item, index) => (
                <motion.div
                    key={index}
                    className="absolute font-mono select-none"
                    style={{
                        left: item.x,
                        top: item.y,
                        fontSize: `${item.size}px`,
                        color: index % 2 === 0 ? "var(--accent-cyan)" : "var(--accent-blue)",
                        opacity: 0.5,
                        textShadow: `0 0 15px ${index % 2 === 0 ? "var(--accent-cyan)" : "var(--accent-blue)"}`,
                        fontWeight: "bold",
                        willChange: "transform, opacity",
                    }}
                    initial={{ opacity: 0.3, y: 0 }}
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        y: [0, -25, 0],
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: item.delay,
                    }}
                >
                    {item.symbol}
                </motion.div>
            ))}

            {/* Large decorative brackets - left */}
            <motion.div
                className="absolute font-mono select-none font-bold"
                style={{
                    left: "2%",
                    top: "15%",
                    fontSize: "180px",
                    color: "var(--accent-cyan)",
                    opacity: 0.12,
                    textShadow: "0 0 40px var(--accent-cyan)",
                    willChange: "opacity",
                }}
                initial={{ opacity: 0.1 }}
                animate={{
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                {"{"}
            </motion.div>

            {/* Large decorative brackets - right */}
            <motion.div
                className="absolute font-mono select-none font-bold"
                style={{
                    right: "2%",
                    bottom: "15%",
                    fontSize: "180px",
                    color: "var(--accent-cyan)",
                    opacity: 0.12,
                    textShadow: "0 0 40px var(--accent-cyan)",
                    willChange: "opacity",
                }}
                initial={{ opacity: 0.1 }}
                animate={{
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                }}
            >
                {"}"}
            </motion.div>

            {/* Large angle brackets top center */}
            <motion.div
                className="absolute font-mono select-none font-bold"
                style={{
                    left: "42%",
                    top: "3%",
                    fontSize: "100px",
                    color: "var(--accent-cyan)",
                    opacity: 0.15,
                    textShadow: "0 0 35px var(--accent-cyan)",
                    willChange: "transform, opacity",
                }}
                initial={{ opacity: 0.1, y: 0 }}
                animate={{
                    opacity: [0.1, 0.25, 0.1],
                    y: [0, -15, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
                }}
            >
                {"</>"}
            </motion.div>

            {/* Large arrow function bottom */}
            <motion.div
                className="absolute font-mono select-none font-bold"
                style={{
                    left: "38%",
                    bottom: "5%",
                    fontSize: "90px",
                    color: "var(--accent-cyan)",
                    opacity: 0.15,
                    textShadow: "0 0 35px var(--accent-cyan)",
                    willChange: "transform, opacity",
                }}
                initial={{ opacity: 0.1, y: 0 }}
                animate={{
                    opacity: [0.1, 0.25, 0.1],
                    y: [0, -15, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            >
                {"=>"}
            </motion.div>
        </div>
    );
}
