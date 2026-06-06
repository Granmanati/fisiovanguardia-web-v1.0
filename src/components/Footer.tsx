import { Facebook, Instagram, Linkedin, Music2, Play, Send, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { IconBadge } from "@/components/IconBadge";
import { socialLinks, siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const footerColumns = [
  {
    title: "Servicios",
    links: [
      ["Fisioterapia a domicilio", "/fisioterapia-a-domicilio"],
      ["Tratamientos", "/tratamientos"],
      ["Lesiones deportivas", "/tratamientos/lesiones-deportivas"],
      ["Dolor crónico", "/tratamientos/dolor-cronico"]
    ]
  },
  {
    title: "Ecosistema",
    links: [
      ["MOVE OS", "/move-os"],
      ["Protocolos V21", "/protocolos-v21"],
      ["Escaneo IA futuro", "/ai-scan"]
    ]
  },
  {
    title: "Recursos",
    links: [
      ["Artículos", "/blog"],
      ["Sistema cervical", "/tratamientos/cervical"],
      ["Sistema lumbar", "/tratamientos/lumbar"],
      ["ATM y migraña", "/tratamientos/atm-migrana"]
    ]
  },
  {
    title: "Contacto",
    links: [
      ["Madrid Norte", "/fisioterapia-a-domicilio"],
      ["Reservar visita", "/reserva"],
      ["Sobre nosotros", "/sobre-nosotros"]
    ]
  },
  {
    title: "Legal",
    links: [
      ["Aviso legal", "/legal#aviso-legal"],
      ["Privacidad", "/legal#privacidad"],
      ["Cookies", "/legal#cookies"],
      ["Aviso sanitario", "/legal#disclaimer"]
    ]
  }
];

const socialIconMap = {
  YouTube: Youtube,
  Instagram,
  TikTok: Music2,
  X: Twitter,
  Facebook,
  "LinkedIn Dario": Linkedin,
  "LinkedIn Vanesa": Linkedin
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#05080D] pb-24 pt-16 lg:pb-12 lg:pt-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-soft/50 to-transparent" aria-hidden="true" />
      <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-accent-soft/5 blur-3xl" aria-hidden="true" />

      <div className="container-premium relative">
        <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 shadow-card backdrop-blur-xl md:p-8 lg:grid-cols-[1.15fr_1.85fr]">
          <div>
            <Link href="/" className="focus-ring inline-flex rounded-xl">
              <BrandLogo imageClassName="h-14 w-[220px] md:h-16 md:w-[250px]" />
            </Link>
            <p className="mt-5 text-2xl font-semibold tracking-tight text-text-primary">{siteConfig.tagline}</p>
            <p className="mt-4 max-w-md text-sm leading-6 text-text-secondary">
              Fisioterapia avanzada a domicilio, movimiento humano y recuperación guiada en Madrid Norte.
            </p>

            <a
              href={buildWhatsAppUrl()}
              className="focus-ring mt-7 inline-flex min-h-12 items-center gap-3 rounded-full border border-accent-soft/25 bg-accent/15 px-5 text-sm font-semibold text-accent-soft shadow-glow transition hover:-translate-y-1 hover:bg-accent hover:text-white"
            >
              <Send size={17} />
              WhatsApp {siteConfig.phone}
            </a>

            <div className="mt-7 flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = socialIconMap[link.label as keyof typeof socialIconMap] ?? Play;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="focus-ring group inline-flex rounded-full transition duration-300 hover:-translate-y-1"
                  >
                    <IconBadge icon={Icon} label={link.label} size="sm" className="rounded-full text-text-secondary group-hover:text-accent-soft" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-text-primary">{column.title}</h3>
                <ul className="mt-5 grid gap-3 text-sm text-text-secondary">
                  {column.links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="transition hover:text-accent-soft">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs leading-5 text-muted md:flex-row md:items-center md:justify-between">
          <p>La información de esta web es educativa y no sustituye una valoración clínica individual.</p>
          <p>© {new Date().getFullYear()} Fisiovanguardia. Madrid Norte.</p>
        </div>
      </div>
    </footer>
  );
}
