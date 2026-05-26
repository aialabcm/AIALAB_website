"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProjectModal, { type PortfolioProject } from "./ProjectModal";

const projects: PortfolioProject[] = [
  {
    id: "studio-landing",
    name: "Studio Landing",
    tagline: "L'excellence digitale en première impression.",
    category: "Web Design",
    location: "Montréal — QC",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    headline: "L'Excellence Digitale En Première Impression",
    story: [
      "Studio Landing avait besoin d'une présence en ligne qui reflète leur positionnement haut de gamme. Le défi : créer une expérience immersive dès le premier contact, tout en maintenant des performances techniques irréprochables.",
      "Nous avons conçu une landing page qui allie animation fluide et contenu stratégique, transformant chaque visiteur en prospect qualifié. Le résultat : un taux de conversion multiplié par 3 en deux mois.",
    ],
    client: "Studio Landing Inc.",
    services: ["Web Design", "Développement", "Stratégie UX"],
  },
  {
    id: "aia-identity",
    name: "AIA Identity",
    tagline: "Une identité qui incarne l'innovation.",
    category: "Branding",
    location: "Paris — FR",
    image:
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200&auto=format&fit=crop",
    headline: "Une Identité Qui Incarne L'Innovation",
    story: [
      "AIA cherchait à se repositionner sur le marché de l'intelligence artificielle avec une identité qui inspire confiance et avant-garde. L'ancienne marque ne reflétait plus l'ambition de l'entreprise.",
      "Nous avons développé un système visuel complet — du logo aux supports de communication — qui positionne AIA comme un leader incontournable de son secteur. Une identité pensée pour durer.",
    ],
    client: "AIA Technologies",
    services: ["Branding", "Identité Visuelle", "Direction Artistique"],
  },
  {
    id: "ecommerce-lux",
    name: "E-commerce Lux",
    tagline: "Le luxe accessible en quelques clics.",
    category: "Digital Experience",
    location: "Genève — CH",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    headline: "Le Luxe Accessible En Quelques Clics",
    story: [
      "E-commerce Lux souhaitait offrir une expérience d'achat en ligne qui rivalise avec le service en boutique. Chaque détail devait respirer l'élégance et le raffinement.",
      "Notre solution : une plateforme e-commerce immersive avec des micro-interactions soignées, une navigation intuitive et un tunnel d'achat simplifié. Le panier moyen a augmenté de 45%.",
    ],
    client: "Lux Commerce SA",
    services: ["Digital Experience", "E-commerce", "UI Design"],
  },
  {
    id: "nectar",
    name: "Nectar Fragrance",
    tagline: "L'art de la fragrance réinventé.",
    category: "Branding",
    location: "Lyon — FR",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop",
    headline: "L'Art De La Fragrance Réinventé",
    story: [
      "Nectar Fragrance lançait une nouvelle gamme de parfums artisanaux et avait besoin d'une identité de marque aussi raffinée que ses créations. L'enjeu : se démarquer dans un marché saturé.",
      "Nous avons créé un univers visuel sensoriel, mêlant typographie élégante et palette de couleurs évocatrice. La marque a gagné 200% de visibilité sur les réseaux sociaux en trois mois.",
    ],
    client: "Nectar Fragrance",
    services: ["Branding", "Packaging", "Stratégie Digitale"],
  },
];

const latestProjects = projects.slice(0, 4);
const leftColumn = latestProjects.filter((_, i) => i % 2 === 0);
const rightColumn = latestProjects.filter((_, i) => i % 2 === 1);

const EASE = [0.16, 1, 0.3, 1] as const;
const PHASE1_DURATION = 0.55;
const CARDS_BASE_DELAY = 0.45;
const CARD_STAGGER = 0.14;
const CURTAIN_DURATION = 0.75;

