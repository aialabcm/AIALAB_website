"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Grid, LayoutGrid } from "lucide-react";
import { type PortfolioProject } from "@/data/projects";
import ProjectModal from "@/components/ProjectModal";

export default function WorkGrid({ projects }: { projects: PortfolioProject[] }) {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  
  // Pagination pour la grille secondaire
  const [visibleCount, setVisibleCount] = useState(6);

  // Extraire les catégories uniques présentes dans les projets de manière dynamique
  const dynamicCategories = [
    "Tous",
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  // Réinitialiser la pagination lors du changement de catégorie
  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory]);

  // Ségrégation des projets
  let featuredProjects: PortfolioProject[] = [];
  let archiveProjects: PortfolioProject[] = [];

  if (activeCategory === "Tous") {
    featuredProjects = projects.slice(0, 4);
    archiveProjects = projects.slice(4);
  } else {
    featuredProjects = [];
    archiveProjects = projects.filter((p) => p.category === activeCategory);
  }

  const paginatedArchive = archiveProjects.slice(0, visibleCount);
  const hasMore = archiveProjects.length > visibleCount;

  return (
    <section className="relative w-full pb-32 bg-[#FAFAFA]" id="gallery">
      {/* Sticky Filter Bar */}
      <div className="sticky top-20 md:top-24 z-40 w-full mb-10 md:mb-16 px-4 sm:px-6 flex justify-center">
        <div className="flex items-center bg-white/90 backdrop-blur-md border border-black/[0.05] rounded-full p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] max-w-full overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 px-2 sm:px-0">
            {dynamicCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[12px] sm:text-[13px] font-sans font-bold tracking-tight transition-colors duration-300 outline-none cursor-pointer whitespace-nowrap flex-shrink-0 min-h-[40px] sm:min-h-[44px] flex items-center justify-center ${
                    isActive ? "text-white" : "text-black-deep/60 hover:text-black-deep"
                  }`}
                >
                  <span className="relative z-10">{cat}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryIndicator"
                      className="absolute inset-0 bg-black-deep rounded-full z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 xl:px-16 space-y-16 md:space-y-24">
        
        {/* 1. SECTION VEDETTES (Masonry asymétrique, visible uniquement sur "Tous") */}
        {activeCategory === "Tous" && featuredProjects.length > 0 && (
          <div className="space-y-12">
            <div className="flex items-center gap-3 border-b border-black/[0.05] pb-4">
              <LayoutGrid className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-bold text-xs uppercase tracking-widest text-black-deep/60">
                Projets Vedettes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              {/* Colonne Gauche (Normale) */}
              <div className="flex flex-col gap-12 md:gap-16">
                {featuredProjects
                  .filter((_, i) => i % 2 === 0)
                  .map((project, idx) => (
                    <FeaturedCard
                      key={project.id}
                      project={project}
                      index={idx * 2}
                      reduceMotion={reduceMotion}
                      onSelect={setSelectedProject}
                    />
                  ))}
              </div>
              {/* Colonne Droite (Décalée vers le bas sur desktop) */}
              <div className="flex flex-col gap-12 md:gap-16 md:pt-24">
                {featuredProjects
                  .filter((_, i) => i % 2 === 1)
                  .map((project, idx) => (
                    <FeaturedCard
                      key={project.id}
                      project={project}
                      index={idx * 2 + 1}
                      reduceMotion={reduceMotion}
                      onSelect={setSelectedProject}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. SECTION INDEX / ARCHIVE (Grille compacte 3 colonnes) */}
        {archiveProjects.length > 0 && (
          <div className="space-y-12 pt-8">
            <div className="flex items-center gap-3 border-b border-black/[0.05] pb-4">
              <Grid className="w-5 h-5 text-secondary" />
              <h2 className="font-heading font-bold text-xs uppercase tracking-widest text-black-deep/60">
                {activeCategory === "Tous" ? "Toutes les réalisations" : `Réalisations : ${activeCategory}`}
              </h2>
            </div>

            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {paginatedArchive.map((project, idx) => (
                  <ArchiveCard
                    key={project.id}
                    project={project}
                    index={idx}
                    onSelect={setSelectedProject}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination / Charger Plus */}
            {hasMore && (
              <div className="flex justify-center pt-12">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-white hover:bg-black-deep text-black-deep hover:text-white border border-black/[0.08] hover:border-black-deep rounded-full font-sans font-bold text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer overflow-hidden min-h-[44px]"
                >
                  <span className="relative z-10">Charger plus de projets</span>
                  <span className="absolute inset-0 bg-black-deep scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* État vide si aucun projet n'est trouvé */}
        {featuredProjects.length === 0 && archiveProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <p className="font-heading font-bold text-lg text-black-deep/60">
              Aucun projet trouvé dans cette catégorie.
            </p>
          </div>
        )}
      </div>

      {/* Modal de détail du projet */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// Composant Carte Vedette (Large, immersive, asymétrique)
// ─────────────────────────────────────────────────────────
function FeaturedCard({
  project,
  index,
  reduceMotion,
  onSelect,
}: {
  project: PortfolioProject;
  index: number;
  reduceMotion: boolean | null;
  onSelect: (project: PortfolioProject) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group w-full"
    >
      <button
        type="button"
        onClick={() => onSelect(project)}
        data-cursor="explore"
        className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAFAFA] cursor-pointer"
      >
        {/* Aspect Image immersif pour Vedettes */}
        <div className="relative aspect-[16/11] sm:aspect-[16/10] md:aspect-[4/3] rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-black/5 mb-5 sm:mb-6 shadow-md border border-black/[0.03]">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-w-768px) 100vw, 45vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            priority={index < 2}
          />
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg">
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-black-deep" />
          </div>
        </div>

        {/* Titres & Badges */}
        <div className="space-y-2 sm:space-y-2.5 px-1 sm:px-3">
          <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase block">
            {project.category}
          </span>
          <h3 className="font-heading font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black-deep leading-tight max-w-[20ch]">
            {project.name}
          </h3>
          <p className="font-sans text-dark/70 text-sm sm:text-base leading-relaxed max-w-[45ch]">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1.5">
            <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#EAEAEA] border border-black/[0.04] text-dark text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider">
              {project.location}
            </span>
            {project.client && (
              <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#EAEAEA] border border-black/[0.04] text-dark text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider">
                Client : {project.client}
              </span>
            )}
          </div>
        </div>
      </button>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────
// Composant Carte Index/Archive (Compacte, 3 colonnes)
// ─────────────────────────────────────────────────────────
function ArchiveCard({
  project,
  index,
  onSelect,
}: {
  project: PortfolioProject;
  index: number;
  onSelect: (project: PortfolioProject) => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group w-full"
    >
      <button
        type="button"
        onClick={() => onSelect(project)}
        data-cursor="explore"
        className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAFAFA] cursor-pointer"
      >
        {/* Aspect Image compact pour Archive */}
        <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl md:rounded-[1.75rem] overflow-hidden bg-black/5 mb-3 sm:mb-4 shadow-sm border border-black/[0.03]">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-w-640px) 100vw, (max-w-1024px) 45vw, 30vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-md">
            <ArrowUpRight className="w-4 h-4 text-black-deep" />
          </div>
        </div>

        {/* Titres & Badges compacts */}
        <div className="space-y-1.5 px-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] font-mono font-bold tracking-widest text-secondary uppercase block">
              {project.category}
            </span>
            <span className="text-[9px] font-sans font-bold text-dark/40 uppercase">
              {project.location}
            </span>
          </div>
          <h3 className="font-heading font-bold text-lg text-black-deep tracking-tight group-hover:text-primary transition-colors duration-300">
            {project.name}
          </h3>
          <p className="font-sans text-dark/60 text-xs line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>
        </div>
      </button>
    </motion.article>
  );
}
