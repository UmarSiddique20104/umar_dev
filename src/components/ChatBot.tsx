"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessage: Message = {
  id: 0,
  text: "👋 Hi there! I'm your assistant. How can I help you with information about this portfolio?",
  sender: 'bot',
  timestamp: new Date()
};

const botResponses: { [key: string]: string } = {
  'hello': "Hello! I'm your portfolio assistant - ask me about Umar's skills, projects, or experience!",
  'hi': "Hi there! How can I help you learn about Umar's portfolio today?",
  "skills": "Umer's technical skills are strongly aligned with the modern MERN stack and frontend technologies:\n\n- Programming Languages: JavaScript, TypeScript\n- Frontend Libraries & Frameworks: React.js, Next.js, React Native\n- Styling: Tailwind CSS, Bootstrap, Styled Components, MUI\n- Animations: Framer Motion\n- Backend: Node.js, Express.js\n- Databases: MongoDB, Firebase\n- Tools & Platforms: GitHub, VS Code, OpenAI, Claude AI\n- Strong skills in component-based architecture, performance optimization, responsive UI/UX design, and integrating third-party APIs\n- Familiarity with real-world application development, dashboard systems, and full-stack architecture"
  ,
  "projects": "Umer's portfolio reflects hands-on experience across real-world, full-stack applications:\n- Full-featured CRM and dashboard systems using React.js, Next.js, and Node.js\n- E-commerce platforms with custom cart logic, admin panels, and secure authentication (MERN stack)\n- Mobile-first web apps and React Native-based hybrid apps\n- Real-time data dashboards using MongoDB, Firebase, and Express.js\n- UI-rich frontends styled with Tailwind CSS, MUI, Bootstrap, and Framer Motion\n- Seamless integration of third-party APIs and secure backend architecture\nAll projects emphasize responsive design, smooth UX, and optimized performance."
  ,
  "experience": "Umer is a skilled Full-Stack JavaScript Developer based in Lahore, Pakistan. He specializes in building responsive, high-performance web and mobile applications using the MERN stack (MongoDB, Express.js, React.js, Node.js) along with Next.js, TypeScript, and React Native. Umer has hands-on experience working with Tailwind CSS, MUI, Bootstrap, and Framer Motion to craft pixel-perfect UIs. He also brings backend proficiency in API development, authentication systems, and database management using MongoDB and Firebase. His work reflects strong problem-solving, attention to detail, and a deep understanding of modern web development practices."
  ,
  "contact": "You can contact Umar through the following details:\nEmail: m.umar201031@gmail.com\nPhone: +923019666491\nLinkedIn: @muhammad-umar-web-developer\nGitHub: @UmarSiddique20104\nLocation: Lahore, Pakistan\nUmer is available for MERN stack freelance projects, full-time positions, and consulting services."
  ,
  "who are you": "I'm Umar's portfolio assistant, here to help visitors explore his expertise as a MERN Stack Developer. Umar specializes in React.js, Next.js, Node.js, Express, and MongoDB, along with TypeScript, Tailwind CSS, and more."
  ,
  'what can you do': "I can provide information about Umar's skills, experience, projects, and contact details. Feel free to ask me anything about his professional background!",
  'who is umar': "Umar is a MERN stack developer specializing in building responsive, interactive, and scalable web applications using React, TypeScript, Tailwind CSS, and modern frontend technologies.",
  'education': "Umar has a background in computer science with a focus on software development and modern web and app technologies.",
  'help': "I can tell you about Umar's skills, projects, experience, or how to get in contact - what would you like to know?",
  'about umar': "Umar Siddique is a passionate MERN stack developer based in Lahore, Pakistan, with a strong focus on building modern, responsive, and high-performance web applications. He specializes in React, Next.js, TypeScript, Tailwind CSS, and Framer Motion, delivering clean, scalable, and user-friendly interfaces. Umar combines technical excellence with a keen eye for design and smooth user experience, helping businesses create impactful digital products.",
  'location': "Umar is based in Lahore, Pakistan and offers local services to businesses in Lahore as well as remote development services to clients worldwide.",
  'email': "You can reach Umar at m.umar201031@gmail.com",
  'phone': "You can contact Umar at +923019666491",
  'linkedin': "Connect with Umar on LinkedIn: https://www.linkedin.com/in/muhammad-umar-web-developer/",
  'awards': "Umar's honors and awards include:\n- Frontend Developer certification from Virtuenetz - January 2024\n- Mern Stack certification from Mercury Sols - July 2023",
  'certifications': "Umar's honors and awards include:\n- Frontend Developer certification from Virtuenetz - January 2024\n- Mern Stack certification from Mercury Sols - July 2023",
  'technologies': "Umar works with various technologies including  JavaScript, TypeScript, React.js, Next.js, PostgreSQL, MongoDB,FastAPI, and performance optimization tools. He's particularly skilled in Mern  development and modern JavaScript frameworks.",
  'databases': "Umar is proficient MongoDB databases.",
  'frontend': "Umar's frontend development skills include React.js and Next.js with TypeScript.",
  'backend': "Umar specializes in Mern backend development  and FastAPI frameworks.",
  'thanks': "You're welcome! Is there anything else you'd like to know about Umar's portfolio?",
  'thank you': "You're welcome! Feel free to ask if you need any other information about Umar's work or skills.",
  'goodbye': "Goodbye! Feel free to return if you have more questions about Umar's portfolio.",
  'bye': "Bye! Thank you for your interest in Umar's work.",
  'nice to meet you': "Nice to meet you too! I'm here to help you learn about Umar's professional background.",
  'how are you': "I'm functioning well, thank you for asking! I'm here to provide information about Umar's portfolio. How can I assist you?",
  'lahore': "Yes, Umar is based in Lahore, Pakistan. He offers local development services to businesses in Lahore and also works remotely with clients worldwide. His location in Lahore makes him an ideal choice for Pakistani businesses looking for skilled  web development services.",

  'hire': "You can hire Umar for development projects by contacting him via email at m.umar201031@gmail.com or phone at +923019666491. He's available for freelance work, consulting, and full-time positions, specializing in Mern development, web applications",
  'cost': "Umar offers competitive rates for his development services, with pricing based on project scope, complexity, and timeline requirements. Please contact him directly for a personalized quote that matches your specific project needs.",
  'portfolio': "This website showcases Umar's portfolio of work, featuring projects in Mern development, web application development, automation solutions, and more. Each project demonstrates his technical skills and problem-solving abilities. Browse the projects section to see examples of his work.",

};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const processUserMessage = async (userMessage: string) => {
    try {
      const response = await fetch('/api/chat/', {  // Ensuring trailing slash matches route
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      if (data.notRelevant) {
        return "I can only answer questions related to Umar's portfolio, skills, projects, experience, or contact information.";
      }

      return data.response || getFallbackResponse(userMessage);
    } catch (error) {
      console.error('Error:', error);
      return getFallbackResponse(userMessage);
    }
  };

  const getFallbackResponse = (userMessage: string) => {
    const lowerCaseMsg = userMessage.toLowerCase().trim();
    for (const [keyword, response] of Object.entries(botResponses)) {
      if (lowerCaseMsg.includes(keyword.toLowerCase())) {
        return response;
      }
    }
    return "I'm experiencing difficulties. Try asking about skills, projects, or experience!";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    setMessages(prev => [...prev, {
      id: prev.length,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }]);

    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const reply = await processUserMessage(currentInput);

      // Add bot response
      setMessages(prev => [...prev, {
        id: prev.length,
        text: reply,
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
      {/* Toggle Button - Enhanced with glass effect and better animation */}
      <button
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg 
          hover:scale-105 transition-all duration-300 ease-in-out backdrop-blur-sm cursor-pointer
          ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        style={{
          backgroundColor: "rgba(26, 42, 69, 0.9)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        }}
        aria-label="Toggle chat assistant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen &&
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-20 right-0 sm:right-4 w-[95vw] sm:w-[400px] h-[500px] sm:h-[600px] 
              rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden flex flex-col
              backdrop-blur-md"
            style={{
              backgroundColor: "rgba(54, 69, 79, 0.95)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
            }}
          >
            {/* Chat Header - Glass effect header */}
            <div className="p-4 border-b border-white/10 backdrop-blur-md"
              style={{ backgroundColor: "rgba(45, 58, 66, 0.95)" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10  flex items-center justify-center">
                    <Image
                      src="/images/assets/assistant-avatar.png"
                      alt="AI Assistant avatar - A friendly chat interface to help navigate the portfolio"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">Assistant</h3>
                    <span className="text-xs text-gray-300 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-1 inline-block animate-pulse"></span>
                      Online
                    </span>
                  </div>
                </div>
                <button
                  onClick={toggleChat}
                  className="w-10 h-10 flex items-center justify-center rounded-full 
                    hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                  aria-label="Close chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Messages - Improved message bubbles */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 chatbot-messages"
              style={{ backgroundColor: "rgba(54, 69, 79, 0.4)" }}>
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl shadow-lg backdrop-blur-sm
                      ${message.sender === 'user'
                        ? 'bg-primary/90 text-white rounded-tr-none'
                        : 'bg-gray-700/90 text-white rounded-tl-none border border-gray-600/50'
                      }`}
                  >
                    <p className="text-sm md:text-base break-words leading-relaxed">{message.text}</p>
                    <span className={`text-[10px] block mt-2 ${message.sender === 'user' ? 'text-white/80' : 'text-gray-300'
                      }`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input - Modern glass effect input */}
            <form onSubmit={handleSubmit}
              className="border-t border-white/10 p-4 backdrop-blur-md"
              style={{ backgroundColor: "rgba(45, 58, 66, 0.95)" }}>
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  required
                  placeholder={isLoading ? "Processing..." : "Type your message..."}
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700/50 rounded-full border border-gray-600/50
                    focus:outline-none focus:border-primary/50 text-white placeholder-gray-400
                    transition-colors duration-300"
                  value={inputValue}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 w-10 h-10 flex items-center justify-center rounded-full
                    bg-primary/20 hover:bg-primary/30 transition-colors duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  );
}
