"use client";

import React from "react";
import { Check, ShieldCheck, Zap, Crown } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MEMBERSHIP_PLANS = [
  {
    name: "Basic Access",
    tagline: "Essential fitness entry",
    icon: Zap,
    color: "blue",
    features: [
      "Access to Gym Floor & Cardio Zone",
      "Locker Room & Shower Access",
      "Free Fitness Assessment (1x)",
      "Standard App Workouts Tracking",
      "General Gym Instructor Support",
    ],
    buttonText: "Select Basic Plan",
  },
  {
    name: "Standard Access",
    tagline: "Most popular & best value",
    icon: ShieldCheck,
    color: "orange",
    popular: true,
    features: [
      "Everything in Basic Access",
      "Dedicated Trainer Consultation Support",
      "Basic Customized Diet Guidance",
      "Access to Selected Group Classes",
      "2x Free Guest Passes Monthly",
    ],
    buttonText: "Select Standard Plan",
  },
  {
    name: "Premium VIP Access",
    tagline: "The ultimate transformation experience",
    icon: Crown,
    color: "blue",
    features: [
      "Everything in Standard Access",
      "1-on-1 Elite Personal Training sessions",
      "Advanced Bi-weekly Body Composition Analysis",
      "Fully Customized Nutrition & Diet Plans",
      "Priority Locker & VIP Lounge Access",
      "Unlimited Access to All Group Classes",
    ],
    buttonText: "Select Premium Plan",
  },
];

export default function Membership() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const handleSelectPlan = (e: React.MouseEvent<HTMLButtonElement>, planName: string) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      // Find the select dropdown in the contact form
      const selectElement = document.getElementById("plan-select") as HTMLSelectElement | null;
      if (selectElement) {
        selectElement.value = planName;
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
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 15 },
    },
  };

  return (
    <section id="membership" className="relative py-24 bg-brand-dark overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-orange uppercase mb-3 block">
            Membership Plans
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Choose Your Plan
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
          <p className="text-gray-400 mt-5 max-w-xl mx-auto text-sm sm:text-base font-semibold">
            Choose the membership tier that fits your dedication. No upfront pricing shown—select a plan to enquire about exclusive offers and local rates.
          </p>
        </div>

        {/* 3-tier Plan Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch justify-center max-w-6xl mx-auto"
        >
          {MEMBERSHIP_PLANS.map((plan, idx) => {
            const PlanIcon = plan.icon;
            const isOrange = plan.color === "orange";
            
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-brand-card/75 border transition-all duration-300 ${
                  plan.popular
                    ? "border-brand-orange shadow-[0_10px_35px_rgba(255,90,54,0.08)] scale-105 z-10 hover:shadow-[0_10px_45px_rgba(255,90,54,0.12)] bg-brand-card/95"
                    : isOrange
                    ? "border-brand-orange/20 hover:border-brand-orange/50 hover:shadow-[0_10px_30px_rgba(255,90,54,0.06)]"
                    : "border-brand-blue/20 hover:border-brand-blue/50 hover:shadow-[0_10px_30px_rgba(59,130,246,0.06)]"
                }`}
              >
                {/* Popular Corner Ribbon */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 overflow-hidden w-24 h-24 rounded-tr-3xl">
                    <div className="absolute transform rotate-45 bg-brand-orange text-white text-[9px] font-black uppercase tracking-wider py-1.5 w-32 text-center -right-8 top-5 shadow-sm">
                      Popular
                    </div>
                  </div>
                )}

                <div>
                  {/* Plan Icon Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                      isOrange
                        ? "bg-brand-orange/10 border-brand-orange/20 text-brand-orange"
                        : "bg-brand-blue/10 border-brand-blue/20 text-brand-blue"
                    }`}>
                      <PlanIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold uppercase text-white tracking-wider">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium">
                        {plan.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/5 my-6" />

                  {/* Plan Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <Check className={`w-4 h-4 shrink-0 mt-1 ${
                          isOrange ? "text-brand-orange" : "text-brand-blue"
                        }`} />
                        <span className="text-sm font-semibold text-gray-300 leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select Button */}
                <button
                  suppressHydrationWarning
                  onClick={(e) => handleSelectPlan(e, plan.name)}
                  className={`w-full py-3.5 px-6 rounded-2xl text-sm font-extrabold uppercase tracking-wider transition-all duration-300 hover:translate-y-[-2px] ${
                    plan.popular
                      ? "bg-brand-orange hover:bg-brand-orange-hover text-white shadow-lg glow-orange"
                      : isOrange
                      ? "border border-brand-orange hover:bg-brand-orange text-white"
                      : "border border-brand-blue hover:bg-brand-blue text-white"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
