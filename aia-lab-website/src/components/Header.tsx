"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  Monitor, 
  Zap, 
  Users, 
  ArrowRight 
} from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const menuItems = [
    { label: "Home", href: "#" },
    { label: "Services", href: "#expertises", hasDropdown: true },
    { label: "Our Work", href: "#portfolio" },
    { label: "About Us", href: "#apropos" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 md:px-8 py-4 ${
        isScrolled ? "translate-y-2" : "translate-y-0"
      }`}
    >
      <div 
        className={`max-w-container mx-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl ${
          isScrolled 
            ? "bg-white/90 h-[52px] px-4" 
            : "bg-white/40 h-[64px] px-6"
        }`}
      >
        <div className="h-full flex items-center justify-between">
          {/* Zone Gauche : Logo */}
          <a href="#" className="flex items-center gap-3 transition-transform duration-300 hover:scale-105 active:scale-95">
            <Image
              src="/images/logo.png"
              alt="AIA LAB Logo"
              width={160}
              height={40}
              className={`transition-all duration-500 object-contain ${
                isScrolled ? "h-7" : "h-9"
              }`}
              priority
            />
          </a>

          {/* Zone Centre : Navigation Style "Pill" */}
          <nav className="hidden md:flex items-center gap-1 bg-black/[0.02] border border-black/[0.04] rounded-full p-1 relative">
            {menuItems.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div key={item.label} className="relative py-1">
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      onBlur={(e) => {
                        // Close if clicking outside
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                          setTimeout(() => setIsServicesOpen(false), 200);
                        }
                      }}
                      className={`text-[13px] font-sans font-semibold px-5 py-2 rounded-full transition-all duration-500 flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isServicesOpen 
                          ? "bg-white text-black-deep shadow-[0_4px_20px_rgba(0,0,0,0.08)] scale-102" 
                          : "text-black-deep/70 hover:text-black-deep hover:bg-white/60"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180 text-primary' : 'text-dark/40'}`} />
                    </button>
                    
                    {/* Mega-menu (Click-based interaction) */}
                    <div className={`absolute top-[140%] left-1/2 -translate-x-1/2 w-[680px] bg-white/90 backdrop-blur-3xl border border-white/40 rounded-[2.5rem] shadow-[0_30px_90px_rgba(0,0,0,0.12)] p-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-50 ${
                      isServicesOpen 
                        ? "opacity-100 visible translate-y-0" 
                        : "opacity-0 invisible translate-y-8"
                    }`}>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/95 border-t border-l border-white rotate-45 invisible md:visible"></div>
                      
                      <div className="grid grid-cols-2 gap-6 relative">
                        <div className="col-span-2 mb-2">
                          <h3 className="text-xs font-bold uppercase tracking-widest text-primary/80 px-4">Nos Expertises</h3>
                        </div>
                        
                        {[
                          { title: "Design & Branding IA", desc: "Identités visuelles et directions artistiques générées par IA.", icon: Sparkles, color: "bg-purple-500/10 text-purple-600" },
                          { title: "Dév Web & Mobile", desc: "Applications performantes sous Next.js avec animations immersives.", icon: Monitor, color: "bg-blue-500/10 text-blue-600" },
                          { title: "IA & Automatisation", desc: "Intégration de LLM, agents autonomes et pipelines IA.", icon: Zap, color: "bg-orange-500/10 text-orange-600" },
                          { title: "Conseil & Stratégie", desc: "Audit de vos processus et accompagnement au changement IA.", icon: Users, color: "bg-green-500/10 text-green-600" }
                        ].map((service, idx) => (
                          <a key={idx} href="#expertises" className="group/item p-5 rounded-[1.5rem] hover:bg-bg-alt/80 transition-all duration-300 flex items-start gap-4">
                            <div className={`p-3.5 rounded-2xl ${service.color} group-hover/item:scale-110 transition-transform duration-300 shadow-sm`}>
                              <service.icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="text-[15px] font-sans font-bold text-black-deep mb-1 group-hover/item:text-primary transition-colors">{service.title}</h4>
                              <p className="text-xs leading-relaxed text-dark/60 font-medium">{service.desc}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                      
                      {/* Pied du mega-menu */}
                      <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between px-2">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-black-deep">Besoin d'une solution sur-mesure ?</span>
                          <span className="text-[10px] text-dark/50">Planifiez un appel de 15min avec nous.</span>
                        </div>
                        <a href="#cta-contact" className="group flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-primary hover:text-black transition-all duration-300">
                          <span>Démarrer maintenant</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[13px] font-sans font-medium text-primary/80 hover:text-primary hover:bg-white/80 px-4 py-1.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone Droite : CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#cta-contact"
              className={`hidden md:inline-flex items-center justify-center font-sans font-bold tracking-tight rounded-full transition-all duration-700 active:scale-95 group relative overflow-hidden shadow-sm hover:shadow-primary/20 ${
                isScrolled 
                  ? "px-5 py-1.5 bg-primary text-white text-[11px]" 
                  : "px-6 py-2 bg-primary text-white text-[13px]"
              }`}
            >
              <span className="relative z-10">Lancer le projet</span>
              <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-3 transition-all duration-300 rounded-full ${
                isOpen ? "bg-black text-white" : "bg-black/5 text-black hover:bg-black/10"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile (Fullscreen Overlay) */}
      <div className={`fixed inset-0 bg-white z-[-1] md:hidden transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}>
        <div className="h-full flex flex-col pt-32 px-8 pb-12">
          <nav className="flex flex-col space-y-2">
            {menuItems.map((item, idx) => (
              <div 
                key={item.label} 
                className="overflow-hidden"
              >
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-4xl font-heading font-bold text-black-deep hover:text-primary transition-all duration-500 block py-2 ${
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </nav>

          <div className="mt-auto pt-10 border-t border-black/5">
            <div className={`transition-all duration-700 delay-500 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
              <p className="text-dark/40 text-sm font-sans mb-6">Prêt à transformer votre vision en réalité augmentée ?</p>
              <a
                href="#cta-contact"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-between p-6 bg-black-deep text-white rounded-[2rem] group"
              >
                <span className="text-xl font-bold">Nous contacter</span>
                <div className="bg-primary p-3 rounded-full group-hover:rotate-45 transition-transform duration-500">
                  <ArrowRight className="w-6 h-6 text-black" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
