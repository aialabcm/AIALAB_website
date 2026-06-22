"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1] as const;

// Custom animated SVG icons in the same premium style as the expertise cards
function ShieldIcon({ isHovered, color }: { isHovered: boolean; color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none" strokeWidth="1.5">
      {/* Outer Shield */}
      <motion.path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        animate={{
          stroke: isHovered ? color : "#ffffff",
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.5 }}
      />
      {/* Inner checkmark / core lines */}
      <motion.path
        d="M9 11l2 2 4-4"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          stroke: isHovered ? color : "rgba(255,255,255,0.4)",
          opacity: isHovered ? [0.4, 1, 0.4] : 0.6,
        }}
        transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
      />
    </svg>
  );
}

function RocketIcon({ isHovered, color }: { isHovered: boolean; color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none" strokeWidth="1.5">
      {/* Rocket Body */}
      <motion.path
        d="M2 22l1-4c0 0 4-1 6-3l7-7c1.5-1.5 3.5-1.5 5-1.5s0 3.5-1.5 5l-7 7c-2 2-3 6-3 6l-4 1z"
        animate={{
          stroke: isHovered ? color : "#ffffff",
          x: isHovered ? [0, 1.5, -1, 0] : 0,
          y: isHovered ? [0, -1.5, 1, 0] : 0,
        }}
        transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
      />
      {/* Thrust lines */}
      <motion.path
        d="M9 15l-3-3"
        animate={{
          stroke: isHovered ? color : "rgba(255,255,255,0.4)",
        }}
      />
    </svg>
  );
}

function HeartIcon({ isHovered, color }: { isHovered: boolean; color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none" strokeWidth="1.5">
      {/* Heart outer contour */}
      <motion.path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
        animate={{
          stroke: isHovered ? color : "#ffffff",
          scale: isHovered ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0 }}
      />
      {/* Inner anchor check / support line */}
      <motion.circle
        cx="12"
        cy="11"
        r="2"
        animate={{
          stroke: isHovered ? color : "rgba(255,255,255,0.3)",
          opacity: isHovered ? [0.4, 1, 0.4] : 0.5,
        }}
        transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
      />
    </svg>
  );
}

function GemIcon({ isHovered, color }: { isHovered: boolean; color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none" strokeWidth="1.5">
      {/* Gem facet structure */}
      <motion.path
        d="M6 3h12l4 6-10 12L2 9z"
        animate={{
          stroke: isHovered ? color : "#ffffff",
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M11 3L8 9l4 12 4-12-3-6"
        animate={{
          stroke: isHovered ? color : "rgba(255,255,255,0.4)",
        }}
      />
      <motion.path
        d="M2 9h20"
        animate={{
          stroke: isHovered ? color : "rgba(255,255,255,0.4)",
        }}
      />
    </svg>
  );
}

const promises = [
  {
    icon: ShieldIcon,
    title: "Transparence absolue",
    desc: "Chaque étape du projet est documentée, chaque décision est partagée. Vous avez une visibilité totale sur l'avancement, les choix techniques et les résultats attendus.",
    accent: "#08C1DC",
  },
  {
    icon: RocketIcon,
    title: "Livraison sans compromis",
    desc: "Nous respectons nos engagements de qualité et de délais. Chaque livrable est testé, optimisé et peaufiné avant de vous être présenté — sans exception.",
    accent: "#14B8A6",
  },
  {
    icon: HeartIcon,
    title: "Accompagnement durable",
    desc: "Notre relation ne s'arrête pas à la livraison. Nous restons à vos côtés pour faire évoluer, maintenir et améliorer votre écosystème digital sur le long terme.",
    accent: "#259EB1",
  },
  {
    icon: GemIcon,
    title: "Excellence artisanale",
    desc: "Chaque pixel est intentionnel, chaque ligne de code est optimisée. Nous appliquons les standards les plus exigeants du design et du développement à chacun de nos projets.",
    accent: "#0D9488",
  },
];

export default function AboutPromise() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#0B0B0B",
        paddingTop: "10rem",
        paddingBottom: "10rem",
      }}
      id="about-promise"
    >
      {/* Background texture — subtle like ExpertiseSection */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-[0.04]">
        <Image
          src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-[#0B0B0B]/60 to-[#0B0B0B]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#0B0B0B_80%)]" />
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#08C1DC]/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-start gap-6" style={{ marginBottom: "6rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-[1.5px] bg-[#08C1DC]/40 rounded-full" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#08C1DC]">
                Notre Promesse
              </span>
              <div className="w-8 h-[1.5px] bg-[#08C1DC]/40 rounded-full" />
            </div>
            <h2 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.1] text-white">
              Ce que nous vous{" "}
              <span className="text-primary accent-italic">garantissons.</span>
            </h2>
            <p className="font-sans text-white/70 text-base md:text-lg max-w-[50ch] mt-6 leading-relaxed">
              Plus qu&apos;un partenaire, nous sommes un collaborateur engagé.
              Voici les piliers sur lesquels repose chaque réalisation signée AIA LAB.
            </p>
          </motion.div>
          <div className="w-16 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>

        {/* Promise Cards — 2×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1.5rem" }}>
          {promises.map((promise, idx) => {
            const Icon = promise.icon;
            const isHovered = hoveredCard === idx;
            return (
              <motion.div
                key={promise.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.1,
                  ease,
                }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative rounded-[1.5rem] bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.06] hover:border-[#08C1DC]/25 transition-all duration-400 flex flex-col"
                style={{ padding: "2.5rem" }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                  style={{
                    marginBottom: "2rem",
                    backgroundColor: `${promise.accent}15`,
                    border: `1px solid ${promise.accent}30`,
                  }}
                >
                  <Icon isHovered={isHovered} color={promise.accent} />
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl md:text-2xl text-white tracking-tight" style={{ marginBottom: "1rem" }}>
                  {promise.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-white/60 text-[15px] md:text-base leading-[1.75] tracking-[0.01em]">
                  {promise.desc}
                </p>

                {/* Bottom decor */}
                <div className="flex items-center justify-between" style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                  <span className="text-[10px] font-mono font-bold text-[#08C1DC]/50 uppercase tracking-[0.15em]">
                    0{idx + 1}
                  </span>
                  <div
                    className="w-6 h-[1.5px] rounded-full group-hover:w-10 transition-all duration-300"
                    style={{ backgroundColor: `${promise.accent}40` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
