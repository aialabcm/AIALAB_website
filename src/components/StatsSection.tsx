"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import BentoCard from "./BentoCard";
import SectionHeader from "./SectionHeader";
import { ArrowUpRight, Cpu, Sparkles, Zap, Hexagon, ShieldCheck } from "lucide-react";

export default function StatsSection() {
  const [trigger, setTrigger] = useState(0);

  const handleHover = () => {
    setTrigger((prev) => prev + 1);
  };

  return (
    <section 
      className="bg-bg-alt py-24 relative overflow-hidden" 
      id="stats"
      onMouseEnter={handleHover}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] -mr-64 -mt-64 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none"></div>

      <div className="max-w-container mx-auto px-6 md:px-20 relative z-10">
        <SectionHeader 
          title="L'impact de l'AIA LAB"
          highlight="en plein essor."
          description="Performance, rigueur et innovation. Nous transformons vos objectifs en données quantifiables et résultats concrets."
        />

        {/* Unified Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch md:auto-rows-[180px]">
          
          {/* Main Stat Card : 500+ (col-span-8, row-span-2) */}
          <BentoCard delay={0} className="md:col-span-8 md:row-span-2 bg-gradient-to-br from-[#08C1DC] via-[#10CBD6] to-[#14B8A6] border-none group cursor-pointer overflow-hidden p-0">
            <div className="flex flex-col h-full p-8 md:p-10 relative justify-between">
              {/* Dot Grid overlay */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                  backgroundSize: "20px 20px"
                }}
              />
              
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-black-deep/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
              
              {/* Card Header */}
              <div className="relative z-10 flex justify-between items-start">
                <div className="px-4 py-1.5 bg-black-deep/10 rounded-full text-[11px] font-mono font-black text-black-deep uppercase tracking-[0.15em]">
                  Portfolio Global
                </div>
                <ArrowUpRight className="w-8 h-8 text-black-deep group-hover:rotate-45 transition-transform duration-500" />
              </div>
              
              {/* Counter and Title */}
              <div className="relative z-10 my-4">
                <AnimatedCounter 
                  value={500} 
                  suffix="+" 
                  trigger={trigger > 0}
                  className="font-heading font-black text-6xl md:text-8xl text-black-deep tracking-tighter leading-none block mb-3"
                />
                <h3 className="font-heading font-bold text-lg md:text-xl text-black-deep/90 uppercase tracking-tight">
                  Projets Livrés avec Succès
                </h3>
              </div>

              {/* Bottom Sub-stats (Always visible and positioned well) */}
              <div className="relative z-10 grid grid-cols-3 gap-4 pt-6 border-t border-black/10">
                <div>
                  <div className="text-black-deep font-black text-xl md:text-2xl">94%</div>
                  <div className="text-[11px] uppercase font-bold tracking-widest text-black-deep/60">Rétention</div>
                </div>
                <div>
                  <div className="text-black-deep font-black text-xl md:text-2xl">24+</div>
                  <div className="text-[11px] uppercase font-bold tracking-widest text-black-deep/60">Pays</div>
                </div>
                <div>
                  <div className="text-black-deep font-black text-xl md:text-2xl">100%</div>
                  <div className="text-[11px] uppercase font-bold tracking-widest text-black-deep/60">Sécurité</div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Image Card 1 : Studio/Architecture (col-span-4, row-span-2) */}
          <BentoCard delay={0.1} className="md:col-span-4 md:row-span-2 p-0 overflow-hidden border-none group">
            <div className="relative w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop" 
                alt="Creative Studio" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-30 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
            </div>
          </BentoCard>

          {/* Article Card : AI & Design (col-span-4, row-span-2) */}
          <BentoCard delay={0.2} dark className="md:col-span-4 md:row-span-2 flex flex-col justify-between group cursor-pointer bg-anthracite p-8 md:p-10">
            <div>
              <div className="p-3 bg-primary/20 rounded-xl w-fit mb-6 md:mb-8">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-white leading-[1.15] mb-4">
                L'IA au service de l'émotion visuelle.
              </h3>
              <p className="font-sans text-white/60 leading-relaxed text-sm">
                Pourquoi la créativité est le dernier rempart de l'humain dans un monde automatisé. Notre manifeste pour 2026.
              </p>
            </div>
            <div className="flex items-center gap-3 text-primary font-bold group-hover:gap-5 transition-all text-xs md:text-sm mt-6">
              <span className="tracking-widest uppercase border-b border-primary/30 pb-1">Lire le manifeste</span>
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </BentoCard>

          {/* Efficiency Stat Card (col-span-4, row-span-1) */}
          <EfficiencyCard trigger={trigger} />

          {/* Satisfaction Card (col-span-4, row-span-1) */}
          <SatisfactionCard />

          {/* Image Card 2 : Neural/Tech (col-span-3, row-span-1) */}
          <BentoCard delay={0.4} className="md:col-span-3 md:row-span-1 p-0 overflow-hidden border-none group">
            <div className="relative w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1675271591211-126ad94e495d?q=80&w=2000&auto=format&fit=crop" 
                alt="AI Neural" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/5 opacity-40 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
            </div>
          </BentoCard>

          {/* Token Stat Card (col-span-5, row-span-1) */}
          <TokenCard trigger={trigger} />

        </div>
      </div>
    </section>
  );
}

