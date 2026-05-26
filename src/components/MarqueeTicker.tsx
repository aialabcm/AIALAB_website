"use client";
import Image from "next/image";

// Logos réels des clients AIA LAB
// darkBg: true = logo conçu sur fond sombre → on applique un filtre d'inversion au repos pour fond clair
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
    <section className="relative w-full bg-bg-main overflow-hidden">
      {/* Main Content Area */}
      <div className="pt-16 lg:pt-20 pb-8 lg:pb-10">
        {/* Section label */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 lg:mb-14">
          <p
            className="font-heading text-[10px] lg:text-[11px] font-semibold tracking-[0.35em] text-dark/30 text-center uppercase"
          >
            Ils nous font confiance
          </p>
        </div>

        {/* Marquee Track */}
        <div className="relative flex overflow-hidden">
          {/* Faded edges — wider for an elegant falloff */}
          <div className="absolute inset-y-0 left-0 w-32 lg:w-56 bg-gradient-to-r from-bg-main to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 lg:w-56 bg-gradient-to-l from-bg-main to-transparent z-10 pointer-events-none" />

          <div className="flex gap-14 lg:gap-24 items-center whitespace-nowrap animate-marquee hover:[animation-play-state:paused] py-6">
            {displayClients.map((client, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 flex-shrink-0 transition-all duration-400 hover:scale-[1.06] group/item cursor-default"
                title={client.name}
              >
                {/* Logo container */}
                <div
                  className="relative flex-shrink-0 transition-all duration-400"
                  style={{ width: "44px", height: "44px" }}
                >
                  <Image
                    src={client.src}
                    alt={`Logo ${client.name}`}
                    fill
                    className="object-contain transition-[filter] duration-400"
                    style={{
                      // Au repos: inverser si fond sombre + grayscale + semi-transparent
                      filter: client.darkBg
                        ? "invert(1) grayscale(1) opacity(0.3)"
                        : "grayscale(1) opacity(0.3)",
                    }}
                    onMouseEnter={(e) => {
                      // Au hover: retirer invert pour montrer la VRAIE couleur du logo
                      (e.currentTarget as HTMLImageElement).style.filter =
                        "grayscale(0) opacity(1)";
                    }}
                    onMouseLeave={(e) => {
                      // Retour au repos
                      (e.currentTarget as HTMLImageElement).style.filter =
                        client.darkBg
                          ? "invert(1) grayscale(1) opacity(0.3)"
                          : "grayscale(1) opacity(0.3)";
                    }}
                    sizes="44px"
                    unoptimized
                  />
                </div>

                {/* Client name */}
                <span
                  className="font-heading text-[12px] lg:text-[13px] font-bold text-dark/20 group-hover/item:text-dark/70 tracking-tight transition-colors duration-400 whitespace-nowrap"
                >
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

