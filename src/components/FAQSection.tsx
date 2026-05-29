"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Layers, Code2, CreditCard, Headphones } from "lucide-react";
import SectionHeader from "./SectionHeader";

/* ─── Category definitions ─── */
interface FAQCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  items: { question: string; answer: string }[];
}

const categories: FAQCategory[] = [
  {
    id: "projet",
    label: "Projet",
    icon: Layers,
    items: [
      {
        question: "Quel est le délai moyen pour un projet complet ?",
        answer:
          "Pour un projet de branding et de site web vitrine, comptez généralement entre 4 et 6 semaines. Ce délai inclut toutes les phases, de la stratégie à la livraison finale.",
      },
      {
        question: "Comment se déroule la phase de découverte ?",
        answer:
          "Nous organisons des ateliers d'immersion pour comprendre votre vision, vos objectifs et votre marché. C'est l'étape cruciale qui définit toute la direction stratégique du projet.",
      },
      {
        question: "Le design sera-t-il adapté à mon secteur d'activité ?",
        answer:
          "Chaque design est créé sur mesure après une analyse approfondie de votre industrie. Nous ne suivons pas les tendances aveuglément, nous créons ce qui fonctionne pour vous.",
      },
      {
        question: "Pouvez-vous intervenir sur une refonte de site existant ?",
        answer:
          "C'est une de nos spécialités. Nous analysons l'existant pour ne garder que ce qui fonctionne et transformer radicalement ce qui freine votre croissance.",
      },
    ],
  },
  {
    id: "technique",
    label: "Technique",
    icon: Code2,
    items: [
      {
        question: "Travaillez-vous avec des technologies spécifiques ?",
        answer:
          "Nous sommes experts sur Next.js, Tailwind CSS et Framer Motion pour le front-end. Côté CMS, nous privilégions les solutions Headless comme WordPress ou Sanity pour offrir une flexibilité maximale.",
      },
      {
        question: "Les fichiers sources sont-ils inclus dans la livraison ?",
        answer:
          "Bien sûr. Vous êtes propriétaire de l'ensemble des créations. Nous vous remettons tous les fichiers Figma, les assets et le code source complet du projet.",
      },
    ],
  },
  {
    id: "tarifs",
    label: "Tarifs",
    icon: CreditCard,
    items: [
      {
        question: "Adaptez-vous votre style graphique à mon budget ?",
        answer:
          "Nous modulons la complexité des animations et des fonctionnalités pour respecter vos contraintes tout en maintenant un standard de qualité AIA LAB élevé.",
      },
      {
        question: "Comment s'organisent les paiements ?",
        answer:
          "Le règlement s'effectue généralement en trois étapes : un acompte à la commande, un versement après validation du design et le solde à la mise en ligne.",
      },
    ],
  },
  {
    id: "suivi",
    label: "Suivi",
    icon: Headphones,
    items: [
      {
        question: "Proposez-vous un accompagnement après la livraison ?",
        answer:
          "Absolument. Nous proposons des forfaits de maintenance et d'optimisation continue pour garantir que votre plateforme reste performante et évolue avec vos besoins.",
      },
      {
        question: "Puis-je suivre l'avancement de mon projet en temps réel ?",
        answer:
          "Oui, nous utilisons des outils de gestion de projet transparents et nous organisons des points hebdomadaires pour vous montrer les avancées concrètes.",
      },
    ],
  },
];

/* ─── Main Section ─── */
export default function FAQSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  /* Compute animated underline position */
  const updateIndicator = useCallback(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeTab]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setOpenIndex(0); // open first item of new category
  };

  const activeCategory = categories[activeTab];

  return (
    <section className="bg-black-deep py-24 md:py-32 overflow-hidden" id="faq">
      <div className="max-w-container mx-auto px-6 md:px-10 lg:px-20">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <SectionHeader
            title="Des questions ?"
            highlight="Plus de réponses."
            description="Nous privilégions la transparence totale sur nos méthodes et nos engagements."
            dark={true}
          />
        </div>

        {/* Tabs Bar */}
        <div className="relative mb-10 md:mb-14">
          <div className="flex gap-1 sm:gap-2 overflow-x-auto no-scrollbar pb-px">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              const isActive = activeTab === i;
              return (
                <button
                  key={cat.id}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  onClick={() => handleTabChange(i)}
                  className={`
                    relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-heading font-semibold tracking-tight
                    transition-colors duration-300 whitespace-nowrap
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                    ${isActive
                      ? "text-primary"
                      : "text-white/40 hover:text-white/70"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" strokeWidth={2} />
                  {cat.label}
                  {/* Item count badge */}
                  <span
                    className={`
                      ml-1 text-[10px] font-mono tabular-nums leading-none px-1.5 py-0.5 rounded-full
                      transition-colors duration-300
                      ${isActive
                        ? "bg-primary/15 text-primary"
                        : "bg-white/5 text-white/25"
                      }
                    `}
                  >
                    {cat.items.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Animated underline */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />
          <motion.div
            className="absolute bottom-0 h-[2px] rounded-full bg-gradient-to-r from-primary to-secondary"
            animate={{ left: indicator.left, width: indicator.width }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
          />
        </div>

        {/* FAQ Items — Animated crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-0"
          >
            {activeCategory.items.map((item, index) => (
              <FAQItem
                key={`${activeTab}-${index}`}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom decoration — subtle category counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/[0.06] flex items-center justify-between"
        >
          <p className="text-[11px] font-mono tracking-widest uppercase text-white/20">
            {activeCategory.label} — {activeCategory.items.length} question
            {activeCategory.items.length > 1 ? "s" : ""}
          </p>
          <div className="flex gap-1.5">
            {categories.map((_, i) => (
              <button
                key={i}
                onClick={() => handleTabChange(i)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${activeTab === i
                    ? "bg-primary w-6"
                    : "bg-white/10 hover:bg-white/20"
                  }
                `}
                aria-label={`Catégorie ${categories[i].label}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Accordion Item ─── */
function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`
        border-b border-white/[0.06] transition-colors duration-300
        ${isOpen ? "bg-white/[0.02]" : ""}
      `}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left focus:outline-none group"
      >
        <span
          className={`
            font-heading font-semibold text-[14px] sm:text-[15px] tracking-tight
            transition-colors duration-300 pr-3 leading-snug
            ${isOpen ? "text-primary" : "text-white/70 group-hover:text-white"}
          `}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`
            flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center
            transition-colors duration-300
            ${isOpen
              ? "bg-primary/15 text-primary"
              : "bg-white/5 text-white/30 group-hover:bg-white/10"
            }
          `}
        >
          <ChevronDown className="w-3.5 h-3.5" strokeWidth={2.5} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
            className="overflow-hidden"
          >
            <div className="pb-5 pr-10">
              <p className="font-sans text-white/45 text-[13px] md:text-sm leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
