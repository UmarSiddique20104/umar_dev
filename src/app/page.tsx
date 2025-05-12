"use client";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Certificate from "@/components/sections/Certificates";
import Experience from "@/components/sections/Experience";
import ChatBot from "@/components/ChatBot";
import { Suspense, useEffect, useState } from "react";
import { useLoading } from "@/contexts/LoadingContext";
// Remove Navbar import since it's now in layout
import Footer from "@/components/sections/Footer";
// Remove SEO import as it's not compatible with App Router

export default function Home() {
  const [contentVisible, setContentVisible] = useState(false);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    // Show loader for a minimum of time for dramatic effect (reduced to 1.5 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Add a small delay before showing content for smoother transition
      setTimeout(() => setContentVisible(true), 300);
    }, 1500);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // Add structured data for SEO via useEffect
  useEffect(() => {
    // Add structured data script for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Umar Shafique",
      "alternateName": "umarxdev",
      "jobTitle": "Python Full Stack Developer",
      "description": "Award-winning Python Full Stack Developer based in Lahore, Pakistan. Specializing in building robust, scalable web applications using Python frameworks (Django, Flask, FastAPI) and modern frontend technologies (React, Next.js). Expert in database design, API development, cloud deployment, and SEO optimization.",
      "image": "https://www.umarxdev.me/images/profile.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lahore",
        "addressRegion": "Punjab",
        "addressCountry": "Pakistan"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "31.5204",
        "longitude": "74.3587"
      },
      "url": "https://www.umarxdev.me",
      "email": "umer.shafiq0008@gmail.com",
      "telephone": "+923166622820",
      "sameAs": [
        "https://github.com/umarxdev",
        "https://linkedin.com/in/umarxdev",
        "https://twitter.com/umarxdev",
        "https://dev.to/umarxdev",
        "https://medium.com/@umarxdev"
      ],
      "knowsAbout": [
        "Python Development", "Django Framework", "Flask Framework", "FastAPI",
        "React Development", "Next.js Framework", "TypeScript",
        "PostgreSQL", "MongoDB", "Redis", "GraphQL",
        "Docker Containerization", "AWS Cloud Services", "REST API Design",
        "Microservices Architecture", "Serverless Computing",
        "Test-Driven Development", "Performance Optimization",
        "SEO Best Practices", "CI/CD Pipelines", "Agile Methodologies",
        "Web Accessibility", "Responsive Design", "Progressive Web Apps"
      ],
      "skills": {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "DefinedTerm",
              "name": "Backend Development",
              "description": "Python, Django, Flask, FastAPI, REST APIs, GraphQL, PostgreSQL"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "DefinedTerm",
              "name": "Frontend Development",
              "description": "React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS"
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "DefinedTerm",
              "name": "DevOps & Cloud",
              "description": "AWS, Docker, CI/CD, Vercel, Netlify, GitHub Actions, Serverless"
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "DefinedTerm",
              "name": "SEO & Performance",
              "description": "Web Vitals Optimization, SEO Best Practices, Performance Tuning, Analytics"
            }
          }
        ]
      },
      "makesOffer": {
        "@type": "Offer",
        "itemOffered": [
          {
            "@type": "Service",
            "name": "Custom Web Application Development",
            "description": "End-to-end web application development with Python and modern JavaScript frameworks"
          },
          {
            "@type": "Service",
            "name": "API Design & Development",
            "description": "RESTful and GraphQL API creation with Django, Flask or FastAPI"
          },
          {
            "@type": "Service",
            "name": "Database Architecture",
            "description": "Efficient database design and implementation for scalable applications"
          },
          {
            "@type": "Service",
            "name": "SEO Optimization",
            "description": "Technical SEO implementation and performance optimization for top rankings"
          }
        ]
      },
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance Developer",
        "description": "Independent software development services for clients worldwide"
      }
    };

    // Add structured data to document
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader">
          <div data-glitch="Loading..." className="glitch">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-700 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Suspense fallback={null}>
        <Hero skipLoader={true} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certificate />
        <Contact />
        <Footer/>
      </Suspense>
      
      {/* Removed Navbar from here as it's now in layout.tsx */}
      
      {/* Add ChatBot component */}
      <ChatBot />
      
      <footer className="p-6 text-center text-sm text-muted-foreground pb-20 md:pb-24">
        © {new Date().getFullYear()} My Portfolio. All rights reserved. | Based in Lahore, Pakistan
      </footer>
    </div>
  );
}
