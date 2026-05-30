"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Dumbbell, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TRANSFORMATIONS = [
  {
    name: "Ramesh Senapati",
    metric: "Lost 18 kg fat",
    period: "6 Months",
    program: "Cardio & Diet plan",
    before: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Pooja Das",
    metric: "Gained 6 kg lean muscle",
    period: "4 Months",
    program: "Weight Training",
    before: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600&auto=format&fit=crop",
  },
];

export default function Gallery() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  // Slider State (0 to 100 percent)
  const [sliderPos, setSliderPos] = useState<number>(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <section ref={ref} id="transformations" className="relative py-24 bg-brand-dark overflow-hidden">
      {/* Background ambient blurs */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-orange uppercase mb-3 block">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Transformation Gallery
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
          <p className="text-gray-400 mt-5 max-w-xl mx-auto text-sm sm:text-base font-semibold">
            See the real results achieved by our members. Drag the slider to compare their incredible before and after fitness journeys.
          </p>
        </div>

        {/* Highlight Section: Interactive Before/After Slider */}
        <div className="max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative h-[300px] sm:h-[450px] md:h-[500px] w-full rounded-3xl overflow-hidden border border-white/5 shadow-2xl select-none"
          >
            {/* BEFORE Image (Always underneath) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop"
                alt="Before transformation"
                fill
                className="object-cover pointer-events-none"
                sizes="100vw"
                unoptimized
              />
              {/* Before Label */}
              <div className="absolute bottom-6 left-6 z-10 bg-black/60 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white">
                Before
              </div>
            </div>

            {/* AFTER Image (Clipped on top) */}
            <div
              className="absolute inset-0 w-full h-full z-10"
              style={{
                clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop"
                alt="After transformation"
                fill
                className="object-cover pointer-events-none"
                sizes="100vw"
                unoptimized
              />
              {/* After Label */}
              <div className="absolute bottom-6 right-6 z-10 bg-brand-orange/90 border border-brand-orange/20 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white">
                After S-27 Gym
              </div>
            </div>

            {/* Vertical Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-brand-orange z-10 pointer-events-none shadow-[0_0_10px_rgba(255,90,54,0.5)]"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Center Handle Knob */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-orange border-4 border-brand-dark text-white flex items-center justify-center shadow-lg font-black text-xs select-none">
                ↔
              </div>
            </div>

            {/* Native Slider Input Overlay (Invisible, handles drags/swipes) */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              aria-label="Drag to compare before and after images"
            />
          </motion.div>
        </div>

        {/* Alternative Grid of Success Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TRANSFORMATIONS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass rounded-3xl p-6 sm:p-8 border border-white/5 flex flex-col sm:flex-row gap-6 items-center hover:border-white/10 transition-colors"
            >
              {/* Split Before/After Mini Thumbnail grid */}
              <div className="relative w-full sm:w-[180px] h-[180px] shrink-0 rounded-2xl overflow-hidden flex border border-white/5">
                <div className="relative w-1/2 h-full border-r border-black/40">
                  <Image
                    src={item.before}
                    alt="Before thumbnail"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute bottom-1 left-2 text-[8px] font-black uppercase text-white bg-black/50 px-1 py-0.5 rounded">Before</div>
                </div>
                <div className="relative w-1/2 h-full">
                  <Image
                    src={item.after}
                    alt="After thumbnail"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute bottom-1 right-2 text-[8px] font-black uppercase text-brand-orange bg-brand-dark/80 px-1 py-0.5 rounded">After</div>
                </div>
              </div>

              {/* Success Metadata */}
              <div className="flex flex-col justify-center text-center sm:text-left">
                <span className="text-[10px] font-extrabold tracking-widest text-brand-orange uppercase mb-1 flex items-center justify-center sm:justify-start gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {item.program}
                </span>
                <h3 className="text-xl font-bold uppercase text-white mb-2">
                  {item.name}
                </h3>
                
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-sm font-semibold text-gray-200">
                    <Flame className="w-4 h-4 text-brand-orange shrink-0" />
                    <span>Result: <strong className="text-white">{item.metric}</strong></span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-sm font-semibold text-gray-200">
                    <Dumbbell className="w-4 h-4 text-brand-blue shrink-0" />
                    <span>Duration: <strong className="text-white">{item.period}</strong></span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
