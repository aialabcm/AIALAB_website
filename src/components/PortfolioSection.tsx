"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { type PortfolioProject } from "@/data/projects";
import ProjectModal from "./ProjectModal";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────────────────
   Project Card — Editorial style (Mads Matters inspired)
   ───────────────────────────────────────────────────────────── */
function ProjectCard({
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
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: EASE }}
      className="group relative z-20"
    >
      <button
        type="button"
        onClick={() => onSelect(project)}
        className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-[2rem] overflow-hidden cursor-pointer"
      >
        {/* Image wrapper with high-end hover effects */}
        <div className="relative aspect-[16/11] rounded-[2rem] overflow-hidden bg-white/[0.02]">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
          />
          {/* Subtle gradient vignette appearing on hover for text readability and premium look */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
          
          {/* Floating arrow button with spring scale & translation */}
          <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 scale-90 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-500 ease-[0.16,1,0.3,1] shadow-lg">
            <ArrowUpRight className="w-5 h-5 text-black-deep" aria-hidden />
          </div>
        </div>

        {/* Info Area — Editorial spacing and typography */}
        <div className="space-y-3 pt-6 px-2">
          {/* Category Badges — Editorial & minimal style */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.04] text-white/80 border border-white/10 text-[9px] font-mono font-bold tracking-widest uppercase transition-colors duration-300 group-hover:border-primary/40 group-hover:text-primary">
              {project.category}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.04] text-white/60 border border-white/10 text-[9px] font-mono font-bold tracking-widest uppercase">
              {project.location}
            </span>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-heading font-black text-xs tracking-[0.15em] text-primary uppercase">
              {project.name}
            </h3>
            <p className="font-heading font-bold text-xl md:text-2xl lg:text-[1.5rem] text-white leading-tight tracking-tight max-w-[20ch]">
              {project.tagline}
            </p>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Section — Option A (Static on Mobile, Sticky on Desktop)
   ───────────────────────────────────────────────────────────── */
export default function PortfolioSection({ projects }: { projects: PortfolioProject[] }) {
  const latestProjects = projects.slice(0, 4);
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Dynamic animations matching scroll progression (Desktop only)
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.45, 0.8, 1],
    [0.1, 1, 0.25, 0.15, 0]
  );

  const titleScale = useTransform(
    scrollYProgress,
    [0.15, 0.85],
    [1.04, 0.96]
  );

  // Vertical parallax movement of the background title for depth (Desktop only)
  const titleY = useTransform(
    scrollYProgress,
    [0.15, 0.85],
    [0, -80]
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="relative text-white bg-black rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden mx-[1%] my-6 md:my-10"
        id="portfolio"
      >
        {/* Top edge glow to integrate with previous section */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        {/* ── 1. MOBILE HEADER (Static / Standard Flow) ── */}
        <div className="md:hidden flex flex-col items-center justify-center pt-16 pb-12 px-6 text-center select-none">
          <div className="relative flex flex-col items-center justify-center">
            {/* "WORK" */}
            <span
              className="font-heading font-black text-white uppercase leading-[0.82] tracking-[-0.04em]"
              style={{ fontSize: "clamp(5rem, 18vw, 8rem)" }}
            >
              WORK
            </span>
            {/* "dernier projet" */}
            <span
              className="font-script text-primary absolute translate-y-10 -rotate-6 tracking-wider whitespace-nowrap drop-shadow-[0_2px_8px_rgba(8,193,220,0.25)]"
              style={{
                fontSize: "clamp(2rem, 7vw, 3.5rem)",
              }}
            >
              dernier projet
            </span>
          </div>
        </div>

        {/* ── 2. DESKTOP STICKY HEADER (Stays fixed in viewport) ── */}
        <div className="hidden md:flex sticky top-0 z-0 h-screen w-full items-center justify-center overflow-hidden pointer-events-none">
          <motion.div
            className="relative flex flex-col items-center justify-center select-none pointer-events-none w-full"
            style={{
              scale: reduceMotion ? 1 : titleScale,
              opacity: reduceMotion ? 1 : titleOpacity,
              y: reduceMotion ? 0 : titleY,
            }}
          >
            {/* "WORK" — massive bold white text */}
            <span
              className="font-heading font-black text-white uppercase leading-[0.82] tracking-[-0.04em] text-center"
              style={{ fontSize: "clamp(6rem, 20vw, 25rem)" }}
            >
              WORK
            </span>
            {/* "dernier projet" — script font overlay using Caveat */}
            <span
              className="font-script text-primary absolute translate-y-12 md:translate-y-16 -rotate-6 tracking-wider whitespace-nowrap drop-shadow-[0_4px_12px_rgba(8,193,220,0.2)]"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 9rem)",
              }}
            >
              dernier projet
            </span>
          </motion.div>
        </div>

        {/* ── 3. CARDS CONTAINER — Responsive layout offset ── */}
        <div className="relative z-10 md:-mt-[100vh]">
          {/* Spacer of 95vh — Hidden on mobile to avoid empty spaces */}
          <div className="hidden md:block h-[95vh] w-full pointer-events-none" />

          {/* Cards content area */}
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 pb-1">
            {/* Mobile Layout: Single column list, chronological */}
            <div className="md:hidden flex flex-col gap-12">
              {latestProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  onSelect={setSelectedProject}
                />
              ))}
            </div>

            {/* Desktop Layout: Staggered two columns */}
            <div className="hidden md:grid grid-cols-2 gap-x-16 gap-y-24">
              {/* Left column */}
              <div className="flex flex-col gap-24">
                {latestProjects.filter((_, i) => i % 2 === 0).map((project, idx) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={idx * 2}
                    onSelect={setSelectedProject}
                  />
                ))}
              </div>
              {/* Right column */}
              <div className="flex flex-col gap-24">
                {latestProjects.filter((_, i) => i % 2 === 1).map((project, idx) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={idx * 2 + 1}
                    onSelect={setSelectedProject}
                  />
                ))}
              </div>
            </div>

            {/* Bottom CTA — solid bg-black wrapper to cleanly cover the sticky title on final scroll */}
            <div className="relative z-30 bg-black mt-20 md:mt-28 -mx-6 md:-mx-12 lg:-mx-20 px-6 md:px-12 lg:px-20 pb-24 md:pb-36 pt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
                className="flex justify-center"
              >
                <Link
                  href="/work"
                  className="group flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-white/70 hover:text-primary transition-colors duration-300"
                >
                  <span>Voir tous les projets</span>
                  <div className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              </motion.div>
            </div>
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
