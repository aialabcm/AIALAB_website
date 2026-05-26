"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface Expertise {
  id: string;
  title: string;
  sub: string;
  desc: string;
  image: string;
  tags: string[];
}

const expertises: Expertise[] = [
  {
    id: "01",
    title: "Branding & Identité visuelle",
    sub: "Stratégie de marque",
    desc: "Donnez à votre marque une personnalité forte et mémorable. Nous créons un univers visuel cohérent qui vous différencie.",
    image: "/images/services/Branding & Identité visuelle.webp",
    tags: [
      "Stratégie de marque",
      "Direction Artistique",
      "Design de Logo",
      "Charte Graphique",
      "Positionnement",
      "Tone of Voice"
    ]
  },
  {
    id: "02",
    title: "Design Graphique & Digital",
    sub: "Création visuelle",
    desc: "Des créations qui captivent et engagent. Nous concevons des visuels percutants, optimisés pour renforcer votre présence sur tous supports.",
    image: "/images/services/Design Graphique & Digital.webp",
    tags: [
      "Social Media Design",
      "Motion Design",
      "Pitch Decks",
      "Publicités Digitales",
      "Newsletters",
      "Direction Créative"
    ]
  },
  {
    id: "03",
    title: "Web Design & Développement",
    sub: "Performance & Esthétique",
    desc: "Alliez beauté et performance. Nous créons des sites web élégants, intuitifs et techniquement irréprochables, offrant une UX fluide.",
    image: "/images/services/web design & developpement.webp",
    tags: [
      "UI / UX Design",
      "Développement Next.js",
      "Sites E-commerce",
      "Mobile App Design",
      "SEO & Performance",
      "Design Systems"
    ]
  },
  {
    id: "04",
    title: "Solutions Print & Impression",
    sub: "Supports Tangibles",
    desc: "Donnez du poids à votre communication. De la brochure au packaging, nous maîtrisons chaque étape pour des supports tangibles.",
    image: "/images/services/print &i impressio.webp",
    tags: [
      "Packaging Design",
      "Brochures & Édition",
      "Cartes de Visite",
      "Signalétique",
      "Identité Packaging",
      "Suivi de Production"
    ]
  },
  {
    id: "05",
    title: "Marketing Digital & Communication",
    sub: "Stratégie de Croissance",
    desc: "Nous développons des plans de communication sur mesure et déployons des campagnes percutantes pour accroître votre visibilité.",
    image: "/images/services/marketing didgital.webp",
    tags: [
      "Campagnes Ads (Meta, Google)",
      "Stratégie Social Media",
      "Inbound Marketing",
      "Email Marketing",
      "SEO & Copywriting",
      "Growth Hacking"
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24
    }
  }
};

