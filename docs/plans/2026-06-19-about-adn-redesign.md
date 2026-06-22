# Plan d'Implémentation : Redesign de la Section ADN (Nos Valeurs)

**Objectif :** Redessiner la section "ADN / Valeurs" de la page À Propos d'AIA LAB pour adopter une disposition asymétrique à deux colonnes avec une grille de cartes 2x2 interactives qui s'illuminent au survol.

**Architecture :** La section utilisera le layout de grille CSS de Tailwind pour répartir l'en-tête (5 colonnes) et les cartes (7 colonnes). L'état réactif global est géré via un état local React (`hoveredId`), et Framer Motion s'occupe des micro-animations d'élévation et des transitions fluides de couleurs pour un aspect haut de gamme.

**Technologies clés :** React, Next.js, Tailwind CSS v4, Framer Motion, TypeScript.

---

### Tâche 1 : Mise à jour du composant AboutADN

**Fichiers ciblés :**
- Modifier : `src/app/about/components/AboutADN.tsx`

- [ ] **Étape 1 : Modification du Code du Composant**
Remplacez le contenu existant du fichier par l'implémentation suivante :

```tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

interface Feature {
  id: number;
  title: string;
  tag: string;
  desc: string;
  tagShort: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Audace",
    tag: "Créativité sans limite",
    tagShort: "01 / AUD",
    desc: "Nous repoussons les frontières de l'imagination pour concevoir des identités uniques et mémorables.",
  },
  {
    id: 2,
    title: "Performance",
    tag: "Excellence technologique",
    tagShort: "02 / PERF",
    desc: "Des architectures ultra-rapides et optimisées pour garantir des performances d'affichage instantanées et un SEO maximal.",
  },
  {
    id: 3,
    title: "Confiance",
    tag: "Collaboration transparente",
    tagShort: "03 / CNF",
    desc: "Une collaboration transparente et une écoute active pour bâtir des relations durables.",
  },
  {
    id: 4,
    title: "Précision",
    tag: "Artisanat du détail",
    tagShort: "04 / PRC",
    desc: "Chaque pixel et chaque ligne de code sont polis avec le soin absolu de l'artisan.",
  },
];

function ValueIcon({ id, isHovered }: { id: number; isHovered: boolean }) {
  if (id === 1) {
    return (
      <svg viewBox="0 0 24 24" className={`w-6 h-6 fill-none transition-colors duration-300 ${isHovered ? "stroke-white" : "stroke-primary"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z"
          animate={{
            rotate: isHovered ? 90 : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </svg>
    );
  }
  if (id === 2) {
    return (
      <svg viewBox="0 0 24 24" className={`w-6 h-6 fill-none transition-colors duration-300 ${isHovered ? "stroke-white" : "stroke-secondary"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
          animate={{
            scale: isHovered ? [1, 1.25, 1] : 1,
            y: isHovered ? [0, -2, 2, 0] : 0,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </svg>
    );
  }
  if (id === 3) {
    return (
      <svg viewBox="0 0 24 24" className={`w-6 h-6 fill-none transition-colors duration-300 ${isHovered ? "stroke-white" : "stroke-primary"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          animate={{
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          d="M9 11l2 2 4-4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={`w-6 h-6 fill-none transition-colors duration-300 ${isHovered ? "stroke-white" : "stroke-secondary"}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
      <motion.path
        d="M12 2v4M12 18v4M2 12h4M18 12h4"
        animate={{
          rotate: isHovered ? 180 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function AboutADN() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="relative bg-[#FAFAFA] py-24 md:py-32 overflow-hidden border-t border-black/[0.03]" id="valeurs">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Global Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Info & Title */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[350px]">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-8 h-[1.5px] bg-primary rounded-full" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#057E90]">
                  04 // NOTRE ADN
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: 0.1 }}
                className="font-heading font-black text-black-deep text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-none uppercase mb-8"
              >
                Nos <br />
                <span className="text-[#057E90] accent-italic">valeurs.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: 0.2 }}
                className="font-sans text-[#32565C] text-base sm:text-lg leading-relaxed max-w-[42ch]"
              >
                Chez AIA LAB, nos valeurs guident chacune de nos lignes de code et chacun de nos designs. Elles façonnent nos collaborations et définissent notre excellence pour concevoir l&apos;élite des expériences digitales.
              </motion.p>
            </div>

            {/* Bottom copyright-like metadata */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease, delay: 0.3 }}
              className="hidden lg:block pt-12 mt-12 border-t border-black/[0.05]"
            >
              <span className="font-mono text-[9px] tracking-widest text-[#32565C]/40 uppercase">
                [ AIA LAB © 2026 // TOUS DROITS RÉSERVÉS ]
              </span>
            </motion.div>
          </div>

          {/* Right Column: 2x2 Grid of Cards */}
          <div className="lg:col-span-7 relative w-full">
            
            {/* Category Indicator Top Right */}
            <div className="hidden lg:block absolute -top-12 right-0">
              <span className="font-mono text-[9px] tracking-widest text-[#32565C]/40 uppercase">
                [ SECTION // 04 ]
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full">
              {features.map((feature) => {
                const isHovered = hoveredId === feature.id;
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease, delay: feature.id * 0.1 }}
                    onMouseEnter={() => setHoveredId(feature.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="relative cursor-pointer group h-full"
                  >
                    <div
                      className={`relative flex flex-col justify-between p-8 rounded-[2rem] border transition-all duration-500 ease-out h-[280px] w-full overflow-hidden ${
                        isHovered
                          ? "bg-gradient-to-br from-[#259EB1] to-[#08C1DC] border-transparent scale-[1.03] shadow-[0_20px_40px_rgba(8,193,220,0.15)]"
                          : "bg-white border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                      }`}
                    >
                      {/* Top bar with icon */}
                      <div className="flex justify-between items-start">
                        <ValueIcon id={feature.id} isHovered={isHovered} />
                      </div>

                      {/* Middle description */}
                      <p
                        className={`text-sm leading-relaxed font-sans mt-4 transition-colors duration-300 ${
                          isHovered ? "text-white/95" : "text-[#32565C]"
                        }`}
                      >
                        {feature.desc}
                      </p>

                      {/* Bottom row: Value title + tag */}
                      <div className="mt-auto">
                        <div
                          className={`w-full border-t mb-4 transition-colors duration-300 ${
                            isHovered ? "border-white/30" : "border-black/[0.08]"
                          }`}
                        />
                        <div className="flex justify-between items-center">
                          <h3
                            className={`font-heading text-lg font-bold uppercase tracking-tight transition-colors duration-300 ${
                              isHovered ? "text-white" : "text-black-deep"
                            }`}
                          >
                            {feature.title}
                          </h3>
                          <span
                            className={`font-mono text-[9px] tracking-wider transition-colors duration-300 ${
                              isHovered ? "text-white/60" : "text-[#057E90]"
                            }`}
                          >
                            {feature.tagShort}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
```

- [ ] **Étape 2 : Vérification du Build Next.js**
Exécuter : `npm run build`
Attente : Succès du build et de l'export statique sans erreurs TypeScript ou ESLint.

- [ ] **Étape 3 : Commit Git**
Exécuter : `git add src/app/about/components/AboutADN.tsx && git commit -m "design: redesign de la section AboutADN en grille 2 colonnes avec hovers fluides"`
