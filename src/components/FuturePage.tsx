import { ButtonLink } from "@/components/ButtonLink";

type FuturePageProps = {
  eyebrow: string;
  title: string;
  copy: string;
};

export function FuturePage({ eyebrow, title, copy }: FuturePageProps) {
  return (
    <section className="py-24 md:py-36">
      <div className="container-premium">
        <div className="card-premium relative overflow-hidden p-8 md:p-14">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
          <div className="relative max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-soft">{eyebrow}</p>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl">{title}</h1>
            <p className="mt-6 text-lg leading-8 text-text-secondary">{copy}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/reserva">Reservar visita actual</ButtonLink>
              <ButtonLink href="/" variant="secondary">Volver al inicio</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
