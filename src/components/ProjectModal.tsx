"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

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

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  // Set mounted on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Save the previously focused element on open
  useEffect(() => {
    if (project) {
      previousFocus.current = document.activeElement as HTMLElement;
    }
  }, [project]);

  // Body scroll lock + focus management
  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = "hidden";
    // Focus the close button after animation settles
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 500);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
      // Restore focus
      previousFocus.current?.focus();
    };
  }, [project]);

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!project) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, handleKeyDown]);

  // Click outside (on backdrop) closes modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100]"
            style={{
              backgroundColor: "rgba(11, 11, 11, 0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={onClose}
            aria-hidden
          />

          {/* Modal scroll container */}
          <div
            className="fixed inset-0 z-[101] overflow-y-auto overscroll-contain flex justify-center items-start p-3 sm:p-4 md:p-8 lg:p-12"
            onClick={handleBackdropClick}
          >
            {/* Close Button */}
            <motion.button
              ref={closeBtnRef}
              onClick={onClose}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[102] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black-deep text-black-deep"
              style={{
                boxShadow: "0 0 0 0 rgba(8, 193, 220, 0)",
              }}
              whileHover={{
                boxShadow: "0 0 24px 4px rgba(8, 193, 220, 0.4)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              aria-label="Fermer le projet"
            >
              <X className="w-5 h-5" strokeWidth={2.5} />
            </motion.button>

            {/* Modal Card */}
            <motion.div
              ref={panelRef}
              className="bg-white text-[#172A2E] w-full max-w-5xl rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] shadow-2xl relative my-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { y: "50px", opacity: 0 }
              }
              animate={{ y: 0, opacity: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { y: "50px", opacity: 0 }
              }
              transition={{
                duration: 0.4,
                ease: EASE,
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              {/* Content */}
              <div className="relative min-h-full">
                {/* Headline */}
                <motion.div
                  className="pt-12 pb-6 sm:pt-16 sm:pb-8 md:pt-24 md:pb-12 px-5 sm:px-6 md:px-12 text-center"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
                >
                  <h2
                    id="modal-headline"
                    className="font-heading font-black text-center leading-[1.0] tracking-tight max-w-[800px] mx-auto select-none text-[#172A2E]"
                    style={{ fontSize: "clamp(1.5rem, 7vw, 4.5rem)" }}
                  >
                    {project.headline}
                  </h2>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                  className="px-4 sm:px-6 md:px-16 max-w-4xl mx-auto"
                  initial={{
                    opacity: 0,
                    scale: reduceMotion ? 1 : 0.97,
                  }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                >
                  <div className="relative aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden bg-black/5">
                    <Image
                      src={project.image}
                      alt={project.headline}
                      fill
                      sizes="(max-width: 768px) 100vw, 900px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Storytelling */}
                <div className="mt-8 sm:mt-12 md:mt-16 px-4 sm:px-6 md:px-16 max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <motion.p
                      className="font-sans text-base md:text-lg text-[#172A2E]/80 leading-relaxed"
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                    >
                      {project.story[0]}
                    </motion.p>
                    <motion.p
                      className="font-sans text-base md:text-lg text-[#172A2E]/80 leading-relaxed"
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
                    >
                      {project.story[1]}
                    </motion.p>
                  </div>
                </div>

                {/* Recap */}
                <motion.div
                  className="mt-8 sm:mt-12 md:mt-16 px-4 sm:px-6 md:px-16 max-w-4xl mx-auto pb-12 sm:pb-16 md:pb-24"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
                >
                  <div className="border-t border-black/10 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                      {/* Client */}
                      <div>
                        <span className="block font-script text-[24px] md:text-[28px] text-secondary leading-none mb-1 lowercase">
                          client
                        </span>
                        <span className="font-heading font-bold text-base text-[#172A2E]">
                          {project.client}
                        </span>
                      </div>

                      {/* Services */}
                      <div>
                        <span className="block font-script text-[24px] md:text-[28px] text-secondary leading-none mb-1 lowercase">
                          services
                        </span>
                        <span className="font-heading font-bold text-base text-[#172A2E]">
                          {project.services.join(", ")}
                        </span>
                      </div>

                      {/* Location */}
                      <div>
                        <span className="block font-script text-[24px] md:text-[28px] text-secondary leading-none mb-1 lowercase">
                          location
                        </span>
                        <span className="font-heading font-bold text-base text-[#172A2E]">
                          {project.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
