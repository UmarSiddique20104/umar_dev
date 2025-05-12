"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Certificate {
  id: number;
  title: string;
  institution: string;
  date: string;
  link: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Front-End Developer",
    institution: "Virtuenetz",
    date: "22/01/2024",
    link: "https://drive.google.com/file/d/118qlxgPs0Aj0qZCdPEG-CQn_NK6dCb38/view?pli=1"
  },
  {
    id: 2,
    title: "Mern Stack Developer",
    institution: "Mercury Sols",
    date: "13/07/2024",
    link: "https://drive.google.com/file/d/11F37J0aUiXha4Q10NBgDRXCNDXsmBl0c/view"
  }
];

export default function Certificates() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('certificates');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="certificates" className="py-16 md:py-24">
      <div className="container px-4 sm:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 relative inline-block">
            <span className="relative z-10">Honours and Awards</span>
            <motion.span
              className="absolute bottom-0 left-0 w-full h-2 bg-primary/20 -z-10"
              initial={{ scaleX: 0 }}
              animate={isVisible ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto perspective-1000">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                rotateX: 5,
                rotateY: 5,
                z: 50,
                transition: { duration: 0.2 }
              }}
              className="group certificate-card transform-style-3d"
            >
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-card border border-border rounded-lg shadow-lg transition-all duration-300 
                         hover:shadow-2xl hover:border-primary/50 relative overflow-hidden backdrop-blur-sm
                         bg-opacity-80 hover:bg-opacity-100"
              >
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 opacity-10"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path
                      fill="currentColor"
                      d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"
                    />
                  </svg>
                </motion.div>

                <div className="mb-4 text-primary relative z-10">
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      rotateZ: [0, -5, 5, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="w-12 h-12 relative"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-full h-full drop-shadow-lg"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M16.5 3.5a2.5 2.5 0 0 1 2.5 2.5v12a2.5 2.5 0 0 1-2.5 2.5h-9a2.5 2.5 0 0 1-2.5-2.5V6a2.5 2.5 0 0 1-2.5-2.5h9Z" />
                      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                      <path d="M8 13h8" />
                      <path d="M8 17h5" />
                      <path d="M8 9h2" />
                    </svg>
                  </motion.div>
                </div>

                <div className="transform-z-20">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    {cert.institution}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {cert.date}
                  </p>
                </div>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                  whileHover={{
                    background: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(var(--primary-rgb), 0.15), transparent 100%)"
                  }}
                />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
