"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

type TherapistCardProps = {
  name: string;
  role: string;
  quote: string;
  href: string;
  imageSrc: string;
  specialties: string[];
  reverse?: boolean;
};

export function TherapistCard({ name, role, quote, href, imageSrc, specialties, reverse = false }: TherapistCardProps) {
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2);

  return (
    <article className={`grid overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.045] shadow-card backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr] ${reverse ? "lg:grid-flow-col-dense" : ""}`}>
      <FounderPortrait name={name} initials={initials} imageSrc={imageSrc} reverse={reverse} />

      <div className={`relative p-6 md:p-8 ${reverse ? "lg:col-start-1" : ""}`}>
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-soft">Perfil fundador</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">{name}</h3>
          <p className="mt-3 text-text-secondary">{role}</p>

          <p className="mt-7 text-lg leading-8 text-text-primary">&quot;{quote}&quot;</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <span key={specialty} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
                {specialty}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={href}
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-accent-soft/25 bg-accent/10 px-5 text-sm font-semibold text-accent-soft transition hover:bg-accent hover:text-white"
            >
              <Linkedin size={17} />
              LinkedIn {name.split(" ")[0]}
            </a>
            <Link
              href="/reserva"
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-text-primary transition hover:bg-white/[0.08]"
            >
              <Sparkles size={17} />
              Reservar con el equipo
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function FounderPortrait({ name, initials, imageSrc, reverse }: { name: string; initials: string; imageSrc: string; reverse?: boolean }) {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(imageSrc, { method: "HEAD" })
      .then((response) => {
        if (!cancelled) setAvailable(response.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });

    return () => {
      cancelled = true;
    };
  }, [imageSrc]);

  return (
    <div className={`relative min-h-[360px] overflow-hidden bg-gradient-to-br from-accent/20 via-surface to-accent-soft/10 ${reverse ? "lg:col-start-2" : ""}`}>
      <div className="absolute inset-0 animated-grid opacity-35" aria-hidden="true" />
      <div className="absolute inset-x-8 top-10 h-px bg-gradient-to-r from-transparent via-accent-soft/60 to-transparent scan-line" aria-hidden="true" />
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />

      {available ? (
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-cover opacity-90"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-40 w-40 items-center justify-center rounded-[2rem] border border-accent-soft/25 bg-background/45 text-5xl font-semibold text-accent-soft shadow-glow backdrop-blur-xl">
            {initials}
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-background/70 p-4 backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Fisiovanguardia</p>
        <p className="mt-1 text-lg font-semibold text-text-primary">{name}</p>
      </div>
    </div>
  );
}
