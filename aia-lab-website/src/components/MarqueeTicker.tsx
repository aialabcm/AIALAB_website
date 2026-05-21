import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const brands = [
  {
    name: "NVIDIA",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M21.5 12.8c-.4.5-1.1 1-2.1 1.5-1.1.5-2.2.8-3.4.8-1.2 0-2.4-.3-3.4-.8-1-.5-1.7-1-2.1-1.5-.4-.4-.5-1.1-.3-1.6.2-.5.7-.9 1.3-1.1.7-.2 1.4-.3 2.1-.3s1.4.1 2.1.3c.6.2 1.1.6 1.3 1.1.2.6.1 1.2-.3 1.6zM16 2.5l-4.5 9h9l-4.5-9z" />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M22.28 7.53a5.02 5.02 0 0 0-4.32-2.47 5.02 5.02 0 0 0-4.32 2.47 5.02 5.02 0 0 0-4.32-2.47 5.02 5.02 0 0 0-4.32 2.47 5.02 5.02 0 0 0-4.32 2.47 5.02 5.02 0 0 0 0 5.06 5.02 5.02 0 0 0 4.32 2.47 5.02 5.02 0 0 0 4.32-2.47 5.02 5.02 0 0 0 4.32 2.47 5.02 5.02 0 0 0 4.32-2.47 5.02 5.02 0 0 0 4.32 2.47 5.02 5.02 0 0 0 4.32-2.47 5.02 5.02 0 0 0 0-5.06zM12 13.82l-1.58-.91V11.1l1.58.91 1.58-.91v1.81l-1.58.91z" />
      </svg>
    ),
  },
  {
    name: "Google Cloud",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </svg>
    ),
  },
  {
    name: "Microsoft",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M2.5 2.5h9v9h-9v-9zm10 0h9v9h-9v-9zm-10 10h9v9h-9v-9zm10 0h9v9h-9v-9z" />
      </svg>
    ),
  },
  {
    name: "Meta",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 12c-1.5-1.5-3.5-2.5-5.5-2.5S2.5 10.5 2.5 12s2 2.5 4 2.5 4-1 5.5-2.5zm0 0c1.5 1.5 3.5 2.5 5.5 2.5s4-1 4-2.5-2-2.5-4-2.5-4 1-5.5 2.5z" />
      </svg>
    ),
  },
  {
    name: "Anthropic",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" />
      </svg>
    ),
  },
  {
    name: "Mistral",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M4 4h4l4 8 4-8h4v16h-4v-8l-4 8-4-8v8H4V4z" />
      </svg>
    ),
  },
  {
    name: "AWS",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.5 14h-11l5.5-8 5.5 8z" />
      </svg>
    ),
  },
];

export default function MarqueeTicker() {
  // Doubler la liste pour un défilement infini fluide
  const displayBrands = [...brands, ...brands];

  return (
    <section 
      className="w-full bg-bg-main py-20 overflow-hidden border-y border-dark/5 relative"
      style={{ clipPath: "ellipse(150% 100% at 50% 100%)", marginTop: "-50px" }}
    >
      <div className="container-standard mb-12">
        <p
          className={`${montserrat.className} text-[10px] lg:text-xs font-semibold tracking-[0.4em] text-dark/40 text-center uppercase`}
        >
          Propulser l'innovation avec les meilleurs
        </p>
      </div>

      <div className="relative flex overflow-hidden group">
        {/* Effet de masque (Faded Edges) */}
        <div className="absolute inset-y-0 left-0 w-24 lg:w-48 bg-gradient-to-r from-bg-main to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 lg:w-48 bg-gradient-to-l from-bg-main to-transparent z-10 pointer-events-none" />

        <div className="flex gap-16 lg:gap-24 items-center whitespace-nowrap animate-marquee hover:[animation-play-state:paused] py-4">
          {displayBrands.map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 transition-all duration-300 hover:scale-105"
            >
              <div
                className="w-8 h-8 lg:w-10 lg:h-10 text-dark/30 hover:text-primary transition-colors duration-300"
                title={brand.name}
              >
                {brand.svg}
              </div>
              <span
                className={`${montserrat.className} text-sm lg:text-base font-bold text-dark/20 hover:text-dark/60 tracking-tight transition-colors duration-300`}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
