import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Legal",
  description: "Aviso legal, privacidad, cookies y aviso sanitario de Fisiovanguardia."
};

const sections = [
  ["aviso-legal", "Aviso legal", "Contenido pendiente de adaptar con los datos fiscales y de titularidad definitivos de Fisiovanguardia."],
  ["privacidad", "Privacidad", "Los datos enviados por formularios se usan para gestionar solicitudes de contacto y reserva. No se usan claves privadas ni permisos internos en cliente."],
  ["cookies", "Cookies", "La web está preparada para incorporar una política de cookies si se activan herramientas de medición o terceros."],
  ["disclaimer", "Aviso sanitario", "La información de esta web es educativa y no sustituye una valoración clínica individual."]
];

export default function LegalPage() {
  return (
    <section className="py-20 md:py-32">
      <div className="container-premium max-w-4xl">
        <SectionHeading eyebrow="Legal" title="Información legal y sanitaria." />
        <div className="mt-12 grid gap-5">
          {sections.map(([id, title, copy]) => (
            <section id={id} key={id} className="card-premium p-6">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-4 leading-7 text-text-secondary">{copy}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