export default function ExpertiseSection() {
  return (
    <section className="bg-anthracite py-24 relative overflow-hidden" id="expertises">
      <div className="max-w-container mx-auto px-6 md:px-20 relative z-10">
        
        <SectionHeader 
          title="Nos"
          highlight="expertises."
          description="Une approche humaine, stratégique et sincèrement engagée pour faire grandir votre entreprise."
          dark
        />

        {/* Grid of Expertise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {expertises.map((exp, idx) => (
            <ExpertiseCard 
              key={exp.id} 
              exp={exp} 
              index={idx}
            />
          ))}
        </div>

        {/* Floating Call to Action (Discret) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex justify-center lg:justify-start"
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

function ExpertiseCard({ exp, index }: { exp: Expertise; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const showContent = isHovered || isMobile;

  // Dynamic grid classes for balanced layout
  const gridClasses = index === 4
    ? "col-span-1 md:col-span-2 lg:col-span-3"
    : index === 3
      ? "col-span-1 md:col-span-1 lg:col-span-3"
      : "col-span-1 md:col-span-1 lg:col-span-2";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative h-[380px] sm:h-[420px] md:h-[480px] rounded-[1.5rem] sm:rounded-[2.25rem] overflow-hidden bg-black-deep/60 border border-white/10 flex flex-col justify-between p-6 sm:p-8 group transition-all duration-500 hover:border-primary/30 select-none cursor-pointer ${gridClasses}`}
    >
      {/* Card background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={exp.image}
          alt={exp.title}
          fill
          sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
          className={`object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] scale-100 transition-all duration-500 ${
            showContent 
              ? "scale-105 blur-[6px] brightness-[0.25]" 
              : "blur-none brightness-[0.6]"
          }`}
        />
        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black-deep/40 via-transparent to-black-deep/80 z-10" />
      </div>

      {/* Content: Top Bar */}
      <div className="relative z-20 flex justify-between items-start">
        <div className="max-w-[75%]">
          <span className="text-[10px] font-mono font-bold tracking-widest text-primary/80 uppercase block mb-1">
            {exp.sub}
          </span>
          <h3 className="font-heading font-bold text-xl md:text-2xl text-white tracking-tight leading-tight">
            {exp.title}
          </h3>
        </div>
        <span className="font-mono text-xs text-white/40 tracking-wider">
          /{exp.tags.length} services
        </span>
      </div>

      {/* Content: Middle Bar (Staggered Badges list revealed on hover) */}
      <div className="relative z-20 my-auto flex flex-col justify-center min-h-[140px]">
        <AnimatePresence>
          {showContent && (
            <motion.div
              variants={containerVariants}
              initial={isMobile ? "show" : "hidden"}
              animate="show"
              exit="hidden"
              className="flex flex-wrap gap-2 justify-start items-center"
            >
              {exp.tags.map((tag) => (
                <motion.span
                  key={tag}
                  variants={itemVariants}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white rounded-full text-xs font-semibold tracking-wide transition-all duration-300"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content: Bottom Bar */}
      <div className="relative z-20 flex justify-between items-end">
        {/* Animated Custom SVG Icon tailored for AIA LAB */}
        <div className="w-12 h-12 flex items-center justify-center text-white">
          {getExpertiseIcon(exp.id, isHovered)}
        </div>

        {/* Action Trigger Button */}
        <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:border-primary group-hover:text-primary group-hover:bg-primary/10 transition-all duration-500">
          <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" />
        </div>
      </div>
    </div>
  );
}

// Custom animated icons styled for AIA LAB branding
function getExpertiseIcon(id: string, isHovered: boolean) {
  switch (id) {
    case "01":
      return <BrandingIcon isHovered={isHovered} />;
    case "02":
      return <GraphicIcon isHovered={isHovered} />;
    case "03":
      return <WebIcon isHovered={isHovered} />;
    case "04":
      return <PrintIcon isHovered={isHovered} />;
    case "05":
      return <MarketingIcon isHovered={isHovered} />;
    default:
      return null;
  }
}

function BrandingIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="1.5">
      <motion.path
        d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z"
        animate={{
          rotate: isHovered ? 90 : 0,
          stroke: isHovered ? "#08C1DC" : "#ffffff",
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.circle
        cx="12"
        cy="12"
        r="3"
        animate={{
          stroke: isHovered ? "#08C1DC" : "#ffffff",
          opacity: isHovered ? 0.8 : 0.3,
          scale: isHovered ? [1, 1.3, 1] : 1,
        }}
        transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0 }}
      />
    </svg>
  );
}

function GraphicIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="1.5">
      <motion.rect
        x="3"
        y="3"
        width="12"
        height="12"
        rx="2"
        animate={{
          x: isHovered ? -1 : 0,
          y: isHovered ? -1 : 0,
          stroke: isHovered ? "#08C1DC" : "#ffffff",
        }}
        transition={{ duration: 0.5 }}
      />
      <motion.rect
        x="9"
        y="9"
        width="12"
        height="12"
        rx="2"
        animate={{
          x: isHovered ? 1 : 0,
          y: isHovered ? 1 : 0,
          stroke: isHovered ? "#08C1DC" : "rgba(255,255,255,0.4)",
        }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M5 19L19 5"
        strokeLinecap="round"
        animate={{
          stroke: isHovered ? "#08C1DC" : "rgba(255,255,255,0.2)",
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
      />
    </svg>
  );
}

function WebIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="1.5">
      <motion.rect
        x="2"
        y="3"
        width="20"
        height="14"
        rx="2"
        animate={{
          stroke: isHovered ? "#08C1DC" : "#ffffff",
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.5 }}
      />
      <line x1="2" y1="13" x2="22" y2="13" />
      <motion.path
        d="M7 17L12 21L17 17"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          stroke: isHovered ? "#08C1DC" : "#ffffff",
        }}
      />
      <motion.path
        d="M8 6L5 8L8 10 M16 6L19 8L16 10"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          stroke: isHovered ? "#08C1DC" : "rgba(255,255,255,0.4)",
          x: isHovered ? [0, -1, 1, 0] : 0,
        }}
        transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
      />
    </svg>
  );
}

function PrintIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="1.5">
      <motion.path
        d="M6 18H18V6H6V18Z"
        animate={{
          stroke: isHovered ? "#08C1DC" : "#ffffff",
        }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M3 6H21"
        animate={{
          stroke: isHovered ? "#08C1DC" : "#ffffff",
        }}
      />
      <motion.path
        d="M8 18V22H16V18"
        animate={{
          y: isHovered ? [0, 2, 0] : 0,
          stroke: isHovered ? "#08C1DC" : "rgba(255,255,255,0.5)",
        }}
        transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0 }}
      />
      <motion.path
        d="M10 10H14 M10 14H14"
        strokeLinecap="round"
        animate={{
          opacity: isHovered ? [0.3, 1, 0.3] : 0.5,
          stroke: isHovered ? "#08C1DC" : "rgba(255,255,255,0.3)",
        }}
        transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
      />
    </svg>
  );
}

function MarketingIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="1.5">
      <circle cx="12" cy="12" r="2" fill="white" />
      <motion.circle
        cx="12"
        cy="12"
        r="6"
        animate={{
          stroke: isHovered ? "#08C1DC" : "#ffffff",
          scale: isHovered ? [1, 1.2, 1] : 1,
          opacity: isHovered ? 0.9 : 0.6,
        }}
        transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
      />
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        animate={{
          stroke: isHovered ? "#08C1DC" : "rgba(255,255,255,0.3)",
          scale: isHovered ? [1, 1.15, 1] : 1,
          opacity: isHovered ? 0.7 : 0.2,
        }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0, delay: 0.3 }}
      />
      <motion.path
        d="M12 2V4 M12 20V22 M2 12H4 M20 12H22"
        strokeLinecap="round"
        animate={{
          stroke: isHovered ? "#08C1DC" : "rgba(255,255,255,0.3)",
          opacity: isHovered ? [0.4, 1, 0.4] : 0.3,
        }}
        transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
      />
    </svg>
  );
}
