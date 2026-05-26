"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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

function ProcessCard({ step, idx }: { step: typeof steps[0]; idx: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.12 }}
      className="w-full h-[320px] [perspective:1200px] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => isMobile && setIsHovered(!isHovered)}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer select-none"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* FRONT FACE */}
        <div
          className="absolute inset-0 w-full h-full bg-white border border-dark/5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8 flex flex-col justify-between transition-all duration-300 group-hover:shadow-[0_12px_40px_rgba(8,193,220,0.06)]"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Front Header */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="text-[10px] font-mono text-primary font-bold">{step.num}</span>
              </div>
              <div className="h-px w-6 bg-primary/20" />
            </div>
            <span className="font-mono text-[11px] font-extrabold text-primary tracking-widest uppercase">
              {step.sub}
            </span>
          </div>

          {/* Front Body */}
          <div className="my-auto py-4">
            <h3 className="font-heading font-black text-3xl text-black-deep tracking-wide mb-1.5">
              {step.title}
            </h3>
            <p className="text-dark/45 text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5 transition-colors group-hover:text-primary">
              {isMobile ? "Touchez pour explorer" : "Survolez pour explorer"}{" "}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">➔</span>
            </p>
          </div>

          {/* Front Footer */}
          <div className="flex justify-between items-center w-full pt-4 border-t border-dark/5">
            <span className="text-[10px] text-dark/40 font-semibold uppercase tracking-wider">
              AIA LAB PROCESS
            </span>
            <span className="text-2xl font-black font-heading text-primary/10 group-hover:text-primary/25 transition-colors">
              {step.num}
            </span>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-black-deep via-[#0E1524] to-black-deep border border-white/5 rounded-3xl shadow-2xl p-8 flex flex-col justify-between text-white"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            WebkitTransform: "rotateY(180deg)",
          }}
        >
          {/* Back Header */}
          <div className="flex items-center justify-between w-full pb-3 border-b border-white/10">
            <span className="font-mono text-xs font-bold text-primary tracking-widest uppercase">
              Étape {step.num}
            </span>
            <span className="font-heading font-black text-sm text-white/50 tracking-wider">
              {step.title}
            </span>
          </div>

          {/* Back Description */}
          <div className="my-auto py-4">
            <p className="font-sans text-[14px] leading-relaxed text-white/90 font-medium">
              {step.desc}
            </p>
          </div>

          {/* Back Footer */}
          <div className="flex justify-between items-center w-full pt-3 border-t border-white/10 text-white/40">
            <span className="text-[9px] font-mono uppercase tracking-wider">
              Processus Métier
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function ProcessSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
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
        {/* Premium Frosted Glass Overlay */}
        <div className="absolute inset-0 bg-white/45 backdrop-blur-[4px]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <SectionHeader
          title="Le Processus"
          highlight="Métier."
          description="Un workflow clair, structuré et suivi du brief à la livraison."
          descriptionClassName="text-black font-medium"
          centered
        />

        {/* Timeline Path (Desktop) */}
        <div className="hidden lg:block absolute left-16 right-16 top-[400px] h-px bg-dark/10">
          <motion.div
            className="h-full bg-primary origin-left"
            style={{ scaleX }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16 relative">
          {steps.map((step, idx) => (
            <ProcessCard key={idx} step={step} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
