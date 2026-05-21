# Spécification de Conception : Configuration Tailwind CSS (Design System AIA LAB)

**Date :** 2026-05-19
**Auteur :** Antigravity
**Statut :** En attente de validation

## 1. Objectif
Configurer Tailwind CSS et Next.js dans le projet `aia-lab-website` afin d'intégrer fidèlement la palette de couleurs, la typographie, les espacements et les règles de transition définies dans `design-system.md`.

## 2. Architecture Technique
Le projet utilise **Tailwind CSS v4** et **Next.js 16**. Pour intégrer les spécifications :
- **Google Fonts** : Intégrées via `next/font/google` dans `layout.tsx` et exposées via des variables CSS.
- **Fichier de configuration** : Création d'un `tailwind.config.ts` à la racine de `aia-lab-website`.
- **Intégration CSS** : Chargement de la configuration dans `src/app/globals.css` via la directive `@config`.

---

## 3. Détail des Fichiers et Variables

### A. Fichier `tailwind.config.ts`
Fichier de configuration TypeScript standard pour les outils de développement et l'IDE.

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette officielle du design system
        primary: "#08C1DC",      // Accent Primaire (CTA)
        secondary: "#259EB1",    // Accent Secondaire (Hover/Gradients)
        dark: "#32565C",         // Texte/Fond Foncé (Titres secondaires)
        "black-deep": "#0B0B0B", // Noir Profond (Titres H1/H2, Footer)
        "bg-main": "#F0FAFB",    // Fond Principal (Global)
        "bg-alt": "#FAFAFA",     // Fond Alternatif (Sections)
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "sans-serif"],
        heading: ["var(--font-montserrat)", "sans-serif"],
        mono: ["var(--font-space-grotesk)", "monospace"],
      },
      spacing: {
        section: "80px",        // Espace entre les sections
        "bento-gap": "24px",    // Gouttière Bento Grid
      },
      borderWidth: {
        strict: "1px",          // Epaisseur stricte des bordures
      },
      maxWidth: {
        container: "1440px",    // Largeur max du conteneur
      },
      boxShadow: {
        "hover-lift": "0 10px 30px -15px rgba(0, 0, 0, 0.3)", // Bento hover-lift
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### B. Modification de `src/app/globals.css`
Liaison de la configuration Tailwind et nettoyage du CSS de base.

```css
@import "tailwindcss";
@config "../../tailwind.config.ts";

:root {
  --background: #F0FAFB;
  --foreground: #0B0B0B;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-roboto), Arial, sans-serif;
}
```

### C. Modification de `src/app/layout.tsx`
Intégration de Google Fonts dans Next.js.

```typescript
import { Montserrat, Roboto, Space_Grotesk } from "next/font/google";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Dans RootLayout :
// className={`${montserrat.variable} ${roboto.variable} ${spaceGrotesk.variable} h-full antialiased`}
```

---

## 4. Plan de Validation
1. **Compilation** : Lancement de la commande `npm run build` pour vérifier l'absence d'erreurs TypeScript ou PostCSS.
2. **Exécution locale** : Lancement du serveur de développement et validation du chargement correct des styles et polices de caractères Google Fonts.
