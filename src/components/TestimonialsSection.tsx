"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

const testimonials1: Testimonial[] = [
  { name: "Camille R.", role: "Responsable Marketing", text: "Une direction artistique forte et une exécution très structurée. Le résultat dépasse nos attentes initiales par sa justesse et sa puissance visuelle." },
  { name: "Nassim K.", role: "Fondateur SaaS", text: "Le site convertit beaucoup mieux. Les choix UI/UX sont modernes, extrêmement efficaces et le workflow a été d'une clarté exemplaire." },
  { name: "Sarah L.", role: "Directrice Générale", text: "On a gagné un temps précieux : processus carré, livrables nets et une communication fluide à chaque étape critique du projet." },
  { name: "Hugo M.", role: "Directeur de Création", text: "Style brutaliste parfaitement maîtrisé. Notre marque a pris une dimension unique. Un vrai travail de laboratoire créatif." },
  { name: "Léa V.", role: "CEO Tech Lab", text: "Une approche radicale qui nous a permis de nous démarquer sur un marché saturé. L'impact a été immédiat sur notre image." },
  { name: "Marc A.", role: "Head of Product", text: "Rigoureux, créatifs et réactifs. AIA LAB est devenu notre partenaire stratégique pour tous nos futurs lancements." },
];

const testimonials2: Testimonial[] = [
  { name: "Julie D.", role: "Art Director", text: "L'œil de l'équipe pour le détail est exceptionnel. Chaque pixel a une raison d'être et l'harmonie globale est bluffante." },
  { name: "Thomas B.", role: "Startup Founder", text: "L'implémentation Next.js/Tailwind est d'une propreté exemplaire. Performance au rendez-vous et maintenance facilitée." },
  { name: "Inès F.", role: "Brand Manager", text: "Ils ont capturé l'essence de notre marque dès le premier workshop. Une équipe qui comprend les enjeux business autant que créatifs." },
  { name: "Éric P.", role: "Consultant Digital", text: "Un workflow transparent et des outils de suivi qui facilitent énormément la collaboration. Très rare dans le milieu des agences." },
  { name: "Sophia G.", role: "UX Researcher", text: "Leur compréhension des flux utilisateurs se ressent dans chaque interaction. Un design qui pense avant tout à l'utilisateur." },
  { name: "David L.", role: "DevOps Engineer", text: "Architecture front-end robuste et scalable. Un plaisir de travailler sur une base de code aussi soignée et optimisée." },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-bg-main py-16 md:py-20 overflow-hidden border-b border-dark/5" id="temoignages">
      <div className="max-w-[1700px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Content (Static) */}
          <div className="lg:col-span-4 relative z-10">
            <SectionHeader 
              title="L'Impact de"
              highlight="notre lab."
              description="Des témoignages qui témoignent de la rigueur de notre processus et de la puissance de nos designs."
            />
            
            <div className="mt-10 flex flex-col gap-4">
              <motion.button
                whileHover={{ x: 10 }}
                className="group flex items-center justify-between px-7 py-4 bg-black-deep text-white rounded-full transition-all duration-500 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 font-heading font-bold text-[11px] tracking-widest uppercase">Démarrer l'aventure</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 group-hover:rotate-45 transition-transform" />
              </motion.button>
              
              <button className="group flex items-center gap-4 px-7 py-4 border border-dark/10 rounded-full hover:border-dark transition-all duration-500">
                <span className="font-heading font-bold text-[11px] tracking-widest uppercase text-dark">Voir plus de retours</span>
                <div className="w-5 h-px bg-dark/20 group-hover:w-8 group-hover:bg-dark transition-all" />
              </button>
            </div>

            {/* Metrics Mini-Block */}
            <div className="mt-16 pt-8 border-t border-dark/5 flex gap-10">
              <div>
                <span className="block text-4xl font-heading font-bold text-black-deep tracking-tighter">98%</span>
                <span className="text-[9px] font-mono text-dark/40 uppercase tracking-widest font-bold mt-1 block">Satisfaction</span>
              </div>
              <div>
                <span className="block text-4xl font-heading font-bold text-black-deep tracking-tighter">12+</span>
                <span className="text-[9px] font-mono text-dark/40 uppercase tracking-widest font-bold mt-1 block">Industries</span>
              </div>
            </div>
          </div>

          {/* Right Content (Enlarged Animated Ribbons) */}
          <div className="lg:col-span-8 relative h-[650px] flex gap-6 overflow-hidden">
            {/* Gradient Mask for Smooth Edge Fade */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg-main via-bg-main/80 to-transparent z-20" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-main via-bg-main/80 to-transparent z-20" />

            {/* Ribbon 1: Going UP */}
            <div className="flex-1">
              <TestimonialRibbon 
                items={testimonials1} 
                direction="up" 
                speed={80} 
              />
            </div>

            {/* Ribbon 2: Going DOWN */}
            <div className="flex-1 pt-32">
              <TestimonialRibbon 
                items={testimonials2} 
                direction="down" 
                speed={100} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialRibbon({ 
  items, 
  direction, 
  speed 
}: { 
  items: Testimonial[], 
  direction: "up" | "down", 
  speed: number 
}) {
  const duplicatedItems = [...items, ...items, ...items, ...items];
  
  return (
    <div className="relative h-full group/ribbon">
      <div 
        className={`flex flex-col gap-6 ${direction === "up" ? "animate-marquee-vertical-up" : "animate-marquee-vertical-down"} group-hover/ribbon:[animation-play-state:paused]`}
        style={{ 
          animationDuration: `${speed}s`,
        }}
      >
        {duplicatedItems.map((t, idx) => (
          <div
            key={idx}
            className="w-full bg-white border border-dark/5 p-10 md:p-14 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-700 min-h-[380px] group"
          >
            <div>
              <div className="flex gap-2 mb-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary opacity-80 group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 50}ms` }} />
                ))}
              </div>
              <p className="font-heading font-medium text-lg md:text-xl text-black-deep/90 leading-relaxed italic">
                "{t.text}"
              </p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-dark/5 flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-bg-alt flex items-center justify-center font-heading font-bold text-dark/30 border border-dark/5">
                {t.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm tracking-tight text-black-deep">
                  {t.name}
                </h4>
                <span className="text-[10px] font-mono text-dark/40 font-bold uppercase tracking-wider block mt-0.5">
                  {t.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


