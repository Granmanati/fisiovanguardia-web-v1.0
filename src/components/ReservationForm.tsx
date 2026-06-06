"use client";

import { FormEvent, useState } from "react";
import { saveBookingRequest, saveLead, trackEvent } from "@/lib/fisiovanguardiaApi";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const areas = ["Chamartín", "Tetuán", "Las Tablas", "Sanchinarro", "Alcobendas", "San Sebastián de los Reyes", "Tres Cantos", "Otra zona norte"];
const reasons = ["Dolor o lesión", "Recuperación deportiva", "Dolor crónico", "Mandíbula / ATM", "Entrenamiento terapéutico", "Solo quiero reservar"];
const times = ["Mañana", "Tarde", "Primera disponibilidad"];

export function ReservationForm() {
  const [status, setStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      area: String(form.get("area") ?? "").trim(),
      reason: String(form.get("reason") ?? "").trim(),
      preferredTime: String(form.get("preferredTime") ?? "").trim(),
      source: "reservation_form",
      consentHealthData: form.get("consent") === "on",
      consentMarketing: false
    };

    if (!payload.name || !payload.phone || !payload.area || !payload.reason || !payload.preferredTime || !payload.consentHealthData) {
      setStatus("Revisa los datos obligatorios antes de enviar.");
      return;
    }

    setSubmitting(true);
    setStatus("Preparando solicitud...");

    let supabaseFailed = false;
    const leadResult = await saveLead(payload);
    const leadId = leadResult.ok ? leadResult.data.id : null;

    if (!leadResult.ok) {
      supabaseFailed = true;
    }

    if (leadId) {
      const bookingResult = await saveBookingRequest({
        ...payload,
        leadId,
        requestedService: "home_visit",
        preferredModality: "home_visit",
        preferredDay: null,
        message: payload.reason,
        contactPreference: "whatsapp",
        formOrigin: "reservation_form",
        metadata: {
          area: payload.area,
          source: payload.source,
          form_origin: "reservation_form",
          reason: payload.reason,
          contact_preference: "whatsapp",
          preferred_time: payload.preferredTime
        }
      });

      if (!bookingResult.ok) {
        supabaseFailed = true;
      }
    }

    const eventResult = await trackEvent({
      eventName: "booking_requested",
      leadId,
      source: payload.source,
      metadata: {
        area: payload.area,
        reason: payload.reason,
        preferred_time: payload.preferredTime
      }
    });

    if (!eventResult.ok) {
      supabaseFailed = true;
    }

    window.open(buildWhatsAppUrl(payload), "_blank", "noopener,noreferrer");

    if (supabaseFailed) {
      setStatus("Hemos preparado tu mensaje de WhatsApp. Si no recibes respuesta, escríbenos directamente.");
      setSubmitting(false);
      return;
    }

    window.location.href = "/gracias";
  }

  return (
    <form onSubmit={handleSubmit} className="card-premium grid gap-5 p-6 md:p-8">
      <Field label="Nombre" name="name" required />
      <Field label="Teléfono" name="phone" type="tel" required />
      <Field label="Email" name="email" type="email" />
      <Select label="Zona" name="area" options={areas} required />
      <Select label="Motivo principal" name="reason" options={reasons} required />
      <Select label="Horario preferido" name="preferredTime" options={times} required />
      <label className="flex gap-3 text-sm leading-6 text-text-secondary">
        <input name="consent" type="checkbox" required className="mt-1 h-5 w-5 rounded border-white/20 bg-background" />
        Acepto que Fisiovanguardia use estos datos para gestionar mi solicitud de visita.
      </label>
      <button type="submit" disabled={submitting} className="focus-ring min-h-12 rounded-full bg-accent px-6 font-semibold text-white shadow-glow hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70">
        Solicitar visita
      </button>
      {status ? <p className="text-sm text-text-secondary">{status}</p> : null}
    </form>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-text-primary">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="focus-ring min-h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-text-primary placeholder:text-muted"
      />
    </label>
  );
}

function Select({ label, name, options, required = false }: { label: string; name: string; options: string[]; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-text-primary">
      {label}
      <select name={name} required={required} className="focus-ring min-h-12 rounded-2xl border border-white/10 bg-surface px-4 text-text-primary">
        <option value="">Seleccionar</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
