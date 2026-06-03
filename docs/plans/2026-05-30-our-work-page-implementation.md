# Plan d'Implémentation : Page "Our Work" (Nos Réalisations) — AIA LAB

**Objectif :** Créer la page `/work` d'AIA LAB en intégrant une galerie d'images volantes dans le Hero, une barre de filtres en verre dépoli collante, une grille asymétrique masonry pour les projets, un Wall of Fame pour les témoignages associés aux projets et un double CTA de conversion, le tout adapté au thème clair signature.

**Architecture :** 
L'implémentation repose sur le découpage de la page en composants React réutilisables et performants :
* `src/data/projects.ts` : Centralise les types et les données des projets.
* `src/components/WorkHero.tsx` : Gère le header Montserrat, les blobs lumineux d'arrière-plan et le nuage de vignettes flottantes interactives (animations Framer Motion).
* `src/components/WorkGrid.tsx` : Renders les filtres collants (`sticky`) et la grille asymétrique dynamique.
* `src/components/WallOfFame.tsx` : Gère l'affichage combiné des avis clients étoilés et de leurs livrables.
* `src/components/WorkCTA.tsx` : Renders le double CTA modulaire au bas de la page.

**Technologies clés :** Next.js (App Router), React, Tailwind CSS v4, Framer Motion, Lucide React.

---

## Proposition Technique détaillée par Tâche

### Tâche 1 : Centralisation des données de projets
**Fichiers ciblés :**
* Créer : `src/data/projects.ts`
* Modifier : `src/components/PortfolioSection.tsx`

#### Étape 1 : Création de `src/data/projects.ts`
Nous créons un fichier partagé pour stocker la structure et la liste complète des projets (avec 2 projets additionnels pour enrichir le catalogue).
```typescript
export interface PortfolioProject {
  id: string;
  name: string;
  tagline: string;
  category: string;
  location: string;
  image: string;
  headline: string;
  story: [string, string];
  client: string;
  services: string[];
}

export const projects: PortfolioProject[] = [
  {
    id: "studio-landing",
    name: "Studio Landing",
    tagline: "L'excellence digitale en première impression.",
    category: "Web Design",
    location: "Montréal — QC",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    headline: "L'Excellence Digitale En Première Impression",
    story: [
      "Studio Landing avait besoin d'une présence en ligne qui reflète leur positionnement haut de gamme. Le défi : créer une expérience immersive dès le premier contact, tout en maintenant des performances techniques irréprochables.",
      "Nous avons conçu une landing page qui allie animation fluide et contenu stratégique, transformant chaque visiteur en prospect qualifié. Le résultat : un taux de conversion multiplié par 3 en deux mois."
    ],
    client: "Studio Landing Inc.",
    services: ["Web Design", "Développement", "Stratégie UX"]
  },
  {
    id: "aia-identity",
    name: "AIA Identity",
    tagline: "Une identité qui incarne l'innovation.",
    category: "Branding",
    location: "Paris — FR",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200&auto=format&fit=crop",
    headline: "Une Identité Qui Incarne L'Innovation",
    story: [
      "AIA cherchait à se repositionner sur le marché de l'intelligence artificielle avec une identité qui inspire confiance et avant-garde. L'ancienne marque ne reflétait plus l'ambition de l'entreprise.",
      "Nous avons développé un système visuel complet — du logo aux supports de communication — qui positionne AIA comme un leader incontournable de son secteur. Une identité pensée pour durer."
    ],
    client: "AIA Technologies",
    services: ["Branding", "Identité Visuelle", "Direction Artistique"]
  },
  {
    id: "ecommerce-lux",
    name: "E-commerce Lux",
    tagline: "Le luxe accessible en quelques clics.",
    category: "Digital Experience",
    location: "Genève — CH",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    headline: "Le Luxe Accessible En Quelques Clics",
    story: [
      "E-commerce Lux souhaitait offrir une expérience d'achat en ligne qui rivalise avec le service en boutique. Chaque détail devait respirer l'élégance et le raffinement.",
      "Notre solution : une plateforme e-commerce immersive avec des micro-interactions soignées, une navigation intuitive et un tunnel d'achat simplifié. Le panier moyen a augmenté de 45%."
    ],
    client: "Lux Commerce SA",
    services: ["Digital Experience", "E-commerce", "UI Design"]
  },
  {
    id: "nectar",
    name: "Nectar Fragrance",
    tagline: "L'art de la fragrance réinventé.",
    category: "Branding",
    location: "Lyon — FR",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop",
    headline: "L'Art De La Fragrance Réinventé",
    story: [
      "Nectar Fragrance lançait une nouvelle gamme de parfums artisanaux et avait besoin d'une identité de marque aussi raffinée que ses créations. L'enjeu : se démarquer dans un marché saturé.",
      "Nous avons créé un univers visuel sensoriel, mêlant typographie élégante et palette de couleurs évocatrice. La marque a gagné 200% de visibilité sur les réseaux sociaux en trois mois."
    ],
    client: "Nectar Fragrance",
    services: ["Branding", "Packaging", "Stratégie Digitale"]
  },
  {
    id: "metaverse-studio",
    name: "Metaverse Studio",
    tagline: "Le futur des mondes virtuels interactifs.",
    category: "Web Design",
    location: "Tokyo — JP",
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=1200&auto=format&fit=crop",
    headline: "Le Futur des Mondes Virtuels Interactifs",
    story: [
      "Metaverse Studio conçoit des hubs de réalité virtuelle immersifs. Ils cherchaient un site web vitrine capable de restituer la sensation de profondeur 3D directement dans un navigateur standard.",
      "Nous avons intégré des rendus WebGL légers et des grilles CSS asymétriques pour simuler le relief sans ralentir la navigation. Un design fluide qui a attiré plus de 50 000 curieux le premier mois."
    ],
    client: "Metaverse Corp",
    services: ["Web Design", "Expérience 3D", "WebGL"]
  },
  {
    id: "growth-accelerator",
    name: "SaaS Accelerator",
    tagline: "Scaler l'acquisition client automatiquement.",
    category: "Digital Experience",
    location: "San Francisco — CA",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
    headline: "Scaler L'Acquisition Client Automatiquement",
    story: [
      "Le collectif SaaS Accelerator voulait repenser tout le tunnel d'onboarding de leur outil d'automatisation afin de réduire le taux de désabonnement précoce.",
      "Notre équipe a mené un audit de friction UX complet et déployé des tunnels interactifs sur mesure. Le taux d'activation a bondi de 34% en l'espace de 4 semaines."
    ],
    client: "Accelerator Group",
    services: ["Digital Experience", "UX Optimization", "Conversion Strategy"]
  }
];
```

