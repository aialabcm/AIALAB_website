"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useRef } from "react";

/* ─────────────────────────────── Floating Shape ─────────────────────────────── */
function FloatingShape({
  size,
  x,
  y,
  delay,
  duration,
  rotate,
  type,
}: {
  size: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
  rotate: number;
  type: "circle" | "square" | "line";
}) {
  const shapeClass =
    type === "circle"
      ? "rounded-full"
      : type === "square"
      ? "rounded-sm"
      : "rounded-full";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.06, 0.04, 0.06, 0],
        scale: [0.8, 1, 1.1, 1, 0.8],
        y: [0, -20, -10, -25, 0],
        rotate: [0, rotate, -rotate / 2, rotate, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute pointer-events-none border border-primary/20 ${shapeClass}`}
      style={{
        width: type === "line" ? size * 3 : size,
        height: type === "line" ? 1 : size,
        left: x,
        top: y,
      }}
    />
  );
}

/* ────────────────────────────── Progress Ring ────────────────────────────── */
function ProgressRing() {
  const radius = 80;
  const stroke = 1.5;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      <svg
        width={radius * 2 + stroke * 2}
        height={radius * 2 + stroke * 2}
        className="opacity-[0.12]"
      >
        {/* Background ring */}
        <circle
          cx={radius + stroke}
          cy={radius + stroke}
          r={radius}
          fill="none"
          stroke="rgba(8, 193, 220, 0.15)"
          strokeWidth={stroke}
        />
        {/* Animated progress arc */}
        <motion.circle
          cx={radius + stroke}
          cy={radius + stroke}
          r={radius}
          fill="none"
          stroke="rgba(8, 193, 220, 0.6)"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          animate={{
            strokeDashoffset: [circumference, circumference * 0.35],
          }}
          transition={{
            duration: 3,
            delay: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            transformOrigin: "center",
            transform: "rotate(-90deg)",
          }}
        />
      </svg>

      {/* Inner ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="opacity-[0.06]"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(8, 193, 220, 0.4)"
            strokeWidth="0.5"
            strokeDasharray="4 8"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ────────────────────────────── Mouse Parallax ────────────────────────────── */
function useMouseParallax() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 40, stiffness: 90 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set((e.clientX - centerX) / centerX);
      mouseY.set((e.clientY - centerY) / centerY);
    };

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mql.matches) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  return { x, y };
}

/* ──────────────────────────── Noise Overlay ──────────────────────────── */
function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}

/* ────────────────────────── Time Display ────────────────────────── */
function TimeDisplay() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ delay: 1.8, duration: 1 }}
      className="font-mono text-[10px] tracking-[0.4em] text-white tabular-nums"
    >
      {time}
    </motion.span>
  );
}

/* ═════════════════════════════ MAIN CONTENT ═════════════════════════════ */
function ComingSoonContent() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "Cette page";
  const { x, y } = useMouseParallax();

  /* Parallax transforms */
  const bgX = useTransform(x, [-1, 1], [-15, 15]);
  const bgY = useTransform(y, [-1, 1], [-15, 15]);
  const fgX = useTransform(x, [-1, 1], [-6, 6]);
  const fgY = useTransform(y, [-1, 1], [-6, 6]);

  /* Stagger container variants */
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const textReveal = {
    hidden: { y: "110%" },
    visible: {
      y: "0%",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden selection:bg-primary/20 selection:text-primary">
      {/* ──── Noise grain ──── */}
      <NoiseOverlay />

      {/* ──── Subtle grid ──── */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(8,193,220,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(8,193,220,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Cross-hair center */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/[0.04] to-transparent" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent" />
      </motion.div>

      {/* ──── Ambient glow ──── */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-[140px]" />
      </motion.div>
      <motion.div
        style={{
          x: useTransform(x, [-1, 1], [20, -20]),
          y: useTransform(y, [-1, 1], [20, -20]),
        }}
        className="absolute top-[30%] right-[20%] pointer-events-none"
      >
        <div className="w-[300px] h-[300px] rounded-full bg-secondary/[0.04] blur-[100px]" />
      </motion.div>

      {/* ──── Floating shapes ──── */}
      <FloatingShape type="circle" size={60} x="15%" y="20%" delay={0} duration={12} rotate={45} />
      <FloatingShape type="square" size={24} x="80%" y="25%" delay={2} duration={15} rotate={90} />
      <FloatingShape type="line" size={40} x="10%" y="70%" delay={1} duration={10} rotate={30} />
      <FloatingShape type="circle" size={16} x="85%" y="65%" delay={3} duration={13} rotate={-60} />
      <FloatingShape type="square" size={40} x="70%" y="80%" delay={1.5} duration={14} rotate={120} />
      <FloatingShape type="line" size={30} x="25%" y="85%" delay={2.5} duration={11} rotate={-45} />
      <FloatingShape type="circle" size={32} x="50%" y="15%" delay={0.5} duration={16} rotate={75} />

      {/* ──── Progress ring ──── */}
      <ProgressRing />

      {/* ──── Top bar ──── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute top-8 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
            Retour
          </span>
        </Link>
        <TimeDisplay />
      </motion.div>

      {/* ──── Main content ──── */}
      <motion.div
        style={{ x: fgX, y: fgY }}
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
      >
        {/* Status badge */}
        <motion.div variants={item} className="mb-12">
          <div className="relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.35em] text-white/50">
              En développement
            </span>
          </div>
        </motion.div>

        {/* Title block */}
        <div className="mb-6">
          <div className="overflow-hidden">
            <motion.h1
              variants={textReveal}
              className="font-heading font-black text-[clamp(3rem,10vw,8rem)] text-white tracking-[-0.04em] leading-[0.9] uppercase"
            >
              Bientôt
            </motion.h1>
          </div>
          <div className="overflow-hidden mt-1">
            <motion.span
              variants={textReveal}
              className="block font-heading font-light text-[clamp(1.5rem,5vw,4rem)] text-primary/80 italic tracking-[-0.02em] leading-[1.1]"
            >
              disponible.
            </motion.span>
          </div>
        </div>

        {/* Decorative separator */}
        <motion.div
          variants={item}
          className="flex items-center gap-4 mb-10"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "circOut" }}
            className="w-12 h-px bg-gradient-to-r from-transparent to-primary/30 origin-left"
          />
          <div className="w-1 h-1 rounded-full bg-primary/40" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.9, ease: "circOut" }}
            className="w-12 h-px bg-gradient-to-l from-transparent to-primary/30 origin-right"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={item}
          className="font-sans text-sm md:text-base text-white/40 max-w-[48ch] mb-14 leading-[1.8] font-light"
        >
          <span className="text-primary/70 font-medium">{page}</span> est
          actuellement en cours de création. Notre équipe y travaille avec soin
          pour vous offrir une expérience à la hauteur.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-heading font-bold text-[11px] tracking-[0.2em] uppercase text-black-deep bg-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(8,193,220,0.15)] active:scale-[0.98]"
          >
            <span>Retour à l&apos;accueil</span>
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
          </Link>

          <Link
            href="/#cta-contact"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-heading font-medium text-[11px] tracking-[0.2em] uppercase text-white/40 border border-white/[0.06] hover:border-primary/30 hover:text-primary/70 transition-all duration-300 hover:bg-primary/[0.03]"
          >
            <span>Nous contacter</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </motion.div>
      </motion.div>

      {/* ──── Bottom bar ──── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/15">
          AIA LAB © {new Date().getFullYear()}
        </span>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/15">
            Design & Performance
          </span>
          <div className="w-6 h-px bg-white/10" />
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/15">
            V.01
          </span>
        </div>
      </motion.div>

      {/* ──── Edge lines ──── */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: "circOut" }}
        className="absolute left-8 md:left-16 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-white/[0.03] to-transparent origin-top"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1.1, ease: "circOut" }}
        className="absolute right-8 md:right-16 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-white/[0.03] to-transparent origin-top"
      />
    </section>
  );
}

/* ═══════════════════════════════ EXPORT ═══════════════════════════════ */
export default function ComingSoonPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="w-6 h-6 border border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      <ComingSoonContent />
    </Suspense>
  );
}
