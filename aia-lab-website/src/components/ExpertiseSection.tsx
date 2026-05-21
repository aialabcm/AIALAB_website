"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Sparkles, 
  PenTool, 
  Monitor, 
  Printer, 
  Megaphone,
  Plus,
  ArrowUpRight
} from "lucide-react";

interface Expertise {
  id: string;
  title: string;
  sub: string;
  desc: string;
  icon: any; // Lucide icon type
}

const expertises: Expertise[] = [
  {
    id: "01",
    title: "Branding & Identité visuelle",
    sub: "Stratégie de marque",
    desc: "Donnez à votre marque une personnalité forte et mémorable. Nous créons un univers visuel cohérent qui vous différencie et parle directement à votre audience.",
    icon: Sparkles,
  },
  {
    id: "02",
    title: "Design Graphique & Digital",
    sub: "Création visuelle",
    desc: "Des créations qui captivent et engagent. Nous concevons des visuels percutants, optimisés pour renforcer votre présence sur tous vos supports : réseaux sociaux, documents professionnels et campagnes digitales.",
    icon: PenTool,
  },
  {
    id: "03",
    title: "Web Design & Développement",
    sub: "Performance & Esthétique",
    desc: "Alliez beauté et performance. Nous créons des sites web élégants, intuitifs et techniquement irréprochables, offrant une expérience utilisateur fluide qui convertit vos visiteurs en clients.",
    icon: Monitor,
  },
  {
    id: "04",
    title: "Solutions Print & Impression",
    sub: "Supports Tangibles",
    desc: "Donnez du poids à votre communication. De la brochure à la carte de visite, nous maîtrisons chaque étape - de la création à l'impression - pour des supports tangibles qui marquent les esprits.",
    icon: Printer,
  },
  {
    id: "05",
    title: "Marketing Digital & Communication",
    sub: "Stratégie de Croissance",
    desc: "Nous développons des plans de communication sur mesure et déployons des campagnes percutantes pour accroître votre visibilité et générer des résultats concrets.",
    icon: Megaphone,
  },
];

import SectionHeader from "./SectionHeader";

export default function ExpertiseSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="bg-anthracite py-24 relative overflow-hidden" id="expertises">
      <div className="max-w-container mx-auto px-6 md:px-20 relative z-10">
        
        <SectionHeader 
          title="Nos"
          highlight="expertises."
          description="Une approche humaine, stratégique et sincèrement engagée pour faire grandir votre entreprise."
          dark
        />

        {/* Liste Accordéon Vertical */}
        <div className="border-t border-strict border-white/10">
          {expertises.map((exp, idx) => (
            <ExpertiseItem 
              key={exp.id} 
              exp={exp} 
              isLast={idx === expertises.length - 1}
              isHovered={hoveredId === exp.id}
              onHover={() => setHoveredId(exp.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>

        {/* Floating Call to Action (Discret) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex justify-center lg:justify-start"
        >
          <a
            href="#cta-contact"
            className="group flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-white hover:text-primary transition-colors duration-300"
          >
            <span>Démarrer un projet avec le lab</span>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 group-hover:text-white transition-colors" />
            </div>
          </a>
        </motion.div>
      </div>

      {/* Fond Décoratif (Subtil) */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}

function ExpertiseItem({ 
  exp, 
  isHovered, 
  onHover, 
  onLeave 
}: { 
  exp: Expertise; 
  isLast: boolean; 
  isHovered: boolean; 
  onHover: () => void; 
  onLeave: () => void; 
}) {
  const Icon = exp.icon;

  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      data-cursor="explore"
      className={`relative group cursor-pointer border-b border-strict border-white/10 transition-colors duration-500 ${isHovered ? 'bg-white/5' : ''}`}
    >
      <div className="py-8 md:py-12 px-4 md:px-12 flex items-center gap-8 relative z-10">
        {/* Titre & Sub */}
        <div className="flex-1">
          <span className={`text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-500 block mb-2 ${isHovered ? 'text-primary' : 'text-white/30'}`}>
            {exp.sub}
          </span>
          <h3 className={`font-heading font-bold text-2xl md:text-3xl tracking-tight transition-all duration-500 ${isHovered ? 'translate-x-2 text-white' : 'text-white/80'}`}>
            {exp.title}
          </h3>
        </div>

        {/* Icone / Trigger */}
        <div className="flex items-center gap-6">
          <div className={`p-4 rounded-full border border-strict transition-all duration-500 ${isHovered ? 'bg-primary border-primary scale-110 shadow-[0_0_20px_rgba(8,193,220,0.3)]' : 'bg-transparent border-white/10'}`}>
            <Icon className={`w-5 h-5 transition-colors duration-500 ${isHovered ? 'text-white' : 'text-white/40'}`} />
          </div>
          <div className="hidden md:block overflow-hidden w-6 h-6">
             <motion.div
               animate={{ y: isHovered ? -24 : 0 }}
               className="flex flex-col gap-0"
             >
                <Plus className="w-6 h-6 text-white/10" />
                <Plus className="w-6 h-6 text-primary" />
             </motion.div>
          </div>
        </div>
      </div>

      {/* Accordéon Expansion */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-12 px-4 md:px-12 md:pl-32 max-w-4xl">
              <p className="font-sans text-base md:text-lg text-white/60 leading-relaxed">
                {exp.desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Background Accent (Subtile ligne de couleur) */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-primary origin-left z-20"
      />
    </motion.div>
  );
}
