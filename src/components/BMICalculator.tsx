"use client";

import React, { useState, useEffect } from "react";
import { Calculator, ArrowRight, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function BMICalculator() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(70);
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("");
  const [advice, setAdvice] = useState<string>("");
  const [colorClass, setColorClass] = useState<string>("");

  useEffect(() => {
    // Calculate BMI
    const heightInMeters = height / 100;
    const calculatedBmi = weight / (heightInMeters * heightInMeters);
    const roundedBmi = parseFloat(calculatedBmi.toFixed(1));
    setBmi(roundedBmi);

    // Set Status and Advice
    if (roundedBmi < 18.5) {
      setStatus("Underweight");
      setAdvice("Focus on our muscle-building Weight Training programs and a structured, high-protein caloric surplus diet.");
      setColorClass("text-yellow-400 bg-yellow-400/10 border-yellow-400/20");
    } else if (roundedBmi >= 18.5 && roundedBmi <= 24.9) {
      setStatus("Normal");
      setAdvice("Fantastic! You are in the healthy zone. Maintain your fitness with our conditioning, cardio, and yoga classes.");
      setColorClass("text-green-400 bg-green-400/10 border-green-400/20");
    } else if (roundedBmi >= 25 && roundedBmi <= 29.9) {
      setStatus("Overweight");
      setAdvice("You're slightly above the ideal range. We recommend a mix of HIIT Cardio Training, Zumba, and strength coaching.");
      setColorClass("text-brand-orange bg-brand-orange/10 border-brand-orange/20");
    } else {
      setStatus("Obese");
      setAdvice("We recommend consulting our elite Personal Trainers for a highly customized weight management and meal plan.");
      setColorClass("text-red-500 bg-red-500/10 border-red-500/20");
    }
  }, [height, weight]);

  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("contact");
    if (element) {
      // Pre-populate program select for personal training or general programs
      const selectElement = document.getElementById("program-select") as HTMLSelectElement | null;
      if (selectElement) {
        selectElement.value = bmi && bmi >= 30 ? "Personal Training" : "Weight Training";
        const event = new Event("change", { bubbles: true });
        selectElement.dispatchEvent(event);
      }

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
    <section ref={ref} id="calculator" className="relative py-24 bg-brand-dark overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-orange uppercase mb-3 block">
            Health Check
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            BMI Calculator
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-brand-card/50 border border-white/5 rounded-3xl p-6 sm:p-10 md:p-12 items-center max-w-5xl mx-auto glow-blue-sm"
        >
          {/* Left Column: Interactive Form Controls */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-xl sm:text-2xl font-bold uppercase text-white flex items-center gap-2">
              <Calculator className="w-6 h-6 text-brand-orange" />
              Calculate Your BMI
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed font-semibold">
              Easily measure your Body Mass Index (BMI) to see which weight category you fall into and receive personal fitness advice.
            </p>

            {/* Height Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-bold uppercase tracking-wider text-gray-300">
                <span>Height</span>
                <span className="text-brand-blue font-extrabold">{height} cm</span>
              </div>
              <input
                suppressHydrationWarning
                type="range"
                min="120"
                max="220"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
                className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-blue border border-white/5 focus:outline-none"
              />
            </div>

            {/* Weight Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-bold uppercase tracking-wider text-gray-300">
                <span>Weight</span>
                <span className="text-brand-orange font-extrabold">{weight} kg</span>
              </div>
              <input
                suppressHydrationWarning
                type="range"
                min="30"
                max="150"
                value={weight}
                onChange={(e) => setWeight(parseInt(e.target.value))}
                className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-orange border border-white/5 focus:outline-none"
              />
            </div>
          </div>

          {/* Right Column: Calculations Output Display */}
          <div className="lg:col-span-5 h-full flex flex-col justify-center">
            <div className="glass rounded-2xl p-6 sm:p-8 border border-white/5 flex flex-col items-center justify-center text-center glow-orange-sm">
              <span className="text-xs uppercase font-extrabold tracking-widest text-gray-400 mb-2">
                Your BMI Index
              </span>
              
              {/* BMI score display */}
              <div className="text-5xl sm:text-6xl font-black text-white tracking-tighter mb-4 flex items-baseline">
                {bmi}
              </div>

              {/* Status Badge */}
              <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border mb-6 ${colorClass}`}>
                {status}
              </div>

              {/* Slider Scale Indicators */}
              <div className="w-full h-1.5 bg-white/10 rounded-full flex overflow-hidden mb-6">
                <div className={`h-full w-[18.5%] bg-yellow-400/60 ${status === "Underweight" ? "bg-yellow-400" : ""}`} />
                <div className={`h-full w-[25%] bg-green-400/60 ${status === "Normal" ? "bg-green-400" : ""}`} />
                <div className={`h-full w-[15%] bg-brand-orange/60 ${status === "Overweight" ? "bg-brand-orange" : ""}`} />
                <div className={`h-full w-[41.5%] bg-red-500/60 ${status === "Obese" ? "bg-red-500" : ""}`} />
              </div>

              {/* Advice Box */}
              <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex gap-3 text-left mb-6">
                <Info className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-gray-300 leading-relaxed">
                  {advice}
                </p>
              </div>

              {/* CTA button */}
              <button
                suppressHydrationWarning
                onClick={handleScrollToContact}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all duration-300 hover:translate-y-[-2px] group"
              >
                Claim Free Training Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
