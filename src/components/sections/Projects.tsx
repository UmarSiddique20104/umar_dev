"use client";

import { useEffect, useRef, useState } from "react";
import Glide from "@glidejs/glide";
import Image from "next/image";

// Define the Project type with additional fields for better presentation
type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  color: string;
  link?: string;
  github?: string;
  featured?: boolean;
};

// Enhanced projects data with images and colors
const projects: Project[] = [
  {
    id: 1,
    title: "The Global Resource Advisors",
    description: "The Global Resource Advisors project manages relationships, finances, and legal data for improved decision-making in MCA companies.  ",
    tags: ["Next.js", "TypeScript", "Tailwind ", "PostgresSQL"],
    image: "/images/projects/GRA.png",
    color: "from-purple-500/0 to-indigo-600/0",
    link: "https://global-resource-advisor-five.vercel.app/",
    github: "https://github.com/UmarSiddique20104/global-resource-advisor",
    featured: true
  },
  {
    id: 2,
    title: "Atypically Me",
    description: "A restaurant project showcasing location-based listings with chat, channels, and business owner  managed cafes",
    tags: ["Next.js", "TypeScript", "Google Map Api", "Advanced Search", "Tailwind ", "Restful API"],
    image: "/images/projects/AtypicallyMe.png",
    color: "from-emerald-500/0 to-teal-600/0",
    github: "https://github.com/UmarSiddique20104/atypically-me",
    link: "https://app.atypicallyme.com/"
  },
  {
    id: 3,
    title: "Infinity Graphics",
    description: "Created a vibrant website for Infinity Graphics, highlighting their UI/UX design skills and positive,innovative approach",
    tags: ["Next.js", "TypeScript", "Framer-motion", "Tailwind "],
    image: "/images/projects/IG.png",
    color: "from-blue-600/0 to-cyan-600/0",
    link: "https://infinity-ig-one.vercel.app/",
    github: "https://github.com/UmarSiddique20104/infinity-ig"
  },
  {
    id: 4,
    title: " Multi Build Machinery",
    description: "I created a website to showcase construction equipment, listing machines with details to help clients in the Middle East find safe, innovative, and sustainable solutions easily.",
    tags: ["Next.js", "TypeScript", "Framer-motion", "Tailwind "],
    image: "/images/projects/MB.png",
    color: "from-amber-500/0 to-orange-600/0",
    link: "https://multi-brand-beta.vercel.app/",
    featured: true,
    github: "https://github.com/UmarSiddique20104/multi-brand"

  },
  {
    id: 5,
    title: "Ontegra",
    description: "Ontegra is a modern facilities management company that uses AI and smart technologies to improve building maintenance, extend asset life, and ensure sustainable operations.",
    tags: ["Next.js", "TypeScript", "Framer-motion", "Tailwind ", "Restful API"],
    image: "/images/projects/Ontegra.png",
    color: "from-pink-500/0 to-rose-600/0",
    github: "https://github.com/UmarSiddique20104/Ontegra",
    link: "https://ontegra-eight.vercel.app/",
    featured: true
  },
  {
    id: 6,
    title: "MC Wraps",
    description: "Developed a dynamic website for MC WRAPS, focused on racing car maintenance and services",
    tags: ["React", "Framer-motion", "Tailwind "],
    image: "/images/projects/MC.png",
    color: "from-red-500/0 to-rose-600/0",
    github: "https://github.com/UmarSiddique20104/MC_Wraps",
    featured: true,
    link: "https://mc-wraps.vercel.app/"
  },
  {
    id: 7,
    title: "Desinoir",
    description: "Crafted a captivating website for Desinior, a design agency specializing in Product, UI/UX, and Branding, to elevate digital presence for startups and brands.",
    tags: ["Next.js", "TypeScript", "Framer-motion", "Tailwind ", "Restful API"],
    image: "/images/projects/Desinior.png",
    color: "from-red-500/0 to-rose-600/0",
    github: "https://github.com/UmarSiddique20104/Desinoir",
    featured: true,
    link: "https://desinoir.com/en"
  },
];

