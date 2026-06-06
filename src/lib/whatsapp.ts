import { siteConfig } from "@/data/site";
import type { LeadPayload } from "@/types/lead";

export function buildWhatsAppUrl(payload?: Partial<LeadPayload>) {
  const message = [
    "Hola Fisiovanguardia, quiero reservar una visita a domicilio.",
    payload?.name ? `Nombre: ${payload.name}` : null,
    payload?.phone ? `Telefono: ${payload.phone}` : null,
    payload?.reason ? `Motivo: ${payload.reason}` : null,
    payload?.area ? `Zona: ${payload.area}` : null,
    payload?.preferredTime ? `Horario preferido: ${payload.preferredTime}` : null
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
