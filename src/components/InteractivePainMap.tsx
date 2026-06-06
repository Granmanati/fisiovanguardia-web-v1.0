"use client";

import { Activity, ArrowUpRight, Bone, Brain, CalendarCheck, CircleDot, Footprints, Hand, MoveRight, ScanFace, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnatomicalFigure, type PainZone } from "@/components/AnatomicalFigure";
import { ButtonLink } from "@/components/ButtonLink";
import { painMapZones, type PainMapZone } from "@/data/painMapZones";

const BODY_MAP_SRC = "/anatomy/body-map-front.png";

const iconMap = {
  neck: Brain,
  shoulder: Hand,
  back: Activity,
  lumbar: Bone,
  hip: CircleDot,
  knee: ShieldCheck,
  ankle: Footprints,
  jaw: ScanFace
};

export function InteractivePainMap() {
  const [active, setActive] = useState<PainMapZone>(painMapZones[0]);
  const [hasBodyMap, setHasBodyMap] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(BODY_MAP_SRC, { method: "HEAD" })
      .then((response) => {
        if (!cancelled) setHasBodyMap(response.ok);
      })
      .catch(() => {
        if (!cancelled) setHasBodyMap(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const fallbackZones = useMemo<PainZone[]>(
    () =>
      painMapZones.map((zone) => ({
        id: zone.id,
        slug: zone.slug,
        label: zone.name,
        module: zone.name,
        commonProblem: zone.subtitle,
        approach: zone.approach,
        x: zone.point.left,
        y: zone.point.top
      })),
    []
  );

  const activeFallback = fallbackZones.find((zone) => zone.id === active.id) ?? fallbackZones[0];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#06101A]/95 p-4 shadow-card sm:p-5 lg:p-6">
      <div className="absolute inset-0 animated-grid opacity-30" aria-hidden="true" />
      <div className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-accent-soft/10 blur-3xl" aria-hidden="true" />

      <div className="relative grid gap-5 lg:grid-cols-[0.82fr_1.15fr_0.95fr] xl:gap-6">
        <PainFigure
          active={active}
          hasBodyMap={hasBodyMap}
          fallbackZones={fallbackZones}
          activeFallback={activeFallback}
          onSelect={setActive}
          onBodyMapMissing={() => setHasBodyMap(false)}
        />

        <ZonesPanel active={active} onSelect={setActive} />

        <InfoPanel active={active} />
      </div>
    </div>
  );
}

function ZonesPanel({ active, onSelect }: { active: PainMapZone; onSelect: (zone: PainMapZone) => void }) {
  return (
    <aside className="order-2 rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl lg:order-1">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-text-primary">Zonas más frecuentes</h3>
        <span className="rounded-full border border-accent-soft/20 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent-soft">
          {painMapZones.length}
        </span>
      </div>

      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 lg:mx-0 lg:grid lg:max-h-[560px] lg:overflow-y-auto lg:overflow-x-hidden lg:px-0 lg:pb-0">
        {painMapZones.map((zone) => {
          const Icon = iconMap[zone.icon];
          const isActive = zone.id === active.id;

          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => onSelect(zone)}
              aria-pressed={isActive}
              className={`focus-ring min-w-[230px] rounded-2xl border p-4 text-left transition duration-300 lg:min-w-0 ${
                isActive
                  ? "border-accent-soft/45 bg-accent/15 shadow-[0_0_28px_rgba(45,124,255,0.18)]"
                  : "border-white/10 bg-background/45 hover:border-accent-soft/30 hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${isActive ? "bg-accent text-white" : "bg-accent/10 text-accent-soft"}`}>
                  <Icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-text-primary">{zone.name}</span>
                  <span className="mt-1 block text-xs leading-5 text-text-secondary">{zone.subtitle}</span>
                </span>
                <span className={`ml-auto mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${isActive ? "bg-accent-soft shadow-[0_0_14px_rgba(110,231,249,0.85)]" : "bg-white/20"}`} />
              </div>
            </button>
          );
        })}

        <ButtonLink href="/reserva" variant="secondary" className="min-w-[230px] justify-between rounded-2xl px-4 py-4 text-left lg:min-w-0">
          <span>
            <span className="block text-sm font-semibold">¿No encuentras tu zona?</span>
            <span className="mt-1 block text-xs font-medium text-text-secondary">Hablemos de tu caso</span>
          </span>
          <ArrowUpRight size={16} />
        </ButtonLink>
      </div>
    </aside>
  );
}

