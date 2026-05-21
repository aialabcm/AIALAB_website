"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Grid BG */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(8,193,220,1) 1px, transparent 1px), linear-gradient(90deg, rgba(8,193,220,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.08, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-heading font-black text-[200px] md:text-[300px] text-white leading-none select-none absolute"
        >
          404
        </motion.div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-black text-5xl md:text-7xl text-white tracking-tighter"
            >
              Page introuvable.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-sans text-base text-white max-w-[38ch] mb-12 leading-relaxed mt-6"
          >
            Cette page n'existe pas (encore). Le Lab est en pleine ébullition créative.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-heading font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:bg-primary shadow-2xl"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour à l&apos;accueil
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
