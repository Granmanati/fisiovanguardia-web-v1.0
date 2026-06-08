"use client";

import type { FormEvent } from "react";
import { CheckCheck, Clock3, Send, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { saveChatbotMessages, saveChatbotSession, saveLead, trackEvent } from "@/lib/fisiovanguardiaApi";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { LeadQuality } from "@/types/lead";

const reasons = ["Dolor o lesión", "Recuperación deportiva", "Dolor crónico", "Mandíbula / ATM", "Entrenamiento terapéutico", "Solo quiero reservar"];
const areas = ["Chamartín", "Tetuán", "Las Tablas", "Sanchinarro", "Alcobendas", "San Sebastián de los Reyes", "Tres Cantos", "Otra zona norte"];
const times = ["Mañana", "Tarde", "Primera disponibilidad"];

type ChatState = {
  reason: string;
  area: string;
  preferredTime: string;
  name: string;
  phone: string;
};

const initialState: ChatState = {
  reason: "",
  area: "",
  preferredTime: "",
  name: "",
  phone: ""
};

const qualityLabels: Record<LeadQuality, string> = {
  high: "alta",
  medium: "media",
  low: "baja"
};

export function ReceptionChatbot() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialState);
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const quality: LeadQuality = useMemo(() => getLeadQuality(data), [data]);
  const qualityLabel = qualityLabels[quality];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [step, data, saving, message]);

  async function finish(nextData: ChatState) {
    setSaving(true);
    let supabaseFailed = false;
    const leadQuality = getLeadQuality(nextData);
    const payload = {
      name: nextData.name,
      phone: nextData.phone,
      reason: nextData.reason,
      area: nextData.area,
      preferredTime: nextData.preferredTime,
      source: "reception_chatbot",
      consentHealthData: true,
      consentMarketing: false,
      metadata: { area: nextData.area, preferred_time: nextData.preferredTime, lead_quality: leadQuality }
    };

    const leadResult = await saveLead(payload);
    const leadId = leadResult.ok ? leadResult.data.id : null;

    if (!leadResult.ok) {
      supabaseFailed = true;
    }

    const sessionResult = await saveChatbotSession({
      leadId,
      source: "reception_chatbot",
      status: "completed",
      metadata: {
        reason: nextData.reason,
        area: nextData.area,
        preferred_time: nextData.preferredTime,
        lead_quality: leadQuality
      }
    });

    if (!sessionResult.ok) {
      supabaseFailed = true;
    }

    if (sessionResult.ok) {
      const messagesResult = await saveChatbotMessages(buildChatbotMessages(sessionResult.data.id, nextData, leadQuality));

      if (!messagesResult.ok) {
        supabaseFailed = true;
      }
    }

    const eventResult = await trackEvent({
      eventName: "chatbot_completed",
      leadId,
      source: "reception_chatbot",
      metadata: {
        reason: nextData.reason,
        area: nextData.area,
        preferred_time: nextData.preferredTime,
        lead_quality: leadQuality
      }
    });

    if (!eventResult.ok) {
      supabaseFailed = true;
    }

    setSaved(Boolean(leadResult.ok));
    setMessage(
      supabaseFailed
        ? "Hemos preparado tu mensaje de WhatsApp. Si no recibes respuesta, escríbenos directamente."
        : "He preparado tu solicitud. Puedes enviarla por WhatsApp para que el equipo la revise."
    );
    setSaving(false);
    setStep(6);
  }

  return (
    <div className="overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#071018]/95 shadow-card backdrop-blur-2xl md:rounded-[2rem]">
      <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-accent/20 via-white/[0.04] to-accent-soft/10 p-3 md:p-4">
        <ReceptionAvatar />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-text-primary">GLIA</h3>
          <p className="truncate text-xs text-text-secondary">Asistente de Fisiovanguardia</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-accent-soft">
            <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_14px_rgba(16,185,129,0.85)]" />
            En línea
          </p>
        </div>
        <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-accent-soft sm:block">
          Solicitud rápida
        </div>
      </div>

      <div className="max-h-[310px] overflow-y-auto bg-[radial-gradient(circle_at_18%_8%,rgba(45,124,255,0.12),transparent_16rem),linear-gradient(135deg,rgba(255,255,255,0.025)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.025)_50%,rgba(255,255,255,0.025)_75%,transparent_75%,transparent)] bg-[length:auto,18px_18px] p-3 md:max-h-[520px] md:p-4">
        <div className="grid gap-2.5 md:gap-3">
          <BotMessage>
            Hola, soy GLIA. Te hago unas preguntas rápidas para orientar tu solicitud sin diagnosticar por aquí.
          </BotMessage>

          {data.reason ? <UserMessage>{data.reason}</UserMessage> : null}
          {step === 0 ? (
            <QuickReplyGroup title="¿Qué te preocupa ahora?" options={reasons} onSelect={(value) => { setData({ ...data, reason: value }); setStep(1); }} />
          ) : null}

          {step >= 1 ? <BotMessage>Entendido. ¿En qué zona sería la visita?</BotMessage> : null}
          {data.area ? <UserMessage>{data.area}</UserMessage> : null}
          {step === 1 ? (
            <QuickReplyGroup title="Selecciona tu zona" options={areas} onSelect={(value) => { setData({ ...data, area: value }); setStep(2); }} />
          ) : null}

          {step >= 2 ? <BotMessage>Perfecto. ¿Qué horario te encaja mejor?</BotMessage> : null}
          {data.preferredTime ? <UserMessage>{data.preferredTime}</UserMessage> : null}
          {step === 2 ? (
            <QuickReplyGroup title="Preferencia horaria" options={times} onSelect={(value) => { setData({ ...data, preferredTime: value }); setStep(3); }} />
          ) : null}

          {step >= 3 ? <BotMessage>Para dejarlo preparado, dime tu nombre.</BotMessage> : null}
          {data.name ? <UserMessage>{data.name}</UserMessage> : null}
          {step === 3 ? (
            <ChatInput
              label="Tu nombre"
              placeholder="Escribe tu nombre"
              onSubmit={(value) => {
                setData({ ...data, name: value });
                setStep(4);
              }}
            />
          ) : null}

          {step >= 4 ? <BotMessage>Gracias. ¿A qué teléfono puede escribirte el equipo?</BotMessage> : null}
          {data.phone ? <UserMessage>{data.phone}</UserMessage> : null}
          {step === 4 ? (
            <ChatInput
              label="Tu teléfono"
              placeholder="Ej. 675 982 253"
              type="tel"
              onSubmit={(value) => {
                const nextData = { ...data, phone: value };
                setData(nextData);
                void finish(nextData);
              }}
            />
          ) : null}

          {saving ? <TypingState /> : null}

          {step === 6 ? (
            <>
              <BotMessage>
                Listo. Tu solicitud queda ordenada para que el equipo vea motivo, zona y disponibilidad.
              </BotMessage>
              <SummaryCard data={data} qualityLabel={qualityLabel} saved={saved} message={message} />
            </>
          ) : null}

          <div ref={endRef} />
        </div>
      </div>

      <div className="border-t border-white/10 bg-background/80 p-2.5 md:p-3">
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2 text-xs leading-5 text-muted">
          <ShieldCheck className="shrink-0 text-accent-soft" size={16} />
          No diagnostica ni prescribe ejercicios. Solo prepara la solicitud de recepción.
        </div>
      </div>
    </div>
  );
}

