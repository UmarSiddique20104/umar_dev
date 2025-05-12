"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Define skill categories with logos and icons
interface Skill {
  name: string;
  logo: string;
  proficiency: number;
  color?: string;
  icon?: React.ReactNode; // Changed from JSX.Element to React.ReactNode
}

const frontendSkills: Skill[] = [
  {
    name: "HTML5",
    logo: "/images/skills/html5.svg",
    proficiency: 95,
    color: "#E34F26",
  },
  {
    name: "CSS3",
    logo: "/images/skills/css.svg",
    proficiency: 90,
    color: "#1572B6",
  },
  {
    name: "JavaScript",
    logo: "/images/skills/js.svg",
    proficiency: 88,
    color: "#F7DF1E"
  },
  {
    name: "TypeScript",
    logo: "/images/skills/typescript.svg",
    proficiency: 85,
    color: "#3178C6"
  },
  {
    name: "React.js",
    logo: "/images/skills/react.svg",
    proficiency: 92,
    color: "#61DAFB"
  },
  {
    name: "Next.js",
    logo: "/images/skills/nextjs.svg",
    proficiency: 85,
    color: "#000000"
  },
  {
    name: "React Native",
    logo: "/images/skills/react.svg",
    proficiency: 80,
    color: "#61DAFB"
  },
  {
    name: "Tailwind CSS",
    logo: "/images/skills/tailwindcss.svg",
    proficiency: 90,
    color: "#06B6D4"
  },
  {
    name: "Bootstrap",
    logo: "/images/skills/bootstrapsvg.svg",
    proficiency: 85,
    color: "#7952B3"
  },
  {
    name: "Framer Motion",
    logo: "/images/skills/Fm.svg",
    proficiency: 80,
    color: "#000000"
  },
  {
    name: "MUI (Material UI)",
    logo: "/images/skills/MUI.svg",
    proficiency: 80,
    color: "#0073e6"
  },
  {
    name: "Styled Components",
    logo: "/images/skills/StyleCom.svg",
    proficiency: 80,
    color: "#DB7093"
  }
];


const backendSkills: Skill[] = [
  {
    name: "Node.js",
    logo: "/images/skills/nodejs.svg",
    proficiency: 88,
    color: "#339933",
  },
  {
    name: "Express.js",
    logo: "/images/skills/express.svg",
    proficiency: 85,
    color: "#000000",
  },
  {
    name: "MongoDB",
    logo: "/images/skills/mongodb.svg",
    proficiency: 80,
    color: "#47A248",
  },
  {
    name: "Firebase",
    logo: "/images/skills/firebase.svg",
    proficiency: 78,
    color: "#FFCA28",
  },
];


const toolsSkills: Skill[] = [
  {
    name: "VS Code",
    logo: "/images/skills/vscode.svg",
    proficiency: 95,
    color: "#007ACC"
  },
  {
    name: "GitHub",
    logo: "/images/skills/github.svg",
    proficiency: 90,
    color: "#ffffff"
  },
  {
    name: "Git",
    logo: "/images/skills/git.svg",
    proficiency: 88,
    color: "#F1502F"
  },
  {
    name: "Postman",
    logo: "/images/skills/postman-icon.svg",
    proficiency: 87,
    color: "#FF6C37"
  },
  {
    name: "Figma",
    logo: "/images/skills/figma.svg",
    proficiency: 85,
    color: "#F24E1E"
  },
  {
    name: "Firebase Console",
    logo: "/images/skills/firebase.svg",
    proficiency: 80,
    color: "#FFCA28"
  },
  {
    name: "Open AI",
    logo: "/images/skills/openai.svg",
    proficiency: 97,
    color: "#10A37F"
  },

];


