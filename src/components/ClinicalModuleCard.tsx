import { Activity, Brain, Dumbbell, Footprints, Gauge, HeartPulse, MoveUpRight, ScanFace } from "lucide-react";
import Link from "next/link";
import { IconBadge } from "@/components/IconBadge";
import type { ClinicalModule } from "@/data/clinicalModules";

const iconMap = {
  cervical: Brain,
  lumbar: Gauge,
  atm: ScanFace,
  hombro: MoveUpRight,
  rodilla: Activity,
  tobillo: Footprints,
  dolor: HeartPulse,
  performance: Dumbbell
};

export function ClinicalModuleCard({ module, index = 0 }: { module: ClinicalModule; index?: number }) {
  const Icon = iconMap[module.icon];

  return (
    <article className="group relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-card backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-accent-soft/30 hover:bg-white/[0.075] hover:shadow-glow">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(110,231,249,0.16),transparent_14rem),radial-gradient(circle_at_90%_10%,rgba(45,124,255,0.18),transparent_16rem)] opacity-80" aria-hidden="true" />
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-accent-soft/15 transition duration-500 group-hover:scale-110" aria-hidden="true" />
      <div className="absolute bottom-5 right-5 text-8xl font-semibold tracking-[-0.08em] text-white/[0.035]" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative flex h-full flex-col">
        <div className="mb-7 flex items-center justify-between">
          <IconBadge icon={Icon} label={module.title} size="lg" />
          <div className="h-14 w-20 rounded-full bg-gradient-to-r from-accent/25 to-accent-soft/20 blur-xl" />
        </div>

        <h3 className="text-2xl font-semibold tracking-tight text-text-primary">{module.title}</h3>
        <p className="mt-4 text-lg leading-7 text-text-primary">{module.emotionalLine}</p>
        <p className="mt-4 text-sm leading-6 text-text-secondary">{module.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {["señal", "carga", "plan"].map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              {tag}
            </span>
          ))}
        </div>

        <Link href={`/tratamientos/${module.slug}`} className="focus-ring mt-auto inline-flex min-h-11 items-center justify-center rounded-full border border-accent-soft/25 bg-accent/10 px-5 text-sm font-semibold text-accent-soft transition hover:bg-accent hover:text-white">
          Explorar tratamiento
        </Link>
      </div>
    </article>
  );
}