#### Étape 2 : Nettoyage de `src/components/PortfolioSection.tsx`
Nous remplaçons la déclaration locale du tableau `projects` par un import propre depuis notre nouveau fichier partagé :
```typescript
// Remplacer les lignes 9 à 74 par l'importation simple :
import { projects } from "@/data/projects";
```

---

### Tâche 2 : Création du composant WorkHero
**Fichiers ciblés :**
* Créer : `src/components/WorkHero.tsx`

Ce composant gère l'en-tête de la page avec les vignettes flottantes interactives en Framer Motion.
```tsx
"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { projects } from "@/data/projects";

// Sélectionner 4 images représentatives pour l'effet flottant
const floatingImages = projects.slice(0, 4);

export default function WorkHero() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Parallax mouse movements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const floatX = useSpring(mouseX, springConfig);
  const floatY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (reduceMotion) return;
      const { innerWidth, innerHeight } = window;
      // Normaliser entre -0.5 et 0.5
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x * 40); // Max offset pixels
      mouseY.set(y * 40);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, reduceMotion]);

  if (!mounted) return null;

  // Positions de base des vignettes flottantes (haut-gauche, haut-droite, bas-gauche, bas-droite)
  const basePositions = [
    { top: "15%", left: "8%", delay: 0.1, rotate: -6 },
    { top: "18%", right: "8%", delay: 0.25, rotate: 6 },
    { bottom: "12%", left: "10%", delay: 0.4, rotate: 4 },
    { bottom: "15%", right: "12%", delay: 0.55, rotate: -4 },
  ];

  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center bg-[#FAFAFA] overflow-hidden pt-28 pb-16 px-6">
      {/* Background soft ambient blobs */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-primary/5 blur-[90px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="font-heading font-black text-black-deep leading-[0.95] tracking-tighter uppercase text-[2.75rem] xs:text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[6.5rem]">
          <span>Notre Galerie</span>
          <span className="block font-heading accent-italic text-primary -mt-1 md:-mt-3">
            créative.
          </span>
        </h1>
        <p className="font-sans text-dark/70 text-sm md:text-base max-w-[50ch] mx-auto mt-6 md:mt-8 leading-relaxed">
          Explorez le laboratoire de nos réalisations. Chaque projet allie minutie graphique, 
          ergonomie intuitive et hautes performances technologiques.
        </p>
      </div>

      {/* Floating Vignettes */}
      {!reduceMotion && floatingImages.map((project, idx) => {
        const pos = basePositions[idx] || basePositions[0];
        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 0.8, scale: 1, y: 0 }}
            whileHover={{ scale: 1.08, opacity: 1, zIndex: 30 }}
            transition={{ duration: 0.8, delay: pos.delay, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              right: pos.right,
              bottom: pos.bottom,
              x: floatX,
              y: floatY,
              rotate: pos.rotate,
            }}
            className="hidden lg:block w-36 h-48 xl:w-44 xl:h-56 rounded-2xl overflow-hidden shadow-premium border border-black/[0.04] pointer-events-auto bg-white"
          >
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="200px"
            />
          </motion.div>
        );
      })}
    </section>
  );
}
```

