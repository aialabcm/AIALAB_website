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
    <section className="relative h-screen min-h-[700px] w-full flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* 1. Background Image (No effects) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="AIA LAB Studio"
          fill
          className="object-cover object-right"
          priority
        />
      </div>

      {/* 2. Centered Content */}
      <div className="relative z-10 w-full max-w-container mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.4 }
            }
          }}
          className="flex flex-col items-center"
        >
          {/* Main Title - White text for dark BG */}
          <motion.h1 
            className="flex flex-col items-center select-none mb-10"
          >
            <motion.span 
              variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
              className="font-heading font-black text-7xl md:text-8xl lg:text-9xl text-white tracking-tighter uppercase leading-none"
            >
              Design &
            </motion.span>
            <motion.span 
              variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
              className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl text-primary italic tracking-tighter -mt-2 md:-mt-4"
            >
              Performance.
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 0.7, y: 0 } }}
            className="font-sans text-base md:text-lg text-white max-w-[45ch] mb-12 leading-relaxed font-medium"
          >
            Nous fusionnons l'excellence esthétique avec la puissance technologique pour sculpter des expériences qui redéfinissent l'élite digitale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="#cta-contact"
              className="px-10 py-4 bg-secondary text-white rounded-full font-heading font-bold text-[11px] tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:bg-white hover:text-secondary shadow-xl"
            >
              Lancer un projet
            </a>
            <a
              href="#portfolio"
              className="group flex items-center gap-3 text-white/60 font-heading font-bold text-[11px] tracking-widest uppercase hover:text-white transition-all duration-500"
            >
              <span>Notre Portfolio</span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 1.5, ease: "circOut" }}
        className="absolute bottom-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"
      />
    </section>
  );
}
