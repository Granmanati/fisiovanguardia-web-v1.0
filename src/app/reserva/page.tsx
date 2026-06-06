import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { ReceptionChatbot } from "@/components/ReceptionChatbot";
import { ReservationForm } from "@/components/ReservationForm";
import { SectionHeading } from "@/components/SectionHeading";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Reservar visita a domicilio",
  description: "Solicita tu visita de fisioterapia avanzada a domicilio con Fisiovanguardia."
};

export default function ReservationPage() {
  return (
    <section className="py-20 md:py-32">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Reserva"
          title="Solicita tu visita a domicilio."
          copy="El equipo revisará tu caso y te propondrá la mejor disponibilidad."
        />
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_0.9fr]">
          <ReservationForm />
          <div className="grid gap-6">
            <div className="card-premium p-6">
              <h2 className="text-2xl font-semibold">¿Prefieres ir directo?</h2>
              <p className="mt-3 text-text-secondary">Puedes escribirnos por WhatsApp con tu zona, motivo y disponibilidad.</p>
              <ButtonLink href={buildWhatsAppUrl()} variant="secondary" className="mt-6">WhatsApp directo</ButtonLink>
            </div>
            <ReceptionChatbot />
          </div>
        </div>
      </div>
    </section>
  );
}