---

### Tâche 3 : Création du composant WorkGrid
**Fichiers ciblés :**
* Créer : `src/components/WorkGrid.tsx`

Ce composant gère les onglets de filtres en verre et la grille masonry pour l'affichage de tous les projets, avec l'intégration du curseur interactif.
```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type PortfolioProject } from "@/data/projects";
import ProjectModal from "./ProjectModal";

const categories = ["Tous", "Web Design", "Branding", "Digital Experience"];

export default function WorkGrid() {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Filtrer les projets
  const filteredProjects = activeCategory === "Tous" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className="relative w-full pb-24 bg-[#FAFAFA]" id="gallery">
      {/* Sticky Filter Pill */}
      <div className="sticky top-20 md:top-24 z-40 w-full flex justify-center px-6 mb-12 md:mb-16">
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/70 backdrop-blur-md border border-black/[0.05] shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-sans font-bold tracking-tight transition-colors duration-300 outline-none cursor-pointer ${
                  isActive ? "text-white" : "text-black-deep/60 hover:text-black-deep"
                }`}
              >
                <span className="relative z-10">{cat}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeCategoryIndicator"
                    className="absolute inset-0 bg-black-deep rounded-full z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Container */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-16">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`group w-full ${!reduceMotion && !isEven ? "md:mt-12 lg:mt-16" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    data-cursor="explore"
                    className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAFAFA] cursor-pointer"
                  >
                    {/* Card Image */}
                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-black/5 mb-5 md:mb-6 shadow-sm border border-black/[0.03]">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                      <div className="absolute bottom-5 right-5 w-11 h-11 rounded-full bg-white flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-md">
                        <ArrowUpRight className="w-5 h-5 text-black-deep" />
                      </div>
                    </div>

                    {/* Meta & Titles */}
                    <div className="space-y-2 md:space-y-3 px-2">
                      <h3 className="font-heading font-bold text-sm text-primary uppercase tracking-wider">
                        {project.name}
                      </h3>
                      <p className="font-heading font-black text-xl sm:text-2xl lg:text-3xl text-black-deep leading-tight max-w-[20ch]">
                        {project.tagline}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2 md:pt-3">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-bg-alt border border-black/[0.04] text-dark text-[10px] font-sans font-bold uppercase tracking-wider">
                          {project.category}
                        </span>
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-bg-alt border border-black/[0.04] text-dark text-[10px] font-sans font-bold uppercase tracking-wider">
                          {project.location}
                        </span>
                      </div>
                    </div>
                  </button>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Reutilisation du modal existant */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
```

---

### Tâche 4 : Création du composant WallOfFame
**Fichiers ciblés :**
* Créer : `src/components/WallOfFame.tsx`

