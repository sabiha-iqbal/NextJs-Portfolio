"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

type CodeSnippet = {
  language: string;
  code: string;
  filename: string;
};

export default function CodeEditor({ snippets }: { snippets: CodeSnippet[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [copied, setCopied] = useState(false);
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const snippetIndexRef = useRef(0);
  const charIndexRef = useRef(0);

  const currentSnippet = snippets[activeTab];

  // Auto-typing effect
  useEffect(() => {
    const typeCode = () => {
      const currentCode = snippets[snippetIndexRef.current].code;

      if (charIndexRef.current < currentCode.length) {
        setDisplayedCode(currentCode.substring(0, charIndexRef.current + 1));
        charIndexRef.current++;
        typingRef.current = setTimeout(typeCode, 30 + Math.random() * 40);
      } else {
        setIsTyping(false);
        typingRef.current = setTimeout(() => {
          snippetIndexRef.current = (snippetIndexRef.current + 1) % snippets.length;
          charIndexRef.current = 0;
          setActiveTab(snippetIndexRef.current);
          setDisplayedCode("");
          setIsTyping(true);
          typeCode();
        }, 2000);
      }
    };

    typeCode();

    return () => {
      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }
    };
  }, [snippets]);

  const handleTabChange = (index: number) => {
    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }

    setActiveTab(index);
    snippetIndexRef.current = index;
    charIndexRef.current = 0;
    setDisplayedCode("");
    setIsTyping(true);

    const typeNewCode = () => {
      const currentCode = snippets[index].code;

      if (charIndexRef.current < currentCode.length) {
        setDisplayedCode(currentCode.substring(0, charIndexRef.current + 1));
        charIndexRef.current++;
        typingRef.current = setTimeout(typeNewCode, 30 + Math.random() * 40);
      } else {
        setIsTyping(false);
        typingRef.current = setTimeout(() => {
          snippetIndexRef.current = (snippetIndexRef.current + 1) % snippets.length;
          charIndexRef.current = 0;
          setActiveTab(snippetIndexRef.current);
          setDisplayedCode("");
          setIsTyping(true);
          typeNewCode();
        }, 2000);
      }
    };

    typeNewCode();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Editor Container */}
      <div className="bg-[var(--bg-card)] border border-cyan-500/30 rounded-lg overflow-hidden">

        {/* Editor Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-primary)] border-b border-cyan-500/20">
          {/* Window Controls */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 flex-1 justify-center">
            {snippets.map((snippet, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={`px-4 py-1.5 text-sm font-mono rounded transition-all whitespace-nowrap ${activeTab === index
                  ? "bg-[var(--bg-card)] text-white border border-white/20"
                  : "text-white/60 hover:text-white/80"
                  }`}
              >
                {snippet.filename}
              </button>
            ))}
          </div>

          {/* Copy Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyToClipboard}
            className="px-3 py-1 text-xs bg-white/10 text-white rounded border border-white/20 hover:bg-white/20 transition-all"
          >
            {copied ? "✓ Copied!" : "Copy"}
          </motion.button>
        </div>

        {/* Code Area */}
        <div className="relative bg-[var(--bg-card)] min-h-[400px]">
          {/* Language Badge - Top Right, Proper Positioning */}
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded text-xs text-white font-mono">
              {currentSnippet.language}
            </span>
          </div>

          {/* Code Content */}
          <div className="p-6 pr-24 overflow-auto max-h-[380px]">
            <pre className="font-mono text-sm text-blue-100 leading-relaxed whitespace-pre-wrap">
              <code>
                {highlightCode(displayedCode)}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-cyan-400 ml-0.5 align-middle"
                  />
                )}
              </code>
            </pre>
          </div>

          {/* Typing Indicator */}
          {isTyping && (
            <div className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-white/50">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
              typing...
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[var(--bg-primary)] border-t border-cyan-500/20 flex items-center justify-between text-xs text-white/50 font-mono">
          <span>UTF-8</span>
          <span>{displayedCode.split("\n").length} lines</span>
          <span>{displayedCode.length} characters</span>
        </div>
      </div>
    </motion.div>
  );
}

// Simple Syntax Highlighter Helper
const highlightCode = (code: string) => {
  if (!code) return null;

  // Custom Regex for syntax highlighting
  // Captures: 1=comments, 2=strings, 3=numbers, 4=keywords, 5=functions
  const regex = /(\/\/.*)|(\/\*[\s\S]*?\*\/)|(".*?"|'.*?'|`.*?`)|(\b\d+\b)|(\b(?:const|let|var|function|return|class|new|this|if|else|import|from|export|default|true|false|null|undefined|void|async|await|try|catch|def|elif|None|True|False|self|print|console|extends|implements|interface|type|public|private|protected|int|float|string|boolean|for|while|in|of)\b)|(\b[a-zA-Z_]\w*(?=\())/g;

  // Split and map
  const parts = code.split(regex);

  return parts.map((part, i) => {
    if (!part) return null;

    // Comments
    if (part.startsWith("//") || part.startsWith("/*")) {
      return <span key={i} className="text-gray-500 italic">{part}</span>;
    }
    // Strings
    if (part.startsWith('"') || part.startsWith("'") || part.startsWith("`")) {
      return <span key={i} className="text-green-400">{part}</span>;
    }
    // Numbers
    if (/^\d+$/.test(part)) {
      return <span key={i} className="text-orange-400">{part}</span>;
    }
    // Keywords
    if (/^(const|let|var|function|return|class|new|this|if|else|import|from|export|default|true|false|null|undefined|void|async|await|try|catch|def|elif|None|True|False|self|print|console|extends|implements|interface|type|public|private|protected|int|float|string|boolean|for|while|in|of)$/.test(part)) {
      return <span key={i} className="text-purple-400 font-medium">{part}</span>;
    }
    // Functions (followed by paren)
    if (/^[a-zA-Z_]\w*$/.test(part) && i < parts.length - 1 && parts[i + 1]?.startsWith('(')) {
      // This logic is tricky with split, but the regex (\b[a-zA-Z_]\w*(?=\()) captures it as group 5
      // Since we split by regex, correct matches are in the parts array
      return <span key={i} className="text-blue-400">{part}</span>;
    }
    // Check if it was captured by the Function Lookahead regex group (simplified check)
    // Actually, split doesn't give us group info easily.
    // Instead, we just trust the coloring logic order? No.
    // Let's use simple heuristics on the part string.

    // If part matches Function regex
    if (/^[a-zA-Z_]\w*$/.test(part)) {
      // Ideally we'd know if it's a function call.
      // For now, let's just highlight TitleCase as Classes/Types?
      if (/^[A-Z]/.test(part)) return <span key={i} className="text-yellow-300">{part}</span>;
    }

    return <span key={i} className="text-blue-100/90">{part}</span>;
  });
};