export default function Projects() {
  const glideRef = useRef<HTMLDivElement>(null);
  const glideInstance = useRef<Glide | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let mounted = true;
    let currentGlide: Glide | null = null;

    const initGlide = () => {
      if (!glideRef.current || !mounted) return;

      const handleMoveAfter = () => {
        if (mounted && currentGlide) {
          setActiveIndex(currentGlide.index);
        }
      };

      try {
        currentGlide = new Glide(glideRef.current, {
          type: 'carousel',
          perView: 3,
          focusAt: 'center',
          gap: 20,
          autoplay: 3000,
          hoverpause: true,
          animationDuration: 300,
          rewind: false,
          breakpoints: {
            1400: { perView: 2.5, gap: 20 },
            1200: { perView: 2, gap: 20 },
            992: { perView: 1.5, gap: 15 },
            768: { perView: 1.2, gap: 15 },
            576: { perView: 1, gap: 10, peek: { before: 30, after: 30 } },
            480: { perView: 1, gap: 10, peek: { before: 20, after: 20 } }
          }
        });

        // Bind events
        currentGlide.on('mount.after', () => {
          if (mounted) {
            setActiveIndex(currentGlide?.index || 0);
          }
        });

        currentGlide.on('move.after', handleMoveAfter);

        // Mount the carousel
        currentGlide.mount();

        // Update reference
        glideInstance.current = currentGlide;
      } catch (error) {
        console.error('Error initializing Glide:', error);
      }
    };

    initGlide();

    // Cleanup function
    return () => {
      mounted = false;
      if (glideInstance.current) {
        try {
          // Remove event listeners first
          glideInstance.current.destroy();
        } catch (error) {
          console.error('Error destroying Glide instance:', error);
        }
      }
    };
  }, []); // Empty dependency array since we only want to initialize once

  // Function to go to a specific slide
  const goToSlide = (index: number) => {
    if (glideInstance.current) {
      glideInstance.current.go(`=${index}`);
    }
  };

  // Keep the toggle function for potential keyboard shortcuts or other accessibility features
  const toggleAutoplay = () => {
    if (!glideInstance.current) return;

    if (isPaused) {
      // Resume autoplay
      glideInstance.current.settings.autoplay = 3000;
      glideInstance.current.update();
      setIsPaused(false);
    } else {
      // Pause autoplay
      glideInstance.current.settings.autoplay = false;
      glideInstance.current.update();
      setIsPaused(true);
    }
  };

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background decoration - more responsive */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
        <div className="absolute -top-[200px] sm:-top-[300px] md:-top-[400px] -right-[200px] sm:-right-[300px] md:-right-[400px] 
                      w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] 
                      rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute -bottom-[200px] sm:-bottom-[300px] md:-bottom-[400px] -left-[200px] sm:-left-[300px] md:-left-[400px] 
                      w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] 
                      rounded-full bg-primary/20 blur-3xl"></div>
      </div>

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="mb-8 sm:mb-10 md:mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-6 tracking-tight">Featured Projects</h2>
        </div>

        {/* Tools Card - Added before the project gallery */}
        <div className="mb-16">
          <div className="max-w-sm w-full mx-auto  rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] bg-card/60 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group">
            <div className="h-[15rem] md:h-[20rem] rounded-xl z-40 bg-accent dark:bg-[rgba(40,40,40,0.70)] [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]">
              <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
                <div className="flex flex-row flex-shrink-0 justify-center items-center gap-2">
                  {/* Figma icon */}
                  <div className="rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] h-8 w-8 circle-1">
                    <svg className="h-4 w-4" viewBox="0 0 512 512" clipRule="evenodd" fillRule="evenodd" imageRendering="optimizeQuality" textRendering="geometricPrecision" shapeRendering="geometricPrecision" xmlns="http://www.w3.org/2000/svg">
                      <rect ry="105.042" rx="104.187" height="512" width="512" fill="#CC9B7A"></rect>
                      <path d="M318.663 149.787h-43.368l78.952 212.423 43.368.004-78.952-212.427zm-125.326 0l-78.952 212.427h44.255l15.932-44.608 82.846-.004 16.107 44.612h44.255l-79.126-212.427h-45.317zm-4.251 128.341l26.91-74.701 27.083 74.701h-53.993z" fillRule="nonzero" fill="#1F1F1E"></path>
                    </svg>
                  </div>

                  {/* GitHub icon */}
                  <div className="rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] h-12 w-12 circle-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" className="h-6 w-6 dark:text-white" viewBox="0 0 24 24" strokeWidth="0" fill="currentColor" stroke="currentColor">
                      <path d="M9.75 14a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 .75-.75Zm4.5 0a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 .75-.75Z"></path>
                      <path d="M12 2c2.214 0 4.248.657 5.747 1.756.136.099.268.204.397.312.584.235 1.077.546 1.474.952.85.869 1.132 2.037 1.132 3.368 0 .368-.014.733-.052 1.086l.633 1.478.043.022A4.75 4.75 0 0 1 24 15.222v1.028c0 .529-.309.987-.565 1.293-.28.336-.636.653-.966.918a13.84 13.84 0 0 1-1.299.911l-.024.015-.006.004-.039.025c-.223.135-.45.264-.68.386-.46.245-1.122.571-1.941.895C16.845 21.344 14.561 22 12 22c-2.561 0-4.845-.656-6.479-1.303a19.046 19.046 0 0 1-1.942-.894 14.081 14.081 0 0 1-.535-.3l-.144-.087-.04-.025-.006-.004-.024-.015a13.16 13.16 0 0 1-1.299-.911 6.913 6.913 0 0 1-.967-.918C.31 17.237 0 16.779 0 16.25v-1.028a4.75 4.75 0 0 1 2.626-4.248l.043-.022.633-1.478a10.195 10.195 0 0 1-.052-1.086c0-1.331.282-2.498 1.132-3.368.397-.406.89-.717 1.474-.952.129-.108.261-.213.397-.312C7.752 2.657 9.786 2 12 2Zm-8 9.654v6.669a17.59 17.59 0 0 0 2.073.98C7.595 19.906 9.686 20.5 12 20.5c2.314 0 4.405-.594 5.927-1.197a17.59 17.59 0 0 0 2.073-.98v-6.669l-.038-.09c-.046.061-.095.12-.145.177-.793.9-2.057 1.259-3.782 1.259-1.59 0-2.738-.544-3.508-1.492a4.323 4.323 0 0 1-.355-.508h-.344a4.323 4.323 0 0 1-.355.508C10.704 12.456 9.555 13 7.965 13c-1.725 0-2.989-.359-3.782-1.259a3.026 3.026 0 0 1-.145-.177Zm6.309-1.092c.445-.547.708-1.334.851-2.301.057-.357.087-.718.09-1.079v-.031c-.001-.762-.166-1.26-.43-1.568l-.008-.01c-.341-.391-1.046-.689-2.533-.529-1.505.163-2.347.537-2.824 1.024-.462.473-.705 1.18-.705 2.32 0 .605.044 1.087.135 1.472.092.384.231.672.423.89.365.413 1.084.75 2.657.75.91 0 1.527-.223 1.964-.564.14-.11.268-.235.38-.374Zm2.504-2.497c.136 1.057.403 1.913.878 2.497.442.545 1.134.938 2.344.938 1.573 0 2.292-.337 2.657-.751.384-.435.558-1.151.558-2.361 0-1.14-.243-1.847-.705-2.319-.477-.488-1.318-.862-2.824-1.025-1.487-.161-2.192.139-2.533.529-.268.308-.437.808-.438 1.578v.02c.002.299.023.598.063.894Z"></path>
                    </svg>
                  </div>

                  {/* Next.js icon */}
                  <div className="h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] circle-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" width="28" className="h-8 w-8 dark:text-white">
                      <path fill="currentColor" d="M26.153 11.46a6.888 6.888 0 0 0-.608-5.73 7.117 7.117 0 0 0-3.29-2.93 7.238 7.238 0 0 0-4.41-.454 7.065 7.065 0 0 0-2.41-1.742A7.15 7.15 0 0 0 12.514 0a7.216 7.216 0 0 0-4.217 1.346 7.061 7.061 0 0 0-2.603 3.539 7.12 7.12 0 0 0-2.734 1.188A7.012 7.012 0 0 0 .966 8.268a6.979 6.979 0 0 0 .88 8.273 6.89 6.89 0 0 0 .607 5.729 7.117 7.117 0 0 0 3.29 2.93 7.238 7.238 0 0 0 4.41.454 7.061 7.061 0 0 0 2.409 1.742c.92.404 1.916.61 2.923.604a7.215 7.215 0 0 0 4.22-1.345 7.06 7.06 0 0 0 2.605-3.543 7.116 7.116 0 0 0 2.734-1.187 7.01 7.01 0 0 0 1.993-2.196 6.978 6.978 0 0 0-.884-8.27Zm-10.61 14.71c-1.412 0-2.505-.428-3.46-1.215.043-.023.119-.064.168-.094l5.65-3.22a.911.911 0 0 0 .464-.793v-7.86l2.389 1.36a.087.087 0 0 1 .046.065v6.508c0 2.952-2.491 5.248-5.257 5.248ZM4.062 21.354a5.17 5.17 0 0 1-.635-3.516c.042.025.115.07.168.1l5.65 3.22a.928.928 0 0 0 .928 0l6.898-3.93v2.72a.083.083 0 0 1-.034.072l-5.711 3.255a5.386 5.386 0 0 1-4.035.522 5.315 5.315 0 0 1-3.23-2.443ZM2.573 9.184a5.283 5.283 0 0 1 2.768-2.301V13.515a.895.895 0 0 0 .464.793l6.897 3.93-2.388 1.36a.087.087 0 0 1-.08.008L4.52 16.349a5.262 5.262 0 0 1-2.475-3.185 5.192 5.192 0 0 1 .527-3.98Zm19.623 4.506-6.898-3.93 2.388-1.36a.087.087 0 0 1 .08-.008l5.713 3.255a5.28 5.28 0 0 1 2.054 2.118 5.19 5.19 0 0 1-.488 5.608 5.314 5.314 0 0 1-2.39 1.742v-6.633a.896.896 0 0 0-.459-.792Zm2.377-3.533a7.973 7.973 0 0 0-.168-.099l-5.65-3.22a.93.93 0 0 0-.928 0l-6.898 3.93V8.046a.083.083 0 0 1 .034-.072l5.712-3.251a5.375 5.375 0 0 1 5.698.241 5.262 5.262 0 0 1 1.865 2.28c.39.92.506 1.93.335 2.913ZM9.631 15.009l-2.39-1.36a.083.083 0 0 1-.046-.065V7.075c.001-.997.29-1.973.832-2.814a5.297 5.297 0 0 1 2.231-1.935 5.382 5.382 0 0 1 5.659.72 4.89 4.89 0 0 0-.168.093l-5.65 3.22a.913.913 0 0 0-.465.793l-.003 7.857Zm1.297-2.76L14 10.5l3.072 1.75v3.5L14 17.499l-3.072-1.75v-3.5Z"></path>
                    </svg>
                  </div>

                  {/* Framer icon */}
                  <div className="rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] h-12 w-12 circle-4">
                    <svg className="h-6 w-6" viewBox="0 0 287.56 191" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" id="Layer_1">
                      <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" gradientTransform="matrix(1, 0, 0, -1, 0, 192)" y2="91.45" x2="260.34" y1="101.45" x1="62.34" id="linear-gradient">
                          <stop stopColor="#0064e1" offset="0"></stop>
                          <stop stopColor="#0064e1" offset="0.4"></stop>
                          <stop stopColor="#0073ee" offset="0.83"></stop>
                          <stop stopColor="#0082fb" offset="1"></stop>
                        </linearGradient>
                        <linearGradient gradientUnits="userSpaceOnUse" gradientTransform="matrix(1, 0, 0, -1, 0, 192)" y2="126" x2="41.42" y1="53" x1="41.42" id="linear-gradient-2">
                          <stop stopColor="#0082fb" offset="0"></stop>
                          <stop stopColor="#0064e0" offset="1"></stop>
                        </linearGradient>
                      </defs>
                      <path d="M31.06,126c0,11,2.41,19.41,5.56,24.51A19,19,0,0,0,53.19,160c8.1,0,15.51-2,29.79-21.76,11.44-15.83,24.92-38,34-52l15.36-23.6c10.67-16.39,23-34.61,37.18-47C181.07,5.6,193.54,0,206.09,0c21.07,0,41.14,12.21,56.5,35.11,16.81,25.08,25,56.67,25,89.27,0,19.38-3.82,33.62-10.32,44.87C271,180.13,258.72,191,238.13,191V160c17.63,0,22-16.2,22-34.74,0-26.42-6.16-55.74-19.73-76.69-9.63-14.86-22.11-23.94-35.84-23.94-14.85,0-26.8,11.2-40.23,31.17-7.14,10.61-14.47,23.54-22.7,38.13l-9.06,16c-18.2,32.27-22.81,39.62-31.91,51.75C84.74,183,71.12,191,53.19,191c-21.27,0-34.72-9.21-43-23.09C3.34,156.6,0,141.76,0,124.85Z" fill="#0081fb"></path>
                      <path d="M24.49,37.3C38.73,15.35,59.28,0,82.85,0c13.65,0,27.22,4,41.39,15.61,15.5,12.65,32,33.48,52.63,67.81l7.39,12.32c17.84,29.72,28,45,33.93,52.22,7.64,9.26,13,12,19.94,12,17.63,0,22-16.2,22-34.74l27.4-.86c0,19.38-3.82,33.62-10.32,44.87C271,180.13,258.72,191,238.13,191c-12.8,0-24.14-2.78-36.68-14.61-9.64-9.08-20.91-25.21-29.58-39.71L146.08,93.6c-12.94-21.62-24.81-37.74-31.68-45C107,40.71,97.51,31.23,82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78Z" fill="url(#linear-gradient)"></path>
                      <path d="M82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78C38.61,71.62,31.06,99.34,31.06,126c0,11,2.41,19.41,5.56,24.51L10.14,167.91C3.34,156.6,0,141.76,0,124.85,0,94.1,8.44,62.05,24.49,37.3,38.73,15.35,59.28,0,82.85,0Z" fill="url(#linear-gradient-2)"></path>
                    </svg>
                  </div>

                  {/* React icon */}
                  <div className="rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] h-8 w-8 circle-5">
                    <svg className="h-4 w-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
                      <path fill="url(#prefix__paint0_radial_980_20147)" d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"></path>
                      <defs>
                        <radialGradient gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)" gradientUnits="userSpaceOnUse" r="1" cy="0" cx="0" id="prefix__paint0_radial_980_20147">
                          <stop stopColor="#9168C0" offset=".067"></stop>
                          <stop stopColor="#5684D1" offset=".343"></stop>
                          <stop stopColor="#1BA1E3" offset=".672"></stop>
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* Animated vertical line */}
                <div className="h-40 w-px absolute top-20 m-auto z-40 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move">
                  <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
                    <div className="absolute inset-0">
                      <span className="inline-block bg-black dark:bg-white bit bit-1"></span>
                      <span className="inline-block bg-black dark:bg-white bit bit-2"></span>
                      <span className="inline-block bg-black dark:bg-white bit bit-3"></span>
                      <span className="inline-block bg-black dark:bg-white bit bit-4"></span>
                      <span className="inline-block bg-black dark:bg-white bit bit-5"></span>
                      <span className="inline-block bg-black dark:bg-white bit bit-6"></span>
                      <span className="inline-block bg-black dark:bg-white bit bit-7"></span>
                      <span className="inline-block bg-black dark:bg-white bit bit-8"></span>
                      <span className="inline-block bg-black dark:bg-white bit bit-9"></span>
                      <span className="inline-block bg-black dark:bg-white bit bit-10"></span>
                      <span className="inline-block bg-black dark:bg-white bit bit-11"></span>
                      <span className="inline-block bg-black dark:bg-white bit bit-12"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="relative glide-container pb-12 sm:pb-16 md:pb-20">
          <div className="glide" ref={glideRef}>
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {projects.map((project, index) => (
                  <li
                    key={project.id}
                    className="glide__slide"
                    onMouseEnter={() => setIsHovering(index)}
                    onMouseLeave={() => setIsHovering(null)}
                  >
                    <div className={`card overflow-hidden transition-all duration-500 h-full flex flex-col 
                      ${isHovering === index ? 'shadow-2xl shadow-primary/20 scale-[1.02]' : 'shadow-lg'}`}
                    >
                      {/* Project Image with Gradient Overlay - Responsive heights */}
                      <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden group">
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} 
                          opacity-10 z-10 transition-opacity duration-500 
                          ${isHovering === index ? 'opacity-70' : 'opacity-90'}`}
                        />
                        <div className="absolute inset-0 bg-black/20 z-20" />
                        <Image
                          src={project.image || "/images/projects/placeholder.jpg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110"
                          sizes="(max-width: 480px) 100vw, (max-width: 768px) 80vw, (max-width: 1200px) 40vw, 33vw"
                          priority={index < 2} // Prioritize loading first two images
                        />
                        {project.featured && (
                          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 bg-black/80 text-white text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded">
                            Featured
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-30">
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 drop-shadow-md truncate">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      {/* Project Info - More responsive paddings */}
                      <div className="p-4 sm:p-6 flex-grow flex flex-col">
                        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 flex-grow line-clamp-3 sm:line-clamp-4">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-accent text-accent-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center mt-auto">
                          <div className="flex gap-3 sm:gap-4">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium hover:text-primary transition-colors"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                >
                                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                                GitHub
                              </a>
                            )}
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium hover:text-primary transition-colors"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                >
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                  <polyline points="15 3 21 3 21 9"></polyline>
                                  <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                                Demo
                              </a>
                            )}
                          </div>

                          <button
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
                              transition-all duration-300 border border-primary/30
                              ${isHovering === index ? 'bg-primary text-white' : 'bg-background hover:bg-primary/10'}`}
                            aria-label="View details"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              className="sm:w-5 sm:h-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsive Controls */}
            <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-2 sm:gap-3 z-20">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => goToSlide(index)}
                  className={`w-8 sm:w-12 h-1 sm:h-1.5 rounded-full transition-all duration-300
                    ${index === activeIndex
                      ? 'bg-primary w-16 sm:w-20'
                      : 'bg-muted hover:bg-muted-foreground/50'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Swipe Hint */}
            <div className="absolute -bottom-12 left-0 right-0 flex items-center justify-center text-muted-foreground">
              <div className="flex items-center gap-2 text-sm sm:text-base animate-pulse">

                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-[swipe_1.5s_ease-in-out_infinite]"
                  >
                    <path d="M19 12H5" />
                    <path d="m12 5-7 7 7 7" />
                  </svg>
                  swipe
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-[swipe_1.5s_ease-in-out_infinite]"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