// Subcomponent: Efficiency Card with interactive graph
function EfficiencyCard({ trigger }: { trigger: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <BentoCard delay={0.25} className="md:col-span-4 md:row-span-1 bg-white border border-dark/5 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute inset-0 z-0"
      />
      <div className="flex items-center gap-4 text-primary relative z-10">
        <div className="p-2.5 bg-primary/10 rounded-xl">
          <Cpu className="w-5 h-5" />
        </div>
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest">Efficiency boost</span>
      </div>
      <div className="relative z-10">
        <AnimatedCounter 
          value={15} 
          suffix="k+" 
          trigger={trigger > 0}
          className="font-heading font-black text-5xl md:text-5xl text-black-deep tracking-tighter leading-none mb-2"
        />
        <p className="font-sans text-dark/80 text-sm leading-relaxed max-w-[85%]">
          Heures d'exécution économisées par l'automatisation.
        </p>
      </div>
      <TrendLineChart isHovered={isHovered} />
    </BentoCard>
  );
}

function TrendLineChart({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="absolute right-0 bottom-0 left-0 h-16 overflow-hidden pointer-events-none z-0">
      <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="trend-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#08C1DC" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#08C1DC" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0 80 Q 50 60 100 70 T 200 30 T 300 15 L 300 100 L 0 100 Z"
          fill="url(#trend-gradient)"
          animate={{ opacity: isHovered ? 1 : 0.4 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d="M 0 80 Q 50 60 100 70 T 200 30 T 300 15"
          fill="none"
          stroke="#08C1DC"
          strokeWidth="2"
          initial={{ pathLength: 0.3 }}
          animate={{ pathLength: isHovered ? 1 : 0.6 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

// Subcomponent: Satisfaction Card with circular gauge
function SatisfactionCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <BentoCard delay={0.3} className="md:col-span-4 md:row-span-1 bg-white border border-dark/5 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute inset-0 z-0"
      />
      <div className="absolute right-6 top-6 z-10">
        <RadialSatisfactionGauge isHovered={isHovered} />
      </div>
      <div className="absolute right-0 top-0 p-8 text-primary/5 -mr-4 -mt-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <ShieldCheck className="w-20 h-20" />
      </div>
      <div className="text-primary font-black text-5xl md:text-6xl tracking-tighter relative z-10 leading-none mb-2">98%</div>
      <div className="relative z-10">
        <h4 className="text-[12px] font-bold text-black-deep/90 uppercase tracking-widest mb-1.5">Satisfaction Client</h4>
        <div className="w-12 h-1 bg-primary/20 rounded-full"></div>
      </div>
    </BentoCard>
  );
}

function RadialSatisfactionGauge({ isHovered }: { isHovered: boolean }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (98 / 100) * circumference;

  return (
    <div className="relative w-12 h-12 flex items-center justify-center pointer-events-none">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r={radius}
          className="stroke-dark/5 fill-none"
          strokeWidth="3"
        />
        <motion.circle
          cx="25"
          cy="25"
          r={radius}
          className="stroke-primary fill-none"
          strokeWidth="3"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: isHovered ? strokeDashoffset : strokeDashoffset + 10 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <span className="absolute text-[8px] font-mono font-bold text-black-deep">98%</span>
    </div>
  );
}

// Subcomponent: Token Card with floating nodes
function TokenCard({ trigger }: { trigger: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <BentoCard delay={0.45} className="md:col-span-5 md:row-span-1 flex items-center justify-between gap-8 bg-white border border-dark/5 p-6 md:p-8 group overflow-hidden relative">
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute inset-0 z-0"
      />
      <div className="absolute right-0 top-0 text-dark/5 -mr-10 -mt-10 scale-125 pointer-events-none"><Hexagon className="w-40 h-40 fill-current" /></div>
      <div className="flex items-center gap-6 relative z-10">
        <div className="p-3.5 bg-primary/10 rounded-full flex-shrink-0 text-primary">
          <Zap className="w-5 h-5 group-hover:fill-current transition-all" />
        </div>
        <div>
          <AnimatedCounter 
            value={12} 
            suffix="M+" 
            trigger={trigger > 0}
            className="font-heading font-bold text-5xl md:text-5xl text-black-deep tracking-tighter block leading-none"
          />
          <p className="font-sans text-[11px] text-dark/60 uppercase tracking-[0.15em] font-bold mt-2">
            Tokens / mois
          </p>
        </div>
      </div>
      <NeuralNodesBackground isHovered={isHovered} />
    </BentoCard>
  );
}

function NeuralNodesBackground({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden z-0">
      <svg className="w-full h-full" viewBox="0 0 200 120">
        <motion.path
          d="M 30 40 L 70 80 M 70 80 L 140 30 M 140 30 L 170 90 M 70 80 L 170 90"
          stroke="#08C1DC"
          strokeWidth="1"
          animate={{
            opacity: isHovered ? 0.7 : 0.3,
            strokeWidth: isHovered ? 1.5 : 1,
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.circle
          cx="30"
          cy="40"
          r="4"
          fill="#08C1DC"
          animate={{ scale: isHovered ? 1.4 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.circle
          cx="70"
          cy="80"
          r="5"
          fill="#08C1DC"
          animate={{ scale: isHovered ? 1.3 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.circle
          cx="140"
          cy="30"
          r="3.5"
          fill="#08C1DC"
          animate={{ scale: isHovered ? 1.5 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.circle
          cx="170"
          cy="90"
          r="4.5"
          fill="#08C1DC"
          animate={{ scale: isHovered ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </svg>
    </div>
  );
}

