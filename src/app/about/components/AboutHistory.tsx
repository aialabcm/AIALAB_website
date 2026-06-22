"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Epoch = {
  year: string;
  title: string;
  text: string;
};

const epochs: Epoch[] = [
  {
    year: "2023",
    title: "Fondation & Vision",
    text: "Lancement d'AIA LAB à Douala. Notre ambition première : bâtir un studio hybride d'exception fusionnant direction artistique novatrice et technologies web de pointe pour redéfinir la présence en ligne des marques les plus exigeantes d'Afrique Centrale.",
  },
  {
    year: "2024",
    title: "Expansion & Réalisations",
    text: "Déploiement d'interfaces d'exception pour nos premiers partenaires nationaux et sous-régionaux. Structuration de notre méthodologie propriétaire basée sur l'ergonomie et l'optimisation des performances pour plus de 24 pays cibles.",
  },
  {
    year: "2025",
    title: "Le Laboratoire d'IA",
    text: "Intégration systématique de pipelines de travail connectant l'intelligence artificielle générative et de précision à notre processus créatif. Cette innovation majeure décuple notre capacité de production d'actifs graphiques haut de gamme et d'expériences sur mesure.",
  },
  {
    year: "2026",
    title: "Aujourd'hui & Futur",
    text: "Aujourd'hui, nous consolidons notre rôle de leader créatif et technologique d'Afrique Centrale. Nous propulsons nos clients vers l'élite digitale grâce à des expériences immersives et des solutions logicielles durables et performantes.",
  },
];

export default function AboutHistory() {
  const [active, setActive] = useState(3); // Start at 2026 (index 3)

  // Auto-play interval: cycles every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % epochs.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [active]); // Re-run when active changes to reset the 5s timer on manual click

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#0B0B0B",
        paddingTop: "8rem",
        paddingBottom: "16rem",
      }}
      id="historique"
    >
      {/* Background Image with Fade Effect — matching homepage ExpertiseSection */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-[0.03]">
        <Image
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-[#0B0B0B]/60 to-[#0B0B0B]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#0B0B0B_80%)]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        {/* ── Section Header (Coherent with AboutADN.tsx) ── */}
        <div className="flex flex-col items-start mb-16 md:mb-20 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-[1.5px] bg-[#08C1DC]/40 rounded-full" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#08C1DC]">
                Notre Parcours
              </span>
              <div className="w-8 h-[1.5px] bg-[#08C1DC]/40 rounded-full" />
            </div>
            <h2 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.1] text-white">
              Notre <span className="text-primary accent-italic">trajectoire.</span>
            </h2>
            <p className="font-sans text-white/80 text-base md:text-lg max-w-[50ch] mt-6 leading-relaxed">
              De notre genèse à nos perspectives futures, découvrez les étapes clés qui dessinent la trajectoire d&apos;AIA LAB.
            </p>
          </div>
          <div className="w-16 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full origin-left" />
        </div>

        {/* ── Timeline Container: Vertical on Mobile/Tablet, Grid on Desktop ── */}
        <div className="w-full relative pl-8 lg:pl-0 border-l border-white/[0.08] lg:border-l-0">
          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-12 lg:gap-8 relative">

            {epochs.map((epoch, idx) => {
              const isActive = idx === active;
              
              // Stair-step margin values only applied on desktop
              const stairMargin = 
                idx === 0 ? "lg:mt-0" 
                : idx === 1 ? "lg:mt-[40px]" 
                : idx === 2 ? "lg:mt-[80px]" 
                : "lg:mt-[120px]";

              return (
                <div
                  key={epoch.year}
                  className={`flex flex-col group/col relative transition-all duration-300 ${stairMargin}`}
                >
                  
                  {/* Timeline Axis Bullet (Mobile Only, perfectly aligned with border-l) */}
                  <div
                    className={`absolute lg:hidden left-[-38px] top-3.5 w-3 h-3 rounded-full border transition-all duration-300 z-20 cursor-pointer ${
                      isActive
                        ? "bg-primary border-primary scale-125 shadow-[0_0_10px_rgba(8,193,220,0.6)]"
                        : "bg-[#0B0B0B] border-white/20 hover:border-primary/50"
                    }`}
                    onClick={() => setActive(idx)}
                  />

                  {/* Header Row: Year Badge + Title (Mobile: flex row, Desktop: block) */}
                  <div className="flex items-center lg:block gap-4">
                    {/* Year Cell Button */}
                    <button
                      onClick={() => setActive(idx)}
                      className={`relative w-24 lg:w-full h-10 lg:h-[72px] flex items-center justify-center border border-white/[0.08] rounded-xl cursor-pointer focus:outline-none transition-all duration-300 active:scale-[0.98] flex-shrink-0 ${
                        isActive ? "z-10 animate-pulse-subtle" : "bg-white/[0.02] hover:bg-white/[0.04]"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeYear"
                          className="absolute inset-0 bg-primary z-0 rounded-xl"
                          style={{
                            boxShadow: "0 10px 30px rgba(8, 193, 220, 0.4)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      <span
                        className={`relative z-10 font-heading font-bold text-base lg:text-[22px] transition-colors duration-300 ${
                          isActive ? "text-[#0B0B0B]" : "text-white/60 hover:text-[#08C1DC]"
                        }`}
                      >
                        {epoch.year}
                      </span>
                    </button>

                    {/* Title (Mobile Only inline placement, Desktop displays inside desc block) */}
                    <h3
                      onClick={() => setActive(idx)}
                      className={`lg:hidden font-heading text-base md:text-lg leading-snug cursor-pointer transition-colors duration-300 ${
                        isActive ? "font-bold text-white" : "font-semibold text-white/80"
                      }`}
                    >
                      {epoch.title}
                    </h3>
                  </div>

                  {/* Description block (Mobile: no left border/padding, Desktop: left border indicator) */}
                  <div
                    onClick={() => setActive(idx)}
                    className={`mt-4 lg:mt-14 pl-2 lg:pl-6 flex flex-col cursor-pointer transition-all duration-500 border-l-0 lg:border-l-2 ${
                      isActive 
                        ? "opacity-100 translate-y-0 lg:border-[#08C1DC]" 
                        : "opacity-45 hover:opacity-60 translate-y-0 lg:translate-y-1 lg:border-transparent"
                    }`}
                  >
                    {/* Desktop Title */}
                    <h3
                      className={`hidden lg:block font-heading text-base lg:text-xl leading-snug mb-4 transition-colors duration-300 ${
                        isActive ? "font-bold text-white" : "font-semibold text-white/80"
                      }`}
                    >
                      {epoch.title}
                    </h3>
                    <p className="font-sans text-white/70 text-[14px] md:text-[15px] leading-[1.8] tracking-[0.02em] max-w-full lg:max-w-[90%]">
                      {epoch.text}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}
