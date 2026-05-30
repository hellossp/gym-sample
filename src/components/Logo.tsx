import React from "react";
import Image from "next/image";
import logoImg from "../../public/images/logo.jpg";

interface LogoProps {
  className?: string;
  iconSize?: number;
}

export default function Logo({ className = "", iconSize = 48 }: LogoProps) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <Image
        src={logoImg}
        alt="S-27 Gym Logo"
        className="object-contain transition-transform duration-300 hover:scale-105"
        style={{ height: `${iconSize}px`, width: "auto" }}
        priority
      />
    </div>
  );
}
