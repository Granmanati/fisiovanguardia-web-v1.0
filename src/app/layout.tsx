import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingReceptionAgent } from "@/components/FloatingReceptionAgent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/data/site";
import { faqSchema, localBusinessSchema } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Fisiovanguardia | Fisioterapia avanzada a domicilio en Madrid Norte",
    template: "%s | Fisiovanguardia"
  },
  description: siteConfig.description,
  keywords: [
    "fisioterapia a domicilio Madrid norte",
    "fisioterapia avanzada a domicilio Madrid",
    "fisioterapeuta a domicilio Madrid norte",
    "fisioterapia lesiones deportivas Madrid",
    "fisioterapia dolor lumbar a domicilio",
    "fisioterapia cervical Madrid",
    "fisioterapia ATM Madrid",
    "fisioterapia de alto nivel Madrid",
    "readaptación deportiva Madrid",
    "dolor crónico fisioterapia Madrid"
  ],
  openGraph: {
    title: "Fisiovanguardia",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "es_ES",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Fisiovanguardia",
    description: siteConfig.description
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <JsonLd data={[localBusinessSchema(), faqSchema()]} />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingReceptionAgent />
      </body>
    </html>
  );
}
