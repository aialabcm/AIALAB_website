"use client";
import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
});

// Logos réels des clients AIA LAB
// darkBg: true = logo sur fond sombre → on applique un filtre d'inversion pour fond clair
const clients = [
  {
    name: "B-Partners",
    src: "/images/Websites Logo/B-Partners Logo copy.webp",
    darkBg: false,
  },
  {
    name: "Linguae Translation",
    src: "/images/Websites Logo/Linguae translation copie.webp",
    darkBg: false,
  },
  {
    name: "OnlyFood",
    src: "/images/Websites Logo/oyfd copy.webp",
    darkBg: true,
  },
  {
    name: "China Tech Academy",
    src: "/images/Websites Logo/photo_2025-01-05_08-47-51.webp",
    darkBg: true,
  },
  {
    name: "Rehoboth Music System",
    src: "/images/Websites Logo/photo_2025-01-05_10-03-45.webp",
    darkBg: true,
  },
  {
    name: "IINL",
    src: "/images/Websites Logo/photo_2025-01-05_10-03-46.webp",
    darkBg: true,
  },
  {
    name: "Sygalin SAS",
    src: "/images/Websites Logo/photo_2025-01-05_10-03-47.webp",
    darkBg: true,
  },
  {
    name: "AJPROS",
    src: "/images/Websites Logo/photo_2025-01-05_10-03-48 (2).webp",
    darkBg: true,
  },
  {
    name: "AAMESP",
    src: "/images/Websites Logo/photo_2025-01-05_10-03-48 (3).webp",
    darkBg: true,
  },
  {
    name: "LIQZO",
    src: "/images/Websites Logo/photo_2025-01-05_10-03-48.webp",
    darkBg: true,
  },
  {
    name: "Don Tisane",
    src: "/images/Websites Logo/don tisane.webp",
    darkBg: true,
  },
];

export default function MarqueeTicker() {
  // Doubler la liste pour un défilement infini fluide
  const displayClients = [...clients, ...clients];

  return (
    <section
      className="w-full bg-bg-main py-20 overflow-hidden border-y border-dark/5 relative"
      style={{ clipPath: "ellipse(150% 100% at 50% 100%)", marginTop: "-50px" }}
    >
      <div className="container-standard mb-12">
        <p
          className={`${montserrat.className} text-[10px] lg:text-xs font-semibold tracking-[0.4em] text-dark/40 text-center uppercase`}
        >
          Ils nous font confiance
        </p>
      </div>

      <div className="relative flex overflow-hidden group">
        {/* Effet de masque (Faded Edges) */}
        <div className="absolute inset-y-0 left-0 w-24 lg:w-48 bg-gradient-to-r from-bg-main to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 lg:w-48 bg-gradient-to-l from-bg-main to-transparent z-10 pointer-events-none" />

        <div className="flex gap-12 lg:gap-20 items-center whitespace-nowrap animate-marquee hover:[animation-play-state:paused] py-4">
          {displayClients.map((client, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 flex-shrink-0 transition-all duration-300 hover:scale-105 group/item"
              title={client.name}
            >
              {/* Conteneur logo avec gestion fond sombre/clair */}
              <div
                className="relative flex-shrink-0 transition-all duration-300"
                style={{
                  width: "48px",
                  height: "48px",
                }}
              >
                <Image
                  src={client.src}
                  alt={`Logo ${client.name}`}
                  fill
                  className="object-contain"
                  style={{
                    // Pour les logos sur fond noir: inversion pour fond clair + grayscale + opacité
                    filter: client.darkBg
                      ? "invert(1) grayscale(1) opacity(0.35)"
                      : "grayscale(1) opacity(0.35)",
                    transition: "filter 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter =
                      client.darkBg
                        ? "invert(1) grayscale(0) opacity(0.85)"
                        : "grayscale(0) opacity(0.85)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter =
                      client.darkBg
                        ? "invert(1) grayscale(1) opacity(0.35)"
                        : "grayscale(1) opacity(0.35)";
                  }}
                  sizes="48px"
                  unoptimized
                />
              </div>
              {/* Nom du client */}
              <span
                className={`${montserrat.className} text-xs lg:text-sm font-bold text-dark/25 group-hover/item:text-dark/60 tracking-tight transition-colors duration-300 whitespace-nowrap`}
              >
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
