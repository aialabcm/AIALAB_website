"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom parallax scroll effect on the studio image container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Mild parallax for a smoother, premium feel
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[100dvh] bg-bg-main pt-32 xs:pt-36 sm:pt-40 lg:pt-44 pb-20 md:pb-32 overflow-hidden flex items-center"
    >
      {/* Ambient glow decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-primary/[0.04] blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#08C1DC]/[0.03] blur-[100px]" />
      </div>

      {/* Main Grid Layout: Clean 12-column editorial structure */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">

        {/* ─── LEFT COLUMN: TYPOGRAPHY, COPY & STATS ─── */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center z-20">
          
          {/* Header title */}
          <h1 className="font-heading font-black text-black-deep tracking-tighter leading-[0.95] uppercase text-4xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[92px] w-full">
            <span className="block overflow-hidden py-1">
              <motion.span 
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease }}
              >
                NOTRE HISTOIRE.
              </motion.span>
            </span>
            <span className="block overflow-hidden py-1">
              <motion.span 
                className="block font-heading accent-italic"
                style={{
                  backgroundImage: "linear-gradient(to right, #057E90, #08C1DC)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.1 }}
              >
                VOTRE FUTUR DIGITAL.
              </motion.span>
            </span>
          </h1>

          {/* Description & CTAs container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="mt-6 md:mt-8 flex flex-col items-start gap-8"
          >
            <p className="font-sans text-dark/80 text-base sm:text-lg leading-relaxed max-w-[50ch]">
              AIA LAB est un studio de design et d&apos;innovation technologique. Nous fusionnons la rigueur artistique avec la puissance de l&apos;intelligence artificielle pour concevoir l&apos;élite des expériences digitales.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/lancer-un-projet"
                className="group cursor-pointer bg-primary text-black-deep py-3.5 px-8 rounded-full font-sans font-extrabold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-black-deep hover:text-white hover:scale-105 active:scale-[0.98] shadow-md hover:shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-primary/50 min-h-[48px] flex items-center justify-center gap-2.5"
              >
                Lancer un projet
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="/work"
                className="group cursor-pointer bg-white/60 hover:bg-white text-black-deep py-3.5 px-8 rounded-full font-sans font-extrabold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-[0.98] backdrop-blur-sm border border-black/[0.06] hover:border-black/[0.12] outline-none focus-visible:ring-2 focus-visible:ring-primary/50 min-h-[48px] flex items-center justify-center gap-2"
              >
                Nos réalisations
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>

          {/* Grouped and Structured Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.45 }}
            className="grid grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-black/[0.06] mt-10 w-full"
          >
            <div className="flex flex-col">
              <span className="text-4xl sm:text-5xl font-heading font-black text-[#057E90]">
                500+
              </span>
              <span className="text-[10px] font-mono font-bold text-dark/50 uppercase tracking-widest mt-2">
                Projets livrés
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-4xl sm:text-5xl font-heading font-black text-[#057E90]">
                24+
              </span>
              <span className="text-[10px] font-mono font-bold text-dark/50 uppercase tracking-widest mt-2">
                Experts créatifs
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-4xl sm:text-5xl font-heading font-black text-[#057E90]">
                98%
              </span>
              <span className="text-[10px] font-mono font-bold text-dark/50 uppercase tracking-widest mt-2">
                Satisfaction
              </span>
            </div>
          </motion.div>
        </div>

        {/* ─── RIGHT COLUMN: FAN/CASCADE IMAGE COMPOSITION ─── */}
        <div className="col-span-1 lg:col-span-5 w-full z-10 flex flex-col items-center">
          
          {/* Fan Container — holds all cards in a fanned-out cascade */}
          <div className="relative w-full h-[400px] sm:h-[520px] lg:h-[650px]">
            
            {[
              {
                src: "/images/about-hero-studio.png",
                alt: "AIA LAB Creative Studio",
                rotate: -5,
                x: "0%",
                y: "48%",
                z: 5,
                delay: 0.35,
              },
              {
                src: "/images/services/web design & developpement.webp",
                alt: "Web Design & Développement",
                rotate: -2,
                x: "16%",
                y: "34%",
                z: 4,
                delay: 0.45,
              },
              {
                src: "/images/services/Branding & Identité visuelle.webp",
                alt: "Branding & Identité visuelle",
                rotate: 1,
                x: "32%",
                y: "20%",
                z: 3,
                delay: 0.55,
              },
              {
                src: "/images/services/Design Graphique & Digital.webp",
                alt: "Design Graphique & Digital",
                rotate: 4,
                x: "48%",
                y: "6%",
                z: 2,
                delay: 0.65,
              },
              {
                src: "/images/services/marketing didgital.webp",
                alt: "Marketing Digital",
                rotate: 7,
                x: "64%",
                y: "-8%",
                z: 1,
                delay: 0.75,
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: card.rotate }}
                transition={{ duration: 0.9, ease, delay: card.delay }}
                className="absolute rounded-[2.2rem] overflow-hidden border-[3px] border-white shadow-[0_15px_45px_rgba(0,0,0,0.18)] pointer-events-none select-none"
                style={{
                  left: card.x,
                  top: card.y,
                  zIndex: card.z,
                  width: "48%",
                  maxWidth: "280px",
                  transformOrigin: "bottom center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.src}
                  alt={card.alt}
                  className="w-full h-auto object-cover aspect-[3/4] rounded-[2rem]"
                  loading={i === 0 ? undefined : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
