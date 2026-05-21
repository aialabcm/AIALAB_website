"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import BentoCard from "./BentoCard";
import SectionHeader from "./SectionHeader";
import { ArrowUpRight, Cpu, Sparkles, Zap, Globe, Hexagon, ShieldCheck, BarChart3 } from "lucide-react";

export default function StatsSection() {
  const [trigger, setTrigger] = useState(0);

  const handleHover = () => {
    setTrigger((prev) => prev + 1);
  };

  return (
    <section 
      className="bg-bg-alt py-20 relative overflow-hidden" 
      id="stats"
      onMouseEnter={handleHover}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none"></div>

      <div className="max-w-container mx-auto px-6 md:px-20 relative z-10">
        <SectionHeader 
          title="L'impact de l'AIA LAB"
          highlight="en plein essor."
          description="Performance, rigeur et innovation. Nous transformons vos objectifs en données quantifiables et résultats concrets."
        />

        {/* Bento Grid Layer 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mb-6 md:auto-rows-[280px]">
          
          {/* Main Stat Card : 500+ */}
          <BentoCard className="md:col-span-8 bg-[#08C1DC] border-none group cursor-pointer overflow-hidden p-0">
            <div className="flex flex-col h-full p-12 relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-black-deep/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="px-4 py-1.5 bg-black-deep/10 rounded-full text-[10px] font-mono font-black text-black-deep uppercase tracking-[0.2em]">
                      Portfolio Global
                    </div>
                    <ArrowUpRight className="w-8 h-8 text-black-deep group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                  
                  <AnimatedCounter 
                    value={500} 
                    suffix="+" 
                    trigger={trigger > 0}
                    className="font-heading font-black text-7xl md:text-[9rem] text-black-deep tracking-tighter leading-none block mb-6"
                  />
                  
                  <h3 className="font-heading font-bold text-2xl text-black-deep uppercase tracking-tight">
                    Projets Livrés avec Succès
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-black/10">
                  <div>
                    <div className="text-black-deep font-black text-2xl">94%</div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-black-deep/40">Rétention</div>
                  </div>
                  <div>
                    <div className="text-black-deep font-black text-2xl">24+</div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-black-deep/40">Pays</div>
                  </div>
                  <div>
                    <div className="text-black-deep font-black text-2xl">100%</div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-black-deep/40">Sécurité</div>
                  </div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Image Card 1 : Studio/Architecture */}
          <BentoCard className="md:col-span-4 p-0 overflow-hidden border-none group">
            <img 
              src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop" 
              alt="Creative Studio" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </BentoCard>
        </div>

        {/* Bento Grid Layer 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch md:auto-rows-[260px]">
          
          {/* Article Card : AI & Design */}
          <BentoCard dark className="md:col-span-4 md:row-span-2 flex flex-col justify-between group cursor-pointer bg-anthracite p-10">
            <div>
              <div className="p-3 bg-primary/20 rounded-xl w-fit mb-12">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-3xl text-white leading-[1.1] mb-6">
                L'IA au service de l'émotion visuelle.
              </h3>
              <p className="font-sans text-white/50 leading-relaxed text-sm">
                Pourquoi la créativité est le dernier rempart de l'humain dans un monde automatisé. Notre manifeste pour 2026.
              </p>
            </div>
            <div className="flex items-center gap-3 text-primary font-bold group-hover:gap-5 transition-all text-sm mt-12">
              <span className="tracking-widest uppercase border-b border-primary/30 pb-1">Lire le manifeste</span>
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </BentoCard>

          {/* Efficiency Stat Card */}
          <BentoCard className="md:col-span-4 bg-white border border-dark/5 p-10 flex flex-col justify-between">
            <div className="flex items-center gap-4 text-primary">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Efficiency boost</span>
            </div>
            <div>
              <AnimatedCounter 
                value={15} 
                suffix="k+" 
                trigger={trigger > 0}
                className="font-heading font-black text-6xl text-black-deep tracking-tighter leading-none mb-2"
              />
              <p className="font-sans text-dark/70 text-sm leading-relaxed">
                Heures d'exécution économisées grâce à l'automatisation.
              </p>
            </div>
          </BentoCard>

          {/* Satisfaction Card */}
          <BentoCard className="md:col-span-4 bg-white border border-dark/5 p-10 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-8 text-primary/10 -mr-4 -mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ShieldCheck className="w-24 h-24" />
            </div>
            <div className="text-primary font-black text-6xl tracking-tighter">98%</div>
            <div>
              <h4 className="text-xs font-bold text-black-deep uppercase tracking-widest mb-2">Satisfaction Client</h4>
              <div className="w-12 h-1 bg-primary/20 rounded-full"></div>
            </div>
          </BentoCard>

          {/* Image Card 2 : Neural/Tech */}
          <BentoCard className="md:col-span-3 p-0 overflow-hidden border-none group">
            <img 
              src="https://images.unsplash.com/photo-1675271591211-126ad94e495d?q=80&w=2000&auto=format&fit=crop" 
              alt="AI Neural" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
            />
          </BentoCard>

          {/* Token Stat Card */}
          <BentoCard className="md:col-span-5 flex items-center justify-between gap-8 bg-white border border-dark/5 p-10 group overflow-hidden relative">
            <div className="absolute right-0 top-0 text-dark/5 -mr-10 -mt-10 scale-150"><Hexagon className="w-48 h-48 fill-current" /></div>
            <div className="flex items-center gap-6 relative z-10">
              <div className="p-4 bg-primary/10 rounded-full flex-shrink-0 text-primary">
                <Zap className="w-6 h-6 group-hover:fill-current transition-all" />
              </div>
              <div>
                <AnimatedCounter 
                  value={12} 
                  suffix="M+" 
                  trigger={trigger > 0}
                  className="font-heading font-bold text-6xl text-black-deep tracking-tighter block leading-none"
                />
                <p className="font-sans text-[10px] text-dark/40 uppercase tracking-[0.2em] font-bold mt-1">
                  Tokens / mois
                </p>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}

