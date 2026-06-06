"use client";

import { Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { BrandLogo } from "@/components/BrandLogo";
import { ButtonLink } from "@/components/ButtonLink";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const whatsapp = buildWhatsAppUrl();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/75 backdrop-blur-2xl">
        <div className="container-premium flex min-h-20 items-center justify-between gap-4">
          <Link href="/" className="focus-ring rounded-xl">
            <BrandLogo imageClassName="h-9 w-[150px] md:h-12 md:w-[190px]" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`focus-ring rounded-full px-4 py-2 text-sm transition ${
                    active ? "bg-white/10 text-text-primary" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ButtonLink href={whatsapp} variant="secondary">WhatsApp</ButtonLink>
            <ButtonLink href="/reserva">Reservar domicilio</ButtonLink>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={whatsapp}
              aria-label="Hablar por WhatsApp"
              className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
            >
              <MessageCircle size={20} />
            </a>
            <button
              type="button"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-white/10 bg-background/95 lg:hidden">
            <nav className="container-premium grid gap-2 py-5" aria-label="Menú móvil">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring rounded-2xl px-4 py-3 text-text-secondary hover:bg-white/[0.06] hover:text-text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/reserva"
                onClick={() => setOpen(false)}
                className="focus-ring mt-2 inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-blue-500"
              >
                Reservar visita
              </Link>
            </nav>
          </div>
        ) : null}
      </header>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-background/85 p-3 backdrop-blur-xl lg:hidden">
        <ButtonLink href="/reserva" className="w-full">Reservar visita</ButtonLink>
      </div>
    </>
  );
}
