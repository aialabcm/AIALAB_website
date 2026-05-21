# Plan d'Implémentation : Configuration Tailwind CSS (Design System AIA LAB)

**Objectif :** Créer le fichier `tailwind.config.ts` et configurer `layout.tsx` et `globals.css` pour implémenter fidèlement le design system d'AIA LAB.

**Architecture :** Utilisation des Google Fonts de Next.js (`next/font/google`) intégrées comme variables CSS personnalisées. Liaison de `tailwind.config.ts` dans Tailwind v4 à l'aide de la directive `@config` dans `globals.css`.

**Technologies clés :** Next.js 16, React 19, Tailwind CSS v4, PostCSS, Google Fonts (Montserrat, Roboto, Space Grotesk).

---

### Tâche 1 : Intégration des Google Fonts dans layout.tsx

**Fichiers ciblés :**
- Modifier : `c:\Users\User\Desktop\aialab_portfolio\rr\aia-lab-website\src\app\layout.tsx`

- [ ] **Étape 1 : Modification de layout.tsx**
Remplacer le chargement de Geist par Montserrat, Roboto et Space Grotesk.

Code de remplacement pour `src/app/layout.tsx` :
```typescript
import type { Metadata } from "next";
import { Montserrat, Roboto, Space_Grotesk } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "AIA LAB",
  description: "AIA LAB Portfolio and Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${montserrat.variable} ${roboto.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F0FAFB] text-[#0B0B0B]">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Étape 2 : Vérification de la syntaxe**
(La vérification se fera à l'étape finale avec le build de l'application).

---

### Tâche 2 : Création de tailwind.config.ts

**Fichiers ciblés :**
- Créer : `c:\Users\User\Desktop\aialab_portfolio\rr\aia-lab-website\tailwind.config.ts`

- [ ] **Étape 1 : Création du fichier avec les tokens officiels**

Code de `tailwind.config.ts` :
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
        primary: "#08C1DC",
        secondary: "#259EB1",
        dark: "#32565C",
        "black-deep": "#0B0B0B",
        "bg-main": "#F0FAFB",
        "bg-alt": "#FAFAFA",
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "sans-serif"],
        heading: ["var(--font-montserrat)", "sans-serif"],
        mono: ["var(--font-space-grotesk)", "monospace"],
      },
      spacing: {
        section: "80px",
        "bento-gap": "24px",
      },
      borderWidth: {
        strict: "1px",
      },
      maxWidth: {
        container: "1440px",
      },
      boxShadow: {
        "hover-lift": "0 10px 30px -15px rgba(0, 0, 0, 0.3)",
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

---

### Tâche 3 : Liaison de la configuration dans globals.css

**Fichiers ciblés :**
- Modifier : `c:\Users\User\Desktop\aialab_portfolio\rr\aia-lab-website\src\app\globals.css`

- [ ] **Étape 1 : Modification de globals.css**

Code de remplacement pour `src/app/globals.css` :
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

---

### Tâche 4 : Build de validation

- [ ] **Étape 1 : Exécuter le build**
Exécuter la commande dans `aia-lab-website` :
`npm run build`

Attente : Compilation réussie sans erreurs d'import ou de typage TypeScript.
