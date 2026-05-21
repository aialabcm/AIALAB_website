"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useTransform, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
  trigger?: boolean;
}

export default function AnimatedCounter({ value, suffix = "", className = "", trigger }: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView || trigger) {
      count.set(0); // Reset to 0 before starting
      const controls = animate(count, value, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1] as const, // Custom slow out curve
      });
      return controls.stop;
    }
  }, [isInView, trigger, count, value]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

import { motion } from "framer-motion";
