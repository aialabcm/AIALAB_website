"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SectionHeader from "./SectionHeader";

const faqData = [
  {
    question: "Quel est le délai moyen pour un projet complet ?",
    answer: "Pour un projet de branding et de site web vitrine, comptez généralement entre 4 et 6 semaines. Ce délai inclut toutes les phases, de la stratégie à la livraison finale.",
  },
  {
    question: "Comment se déroule la phase de découverte ?",
    answer: "Nous organisons des ateliers d'immersion pour comprendre votre vision, vos objectifs et votre marché. C'est l'étape cruciale qui définit toute la direction stratégique du projet.",
  },
  {
    question: "Travaillez-vous avec des technologies spécifiques ?",
    answer: "Nous sommes experts sur Next.js, Tailwind CSS et Framer Motion pour le front-end. Côté CMS, nous privilégions les solutions Headless comme WordPress ou Sanity pour offrir une flexibilité maximale.",
  },
  {
    question: "Proposez-vous un accompagnement après la livraison ?",
    answer: "Absolument. Nous proposons des forfaits de maintenance et d'optimisation continue pour garantir que votre plateforme reste performante et évolue avec vos besoins.",
  },
  {
    question: "Le design sera-t-il adapté à mon secteur d'activité ?",
    answer: "Chaque design est créé sur mesure après une analyse approfondie de votre industrie. Nous ne suivons pas les tendances aveuglément, nous créons ce qui fonctionne pour vous.",
  },
  {
    question: "Puis-je suivre l'avancement de mon projet en temps réel ?",
    answer: "Oui, nous utilisons des outils de gestion de projet transparents et nous organisons des points hebdomadaires pour vous montrer les avancées concrètes.",
  },
  {
    question: "Les fichiers sources sont-ils inclus dans la livraison ?",
    answer: "Bien sûr. Vous êtes propriétaire de l'ensemble des créations. Nous vous remettons tous les fichiers Figma, les assets et le code source complet du projet.",
  },
  {
    question: "Adaptez-vous votre style graphique à mon budget ?",
    answer: "Nous modulons la complexité des animations et des fonctionnalités pour respecter vos contraintes tout en maintenant un standard de qualité AIA LAB élevé.",
  },
  {
    question: "Pouvez-vous intervenir sur une refonte de site existant ?",
    answer: "C'est une de nos spécialités. Nous analysons l'existant pour ne garder que ce qui fonctionne et transformer radicalement ce qui freine votre croissance.",
  },
  {
    question: "Comment s'organisent les paiements ?",
    answer: "Le règlement s'effectue généralement en trois étapes : un acompte à la commande, un versement après validation du design et le solde à la mise en ligne.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-black-deep py-24 md:py-32 overflow-hidden" id="faq">
      <div className="max-w-container mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Illustration */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block lg:col-span-4 relative h-[700px] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=2000&auto=format&fit=crop" 
              alt="AIA LAB Studio" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black-deep/20" />
            <div className="absolute bottom-10 left-10 text-white">
              <span className="block text-[10px] font-mono tracking-widest uppercase opacity-60 mb-2">AIA LAB / FAQ</span>
              <h4 className="text-2xl font-heading font-bold leading-tight">La clarté <br/> avant l'action.</h4>
            </div>
          </motion.div>

          {/* Right: FAQ Content */}
          <div className="lg:col-span-8">
            <div className="mb-16">
              <SectionHeader 
                title="Des questions ?"
                highlight="Plus de réponses."
                description="Nous privilégions la transparence totale sur nos méthodes et nos engagements."
                dark={true}
              />
            </div>

            <div className="space-y-4">
              {faqData.map((item, index) => (
                <FAQItem 
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  index={index}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function FAQItem({ 
  question, 
  answer, 
  isOpen, 
  onClick,
  index 
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`border-b border-white/10 transition-colors duration-500 ${isOpen ? 'bg-white/[0.03]' : ''}`}
    >
      <button
        onClick={onClick}
        data-cursor="explore"
        className="w-full flex items-center justify-between py-6 md:py-8 text-left focus:outline-none group"
      >
        <span className={`font-heading font-bold text-base md:text-lg tracking-tight transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-white/80 group-hover:text-white'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${isOpen ? 'rotate-180 bg-primary border-primary' : 'rotate-0'}`}>
          {isOpen ? <Minus className="w-4 h-4 text-black-deep" /> : <Plus className="w-4 h-4 text-white/40" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pr-12">
              <p className="font-sans text-white/50 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