Ce composant gère la section de preuve sociale associant témoignages clients de haut vol et services.
```tsx
"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeader from "./SectionHeader";

const reviews = [
  {
    name: "Camille R.",
    role: "Responsable Marketing — Studio Landing",
    text: "La direction artistique d'AIA LAB est d'une puissance rare. L'esthétique minimaliste et la vitesse du site ont multiplié nos conversions par trois en deux mois.",
    deliverables: "Web Design, Next.js Development, UX Strategy"
  },
  {
    name: "Thomas B.",
    role: "Fondateur — Lux Commerce SA",
    text: "Une refonte e-commerce fluide et sensorielle. Le panier moyen a augmenté de 45% grâce à des micro-interactions impeccables. Notre référence absolue.",
    deliverables: "Digital Experience, E-commerce, UI Design"
  },
  {
    name: "Sarah L.",
    role: "Directrice Artistique — Nectar Fragrance",
    text: "Ils ont capturé l'essence olfactive de notre marque pour la transcrire visuellement en quelques jours. Un univers complet et structuré.",
    deliverables: "Branding, Packaging Design"
  }
];

export default function WallOfFame() {
  return (
    <section className="bg-bg-alt py-20 md:py-24 border-y border-dark/5" id="testimonials">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-16">
        <SectionHeader
          title="Wall of"
          highlight="fame."
          description="Les chiffres parlent d'eux-mêmes, nos clients aussi. Notre exigence au service de vos ambitions."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 md:mt-16">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white border border-black/[0.04] p-8 md:p-10 rounded-[2rem] shadow-sm flex flex-col justify-between hover:shadow-premium hover:border-primary/20 transition-all duration-500"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary opacity-90" />
                  ))}
                </div>
                <p className="font-heading accent-italic text-lg md:text-xl text-black-deep/90 leading-relaxed mb-8">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-6 border-t border-black/[0.05]">
                <h4 className="font-heading font-black text-sm tracking-tight text-black-deep">
                  {rev.name}
                </h4>
                <span className="text-[9px] font-mono text-dark/40 font-bold uppercase tracking-wider block mt-0.5 mb-3">
                  {rev.role}
                </span>
                <span className="inline-block text-[10px] font-sans font-bold text-primary bg-primary/5 border border-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  {rev.deliverables}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Tâche 5 : Création du composant WorkCTA
**Fichiers ciblés :**
* Créer : `src/components/WorkCTA.tsx`

Ce composant gère les deux cartes de conversion modulaires situées juste au-dessus du footer.
```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function WorkCTA() {
  return (
    <section className="bg-[#FAFAFA] py-20 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Card A: Watch Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative p-10 sm:p-12 rounded-[2rem] bg-white border border-black/[0.04] shadow-sm hover:shadow-premium hover:border-primary/20 transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[300px] sm:min-h-[340px]"
          >
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-primary/5 rounded-full blur-3xl group-hover:scale-125 transition-transform" />
            
            <div className="relative z-10 flex items-center justify-between w-full">
              <span className="text-[10px] font-mono font-bold text-primary bg-primary/5 border border-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">/ process</span>
              <div className="w-10 h-10 rounded-full bg-bg-alt flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4 text-black-deep" />
              </div>
            </div>

            <div className="relative z-10 mt-8">
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-black-deep tracking-tight mb-2">
                Découvrir notre Lab.
              </h3>
              <p className="font-sans text-dark/70 text-sm max-w-[35ch] mb-8 leading-relaxed">
                Apprenez comment nous fusionnons l&apos;intelligence artificielle et le design haut de gamme en moins de 5 minutes.
              </p>
              
              <button className="px-6 py-3 bg-black-deep text-white hover:bg-primary hover:text-black-deep font-sans font-bold text-xs uppercase tracking-wider rounded-full transition-colors duration-300">
                Regarder la Démo
              </button>
            </div>
          </motion.div>

          {/* Card B: Schedule Call */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative p-10 sm:p-12 rounded-[2rem] bg-white border border-black/[0.04] shadow-sm hover:shadow-premium hover:border-secondary/20 transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[300px] sm:min-h-[340px]"
          >
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-secondary/5 rounded-full blur-3xl group-hover:scale-125 transition-transform" />

            <div className="relative z-10 flex items-center justify-between w-full">
              <span className="text-[10px] font-mono font-bold text-secondary bg-secondary/5 border border-secondary/10 px-3 py-1 rounded-full uppercase tracking-wider">/ contact</span>
              <div className="w-10 h-10 rounded-full bg-bg-alt flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4 text-black-deep" />
              </div>
            </div>

            <div className="relative z-10 mt-8">
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-black-deep tracking-tight mb-2">
                Planifier un projet.
              </h3>
              <p className="font-sans text-dark/70 text-sm max-w-[35ch] mb-8 leading-relaxed">
                Réservez un créneau d&apos;échange avec nos experts pour évaluer vos objectifs stratégiques et budgétaires.
              </p>

              <a href="#cta-contact" className="inline-block px-6 py-3 bg-primary text-black-deep hover:bg-black-deep hover:text-white font-sans font-bold text-xs uppercase tracking-wider rounded-full transition-colors duration-300">
                Prendre rendez-vous
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
```

---

### Tâche 6 : Nettoyage de la route `/work`
**Fichiers ciblés :**
* Modifier : `src/app/work/page.tsx`

Nous remplaçons la redirection par la composition finale de notre page.
```tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorkHero from "@/components/WorkHero";
import WorkGrid from "@/components/WorkGrid";
import WallOfFame from "@/components/WallOfFame";
import WorkCTA from "@/components/WorkCTA";
import ContactCTA from "@/components/ContactCTA";

export default function WorkPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#FAFAFA]">
        <WorkHero />
        <WorkGrid />
        <WallOfFame />
        <WorkCTA />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
```

---

## Plan de Vérification

### 1. Build Verification
Exécuter un build de production complet pour garantir l'absence d'erreurs TypeScript, de dysfonctionnement sur le rendu serveur (SSR) ou de problème d'hydratation côté client :
```bash
npm run build
```

### 2. Validation Visuelle
Lancer le serveur en local (`npm run dev`) et utiliser le navigateur intégré pour inspecter la page `/work` :
* Valider que les images volantes du hero s'animent proprement.
* Vérifier le bon glissement de la bulle active des filtres de catégorie.
* Tester l'ouverture et la fermeture du modal lors du clic sur un projet.
* Valider la cohérence parfaite du curseur `"Voir"` au survol des cartes.
