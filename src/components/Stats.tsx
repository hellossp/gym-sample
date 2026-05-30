"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Users, Dumbbell, Award, Clock } from "lucide-react";
import { motion } from "framer-motion";

const STATS_DATA = [
  {
    value: 1600,
    suffix: "+",
    label: "Community Members",
    icon: Users,
    color: "text-brand-orange",
    bgIcon: "bg-brand-orange/10",
  },
  {
    value: 5,
    suffix: "+",
    label: "Training Programs",
    icon: Dumbbell,
    color: "text-brand-blue",
    bgIcon: "bg-brand-blue/10",
  },
  {
    value: 10,
    suffix: "+",
    label: "Certified Trainers",
    icon: Award,
    color: "text-brand-orange",
    bgIcon: "bg-brand-orange/10",
    isText: false, // will count to 10+ representing "Certified" in a numeric style, or we can render text. In the mockup it says "Certified Trainers" but the number part has "Certified" and subtext "Trainers". Let's show both nicely.
    customValue: "Certified",
  },
  {
    value: 7,
    suffix: " Days",
    label: "Open Weekly",
    icon: Clock,
    color: "text-brand-blue",
    bgIcon: "bg-brand-blue/10",
  },
];

export default function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="relative z-20 py-8 bg-brand-dark -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="glass rounded-2xl md:rounded-3xl p-6 sm:p-10 border border-white/5 glow-orange-sm"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS_DATA.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center group cursor-default transition-all duration-300 hover:translate-y-[-4px]"
              >
                {/* Icon wrapper */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${stat.bgIcon} ${stat.color} border border-white/5 shadow-inner`}
                >
                  <IconComponent className="w-7 h-7" />
                </div>

                {/* Metric value */}
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-1 uppercase">
                  {stat.customValue ? (
                    <span className="text-brand-orange">{stat.customValue}</span>
                  ) : (
                    inView && (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.5}
                        suffix={stat.suffix}
                      />
                    )
                  )}
                </div>

                {/* Metric label */}
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
