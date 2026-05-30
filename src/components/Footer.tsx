"use client";

import React from "react";
import Logo from "./Logo";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Trainers", href: "#trainers" },
  { label: "Membership", href: "#membership" },
  { label: "Transformations", href: "#transformations" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 pt-16 pb-8 z-20 overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-blue/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-brand-orange/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Column 1: Brand & Socials (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <Logo iconSize={44} />
            <p className="text-sm text-gray-400 font-semibold leading-relaxed max-w-sm">
              S-27 Gym is Berhampur's premium health and fitness destination. We offer premium strength equipment, expert coaches, and custom program structures to get you in the best shape of your life.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-orange hover:text-white border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300"
                aria-label="Facebook Profile"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-orange hover:text-white border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300"
                aria-label="Instagram Profile"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-orange hover:text-white border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300"
                aria-label="Youtube Channel"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (3 columns) */}
          <div className="lg:col-span-3 lg:pl-8 space-y-5">
            <h4 className="text-sm uppercase font-black tracking-widest text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm font-semibold text-gray-400 hover:text-brand-orange transition-colors uppercase tracking-wider"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info (3 columns) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-sm uppercase font-black tracking-widest text-white">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-gray-400 leading-snug">
                  Near Medical Square, Berhampur, Odisha, 760001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-blue shrink-0" />
                <a href="tel:+917008123456" className="text-sm font-semibold text-gray-400 hover:text-brand-orange transition-colors">
                  +91 70081 23456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-orange shrink-0" />
                <a href="mailto:info@s27gym.com" className="text-sm font-semibold text-gray-400 hover:text-brand-blue transition-colors">
                  info@s27gym.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours (2 columns) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-sm uppercase font-black tracking-widest text-white">
              Opening Hours
            </h4>
            <div className="space-y-3 text-sm font-semibold text-gray-400">
              <div>
                <p className="text-white uppercase text-xs tracking-wider font-extrabold mb-0.5">Mon - Sat</p>
                <p>5:00 AM - 10:00 PM</p>
              </div>
              <div>
                <p className="text-white uppercase text-xs tracking-wider font-extrabold mb-0.5">Sunday</p>
                <p>6:00 AM - 12:00 PM</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar Divider */}
        <div className="w-full h-px bg-white/5 my-8" />

        {/* Bottom Bar Info */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-xs font-semibold text-gray-500">
            &copy; {currentYear} S-27 Gym. All Rights Reserved.
          </p>
          <p className="text-[10px] font-black tracking-[0.2em] text-gray-600 uppercase">
            Be Fitter & Happier
          </p>
        </div>
      </div>
    </footer>
  );
}
