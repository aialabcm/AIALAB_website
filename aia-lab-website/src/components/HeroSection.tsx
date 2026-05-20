"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Noise removal: ParticleBackground component removed per user request for "no noise effect".
export default function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* 1. Full Background Image (Strictly visible, no noise, no overlays) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="AIA LAB Background"
          fill
          className="object-cover object-center transition-opacity duration-1000"
          priority
        />
      </div>

      {/* 2. Centered Content with Reveal Animation */}
      <div className="relative z-10 w-full max-w-container mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1, 
              transition: { staggerChildren: 0.2, delayChildren: 0.4 } 
            }
          }}
          className="flex flex-col items-center"
        >


          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-col items-center select-none mb-12 mt-12"
          >
            <span className="font-heading font-extrabold text-6xl md:text-8xl lg:text-9xl text-white leading-none tracking-tighter uppercase">
              L'Art
            </span>
            <span className="font-heading font-light text-4xl md:text-6xl lg:text-7xl text-white/90 leading-tight tracking-tighter -mt-2 md:-mt-4 relative">
              de l'Intelligence.
            </span>
          </motion.h1>

          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 0.6, y: 0 } }}
            className="font-sans text-sm md:text-base text-white max-w-[50ch] mb-14 leading-relaxed font-light tracking-wide"
          >
            Nous sculptons des identités numériques à l'intersection de l'intuition humaine et de la puissance technologique.
          </motion.p>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10"
          >
            <a
              href="#cta-contact"
              className="px-12 py-5 bg-secondary text-white rounded-full font-sans font-extrabold text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 hover:bg-white hover:text-secondary shadow-xl cursor-pointer"
            >
              Lancer le projet
            </a>
            <a
              href="#portfolio"
              className="group flex items-center gap-3 text-white/40 font-sans font-bold text-xs tracking-widest uppercase hover:text-white transition-all duration-500 cursor-pointer"
            >
              <span>Explorer l'impact</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-3 transition-transform duration-500 text-secondary" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* 3. Scroll Indicator (Clean) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-full h-1/2 bg-secondary absolute top-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
