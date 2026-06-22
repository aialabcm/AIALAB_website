# Plan d'Implémentation : Redesign de la Section Hero (À Propos)

**Objectif :** Reconstruire la section Hero de la page À Propos pour adopter le design en split-screen asymétrique (inspiré du layout fourni, adapté sans badge supérieur et aux couleurs d'AIA LAB), avec intégration en ligne d'avatars de l'équipe et cartes flottantes animées à droite.

**Architecture :** 
Nous modifions le composant client `AboutHero.tsx`. Nous utilisons CSS Grid pour le layout responsive, Framer Motion pour les entrées progressives et les animations infinies de flottaison sur les cartes, et le composant `next/image` de Next.js pour le chargement performant des assets visuels (image principale et avatars d'équipe).

**Technologies clés :** 
* Next.js (App Router, Client Component)
* React 19 & TypeScript
* Tailwind CSS v4
* Framer Motion (Transitions et boucles d'animation)
* Lucide React (Icônes vectorielles)

---

## Tâches d'Implémentation

### Tâche 1 : Génération des Assets Visuels

**Fichiers ciblés :**
* Créer : `public/images/about-hero-main.webp` (Image principale)
* Créer : `public/images/team-avatar-1.webp` (Avatar équipe 1)
* Créer : `public/images/team-avatar-2.webp` (Avatar équipe 2)
* Créer : `public/images/team-avatar-3.webp` (Avatar équipe 3)

- [ ] **Étape 1 : Générer l'image principale**
  Générer via l'outil d'images et enregistrer sous `public/images/about-hero-main.webp` avec le prompt :
  `A high-end, premium workspace of a digital designer and developer, with a laptop showing sleek interface design mockups, screens with lines of code, glowing teal accent lighting, clean minimalist desk, dark slate and cyan tones, cinematic depth of field, corporate high-tech look, professional creative agency, WebP format`

- [ ] **Étape 2 : Générer l'avatar 1**
  Générer via l'outil d'images et enregistrer sous `public/images/team-avatar-1.webp` avec le prompt :
  `Professional headshot of a female digital designer, modern creative tech look, aesthetic dark background with subtle blue neon glow, professional, portrait photography, WebP format`

- [ ] **Étape 3 : Générer l'avatar 2**
  Générer via l'outil d'images et enregistrer sous `public/images/team-avatar-2.webp` avec le prompt :
  `Professional headshot of a male software engineer, modern tech startup look, clean minimalist dark background, subtle turquoise lighting, smart and friendly expression, WebP format`

- [ ] **Étape 4 : Générer l'avatar 3**
  Générer via l'outil d'images et enregistrer sous `public/images/team-avatar-3.webp` avec le prompt :
  `Professional headshot of a female creative director, aesthetic modern design studio style, dark background with soft teal reflection, high-end profile picture, WebP format`

- [ ] **Étape 5 : Commit**
  Exécuter : `git add public/images && git commit -m "assets: add images and team avatars for about hero section"`

---

### Tâche 2 : Reconstruction du Composant `AboutHero.tsx`

**Fichiers ciblés :**
* Modifier : `src/app/about/components/AboutHero.tsx`

- [ ] **Étape 1 : Remplacer le contenu du fichier**
  Remplacer l'intégralité du fichier `src/app/about/components/AboutHero.tsx` par le code ci-dessous :

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delay },
  },
});

