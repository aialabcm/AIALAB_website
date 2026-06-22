import type { Metadata } from "next";
import "./globals.css";

import CustomCursor from "@/components/CustomCursor";
import JsonLdSchema from "@/components/JsonLdSchema";

export const metadata: Metadata = {
  title: {
    default: "AIA LAB | Agence Digitale de Prestige & Studio Créatif",
    template: "%s | AIA LAB"
  },
  description: "AIA LAB est un studio digital d'élite spécialisé dans le branding de prestige, le design graphique de pointe, le développement Next.js sur-mesure et les stratégies de croissance d'exception.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="h-full antialiased"
    >
      <head>
        <JsonLdSchema />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-[#0B0B0B]">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
