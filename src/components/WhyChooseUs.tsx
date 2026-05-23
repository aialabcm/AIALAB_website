"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const features = [
  {
    id: 1,
    title: "Curiosité Créative",
    desc: "L'écoute active et l'empathie humaine restent les fondements de chaque algorithme que nous concevons.",
    side: "left",
    color: "#08C1DC",
  },
  {
    id: 2,
    title: "Intelligence Augmentée",
    desc: "Nous ne remplaçons pas la vision stratégique, nous la propulsons grâce à la puissance du deep learning.",
    side: "left",
    color: "#08C1DC",
  },
  {
    id: 3,
    title: "Précision Chirurgicale",
    desc: "Une intégration technique sans faille pour des performances qui dépassent les standards du marché.",
    side: "right",
    color: "#14B8A6",
  },
  {
    id: 4,
    title: "Impact Durable",
    desc: "Au-delà du visuel, nous bâtissons des outils qui génèrent une croissance concrète et mesurable.",
    side: "right",
    color: "#14B8A6",
  },
];

import SectionHeader from "./SectionHeader";

export default function WhyChooseUs() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="bg-bg-main py-20 overflow-hidden relative" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <SectionHeader 
          title="Pourquoi nous"
          highlight="choisir ?"
          description="L'alchimie entre l'IA et l'émotion humaine pour des solutions uniques."
          centered
        />

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-24 lg:gap-0 min-h-[600px]">
          
          {/* SUPERSIDE FLOW SYSTEM */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block z-0">
            <svg width="100%" height="100%" viewBox="0 0 1000 600" fill="none" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="beam-left" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#08C1DC" stopOpacity="0" />
                  <stop offset="50%" stopColor="#08C1DC" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#08C1DC" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="beam-right" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#14B8A6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.2" />
                </linearGradient>
                <filter id="neon" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Feature Paths (Flow into center) */}
              <motion.path d="M 230 150 Q 400 150 500 300" stroke={hoveredId === 1 ? "url(#beam-left)" : "#E2E8F0"} strokeWidth={hoveredId === 1 ? "4" : "1"} fill="none" opacity={hoveredId === 1 ? 1 : 0.2} transition={{ duration: 0.5 }} />
              <motion.path d="M 230 450 Q 400 450 500 300" stroke={hoveredId === 2 ? "url(#beam-left)" : "#E2E8F0"} strokeWidth={hoveredId === 2 ? "4" : "1"} fill="none" opacity={hoveredId === 2 ? 1 : 0.2} transition={{ duration: 0.5 }} />
              
              {/* Output Paths (Flow from center) */}
              <motion.path d="M 770 150 Q 600 150 500 300" stroke={hoveredId === 3 ? "url(#beam-right)" : "#E2E8F0"} strokeWidth={hoveredId === 3 ? "4" : "1"} fill="none" opacity={hoveredId === 3 ? 1 : 0.2} transition={{ duration: 0.5 }} />
              <motion.path d="M 770 450 Q 600 450 500 300" stroke={hoveredId === 4 ? "url(#beam-right)" : "#E2E8F0"} strokeWidth={hoveredId === 4 ? "4" : "1"} fill="none" opacity={hoveredId === 4 ? 1 : 0.2} transition={{ duration: 0.5 }} />

              {/* Energy Particles */}
              {features.map((f, i) => (
                <AnimatePresence key={f.id}>
                  {(hoveredId === f.id || !hoveredId) && (
                    <motion.circle r="4" fill={f.color} filter="url(#neon)">
                      <animateMotion 
                        dur={hoveredId ? "1.5s" : `${3 + i}s`} 
                        repeatCount="indefinite" 
                        path={f.id === 1 ? "M 230 150 Q 400 150 500 300" : f.id === 2 ? "M 230 450 Q 400 450 500 300" : f.id === 3 ? "M 500 300 Q 600 150 770 150" : "M 500 300 Q 600 450 770 450"}
                      />
                    </motion.circle>
                  )}
                </AnimatePresence>
              ))}
            </svg>
          </div>

          {/* Left Column - INPUT BADGES */}
          <div className="lg:w-1/3 flex flex-col gap-40 z-10">
            {features.filter(f => f.side === "left").map((feature) => (
              <motion.div 
                key={feature.id}
                onMouseEnter={() => setHoveredId(feature.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`p-6 rounded-2xl border transition-all duration-500 cursor-pointer text-center lg:text-right group ${hoveredId === feature.id ? "bg-white shadow-xl border-primary scale-[1.02]" : "bg-white/40 border-transparent backdrop-blur-sm shadow-sm"}`}
              >
                <div className="flex items-center justify-center lg:justify-end gap-4 mb-3">
                   <h3 className={`font-heading text-xl font-bold transition-colors duration-300 ${hoveredId === feature.id ? "text-primary" : "text-black-deep"}`}>
                     {feature.title}
                   </h3>
                   <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${hoveredId === feature.id ? "bg-primary scale-150 shadow-[0_0_15px_#08C1DC]" : "bg-primary/20"}`} />
                </div>
                <p className="text-dark/60 text-sm leading-relaxed font-sans max-w-xs lg:ml-auto transition-colors duration-300 group-hover:text-dark/90">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Center Column - THE LAB CORE */}
          <div className="lg:w-1/3 flex justify-center relative py-12 z-20">
            <motion.div 
              animate={{ 
                scale: hoveredId ? 1.08 : 1,
                rotate: hoveredId ? [0, 2, -2, 0] : 0,
              }}
              transition={{ rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" }}}
              className="relative w-64 h-64 md:w-80 md:h-80 select-none"
            >
              <div className={`absolute inset-0 bg-primary/20 rounded-full blur-[100px] transition-opacity duration-1000 ${hoveredId ? "opacity-100" : "opacity-40"}`} />
              <Image 
                src="/images/AIAl-Embleme.webp"
                alt="AIA LAB Emblem" 
                fill
                className="object-contain drop-shadow-[0_0_40px_rgba(8,193,220,0.2)]"
                priority
              />
            </motion.div>
          </div>

          {/* Right Column - OUTPUT BADGES */}
          <div className="lg:w-1/3 flex flex-col gap-40 z-10">
            {features.filter(f => f.side === "right").map((feature) => (
              <motion.div 
                key={feature.id}
                onMouseEnter={() => setHoveredId(feature.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`p-6 rounded-2xl border transition-all duration-500 cursor-pointer text-center lg:text-left group ${hoveredId === feature.id ? "bg-white shadow-xl border-secondary scale-[1.02]" : "bg-white/40 border-transparent backdrop-blur-sm shadow-sm"}`}
              >
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-3">
                  <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${hoveredId === feature.id ? "bg-secondary scale-150 shadow-[0_0_15px_#14B8A6]" : "bg-secondary/20"}`} />
                  <h3 className={`font-heading text-xl font-bold transition-colors duration-300 ${hoveredId === feature.id ? "text-secondary" : "text-black-deep"}`}>
                    {feature.title}
                  </h3>
                </div>
                <p className="text-dark/60 text-sm leading-relaxed font-sans max-w-xs transition-colors duration-300 group-hover:text-dark/90">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Extreme Visual Polishing */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
    </section>
  );
}