function ReceptionAvatar() {
  return (
    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-accent-soft/35 bg-gradient-to-br from-accent to-accent-soft shadow-[0_0_24px_rgba(45,124,255,0.34)] md:h-12 md:w-12">
      <span className="text-xs font-bold tracking-tight text-white md:text-sm">FV</span>
      <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-[#071018] bg-success" />
    </div>
  );
}

function BotMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-end gap-2">
      <ReceptionAvatar />
      <div className="max-w-[86%] rounded-3xl rounded-bl-md border border-white/10 bg-white/[0.075] px-3.5 py-2.5 text-sm leading-6 text-text-primary shadow-card md:px-4 md:py-3">
        {children}
        <MessageMeta align="left" />
      </div>
    </div>
  );
}

function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[86%] rounded-3xl rounded-br-md bg-accent px-3.5 py-2.5 text-sm font-medium leading-6 text-white shadow-glow md:px-4 md:py-3">
        {children}
        <MessageMeta align="right" />
      </div>
    </div>
  );
}

function MessageMeta({ align }: { align: "left" | "right" }) {
  return (
    <div className={`mt-1 flex items-center gap-1 text-[10px] ${align === "right" ? "justify-end text-white/75" : "text-muted"}`}>
      <span>ahora</span>
      <CheckCheck size={12} />
    </div>
  );
}

