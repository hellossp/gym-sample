"use client";

import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TESTIMONIALS = [
  {
    name: "Amit Mohapatra",
    role: "Local Business Owner",
    achievement: "Lost 15 kg & Gained Strength",
    quote: "Joining S-27 Gym was the best decision of my life. The trainers are incredibly supportive, and the equipment is state-of-the-art. I've lost 15kg and feel healthier than ever! The community here is unmatched.",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Priya Mishra",
    role: "Software Engineer",
    achievement: "Toned Body & Better Stamina",
    quote: "As a working professional, the flexible timings and customized training programs have been a lifesaver. Sneha's Zumba classes are high-energy and super fun! It's the highlight of my stressful workdays.",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Rahul Sahu",
    role: "College Student",
    achievement: "Gained 8 kg Lean Muscle",
    quote: "The personal training here is top-notch. Vikram helped me structure my nutrition and strength training, helping me gain 8kg of muscle in a short timeframe. Highly recommend S-27 Gym to anyone in Berhampur!",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0); // -1 for left, 1 for right

  // Auto slide testimonial every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    }),
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section ref={ref} id="testimonials" className="relative py-24 bg-brand-dark overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-orange uppercase mb-3 block">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            What Our Members Say
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto min-h-[380px] sm:min-h-[320px] flex items-center justify-center">
          
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            suppressHydrationWarning
            className="hidden sm:flex absolute left-0 lg:-left-16 z-20 w-12 h-12 rounded-2xl bg-brand-card/60 hover:bg-brand-orange border border-white/5 items-center justify-center text-gray-400 hover:text-white transition-all duration-300 shadow-lg cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            suppressHydrationWarning
            className="hidden sm:flex absolute right-0 lg:-right-16 z-20 w-12 h-12 rounded-2xl bg-brand-card/60 hover:bg-brand-orange border border-white/5 items-center justify-center text-gray-400 hover:text-white transition-all duration-300 shadow-lg cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial Active Card */}
          <div className="w-full px-12 sm:px-16 overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="glass rounded-3xl p-8 sm:p-10 border border-white/5 relative flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left glow-blue-sm"
              >
                {/* Quote Decorative Icon */}
                <Quote className="absolute top-6 right-8 w-16 h-16 text-white/5 pointer-events-none" />

                {/* Avatar Column */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content Column */}
                <div className="flex-1 flex flex-col">
                  {/* Stars */}
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {Array.from({ length: current.stars }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-brand-orange text-brand-orange" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-base sm:text-lg font-medium italic text-gray-200 leading-relaxed mb-6">
                    "{current.quote}"
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px bg-white/5 mb-4" />

                  {/* Author Meta */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>
                      <h4 className="text-lg font-black uppercase text-white tracking-wider">
                        {current.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                        {current.role}
                      </p>
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-3 py-1 rounded-full w-fit mx-auto sm:mx-0">
                      {current.achievement}
                    </span>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2.5 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
              }}
              suppressHydrationWarning
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? "bg-brand-orange w-8 shadow-[0_0_8px_rgba(255,90,54,0.5)]"
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
