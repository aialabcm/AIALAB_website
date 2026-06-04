export interface PortfolioProject {
  id: string;
  name: string;
  tagline: string;
  category: string;
  location: string;
  image: string;
  headline: string;
  story: [string, string];
  client: string;
  services: string[];
  gallery: string[];
}

export const projects: PortfolioProject[] = [
  {
    id: "studio-landing",
    name: "Studio Landing",
    tagline: "L'excellence digitale en première impression.",
    category: "Web Design",
    location: "Montréal — QC",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    headline: "L'Excellence Digitale En Première Impression",
    story: [
      "Studio Landing avait besoin d'une présence en ligne qui reflète leur positionnement haut de gamme. Le défi : créer une expérience immersive dès le premier contact, tout en maintenant des performances techniques irréprochables.",
      "Nous avons conçu une landing page qui allie animation fluide et contenu stratégique, transformant chaque visiteur en prospect qualifié. Le résultat : un taux de conversion multiplié par 3 en deux mois."
    ],
    client: "Studio Landing Inc.",
    services: ["Web Design", "Développement", "Stratégie UX"],
    gallery: []
  },
  {
    id: "aia-identity",
    name: "AIA Identity",
    tagline: "Une identité qui incarne l'innovation.",
    category: "Branding",
    location: "Paris — FR",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200&auto=format&fit=crop",
    headline: "Une Identité Qui Incarne L'Innovation",
    story: [
      "AIA cherchait à se repositionner sur le marché de l'intelligence artificielle avec une identité qui inspire confiance et avant-garde. L'ancienne marque ne reflétait plus l'ambition de l'entreprise.",
      "Nous avons développé un système visuel complet — du logo aux supports de communication — qui positionne AIA comme un leader incontournable de son secteur. Une identité pensée pour durer."
    ],
    client: "AIA Technologies",
    services: ["Branding", "Identité Visuelle", "Direction Artistique"],
    gallery: []
  },
  {
    id: "ecommerce-lux",
    name: "E-commerce Lux",
    tagline: "Le luxe accessible en quelques clics.",
    category: "Digital Experience",
    location: "Genève — CH",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    headline: "Le Luxe Accessible En Quelques Clics",
    story: [
      "E-commerce Lux souhaitait offrir une expérience d'achat en ligne qui rivalise avec le service en boutique. Chaque detail devait respirer l'élégance et le raffinement.",
      "Notre solution : une plateforme e-commerce immersive avec des micro-interactions soignées, une navigation intuitive et un tunnel d'achat simplifié. Le panier moyen a augmenté de 45%."
    ],
    client: "Lux Commerce SA",
    services: ["Digital Experience", "E-commerce", "UI Design"],
    gallery: []
  },
  {
    id: "nectar",
    name: "Nectar Fragrance",
    tagline: "L'art de la fragrance réinventé.",
    category: "Branding",
    location: "Lyon — FR",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop",
    headline: "L'Art De La Fragrance Réinventé",
    story: [
      "Nectar Fragrance lançait une nouvelle gamme de parfums artisanaux et avait besoin d'une identité de marque aussi raffinee que ses creations. L'enjeu : se demarquer dans un marche sature.",
      "Nous avons crée un univers visuel sensoriel, mêlant typographie élégante et palette de couleurs évocatrice. La marque a gagné 200% de visibilité sur les réseaux sociaux en trois mois."
    ],
    client: "Nectar Fragrance",
    services: ["Branding", "Packaging", "Stratégie Digitale"],
    gallery: []
  },
  {
    id: "metaverse-studio",
    name: "Metaverse Studio",
    tagline: "Le futur des mondes virtuels interactifs.",
    category: "Web Design",
    location: "Tokyo — JP",
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=1200&auto=format&fit=crop",
    headline: "Le Futur des Mondes Virtuels Interactifs",
    story: [
      "Metaverse Studio conçoit des hubs de réalité virtuelle immersifs. Ils cherchaient un site web vitrine capable de restituer la sensation de profondeur 3D directement dans un navigateur standard.",
      "Nous avons intégré des rendus WebGL légers et des grilles CSS asymétriques pour simuler le relief sans ralentir la navigation. Un design fluide qui a attiré plus de 50 000 curieux le premier mois."
    ],
    client: "Metaverse Corp",
    services: ["Web Design", "Expérience 3D", "WebGL"],
    gallery: []
  },
  {
    id: "growth-accelerator",
    name: "SaaS Accelerator",
    tagline: "Scaler l'acquisition client automatiquement.",
    category: "Digital Experience",
    location: "San Francisco — CA",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
    headline: "Scaler L'Acquisition Client Automatiquement",
    story: [
      "Le collectif SaaS Accelerator voulait repenser tout le tunnel d'onboarding de leur outil d'automatisation afin de réduire le taux de désabonnement précoce.",
      "Notre équipe a mené un audit de friction UX complet et déployé des tunnels interactifs sur mesure. Le taux d'activation a bondi de 34% en l'espace de 4 semaines."
    ],
    client: "Accelerator Group",
    services: ["Digital Experience", "UX Optimization", "Conversion Strategy"],
    gallery: []
  }
];