function PainFigure({
  active,
  hasBodyMap,
  fallbackZones,
  activeFallback,
  onSelect,
  onBodyMapMissing
}: {
  active: PainMapZone;
  hasBodyMap: boolean;
  fallbackZones: PainZone[];
  activeFallback: PainZone;
  onSelect: (zone: PainMapZone) => void;
  onBodyMapMissing: () => void;
}) {
  return (
    <div className="order-1 lg:order-2">
      <div className="relative mx-auto aspect-[0.74] w-full max-w-[430px] overflow-hidden rounded-[2rem] border border-white/10 bg-background/50 p-3 shadow-[0_24px_90px_rgba(0,0,0,0.35)] sm:p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(110,231,249,0.16),transparent_16rem)]" aria-hidden="true" />
        <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-accent-soft/60 to-transparent scan-line" aria-hidden="true" />

        {hasBodyMap ? (
          <>
            <img
              src={BODY_MAP_SRC}
              alt="Mapa anatómico interactivo de zonas frecuentes de dolor"
              className="relative h-full w-full object-contain drop-shadow-[0_0_50px_rgba(45,124,255,0.28)]"
              onError={onBodyMapMissing}
            />
            {painMapZones.map((zone) => {
              const isActive = zone.id === active.id;
              return (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => onSelect(zone)}
                  aria-pressed={isActive}
                  aria-label={`Seleccionar ${zone.name}`}
                  className={`focus-ring group absolute min-h-10 min-w-10 rounded-full border transition duration-300 ${
                    isActive
                      ? "scale-110 border-accent-soft bg-accent text-white shadow-[0_0_34px_rgba(45,124,255,0.65)]"
                      : "border-white/20 bg-background/80 text-accent-soft hover:border-accent-soft hover:bg-accent/20"
                  }`}
                  style={{ top: zone.point.top, left: zone.point.left, transform: "translate(-50%, -50%)" }}
                >
                  <span className={`absolute inset-0 rounded-full ${isActive ? "pulse-ring border border-accent-soft/60" : ""}`} />
                  <span className="relative mx-auto block h-3 w-3 rounded-full bg-current" />
                  <span className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-background/90 px-3 py-1 text-[11px] font-semibold text-text-primary opacity-0 shadow-card backdrop-blur-xl transition group-hover:opacity-100 ${isActive ? "opacity-100" : ""}`}>
                    {zone.name}
                  </span>
                </button>
              );
            })}
          </>
        ) : (
          <AnatomicalFigure
            zones={fallbackZones}
            activeZone={activeFallback}
            onSelect={(zone) => {
              const next = painMapZones.find((item) => item.id === zone.id);
              if (next) onSelect(next);
            }}
          />
        )}
      </div>

      <p className="mx-auto mt-4 max-w-sm text-center text-xs leading-5 text-muted">
        Para cambiar la figura anatómica, sustituir <span className="font-semibold text-text-secondary">public/anatomy/body-map-front.png</span> por otra imagen con proporciones similares.
      </p>
    </div>
  );
}

function InfoPanel({ active }: { active: PainMapZone }) {
  return (
    <aside className="order-3 rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-5 shadow-card backdrop-blur-xl sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">Zona seleccionada</p>
      <h3 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary">{active.name}</h3>
      <p className="mt-2 text-sm font-semibold text-accent-soft">{active.subtitle}</p>
      <p className="mt-5 text-base leading-7 text-text-secondary">{active.description}</p>

      <div className="mt-6 grid gap-3">
        <InfoBlock title="¿Qué suele estar pasando?" text={active.whatHappens} />
        <InfoBlock title="¿Cómo lo abordamos?" text={active.approach} featured />
        <InfoBlock title="¿Qué buscamos conseguir?" text={active.goal} />
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <ButtonLink href={`/tratamientos/${active.slug}`} variant="secondary" className="gap-2">
          Explorar tratamiento <ArrowUpRight size={16} />
        </ButtonLink>
        <ButtonLink href="/reserva" className="gap-2">
          Reservar valoración <CalendarCheck size={16} />
        </ButtonLink>
      </div>

      <div className="mt-6 flex items-start gap-2 rounded-2xl border border-white/10 bg-background/45 p-4 text-xs leading-5 text-text-secondary">
        <MoveRight className="mt-0.5 shrink-0 text-accent-soft" size={16} />
        Este mapa es orientativo. Cada caso es único. Si tienes dudas, nuestro equipo te asesora.
      </div>
    </aside>
  );
}

function InfoBlock({ title, text, featured = false }: { title: string; text: string; featured?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${featured ? "border-accent-soft/20 bg-accent/10" : "border-white/10 bg-background/45"}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{title}</p>
      <p className="mt-3 text-sm leading-6 text-text-primary">{text}</p>
    </div>
  );
}
