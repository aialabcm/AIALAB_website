"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState("default");
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const exploreTarget = target.closest('[data-cursor="explore"]');
      
      if (exploreTarget) {
        setCursorType("explore");
      } else if (
        target.closest("button") || 
        target.closest("a") || 
        target.closest('[role="button"]') ||
        target.classList.contains("cursor-pointer")
      ) {
        setCursorType("pointer");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:flex"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: cursorType === "explore" ? 90 : 8,
          height: cursorType === "explore" ? 90 : 8,
          backgroundColor: "white",
        }}
        animate={{
          scale: cursorType === "pointer" ? 2.5 : 1,
          backdropFilter: cursorType === "explore" ? "invert(1) blur(4px)" : "invert(0) blur(0px)",
        }}
        transition={{ type: "spring", damping: 35, stiffness: 400 }}
      >
        {cursorType === "explore" && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] font-bold tracking-[0.2em] text-black uppercase"
          >
            Voir
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