function ProjectCard({
  project,
  order,
  active,
  onSelect,
}: {
  project: PortfolioProject;
  order: number;
  active: boolean;
  onSelect: (project: PortfolioProject) => void;
}) {
  const reduceMotion = useReducedMotion();
  const delay = CARDS_BASE_DELAY + order * CARD_STAGGER;
  const textDelay = delay + (reduceMotion ? 0.1 : 0.35);

  return (
    <article className="group">
      <button
        type="button"
        onClick={() => onSelect(project)}
        data-cursor="explore"
        className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-black-deep cursor-pointer"
      >
        <motion.div
          className="relative aspect-[4/3] rounded-[1.75rem] md:rounded-[2rem] overflow-hidden bg-white/5 mb-5 md:mb-6"
          initial={false}
          animate={
            active
              ? {
                  clipPath: "inset(0% 0% 0% 0%)",
                  opacity: 1,
                }
              : reduceMotion
                ? { opacity: 0 }
                : { clipPath: "inset(100% 0% 0% 0%)", opacity: 1 }
          }
          transition={{
            duration: reduceMotion ? 0.35 : CURTAIN_DURATION,
            delay: active ? delay : 0,
            ease: EASE,
          }}
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 42vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 text-black-deep" aria-hidden />
          </div>
        </motion.div>

        <motion.div
          className="space-y-2 md:space-y-3 pr-2"
          initial={false}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.45, delay: active ? textDelay : 0, ease: EASE }}
        >
          <h3 className="font-heading font-bold text-lg md:text-xl text-primary tracking-tight leading-none">
            {project.name}
          </h3>
          <p className="font-heading font-bold text-xl md:text-2xl lg:text-[1.65rem] text-white leading-[1.15] tracking-tight max-w-[22ch]">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-2 pt-2 md:pt-3">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary text-black-deep text-[11px] font-heading font-bold">
              {project.category}
            </span>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary text-black-deep text-[11px] font-heading font-bold">
              {project.location}
            </span>
          </div>
        </motion.div>
      </button>
    </article>
  );
}

function ProjectColumn({
  items,
  offset,
  active,
  orderOffset,
  onSelect,
}: {
  items: PortfolioProject[];
  offset?: boolean;
  active: boolean;
  orderOffset: number;
  onSelect: (project: PortfolioProject) => void;
}) {
  return (
    <div
      className={`flex flex-col gap-12 md:gap-16 lg:gap-20 ${offset ? "md:mt-12 lg:mt-16" : ""}`}
    >
      {items.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          order={orderOffset + index * 2}
          active={active}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
    margin: "0px 0px -8% 0px",
  });
  const reduceMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const showCards = isInView;
  const showHeader = isInView;

  return (
    <>
      <section
        ref={sectionRef}
        className="relative text-white overflow-hidden pt-14 md:pt-20 pb-24 md:pb-32"
        id="portfolio"
      >
        {/* Phase 1 — black background wash */}
        <motion.div
          className="absolute inset-0 bg-black-deep z-0"
          aria-hidden
          initial={false}
          animate={{ opacity: showHeader ? 1 : 0 }}
          transition={{ duration: PHASE1_DURATION, ease: EASE }}
        />

        {/* Phase 1 — hero typography (with background) */}
        <motion.div
          className="relative z-10 flex items-center justify-center px-4 mb-2 md:mb-4 min-h-[180px] md:min-h-[240px] w-full"
          initial={false}
          animate={
            showHeader
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: reduceMotion ? 0 : 28, scale: reduceMotion ? 1 : 0.98 }
          }
          transition={{ duration: PHASE1_DURATION, ease: EASE }}
        >
          <div className="relative w-full flex items-center justify-center">
            <h2
              className="font-heading font-black uppercase text-white text-center leading-[0.85] tracking-[-0.04em] select-none"
              style={{ fontSize: "clamp(3.5rem, 16vw, 11rem)" }}
            >
              PROJETS
            </h2>
            <p
              className="font-heading accent-italic text-primary absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
              style={{ fontSize: "clamp(2rem, 6.5vw, 4.5rem)" }}
              aria-hidden
            >
              derniers projets
            </p>
          </div>
          <span className="sr-only">Nos quatre derniers projets</span>
        </motion.div>

        {/* Cards zone — watermark + blur (behind grid only) */}
        <div className="relative z-[5] max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 -mt-4 md:-mt-12">
          <motion.div
            className="pointer-events-none absolute inset-x-5 md:inset-x-10 lg:inset-x-16 top-0 bottom-0 overflow-hidden rounded-[2rem]"
            aria-hidden
            initial={false}
            animate={{
              opacity: showCards ? 1 : 0,
              filter: showCards && !reduceMotion ? "blur(10px)" : "blur(0px)",
            }}
            transition={{
              opacity: { duration: 0.5, delay: showCards ? CARDS_BASE_DELAY : 0 },
              filter: { duration: 0.65, delay: showCards ? CARDS_BASE_DELAY + 0.1 : 0 },
            }}
          >
            <p
              className="font-heading font-black uppercase text-center text-white/[0.06] tracking-[-0.04em] leading-none absolute left-1/2 top-[8%] -translate-x-1/2 w-full"
              style={{ fontSize: "clamp(4rem, 18vw, 13rem)" }}
            >
              PROJETS
            </p>
          </motion.div>

          {/* Phase 2 — staggered cards */}
          <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10">
            <ProjectColumn
              items={leftColumn}
              active={showCards}
              orderOffset={0}
              onSelect={setSelectedProject}
            />
            <ProjectColumn
              items={rightColumn}
              active={showCards}
              orderOffset={1}
              onSelect={setSelectedProject}
            />
          </div>
        </div>
      </section>

      {/* Modal — rendered outside section to avoid z-index issues */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
