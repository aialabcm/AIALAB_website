import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIA LAB",
  description: "AIA LAB Portfolio and Studio",
};

import CustomCursor from "@/components/CustomCursor";

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
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-[#0B0B0B]">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
