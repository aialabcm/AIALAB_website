import type { Metadata } from "next";
import LancerProjetClient from "./LancerProjetClient";

export const metadata: Metadata = {
  title: "Lancer un Projet | AIA LAB — Agence Digitale d'Élite",
  description:
    "Discutons de vos objectifs et de votre vision : branding, web design, développement Next.js sur-mesure et stratégie de croissance digitale avec AIA LAB.",
};

export default function LancerProjetPage() {
  return <LancerProjetClient />;
}
