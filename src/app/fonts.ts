import { Montserrat, Roboto, Space_Grotesk, Caveat } from "next/font/google";

// Self-hosted via next/font: fonts are downloaded at build time and served
// from your own domain, so there are zero runtime requests to Google.
// This removes the render-blocking CSS @import chain that was delaying
// First Contentful Paint on mobile.

export const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-montserrat",
    display: "swap",
});

export const roboto = Roboto({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    variable: "--font-roboto",
    display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-space-grotesk",
    display: "swap",
});

export const caveat = Caveat({
    subsets: ["latin"],
    weight: ["400", "600"],
    variable: "--font-caveat",
    display: "swap",
});