"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function AboutManifesto() {
  return (
    <section className="relative w-full bg-black-deep py-[180px] md:py-[280px] min-h-[100dvh] flex items-center overflow-hidden">

      {/* Emblem watermark — centered filigrane */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
        <div className="relative w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-[0.03]">
          <Image
            src="/images/AIAl-Embleme.webp"
            alt=""
            fill
            className="object-contain"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 w-full">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex items-center gap-6 mb-16 md:mb-24"
        >
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] text-white/25 uppercase">
            Le Manifeste
          </span>
          <span className="flex-1 h-[1px] bg-white/[0.06]" />
        </motion.div>

        {/* Giant decorative quote mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <span className="text-[120px] md:text-[180px] leading-none font-serif text-primary/15 select-none block -mb-16 md:-mb-24">
            &ldquo;
          </span>
        </motion.div>

        {/* Monumental manifesto text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <p
            className="font-extralight text-white leading-[1.25] tracking-tight"
            style={{ fontSize: "clamp(22px, 2.5vw, 42px)" }}
          >
            Notre studio créatif est né d&apos;une conviction&nbsp;: chaque
            entreprise a une{" "}
            <span className="relative inline-block text-white italic font-light group">
              histoire puissante
              <span className="absolute bottom-1 left-0 w-full h-[2px] bg-primary/40 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </span>{" "}
            qui mérite d&apos;être vue et reconnue. Nous allons au-delà du
            simple visuel pour construire des images fortes qui représentent
            votre{" "}
            <span className="relative inline-block text-primary italic font-light group">
              identité,
              <span className="absolute bottom-1 left-0 w-full h-[2px] bg-primary/40 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </span>{" "}
            portent vos valeurs et amplifient votre{" "}
            <span className="relative inline-block text-primary italic font-light group">
              excellence.
              <span className="absolute bottom-1 left-0 w-full h-[2px] bg-primary/40 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
