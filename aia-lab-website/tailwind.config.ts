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
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        "black-deep": "var(--foreground)",
        "bg-main": "var(--background)",
        "bg-alt": "var(--color-muted)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        heading: ["var(--font-heading)", "serif"],
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
