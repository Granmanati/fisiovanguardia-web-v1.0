import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Solicitud recibida",
  description: "Gracias por confiar en Fisiovanguardia."
};

export default function ThanksPage() {
  return (
    <section className="py-24 md:py-36">
      <div className="container-premium max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-soft">Solicitud recibida</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">Gracias por confiar en Fisiovanguardia.</h1>
        <p className="mt-6 text-lg leading-8 text-text-secondary">
          Revisaremos tu solicitud y te contactaremos para proponerte el siguiente paso.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Volver al inicio</ButtonLink>
          <ButtonLink href={buildWhatsAppUrl()} variant="secondary">WhatsApp</ButtonLink>
        </div>
      </div>
    </section>
  );
}
