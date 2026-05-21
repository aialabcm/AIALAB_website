"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Sparkles, 
  Monitor, 
  Zap, 
  Users, 
  ArrowRight 
} from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Magnetic Button Logic
  const headerBtnX = useSpring(useMotionValue(0), { damping: 20, stiffness: 150 });
  const headerBtnY = useSpring(useMotionValue(0), { damping: 20, stiffness: 150 });

  const handleHeaderBtnMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const moveX = (clientX - centerX) * 0.35; // Strength
    const moveY = (clientY - centerY) * 0.35;
    headerBtnX.set(moveX);
    headerBtnY.set(moveY);
  };

  const handleHeaderBtnReset = () => {
    headerBtnX.set(0);
    headerBtnY.set(0);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled state for styling
      setIsScrolled(currentScrollY > 20);

      // Visibility state (hide on scroll down, show on scroll up)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Framer Motion Variants for mobile menu
  const overlayVariants = {
    hidden: {
      y: "-100%",
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const navContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  };

  const navItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "#expertises", hasDropdown: true },
    { label: "Our Work", href: "/work" },
    { label: "About Us", href: "/about" },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] px-4 md:px-8 py-6 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
      <div 
        className={`max-w-[1280px] mx-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full border ${
          isOpen
            ? "bg-transparent border-transparent shadow-none backdrop-blur-none h-[80px] px-8"
            : isScrolled 
              ? "bg-white/95 border-black/[0.05] shadow-[0_15px_45px_rgba(0,0,0,0.06)] backdrop-blur-2xl h-[72px] px-6" 
              : "bg-white/60 border-black/[0.05] shadow-[0_15px_45px_rgba(0,0,0,0.06)] backdrop-blur-2xl h-[80px] px-8"
        }`}
      >
        <div className="h-full flex items-center justify-between">
          {/* Zone Gauche : Logo */}
          <a href="#" className="flex items-center gap-3 transition-transform duration-300 hover:scale-105 active:scale-95">
            <Image
              src="/images/logo.png"
              alt="AIA LAB Logo"
              width={240}
              height={60}
              className={`transition-all duration-500 object-contain ${
                isOpen
                  ? "h-14 brightness-0 invert"
                  : isScrolled ? "h-11" : "h-14"
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
                      className={`text-[13px] font-sans font-semibold px-5 py-2 rounded-full transition-all duration-500 flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${
                        isServicesOpen 
                          ? "bg-white text-black-deep shadow-[0_4px_20px_rgba(0,0,0,0.08)] scale-102" 
                          : "text-black-deep/70 hover:text-black-deep hover:bg-white/60"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180 text-primary' : 'text-dark/40'}`} />
                    </button>
                    
                    {/* Mega-menu (Improved UI/UX) */}
                    <div className={`absolute top-[140%] left-1/2 -translate-x-1/2 w-[900px] bg-white border border-black/5 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.12)] p-12 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-50 ${
                      isServicesOpen 
                        ? "opacity-100 visible translate-y-0" 
                        : "opacity-0 invisible translate-y-8"
                    }`}>
                      <div className="grid grid-cols-3 gap-12 relative">
                        
                        {/* Column 1: Creative & Branding */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 px-2 mb-8">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                              <Sparkles className="w-5 h-5" />
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black-deep">Branding Élite</h3>
                          </div>
                          <div className="flex flex-col gap-2">
                            {[
                              { title: "Identité Visuelle", desc: "Logos et chartes graphiques de luxe." },
                              { title: "Direction Artistique", desc: "Vision créative pour marques d'élite." },
                              { title: "Motion Design", desc: "Animations cinétiques 2D/3D.", isNew: true },
                              { title: "Concept Créatif", desc: "Idéation et storytelling de marque." }
                            ].map((s, idx) => (
                              <a key={idx} href="#expertises" className="group/item p-4 rounded-2xl hover:bg-bg-alt/80 transition-all flex flex-col">
                                <span className="text-[14px] font-bold text-black-deep group-hover/item:text-primary transition-colors flex items-center gap-2">
                                  {s.title}
                                  {s.isNew && <span className="px-1.5 py-0.5 bg-primary text-[8px] text-black font-black rounded text-[8px] uppercase tracking-tighter">New</span>}
                                </span>
                                <span className="text-[11px] text-dark/40 font-medium mt-1 leading-tight">{s.desc}</span>
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Column 2: Web & Mobile */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 px-2 mb-8">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600">
                              <Monitor className="w-5 h-5" />
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black-deep">Web & Tech</h3>
                          </div>
                          <div className="flex flex-col gap-2">
                            {[
                              { title: "Web Design Experientiel", desc: "Interfaces immersives et interactives." },
                              { title: "Développement Next.js", desc: "Performance et SEO à l'état pur." },
                              { title: "E-Commerce de Luxe", desc: "Boutiques en ligne optimisées." },
                              { title: "Maintenance & Évolution", desc: "Support technique haute réactivité." }
                            ].map((s, idx) => (
                              <a key={idx} href="#expertises" className="group/item p-4 rounded-2xl hover:bg-bg-alt/80 transition-all flex flex-col">
                                <span className="text-[14px] font-bold text-black-deep group-hover/item:text-primary transition-colors">{s.title}</span>
                                <span className="text-[11px] text-dark/40 font-medium mt-1 leading-tight">{s.desc}</span>
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Column 3: AI & Strategy */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 px-2 mb-8">
                            <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-600">
                              <Zap className="w-5 h-5" />
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black-deep">IA & Stratégie</h3>
                          </div>
                          <div className="flex flex-col gap-2">
                            {[
                              { title: "Consulting IA", desc: "Audit de vos processus métier." },
                              { title: "Agent IA & Chatbots", desc: "Automatisation de la relation client." },
                              { title: "Création Générative", desc: "Assets visuels produits par IA." },
                              { title: "Stratégie Digitale", desc: "Plan de croissance sur-mesure." }
                            ].map((s, idx) => (
                              <a key={idx} href="#expertises" className="group/item p-4 rounded-2xl hover:bg-bg-alt/80 transition-all flex flex-col">
                                <span className="text-[14px] font-bold text-black-deep group-hover/item:text-primary transition-colors">{s.title}</span>
                                <span className="text-[11px] text-dark/40 font-medium mt-1 leading-tight">{s.desc}</span>
                              </a>
                            ))}
                          </div>
                        </div>

                      </div>
                      
                      {/* Mega Menu Footer */}
                      <div className="mt-12 pt-8 border-t border-black/5 flex items-center justify-between px-4">
                        <div className="flex items-center gap-4">
                          <div className="flex -space-x-2">
                             {[1,2,3].map(i => (
                               <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-bg-alt overflow-hidden">
                                 <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="Expert" className="w-full h-full object-cover grayscale" />
                               </div>
                             ))}
                          </div>
                          <span className="text-[11px] text-dark/60 font-medium italic">Rejoignez plus de 50 entreprises qui nous font confiance.</span>
                        </div>
                        <a href="#cta-contact" className="group flex items-center gap-3 bg-black text-white px-7 py-3 rounded-full text-xs font-bold hover:bg-primary hover:text-black transition-all duration-500">
                          <span>Discuter du projet</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[13px] font-sans font-medium text-black-deep/80 hover:text-black-deep hover:bg-white/80 px-4 py-1.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-secondary/50"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone Droite : CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#cta-contact"
              style={{ x: headerBtnX, y: headerBtnY }}
              onMouseMove={handleHeaderBtnMove}
              onMouseLeave={handleHeaderBtnReset}
              className={`hidden md:inline-flex items-center justify-center font-sans font-bold tracking-tight rounded-full transition-all duration-300 active:scale-95 group relative overflow-hidden shadow-sm ${
                isScrolled 
                  ? "px-5 py-1.5 bg-black-deep text-white text-[11px]" 
                  : "px-6 py-2 bg-black-deep text-white text-[13px]"
              }`}
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-110 block">Lancer le projet</span>
              <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden z-50 p-3.5 transition-all duration-500 rounded-full flex flex-col justify-center items-center gap-1.5 w-11 h-11 relative overflow-hidden backdrop-blur-md border ${
                isOpen 
                  ? "bg-white/[0.04] border-primary/40 text-primary shadow-[0_0_15px_rgba(8,193,220,0.15)]" 
                  : "bg-black/[0.04] border-black/5 text-black-deep hover:bg-black/[0.08]"
              }`}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`w-5 h-0.5 rounded-full transition-colors duration-500 ${isOpen ? 'bg-primary' : 'bg-black-deep'}`}
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={`w-5 h-0.5 rounded-full transition-colors duration-500 ${isOpen ? 'bg-primary' : 'bg-black-deep'}`}
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`w-5 h-0.5 rounded-full transition-colors duration-500 ${isOpen ? 'bg-primary' : 'bg-black-deep'}`}
              />
            </button>
          </div>
        </div>
      </div>
    </header>

      {/* Menu mobile (Fullscreen Overlay) Sibling to escape transformed containing block */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            className="fixed inset-0 bg-[#0B0B0B]/98 backdrop-blur-3xl z-60 md:hidden flex flex-col pt-32 px-6 pb-8"
          >
            {/* Glowing Effects in Background */}
            <motion.div 
              animate={{
                x: [0, 20, -15, 0],
                y: [0, -30, 15, 0],
                scale: [1, 1.1, 0.95, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-[15%] right-[-10%] w-[260px] h-[260px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" 
            />
            <motion.div 
              animate={{
                x: [0, -20, 15, 0],
                y: [0, 30, -15, 0],
                scale: [1, 0.95, 1.1, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-[15%] left-[-15%] w-[300px] h-[300px] rounded-full bg-secondary/10 blur-[90px] pointer-events-none" 
            />
            
            {/* Noise overlay */}
            <div
              className="absolute inset-0 z-[1] pointer-events-none opacity-[0.015]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                backgroundSize: "128px 128px",
              }}
            />

            <div className="relative z-10 h-full flex flex-col overflow-y-auto px-2">
              <motion.nav 
                variants={navContainerVariants}
                className="flex flex-col space-y-3"
              >
                {menuItems.map((item, idx) => {
                  if (item.hasDropdown) {
                    return (
                      <motion.div 
                        variants={navItemVariants} 
                        key={item.label} 
                        className="flex flex-col"
                      >
                        <div className="overflow-hidden flex items-center justify-between py-2 border-b border-white/5">
                          <button
                            onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                            className={`text-3xl font-heading font-bold text-left w-full flex items-center justify-between transition-colors duration-300 ${
                              isMobileServicesOpen ? "text-primary" : "text-white"
                            }`}
                          >
                            <span className="flex items-baseline">
                              <span className="font-mono text-xs text-primary/60 mr-4">0{idx + 1}</span>
                              <span>{item.label}</span>
                            </span>
                            <ChevronDown className={`w-6 h-6 transition-transform duration-500 ${isMobileServicesOpen ? "rotate-180 text-primary" : "text-white/40"}`} />
                          </button>
                        </div>

                        {/* Accordion content */}
                        <motion.div
                          initial={false}
                          animate={isMobileServicesOpen ? { height: "auto", opacity: 1, marginTop: 16 } : { height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                          className="overflow-hidden pl-2 flex flex-col gap-4"
                        >
                          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex flex-col gap-5 backdrop-blur-md">
                            {/* Branding */}
                            <div className="space-y-2.5">
                              <div className="flex items-center gap-2 text-primary">
                                <Sparkles className="w-4 h-4" />
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] font-heading">Branding Élite</h4>
                              </div>
                              <div className="flex flex-col gap-2 pl-6 border-l border-white/10">
                                {[
                                  { label: "Identité Visuelle", href: "#expertises" },
                                  { label: "Direction Artistique", href: "#expertises" },
                                  { label: "Motion Design", href: "#expertises" }
                                ].map((sub, sIdx) => (
                                  <a
                                    key={sIdx}
                                    href={sub.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-[13px] text-white/60 hover:text-white transition-colors flex items-center gap-2 group/sublink"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover/sublink:bg-primary transition-colors" />
                                    <span>{sub.label}</span>
                                  </a>
                                ))}
                              </div>
                            </div>

                            {/* Web & Tech */}
                            <div className="space-y-2.5">
                              <div className="flex items-center gap-2 text-primary">
                                <Monitor className="w-4 h-4" />
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] font-heading">Web & Tech</h4>
                              </div>
                              <div className="flex flex-col gap-2 pl-6 border-l border-white/10">
                                {[
                                  { label: "Web Design Expérientiel", href: "#expertises" },
                                  { label: "Développement Next.js", href: "#expertises" },
                                  { label: "E-Commerce de Luxe", href: "#expertises" }
                                ].map((sub, sIdx) => (
                                  <a
                                    key={sIdx}
                                    href={sub.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-[13px] text-white/60 hover:text-white transition-colors flex items-center gap-2 group/sublink"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover/sublink:bg-primary transition-colors" />
                                    <span>{sub.label}</span>
                                  </a>
                                ))}
                              </div>
                            </div>

                            {/* IA & Stratégie */}
                            <div className="space-y-2.5">
                              <div className="flex items-center gap-2 text-primary">
                                <Zap className="w-4 h-4" />
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] font-heading">IA & Stratégie</h4>
                              </div>
                              <div className="flex flex-col gap-2 pl-6 border-l border-white/10">
                                {[
                                  { label: "Consulting IA", href: "#expertises" },
                                  { label: "Agent IA & Chatbots", href: "#expertises" },
                                  { label: "Stratégie Digitale", href: "#expertises" }
                                ].map((sub, sIdx) => (
                                  <a
                                    key={sIdx}
                                    href={sub.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-[13px] text-white/60 hover:text-white transition-colors flex items-center gap-2 group/sublink"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover/sublink:bg-primary transition-colors" />
                                    <span>{sub.label}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div 
                      variants={navItemVariants}
                      key={item.label} 
                      className="overflow-hidden border-b border-white/5 py-2 group/menu-link"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-3xl font-heading font-bold text-white hover:text-primary transition-all duration-300 block relative py-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex items-baseline">
                            <span className="font-mono text-xs text-primary/60 mr-4 group-hover/menu-link:text-primary transition-colors">0{idx + 1}</span>
                            <span>{item.label}</span>
                          </span>
                          <ArrowRight className="w-5 h-5 text-primary opacity-0 -translate-x-4 group-hover/menu-link:opacity-100 group-hover/menu-link:translate-x-0 transition-all duration-300" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              <motion.div 
                variants={navItemVariants}
                className="mt-auto pt-8 border-t border-white/5"
              >
                <p className="text-white/40 text-xs font-sans mb-6">Prêt à transformer votre vision en réalité augmentée ?</p>
                
                <a
                  href="#cta-contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-flex items-center justify-between p-5 bg-white text-black-deep rounded-[1.5rem] group hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden"
                >
                  <span className="text-xs font-heading font-bold uppercase tracking-[0.25em] pl-2 z-10">Nous contacter</span>
                  <div className="bg-primary p-3.5 rounded-full group-hover:rotate-45 transition-transform duration-500 z-10">
                    <ArrowRight className="w-4 h-4 text-black-deep" />
                  </div>
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <div className="flex items-center justify-between mt-8 px-2">
                  <span className="font-mono text-[9px] tracking-widest text-white/20 uppercase">AIA LAB © {new Date().getFullYear()}</span>
                  <div className="flex gap-2.5">
                    {[
                      { label: "LinkedIn", href: "https://linkedin.com" },
                      { label: "Instagram", href: "https://instagram.com" },
                      { label: "Dribbble", href: "https://dribbble.com" }
                    ].map((s, idx) => (
                      <a
                        key={idx}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] tracking-wider text-white/40 hover:text-primary transition-colors duration-300 border border-white/10 px-2.5 py-1 rounded-full bg-white/[0.02]"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

