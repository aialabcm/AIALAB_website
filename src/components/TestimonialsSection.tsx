"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import SectionHeader from "./SectionHeader";

import { testimonials as fallbackTestimonials, type Testimonial } from "@/data/testimonials";

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const half = Math.ceil(testimonials.length / 2);
  const testimonials1 = testimonials.slice(0, half);
  const testimonials2 = testimonials.slice(half);

  if (testimonials.length === 0) {
    return (
      <section className="bg-bg-main py-16 md:py-20 overflow-hidden border-b border-dark/5" id="temoignages">
        <div className="text-center text-dark/40 py-12">
          Aucun témoignage disponible.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-bg-main py-16 md:py-20 overflow-hidden border-b border-dark/5" id="temoignages">
      <div className="max-w-[1700px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Content (Static) */}
          <div className="lg:col-span-4 relative z-10">
            <SectionHeader 
              title="L'Impact de"
              highlight="notre lab."
              description="Des témoignages qui témoignent de la rigueur de notre processus et de la puissance de nos designs."
            />
            
            <div className="mt-10 flex flex-col gap-4">
              <Link
                href="/lancer-un-projet"
                className="group flex items-center justify-between px-7 py-4 bg-black-deep text-white rounded-full transition-all duration-500 overflow-hidden relative hover:translate-x-2.5"
              >
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 font-heading font-bold text-[11px] tracking-widest uppercase">Démarrer l'aventure</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 group-hover:rotate-45 transition-transform" />
              </Link>
              
              <Link href="/en-cours?page=T%C3%A9moignages%20Clients" className="group flex items-center gap-4 px-7 py-4 border border-dark/10 rounded-full hover:border-dark transition-all duration-500">
                <span className="font-heading font-bold text-[11px] tracking-widest uppercase text-dark">Voir plus de retours</span>
                <div className="w-5 h-px bg-dark/20 group-hover:w-8 group-hover:bg-dark transition-all" />
              </Link>
            </div>

            {/* Metrics Mini-Block */}
            <div className="mt-16 pt-8 border-t border-dark/5 flex gap-10">
              <div>
                <span className="block text-4xl font-heading font-bold text-black-deep tracking-tighter">98%</span>
                <span className="text-[9px] font-mono text-dark/40 uppercase tracking-widest font-bold mt-1 block">Satisfaction</span>
              </div>
              <div>
                <span className="block text-4xl font-heading font-bold text-black-deep tracking-tighter">12+</span>
                <span className="text-[9px] font-mono text-dark/40 uppercase tracking-widest font-bold mt-1 block">Industries</span>
              </div>
            </div>
          </div>

          {/* Right Content (Enlarged Animated Ribbons for Desktop) */}
          <div className="hidden lg:flex lg:col-span-8 relative h-[650px] gap-6 overflow-hidden">
            {/* Gradient Mask for Smooth Edge Fade */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg-main via-bg-main/80 to-transparent z-20" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-main via-bg-main/80 to-transparent z-20" />

            {/* Ribbon 1: Going UP */}
            <div className="flex-1">
              <TestimonialRibbon 
                items={testimonials1} 
                direction="up" 
                speed={80} 
              />
            </div>

            {/* Ribbon 2: Going DOWN */}
            <div className="flex-1 pt-32">
              <TestimonialRibbon 
                items={testimonials2} 
                direction="down" 
                speed={100} 
              />
            </div>
          </div>

          {/* Mobile/Tablet Layout (below lg): Horizontal Carousel with native scroll snap */}
          <div className="lg:hidden col-span-1 relative w-full overflow-hidden py-4 mt-8">
            {/* Gradient Mask for Smooth Edge Fade (Horizontal) */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg-main to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg-main to-transparent z-20 pointer-events-none" />
            
            <MobileTestimonialsCarousel items={testimonials} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialRibbon({ 
  items, 
  direction, 
  speed 
}: { 
  items: Testimonial[], 
  direction: "up" | "down", 
  speed: number 
}) {
  const duplicatedItems = [...items, ...items];
  
  return (
    <div className="relative h-full group/ribbon">
      <div 
        className={`flex flex-col gap-6 ${direction === "up" ? "animate-marquee-vertical-up" : "animate-marquee-vertical-down"} group-hover/ribbon:[animation-play-state:paused]`}
        style={{ 
          animationDuration: `${speed}s`,
        }}
      >
        {duplicatedItems.map((t, idx) => (
          <div
            key={idx}
            className="w-full bg-white border border-dark/5 p-6 sm:p-10 md:p-14 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-700 min-h-[280px] sm:min-h-[340px] md:min-h-[380px] group"
          >
            <div>
              <div className="flex gap-1.5 sm:gap-2 mb-6 sm:mb-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary opacity-80 group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 50}ms` }} />
                ))}
              </div>
              <p className="font-heading accent-italic text-base sm:text-lg md:text-xl text-black-deep/90 leading-relaxed">
                "{t.text}"
              </p>
            </div>
            
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-dark/5 flex items-center gap-4 sm:gap-5">
              <div className="w-12 h-12 rounded-full bg-bg-alt flex items-center justify-center font-heading font-bold text-dark/30 border border-dark/5">
                {t.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm tracking-tight text-black-deep">
                  {t.name}
                </h4>
                <span className="text-[10px] font-mono text-dark/40 font-bold uppercase tracking-wider block mt-0.5">
                  {t.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileTestimonialsCarousel({ items }: { items: Testimonial[] }) {
  return (
    <div className="relative flex w-full">
      <div
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar w-full px-6 py-2"
      >
        {items.map((t, idx) => (
          <div
            key={idx}
            className="w-[290px] xs:w-[320px] flex-shrink-0 snap-center bg-white border border-dark/5 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl whitespace-normal"
          >
            <div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary opacity-80" />
                ))}
              </div>
              <p className="font-heading accent-italic text-sm text-black-deep/90 leading-relaxed min-h-[72px]">
                "{t.text}"
              </p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-dark/5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-bg-alt flex items-center justify-center font-heading font-bold text-dark/30 border border-dark/5 text-xs">
                {t.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs tracking-tight text-black-deep">
                  {t.name}
                </h4>
                <span className="text-[8px] font-mono text-dark/40 font-bold uppercase tracking-wider block mt-0.5">
                  {t.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


