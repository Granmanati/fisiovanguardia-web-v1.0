import type { Metadata } from "next";
import { FuturePage } from "@/components/FuturePage";

export const metadata: Metadata = {
  title: "Escaneo IA",
  description: "Página futura para el escaneo IA de Fisiovanguardia."
};

export default function AIScanPage() {
  return (
    <FuturePage
      eyebrow="Escaneo IA"
      title="El escaneo IA todavía no es una consulta ni un diagnóstico."
      copy="Esta ruta queda preparada para una futura experiencia de análisis asistido. No hay triaje clínico, recomendaciones médicas ni ejercicios generados automáticamente."
    />
  );
}
