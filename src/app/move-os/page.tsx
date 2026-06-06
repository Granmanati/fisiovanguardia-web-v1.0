import type { Metadata } from "next";
import { FuturePage } from "@/components/FuturePage";

export const metadata: Metadata = {
  title: "MOVE OS",
  description: "Visión futura del ecosistema digital de Fisiovanguardia."
};

export default function MoveOSPage() {
  return (
    <FuturePage
      eyebrow="MOVE OS"
      title="La capa digital futura del método Fisiovanguardia."
      copy="MOVE OS organizará evaluación, ejercicios, seguimiento y progreso. Hoy el servicio principal es fisioterapia avanzada a domicilio; esta página deja preparada la visión sin convertir la web en una plataforma."
    />
  );
}
