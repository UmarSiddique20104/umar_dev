"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{success?: boolean, message?: string} | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/xldbpljq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject || "New Portfolio Contact Message",
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitResult({
          success: true,
          message: "Thank you! Your message has been sent successfully."
        });
        setFormData({ name: "", email: "", message: "", subject: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "Something went wrong. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="section">
      <div className="container max-w-4xl mx-auto">
        
        <div className="grid md:grid-cols-1 gap-12"></div>
          <div className="rotating-form-container max-w-lg mx-auto w-full">
        <input type="checkbox" id="form_toggle" className="form-toggle" />
        <div className="rotating-form">
          {/* Front Side - Contact Form */}
          <div className="form-front">
            <div className="form-details">Send Message</div>
            <form onSubmit={handleSubmit}>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name" 
            className="form-input m-2" 
            required
          />
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email" 
            className="form-input m-2" 
            required
          />
          <input 
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject" 
            className="form-input m-2" 
            required
          />
          <button 
            type="submit"
            className="form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
            </form>
            <span className="form-switch">
          Want to leave a longer message? 
          <label className="toggle-label" htmlFor="form_toggle">
            Detailed Message
          </label>
            </span>
            
            {submitResult && (
          <div className={`form-result ${submitResult.success ? "success" : "error"}`}>
            {submitResult.message}
          </div>
            )}
          </div>
          
          {/* Back Side - Detailed Message */}
          <div className="form-back">
            <div className="form-details ">Detailed Message</div>
            <form onSubmit={handleSubmit}>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="form-input form-textarea m-2"
            rows={6}
            required
          ></textarea>
          <button 
            type="submit"
            className="form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
            </form>
            <span className="form-switch">
          Go back to contact form? 
          <label className="toggle-label" htmlFor="form_toggle">
            Contact Form
          </label>
            </span>
            
            {submitResult && (
          <div className={`form-result ${submitResult.success ? "success" : "error"}`}>
            {submitResult.message}
          </div>
            )}
          </div>
        </div>
          </div>
        </div>
    </section>
  );
}