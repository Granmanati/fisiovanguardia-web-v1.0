import { existsSync } from "fs";
import { join } from "path";
import Image from "next/image";
import { Activity, Brain, Gauge } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const HERO_IMAGE_SRC = "/hero/fisiovanguardia-hero.jpg";

function publicAssetExists(assetPath: string) {
  return existsSync(join(process.cwd(), "public", assetPath.replace(/^\//, "")));
}

function HeroVisual() {
  const hasHeroImage = publicAssetExists(HERO_IMAGE_SRC);
  const badges = ["Dolor contextual", "Movimiento mapeado", "Plan clínico"];

  return (
    <div className="relative mx-auto w-[calc(100vw-3rem)] max-w-full sm:w-full sm:max-w-[560px] lg:max-w-none">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_28px_110px_rgba(45,124,255,0.22)] backdrop-blur-xl">
        <div className="relative aspect-[16/9] min-h-[280px] max-h-[520px] lg:aspect-[0.98] lg:min-h-[430px] xl:aspect-[1.18] xl:min-h-[500px]">
          {hasHeroImage ? (
            <Image
              src={HERO_IMAGE_SRC}
              alt="Fisioterapia avanzada, movimiento humano y tecnología clínica en Madrid"
              fill
              priority
              sizes="(min-width: 1280px) 46vw, (min-width: 1024px) 44vw, 100vw"
              className="object-cover object-center"
            />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_28%_18%,rgba(76,149,255,0.34),transparent_34%),linear-gradient(145deg,rgba(14,26,45,0.96),rgba(5,8,13,1)_58%,rgba(24,58,98,0.88))]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05080D]/85 via-[#05080D]/24 to-transparent" />
          <div className="absolute inset-0 bg-blue-500/10 mix-blend-screen" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>
      </div>

      <div className="pointer-events-none absolute left-5 top-6 hidden rounded-2xl border border-white/12 bg-background/70 px-4 py-3 text-sm font-semibold text-text-primary shadow-card backdrop-blur-xl md:flex">
        {badges[0]}
      </div>
      <div className="pointer-events-none absolute right-5 top-[44%] hidden rounded-2xl border border-accent-soft/20 bg-accent/15 px-4 py-3 text-sm font-semibold text-accent-soft shadow-[0_16px_44px_rgba(45,124,255,0.18)] backdrop-blur-xl md:flex">
        {badges[1]}
      </div>
      <div className="pointer-events-none absolute bottom-6 left-8 hidden rounded-2xl border border-white/12 bg-background/72 px-4 py-3 text-sm font-semibold text-text-primary shadow-card backdrop-blur-xl md:flex">
        {badges[2]}
      </div>
    </div>
  );
}

export function Hero() {
  const signals = [
    { label: "Dolor", value: "mapeado", icon: Brain },
    { label: "Carga", value: "dosificada", icon: Gauge },
    { label: "Movimiento", value: "reconstruido", icon: Activity }
  ];

  return (
    <section className="clinical-gradient lab-noise relative overflow-hidden py-16 md:py-24 xl:py-28">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-accent/10 to-transparent" aria-hidden="true" />
      <div className="absolute -right-32 top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-28 bottom-20 h-80 w-80 rounded-full bg-accent-soft/10 blur-3xl" aria-hidden="true" />
      <div className="container-premium relative grid items-center gap-12 lg:grid-cols-[minmax(0,0.55fr)_minmax(360px,0.45fr)] xl:grid-cols-[minmax(0,0.52fr)_minmax(430px,0.48fr)] xl:gap-16">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-soft/20 bg-accent-soft/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">
            <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_16px_rgba(16,185,129,0.8)]" />
            Laboratorio clínico de movimiento / Madrid Norte
          </div>
          <h1 className="max-w-2xl text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.03em] text-text-primary sm:text-7xl lg:text-6xl xl:text-7xl">
            El futuro de la fisioterapia y el movimiento humano.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-text-secondary md:text-xl">
            Fisioterapia avanzada a domicilio con lectura clínica, tecnología y estrategia de movimiento. Sin ruido. Sin sesiones sueltas.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/reserva">Reservar visita a domicilio</ButtonLink>
            <ButtonLink href={buildWhatsAppUrl()} variant="secondary">Hablar por WhatsApp</ButtonLink>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
            {signals.map((item) => (
              <div key={item.label} className="group rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-accent-soft/30 hover:bg-white/[0.075]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent-soft">
                  <item.icon size={18} />
                </div>
                <p className="text-2xl font-semibold">{item.label}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative pb-2 lg:pb-0">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
