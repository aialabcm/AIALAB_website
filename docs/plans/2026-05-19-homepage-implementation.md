# Plan d'Implémentation : Page d'Accueil AIA LAB (V3 - Version de Qualité & Finition)

**Objectif :** Créer individuellement les composants de la page d'accueil d'AIA LAB, ordonner les sections (Expertises et Chiffres avant Portfolio) et intégrer un composant d'appel à l'action (CTA) dédié. Cette version intègre les améliorations de micro-copywriting, de transitions visuelles (Le Flow), de dégradation gracieuse pour les animations et de conformité d'accessibilité (WCAG AA).

**Architecture :** Découpage de chaque section en composants indépendants dans `src/components/` pour maximiser la modularité et faciliter la maintenance. Les sections sont assemblées dans l'ordre exact demandé avec des lignes de connexion de 1px.

**Technologies clés :** React, Next.js 16, Tailwind CSS v4, HTML5 Canvas.

---

### Tâche 1 : Création du Header

**Fichiers ciblés :**
- Créer : `c:\Users\User\Desktop\aialab_portfolio\rr\aia-lab-website\src\components\Header.tsx`

- [ ] **Étape 1 : Implémentation du composant Header**
Créer la barre de navigation responsive avec effet de verre dépoli.

```typescript
"use client";

import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Accueil", href: "#" },
    { label: "Expertises", href: "#expertises" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "À Propos", href: "#apropos" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-strict border-dark/10 bg-bg-main/80 backdrop-blur-md">
      <div className="max-w-container mx-auto px-10 md:px-20 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 text-xl font-heading font-bold text-black-deep tracking-tight focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
          <svg className="w-8 h-8 text-primary" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L4 26H9.5L16 13L22.5 26H28L16 2Z" fill="currentColor"/>
            <circle cx="16" cy="22" r="3" fill="currentColor"/>
          </svg>
          <span>AIA LAB</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-sans font-medium text-dark hover:text-primary transition-colors duration-200 relative group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-black-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-strict border-dark/10 bg-bg-main px-10 py-6 space-y-4">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-base font-sans font-medium text-dark hover:text-primary transition-colors py-2"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
```

---

### Tâche 2 : Création de HeroSection

**Fichiers ciblés :**
- Créer : `c:\Users\User\Desktop\aialab_portfolio\rr\aia-lab-website\src\components\HeroSection.tsx`

- [ ] **Étape 1 : Implémentation du composant HeroSection**
Créer la section d'introduction principale sans image de fond (conforme au wireframe) et avec des verbes d'action de micro-copywriting percutants.

