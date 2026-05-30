"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Dynamic scrolling helper
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("contact");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
        
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-brand-dark"
    >
      {/* 1. Full-Bleed Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/ChatGPT Image May 30, 2026, 01_27_16 PM.png"
          alt="S-27 Gym premium classy training"
          fill
          priority
          unoptimized
          className="object-cover object-center select-none pointer-events-none opacity-45 lg:opacity-70"
        />
        {/* Edge Gradient Overlays to Blend Into the Background and Maintain Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/70 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-dark to-transparent z-10" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand-dark to-transparent z-10" />
      </div>

      {/* Decorative glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none z-10" />

      {/* 2. Text Overlay Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 relative">
        <div className="max-w-2xl lg:max-w-3xl text-left">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center"
          >
            {/* Tagline Accent */}
            <motion.span
              variants={itemVariants}
              className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-blue uppercase mb-3 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
              Welcome to S-27 Gym
            </motion.span>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[0.95] mb-4"
            >
              <span className="block text-white">Be Fitter &</span>
              <span className="block text-brand-orange drop-shadow-[0_2px_10px_rgba(255,90,54,0.15)]">
                Happier
              </span>
            </motion.h1>

            {/* Sub-tagline */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-300 font-medium tracking-wide mb-8 max-w-xl"
            >
              Berhampur's Premium Fitness Destination
            </motion.p>

            {/* Checked items list */}
            <motion.ul variants={itemVariants} className="space-y-3.5 mb-10">
              {[
                "Modern & Advanced Equipment",
                "Certified & Experienced Trainers",
                "Personalized Workout & Diet Plans",
              ].map((text, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2
                    className={`w-5 h-5 shrink-0 ${
                      idx === 1 ? "text-brand-orange" : "text-brand-blue"
                    }`}
                  />
                  <span className="text-sm sm:text-base font-medium">{text}</span>
                </li>
              ))}
            </motion.ul>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-base font-extrabold tracking-wider uppercase rounded-full shadow-xl glow-orange transition-all duration-300 hover:translate-y-[-3px] group"
              >
                Join Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://wa.me/917008123456?text=Hi%20S-27%20Gym%2C%20I%20am%20interested%20in%20joining%20the%20gym.%20Please%20provide%20membership%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#25d366]/40 hover:border-[#25d366] bg-transparent hover:bg-[#25d366]/5 text-gray-200 hover:text-[#25d366] text-base font-extrabold tracking-wider uppercase rounded-full transition-all duration-300 hover:translate-y-[-3px] group"
              >
                <MessageCircle className="w-5 h-5 mr-2 text-[#25d366] group-hover:scale-110 transition-transform" />
                Whatsapp Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Wave Divider at Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 text-brand-dark fill-current"
        >
          <path d="M1200 120L0 120 0 0C300 80 900 80 1200 0Z" />
        </svg>
      </div>
    </section>
  );
}