const floatAnimation = (delay = 0) => ({
  animate: {
    y: [-6, 6, -6],
    transition: {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity,
      delay,
    },
  },
});

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden bg-bg-main flex flex-col justify-between pt-28 pb-16 lg:pb-24">
      {/* Subtle premium background glow */}
      <div className="absolute inset-0 z-[1] pointer-events-none select-none hidden lg:block">
        <div className="absolute top-[15%] left-[8%] w-[350px] h-[350px] rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-container mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow flex flex-col justify-center">
        
        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full mb-16 lg:mb-20">
          
          {/* Left Column: Heading + Paragraph + CTAs */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="w-full lg:col-span-6 flex flex-col items-start text-left"
          >
            <motion.h1
              variants={fadeUp(0)}
              className="font-heading font-black text-black-deep leading-[0.95] tracking-tighter uppercase mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.2rem] 2xl:text-[5rem] flex flex-col"
            >
              <span className="block">Façonner le</span>
              <span className="block">futur digital</span>
              <span className="block">par l&apos;art &</span>
              <span className="inline-flex items-center -space-x-3 my-2 h-10 sm:h-12 lg:h-14">
                {/* 3 Styled Avatars with border and gradient backgrounds representing AIA LAB design orientation */}
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full ring-2 ring-white overflow-hidden bg-gradient-to-br from-primary to-secondary shadow-md">
                  <Image
                    src="/images/team-avatar-1.webp"
                    alt="AIA LAB Designer"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full ring-2 ring-white overflow-hidden bg-gradient-to-br from-secondary to-[#057E90] shadow-md">
                  <Image
                    src="/images/team-avatar-2.webp"
                    alt="AIA LAB Engineer"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full ring-2 ring-white overflow-hidden bg-gradient-to-br from-[#057E90] to-primary shadow-md">
                  <Image
                    src="/images/team-avatar-3.webp"
                    alt="AIA LAB Creator"
                    fill
                    className="object-cover"
                  />
                </div>
              </span>
              <span
                className="inline-block font-heading accent-italic whitespace-nowrap pb-1"
                style={{
                  backgroundImage: "linear-gradient(to right, #057E90, #08C1DC)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                l&apos;intelligence
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp(0.1)}
              className="font-sans text-dark/75 text-sm sm:text-base md:text-lg leading-relaxed font-normal mb-8 max-w-[50ch]"
            >
              Nous fusionnons l&apos;artisanat du design d&apos;interface avec la puissance de l&apos;intelligence artificielle pour sculpter des architectures digitales d&apos;exception et des performances hors normes.
            </motion.p>
            
            <motion.div
              variants={fadeUp(0.2)}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#about-cta"
                className="group bg-primary text-black-deep py-3.5 px-8 rounded-full font-sans font-extrabold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-black-deep hover:text-white hover:scale-[1.03] shadow-md hover:shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-primary/50 text-center min-h-[48px] flex items-center justify-center gap-2.5"
              >
                Lancer un projet
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="/work"
                className="group bg-white/60 hover:bg-white text-black-deep py-3.5 px-8 rounded-full font-sans font-extrabold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-[1.03] backdrop-blur-sm border border-black/[0.06] hover:border-black/[0.12] outline-none focus-visible:ring-2 focus-visible:ring-primary/50 text-center min-h-[48px] flex items-center justify-center gap-2"
              >
                Nos réalisations
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Image with Floating Cards */}
          <div className="w-full lg:col-span-6 flex justify-center items-center relative py-12">
            {/* Ambient background blur behind the image */}
            <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px] z-0 pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease, delay: 0.15 }}
              className="relative w-full max-w-[420px] aspect-[4/5] z-10"
            >
              {/* Main Image */}
              <div className="w-full h-full rounded-[2.2rem] overflow-hidden shadow-premium border border-black/[0.03]">
                <Image
                  src="/images/about-hero-main.webp"
                  alt="AIA LAB Creative Studio"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Float Card 1: Top Right Badge */}
              <motion.div
                variants={floatAnimation(0)}
                animate="animate"
                className="absolute -top-3 -right-3 sm:-right-6 bg-white/80 backdrop-blur-md border border-black/[0.04] rounded-full px-4 py-2 shadow-premium z-20 select-none flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-black-deep uppercase tracking-wider">
                  Direction Artistique
                </span>
              </motion.div>

              {/* Float Card 2: Mid-Right Badge */}
              <motion.div
                variants={floatAnimation(0.8)}
                animate="animate"
                className="absolute top-1/3 -right-6 sm:-right-8 bg-white/80 backdrop-blur-md border border-black/[0.04] rounded-full px-4 py-2 shadow-premium z-20 select-none flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-[10px] font-mono font-bold text-black-deep uppercase tracking-wider">
                  Technologie Next.js
                </span>
              </motion.div>

              {/* Float Card 3: Mid-Left Dark Card */}
              <motion.div
                variants={floatAnimation(1.2)}
                animate="animate"
                className="absolute top-1/4 -left-6 sm:-left-10 bg-anthracite border border-white/[0.06] rounded-[1.5rem] p-4 shadow-2xl z-20 text-white w-40 sm:w-44 select-none"
              >
                <div className="font-heading font-black text-3xl sm:text-4xl text-primary leading-none tracking-tight mb-1">
                  50+
                </div>
                <p className="text-[9px] sm:text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest leading-normal">
                  PROJETS D&apos;EXCEPTION
                </p>
              </motion.div>

              {/* Float Card 4: Compact Tech tags (Center-Bottom, overlapping) */}
              <motion.div
                variants={floatAnimation(0.4)}
                animate="animate"
                className="absolute -bottom-4 -left-4 sm:-left-8 bg-white/90 backdrop-blur-md border border-black/[0.06] rounded-[1.5rem] p-3.5 shadow-2xl z-30 w-44 sm:w-48 select-none"
              >
                <p className="text-[8px] sm:text-[9px] font-mono font-bold text-dark/50 uppercase tracking-wider mb-2">
                  NOS TECHNOLOGIES
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-md hover:bg-secondary/20 transition-colors">
                    React
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-md hover:bg-secondary/20 transition-colors">
                    Next.js
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md hover:bg-primary/20 transition-colors">
                    IA
                  </span>
                </div>
              </motion.div>

              {/* Float Card 5: Satisfaction (Bottom Right) */}
              <motion.div
                variants={floatAnimation(1.6)}
                animate="animate"
                className="absolute -bottom-6 -right-3 sm:-right-6 bg-primary text-black-deep rounded-[1.5rem] p-4 shadow-2xl z-20 w-36 sm:w-40 select-none border border-white/10"
              >
                <div className="font-heading font-black text-3xl sm:text-4xl leading-none tracking-tight mb-1">
                  98%
                </div>
                <p className="text-[9px] sm:text-[10px] font-mono font-bold text-black-deep/60 uppercase tracking-widest leading-normal">
                  SATISFACTION CLIENT
                </p>
              </motion.div>

            </motion.div>
          </div>

        </div>

        {/* Stats Row with Horizontal Divider */}
        <div className="w-full border-t border-black/[0.08] pt-8 lg:pt-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
            }}
            className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-6 sm:gap-12 md:gap-16 lg:gap-24"
          >
            {/* Stat 1 */}
            <motion.div variants={fadeUp(0)} className="flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-black-deep tracking-tighter">
                500+
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-dark/50 uppercase tracking-widest">
                PROJETS D&apos;EXCEPTION
              </span>
            </motion.div>
            
            {/* Divider (Desktop only) */}
            <div className="hidden sm:block w-[1px] h-8 bg-black/[0.08]" />

            {/* Stat 2 */}
            <motion.div variants={fadeUp(0.1)} className="flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-black-deep tracking-tighter">
                24+
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-dark/50 uppercase tracking-widest">
                PAYS PARTENAIRES
              </span>
            </motion.div>
            
            {/* Divider (Desktop only) */}
            <div className="hidden sm:block w-[1px] h-8 bg-black/[0.08]" />

            {/* Stat 3 */}
            <motion.div variants={fadeUp(0.2)} className="flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-black-deep tracking-tighter">
                98%
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-dark/50 uppercase tracking-widest">
                SATISFACTION CLIENT
              </span>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
```

- [ ] **Étape 2 : Lancer le serveur et vérifier visuellement**
  Exécuter `npm run dev` et utiliser le subagent de navigation pour valider le rendu de la page à l'adresse `/about`.

- [ ] **Étape 3 : Commit**
  Exécuter : `git add src/app/about/components/AboutHero.tsx && git commit -m "feat: redesign about hero with split-screen floating elements"`
