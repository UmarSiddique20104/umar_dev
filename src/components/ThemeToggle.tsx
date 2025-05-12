"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Assuming these icons are imported from a library

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-12 h-20 rounded-md flex items-center justify-center bg-transparent">
        <span className="sr-only">Loading theme toggle</span>
      </div>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="container-toggle flex items-center">
      <button
        onClick={toggleTheme}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background shadow-sm hover:bg-accent transition-colors cursor-pointer"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme - Currently in ${theme} mode`}
      >
        {theme === 'dark' ? (
          <FaMoon className="h-4 w-4 transition-all" aria-hidden="true" />
        ) : (
          <FaSun className="h-4 w-4 transition-all" aria-hidden="true" />
        )}
        <span className="sr-only">Toggle theme</span>
      </button>
     
    </div>
  );
}
