"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Crown, Palette, Code2, Megaphone, Brain } from "lucide-react";

const team = [
  {
    name: "Alexandre Ngueme",
    role: "Fondateur & Directeur Créatif",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=400&fit=crop",
    bio: "Pionnier créatif guidé par l'innovation technologique. Il définit la vision esthétique d'AIA LAB et supervise l'ensemble des directions artistiques.",
    color: "#08C1DC",
    icon: Sparkles,
  },
  {
    name: "Christian Kamga",
    role: "CEO & Directeur Général",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&fit=crop",
    bio: "Stratège chevronné doté d'une vision business claire. Il pilote la croissance globale du studio, gère les grands comptes et structure nos opérations.",
    color: "#057E90",
    icon: Crown,
  },
  {
    name: "Sarah Eteki",
    role: "Lead Design & Branding",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&h=400&fit=crop",
    bio: "Experte en design d'interaction et identités de marque premium. Elle sculpte des chartes graphiques mémorables et des interfaces d'exception.",
    color: "#259EB1",
    icon: Palette,
  },
  {
    name: "Marc Tchamgoue",
    role: "Lead Développeur Web",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=400&h=400&fit=crop",
    bio: "Architecte code spécialisé dans Next.js et la performance web. Il donne vie aux designs les plus complexes avec une précision mathématique.",
    color: "#14B8A6",
    icon: Code2,
  },
  {
    name: "Dimitri Yombi",
    role: "Directeur Marketing",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&h=400&fit=crop",
    bio: "Maître de la croissance numérique et du SEO. Il conçoit des stratégies d'acquisition ciblées pour assurer à nos clients une visibilité absolue.",
    color: "#0D9488",
    icon: Megaphone,
  },
  {
    name: "Léa Ngassa",
    role: "Product Manager & Stratégie IA",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=400&h=400&fit=crop",
    bio: "Chef d'orchestre produit experte en flux de travail IA. Elle coordonne nos développements et intègre l'IA pour optimiser l'efficacité globale.",
    color: "#08C1DC",
    icon: Brain,
  },
];

export default function AboutTeam() {
  return (
    <section
      className="relative overflow-hidden border-t border-black/[0.04]"
      style={{
        backgroundColor: "#FFFFFF",
        paddingTop: "8rem",
        paddingBottom: "14rem",
      }}
      id="about-team"
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#08C1DC]/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#057E90]/[0.01] rounded-full blur-[130px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: "10rem" }}>

          <h2 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tighter leading-[1.1] text-black-deep">
            Les esprits derrière <span className="text-primary accent-italic">le lab.</span>
          </h2>
          <p className="font-sans text-dark/70 text-base md:text-lg max-w-[55ch] mx-auto mt-6 leading-relaxed font-medium">
            Des talents passionnés et complémentaires, unis par une même quête de l'excellence créative et technique.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto" style={{ columnGap: "5rem", rowGap: "8rem" }}>
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col group" style={{ gap: "2rem" }}
            >
              {/* Header row: Avatar + Name/Role */}
              <div className="flex items-center gap-6">
                {/* Avatar circle with image */}
                <div
                  className="w-20 h-20 rounded-full flex-shrink-0 relative transition-transform duration-500 group-hover:scale-[1.03] overflow-visible"
                  style={{
                    boxShadow: `0 8px 30px rgba(0,0,0,0.06)`,
                  }}
                >
                  <div className="absolute inset-0 rounded-full overflow-hidden border-[3px] border-white z-10">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-[800ms] group-hover:scale-105"
                      priority={idx < 3}
                    />
                  </div>

                  {/* Glowing background ring */}
                  <div
                    className="absolute -inset-1 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      border: `1.5px solid ${member.color}`,
                    }}
                  />

                  {/* Role icon badge */}
                  {(() => {
                    const Icon = member.icon;
                    return (
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-7 h-7 rounded-full border-[2.5px] border-white flex items-center justify-center shadow-lg z-20 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: member.color }}
                      >
                        <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                      </div>
                    );
                  })()}
                </div>

                {/* Name & Role */}
                <div className="flex flex-col">
                  <span
                    className="text-[11px] font-mono font-bold uppercase tracking-wider mb-1"
                    style={{ color: member.color }}
                  >
                    {member.role}
                  </span>
                  <h4 className="font-heading font-bold text-xl text-black-deep tracking-tight group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h4>
                </div>
              </div>

              {/* Bio description below */}
              <p className="font-sans text-dark/70 text-[15px] leading-[1.7] pl-1 max-w-[95%]">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
