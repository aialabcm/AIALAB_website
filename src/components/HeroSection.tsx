"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import TypewriterLine from "@/components/TypewriterLine";

const HERO_LINE_1 = "Design &";
const HERO_LINE_2 = "Performance.";
const MS_PER_CHAR = 100;
const LINE_2_OVERLAP = 0.75;
const LINE_2_START_DELAY = Math.round(
  HERO_LINE_1.length * LINE_2_OVERLAP * MS_PER_CHAR,
);
const REVEAL_STAGGER_S = 0.3;

export default function HeroSection() {
  const [titlesComplete, setTitlesComplete] = useState(false);

  return (
    <section className="relative h-screen min-h-[750px] w-full flex items-center bg-white overflow-hidden pt-20">
      {/* Background Image with overlays */}
      <motion.div 
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero-bg.webp"
          alt="AIA LAB Studio"
          fill
          className="object-cover object-right"
          priority
        />
      </motion.div>

      <div className="relative z-10 w-full max-w-container mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 mt-10 md:mt-0">
        
        {/* Left Column: Text and CTAs */}
        <div className="flex flex-col items-start w-full lg:max-w-[60%] z-10 py-8 lg:py-16">

          <h1 className="flex flex-col items-start select-none mb-8 lg:mb-10 w-full overflow-hidden">
            <TypewriterLine
              text={HERO_LINE_1}
              msPerChar={MS_PER_CHAR}
              className="font-heading font-black text-[2.5rem] xs:text-5xl sm:text-6xl md:text-[5rem] lg:text-[6rem] xl:text-[7rem] text-white tracking-tighter uppercase leading-[0.95]"
            />
            <TypewriterLine
              text={HERO_LINE_2}
              startDelay={LINE_2_START_DELAY}
              msPerChar={MS_PER_CHAR}
              onComplete={() => setTitlesComplete(true)}
              className="font-heading accent-italic text-[2.5rem] xs:text-5xl sm:text-6xl md:text-[5rem] lg:text-[6rem] xl:text-[7rem] text-primary tracking-tighter -mt-1 md:-mt-2"
            />
          </h1>

          <motion.p
            initial={false}
            animate={
              titlesComplete
                ? { opacity: 0.8, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="font-sans text-sm md:text-base text-white/70 max-w-[55ch] mb-12 lg:mb-16 leading-relaxed font-normal text-left"
          >
            Nous fusionnons l&apos;excellence esthétique avec la puissance
            technologique pour sculpter des expériences qui redéfinissent
            l&apos;élite digitale.
          </motion.p>
 
          <motion.div
            initial={false}
            animate={
              titlesComplete
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.55,
              ease: "easeOut",
              delay: REVEAL_STAGGER_S,
            }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 justify-start w-full"
          >
            <a
              href="#cta-contact"
              className="bg-primary text-black-deep py-4 px-8 sm:px-10 rounded-full font-sans font-extrabold text-sm tracking-wider transition-all duration-300 hover:bg-white hover:text-black-deep hover:scale-105 shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/50 text-center min-h-[48px]"
            >
              Lancer un projet
            </a>
            <a
              href="#portfolio"
              className="bg-white/10 hover:bg-white/20 text-white py-4 px-8 sm:px-10 rounded-full font-sans font-extrabold text-sm tracking-wider transition-all duration-300 hover:scale-105 backdrop-blur-sm outline-none focus-visible:ring-2 focus-visible:ring-white/50 text-center min-h-[48px]"
            >
              Notre Portfolio
            </a>
          </motion.div>
        </div>

        {/* Right Column: Glassmorphic stats */}
        <motion.div
          initial={false}
          animate={
            titlesComplete
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: 30 }
          }
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="hidden lg:flex w-full lg:w-auto mt-8 lg:mt-0 z-10 translate-y-16"
        >
          {/* Glassmorphic Card */}
          <div className="w-64 p-6 rounded-[24px] bg-white/[0.07] backdrop-blur-xl border border-white/10 flex flex-col justify-between h-[240px] shadow-2xl relative overflow-hidden group hover:border-primary/20 transition-colors">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
            <div>
              <div className="font-heading font-black text-4xl text-white tracking-tighter leading-none mb-1">
                500+
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-white/50 mb-4">
                Projets d&apos;exception
              </p>
              
              <div className="w-8 h-[2px] bg-primary/30 rounded mb-6" />

              <ul className="space-y-2 text-[11px] font-medium text-white/70">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Architecture Digitale
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Performance & SEO
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Ingénierie Web & IA
                </li>
              </ul>
            </div>
            
            <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest mt-4">
              AIA LAB EST. 2024
            </div>
          </div>
        </motion.div>
      </div>

      {/* Elegant Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={titlesComplete ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity duration-300 hidden sm:flex"
        onClick={() => {
          document.querySelector('#expertises')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/50">Explorer</span>
          <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center p-1" />
      </motion.div>

      {/* Horizontal bottom line decoration */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 1.5, ease: "circOut" }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10"
      />
    </section>
  );
}
