import type { Metadata } from "next";
import { ClinicalModulesGrid } from "@/components/ClinicalModulesGrid";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { TechnologyCards } from "@/components/TechnologyCards";

export const metadata: Metadata = {
  title: "Tratamientos",
  description: "Tratamientos de fisioterapia avanzada para dolor, lesiones, ATM y movimiento en Madrid Norte."
};

export default function TreatmentsPage() {
  return (
    <>
      <section className="py-20 md:py-32">
        <div className="container-premium">
          <SectionHeading
            eyebrow="Tratamientos"
            title="Tratamientos Fisiovanguardia para dolor, lesiones y movimiento."
            copy="Cada tratamiento es una ruta de trabajo: entendemos la señal, regulamos la carga y construimos un plan para que vuelvas a moverte con confianza."
          />
          <div className="mt-12">
            <ClinicalModulesGrid />
          </div>
        </div>
      </section>
      <section className="bg-white/[0.03] py-20 md:py-32">
        <div className="container-premium">
          <SectionHeading
            eyebrow="Herramientas"
            title="Tecnología al servicio de la decisión clínica."
            copy="Ecografía, diatermia, electrólisis, ejercicio y reeducación se usan solo cuando aportan valor real."
          />
          <div className="mt-12"><TechnologyCards /></div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
