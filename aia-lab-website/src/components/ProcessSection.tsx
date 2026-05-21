"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "./SectionHeader";

const steps = [
  {
    num: "01",
    title: "BRIEF",
    sub: "Découverte & écoute",
    desc: "Ateliers, recueil d'informations et cadrage des objectifs pour aligner vos besoins et nos attentes.",
  },
  {
    num: "02",
    title: "STRATÉGIE",
    sub: "Analyse & concept",
    desc: "Recherche, benchmarking et construction du concept fort pour définir la meilleure direction visuelle.",
  },
  {
    num: "03",
    title: "PRODUCTION",
    sub: "Design & développement",
    desc: "Création visuelle, itérations rapides et production de l'ensemble des livrables selon le plan validé.",
  },
  {
    num: "04",
    title: "LIVRAISON",
    sub: "Déploiement & contrôle",
    desc: "Remise finale, vérifications, ajustements et accompagnement complet pour un lancement fluide.",
  },
];

export default function ProcessSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-bg-main" 
      id="processus"
    >
      {/* Static Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop')",
        }}
      >
        {/* Light Overlay (Subtle) */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
      </div>

      <div className="max-w-container mx-auto px-6 md:px-20 relative z-10">
        
        <SectionHeader 
          title="Le Processus"
          highlight="Métier."
          description="Un workflow clair, structuré et suivi du brief à la livraison."
          centered
        />

        {/* Timeline Path (Desktop) */}
        <div className="hidden lg:block absolute left-20 right-20 top-[400px] h-px bg-dark/20">
          <motion.div 
            className="h-full bg-primary origin-left"
            style={{ scaleX }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16 relative">
          {steps.map((step, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative"
            >
              <div className="h-full border border-white/80 bg-white/85 backdrop-blur-3xl p-8 md:p-10 flex flex-col justify-between hover:bg-white transition-all duration-500 shadow-premium">
                
                {/* Background Giant Number */}
                <span className="absolute top-4 right-6 font-heading font-bold text-[100px] text-primary/5 leading-none pointer-events-none select-none transition-all duration-500 group-hover:text-primary/10">
                  {step.num}
                </span>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                       <span className="text-[10px] font-mono text-primary font-bold">{step.num}</span>
                    </div>
                    <div className="h-px w-8 bg-primary/20" />
                  </div>

                  <span className="text-[11px] font-mono text-primary font-extrabold tracking-widest uppercase">
                    {step.sub}
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-black-deep mt-3 mb-6 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[13px] text-dark font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

