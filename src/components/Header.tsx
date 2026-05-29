"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Sparkles, 
  Monitor, 
  ArrowRight,
  PenTool,
  Printer,
  Megaphone,
  ArrowUpRight,
  Zap
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
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

  // Close all menus on Escape keydown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsServicesOpen(false);
        setIsMobileServicesOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Framer Motion Variants for mobile menu (sliding from the right)
  const overlayVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const
      }
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as const
      }
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] border-b transition-colors duration-500 ${
          isOpen
            ? "bg-transparent border-transparent"
            : isScrolled 
              ? "bg-[#FAFAFA]/80 backdrop-blur-md border-black/[0.03] shadow-[0_8px_30px_rgba(0,0,0,0.02)] md:bg-[#FAFAFA]/15" 
              : "bg-[#FAFAFA]/60 backdrop-blur-md border-black/[0.04] md:bg-transparent md:border-transparent md:backdrop-blur-none"
        } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-14 md:h-16 flex items-center justify-between">
          {/* Zone Gauche : Logo */}
          <Link 
            href="/" 
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              setIsOpen(false);
              setIsServicesOpen(false);
            }}
            className="flex items-center gap-3 transition-transform duration-300 hover:scale-105 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg p-1"
          >
            <Image
              src="/images/AIALAB-secondary-logo.png"
              alt="AIA LAB Logo"
              width={110}
              height={32}
              className="transition-all duration-500 object-contain h-7 md:h-8"
              priority
            />
          </Link>

          {/* Zone Centre : Navigation Style "Left Coast" */}
          <nav className="hidden md:flex items-center gap-6 relative">
            {menuItems.map((item) => {
              const isActive = item.href === "/" 
                ? pathname === "/" 
                : item.href.startsWith("#")
                  ? false
                  : pathname.startsWith(item.href);

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
                      className={`text-[14.5px] font-sans font-semibold px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${
                        isServicesOpen 
                          ? "bg-black/5 text-black-deep" 
                          : "text-black-deep/70 hover:text-black-deep hover:bg-black/5"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180 text-primary' : 'text-dark/40'}`} />
                    </button>
                    
                    {/* Mega-menu (Exact Lesse Studio Dark Grid Aesthetic - AIA LAB Expertises) */}
                    <div 
                      style={{ width: "860px" }}
                      className={`absolute top-[140%] left-1/2 -translate-x-1/2 bg-[#0A0A0A]/90 backdrop-blur-2xl border border-white/[0.08] rounded-[2rem] shadow-[0_50px_100px_rgba(0,0,0,0.85)] p-6 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-50 ${
                        isServicesOpen 
                          ? "opacity-100 visible translate-y-0 animate-in fade-in slide-in-from-top-4 duration-300" 
                          : "opacity-0 invisible translate-y-8 pointer-events-none"
                      }`}
                    >
                      <div className="grid grid-cols-3 gap-4 relative">
                        {/* Card 1: Branding & Identité */}
                        <a 
                          href="#expertises" 
                          onClick={() => setIsServicesOpen(false)}
                          className="service-card group/card relative p-5 rounded-[1.5rem] bg-[#121212]/35 border border-white/[0.05] hover:bg-[#161616]/50 hover:border-white/15 transition-all duration-500 overflow-hidden flex flex-col justify-between h-[175px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                        >
                          <div className="flex items-center justify-between w-full relative z-10">
                            <Sparkles className="w-5 h-5 text-white/40 group-hover/card:text-primary transition-colors duration-300" />
                            <span className="text-white/30 text-[9px] tracking-wider font-mono uppercase">/6 services</span>
                          </div>
                          <div className="flex flex-col relative z-10">
                            <span className="text-[13px] font-sans font-semibold text-white/95 group-hover/card:text-white transition-colors">Brand Strategy & Identity</span>
                            <span className="text-[10px] font-sans text-white/40 mt-1 max-w-[70%] group-hover/card:text-white/60 transition-colors">Branding & Direction Artistique</span>
                          </div>
                          
                          {/* Hover Vignette Image */}
                          <div className="service-card-vignette">
                            <Image
                              src="/images/services/Branding & Identité visuelle.webp"
                              alt="Brand Strategy & Identity"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </a>

                        {/* Card 2: Design Graphique & Digital */}
                        <a 
                          href="#expertises" 
                          onClick={() => setIsServicesOpen(false)}
                          className="service-card group/card relative p-5 rounded-[1.5rem] bg-[#121212]/35 border border-white/[0.05] hover:bg-[#161616]/50 hover:border-white/15 transition-all duration-500 overflow-hidden flex flex-col justify-between h-[175px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                        >
                          <div className="flex items-center justify-between w-full relative z-10">
                            <PenTool className="w-5 h-5 text-white/40 group-hover/card:text-primary transition-colors duration-300" />
                            <span className="text-white/30 text-[9px] tracking-wider font-mono uppercase">/3 services</span>
                          </div>
                          <div className="flex flex-col relative z-10">
                            <span className="text-[13px] font-sans font-semibold text-white/95 group-hover/card:text-white transition-colors">Visual Content & Design</span>
                            <span className="text-[10px] font-sans text-white/40 mt-1 max-w-[70%] group-hover/card:text-white/60 transition-colors">Design Graphique & Contenus</span>
                          </div>
                          
                          {/* Hover Vignette Image */}
                          <div className="service-card-vignette">
                            <Image
                              src="/images/services/Design Graphique & Digital.webp"
                              alt="Visual Content & Design"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </a>

                        {/* Card 3: Print & Tangible Solutions */}
                        <a 
                          href="#expertises" 
                          onClick={() => setIsServicesOpen(false)}
                          className="service-card group/card relative p-5 rounded-[1.5rem] bg-[#121212]/35 border border-white/[0.05] hover:bg-[#161616]/50 hover:border-white/15 transition-all duration-500 overflow-hidden flex flex-col justify-between h-[175px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                        >
                          <div className="flex items-center justify-between w-full relative z-10">
                            <Printer className="w-5 h-5 text-white/40 group-hover/card:text-primary transition-colors duration-300" />
                            <span className="text-white/30 text-[9px] tracking-wider font-mono uppercase">/4 services</span>
                          </div>
                          <div className="flex flex-col relative z-10">
                            <span className="text-[13px] font-sans font-semibold text-white/95 group-hover/card:text-white transition-colors">Print & Tangible Solutions</span>
                            <span className="text-[10px] font-sans text-white/40 mt-1 max-w-[70%] group-hover/card:text-white/60 transition-colors">Impressions & Supports Physiques</span>
                          </div>
                          
                          {/* Hover Vignette Image */}
                          <div className="service-card-vignette">
                            <Image
                              src="/images/services/print &i impressio.webp"
                              alt="Print & Tangible Solutions"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </a>

                        {/* Card 4: Web Development & Tech */}
                        <a 
                          href="#expertises" 
                          onClick={() => setIsServicesOpen(false)}
                          className="service-card group/card relative p-5 rounded-[1.5rem] bg-[#121212]/35 border border-white/[0.05] hover:bg-[#161616]/50 hover:border-white/15 transition-all duration-500 overflow-hidden flex flex-col justify-between h-[175px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                        >
                          <div className="flex items-center justify-between w-full relative z-10">
                            <Monitor className="w-5 h-5 text-white/40 group-hover/card:text-primary transition-colors duration-300" />
                            <span className="text-white/30 text-[9px] tracking-wider font-mono uppercase">/7 services</span>
                          </div>
                          <div className="flex flex-col relative z-10">
                            <span className="text-[13px] font-sans font-semibold text-white/95 group-hover/card:text-white transition-colors">Web Development & Tech</span>
                            <span className="text-[10px] font-sans text-white/40 mt-1 max-w-[70%] group-hover/card:text-white/60 transition-colors">Web Design Expérientiel & Next.js</span>
                          </div>
                          
                          {/* Hover Vignette Image */}
                          <div className="service-card-vignette">
                            <Image
                              src="/images/services/web design & developpement.webp"
                              alt="Web Development & Tech"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </a>

                        {/* Card 5: Digital Growth & Marketing */}
                        <a 
                          href="#expertises" 
                          onClick={() => setIsServicesOpen(false)}
                          className="service-card group/card relative p-5 rounded-[1.5rem] bg-[#121212]/35 border border-white/[0.05] hover:bg-[#161616]/50 hover:border-white/15 transition-all duration-500 overflow-hidden flex flex-col justify-between h-[175px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                        >
                          <div className="flex items-center justify-between w-full relative z-10">
                            <Megaphone className="w-5 h-5 text-white/40 group-hover/card:text-primary transition-colors duration-300" />
                            <span className="text-white/30 text-[9px] tracking-wider font-mono uppercase">/5 services</span>
                          </div>
                          <div className="flex flex-col relative z-10">
                            <span className="text-[13px] font-sans font-semibold text-white/95 group-hover/card:text-white transition-colors">Digital Growth & Marketing</span>
                            <span className="text-[10px] font-sans text-white/40 mt-1 max-w-[70%] group-hover/card:text-white/60 transition-colors">Marketing Digital & SEO</span>
                          </div>
                          
                          {/* Hover Vignette Image */}
                          <div className="service-card-vignette">
                            <Image
                              src="/images/services/marketing didgital.webp"
                              alt="Digital Growth & Marketing"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </a>

                        {/* Card 6: CTA Card (Premium Contrast White Glass Accent) */}
                        <a 
                          href="#cta-contact" 
                          onClick={() => setIsServicesOpen(false)}
                          className="group/card relative p-5 rounded-[1.5rem] bg-white text-black hover:bg-white/90 transition-all duration-500 overflow-hidden flex flex-col justify-between h-[175px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_40px_rgba(255,255,255,0.06)]"
                        >
                          <div className="flex items-center justify-between w-full relative z-10">
                            <ArrowUpRight className="w-5 h-5 text-black/60 group-hover/card:text-primary group-hover/card:rotate-45 transition-all duration-300" />
                            <span className="text-black/40 text-[9px] tracking-widest font-mono uppercase">/contact</span>
                          </div>
                          <div className="flex flex-col relative z-10">
                            <span className="text-[13px] font-sans font-bold text-black">Démarrer un projet</span>
                            <span className="text-[10px] font-sans text-black/60 mt-1 max-w-[80%]">Discutons de vos objectifs & de votre vision</span>
                          </div>
                          
                          {/* Soft background light sweep effect */}
                          <div className="absolute -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/40 opacity-40 group-hover/card:animate-shine" />
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
                  className={`text-[14.5px] font-sans font-semibold px-4 py-2 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-secondary/50 relative ${
                    isActive 
                      ? "text-black-deep" 
                      : "text-black-deep/70 hover:text-black-deep hover:bg-black/5"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-black/[0.04] rounded-full z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone Droite : CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <motion.a
              href="#cta-contact"
              style={{ x: headerBtnX, y: headerBtnY }}
              onMouseMove={handleHeaderBtnMove}
              onMouseLeave={handleHeaderBtnReset}
              className={`hidden md:inline-flex items-center justify-center font-sans font-bold tracking-tight rounded-full transition-all duration-300 active:scale-95 group relative overflow-hidden shadow-sm ${
                isScrolled 
                  ? "px-5 py-2.5 bg-black-deep text-white text-[12px]" 
                  : "px-6 py-3 bg-black-deep text-white text-[13px]"
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
      </header>
      {/* Click-outside backdrop overlay to close Mega-menu instantly when clicking anywhere else */}
      <AnimatePresence>
        {isServicesOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/[0.03] backdrop-blur-[2px] hidden md:block"
            onClick={() => setIsServicesOpen(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
        {isOpen && (
          <motion.div
            key="mobile-menu-drawer"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            className="fixed right-0 top-0 w-full xs:w-[85vw] sm:w-[60vw] md:w-[45vw] h-screen bg-black-deep/80 backdrop-blur-[24px] border-l border-white/10 z-60 md:hidden flex flex-col pt-24 px-6 sm:px-12 pb-8 shadow-[-10px_0_50px_rgba(0,0,0,0.3)] overflow-hidden"
          >
            {/* Glowing blobs inside drawer background */}
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
              <motion.div
                animate={{
                  x: [0, 40, -20, 0],
                  y: [0, -50, 30, 0],
                  scale: [1, 1.2, 0.9, 1],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-[10%] -right-[20%] w-[250px] h-[250px] rounded-full bg-primary/20 blur-[80px]"
              />
              <motion.div
                animate={{
                  x: [0, -30, 20, 0],
                  y: [0, 40, -30, 0],
                  scale: [1, 0.9, 1.15, 1],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute -bottom-[10%] -left-[20%] w-[300px] h-[300px] rounded-full bg-secondary/15 blur-[90px]"
              />
            </div>

            {/* Noise overlay */}
            <div
              className="absolute inset-0 z-[1] pointer-events-none opacity-[0.01]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                backgroundSize: "128px 128px",
              }}
            />

            <div className="relative z-10 h-full flex flex-col overflow-y-auto px-2 no-scrollbar">
              <motion.nav 
                variants={navContainerVariants}
                className="flex flex-col space-y-4"
              >
                {menuItems.map((item, idx) => {
                  if (item.hasDropdown) {
                    const mobileServices = [
                      {
                        title: "Brand Strategy & Identity",
                        sub: "Branding & Direction Artistique",
                        count: "/6 services",
                        icon: Sparkles,
                        image: "/images/services/Branding & Identité visuelle.webp",
                        href: "#expertises"
                      },
                      {
                        title: "Visual Content & Design",
                        sub: "Design Graphique & Contenus",
                        count: "/3 services",
                        icon: PenTool,
                        image: "/images/services/Design Graphique & Digital.webp",
                        href: "#expertises"
                      },
                      {
                        title: "Print & Tangible Solutions",
                        sub: "Print & Supports",
                        count: "/4 services",
                        icon: Printer,
                        image: "/images/services/print &i impressio.webp",
                        href: "#expertises"
                      },
                      {
                        title: "Web Development & Tech",
                        sub: "Web Design Expérientiel & Next.js",
                        count: "/7 services",
                        icon: Monitor,
                        image: "/images/services/web design & developpement.webp",
                        href: "#expertises"
                      },
                      {
                        title: "Digital Growth & Marketing",
                        sub: "Marketing Digital & SEO",
                        count: "/5 services",
                        icon: Megaphone,
                        image: "/images/services/marketing didgital.webp",
                        href: "#expertises"
                      }
                    ];

                    return (
                      <motion.div 
                        variants={navItemVariants} 
                        key={item.label} 
                        className="flex flex-col"
                      >
                        <div className="overflow-hidden flex items-center justify-between py-2 border-b border-white/[0.08]">
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
                            <ChevronDown className={`w-6 h-6 transition-transform duration-500 ${isMobileServicesOpen ? "rotate-180 text-primary" : "text-white/30"}`} />
                          </button>
                        </div>

                        {/* Accordion content */}
                        <motion.div
                           initial={false}
                           animate={isMobileServicesOpen ? { height: "auto", opacity: 1, marginTop: 16 } : { height: 0, opacity: 0, marginTop: 0 }}
                           transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                           className="overflow-hidden pl-1 pr-1 flex flex-col gap-3"
                        >
                          {mobileServices.map((service, sIdx) => {
                            const IconComponent = service.icon;
                            return (
                              <a
                                key={sIdx}
                                href={service.href}
                                onClick={() => setIsOpen(false)}
                                className="group/card relative p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-primary/20 transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[110px]"
                              >
                                {/* Glass card background vignette image */}
                                <div className="absolute inset-0 z-0 opacity-10 group-hover/card:opacity-20 transition-opacity duration-300">
                                  <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>

                                <div className="flex items-center justify-between w-full relative z-10">
                                  <IconComponent className="w-5 h-5 text-white/50 group-hover/card:text-primary transition-colors duration-300" />
                                  <span className="text-white/40 text-[9px] tracking-wider font-mono uppercase">{service.count}</span>
                                </div>

                                <div className="flex flex-col mt-4 relative z-10">
                                  <span className="text-[14px] font-heading font-bold text-white group-hover/card:text-primary transition-colors">{service.title}</span>
                                  <span className="text-[10px] font-sans text-white/45 mt-0.5">{service.sub}</span>
                                </div>
                              </a>
                            );
                          })}

                          {/* White contrast CTA card on mobile services menu */}
                          <a
                            href="#cta-contact"
                            onClick={() => setIsOpen(false)}
                            className="group/card relative p-4 rounded-2xl bg-white text-black hover:bg-white/90 transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[110px]"
                          >
                            <div className="flex items-center justify-between w-full relative z-10">
                              <ArrowUpRight className="w-5 h-5 text-black/60 group-hover/card:text-primary group-hover/card:rotate-45 transition-all duration-300" />
                              <span className="text-black/40 text-[9px] tracking-widest font-mono uppercase">/contact</span>
                            </div>

                            <div className="flex flex-col mt-4 relative z-10">
                              <span className="text-[14px] font-heading font-black text-black">Démarrer un projet</span>
                              <span className="text-[10px] font-sans text-black/60 mt-0.5">Discutons de vos objectifs & de votre vision</span>
                            </div>

                            {/* Shine effect */}
                            <div className="absolute -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/40 opacity-40 group-hover/card:animate-shine" />
                          </a>
                        </motion.div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div 
                      variants={navItemVariants}
                      key={item.label} 
                      className="overflow-hidden border-b border-white/[0.08] py-2 group/menu-link"
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
                className="mt-auto pt-8 border-t border-white/[0.08]"
              >
                <p className="text-white/50 text-xs font-sans mb-6">Prêt à transformer votre vision en réalité augmentée ?</p>
                
                <a
                  href="#cta-contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-flex items-center justify-between p-5 bg-primary text-black-deep rounded-[1.5rem] group hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden"
                >
                  <span className="text-xs font-heading font-bold uppercase tracking-[0.25em] pl-2 z-10">Nous contacter</span>
                  <div className="bg-black-deep p-3.5 rounded-full group-hover:rotate-45 transition-transform duration-500 z-10">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-8 px-2">
                  <span className="font-mono text-[9px] tracking-widest text-white/30 uppercase">AIA LAB © {new Date().getFullYear()}</span>
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
                        className="font-mono text-[10px] tracking-wider text-white/50 hover:text-primary transition-colors duration-300 border border-white/[0.12] px-2.5 py-1 rounded-full bg-white/[0.02]"
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
