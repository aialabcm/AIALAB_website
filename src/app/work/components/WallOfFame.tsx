"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const reviews = [
  {
    name: "Camille R.",
    role: "Directrice Digitale — B-Partners",
    text: "La direction artistique d'AIA LAB est d'une puissance rare. L'esthétique minimaliste et la vitesse du site ont multiplié nos conversions par trois en deux mois.",
    deliverables: "Web Design, Next.js Development"
  },
  {
    name: "Thomas B.",
    role: "Fondateur — OnlyFood",
    text: "Une refonte e-commerce fluide et sensorielle. Le panier moyen a augmenté de 45% grâce à des micro-interactions impeccables. Notre référence absolue.",
    deliverables: "Digital Experience, UI/UX Design"
  },
  {
    name: "Sarah L.",
    role: "Responsable Marque — Linguae Translation",
    text: "Ils ont capturé l'essence de notre positionnement pour le transcrire visuellement en quelques jours. Un univers de marque complet et structuré.",
    deliverables: "Branding, Packaging Design"
  },
  {
    name: "Marc-Antoine D.",
    role: "CTO — China Tech Academy",
    text: "Une équipe technique d'une rigueur exceptionnelle. L'intégration de nos parcours de formation complexes s'est faite sans aucun accroc et avec une réactivité rare.",
    deliverables: "Fullstack Dev, API Integration"
  },
  {
    name: "Elise M.",
    role: "Directrice Artistique — Rehoboth Music",
    text: "Leur sens de l'animation web et du détail graphique a littéralement transformé notre site en un outil d'engagement émotionnel pour nos auditeurs.",
    deliverables: "Interactive Motion, WebGL"
  },
  {
    name: "Jérôme K.",
    role: "Co-fondateur — Sygalin SAS",
    text: "Travailler avec AIA LAB a été fluide du début à la fin. Leurs recommandations UX ont radicalement simplifié notre processus d'onboarding SaaS.",
    deliverables: "UX Audit, Front-End Dev"
  }
];

export default function WallOfFame() {
  const half = Math.ceil(reviews.length / 2);
  const reviews1 = reviews.slice(0, half);
  const reviews2 = reviews.slice(half);

  return (
    <section className="bg-[#F5F5F5] py-20 md:py-24 border-y border-black/[0.05] overflow-hidden" id="testimonials">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 xl:px-16 mb-10 md:mb-12">
        <SectionHeader
          title="La voix de nos"
          highlight="partenaires."
          description="Découvrez l'impact de nos collaborations à travers les retours d'expérience réels de nos clients."
          centered
        />
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex flex-col gap-4 sm:gap-6 md:gap-8 pt-4">
        {/* Gradient Mask (Left & Right Fades) */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#F5F5F5] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#F5F5F5] to-transparent z-20 pointer-events-none" />

        {/* Track 1: Scroll Left */}
        <DraggableMarqueeTrack
          items={reviews1}
          direction="left"
          speed={35}
        />

        {/* Track 2: Scroll Right */}
        <DraggableMarqueeTrack
          items={reviews2}
          direction="right"
          speed={35}
        />
      </div>
    </section>
  );
}

interface Review {
  name: string;
  role: string;
  text: string;
  deliverables: string;
}

function DraggableMarqueeTrack({
  items,
  direction,
  speed,
}: {
  items: Review[];
  direction: "left" | "right";
  speed: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  const duplicatedItems = [...items, ...items, ...items, ...items];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Position initiale au milieu du scroll pour le rebouclage infini
    const oneThird = container.scrollWidth / 3;
    container.scrollLeft = oneThird;

    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      if (!isInteracting.current && container) {
        const delta = (now - lastTime) / 1000;
        const scrollSpeed = direction === "left" ? speed : -speed;
        container.scrollLeft += scrollSpeed * delta;

        const width = container.scrollWidth;
        const third = width / 3;

        // Limites de rebouclage
        if (container.scrollLeft >= third * 2) {
          container.scrollLeft -= third;
        } else if (container.scrollLeft <= third) {
          container.scrollLeft += third;
        }
      }
      lastTime = now;
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [direction, speed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    isInteracting.current = true;
    const startX = e.pageX - container.offsetLeft;
    const scrollLeft = container.scrollLeft;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const x = moveEvent.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      isInteracting.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = () => {
    isInteracting.current = true;
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      isInteracting.current = false;
    }, 1000);
  };

  return (
    <div className="relative flex overflow-hidden w-full">
      <div
        ref={containerRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 cursor-grab active:cursor-grabbing select-none w-full"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {duplicatedItems.map((rev, idx) => (
          <div
            key={idx}
            className="w-[250px] h-[250px] sm:w-[290px] sm:h-[290px] md:w-[320px] md:h-[320px] flex-shrink-0 bg-white border border-dark/5 p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl sm:rounded-2xl whitespace-normal pointer-events-none select-none"
          >
            <div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary opacity-85" />
                ))}
              </div>
              <p className="font-heading accent-italic text-sm text-black-deep/90 leading-relaxed">
                "{rev.text}"
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-dark/5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-bg-alt flex items-center justify-center font-heading font-bold text-dark/30 border border-dark/5 text-xs flex-shrink-0">
                {rev.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-heading font-bold text-xs tracking-tight text-black-deep truncate">
                  {rev.name}
                </h4>
                <span className="text-[8px] font-mono text-dark/40 font-bold uppercase tracking-wider block mt-0.5 truncate">
                  {rev.role}
                </span>
              </div>
              <span className="inline-block text-[8px] font-mono font-bold text-primary bg-primary/5 border border-primary/10 px-2 py-1 rounded-full uppercase tracking-wider flex-shrink-0">
                {rev.deliverables.split(",")[0]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
