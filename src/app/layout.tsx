import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV Designer Pro - Crea Currículums Profesionales",
  description: "Plataforma web para crear, personalizar y exportar currículums vitae en PDF, PNG, JPG y HTML. Múltiples plantillas profesionales.",
  keywords: ["CV", "currículum", "resume", "PDF", "plantillas", "profesional"],
  authors: [{ name: "CV Designer Pro" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "CV Designer Pro",
    description: "Crea currículums profesionales en minutos",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