export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("frontend");

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

    const section = document.getElementById('skills');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="skills" className="py-16 md:py-24 container px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 relative overflow-hidden">
          <span className="inline-block relative z-10 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[6px] sm:after:h-[8px] after:w-full after:bg-primary/20 after:-z-10">
            Technical Skills
          </span>
        </h2>

      </motion.div>

      {/* Marquee skills section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12 overflow-hidden"
      >
        <div className="py-4 relative">
          <MarqueeSkills skills={[...frontendSkills, ...backendSkills, ...toolsSkills]} />
        </div>
      </motion.div>

      <div className="mb-10">
        <div className="flex justify-center flex-wrap gap-3 ">
          <CategoryButton
            active={activeCategory === "frontend"}
            onClick={() => setActiveCategory("frontend")}
            name="Frontend"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            }
          />
          <CategoryButton
            active={activeCategory === "backend"}
            onClick={() => setActiveCategory("backend")}
            name="Backend"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                <line x1="6" y1="10" x2="6" y2="14"></line>
                <line x1="10" y1="10" x2="10" y2="14"></line>
                <line x1="14" y1="10" x2="14" y2="14"></line>
                <line x1="18" y1="10" x2="18" y2="14"></line>
              </svg>
            }
          />
          <CategoryButton
            active={activeCategory === "tools"}
            onClick={() => setActiveCategory("tools")}
            name="Tools"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
            }
          />
        </div>
      </div>

      <div className="grid gap-8">
        {activeCategory === "frontend" && <SkillsCards skills={frontendSkills} isVisible={isVisible} />}
        {activeCategory === "backend" && <SkillsCards skills={backendSkills} isVisible={isVisible} />}
        {activeCategory === "tools" && <SkillsCards skills={toolsSkills} isVisible={isVisible} />}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-16 bg-accent/50 rounded-lg p-6 border border-border"
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Learning & Exploring
        </h3>
        <div className="flex flex-wrap gap-3">
          <TechBadge name="Zustand" />
          <TechBadge name="React Query" />
          <TechBadge name="JWT Auth" />
          <TechBadge name="Socket.IO" />
          <TechBadge name="Stripe API" />
        </div>
      </motion.div>
    </section>
  );
}

function MarqueeSkills({ skills }: { skills: Skill[] }) {
  // Duplicate skills array to create seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {duplicatedSkills.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="skill-mini-card mx-2 py-2 px-4 flex items-center gap-2 rounded-lg bg-card border border-border/50"
          >
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ color: skill.color }}
            >
              {skill.icon || (
                <div className="relative w-5 h-5">
                  <Image
                    src={skill.logo}
                    alt={`${skill.name} - Technology icon showing proficiency level of ${skill.proficiency}%`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
            <span className="text-sm font-medium">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsCards({ skills, isVisible }: { skills: Skill[], isVisible: boolean }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {skills.map((skill, index) => (
        <SkillCard
          key={skill.name}
          skill={skill}
          index={index}
          isVisible={isVisible}
        />
      ))}
    </div>
  );
}

function SkillCard({ skill, index, isVisible }: { skill: Skill, index: number, isVisible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.1 * index,
        duration: 0.4
      }}
      className="group relative bg-card border border-border/50 rounded-xl p-3 sm:p-4 md:p-6 hover:border-primary/20 transition-all duration-300"
    >
      <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
        <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0">
          <div
            className="w-full h-full rounded-lg bg-gradient-to-br from-accent to-accent/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            style={{ color: skill.color }}
          >
            {skill.icon || (skill.logo ? (
              <div className="relative w-7 h-7">
                <Image
                  src={skill.logo}
                  alt={`${skill.name} - Technology icon showing proficiency level of ${skill.proficiency}%`}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                <rect width="24" height="24" rx="12" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ))}
          </div>
          <div
            className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-primary/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ zIndex: -1 }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm sm:text-base mb-1.5 sm:mb-2 truncate">{skill.name}</h3>
          <div className="relative h-1 sm:h-1.5 w-full bg-accent/50 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                backgroundColor: skill.color || 'var(--primary)',
                width: isVisible ? `${skill.proficiency}%` : '0%',
              }}
              initial={{ width: '0%' }}
              animate={isVisible ? { width: `${skill.proficiency}%` } : {}}
              transition={{
                delay: 0.1 * index + 0.2,
                duration: 0.8,
                ease: "easeOut"
              }}
            />
          </div>
          <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-muted-foreground font-medium">Proficiency</span>
            <span className="font-semibold tabular-nums">{skill.proficiency}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryButton({
  active,
  onClick,
  name,
  icon
}: {
  active: boolean;
  onClick: () => void;
  name: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5  cursor-pointer
        ${active
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'bg-accent hover:bg-accent/80'
        }`}
    >
      {icon}
      {name}
    </button>
  );
}

function TechBadge({ name }: { name: string }) {
  // Add descriptive titles for technologies being learned
  const descriptions: { [key: string]: string } = {
    "Three.js": "3D graphics library for creating interactive web experiences",
    "WebGL": "Web Graphics Library for rendering 2D and 3D graphics",
    "GraphQL": "Query language for APIs and runtime for executing queries",
    "Rust": "Systems programming language focused on safety and performance",
    "WebAssembly": "Binary instruction format for stack-based virtual machines",
    "Machine Learning": "AI systems that can learn and improve from experience"
  };

  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
      title={descriptions[name] || name} // Add tooltip with description
      role="status"
      aria-label={`Currently learning ${name}: ${descriptions[name] || ""}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
      {name}
    </span>
  );
}
