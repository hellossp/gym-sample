"use client";

import React from "react";
import { Dumbbell, HeartPulse, Flame, Music, UserCheck, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

const PROGRAMS = [
  {
    title: "Weight Training",
    description: "Build strength, increase bone density, and develop lean muscle mass with our expert-guided routines.",
    icon: Dumbbell,
    color: "orange",
    accentColor: "border-brand-orange/20 hover:border-brand-orange group-hover:glow-orange-sm",
    iconBg: "bg-brand-orange/15 text-brand-orange",
  },
  {
    title: "Cardio Training",
    description: "Enhance your cardiovascular endurance, burn calories, and improve heart health using state-of-the-art machines.",
    icon: HeartPulse,
    color: "blue",
    accentColor: "border-brand-blue/20 hover:border-brand-blue group-hover:glow-blue-sm",
    iconBg: "bg-brand-blue/15 text-brand-blue",
  },
  {
    title: "Yoga & Mind",
    description: "Improve flexibility, muscle tone, core strength, balance, and mental clarity through guided mindfulness practices.",
    icon: Flame,
    color: "orange",
    accentColor: "border-brand-orange/20 hover:border-brand-orange group-hover:glow-orange-sm",
    iconBg: "bg-brand-orange/15 text-brand-orange",
  },
  {
    title: "Zumba Dance",
    description: "A fun-filled, energetic dance workout combining Latin music and high-energy choreography to burn maximum calories.",
    icon: Music,
    color: "blue",
    accentColor: "border-brand-blue/20 hover:border-brand-blue group-hover:glow-blue-sm",
    iconBg: "bg-brand-blue/15 text-brand-blue",
  },
  {
    title: "Personal Training",
    description: "Work one-on-one with our certified elite coaches to design a customized plan tailored exactly to your body's goals.",
    icon: UserCheck,
    color: "orange",
    accentColor: "border-brand-orange/20 hover:border-brand-orange group-hover:glow-orange-sm",
    iconBg: "bg-brand-orange/15 text-brand-orange",
  },
];

export default function Programs() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleLearnMore = (e: React.MouseEvent<HTMLAnchorElement>, programName: string) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      // Find the select dropdown in the contact form
      const selectElement = document.getElementById("program-select") as HTMLSelectElement | null;
      if (selectElement) {
        selectElement.value = programName;
        // Trigger React state update if necessary (standard dispatch event)
        const event = new Event("change", { bubbles: true });
        selectElement.dispatchEvent(event);
      }
      
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="programs" className="relative py-24 bg-brand-dark overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-orange uppercase mb-3 block">
            Our Programs
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Fitness For Everyone
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
        </div>

        {/* Card Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
        >
          {PROGRAMS.map((program, idx) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className={`group relative flex flex-col justify-between p-8 rounded-2xl bg-brand-card/65 border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:bg-brand-card/90 ${
                  program.color === "orange"
                    ? "hover:border-brand-orange/30 hover:shadow-[0_0_25px_rgba(255,90,54,0.08)]"
                    : "hover:border-brand-blue/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.08)]"
                }`}
              >
                <div>
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${program.iconBg}`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold uppercase text-white mb-4 group-hover:text-brand-orange transition-colors">
                    {program.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 font-medium leading-relaxed mb-8">
                    {program.description}
                  </p>
                </div>

                {/* Learn More link */}
                <a
                  href="#contact"
                  onClick={(e) => handleLearnMore(e, program.title)}
                  className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-brand-orange transition-colors hover:text-white mt-auto group/btn"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
