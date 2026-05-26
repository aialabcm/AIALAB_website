import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        primary: "#08C1DC",
        secondary: "#259EB1",
        dark: "#32565C",
        "black-deep": "#0B0B0B",
        "bg-main": "#FAFAFA",
        "bg-alt": "#F0FAFB",
        anthracite: "#172A2E",
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
        premium: "0 10px 40px -10px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "marquee-vertical-up": "marquee-vertical-up 40s linear infinite",
        "marquee-vertical-down": "marquee-vertical-down 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "marquee-vertical-up": {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "marquee-vertical-down": {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
