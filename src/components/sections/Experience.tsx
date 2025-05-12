"use client";

import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

function CompanyLogo({ company }: { company: string }) {
  const logoMap: { [key: string]: string } = {
    "Software Consulting": "Company logo for software development consulting services specializing in Python and automation solutions",
    "CloudTek": "CloudTek company logo - AI and cloud solutions provider",
    "Freelance": "Independent developer and consultant logo representing freelance work",
    "Web Solutions": "Web Solutions company logo - Full stack web development services"
  };

  return (
    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-accent">
      <Image
        src={`/images/companies/${company.toLowerCase().replace(" ", "-")}.svg`}
        alt={logoMap[company] || `${company} company logo`}
        width={32}
        height={32}
        className="object-contain"
      />
    </div>
  );
}

export default function Experience() {
  const [activeItem, setActiveItem] = useState<number>(1);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Experience data
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      role: "React Native Developer",
      company: "Code Gradients",
      period: "Nov 2024 - Present",
      description: [
        "Developed cross-platform mobile apps using React Native for iOS and Android",
        "Integrated Firebase for real-time database, authentication, and cloud functionality",
        "Worked closely with the Firabase team to build robust user experiences",
        "Ensured performance and stability through consistent testing and optimization"
      ],
      technologies: ["React Native", "JavaScript", "Firebase", "Redux", "REST API", "Backend"]
    },
    {
      id: 2,
      role: "React.js Developer",
      company: "VirtueNetz",
      period: "Jan 2024 - Nov 2024",
      description: [
        "Built dynamic web applications using React.js and Next.js",
        "Developed backend functionality and API integration for full-stack applications",
        "Used Tailwind CSS, Bootstrap, and Framer Motion for responsive and animated UIs",
        "Wrote clean, type-safe code using TypeScript and followed component-based architecture",
        "Integrated EJS for server-side rendering in some projects"
      ],
      technologies: ["React.js", "Next.js", "EJS", "Tailwind CSS", "Material UI (MUI)", "Framer Motion", "Bootstrap", "TypeScript", "Backend"]
    },
    {
      id: 3,
      role: "React.js Intern",
      company: "Mercury Sols",
      period: "Jul 2023 - Aug 2023",
      description: [
        "Assisted in developing UI components using React.js and integrating them with backend APIs",
        "Learned real-world development practices and contributed to production-ready features",
        "Fixed bugs, refactored code, and collaborated closely with senior developers",
        "Gained hands-on experience with version control and task tracking tools"
      ],
      technologies: ["React.js", "HTML", "CSS", "Git", "JavaScript"]
    }
  ];


  // Animation for experience cards on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      experienceCards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  // Add 3D tilt effect to active card
  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Make the tilt effect more subtle
      const rotateX = ((y - centerY) / 40) * -1;
      const rotateY = (x - centerX) / 40;

      card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1500px) rotateX(0) rotateY(0) translateZ(0)';
      card.style.transition = 'transform 0.5s ease';
    };

    card.addEventListener('mousemove', handleMouseMove as EventListener);
    card.addEventListener('mouseleave', handleMouseLeave as EventListener);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove as EventListener);
      card.removeEventListener('mouseleave', handleMouseLeave as EventListener);
    };
  }, [activeItem]);

  return (
    <section id="experience" className="py-16 container px-4 sm:px-6">
      <div className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center relative overflow-hidden">
          <span className="inline-block relative z-10 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[6px] sm:after:h-[8px] after:w-full after:bg-primary/20 after:-z-10">
            Work Experience
          </span>
        </h2>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-8 max-w-5xl mx-auto">
        {/* Timeline navigation sidebar */}
        <div ref={timelineRef} className="timeline-nav hidden md:block relative">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className={`timeline-item relative cursor-pointer mb-12 pl-12 transition-all duration-300 ease-in-out ${activeItem === exp.id
                ? 'text-primary font-medium'
                : 'text-muted-foreground hover:text-foreground'
                }`}
              onClick={() => setActiveItem(exp.id)}
            >
              <span
                className={`timeline-dot absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${activeItem === exp.id
                  ? 'border-primary bg-accent text-primary scale-125'
                  : 'border-muted-foreground bg-card'
                  }`}
              >
                {activeItem === exp.id && (
                  <span className="dot-pulse absolute inset-0 rounded-full"></span>
                )}
              </span>

              <div className="flex flex-col">
                <span className="text-sm font-medium">{exp.period}</span>
                <span className={`font-medium transition-all ${activeItem === exp.id ? 'text-foreground' : ''}`}>
                  {exp.company}
                </span>
                <span className="text-xs text-muted-foreground mt-1">{exp.role}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile timeline selector */}
        <div className="md:hidden flex overflow-x-auto pb-4 mb-6 timeline-nav-mobile gap-2">
          {experiences.map((exp) => (
            <button
              key={exp.id}
              className={`px-4 py-2 whitespace-nowrap rounded-full transition-all border ${activeItem === exp.id
                ? 'bg-primary text-primary-foreground font-medium border-primary/50'
                : 'bg-card text-foreground hover:bg-accent/50 border-border'
                }`}
              onClick={() => setActiveItem(exp.id)}
            >
              {exp.company}
            </button>
          ))}
        </div>

        {/* Experience details */}
        <div className="experience-details">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className={`experience-card opacity-0 transform transition-all duration-500 ease-in-out ${activeItem === exp.id
                ? 'block translate-y-0'
                : 'hidden translate-y-4'
                }`}
              ref={activeItem === exp.id ? cardRef : null}
            >
              <div className={`border border-border rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-500 experience-card-inner relative overflow-hidden ${theme === 'dark' ? 'experience-card-dark' : ''}`}>
                {/* Card top border that works in both light and dark themes */}
                <div className="absolute top-0 inset-x-0 h-1 card-top-border"></div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 relative">
                  <div className="flex flex-col space-y-1">
                    <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                    <p className="text-base text-muted-foreground">
                      <span className="font-medium text-foreground">{exp.company}</span>
                    </p>
                  </div>
                  <div className="sm:text-right mt-2 sm:mt-0">
                    <span className="text-sm px-3 py-1 rounded-full bg-accent text-foreground border border-border inline-block">
                      {exp.period}
                    </span>
                  </div>
                </div>

                <div className="mb-8 relative z-10">
                  <h4 className="text-sm uppercase tracking-wider mb-4 text-muted-foreground font-medium flex items-center">
                    <span className="mr-2 text-primary">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Responsibilities
                  </h4>
                  <ul className="space-y-3 pl-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start hover:translate-x-1 transition-transform">
                        <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 border border-primary/30">
                          <svg className="w-3 h-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10">
                  <h4 className="text-sm uppercase tracking-wider mb-4 text-muted-foreground font-medium flex items-center">
                    <span className="mr-2 text-primary">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3H4C3.44772 3 3 3.44772 3 4V9C3 9.55228 3.44772 10 4 10H9C9.55228 10 10 9.55228 10 9V4C10 3.44772 9.55228 3 9 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 3H15C14.4477 3 14 3.44772 14 4V9C14 9.55228 14.4477 10 15 10H20C20.5523 10 21 9.55228 21 9V4C21 3.44772 20.5523 3 20 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 14H15C14.4477 14 14 14.4477 14 15V20C14 20.5523 14.4477 21 15 21H20C20.5523 21 21 20.5523 21 20V15C21 14.4477 20.5523 14 20 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 14H4C3.44772 14 3 14.4477 3 15V20C3 20.5523 3.44772 21 4 21H9C9.55228 21 10 20.5523 10 20V15C10 14.4477 9.55228 14 9 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-xs rounded-md bg-accent/50 text-foreground border border-border hover:border-primary/30 transition-colors cursor-default"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Background design elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-shape opacity-5 transform -translate-y-1/4 translate-x-1/4 pointer-events-none">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40.5,-62.6C52.9,-55.7,63.6,-44.8,70.2,-31.7C76.8,-18.6,79.4,-3.3,76.3,10.8C73.2,24.8,64.4,37.7,53.4,47.9C42.4,58.1,29.1,65.6,14.6,69.8C0.1,74,-15.6,75,-30.2,70.8C-44.9,66.6,-58.5,57.3,-67.4,44.4C-76.3,31.5,-80.5,15.7,-79.1,0.8C-77.7,-14.1,-70.7,-28.3,-60.4,-38.8C-50.1,-49.4,-36.5,-56.5,-23.3,-62.8C-10,-69.1,2.8,-74.7,16.3,-73.4C29.8,-72.1,43.9,-64,54.2,-53.2C64.5,-42.4,73,-29,70.3,-16.7C67.6,-4.4,53.7,6.7,48.6,21.3C43.6,36,47.5,54.2,41.3,62.4C35.1,70.5,18.8,68.7,3.9,63.1C-11.1,57.6,-24.9,48.4,-32.9,37.5C-40.8,26.7,-42.9,14.1,-48.8,-0.4C-54.7,-14.9,-64.3,-31.2,-62.2,-44.4C-60.1,-57.6,-46.3,-67.7,-32.2,-73.7C-18.1,-79.8,-3.7,-81.8,9,-78.8C21.7,-75.7,31.8,-67.5,40.5,-62.6Z" transform="translate(100 100)" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-shape opacity-5 transform translate-y-1/4 -translate-x-1/4 pointer-events-none">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M47.7,-57.2C59,-47.3,64,-29.7,67.4,-11.5C70.9,6.7,72.8,25.4,64.2,37.9C55.7,50.4,36.6,56.6,18.1,62.2C-0.4,67.7,-18.4,72.6,-33.6,67.9C-48.8,63.2,-61.1,49,-68.2,32C-75.2,15.1,-76.9,-4.7,-70.9,-22.1C-64.8,-39.5,-50.9,-54.5,-35.3,-63.2C-19.7,-71.9,-2.3,-74.4,13.5,-69.9C29.2,-65.5,43.3,-54.1,47.7,-57.2Z" transform="translate(100 100)" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
