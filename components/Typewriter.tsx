"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
    words: string[];
    delay?: number;
    className?: string;
}

export default function Typewriter({ words, delay = 3000, className = "" }: TypewriterProps) {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const currentWord = words[index % words.length];

        const handleType = () => {
            setTypingSpeed(isDeleting ? 50 : 150);

            if (!isDeleting && text === currentWord) {
                setTimeout(() => setIsDeleting(true), delay);
                return;
            }

            if (isDeleting && text === "") {
                setIsDeleting(false);
                setIndex((prev) => prev + 1);
                return;
            }

            const nextText = isDeleting
                ? currentWord.substring(0, text.length - 1)
                : currentWord.substring(0, text.length + 1);

            setText(nextText);
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, index, words, delay, typingSpeed]);

    return (
        <span className={className}>
            {text}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-0.5 h-[1em] bg-current ml-1 align-middle"
            />
        </span>
    );
}
