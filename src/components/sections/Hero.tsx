"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, CSSProperties } from "react";
import LiveClock from '@/components/LiveClock';

// Inline ShinyText component to avoid creating a separate file
function ShinyText({
  text,
  disabled = false,
  speed = 3,
  className = '',
  ...props
}: {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  [key: string]: any;
}) {
  // ...ShinyText implementation...
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled) return;

    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();

    // Calculate position relative to the element
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const maskSize = 150;
  const maskPosition = {
    '--mask-position-x': `${position.x - maskSize / 2}px`,
    '--mask-position-y': `${position.y - maskSize / 2}px`,
    '--mask-size': `${maskSize}px`,
    '--animation-speed': `${speed}s`,
  } as CSSProperties;

  return (
    <span
      className={`relative inline-block overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <span className="relative z-10">{text}</span>
      <span
        className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          WebkitMask: disabled ? 'none' : 'radial-gradient(circle, #000 20%, transparent 70%)',
          WebkitMaskSize: 'var(--mask-size)',
          WebkitMaskPosition: `var(--mask-position-x) var(--mask-position-y)`,
          WebkitMaskRepeat: 'no-repeat',
          ...maskPosition,
        }}
      >
        {text}
      </span>
    </span>
  );
}

// Add a new GlitchText component
function GlitchText({ text }: { text: string }) {
  return (
    <div className="glitch-wrapper inline-block relative">
      <div className="glitch" data-text={text}>{text}</div>
    </div>
  );
}

export default function Hero({ skipLoader = false }: { skipLoader?: boolean }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(!skipLoader);

  useEffect(() => {
    // If skipLoader is true, don't show the loader
    if (skipLoader) {
      setShowLoader(false);
      setIsLoaded(true);
    } else {
      // Original loader logic
      const timer = setTimeout(() => {
        setShowLoader(false);
        setTimeout(() => setIsLoaded(true), 300);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [skipLoader]);

  // Only show the loader if we're not skipping it
  if (showLoader) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader">
          <div data-glitch="Loading..." className="glitch">Loading...</div>
        </div>
      </div>
    );
  }

  // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.35, 0, 0.25, 1],
        delay: 0.1 * custom
      }
    })
  };

  // Animation variants for photo container
  const photoVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.3,
        duration: 0.8
      }
    }
  };

  // Animation variants for buttons
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.6 + (0.1 * custom)
      }
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 h-screen">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left content column - text and buttons */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left z-10 pt-16 md:pt-0">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {/* Live Clock Component */}
              <motion.div
                className="mb-6 max-w-[280px] mx-auto md:mx-0"
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6 }
                  }
                }}
              >
                <LiveClock />
              </motion.div>

              {/* Main heading with highlight effect */}
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-4"
                variants={textVariants}
                custom={0}
              >
                <span className="text-primary relative inline-block">
                  <motion.span
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                    className="absolute bottom-2 left-0 h-[6px] bg-primary/20 rounded-full -z-10"
                  />
                  M. Umar Siddique
                </span>
              </motion.h1>

              {/* Animated role title with glitch effect */}
              <motion.h2
                className="text-xl md:text-2xl mb-2 text-foreground/80"
                style={{ fontSize: '30px' }}
                variants={textVariants}
                custom={1}
              >
                <GlitchText text="Full Stack Mern Developer" />
              </motion.h2>

              {/* Specialization with fade-in */}
              <motion.p
                className="text-lg md:text-xl mb-6 text-primary/80 font-medium"
                variants={textVariants}
                custom={2}
              >
                Specializing in MERN Stack, Web & Mobile Development
              </motion.p>

              {/* Buttons with staggered animation */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <motion.div
                  variants={buttonVariants}
                  custom={0}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    href="#projects"
                    className="group bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors inline-block"
                  >
                    <ShinyText text="View Projects" speed={2} />
                  </Link>
                </motion.div>

                <motion.div
                  variants={buttonVariants}
                  custom={1}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <a
                    href="images/assets/MYResume.pdf"
                    download
                    className="group bg-accent text-accent-foreground px-6 py-3 rounded-md hover:bg-accent/80 transition-colors flex items-center gap-2"
                  >
                    <motion.svg
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </motion.svg>
                    <ShinyText text="Download CV" speed={2} />
                  </a>
                </motion.div>

                <motion.div
                  variants={buttonVariants}
                  custom={2}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    href="#contact"
                    className="group flex items-center gap-2 text-primary hover:text-primary/80 transition-colors px-1 py-3"
                  >
                    <ShinyText text="Let's talk!" speed={2.5} />
                    <motion.svg
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </motion.svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right side - Full height image - Now hidden on mobile with hidden md:block classes */}
          <motion.div
            className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-20 md:opacity-100 -z-10 md:z-0 hidden md:block"
            initial={{ opacity: 0, x: 50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative h-full w-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-10" />
              <Image
                src="/images/hero/BG.png"
                alt="M. Umar Shafique - Python Developer specializing in Django and Web Automation, shown in a professional portrait against a gradient background"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center w-full h-full"
                quality={100}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
