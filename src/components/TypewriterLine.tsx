/**
 * Pure-CSS "typewriter" reveal — no JS timers involved.
 *
 * The text is real, static HTML/DOM content painted immediately at
 * first render (server-rendered, no client JS dependency). The typing
 * effect is purely a visual `clip-path` animation running on the
 * compositor thread. This decouples the hero title's paint timing from
 * JS hydration/main-thread execution, which is critical for LCP on
 * throttled devices (e.g. mobile Lighthouse audits).
 *
 * Previously this was driven by `useTypewriter` + `setInterval`, which
 * kept the text invisible until JS timers fired — on CPU-throttled
 * mobile this could delay the largest visible paint by several seconds.
 */
type TypewriterLineProps = {
  text: string;
  startDelay?: number;
  msPerChar?: number;
  className?: string;
};

export default function TypewriterLine({
  text,
  startDelay = 0,
  msPerChar = 100,
  className,
}: TypewriterLineProps) {
  const durationMs = text.length * msPerChar;

  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      <span
        className="motion-safe:animate-typewriter-reveal motion-reduce:[clip-path:inset(0_0%_0_0)]"
        style={{
          animationDuration: `${durationMs}ms`,
          animationDelay: `${startDelay}ms`,
        }}
      >
        {text}
      </span>
    </span>
  );
}