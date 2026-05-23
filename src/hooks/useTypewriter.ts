"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Options = {
  text: string;
  /** Delay before the first character appears (ms). */
  startDelay?: number;
  msPerChar?: number;
  onComplete?: () => void;
};

export function useTypewriter({
  text,
  startDelay = 0,
  msPerChar = 100,
  onComplete,
}: Options) {
  const reduceMotion = useReducedMotion();
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const [visibleCount, setVisibleCount] = useState(() =>
    reduceMotion ? text.length : 0,
  );

  useEffect(() => {
    if (reduceMotion) {
      setVisibleCount(text.length);
      onCompleteRef.current?.();
      return;
    }

    setVisibleCount(0);
    let index = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let startId: ReturnType<typeof setTimeout> | undefined;

    const startTyping = () => {
      intervalId = setInterval(() => {
        index += 1;
        setVisibleCount(index);
        if (index >= text.length) {
          if (intervalId) clearInterval(intervalId);
          onCompleteRef.current?.();
        }
      }, msPerChar);
    };

    startId = setTimeout(startTyping, startDelay);

    return () => {
      if (startId) clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, startDelay, msPerChar, reduceMotion]);

  return {
    display: text.slice(0, visibleCount),
    isComplete: visibleCount >= text.length,
  };
}
