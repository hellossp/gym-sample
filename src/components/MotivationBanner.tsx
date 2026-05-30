"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Flame, Target, Shield } from "lucide-react";

const PILLARS = [
  {
    title: "Dedication",
    description: "Your fitness goals require commitment. The mindset you build inside S-27 Gym defines your outcome.",
    icon: Target,
    color: "orange",
    glow: "hover:shadow-[0_0_30px_rgba(255,90,54,0.15)] hover:border-brand-orange/30",
  },
  {
    title: "Discipline",
    description: "Success is the sum of small habits, practiced daily. We provide the equipment; you bring the resolve.",
    icon: Shield,
    color: "blue",
    glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-brand-blue/30",
  },
  {
    title: "Intensity",
    description: "Push past self-imposed limitations. Growth happens at the edge of your comfort zone.",
    icon: Flame,
    color: "orange",
    glow: "hover:shadow-[0_0_30px_rgba(255,90,54,0.15)] hover:border-brand-orange/30",
  },
];

export default function MotivationBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Map scroll position to translation values (Parallax effects)
  const yBg = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const xMarquee = useTransform(scrollYProgress, [0, 1], ["8%", "-25%"]);

  const { ref: viewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-0 lg:h-[700px] bg-black overflow-hidden flex items-center justify-center z-10"
    >
      {/* 1. Parallax Background Image Container */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 h-[124%] -top-[12%] w-full"
      >
        <Image
          src="https://images.unsplash.com/photo-1471286174240-e6458db7d57f?q=80&w=1200&auto=format&fit=crop"
          alt="Topless athlete sitting on barbell - S-27 Gym"
          fill
          unoptimized
          priority
          className="object-cover opacity-35 select-none pointer-events-none"
        />
        {/* Dark Radial Blend Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/40 to-brand-dark" />
        <div className="absolute inset-0 bg-radial-gradient(circle, transparent 30%, #050505 90%)" />
      </motion.div>

      {/* 2. Scroll-driven Marquee Text Behind Content (Middle Layer) */}
      <motion.div
        style={{ x: xMarquee }}
        className="absolute top-[45%] lg:top-[38%] left-0 right-0 whitespace-nowrap text-[13vw] font-black uppercase text-white/5 tracking-tighter leading-none select-none pointer-events-none z-10"
      >
        Push Your Limits • Be Fitter • Be Happier • S-27 Gym • No Pain No Gain •
      </motion.div>

      {/* 3. Foreground Content & Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Tagline heading */}
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-orange uppercase mb-4 block">
            Pillars of Fitness
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mb-16">
            The S-27 Gym Mindset
          </h2>
        </div>

        {/* Mindset Cards Grid */}
        <motion.div
          ref={viewRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto"
        >
          {PILLARS.map((pillar, idx) => {
            const PillarIcon = pillar.icon;
            const isOrange = pillar.color === "orange";
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className={`glass p-8 rounded-3xl border border-white/5 flex flex-col items-start text-left transition-all duration-300 ${pillar.glow}`}
              >
                {/* Glowing Icon Wrapper */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${
                  isOrange 
                    ? "bg-brand-orange/10 border-brand-orange/20 text-brand-orange" 
                    : "bg-brand-blue/10 border-brand-blue/20 text-brand-blue"
                }`}>
                  <PillarIcon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-3">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm font-medium text-gray-400 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
