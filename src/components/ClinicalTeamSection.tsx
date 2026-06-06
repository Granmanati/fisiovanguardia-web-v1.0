"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Linkedin, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";

const team = [
  {
    name: "Darío Estrada",
    initials: "DE",
    role: "Fisioterapeuta · Movimiento humano · Readaptación",
    copy:
      "Después de más de 15 años trabajando con deportistas, dolor persistente y recuperación funcional, aprendí algo sencillo: el problema rara vez es solo la zona que duele. Mi trabajo consiste en entender el sistema completo antes de intervenir.",
    badges: ["Movimiento humano", "Readaptación deportiva", "Dolor complejo", "Estrategia clínica"],
    imageSrc: "/team/dario.jpg",
    imagePosition: "center top",
    linkedIn: "https://www.linkedin.com/"
  },
  {
    name: "Vanesa Andrade",
    initials: "VA",
    role: "Fisioterapeuta · Recuperación funcional · Acompañamiento",
    copy:
      "La recuperación no depende solo de las técnicas. También depende de sentirse escuchado, comprendido y acompañado durante el proceso. La precisión clínica empieza por una buena lectura de la persona.",
    badges: ["Fisioterapia avanzada", "Recuperación funcional", "Cercanía clínica", "Ejercicio terapéutico"],
    imageSrc: "/team/vanesa.jpg",
    imagePosition: "45% center",
    linkedIn: "https://www.linkedin.com/"
  }
];

type TeamMember = (typeof team)[number];

export function ClinicalTeamSection() {
  return (
    <section className="relative overflow-hidden bg-white/[0.025] py-20 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(45,124,255,0.16),transparent_28rem),radial-gradient(circle_at_86%_48%,rgba(110,231,249,0.10),transparent_24rem)]" aria-hidden="true" />

      <div className="container-premium relative">
        <Reveal>
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-soft">Equipo clínico</p>
            <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-text-primary md:text-6xl">
              Darío y Vanesa.
              <span className="block text-text-secondary">Criterio clínico, experiencia y trato humano.</span>
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary">
              La tecnología puede mejorar una decisión, pero la recuperación empieza con una buena lectura de la persona. En Fisiovanguardia combinamos experiencia clínica, movimiento humano y acompañamiento real.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 xl:grid-cols-2">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={index * 100}>
              <ClinicalFounderCard member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClinicalFounderCard({ member }: { member: TeamMember }) {
  return (
    <article className="group relative grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-card backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-accent-soft/25 hover:bg-white/[0.065] md:grid-cols-[minmax(210px,0.4fr)_minmax(0,0.6fr)]">
      <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl transition duration-300 group-hover:bg-accent/15" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-soft/40 to-transparent" aria-hidden="true" />

      <TeamPortrait member={member} />

      <div className="relative flex flex-col p-6 sm:p-7 lg:p-8">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-accent-soft/20 bg-accent/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-soft">
            <Sparkles size={13} />
            Profesional Fisiovanguardia
          </p>
          <h3 className="mt-5 text-3xl font-semibold tracking-tight text-text-primary">{member.name}</h3>
          <p className="mt-2 text-sm font-medium leading-6 text-text-secondary">{member.role}</p>
          <p className="mt-6 text-base leading-7 text-text-primary md:text-[1.03rem]">{member.copy}</p>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {member.badges.map((badge) => (
            <span key={badge} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-text-secondary">
              {badge}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href="/reserva"
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white shadow-glow transition hover:bg-blue-500"
          >
            Reservar con el equipo
            <ArrowUpRight size={16} />
          </Link>
          <a
            href={member.linkedIn}
            aria-label={`Ver LinkedIn de ${member.name}`}
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-accent-soft/25 bg-accent/10 px-5 text-sm font-semibold text-accent-soft transition hover:bg-accent hover:text-white"
          >
            <Linkedin size={16} />
            Ver LinkedIn
          </a>
        </div>
      </div>
    </article>
  );
}

function TeamPortrait({ member }: { member: TeamMember }) {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(member.imageSrc, { method: "HEAD" })
      .then((response) => {
        if (!cancelled) setAvailable(response.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });

    return () => {
      cancelled = true;
    };
  }, [member.imageSrc]);

  return (
    <div className="relative aspect-[4/5] min-h-[300px] overflow-hidden bg-gradient-to-br from-accent/20 via-surface to-accent-soft/10 sm:aspect-square md:aspect-auto md:h-full md:min-h-[420px]">
      <div className="absolute inset-0 animated-grid opacity-30" aria-hidden="true" />
      <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-accent-soft/60 to-transparent scan-line" aria-hidden="true" />

      {available ? (
        <Image
          src={member.imageSrc}
          alt={`Retrato de ${member.name}`}
          fill
          sizes="(min-width: 1280px) 40vw, (min-width: 768px) 38vw, 100vw"
          className="object-cover opacity-95 transition duration-500 group-hover:scale-[1.02]"
          style={{ objectPosition: member.imagePosition }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-[1.75rem] border border-accent-soft/25 bg-background/50 text-4xl font-semibold text-accent-soft shadow-glow backdrop-blur-xl sm:h-40 sm:w-40 sm:text-5xl">
            {member.initials}
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" aria-hidden="true" />
    </div>
  );
}
