"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    program: "Weight Training",
    plan: "Standard Access",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        program: "Weight Training",
        plan: "Standard Access",
        message: "",
      });
      
      // Auto clear success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section ref={ref} id="contact" className="relative py-24 bg-brand-dark overflow-hidden">
      {/* Accent lightings */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-orange uppercase mb-3 block">
            Get in touch
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Contact S-27 Gym
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Left Column: Contact info & Google Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-between gap-8"
          >
            {/* Contact details card */}
            <div className="glass rounded-3xl p-6 sm:p-8 border border-white/5 space-y-6 flex-1 glow-blue-sm">
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-white mb-2">
                Gym Headquarters
              </h3>
              <p className="text-sm text-gray-400 font-semibold mb-6">
                Have questions about our plans, coaches, or amenities? Visit our physical location in Berhampur or reach out directly.
              </p>

              <div className="space-y-5">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-gray-400">Location</h4>
                    <p className="text-sm font-bold text-gray-200 mt-1 leading-snug">
                      S-27 Gym, Near Medical Square, Berhampur, Odisha, 760001
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-gray-400">Phone</h4>
                    <p className="text-sm font-bold text-gray-200 mt-1">
                      **
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-gray-400">Email Address</h4>
                    <p className="text-sm font-bold text-gray-200 mt-1">
                      <a href="mailto:info@s27gym.com" className="hover:text-brand-blue transition-colors">
                        info@s27gym.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-gray-400">Opening Hours</h4>
                    <p className="text-sm font-bold text-gray-200 mt-1 leading-snug">
                      Mon - Sat: 5:00 AM - 10:00 PM <br />
                      Sunday: 6:00 AM - 12:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Styled Map Embed */}
            <div className="h-[200px] sm:h-[230px] rounded-3xl overflow-hidden border border-white/5 shadow-lg relative group">
              <iframe
                title="S-27 Gym Berhampur Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.5042854932204!2d84.79258957608249!3d19.325593881931804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d6205cf9f5f07%3A0xe4a4eb23961db63b!2sBerhampur%2C%20Odisha!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(1.2)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Column: Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex"
          >
            <div className="bg-brand-card/50 border border-white/5 rounded-3xl p-6 sm:p-10 flex flex-col justify-between w-full glow-orange-sm">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold uppercase text-white mb-2">
                  Send an Enquiry
                </h3>
                <p className="text-sm text-gray-400 font-semibold">
                  Get a free trial session or book a consultation with our coaches. Fill out the form and our team will call you back within 24 hours.
                </p>
              </div>

              {/* Form Status Notification */}
              {isSuccess && (
                <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center gap-3 text-green-400">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                    Enquiry Sent! Our team will contact you shortly.
                  </span>
                </div>
              )}

              {/* Form Inputs */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name-input" className="text-xs uppercase font-extrabold tracking-wider text-gray-400">Full Name *</label>
                    <input
                      suppressHydrationWarning
                      id="name-input"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Mohanty"
                      className="w-full bg-[#161616] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone-input" className="text-xs uppercase font-extrabold tracking-wider text-gray-400">Phone Number *</label>
                    <input
                      suppressHydrationWarning
                      id="phone-input"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 98765 43210"
                      className="w-full bg-[#161616] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label htmlFor="email-input" className="text-xs uppercase font-extrabold tracking-wider text-gray-400">Email Address *</label>
                    <input
                      suppressHydrationWarning
                      id="email-input"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. ramesh@gmail.com"
                      className="w-full bg-[#161616] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                    />
                  </div>

                  {/* Program Dropdown Selection */}
                  <div className="space-y-1.5">
                    <label htmlFor="program-select" className="text-xs uppercase font-extrabold tracking-wider text-gray-400">Program Interest</label>
                    <select
                      suppressHydrationWarning
                      id="program-select"
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="w-full bg-[#161616] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange transition-all cursor-pointer"
                    >
                      <option value="Weight Training">Weight Training</option>
                      <option value="Cardio Training">Cardio Training</option>
                      <option value="Yoga & Mind">Yoga & Mind</option>
                      <option value="Zumba Dance">Zumba Dance</option>
                      <option value="Personal Training">Personal Training</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {/* Membership Dropdown Selection */}
                  <div className="space-y-1.5">
                    <label htmlFor="plan-select" className="text-xs uppercase font-extrabold tracking-wider text-gray-400">Membership Tier</label>
                    <select
                      suppressHydrationWarning
                      id="plan-select"
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                      className="w-full bg-[#161616] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-orange transition-all cursor-pointer"
                    >
                      <option value="Basic Access">Basic Access</option>
                      <option value="Standard Access">Standard Access (Popular)</option>
                      <option value="Premium VIP Access">Premium VIP Access</option>
                    </select>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label htmlFor="message-textarea" className="text-xs uppercase font-extrabold tracking-wider text-gray-400">Special Requests / Message</label>
                  <textarea
                    suppressHydrationWarning
                    id="message-textarea"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your fitness level or specific goals..."
                    className="w-full bg-[#161616] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  suppressHydrationWarning
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 bg-brand-orange hover:bg-brand-orange-hover disabled:bg-brand-orange/70 text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-300 hover:translate-y-[-2px] shadow-lg glow-orange cursor-pointer"
                >
                  {isSubmitting ? (
                    "Sending Request..."
                  ) : (
                    <>
                      Submit Request
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
