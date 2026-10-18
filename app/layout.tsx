
import Navbar from "@/components/Navbar";
import CodeBackground from "@/components/CodeBackground";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body className="text-white terminal-font relative overflow-x-hidden w-full transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          {/* Constant fixed backgrounds - These don't scroll */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <CodeBackground />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(var(--accent-cyan-rgb), 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--accent-cyan-rgb), 0.1) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          <main className="relative z-10 w-full min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

