"use client";

import React from "react";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ADVANTAGES = [
  "Modern & Advanced Equipment",
  "Certified & Experienced Trainers",
  "Personalized Workout & Diet Plans",
  "Flexible Timings to Suit Your Routine",
  "Clean, Safe & Friendly Environment",
];

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    <section id="about" className="relative py-24 bg-brand-dark overflow-hidden">
      {/* Accent gradients */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with glow border */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            {/* Background Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-orange to-brand-blue rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
            
            {/* Image Container */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800&auto=format&fit=crop"
                alt="S-27 Gym Athlete"
                fill
                unoptimized
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Image floating badge */}
              <div className="absolute bottom-6 left-6 glass px-5 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                <span className="text-brand-orange text-2xl font-black">S-27</span>
                <div className="w-px h-8 bg-white/20" />
                <span className="text-xs uppercase text-gray-300 font-semibold tracking-wider">
                  Berhampur's best<br />fitness hub
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Small uppercase category */}
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-orange uppercase mb-3">
              About Us
            </span>

            {/* Main title */}
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mb-6">
              Why Choose S-27 Gym?
            </h2>

            {/* Description */}
            <p className="text-base text-gray-300 font-medium leading-relaxed mb-8">
              At S-27 Gym, we are committed to helping you achieve your fitness goals in a motivating, professional, and friendly environment. Whether you are looking to build strength, lose weight, or build endurance, we have the space, equipment, and experts to make it happen.
            </p>

            {/* Checked benefits list */}
            <div className="space-y-4 mb-10">
              {ADVANTAGES.map((advantage, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-brand-orange" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-200 font-semibold leading-snug">
                    {advantage}
                  </span>
                </div>
              ))}
            </div>

            {/* Action CTA Button */}
            <div>
              <button
                suppressHydrationWarning
                onClick={handleScrollToContact}
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/10 hover:border-brand-orange bg-transparent hover:bg-brand-orange/5 text-white text-base font-extrabold tracking-wider uppercase rounded-full transition-all duration-300 hover:translate-y-[-2px] group"
              >
                Know More About Us
                <ArrowRight className="w-5 h-5 ml-2 text-brand-orange transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
