"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

import { defaultThemes } from "@/app/data";

export interface ThemeVariables {
    bg_primary: string;
    bg_card: string;
    bg_nav: string;
    text_primary: string;
    accent_cyan: string;
    accent_blue: string;
    background: string;
    foreground: string;
}

export interface Theme {
    name: string;
    variables: ThemeVariables;
}

interface ThemeContextType {
    currentTheme: string;
    availableThemes: Theme[];
    setThemeByName: (name: string) => void;
    setAvailableThemes: (themes: Theme[]) => void;
    applyThemeVariables: (variables: ThemeVariables) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [currentTheme, setCurrentTheme] = useState<string>("Dark Theme");
    const [availableThemes, setAvailableThemes] = useState<Theme[]>(defaultThemes);
    const [mounted, setMounted] = useState(false);

    const hexToRgb = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
    };

    const applyThemeVariables = useCallback((vars: ThemeVariables) => {
        const root = document.documentElement;
        root.style.setProperty("--bg-primary", vars.bg_primary);
        root.style.setProperty("--bg-card", vars.bg_card);
        root.style.setProperty("--bg-nav", vars.bg_nav);
        root.style.setProperty("--text-primary", vars.text_primary);
        root.style.setProperty("--accent-cyan", vars.accent_cyan);
        root.style.setProperty("--accent-blue", vars.accent_blue);
        root.style.setProperty("--background", vars.background);
        root.style.setProperty("--foreground", vars.foreground);

        // Update helper values too
        root.style.setProperty("--cyan-500", vars.accent_cyan);
        root.style.setProperty("--blue-500", vars.accent_blue);

        // Add RGB components for RGBA support in CSS
        root.style.setProperty("--accent-cyan-rgb", hexToRgb(vars.accent_cyan));
        root.style.setProperty("--accent-blue-rgb", hexToRgb(vars.accent_blue));
    }, []);

    const setThemeByName = useCallback((name: string) => {
        setAvailableThemes(prevThemes => {
            const theme = prevThemes.find(t => t.name === name);
            if (theme) {
                setCurrentTheme(name);
                applyThemeVariables(theme.variables);
                localStorage.setItem("selected-theme", name);
            }
            return prevThemes;
        });
    }, [applyThemeVariables]);

    const handleSetAvailableThemes = useCallback((themes: Theme[]) => {
        setAvailableThemes(themes);

        // When themes arrive, check if we have a saved one
        const savedThemeName = localStorage.getItem("selected-theme");
        if (savedThemeName) {
            const theme = themes.find(t => t.name === savedThemeName);
            if (theme) {
                setCurrentTheme(savedThemeName);
                applyThemeVariables(theme.variables);
                return;
            }
        }

        // Otherwise, themes arrive, if no saved theme, let the initial one stay or wait for API default
    }, [applyThemeVariables]);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("selected-theme");
        if (savedTheme) {
            setCurrentTheme(savedTheme);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{
            currentTheme,
            availableThemes,
            setThemeByName,
            setAvailableThemes: handleSetAvailableThemes,
            applyThemeVariables
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
