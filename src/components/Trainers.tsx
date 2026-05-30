"use client";

import React from "react";
import Image from "next/image";
import { Award, Sparkles } from "lucide-react";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TRAINERS = [
  {
    name: "Vikram Rathore",
    role: "Head Strength Coach",
    cert: "ISSA Certified Specialist",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a25f1?q=80&w=600&auto=format&fit=crop",
    color: "orange",
    socials: { instagram: "#", twitter: "#" },
  },
  {
    name: "Sneha Mohanty",
    role: "Cardio & Zumba Specialist",
    cert: "ZES Certified Coach",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600&auto=format&fit=crop",
    color: "blue",
    socials: { instagram: "#", twitter: "#" },
  },
  {
    name: "Aman Senapati",
    role: "Elite Personal Trainer",
    cert: "ACSM Certified Trainer",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600&auto=format&fit=crop",
    color: "orange",
    socials: { instagram: "#", twitter: "#" },
  },
];

export default function Trainers() {
  const { ref, inView } = useInView({
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
    <section id="trainers" className="relative py-24 bg-brand-dark overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-orange uppercase mb-3 block">
            Expert Team
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Meet Our Professional Trainers
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
          <p className="text-gray-400 mt-5 max-w-xl mx-auto text-sm sm:text-base font-semibold">
            Our certified coaches are here to support, motivate, and guide you through every step of your fitness transformation.
          </p>
        </div>

        {/* Trainers Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-6xl mx-auto"
        >
          {TRAINERS.map((trainer, idx) => {
            const isOrange = trainer.color === "orange";
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="group relative h-[450px] rounded-3xl overflow-hidden border border-white/5 bg-brand-card/30 flex flex-col justify-end"
              >
                {/* Background Trainer Image */}
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
                  sizes="(max-w-7xl) 33vw, 100vw"
                  unoptimized
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Trainer Information */}
                <div className="relative z-10 p-6 sm:p-8 flex flex-col transition-transform duration-300 group-hover:translate-y-[-8px]">
                  
                  {/* Badge */}
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 w-fit ${
                    isOrange 
                      ? "bg-brand-orange/15 text-brand-orange border border-brand-orange/20" 
                      : "bg-brand-blue/15 text-brand-blue border border-brand-blue/20"
                  }`}>
                    {isOrange ? <Sparkles className="w-3.5 h-3.5" /> : <Award className="w-3.5 h-3.5" />}
                    {trainer.cert}
                  </span>

                  {/* Name */}
                  <h3 className="text-2xl font-black uppercase tracking-wide text-white mb-1 group-hover:text-brand-orange transition-colors">
                    {trainer.name}
                  </h3>

                  {/* Role */}
                  <p className="text-sm font-semibold text-gray-400 mb-4">
                    {trainer.role}
                  </p>

                  <div className="w-full h-px bg-white/10 mb-4" />

                  {/* Social Handles */}
                  <div className="flex items-center gap-4">
                    <a
                      href={trainer.socials.instagram}
                      className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-orange hover:text-white border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300"
                      aria-label="Instagram Profile"
                    >
                      <FaInstagram className="w-4 h-4" />
                    </a>
                    <a
                      href={trainer.socials.twitter}
                      className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-blue hover:text-white border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300"
                      aria-label="Twitter Profile"
                    >
                      <FaXTwitter className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
