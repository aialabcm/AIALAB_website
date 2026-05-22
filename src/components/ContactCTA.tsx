"use client";

import { motion } from "framer-motion";
import { MessageSquare, ArrowUpRight, Sparkles } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="relative bg-bg-main py-16 md:py-20 overflow-hidden" id="cta-contact">
      {/* Aurora Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-secondary/15 blur-[100px] rounded-full"
        />
      </div>

      <div className="max-w-container mx-auto px-6 md:px-20 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-heading font-extrabold text-4xl md:text-7xl text-black-deep tracking-tighter max-w-[15ch] leading-[0.95]"
          >
            Bâtissons ensemble <span className="text-primary italic">l'exceptionnel.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-sans text-base md:text-xl text-dark/70 mt-10 max-w-[55ch] leading-relaxed font-medium"
          >
            Plus qu'une agence, nous sommes votre partenaire stratégique. Collaborons pour transformer votre vision en un héritage numérique qui marque les esprits.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-14 flex flex-col sm:flex-row items-center gap-6"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="mailto:contact@aialab.com?subject=Discussion%20Projet"
              className="group flex items-center gap-3 px-10 py-5 bg-black-deep text-bg-main font-heading font-bold text-xs tracking-widest uppercase rounded-full shadow-premium hover:bg-primary hover:text-black-deep transition-all duration-500"
            >
              <MessageSquare className="w-4 h-4" />
              Lancer la discussion
            </motion.a>

            <motion.a
              whileHover={{ x: 5 }}
              href="#portfolio"
              className="group flex items-center gap-3 px-10 py-5 border border-dark/10 text-dark font-heading font-bold text-xs tracking-widest uppercase rounded-full hover:border-dark hover:bg-white/50 transition-all duration-500"
            >
              Découvrir le lab
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 flex items-center gap-3 text-[10px] font-mono text-dark/40 font-bold uppercase tracking-widest"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-bg-main bg-bg-alt overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Expert" className="w-full h-full object-cover grayscale" />
                </div>
              ))}
            </div>
            <span>Réponse sous 24h &bull; places limitées pour 2026</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

