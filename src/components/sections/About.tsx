import { useEffect, useRef } from 'react';

export default function About() {
  const profileRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // Add 3D tilt effect to profile card
  useEffect(() => {
    if (!profileRef.current) return;

    const card = profileRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition = 'transform 0.1s ease';
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease';
    };

    card.addEventListener('mousemove', handleMouseMove as EventListener);
    card.addEventListener('mouseleave', handleMouseLeave as EventListener);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove as EventListener);
      card.removeEventListener('mouseleave', handleMouseLeave as EventListener);
    };
  }, []);

  // Add skills section animation
  useEffect(() => {
    if (!skillsRef.current) return;

    // Initialize with visible state
    skillsRef.current.classList.add('animate-in');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.2 });

    observer.observe(skillsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section  sm:py-10 container px-4 sm:px-6">
      <div className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center relative overflow-hidden">
          <span className="inline-block relative z-10 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[6px] sm:after:h-[8px] after:w-full after:bg-primary/20 after:-z-10">
            About Me
          </span>
        </h2>
      </div>

      {/* Reversed order on mobile for better content flow - content first, then profile card */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 sm:gap-8 items-start">
        {/* About Text Content */}
        <div className="space-y-5 about-card-order-2 md:order-1">
          <p className="text-base sm:text-lg leading-relaxed border-l-4 border-primary pl-4 py-2 bg-accent/20 rounded-r-md">
            Passionate MERN Stack Developer with expertise in React, Next.js, and Node.js, specializing in building scalable web and mobile applications, RESTful APIs, and modern front-end interfaces. Experienced in using Tailwind CSS, Bootstrap, and Framer Motion to craft responsive and animated UIs. Skilled in integrating MongoDB and Firebase for real-time data and robust backend systems. Adept at translating complex requirements into clean, maintainable, and performance-optimized code.
          </p>

          <div
            ref={skillsRef}
            className="skills-card space-y-4 bg-accent p-4 sm:p-6 rounded-lg relative overflow-hidden"
          >
            <h3 className="font-semibold text-lg sm:text-xl relative">
              Key Skills
              <span className="absolute bottom-0 left-0 w-1/4 h-1 bg-primary"></span>
            </h3>

            <div className="space-y-4">
              <div className="skills-item bg-card/50 p-3 rounded-md">
                <h4 className="font-medium text-primary flex items-center gap-2 text-sm sm:text-base mb-1">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 7L12 3L4 7M20 7V17L12 21M20 7L12 11M12 21L4 17V7M12 21V11M4 7L12 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back-end Development:
                </h4>
                <p className="ml-6 sm:ml-7 text-sm sm:text-base">Extensive experience in building scalable systems and RESTful APIs using Node.js, Express.js, MongoDB, and Firebase, with a focus on clean architecture and real-time data handling.</p>
              </div>

              <div className="skills-item bg-card/50 p-3 rounded-md">
                <h4 className="font-medium text-primary flex items-center gap-2 text-sm sm:text-base mb-1">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 20V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                  Front-end Application Development:
                </h4>
                <p className="ml-6 sm:ml-7 text-sm sm:text-base">Expertise in developing modern, responsive UIs using React.js, Next.js, Tailwind CSS, Bootstrap, and Framer Motion, delivering seamless user experiences across web and mobile platforms.</p>
              </div>

              <div className="skills-item bg-card/50 p-3 rounded-md">
                <h4 className="font-medium text-primary flex items-center gap-2 text-sm sm:text-base mb-1">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Quality-Driven & Scalable Solutions:
                </h4>
                <p className="ml-6 sm:ml-7 text-sm sm:text-base">Focused on writing clean, maintainable, and performance-optimized code, translating complex requirements into reliable solutions that scale, ensuring long-term maintainability and user satisfaction.</p>
              </div>
            </div>

            {/* Binary background effect */}
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
              <div className="bit bit-1 bg-primary"></div>
              <div className="bit bit-2 bg-primary"></div>
              <div className="bit bit-3 bg-primary"></div>
              <div className="bit bit-4 bg-primary"></div>
              <div className="bit bit-5 bg-primary"></div>
              <div className="bit bit-6 bg-primary"></div>
            </div>
          </div>

          <p className="border-l-4 border-primary pl-4 italic relative overflow-hidden text-sm sm:text-base">
            <span className="relative z-10">Building scalable, high-performance apps with reliable, clean code for both front-end and back-end.</span>
            <span className="absolute inset-0 bg-primary/5 -z-10 transform -skew-x-12"></span>
          </p>
        </div>

        {/* Profile Info Card - Moved to right on desktop, appears first on mobile */}
        <div className="flex flex-col items-center space-y-6 about-card-order-1 md:order-2 mb-6 md:mb-0">
          <div
            ref={profileRef}
            className="about-profile-card bg-card p-5 sm:p-6 rounded-lg shadow-md w-full max-w-xs border border-border transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex flex-col sm:flex-row md:flex-col items-center gap-4 mb-6 card-icon">
              <div className="bg-gradient-to-br from-primary/30 to-primary/10 h-20 w-20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </div>
              <div className="text-center sm:text-left md:text-center">
                <h3 className="font-bold text-lg">MERN Stack Developer</h3>
                <p className="text-sm text-muted-foreground">Frontend | Backend | Database</p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 card-content">
              <div className="flex items-center gap-3 p-2 rounded-md bg-accent/50">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-md bg-accent/50">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>BS Computer Engineering</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-md bg-accent/50">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.25278V19.2528M12 6.25278L6.5 10.0528M12 6.25278L17.5 10.0528M6.5 10.0528V15.9472L12 19.2528L17.5 15.9472V10.0528M6.5 10.0528L12 13.3584L17.5 10.0528" />
                </svg>
                <span>2+ Years Experience</span>
              </div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
              <div className="circle-1 absolute bg-primary/10 w-6 h-6 rounded-full top-[15%] left-[10%]"></div>
              <div className="circle-2 absolute bg-primary/15 w-8 h-8 rounded-full top-[20%] right-[15%]"></div>
              <div className="circle-3 absolute bg-primary/10 w-5 h-5 rounded-full bottom-[25%] left-[20%]"></div>
              <div className="circle-4 absolute bg-primary/15 w-4 h-4 rounded-full bottom-[15%] right-[15%]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
