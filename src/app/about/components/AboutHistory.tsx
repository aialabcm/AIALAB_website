"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/SectionHeader";

const epochs = [
  {
    year: "2023",
    title: "Fondation & Vision.",
    text: "Lancement d'AIA LAB. Notre ambition : créer un studio hybride fusionnant design d'art géométrique et technologies web émergentes.",
    svgType: "prism"
  },
  {
    year: "2024",
    title: "Expansion & Réalisations.",
    text: "Déploiement d'interfaces d'exception pour nos premiers grands partenaires. Structuration de notre méthodologie de design d'interaction.",
    svgType: "mesh"
  },
  {
    year: "2025",
    title: "Le Laboratoire d'IA.",
    text: "Intégration et lancement de pipelines connectant l'IA générative et de précision à la conception visuelle haut de gamme.",
    svgType: "neural"
  }
];

function EpochCard({ epoch, delay }: { epoch: typeof epochs[0]; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 150 });
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 150 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[2.5rem] border border-black/[0.04] bg-white p-10 shadow-sm hover:shadow-premium hover:border-primary/20 transition-all duration-500 min-h-[360px] flex flex-col justify-between group cursor-default"
    >
      {/* Huge Background Outline Year */}
      <div 
        style={{ transform: "translateZ(10px)" }}
        className="absolute -bottom-8 -right-4 font-mono font-black text-[7rem] sm:text-[8rem] text-transparent select-none pointer-events-none opacity-[0.06] group-hover:opacity-10 transition-opacity duration-500 [-webkit-text-stroke:1.5px_black]"
      >
        {epoch.year}
      </div>

      {/* Top: Custom Interactive SVG Graphic */}
      <div 
        style={{ transform: "translateZ(30px)" }} 
        className="relative w-16 h-16 flex items-center justify-center text-primary mb-12"
      >
        {epoch.svgType === "prism" && (
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="1.5">
            <polygon points="50,15 15,80 85,80" />
            <line x1="50" y1="15" x2="50" y2="80" strokeDasharray="3 3" />
            <circle cx="50" cy="15" r="4" fill="currentColor" />
            {/* Ray emissions */}
            <path d="M 15 80 L 35 60 M 85 80 L 65 60" />
          </svg>
        )}

        {epoch.svgType === "mesh" && (
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="1.5">
            {/* Grid structure */}
            <path d="M 20 20 L 80 20 L 80 80 L 20 80 Z" />
            <path d="M 20 50 L 80 50 M 50 20 L 50 80" />
            <path d="M 20 20 L 80 80 M 80 20 L 20 80" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="50" cy="50" r="3" fill="currentColor" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
            <circle cx="80" cy="80" r="3" fill="currentColor" />
          </svg>
        )}

        {epoch.svgType === "neural" && (
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current animate-[spin_30s_linear_infinite]" strokeWidth="1.5">
            <circle cx="50" cy="50" r="35" strokeDasharray="5 3" />
            <circle cx="50" cy="50" r="15" />
            {/* Connecting nodes */}
            <circle cx="50" cy="15" r="3" fill="currentColor" />
            <circle cx="15" cy="50" r="3" fill="currentColor" />
            <circle cx="85" cy="50" r="3" fill="currentColor" />
            <circle cx="50" cy="85" r="3" fill="currentColor" />
            <line x1="50" y1="15" x2="50" y2="85" strokeWidth="1" />
            <line x1="15" y1="50" x2="85" y2="50" strokeWidth="1" />
          </svg>
        )}
      </div>

      {/* Bottom Content */}
      <div style={{ transform: "translateZ(25px)" }} className="space-y-3 z-10">
        <h4 className="font-heading font-black text-xl text-black-deep uppercase tracking-tight">
          {epoch.title}
        </h4>
        <p className="font-sans text-dark/70 text-sm sm:text-base leading-relaxed">
          {epoch.text}
        </p>
      </div>
    </motion.div>
  );
}

export default function AboutHistory() {
  return (
    <section className="bg-[#F5F5F5] py-20 md:py-24 border-y border-black/[0.05]" id="history">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-16">
        
        <SectionHeader
          title="L'évolution"
          highlight="du lab."
          description="Nos cycles de maturité technique et artistique, structurés sous forme d'époques d'innovation."
          centered
        />

        {/* Bento Epoch Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16 md:mt-24">
          {epochs.map((epoch, idx) => (
            <EpochCard 
              key={epoch.year} 
              epoch={epoch} 
              delay={idx * 0.15} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
