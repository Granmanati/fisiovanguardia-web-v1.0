import { Activity, Brain, ClipboardCheck, HandHeart, Route, TrendingUp } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { IconBadge } from "@/components/IconBadge";
import { Reveal } from "@/components/Reveal";

const journey = [
  {
    step: "01",
    title: "Escuchamos la señal",
    copy: "Dolor, rigidez, miedo o pérdida de confianza son información. Primero entendemos tu historia.",
    icon: Brain
  },
  {
    step: "02",
    title: "Leemos el movimiento",
    copy: "Observamos cómo te mueves, cómo cargas y qué patrones están limitando tu capacidad.",
    icon: Activity
  },
  {
    step: "03",
    title: "Decidimos la estrategia",
    copy: "Elegimos el camino útil: terapia manual, tecnología, ejercicio o seguimiento.",
    icon: ClipboardCheck
  },
  {
    step: "04",
    title: "Intervenimos con criterio",
    copy: "Aplicamos tratamiento, ejercicio terapéutico y tecnología cuando aporta valor real.",
    icon: HandHeart
  },
  {
    step: "05",
    title: "Te damos continuidad",
    copy: "Lo que haces entre sesiones también determina tu recuperación.",
    icon: Route
  },
  {
    step: "06",
    title: "Progresamos",
    copy: "Menos dolor. Más capacidad. Más confianza. Volver a moverte con seguridad.",
    icon: TrendingUp
  }
];

export function PatientJourney() {
  return (
    <section className="lab-noise relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.025] p-6 shadow-card md:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(110,231,249,0.14),transparent_22rem),radial-gradient(circle_at_86%_78%,rgba(45,124,255,0.16),transparent_26rem)]" aria-hidden="true" />

      <div className="relative">
        <Reveal>
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-soft">Ruta del paciente</p>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
              Una ruta clara desde la primera señal hasta volver a confiar en tu cuerpo.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-text-secondary">
              No empezamos por aplicar técnicas. Empezamos por entender qué necesita cambiar para que tu cuerpo vuelva a moverse con seguridad.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-12 lg:mt-16">
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-accent-soft via-accent to-transparent lg:left-0 lg:right-0 lg:top-1/2 lg:mx-auto lg:h-px lg:w-[88%] lg:-translate-y-1/2 lg:bg-gradient-to-r" aria-hidden="true" />

          <div className="grid gap-5 lg:grid-cols-6 lg:gap-4">
            {journey.map((item, index) => (
              <Reveal key={item.step} delay={index * 70}>
                <article className={`group relative ml-14 rounded-3xl border border-white/10 bg-background/65 p-5 shadow-card backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-accent-soft/30 hover:bg-white/[0.07] hover:shadow-glow lg:ml-0 ${index % 2 === 1 ? "lg:mt-20" : "lg:mb-20"}`}>
                  <div className="absolute -left-[3.55rem] top-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent-soft/25 bg-accent text-sm font-semibold text-white shadow-glow lg:left-1/2 lg:top-auto lg:-translate-x-1/2 lg:-translate-y-1/2">
                    {item.step}
                  </div>
                  <IconBadge icon={item.icon} label={item.title} size="sm" className="mb-5" />
                  <h3 className="text-xl font-semibold text-text-primary group-hover:text-accent-soft">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">{item.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:flex-row md:items-center" delay={160}>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-soft">Empezar ruta</p>
            <p className="mt-2 text-lg font-semibold text-text-primary">Convierte una molestia en una ruta clínica con dirección.</p>
          </div>
          <ButtonLink href="/reserva">Empezar mi ruta</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
