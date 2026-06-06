import type { Metadata } from "next";
import { FuturePage } from "@/components/FuturePage";

export const metadata: Metadata = {
  title: "Protocolos V21",
  description: "Página futura para protocolos V21 de Fisiovanguardia."
};

export default function ProtocolsPage() {
  return (
    <FuturePage
      eyebrow="Protocolos V21"
      title="Protocolos preparados para una fase posterior."
      copy="V21 será una línea futura de protocolos estructurados. Por ahora, Fisiovanguardia se centra en convertir solicitudes cualificadas de fisioterapia a domicilio."
    />
  );
}
