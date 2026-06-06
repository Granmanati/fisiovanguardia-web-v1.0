import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialCards } from "@/components/SocialCards";
import { TherapistCard } from "@/components/TherapistCard";
import { socialLinks } from "@/data/site";
import { personSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: "Conoce a Darío Estrada y Vanesa Andrade, fisioterapeutas fundadores de Fisiovanguardia."
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[
        personSchema("Darío Estrada", "Especialista en movimiento humano, readaptación y dolor complejo."),
        personSchema("Vanesa Andrade", "Fisioterapia avanzada centrada en precisión, cercanía y recuperación funcional.")
      ]} />
      <section className="py-20 md:py-32">
        <div className="container-premium">
          <SectionHeading
            eyebrow="Sobre nosotros"
            title="Criterio clínico, experiencia y trato humano."
            copy="Fisiovanguardia nace para llevar una fisioterapia diferente al domicilio: más estrategia, más precisión y menos improvisación."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <TherapistCard
              name="Darío Estrada"
              role="Fundador · Movimiento humano, readaptación y dolor complejo."
              quote="Después de más de 15 años trabajando con deportistas, dolor persistente y recuperación funcional, aprendí algo sencillo: el problema rara vez es solo la zona que duele. Mi trabajo consiste en entender el sistema completo antes de intervenir."
              href={socialLinks[5].href}
              imageSrc="/team/dario.jpg"
              specialties={["Movimiento humano", "Readaptación", "Dolor complejo", "Estrategia clínica"]}
            />
            <TherapistCard
              name="Vanesa Andrade"
              role="Fundadora · Fisioterapia avanzada y recuperación funcional."
              quote="La recuperación no depende solo de las técnicas. También depende de sentirse escuchado, comprendido y acompañado durante el proceso. La precisión clínica empieza por una buena lectura de la persona."
              href={socialLinks[6].href}
              imageSrc="/team/vanesa.jpg"
              specialties={["Fisioterapia avanzada", "Cercanía clínica", "Recuperación funcional", "Acompañamiento"]}
              reverse
            />
          </div>
        </div>
      </section>
      <section className="bg-white/[0.03] py-20 md:py-32">
        <div className="container-premium">
          <SectionHeading eyebrow="Aprende con nosotros" title="Contenido clínico para pensar mejor el dolor y el movimiento." />
          <div className="mt-12"><SocialCards /></div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
