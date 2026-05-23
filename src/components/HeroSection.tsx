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
    <section className="relative h-screen min-h-[700px] w-full flex flex-col items-center justify-center bg-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.webp"
          alt="AIA LAB Studio"
          fill
          className="object-cover object-right"
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-container mx-auto px-6 flex flex-col items-center text-center">
        <div className="flex flex-col items-center">
          <h1 className="flex flex-col items-center select-none mb-10">
            <TypewriterLine
              text={HERO_LINE_1}
              msPerChar={MS_PER_CHAR}
              className="font-heading font-black text-7xl md:text-8xl lg:text-9xl text-white tracking-tighter uppercase leading-none"
            />
            <TypewriterLine
              text={HERO_LINE_2}
              startDelay={LINE_2_START_DELAY}
              msPerChar={MS_PER_CHAR}
              onComplete={() => setTitlesComplete(true)}
              className="font-heading accent-italic text-5xl md:text-7xl lg:text-8xl text-primary tracking-tighter -mt-2 md:-mt-4"
            />
          </h1>

          <motion.p
            initial={false}
            animate={
              titlesComplete
                ? { opacity: 0.7, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="font-sans text-base md:text-lg text-white max-w-[45ch] mb-12 leading-relaxed font-medium"
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
        </div>
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
