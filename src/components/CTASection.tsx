import { ButtonLink } from "@/components/ButtonLink";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container-premium">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-accent/20 via-white/[0.05] to-accent-soft/10 p-8 text-center md:p-14">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-soft">Reserva</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Solicita una visita con criterio clínico desde el primer contacto.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
            Revisaremos tu caso y te propondremos el siguiente paso según agenda y zona.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/reserva">Reservar visita a domicilio</ButtonLink>
            <ButtonLink href={buildWhatsAppUrl()} variant="secondary">Hablar por WhatsApp</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
