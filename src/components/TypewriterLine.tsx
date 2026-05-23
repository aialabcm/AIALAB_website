"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

type TypewriterLineProps = {
  text: string;
  startDelay?: number;
  msPerChar?: number;
  onComplete?: () => void;
  className?: string;
};

/** Reserves layout with invisible full text; reveals characters in place. */
export default function TypewriterLine({
  text,
  startDelay = 0,
  msPerChar = 100,
  onComplete,
  className,
}: TypewriterLineProps) {
  const { display } = useTypewriter({
    text,
    startDelay,
    msPerChar,
    onComplete,
  });

  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      <span className="invisible select-none" aria-hidden="true">
        {text}
      </span>
      <span className="absolute inset-0 text-center">{display}</span>
    </span>
  );
}