```typescript
export default function HeroSection() {
  return (
    <section className="bg-bg-main py-20 md:py-32 border-b border-strict border-dark/10">
      <div className="max-w-container mx-auto px-10 md:px-20 text-left">
        <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-tight text-black-deep max-w-[20ch]">
          Votre entreprise mérite une image qui porte vos ambitions.
        </h1>
        <p className="font-sans text-base md:text-lg text-dark max-w-[60ch] mt-6 leading-relaxed">
          Nous transformons les idées en expériences visuelles et digitales qui marquent les esprits.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#portfolio"
            className="px-6 py-3 border border-strict border-dark text-dark font-sans font-medium hover:bg-dark hover:text-bg-main transition-all duration-300 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            Explorer l'impact
          </a>
          <a
            href="#cta-contact"
            className="px-6 py-3 bg-black-deep text-bg-main font-sans font-medium hover:bg-primary hover:text-black-deep transition-all duration-300 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            Lancer le projet
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

### Tâche 3 : Création de MarqueeTicker

**Fichiers ciblés :**
- Créer : `c:\Users\User\Desktop\aialab_portfolio\rr\aia-lab-website\src\components\MarqueeTicker.tsx`

- [ ] **Étape 1 : Implémentation du composant MarqueeTicker**
Créer la bande défilante infinie d'AIA LAB.

```typescript
export default function MarqueeTicker() {
  const items = Array(10).fill({
    text: "AIA LAB",
    tagline: "Au-delà du possible",
  });

  return (
    <div className="w-full bg-[#FAFAFA] border-b border-strict border-dark/10 py-6 overflow-hidden select-none">
      <div className="flex gap-16 items-center whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 text-sm font-mono tracking-wider text-dark/70">
            <svg className="w-5 h-5 text-primary" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L4 26H9.5L16 13L22.5 26H28L16 2Z" fill="currentColor"/>
            </svg>
            <span className="font-heading font-bold text-black-deep">{item.text}</span>
            <span className="text-xs">•</span>
            <span>{item.tagline}</span>
            <span className="text-dark/30 ml-6">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### Tâche 4 : Création de l'InteractiveCanvas

**Fichiers ciblés :**
- Créer : `c:\Users\User\Desktop\aialab_portfolio\rr\aia-lab-website\src\components\InteractiveCanvas.tsx`

- [ ] **Étape 1 : Implémentation du composant InteractiveCanvas**
Créer l'animation de particules en Canvas avec détection de performance lente et fallback immédiat en SVG statique (dégradation gracieuse).

```typescript
"use client";

import { useEffect, useRef, useState } from "react";

export default function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion first
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsLowPerformance(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas || !canvas.getContext) {
      setIsLowPerformance(true);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setIsLowPerformance(true);
      return;
    }

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Particle[] = [];
    const particleCount = Math.min(40, Math.floor((width * height) / 9000));
    const connectionDistance = 90;
    const mouse = { x: -1000, y: -1000, radius: 120 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = "#08C1DC";
        c.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(37, 158, 177, ${0.8 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isLowPerformance) {
    // Elegant SVG fallback for performance safety
    return (
      <div className="w-full h-full min-h-[300px] border border-strict border-dark/20 relative bg-bg-main overflow-hidden flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="80" r="3.5" fill="#08C1DC" />
          <circle cx="280" cy="120" r="4" fill="#08C1DC" />
          <circle cx="180" cy="220" r="3" fill="#08C1DC" />
          <circle cx="320" cy="200" r="2.5" fill="#08C1DC" />
          <line x1="100" y1="80" x2="280" y2="120" stroke="rgba(37, 158, 177, 0.4)" strokeWidth="0.75" />
          <line x1="280" y1="120" x2="180" y2="220" stroke="rgba(37, 158, 177, 0.4)" strokeWidth="0.75" />
          <line x1="180" y1="220" x2="320" y2="200" stroke="rgba(37, 158, 177, 0.4)" strokeWidth="0.75" />
          <line x1="100" y1="80" x2="180" y2="220" stroke="rgba(37, 158, 177, 0.2)" strokeWidth="0.5" strokeDasharray="3 3" />
        </svg>
        <div className="z-10 w-20 h-20 border border-strict border-dark/10 flex items-center justify-center text-dark/30 text-xs font-mono">
          AIA CORE
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[300px] border border-strict border-dark/20 relative bg-bg-main overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="w-20 h-20 border border-strict border-dark/10 flex items-center justify-center text-dark/20 text-xs font-mono">
          AIA CORE
        </div>
      </div>
    </div>
  );
}
```

---

### Tâche 5 : Création de WhyChooseUs

**Fichiers ciblés :**
- Créer : `c:\Users\User\Desktop\aialab_portfolio\rr\aia-lab-website\src\components\WhyChooseUs.tsx`

- [ ] **Étape 1 : Implémentation du composant WhyChooseUs**
Créer la section "Pourquoi nous choisir ?" contenant l'InteractiveCanvas au centre et des détails interactifs de micro-copy.

```typescript
import InteractiveCanvas from "./InteractiveCanvas";

export default function WhyChooseUs() {
  const cards = [
    {
      title: "Approche Humaine",
      desc: "Nous plaçons l'écoute et la collaboration au cœur de chaque projet pour concevoir des solutions parfaitement alignées.",
      hoverText: "Découvrir la méthode ➔",
    },
    {
      title: "Vision Stratégique",
      desc: "Vos visuels ne sont pas juste esthétiques, ils sont pensés pour atteindre des objectifs concrets de croissance.",
      hoverText: "Voir notre impact ➔",
    },
    {
      title: "Expertise Technique",
      desc: "De la conception à l'intégration, nous maîtrisons les technologies modernes pour des performances de pointe.",
      hoverText: "Explorer la stack ➔",
    },
    {
      title: "Engagement Total",
      desc: "Nous sommes un véritable partenaire créatif, impliqué à chaque étape pour garantir votre succès.",
      hoverText: "Parler à un expert ➔",
    },
  ];

  return (
    <section className="bg-bg-main py-20 border-b border-strict border-dark/10" id="why-choose-us">
      <div className="max-w-container mx-auto px-10 md:px-20">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-black-deep tracking-tight text-center mb-16">
          pourquoi nous choisir ?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Gauche : 2 cartes */}
          <div className="flex flex-col justify-between gap-8">
            {cards.slice(0, 2).map((card, idx) => (
              <div key={idx} className="group p-8 border border-strict border-dark/10 bg-bg-main relative hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <span className="text-[10px] font-mono text-primary font-semibold tracking-wider">0{idx + 1} / CONCEPT</span>
                  <h3 className="font-mono text-lg font-bold text-black-deep mt-4 mb-2">{card.title}</h3>
                  <p className="font-sans text-sm text-dark leading-relaxed">{card.desc}</p>
                </div>
                <span className="text-[10px] font-mono text-primary mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {card.hoverText}
                </span>
              </div>
            ))}
          </div>

          {/* Centre : Canvas Interactif */}
          <div className="flex items-stretch">
            <InteractiveCanvas />
          </div>

          {/* Droite : 2 cartes */}
          <div className="flex flex-col justify-between gap-8">
            {cards.slice(2, 4).map((card, idx) => (
              <div key={idx} className="group p-8 border border-strict border-dark/10 bg-bg-main relative hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <span className="text-[10px] font-mono text-primary font-semibold tracking-wider">0{idx + 3} / VALUE</span>
                  <h3 className="font-mono text-lg font-bold text-black-deep mt-4 mb-2">{card.title}</h3>
                  <p className="font-sans text-sm text-dark leading-relaxed">{card.desc}</p>
                </div>
                <span className="text-[10px] font-mono text-primary mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {card.hoverText}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Tâche 6 : Création de ExpertiseSection

**Fichiers ciblés :**
- Créer : `c:\Users\User\Desktop\aialab_portfolio\rr\aia-lab-website\src\components\ExpertiseSection.tsx`

- [ ] **Étape 1 : Implémentation du composant ExpertiseSection**
Créer la grille des expertises et intégrer les boutons avec les verbes d'action "Bâtir ma stratégie" et "Estimer le projet".

```typescript
export default function ExpertiseSection() {
  const expertises = [
    {
      title: "Identité & Design",
      sub: "Brutaliste / Architectural",
      desc: "Direction artistique, design de marque et supports visuels cohérents, pensés pour durer.",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Web & Expériences Digitales",
      sub: "UI / UX",
      desc: "Sites vitrines, landing pages et parcours produit conçus pour convertir et engager.",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Motion & Contenu",
      sub: "Storytelling visuel",
      desc: "Micro-interactions, vidéos courtes et contenus optimisés pour capter l'attention.",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Stratégie & Production",
      sub: "De l'idée au livrable",
      desc: "Sprints créatifs, plan de production et exécution rigoureuse, avec livrables clairs.",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-bg-main py-20 border-b border-strict border-dark/10" id="expertises">
      <div className="max-w-container mx-auto px-10 md:px-20">
        <div className="text-center max-w-[65ch] mx-auto mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-black-deep tracking-tight">
            Nos expertises
          </h2>
          <p className="font-sans text-sm md:text-base text-dark mt-4">
            Une approche créative, digitale et architecturale pour construire votre puissance.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="#cta-contact"
              className="px-5 py-2 border border-strict border-dark text-dark font-sans text-xs font-semibold tracking-wider hover:bg-dark hover:text-bg-main transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              Bâtir ma stratégie
            </a>
            <a
              href="#cta-contact"
              className="px-5 py-2 bg-black-deep text-bg-main font-sans text-xs font-semibold tracking-wider hover:bg-primary hover:text-black-deep transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              Estimer le projet
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {expertises.map((exp, idx) => (
            <article
              key={idx}
              className="border border-strict border-dark/10 bg-bg-main p-8 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex gap-6 items-start">
                <div className="p-3 bg-[#FAFAFA] border border-strict border-dark/10">
                  {exp.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-primary uppercase block">
                    {exp.sub}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-black-deep mt-2 mb-3">
                    {exp.title}
                  </h3>
                  <p className="font-sans text-sm text-dark leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Tâche 7 : Création de StatsSection

**Fichiers ciblés :**
- Créer : `c:\Users\User\Desktop\aialab_portfolio\rr\aia-lab-website\src\components\StatsSection.tsx`

- [ ] **Étape 1 : Implémentation du composant StatsSection**
Créer la Bento Grid asymétrique des statistiques. **Vérification WCAG** : Le texte superposé sur la couleur de fond cyan (`bg-primary`) est rendu en noir profond (`text-black-deep`) pour une lisibilité optimale et conforme aux ratios d'accessibilité.

```typescript
export default function StatsSection() {
  return (
    <section className="bg-bg-alt py-20 border-b border-strict border-dark/10" id="stats">
      <div className="max-w-container mx-auto px-10 md:px-20">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-black-deep tracking-tight text-center mb-16">
          AIA LAB en chiffres
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Stat 1 : 98% (col-span-5) */}
          <div className="md:col-span-5 border border-strict border-dark/10 bg-[#FAFAFA] p-10 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="font-heading font-bold text-7xl md:text-8xl text-black-deep tracking-tighter block leading-none">
                98%
              </span>
              <p className="font-sans text-sm text-dark mt-6 max-w-[30ch] leading-relaxed">
                De taux de recommandation et de satisfaction sur nos derniers sprints créatifs.
              </p>
            </div>
            <div className="mt-12 w-12 h-1 bg-dark/20"></div>
          </div>

          {/* Stat 2 : 500+ (col-span-7) */}
          {/* Note: background is cyan (#08C1DC), text must be black-deep (#0B0B0B) for WCAG AA contrast (ratio > 4.5:1) */}
          <div className="md:col-span-7 border border-strict border-dark/10 bg-primary p-10 flex flex-col justify-between text-black-deep hover:shadow-md transition-shadow">
            <div>
              <span className="font-heading font-bold text-7xl md:text-8xl tracking-tighter block leading-none">
                500+
              </span>
              <p className="font-sans text-sm font-semibold mt-6 max-w-[45ch] leading-relaxed text-black-deep">
                Supports de communication, applications web et éléments de marque livrés pour propulser l'image de nos clients.
              </p>
            </div>
            <div className="mt-12 w-12 h-1 bg-black-deep/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Tâche 8 : Création de PortfolioSection

**Fichiers ciblés :**
- Créer : `c:\Users\User\Desktop\aialab_portfolio\rr\aia-lab-website\src\components\PortfolioSection.tsx`

- [ ] **Étape 1 : Implémentation du composant PortfolioSection**
Créer la grille de projets avec des verbes d'action percutants : "Lancer un projet" et "Explorer nos réalisations".

```typescript
export default function PortfolioSection() {
  const projects = [
    {
      category: "Identité",
      title: "Brand System – AIA LAB",
      desc: "Direction artistique • Logo • Guidelines",
      techs: ["Figma", "Illustrator", "Brand guidelines"],
    },
    {
      category: "Digital",
      title: "Landing – Studio Créatif",
      desc: "UI/UX • Copy • Design responsive",
      techs: ["React", "Tailwind CSS", "Framer Motion"],
    },
    {
      category: "Expérience",
      title: "Portfolio – Architecture visuelle",
      desc: "Design system • Components • Motion",
      techs: ["Next.js", "TypeScript", "Tailwind"],
    },
    {
      category: "Contenu",
      title: "Campagne – Lancement produit",
      desc: "Art direction • Templates • Déclinaisons",
      techs: ["Social media", "Visual design"],
    },
    {
      category: "Produit",
      title: "Interface – Data & Story",
      desc: "Design • Dataviz • Prototype",
      techs: ["Figma", "D3.js", "Prototyping"],
    },
    {
      category: "Processo",
      title: "Design Sprint – Concept 01",
      desc: "Ateliers • Wireframes • UI finale",
      techs: ["Design thinking", "UX Research"],
    },
  ];

  return (
    <section className="bg-bg-alt py-20 border-b border-strict border-dark/10" id="portfolio">
      <div className="max-w-container mx-auto px-10 md:px-20">
        <div className="text-center max-w-[60ch] mx-auto mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-black-deep tracking-tight">
            Portfolio – Sélection
          </h2>
          <p className="font-sans text-sm md:text-base text-dark mt-4">
            Quelques projets représentatifs de notre style : structuré, audacieux, et efficace.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="#cta-contact"
              className="px-5 py-2 border border-strict border-dark text-dark font-sans text-xs font-semibold tracking-wider hover:bg-dark hover:text-bg-main transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              Lancer un projet
            </a>
            <a
              href="#portfolio"
              className="px-5 py-2 bg-black-deep text-bg-main font-sans text-xs font-semibold tracking-wider hover:bg-primary hover:text-black-deep transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              Explorer nos réalisations
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <article
              key={idx}
              className="border border-strict border-dark/10 bg-bg-main flex flex-col justify-between hover:shadow-hover-lift hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Visual Area */}
                <div className="h-64 bg-dark/5 flex items-center justify-center p-8 border-b border-strict border-dark/10 relative">
                  <span className="absolute top-4 left-4 bg-black-deep text-bg-main text-[10px] font-mono tracking-wider px-2 py-0.5">
                    {project.category}
                  </span>
                  <div className="text-center">
                    <span className="font-heading text-xs font-semibold text-dark/30 tracking-tight block mb-2">
                      VISUAL REPRESENTATION
                    </span>
                    <div className="w-16 h-0.5 bg-dark/10 mx-auto"></div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                  <h3 className="font-heading font-bold text-base text-black-deep tracking-tight">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs text-dark mt-2 leading-relaxed">
                    {project.desc}
                  </p>
                </div>
              </div>

              {/* Footer Area */}
              <div className="px-6 py-4 border-t border-strict border-dark/10 flex flex-wrap gap-1.5">
                {project.techs.map((tech, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono text-dark/65 bg-[#FAFAFA] border border-strict border-dark/5 px-2 py-0.5">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Tâche 9 : Création de ProcessSection

**Fichiers ciblés :**
- Créer : `c:\Users\User\Desktop\aialab_portfolio\rr\aia-lab-website\src\components\ProcessSection.tsx`

- [ ] **Étape 1 : Implémentation du composant ProcessSection**
Créer la chronologie des 4 étapes du projet.

```typescript
export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "BRIEF",
      sub: "Découverte & écoute",
      desc: "Ateliers, recueil d'informations et cadrage des objectifs pour aligner vos besoins et nos attentes.",
    },
    {
      num: "02",
      title: "STRATÉGIE",
      sub: "Analyse & concept",
      desc: "Recherche, benchmarking et construction du concept fort pour définir la meilleure direction visuelle.",
    },
    {
      num: "03",
      title: "PRODUCTION",
      sub: "Design & développement",
      desc: "Création visuelle, itérations rapides et production de l'ensemble des livrables selon le plan validé.",
    },
    {
      num: "04",
      title: "LIVRAISON",
      sub: "Déploiement & contrôle",
      desc: "Remise finale, vérifications, ajustements et accompagnement complet pour un lancement fluide.",
    },
  ];

  return (
    <section className="bg-bg-main py-20 border-b border-strict border-dark/10" id="processus">
      <div className="max-w-container mx-auto px-10 md:px-20">
        <div className="text-center max-w-[60ch] mx-auto mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-black-deep tracking-tight">
            Le Processus Métier
          </h2>
          <p className="font-sans text-xs font-semibold tracking-widest text-primary uppercase mt-2">
            Étape par étape
          </p>
          <p className="font-sans text-sm text-dark mt-4">
            Un workflow clair, structuré et suivi du brief à la livraison.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <article
              key={idx}
              className="border border-strict border-dark/10 bg-bg-main p-8 relative flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <span className="font-heading font-bold text-5xl text-dark/10 block mb-6 leading-none">
                  {step.num}
                </span>
                <span className="text-[10px] font-mono font-semibold tracking-wider text-primary uppercase">
                  {step.sub}
                </span>
                <h3 className="font-heading font-bold text-lg text-black-deep mt-2 mb-4">
                  {step.title}
                </h3>
                <p className="font-sans text-xs text-dark leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Tâche 10 : Création de TestimonialsSection

**Fichiers ciblés :**
- Créer : `c:\Users\User\Desktop\aialab_portfolio\rr\aia-lab-website\src\components\TestimonialsSection.tsx`

- [ ] **Étape 1 : Implémentation du composant TestimonialsSection**
Créer la grille de témoignages avec les verbes d'action "Explorer l'impact" et "Démarrer une collaboration".

```typescript
export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Camille R.",
      role: "Responsable Marketing",
      text: "Une direction artistique forte et une exécution très structurée. Le résultat dépasse nos attentes initiales.",
    },
    {
      name: "Nassim K.",
      role: "Fondateur SaaS",
      text: "Le site convertit beaucoup mieux. Les choix UI/UX sont clairs, modernes et extrêmement efficaces.",
    },
    {
      name: "Sarah L.",
      role: "Directrice Générale",
      text: "On a gagné un temps précieux : processus carré, livrables nets et une communication fluide à chaque étape.",
    },
    {
      name: "Hugo M.",
      role: "Directeur de Création",
      text: "Style brutaliste/architectural parfaitement maîtrisé. Notre marque a pris une dimension unique.",
    },
  ];

  return (
    <section className="bg-bg-main py-20 border-b border-strict border-dark/10" id="temoignages">
      <div className="max-w-container mx-auto px-10 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-black-deep tracking-tight leading-tight">
              Ce que nos clients disent
            </h2>
            <p className="font-sans text-sm text-dark mt-4 leading-relaxed max-w-[45ch]">
              Des retours concrets sur le design, la clarté du processus et l'impact produit.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#portfolio"
                className="px-5 py-2.5 border border-strict border-dark text-dark font-sans text-xs font-semibold tracking-wider hover:bg-dark hover:text-bg-main transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                Explorer l'impact
              </a>
              <a
                href="#cta-contact"
                className="px-5 py-2.5 bg-black-deep text-bg-main font-sans text-xs font-semibold tracking-wider hover:bg-primary hover:text-black-deep transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                Démarrer une collaboration
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="border border-strict border-dark/10 bg-[#FAFAFA] p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
              >
                <div>
                  <div className="flex gap-1 mb-4 text-primary">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                  </div>
                  <p className="font-sans text-xs text-dark italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-strict border-dark/5">
                  <span className="font-heading font-bold text-xs text-black-deep block">
                    {t.name}
                  </span>
                  <span className="text-[10px] font-mono text-dark/60">
                    {t.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Tâche 11 : Création de ContactCTA

**Fichiers ciblés :**
- Créer : `c:\Users\User\Desktop\aialab_portfolio\rr\aia-lab-website\src\components\ContactCTA.tsx`

- [ ] **Étape 1 : Implémentation du composant ContactCTA**
Créer la section d'appel à l'action dédiée à la prise de contact avec les actions de micro-copy : "Discuter du projet" et "Envoyer un brief".

```typescript
export default function ContactCTA() {
  return (
    <section className="bg-[#FAFAFA] py-20 border-b border-strict border-dark/10" id="cta-contact">
      <div className="max-w-container mx-auto px-10 md:px-20 text-center flex flex-col items-center">
        <span className="text-[10px] font-mono font-semibold tracking-widest text-primary uppercase mb-4">
          Nous rejoindre
        </span>
        <h2 className="font-heading font-bold text-3xl md:text-5xl text-black-deep tracking-tight max-w-[30ch] leading-tight">
          Parce qu'ils recherchent plus qu'une agence.
        </h2>
        <p className="font-sans text-sm md:text-base text-dark mt-6 max-w-[60ch] leading-relaxed">
          Ils veulent un partenaire créatif capable d'écouter, de comprendre et de transformer leurs idées en projets concrets. Au-delà du possible.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="mailto:contact@aialab.com?subject=Discussion%20Projet"
            className="px-6 py-3 bg-black-deep text-bg-main font-sans font-medium hover:bg-primary hover:text-black-deep transition-all duration-300 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            Discuter du projet
          </a>
          <a
            href="mailto:contact@aialab.com?subject=Brief%20Projet"
            className="px-6 py-3 border border-strict border-dark text-dark font-sans font-medium hover:bg-dark hover:text-bg-main transition-all duration-300 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            Envoyer un brief
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

### Tâche 12 : Création du Footer

**Fichiers ciblés :**
- Créer : `c:\Users\User\Desktop\aialab_portfolio\rr\aia-lab-website\src\components\Footer.tsx`

- [ ] **Étape 1 : Implémentation du composant Footer**
Créer le pied de page reprenant les informations de contact d'AIA LAB.

```typescript
export default function Footer() {
  return (
    <footer className="bg-black-deep text-[#FAFAFA] py-16 border-t border-strict border-dark/20" id="contact">
      <div className="max-w-container mx-auto px-10 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Slogan */}
          <div className="space-y-4">
            <span className="font-heading font-bold text-xl tracking-tight text-white block">
              AIA LAB
            </span>
            <p className="font-sans text-xs text-[#FAFAFA]/60 leading-relaxed max-w-[25ch]">
              Artificial Intelligence & Art Laboratory. Au-delà du possible.
            </p>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <span className="font-mono text-xs font-semibold tracking-wider text-primary uppercase block">
              Nous contacter
            </span>
            <ul className="space-y-2 font-sans text-xs text-[#FAFAFA]/70">
              <li>+237 678 653 119</li>
              <li>+237 658 579 635</li>
              <li>
                <a href="mailto:contact@aialab.com" className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
                  contact@aialab.com
                </a>
              </li>
            </ul>
          </div>

          {/* Adresses */}
          <div className="space-y-4 lg:col-span-2">
            <span className="font-mono text-xs font-semibold tracking-wider text-primary uppercase block">
              Nos adresses
            </span>
            <ul className="space-y-3 font-sans text-xs text-[#FAFAFA]/70">
              <li>
                <strong className="text-white">Douala / Yaoundé :</strong> Vallée Nlongkak, face Hotel la Vallée, Immeuble Mont Manengouba
              </li>
              <li>
                <strong className="text-white">Yaoundé (Alternative) :</strong> Ancienne Mairie Tsinga, Derrière Express Union
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-strict border-[#FAFAFA]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-sans text-[10px] text-[#FAFAFA]/40">
            © {new Date().getFullYear()} AIA LAB. Tous droits réservés.
          </span>
          <span className="font-mono text-[10px] text-primary">
            AU-DELÀ DU POSSIBLE
          </span>
        </div>
      </div>
    </footer>
  );
}
```

---

### Tâche 13 : Assemblage dans page.tsx

**Fichiers ciblés :**
- Modifier : `c:\Users\User\Desktop\aialab_portfolio\rr\aia-lab-website\src\app\page.tsx`

- [ ] **Étape 1 : Modification de page.tsx**
Importer et assembler tous les composants de la page d'accueil dans l'ordre révisé, avec des connecteurs de flow 1px en transition verticale.

```typescript
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarqueeTicker from "@/components/MarqueeTicker";
import WhyChooseUs from "@/components/WhyChooseUs";
import ExpertiseSection from "@/components/ExpertiseSection";
import StatsSection from "@/components/StatsSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        
        {/* Flow Connectors: Vertical 1px lines */}
        <div className="w-[1px] h-12 bg-dark/15 mx-auto"></div>
        <MarqueeTicker />
        
        <div className="w-[1px] h-12 bg-dark/15 mx-auto"></div>
        <WhyChooseUs />
        
        <div className="w-[1px] h-12 bg-dark/15 mx-auto"></div>
        <ExpertiseSection />
        
        <div className="w-[1px] h-12 bg-dark/15 mx-auto"></div>
        <StatsSection />
        
        <div className="w-[1px] h-12 bg-dark/15 mx-auto"></div>
        <PortfolioSection />
        
        <div className="w-[1px] h-12 bg-dark/15 mx-auto"></div>
        <ProcessSection />
        
        <div className="w-[1px] h-12 bg-dark/15 mx-auto"></div>
        <TestimonialsSection />
        
        <div className="w-[1px] h-12 bg-dark/15 mx-auto"></div>
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
```

---

### Tâche 14 : Validation du Build

- [ ] **Étape 1 : Exécuter la compilation**
Exécuter la commande dans le répertoire `aia-lab-website` :
`npm run build`

Attente : Build réussi avec code de sortie 0.
