"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed bottom-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-background/80 border-border/50" : ""
    }`}>
      <div className="container mx-auto px-4 py-3">
        {/* Mobile Navigation Menu - Now shows above the navbar */}
        {isMenuOpen && (
          <div className="md:hidden py-4 flex flex-col space-y-4 border-t border-border/50 mb-4 bg-background/95 backdrop-blur-md rounded-t-xl">
            <MobileNavLink href="#about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
            <MobileNavLink href="#experience" onClick={() => setIsMenuOpen(false)}>Experience</MobileNavLink>
            <MobileNavLink href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</MobileNavLink>
            <MobileNavLink href="#certificates" onClick={() => setIsMenuOpen(false)}>Certificates</MobileNavLink>
            <MobileNavLink href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</MobileNavLink>
            <MobileNavLink href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          {/* Brand/Logo section */}
          <Link href="/" className="text-xl font-bold md:hidden">
            Portfolio
          </Link>

          {/* Desktop Navigation - centered at the bottom */}
          <nav className="hidden md:block w-full">
            <div className="menu bg-card/80 backdrop-blur-sm max-w-lg mx-auto">
              <NavLink href="#about" icon="home" title="About" />
              <NavLink href="#experience" icon="experience" title="Experience" />
              <NavLink href="#projects" icon="projects" title="Projects" />
              <NavLink href="#skills" icon="skills" title="Skills" />
              <NavLink href="#certificates" icon="certificates" title="Certificates" />
              <NavLink href="#contact" icon="contact" title="Contact" />
            </div>
          </nav>

          {/* Mobile Controls - Theme toggle and menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md"
              aria-label="Toggle Menu"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path 
                    d="M18 6L6 18M6 6L18 18" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                ) : (
                  <path 
                    d="M4 6H20M4 12H20M4 18H20" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </button>
          </div>
          
          {/* Desktop Theme Toggle - positioned to the right */}
          <div className="hidden md:block absolute right-6">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, icon, title }: { href: string, icon: "home" | "experience" | "projects" | "certificates" | "skills" | "contact", title: string }) {
  const iconMap = {
    home: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    experience: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    projects: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </svg>
        ),
        skills: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
            ),
        certificates: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    contact: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  };

  return (
    <a
      href={href}
      className="link group"
      aria-label={`Navigate to ${title} section`}
      role="menuitem"
    >
      <span className="link-icon" aria-hidden="true">
        {iconMap[icon]}
      </span>
      <span className="link-title">{title}</span>
    </a>
  );
}

function MobileNavLink({ href, onClick, children }: { 
  href: string, 
  onClick: () => void, 
  children: React.ReactNode 
}) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="block px-4 py-2 text-foreground/80 hover:text-foreground transition-colors"
      aria-label={`Navigate to ${children} section on mobile view`}
      role="menuitem"
    >
      {children}
    </Link>
  );
}
