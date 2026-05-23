"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  highlight?: string;
  description?: string;
  centered?: boolean;
  dark?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  highlight,
  description,
  centered = false,
  dark = false
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col ${centered ? "items-center text-center mx-auto" : "items-start"} mb-16 gap-6`}>
      <div className={`max-w-3xl ${centered ? "mx-auto" : ""}`}>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: "100%" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className={`font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.1] mb-4 ${dark ? "text-white" : "text-black-deep"}`}
          >
            {title} {highlight && <span className="text-primary accent-italic">{highlight}</span>}
          </motion.h2>
        </div>

        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`font-sans text-lg leading-relaxed ${dark ? "text-white/60" : "text-dark/70"}`}
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* The Small Blue Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className={`w-16 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full origin-left ${centered ? "mx-auto" : ""}`}
      />
    </div>
  );
}
