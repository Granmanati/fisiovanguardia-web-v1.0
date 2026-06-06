import { ButtonLink } from "@/components/ButtonLink";

export function MoveOSTeaser() {
  return (
    <section className="py-20 md:py-32">
      <div className="container-premium">
        <div className="depth-panel relative overflow-hidden rounded-[2.25rem] border border-white/10 p-8 md:p-12">
          <div className="absolute inset-0 animated-grid opacity-35" aria-hidden="true" />
          <div className="absolute inset-y-0 right-0 w-2/3 bg-gradient-to-l from-accent/25 via-accent-soft/10 to-transparent" aria-hidden="true" />
          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent-soft">Ecosistema futuro</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Preparado para MOVE OS.</h2>
            <p className="mt-6 text-lg leading-8 text-text-secondary">
              Evaluación, ejercicios, seguimiento y progreso en una experiencia más inteligente y medible.
            </p>
            <ButtonLink href="/move-os" variant="secondary" className="mt-8">Descubrir visión MOVE OS</ButtonLink>
            </div>
            <div className="grid gap-3">
              {["Capa de valoración", "Protocolo de ejercicio", "Señal de progreso"].map((item, index) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-background/55 p-5 backdrop-blur-xl">
                  <div className="mb-3 h-1.5 rounded-full bg-gradient-to-r from-accent to-accent-soft" style={{ width: `${54 + index * 18}%` }} />
                  <p className="font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
