"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Images de haute qualité Unsplash sélectionnées pour le style "Art Gallery" artistique & design
const leftCol1 = [
  "https://images.unsplash.com/photo-1561070791-26c113006238?q=80&w=500&auto=format&fit=crop", // Branding coloré
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop", // Art abstrait fluide
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500&auto=format&fit=crop", // Typographie noire minimaliste
];

const leftCol2 = [
  "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=500&auto=format&fit=crop", // Packaging artistique
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=500&auto=format&fit=crop", // Illustration jaune vivante
];

const rightCol1 = [
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=500&auto=format&fit=crop", // Illustration soleil rouge/orange
  "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=500&auto=format&fit=crop", // Dessin géométrique clean
];

const rightCol2 = [
  "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?q=80&w=500&auto=format&fit=crop", // Portrait artistique vibrant
  "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=500&auto=format&fit=crop", // Interface mobile clean
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=500&auto=format&fit=crop", // Rendu 3D abstrait
];

export default function WorkHero() {
  // Stagger animation settings
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative w-full min-h-[420px] sm:min-h-[460px] lg:min-h-[580px] grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] xl:grid-cols-[280px_1fr_280px] 2xl:grid-cols-[340px_1fr_340px] items-center bg-[#FAFAFA] overflow-hidden pt-32 xs:pt-36 sm:pt-40 lg:pt-36 pb-12 sm:pb-16">
      
      {/* Background Soft Glows */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Centered Cyan Cloud behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[520px] sm:h-[520px] rounded-full bg-[#08C1DC]/16 blur-[90px] sm:blur-[110px]" />
        
        {/* Soft side glows */}
        <div className="absolute top-[10%] left-[15%] w-[250px] h-[250px] rounded-full bg-[#08C1DC]/8 blur-[80px]" />
        <div className="absolute bottom-[10%] right-[15%] w-[300px] h-[300px] rounded-full bg-[#259EB1]/8 blur-[90px]" />
      </div>

      {/* LEFT GALLERY PANEL (Penji Style) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex gap-3 h-full max-h-[520px] overflow-hidden pointer-events-none select-none px-2"
      >
        {/* Column 1 (Offset Upwards) */}
        <div className="flex flex-col gap-3 w-1/2 -translate-y-8">
          {leftCol1.map((url, i) => (
            <motion.div
              key={`left-c1-${i}`}
              variants={cardVariants}
              className="relative w-full rounded-2xl overflow-hidden border border-black/[0.04] bg-white shadow-sm aspect-[4/5] sm:aspect-square md:aspect-[3/4]"
            >
              <Image src={url} alt="AIA Lab Gallery Left Col 1" fill className="object-cover" sizes="200px" />
            </motion.div>
          ))}
        </div>
        {/* Column 2 (Offset Downwards) */}
        <div className="flex flex-col gap-3 w-1/2 pt-12">
          {leftCol2.map((url, i) => (
            <motion.div
              key={`left-c2-${i}`}
              variants={cardVariants}
              className="relative w-full rounded-2xl overflow-hidden border border-black/[0.04] bg-white shadow-sm aspect-[1/1]"
            >
              <Image src={url} alt="AIA Lab Gallery Left Col 2" fill className="object-cover" sizes="200px" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CENTER TEXT BLOCK */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-5 sm:px-6 flex flex-col items-center justify-center py-4">
        <h1 className="font-heading font-black text-black-deep leading-[0.95] tracking-tight sm:tracking-tighter uppercase text-[2.5rem] xs:text-5xl sm:text-6xl md:text-[5rem] lg:text-[6rem] xl:text-[7rem] 2xl:text-[8rem]">
          <span>Notre Galerie</span>
          <span
            className="block font-heading accent-italic mt-1.5 sm:-mt-1 md:-mt-3 py-1"
            style={{
              backgroundImage: "linear-gradient(to right, #057E90, #08C1DC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            créative.
          </span>
        </h1>
        <p className="font-sans text-dark/70 text-sm sm:text-base max-w-[42ch] mx-auto mt-6 sm:mt-8 leading-relaxed">
          Découvrez notre laboratoire de réalisations. Chaque carte ci-dessous illustre une alliance unique 
          entre exigence esthétique, design émotionnel et innovation technologique.
        </p>
      </div>

      {/* RIGHT GALLERY PANEL (Penji Style) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex gap-3 h-full max-h-[520px] overflow-hidden pointer-events-none select-none px-2"
      >
        {/* Column 1 (Offset Downwards) */}
        <div className="flex flex-col gap-3 w-1/2 pt-12">
          {rightCol1.map((url, i) => (
            <motion.div
              key={`right-c1-${i}`}
              variants={cardVariants}
              className="relative w-full rounded-2xl overflow-hidden border border-black/[0.04] bg-white shadow-sm aspect-[1/1]"
            >
              <Image src={url} alt="AIA Lab Gallery Right Col 1" fill className="object-cover" sizes="200px" />
            </motion.div>
          ))}
        </div>
        {/* Column 2 (Offset Upwards) */}
        <div className="flex flex-col gap-3 w-1/2 -translate-y-8">
          {rightCol2.map((url, i) => (
            <motion.div
              key={`right-c2-${i}`}
              variants={cardVariants}
              className="relative w-full rounded-2xl overflow-hidden border border-black/[0.04] bg-white shadow-sm aspect-[4/5] sm:aspect-square md:aspect-[3/4]"
            >
              <Image src={url} alt="AIA Lab Gallery Right Col 2" fill className="object-cover" sizes="200px" />
            </motion.div>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