function QuickReplyGroup({ title, options, onSelect }: { title: string; options: string[]; onSelect: (value: string) => void }) {
  return (
    <div className="ml-11 rounded-3xl border border-white/10 bg-background/55 p-3 backdrop-blur-xl md:ml-14">
      <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-soft md:text-xs md:tracking-[0.16em]">
        <Sparkles size={13} />
        {title}
      </p>
      <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className="focus-ring min-h-9 rounded-full border border-accent-soft/20 bg-accent/10 px-3 text-xs font-semibold leading-4 text-text-primary transition hover:-translate-y-0.5 hover:border-accent-soft/40 hover:bg-accent hover:text-white md:min-h-10 md:px-3.5 md:text-sm"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatInput({ label, placeholder, type = "text", onSubmit }: { label: string; placeholder: string; type?: string; onSubmit: (value: string) => void }) {
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="ml-11 flex items-center gap-2 rounded-full border border-white/10 bg-background/80 p-2 backdrop-blur-xl md:ml-14">
      <label className="sr-only">{label}</label>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        type={type}
        aria-label={label}
        placeholder={placeholder}
        className="min-h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-text-primary outline-none placeholder:text-muted"
      />
      <button type="submit" className="focus-ring inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-glow transition hover:bg-blue-500">
        <Send size={17} />
      </button>
    </form>
  );
}

function TypingState() {
  return (
    <div className="flex items-center gap-2 text-xs text-text-secondary">
      <ReceptionAvatar />
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2">
        <Clock3 size={13} className="text-accent-soft" />
        GLIA está preparando tu solicitud
        <span className="flex gap-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-soft" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-soft [animation-delay:120ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-soft [animation-delay:240ms]" />
        </span>
      </div>
    </div>
  );
}

function SummaryCard({ data, qualityLabel, saved, message }: { data: ChatState; qualityLabel: string; saved: boolean; message: string }) {
  return (
    <div className="ml-11 rounded-3xl border border-accent-soft/20 bg-gradient-to-br from-accent/16 via-white/[0.055] to-accent-soft/10 p-4 shadow-card md:ml-14">
      <p className="text-sm font-semibold text-text-primary">Resumen para el equipo</p>
      <dl className="mt-3 grid gap-2 text-sm text-text-secondary">
        <SummaryRow label="Nombre" value={data.name} />
        <SummaryRow label="Teléfono" value={data.phone} />
        <SummaryRow label="Motivo" value={data.reason} />
        <SummaryRow label="Zona" value={data.area} />
        <SummaryRow label="Horario" value={data.preferredTime} />
        <SummaryRow label="Prioridad" value={qualityLabel} />
      </dl>
      <p className="mt-4 text-xs leading-5 text-text-secondary">{saved ? "Solicitud guardada en recepción." : message}</p>
      <a
        href={buildWhatsAppUrl(data)}
        className="focus-ring mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white shadow-glow transition hover:bg-blue-500"
      >
        Enviar por WhatsApp
        <Send size={16} />
      </a>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-background/45 px-3 py-2">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-medium text-text-primary">{value}</dd>
    </div>
  );
}

function getLeadQuality(data: ChatState): LeadQuality {
  if (!data.phone) return "low";
  if (!data.preferredTime) return "medium";
  return data.reason && data.area ? "high" : "medium";
}

function buildChatbotMessages(sessionId: string, data: ChatState, leadQuality: LeadQuality) {
  return [
    {
      sessionId,
      role: "assistant" as const,
      content: "Hola, soy recepcion de Fisiovanguardia. Te hago unas preguntas rapidas para orientar tu solicitud sin diagnosticar por aqui.",
      step: 0
    },
    { sessionId, role: "user" as const, content: data.reason, step: 1 },
    { sessionId, role: "user" as const, content: data.area, step: 2 },
    { sessionId, role: "user" as const, content: data.preferredTime, step: 3 },
    { sessionId, role: "user" as const, content: data.name, step: 4 },
    { sessionId, role: "user" as const, content: data.phone, step: 5 },
    {
      sessionId,
      role: "system" as const,
      content: "Chatbot completed",
      step: 6,
      metadata: {
        lead_quality: leadQuality,
        summary: {
          name: data.name,
          phone: data.phone,
          reason: data.reason,
          area: data.area,
          preferred_time: data.preferredTime
        }
      }
    }
  ];
}
