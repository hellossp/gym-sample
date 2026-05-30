"use client";

import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Trainers", href: "#trainers" },
  { label: "Membership", href: "#membership" },
  { label: "Transformations", href: "#transformations" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effects: active section highlight & background change
  useEffect(() => {
    const handleScroll = () => {
      // Background styling toggle
      setScrolled(window.scrollY > 20);

      // Scroll spy for active link
      const scrollPosition = window.scrollY + 100;
      for (const item of NAV_ITEMS) {
        const targetId = item.href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(targetId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of navbar
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
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "glass-nav shadow-lg py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="flex items-center">
              <Logo iconSize={42} />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative text-sm font-semibold tracking-wider uppercase transition-colors duration-200 ${
                      isActive ? "text-brand-orange" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-orange"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* CTA Button (Desktop) */}
            <div className="hidden lg:block">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="inline-flex items-center justify-center px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-bold tracking-wider uppercase rounded-full shadow-lg glow-orange-sm transition-all duration-300 hover:translate-y-[-2px] group"
              >
                Join Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Hamburger Menu Icon (Mobile) */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white p-2 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsOpen(false)} />

            {/* Drawer Content */}
            <div className="fixed top-20 left-0 w-full max-h-[calc(100vh-80px)] overflow-y-auto bg-brand-dark/95 border-b border-white/5 py-8 px-6 shadow-2xl flex flex-col items-center justify-center">
              <nav className="flex flex-col items-center gap-6 w-full mb-8">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`text-lg font-bold tracking-widest uppercase transition-colors py-2 w-full text-center ${
                        isActive ? "text-brand-orange border-b border-brand-orange/20" : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="w-full max-w-xs inline-flex items-center justify-center px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white text-base font-bold tracking-wider uppercase rounded-full shadow-lg glow-orange transition-all duration-300"
              >
                Join Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
