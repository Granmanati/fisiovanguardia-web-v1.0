import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { FAQSection } from "@/components/FAQSection";
import { MethodSteps } from "@/components/MethodSteps";
import { ReceptionChatbot } from "@/components/ReceptionChatbot";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Fisioterapia a domicilio en Madrid Norte",
  description: "Servicio de alto nivel de fisioterapia avanzada a domicilio en Madrid Norte."
};

export default function HomeCarePage() {
  return (
    <>
      <section className="py-20 md:py-32">
        <div className="container-premium grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <SectionHeading
            eyebrow="Fisioterapia a domicilio"
            title="La comodidad no debería reducir el nivel clínico."
            copy="Llevamos valoración, tratamiento, ejercicio terapéutico y seguimiento a tu casa con una experiencia humana, precisa y de alto nivel."
          />
          <div className="card-premium p-6">
            <h2 className="text-2xl font-semibold">Zonas habituales</h2>
            <p className="mt-4 text-text-secondary">Chamartín, Tetuán, Las Tablas, Sanchinarro, Alcobendas, San Sebastián de los Reyes, Tres Cantos y otras zonas del norte según agenda.</p>
            <ButtonLink href="/reserva" className="mt-6">Reservar fisioterapia a domicilio</ButtonLink>
          </div>
        </div>
      </section>
      <section className="bg-white/[0.03] py-20 md:py-32">
        <div className="container-premium">
          <SectionHeading title="Cómo trabajamos en casa" copy="No improvisamos una sesión. Ordenamos el caso y decidimos qué necesita tu cuerpo." />
          <div className="mt-12"><MethodSteps /></div>
        </div>
      </section>
      <section className="py-20 md:py-32">
        <div className="container-premium grid gap-10 lg:grid-cols-2">
          <SectionHeading title="Comprueba si encaja contigo" copy="El asistente de recepción organiza motivo, zona y horario para preparar tu solicitud." />
          <ReceptionChatbot />
        </div>
      </section>
      <FAQSection />
      <CTASection />
    </>
  );
}
