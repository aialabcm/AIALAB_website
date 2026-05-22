"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface Project {
  title: string;
  image: string;
}

interface Category {
  id: string;
  title: string;
  italicTitle: string;
  bgColor: string;
  description: string;
  projects: Project[];
}

const portfolioData: Category[] = [
  {
    id: "web",
    title: "Web",
    italicTitle: "design",
    bgColor: "bg-[#F0FAFB]",
    description: "Des interfaces performantes et des expériences utilisateurs mémorables.",
    projects: [
      { title: "Studio Landing", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" },
      { title: "E-commerce Lux", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop" },
      { title: "SaaS Dashboard", image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=800&auto=format&fit=crop" },
    ],
  },
  {
    id: "branding",
    title: "Custom",
    italicTitle: "branding",
    bgColor: "bg-[#F5F5F7]",
    description: "Identités visuelles fortes et systèmes de marque cohérents.",
    projects: [
      { title: "AIA Identity", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop" },
      { title: "Nectar Fragrance", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop" },
      { title: "Abstract Concept", image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=800&auto=format&fit=crop" },
    ],
  },
  {
    id: "motion",
    title: "Motion",
    italicTitle: "graphics",
    bgColor: "bg-[#EEF2FF]",
    description: "Animations fluides et storytelling dynamique pour vos campagnes.",
    projects: [
      { title: "Dynamic Ad", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop" },
      { title: "Explainer Video", image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=800&auto=format&fit=crop" },
    ],
  },
  {
    id: "social",
    title: "Social",
    italicTitle: "content",
    bgColor: "bg-[#FFF7ED]",
    description: "Contenu créatif pour engager votre communauté sur toutes les plateformes.",
    projects: [
      { title: "Campaign Alpha", image: "https://images.unsplash.com/photo-1611162617263-4ec3060a058e?q=80&w=800&auto=format&fit=crop" },
      { title: "Brand Stories", image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=800&auto=format&fit=crop" },
    ],
  },
];

export default function PortfolioSection() {
  const [expandedId, setExpandedId] = useState<string | null>("web");

  return (
    <section className="bg-bg-main py-24 overflow-hidden" id="portfolio">
      <div className="max-w-container mx-auto px-6 md:px-10 lg:px-20">
        <SectionHeader
          title="Nos"
          highlight="réalisations."
          description="Explorez nos catégories et découvrez l'étendue de notre savoir-faire."
        />

        <div className="mt-16 flex flex-col lg:flex-row gap-6 h-auto lg:h-[650px] items-stretch">
          {portfolioData.map((cat) => (
            <CategoryBlock
              key={cat.id}
              category={cat}
              isExpanded={expandedId === cat.id}
              onExpand={() => setExpandedId(cat.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryBlock({
  category,
  isExpanded,
  onExpand,
}: {
  category: Category;
  isExpanded: boolean;
  onExpand: () => void;
}) {
  const [currentProjectIdx, setCurrentProjectIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Auto-play Projects Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isExpanded) {
      interval = setInterval(() => {
        setCurrentProjectIdx((prev) => (prev + 1) % category.projects.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isExpanded, category.projects.length]);

  const nextProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentProjectIdx((prev) => (prev + 1) % category.projects.length);
  };

  const prevProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentProjectIdx((prev) => (prev - 1 + category.projects.length) % category.projects.length);
  };

  return (
    <motion.div
      layout
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onExpand}
      data-cursor="explore"
      className={`relative rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-700 ease-in-out flex flex-col p-8 md:p-12 group ${
        category.bgColor
      } ${isExpanded ? "lg:flex-[3.5]" : "lg:flex-[0.7] items-center text-center hover:shadow-hover-lift"}`}
    >
      {/* Dynamic Background Decoration */}
      <motion.div 
        animate={{ 
          scale: isExpanded ? 1.2 : 0,
          opacity: isExpanded ? 0.05 : 0
        }}
        className="absolute -top-1/4 -right-1/4 w-full h-full bg-black rounded-full blur-[100px] pointer-events-none" 
      />

      {/* Header Section */}
      <motion.div layout className={`relative z-10 ${isExpanded ? "text-left" : "mt-8"}`}>
        <h3 className="font-heading text-3xl md:text-5xl font-bold text-black-deep tracking-tighter leading-none">
          {category.title} <br className={isExpanded ? "hidden" : "block"} />
          <span className="italic font-light opacity-40 ml-1">{category.italicTitle}</span>
        </h3>
        <AnimatePresence>
          {isExpanded && (
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mt-6 text-dark/60 font-sans text-base max-w-lg hidden md:block leading-relaxed"
            >
              {category.description}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 3D Interactive Stack Section */}
      <motion.div 
        layout 
        className="flex-1 flex items-center justify-center relative mt-16 mb-12"
      >
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative w-full max-w-[450px] aspect-[4/5] md:aspect-square flex items-center justify-center"
        >
          {category.projects.map((project, idx) => {
            const isCurrent = idx === currentProjectIdx;
            const diff = (idx - currentProjectIdx + category.projects.length) % category.projects.length;
            
            return (
              <motion.div
                key={idx}
                layout
                initial={false}
                animate={{
                  scale: isCurrent ? 1 : 0.85 - diff * 0.04,
                  x: isCurrent ? 0 : diff * 25 + (isExpanded ? 0 : 5),
                  y: isCurrent ? 0 : -diff * 10,
                  rotate: isCurrent ? 0 : diff * 3,
                  opacity: isCurrent ? 1 : 0.3 / (diff + 0.5),
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className={`absolute w-[85%] h-[85%] rounded-[2rem] overflow-hidden shadow-2xl border border-white/40 bg-white`}
                style={{ zIndex: category.projects.length - diff }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-1000 ${isCurrent ? 'scale-100' : 'scale-110 blur-[1px]'}`}
                />
                
                {/* Visual Accent (Gloss) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
              </motion.div>
            );
          })}

          {/* Navigation Arrows (Premium Magnetic style) */}
          <AnimatePresence>
            {isExpanded && category.projects.length > 1 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-x-[-15px] md:inset-x-[-40px] flex justify-between items-center z-40 pointer-events-none"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevProject}
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-black-deep hover:text-white transition-colors pointer-events-auto"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextProject}
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-black-deep hover:text-white transition-colors pointer-events-auto"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Footer Info Area */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mt-auto pt-8 border-t border-dark/10"
          >
            <div>
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-dark/40 block mb-2">
                Discovery Mode
              </span>
              <motion.h4 
                key={currentProjectIdx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-heading font-bold text-2xl text-black-deep"
              >
                {category.projects[currentProjectIdx].title}
              </motion.h4>
            </div>
            
            <motion.button 
              whileHover={{ x: 5 }}
              className="mt-4 md:mt-0 flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-black-deep group"
            >
              <span className="relative">
                Explorer ce projet
                <span className="absolute bottom-[-4px] left-0 w-full h-[1px] bg-black-deep origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </span>
              <div className="w-10 h-10 rounded-full border border-dark/10 flex items-center justify-center group-hover:bg-dark group-hover:text-white transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auto-play Dots */}
      {isExpanded && category.projects.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {category.projects.map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                width: i === currentProjectIdx ? 24 : 6,
                backgroundColor: i === currentProjectIdx ? "#0B0B0B" : "rgba(0,0,0,0.1)"
              }}
              className="h-1.5 rounded-full"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}



