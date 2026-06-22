"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Target,
  Lightbulb,
  Eye,
  Gauge,
  Flame,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

interface Feature {
  id: number;
  title: string;
  desc: string;
  icon: typeof Sparkles;
}

/* ── Primary values (always visible) ── */
const features: Feature[] = [
  {
    id: 1,
    title: "Audace",
    desc: "Nous repoussons les frontières de l'imagination pour concevoir des identités uniques et mémorables.",
    icon: Sparkles,
  },
  {
    id: 2,
    title: "Performance",
    desc: "Des architectures ultra-rapides et optimisées pour garantir des performances d'affichage instantanées et un SEO maximal.",
    icon: Zap,
  },
  {
    id: 3,
    title: "Confiance",
    desc: "Une collaboration transparente et une écoute active pour bâtir des relations durables.",
    icon: ShieldCheck,
  },
  {
    id: 4,
    title: "Précision",
    desc: "Chaque pixel et chaque ligne de code sont polis avec le soin absolu de l'artisan.",
    icon: Target,
  },
];

/* ── Secondary values (revealed on scroll toggle) ── */
const extraFeatures: Feature[] = [
  {
    id: 5,
    title: "Innovation",
    desc: "Nous explorons les technologies émergentes pour offrir des solutions en avance sur leur temps.",
    icon: Lightbulb,
  },
  {
    id: 6,
    title: "Transparence",
    desc: "Un suivi clair, des échanges honnêtes et une visibilité totale sur chaque étape du projet.",
    icon: Eye,
  },
  {
    id: 7,
    title: "Agilité",
    desc: "Une capacité d'adaptation rapide aux changements pour livrer la meilleure version possible.",
    icon: Gauge,
  },
  {
    id: 8,
    title: "Impact",
    desc: "Chaque projet est pensé pour générer des résultats mesurables et une croissance durable.",
    icon: Flame,
  },
];

export default function AboutADN() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isToggled, setIsToggled] = useState(false);

  /* Scroll-trigger ref: when the section enters the viewport, activate the toggle */
  const toggleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(toggleRef, { once: true, margin: "-20%" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsToggled(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section
      className="relative overflow-hidden border-t border-black/[0.03]"
      style={{
        backgroundColor: "#FAFAFA",
        paddingTop: "10rem",
        paddingBottom: "8rem",
      }}
      id="valeurs"
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#08C1DC]/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* ───────────────────────────────────────────────
            Section Header — matches SectionHeader.tsx
        ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-start mb-16 gap-6" ref={toggleRef}>
          <div className="max-w-3xl">
            {/* Title row: text + toggle as flex siblings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
                className="flex items-center flex-wrap gap-3 md:gap-4 mb-4"
              >
                <h2 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.1] text-black-deep">
                  Nos
                </h2>

                {/* Interactive Toggle Switch */}
                <button
                  type="button"
                  className="relative flex items-center w-[56px] h-[28px] rounded-full p-[4px] cursor-pointer select-none transition-colors duration-500 shrink-0"
                  style={{
                    backgroundColor: isToggled
                      ? "rgba(8, 193, 220, 0.2)"
                      : "rgba(0, 0, 0, 0.06)",
                  }}
                  onClick={() => setIsToggled(!isToggled)}
                  aria-label="Toggle extra values"
                >
                  <motion.span
                    className="block w-[20px] h-[20px] rounded-full shadow-md"
                    style={{
                      backgroundColor: isToggled ? "#08C1DC" : "#B0B0B0",
                    }}
                    animate={{ x: isToggled ? 28 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                </button>

                <h2 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.1] text-primary accent-italic">
                  valeurs.
                </h2>
              </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-sans text-lg leading-relaxed text-dark/70"
            >
              Chez AIA LAB, nos valeurs guident chacune de nos lignes de code et
              chacun de nos designs. Elles façonnent nos collaborations et
              définissent notre excellence.
            </motion.p>
          </div>

          {/* The Small Blue Gradient Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-16 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full origin-left"
          />
        </div>

        {/* ───────────────────────────────────────────────
            Primary Values — 4-Column Grid (UNTOUCHED)
        ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const isHovered = hoveredId === feature.id;
            const IconComponent = feature.icon;

            return (
              <div
                key={feature.id}
                onMouseEnter={() => setHoveredId(feature.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative p-8 rounded-[2rem] transition-all duration-500 ease-out flex flex-col justify-start min-h-[300px] cursor-pointer"
                style={{
                  backgroundColor: isHovered ? "#FFFFFF" : "transparent",
                  boxShadow: isHovered
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.04), 0 4px 16px -4px rgba(0, 0, 0, 0.01)"
                    : "none",
                  border: isHovered
                    ? "1px solid rgba(0, 0, 0, 0.04)"
                    : "1px solid transparent",
                  transform: isHovered ? "translateY(-6px)" : "none",
                }}
              >
                {/* Icon Box */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6 transition-colors duration-300 ${
                    isHovered
                      ? "bg-primary/10 text-primary"
                      : "bg-black/[0.03] text-black-deep"
                  }`}
                >
                  <IconComponent className="w-6 h-6" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-black-deep mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-dark/70 text-sm md:text-[15px] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* ───────────────────────────────────────────────
            Secondary Values — Revealed when toggle is ON
        ─────────────────────────────────────────────── */}
        <AnimatePresence>
          {isToggled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.8, ease }}
              className="overflow-hidden"
            >
              {/* Thin separator */}
              <div className="my-10 mx-auto w-24 h-px bg-black/[0.06]" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {extraFeatures.map((feature, i) => {
                  const isHovered = hoveredId === feature.id;
                  const IconComponent = feature.icon;

                  return (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        ease,
                        delay: i * 0.1,
                      }}
                      className="h-full"
                    >
                      <div
                        onMouseEnter={() => setHoveredId(feature.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="relative p-8 rounded-[2rem] transition-all duration-500 ease-out flex flex-col justify-start min-h-[300px] cursor-pointer"
                        style={{
                          backgroundColor: isHovered ? "#FFFFFF" : "transparent",
                          boxShadow: isHovered
                            ? "0 25px 50px -12px rgba(0, 0, 0, 0.04), 0 4px 16px -4px rgba(0, 0, 0, 0.01)"
                            : "none",
                          border: isHovered
                            ? "1px solid rgba(0, 0, 0, 0.04)"
                            : "1px solid transparent",
                          transform: isHovered ? "translateY(-6px)" : "none",
                        }}
                      >
                        {/* Icon Box */}
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6 transition-colors duration-300 ${
                            isHovered
                              ? "bg-primary/10 text-primary"
                              : "bg-black/[0.03] text-black-deep"
                          }`}
                        >
                          <IconComponent className="w-6 h-6" strokeWidth={1.5} />
                        </div>

                        {/* Title */}
                        <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-black-deep mb-3">
                          {feature.title}
                        </h3>

                        {/* Description */}
                        <p className="font-sans text-dark/70 text-sm md:text-[15px] leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
