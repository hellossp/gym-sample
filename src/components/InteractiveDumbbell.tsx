"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Flame, Gauge, Dumbbell } from "lucide-react";
import { useInView } from "react-intersection-observer";

const WEIGHT_PRESETS = [
  { weight: 10, label: "Tone", difficulty: "Easy", color: "from-green-500 to-emerald-400", muscle: "Deltoids", calories: 4 },
  { weight: 20, label: "Build", difficulty: "Moderate", color: "from-blue-500 to-cyan-400", muscle: "Biceps", calories: 7 },
  { weight: 30, label: "Beast", difficulty: "Hard", color: "from-brand-orange to-orange-400", muscle: "Triceps & Chest", calories: 11 },
  { weight: 40, label: "Monster", difficulty: "Legendary", color: "from-red-600 to-brand-orange", muscle: "Full Upper Body", calories: 16 },
];

export default function InteractiveDumbbell() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const [weight, setWeight] = useState<number>(20);
  const [isLifting, setIsLifting] = useState<boolean>(false);
  const [liftCount, setLiftCount] = useState<number>(0);
  const [showGlow, setShowGlow] = useState<boolean>(false);

  // Find active preset info
  const activePreset = WEIGHT_PRESETS.find((p) => p.weight === weight) || WEIGHT_PRESETS[1];

  // Trigger interactive lift animation
  const handleLift = () => {
    if (isLifting) return;
    setIsLifting(true);
    setLiftCount((prev) => prev + 1);

    // After 0.4s (mid-lift), trigger a temporary peak glow
    setTimeout(() => {
      setShowGlow(true);
    }, 350);

    // End lift and landing shockwave
    setTimeout(() => {
      setIsLifting(false);
      setShowGlow(false);
    }, 850);
  };

  // Automatically do a gentle introduction lift when component enters viewport
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        handleLift();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  // Calculate plate dimensions based on index
  const getPlateHeight = (index: number) => 36 + index * 12;
  const getPlateY = (index: number) => 20 - (index * 6);

  // Left Plates: indices count down to position them from inner to outer
  const numPlates = Math.floor(weight / 10);
  const plateArray = Array.from({ length: numPlates });

  return (
    <section ref={ref} className="relative py-24 bg-black overflow-hidden border-t border-b border-white/5">
      {/* Dynamic ambient backgrounds */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none transition-all duration-1000" />
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none transition-all duration-700 ${showGlow ? "opacity-100 scale-125" : "opacity-0 scale-95"}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-orange uppercase mb-3 block">
            Interactive Zone
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Load Your Limit
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-medium max-w-lg mx-auto mt-3">
            Interact with the barbell below. Customize your plate load, pump the weight, and feel the energy.
          </p>
          <div className="w-16 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Dumbbell Workspace */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Main Interactive Stage */}
            <div className="relative w-full max-w-[500px] h-[320px] rounded-3xl bg-brand-card/30 border border-white/5 flex flex-col items-center justify-center overflow-hidden shadow-2xl glass glow-orange-sm">
              
              {/* Rep Counter Badge */}
              <div className="absolute top-6 left-6 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-brand-orange" />
                <span className="text-xs font-black uppercase text-gray-300 tracking-wider">
                  Virtual Reps: <span className="text-brand-orange">{liftCount}</span>
                </span>
              </div>

              {/* Peak Lift Glow Ring */}
              <AnimatePresence>
                {showGlow && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.3, scale: 1.1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    className="absolute w-[240px] h-[240px] rounded-full bg-gradient-to-r from-brand-orange to-brand-blue blur-2xl pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* DUMBBELL CONTAINER */}
              <motion.div
                animate={
                  isLifting
                    ? {
                        y: -50,
                        rotate: [-2, 4, -3, 0], // Smooth hand lift tilt simulation
                      }
                    : {
                        y: 0,
                        rotate: 0,
                      }
                }
                transition={
                  isLifting
                    ? {
                        y: { type: "spring", stiffness: 120, damping: 10 },
                        rotate: { duration: 0.7, ease: "easeInOut" },
                      }
                    : {
                        y: { type: "spring", stiffness: 150, damping: 14 },
                        rotate: { type: "spring", stiffness: 120, damping: 12 },
                      }
                }
                onClick={handleLift}
                className="relative cursor-pointer select-none group w-[320px] h-[160px] flex items-center justify-center"
              >
                {/* SVG Canvas for Dynamic Barbell */}
                <svg width="300" height="80" viewBox="0 0 300 80" fill="none" className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
                  <defs>
                    <linearGradient id="barbellSteel" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#94a3b8" />
                      <stop offset="25%" stopColor="#e2e8f0" />
                      <stop offset="50%" stopColor="#475569" />
                      <stop offset="75%" stopColor="#cbd5e1" />
                      <stop offset="100%" stopColor="#334155" />
                    </linearGradient>
                    <linearGradient id="barbellGrip" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    <linearGradient id="neonPlate" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ff7a5c" />
                      <stop offset="50%" stopColor="#ff5a36" />
                      <stop offset="100%" stopColor="#9a2307" />
                    </linearGradient>
                  </defs>

                  {/* Main Steel Bar */}
                  <rect x="30" y="37" width="240" height="6" rx="3" fill="url(#barbellSteel)" />

                  {/* Center Textured Grip */}
                  <rect x="90" y="34" width="120" height="12" rx="2" fill="url(#barbellGrip)" stroke="#475569" strokeWidth="1" />
                  
                  {/* Grip Knurling/Pattern Overlays */}
                  <line x1="110" y1="34" x2="110" y2="46" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
                  <line x1="130" y1="34" x2="130" y2="46" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
                  <line x1="150" y1="34" x2="150" y2="46" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
                  <line x1="170" y1="34" x2="170" y2="46" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
                  <line x1="190" y1="34" x2="190" y2="46" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />

                  {/* Heavy Collar Stoppers */}
                  <rect x="80" y="28" width="8" height="24" rx="2" fill="#475569" />
                  <rect x="212" y="28" width="8" height="24" rx="2" fill="#475569" />

                  {/* DYNAMIC LEFT PLATES */}
                  {plateArray.map((_, i) => {
                    const plateWidth = 10;
                    // Plates expand outward to the left from the collar at x=80
                    const posX = 80 - ((i + 1) * (plateWidth + 4));
                    const pHeight = getPlateHeight(i);
                    const pY = getPlateY(i);

                    return (
                      <motion.rect
                        key={`left-plate-${i}`}
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 140, damping: 12, delay: i * 0.05 }}
                        x={posX}
                        y={pY}
                        width={plateWidth}
                        height={pHeight}
                        rx="3"
                        fill="url(#neonPlate)"
                        style={{ originY: "center" }}
                      />
                    );
                  })}

                  {/* DYNAMIC RIGHT PLATES */}
                  {plateArray.map((_, i) => {
                    const plateWidth = 10;
                    // Plates expand outward to the right from the collar at x=212+8=220
                    const posX = 220 + (i * (plateWidth + 4));
                    const pHeight = getPlateHeight(i);
                    const pY = getPlateY(i);

                    return (
                      <motion.rect
                        key={`right-plate-${i}`}
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 140, damping: 12, delay: i * 0.05 }}
                        x={posX}
                        y={pY}
                        width={plateWidth}
                        height={pHeight}
                        rx="3"
                        fill="url(#neonPlate)"
                        style={{ originY: "center" }}
                      />
                    );
                  })}
                </svg>

                {/* Interactive Tooltip Glow */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-500 font-bold uppercase text-[10px] tracking-widest opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {isLifting ? "LIFTING..." : "CLICK BARBELL TO LIFT"}
                </div>
              </motion.div>

              {/* IMPACT SHOCKWAVES (Triggers on landing) */}
              <AnimatePresence>
                {!isLifting && liftCount > 0 && (
                  <>
                    <motion.div
                      key={`impact-1-${liftCount}`}
                      initial={{ scale: 0.3, opacity: 0.8 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="absolute bottom-[100px] w-6 h-6 rounded-full border border-brand-orange bg-brand-orange/10 pointer-events-none filter blur-[1px]"
                    />
                    <motion.div
                      key={`impact-2-${liftCount}`}
                      initial={{ scale: 0.5, opacity: 1 }}
                      animate={{ scale: 2.3, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
                      className="absolute bottom-[95px] w-[35px] h-[35px] rounded-full bg-brand-blue/10 pointer-events-none filter blur-[3px] border border-brand-blue/20"
                    />
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom presets selector */}
            <div className="mt-8 w-full max-w-[500px]">
              <p className="text-center text-xs font-black uppercase tracking-wider text-gray-400 mb-4">
                Select Load: <span className="text-brand-orange">{weight} KG</span>
              </p>
              
              <div className="grid grid-cols-4 gap-3">
                {WEIGHT_PRESETS.map((preset) => (
                  <button
                    key={preset.weight}
                    onClick={() => {
                      setWeight(preset.weight);
                      // Trigger a soft bump lift when loading new weights
                      setIsLifting(true);
                      setTimeout(() => setIsLifting(false), 300);
                    }}
                    className={`relative py-3 rounded-2xl border font-black uppercase text-xs tracking-wider transition-all duration-300 cursor-pointer overflow-hidden ${
                      weight === preset.weight
                        ? "border-brand-orange text-white bg-brand-orange/10 shadow-[0_0_12px_rgba(255,90,54,0.25)]"
                        : "border-white/5 text-gray-400 bg-brand-card/25 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {/* Glowing highlight indicator */}
                    {weight === preset.weight && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-orange" />
                    )}
                    <span className="block text-[9px] font-bold tracking-widest text-gray-500 mb-0.5">{preset.label}</span>
                    <span className="block text-sm font-black">{preset.weight} kg</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Info Display */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Card 1: Workout Power Output */}
            <div className="glass bg-brand-card/35 rounded-3xl p-6 border border-white/5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${activePreset.color} text-black font-black`}>
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Preset Program</span>
                  <h3 className="text-lg font-black uppercase text-white tracking-wider">{activePreset.label} Mode</h3>
                </div>
              </div>

              <div className="h-px bg-white/5" />

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Energy Burned</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-white">{activePreset.calories * liftCount}</span>
                    <span className="text-[9px] font-black uppercase text-gray-500">kcal</span>
                  </div>
                </div>

                <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Gauge className="w-4 h-4 text-brand-blue" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Difficulty</span>
                  </div>
                  <span className="text-sm font-black text-white uppercase tracking-wider">{activePreset.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Card 2: Interactive Target Details */}
            <div className="glass bg-brand-card/35 rounded-3xl p-6 border border-white/5 flex flex-col gap-4">
              <h4 className="text-xs font-black uppercase text-brand-orange tracking-widest">
                Target Muscle Activation
              </h4>

              <div className="flex items-center gap-4">
                {/* Visual Circle Percentage Meter */}
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="transparent"
                      stroke="url(#neonPlate)"
                      strokeWidth="6"
                      strokeDasharray={176}
                      animate={{ strokeDashoffset: 176 - (176 * (weight / 50)) }}
                      transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    />
                  </svg>
                  <span className="absolute text-xs font-black text-white">{Math.round((weight / 50) * 100)}%</span>
                </div>

                <div className="flex flex-col gap-1">
                  <h5 className="text-sm font-black uppercase text-white tracking-wider">
                    {activePreset.muscle} focus
                  </h5>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Loading {weight}kg recruits primary stabilizer muscles and forces intense activation across the {activePreset.muscle.toLowerCase()} group.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
