import { supabase } from "@/lib/supabaseClient";
import type {
  AnalyticsEventPayload,
  BookingRequestPayload,
  ChatbotMessagePayload,
  ChatbotSessionPayload,
  LeadPayload
} from "@/types/lead";

type ApiSuccess<T = undefined> = T extends undefined
  ? { ok: true }
  : { ok: true; data: T };

type ApiFailure = { ok: false; reason: string };
type ApiResult<T = undefined> = ApiSuccess<T> | ApiFailure;

const clinicId = process.env.NEXT_PUBLIC_SUPABASE_CLINIC_ID;
let clinicIdWarningLogged = false;

function supabaseMissingResult(): ApiFailure {
  const reason = "Supabase not configured: missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY";
  console.error("[Web→CRM] Supabase error", reason);
  return { ok: false, reason };
}

function getClinicIdFields() {
  if (clinicId) {
    return { clinic_id: clinicId };
  }

  if (!clinicIdWarningLogged) {
    console.warn("[Web→CRM] Missing NEXT_PUBLIC_SUPABASE_CLINIC_ID");
    clinicIdWarningLogged = true;
  }

  return {};
}

function getClinicId() {
  if (clinicId) {
    return clinicId;
  }

  if (!clinicIdWarningLogged) {
    console.warn("[Web→CRM] Missing NEXT_PUBLIC_SUPABASE_CLINIC_ID");
    clinicIdWarningLogged = true;
  }

  return null;
}

function logSupabaseError(context: string, error: { message?: string; details?: string | null; hint?: string | null; code?: string } | null) {
  console.error("[Web→CRM] Supabase error", {
    context,
    message: error?.message ?? "Unknown Supabase error",
    details: error?.details,
    hint: error?.hint,
    code: error?.code
  });
}

function getReturnedId(data: unknown) {
  if (typeof data === "string") {
    return data;
  }

  if (data && typeof data === "object" && "id" in data && typeof data.id === "string") {
    return data.id;
  }

  return null;
}

export async function saveLead(payload: LeadPayload): Promise<ApiResult<{ id: string }>> {
  console.info("[Web→CRM] Saving lead...");

  if (!supabase) {
    return supabaseMissingResult();
  }

  const currentClinicId = getClinicId();

  if (!currentClinicId) {
    return { ok: false, reason: "Missing NEXT_PUBLIC_SUPABASE_CLINIC_ID" };
  }

  const { data, error } = await supabase.rpc("public_create_web_lead", {
    p_clinic_id: currentClinicId,
    p_name: payload.name,
    p_phone: payload.phone,
    p_email: payload.email || null,
    p_source: payload.source ?? "website",
    p_main_complaint: payload.reason,
    p_pain_area: payload.reason,
    p_preferred_service: "home_visit",
    p_consent_health_data: payload.consentHealthData ?? true,
    p_consent_marketing: payload.consentMarketing ?? false,
    p_metadata: {
      area: payload.area,
      preferred_time: payload.preferredTime,
      ...payload.metadata
    }
  });

  const leadId = getReturnedId(data);

  if (error || !leadId) {
    logSupabaseError("saveLead", error);
    return { ok: false, reason: error?.message ?? "Lead RPC did not return an id" };
  }

  console.info("[Web→CRM] Lead saved:", { id: leadId });
  return { ok: true, data: { id: leadId } };
}

export async function saveBookingRequest(payload: BookingRequestPayload): Promise<ApiResult<{ id: string | null }>> {
  if (!supabase) {
    return supabaseMissingResult();
  }

  const metadata = {
    reason: payload.reason,
    name: payload.name,
    phone: payload.phone,
    email: payload.email || null,
    ...payload.metadata
  };

  console.info("[Web→CRM] Creating booking via RPC...");

  const { data, error } = await supabase.rpc("public_create_booking_request", {
    p_clinic_id: getClinicId(),
    p_lead_id: payload.leadId,
    p_requested_service: payload.requestedService ?? "home_visit",
    p_preferred_modality: payload.preferredModality ?? "home_visit",
    p_preferred_day: payload.preferredDay ?? null,
    p_preferred_time: payload.preferredTime ?? null,
    p_message: payload.message ?? null,
    p_area: payload.area,
    p_source: payload.source ?? "website",
    p_form_origin: payload.formOrigin ?? payload.source ?? "website",
    p_contact_preference: payload.contactPreference ?? "whatsapp",
    p_metadata: metadata
  });

  if (error) {
    logSupabaseError("saveBookingRequest", error);
    return { ok: false, reason: error.message };
  }

  const bookingRequestId = getReturnedId(data);

  console.info("[Web→CRM] Booking request created:", { id: bookingRequestId });
  return { ok: true, data: { id: bookingRequestId } };
}

export async function saveChatbotSession(payload: ChatbotSessionPayload): Promise<ApiResult<{ id: string }>> {
  if (!supabase) {
    return supabaseMissingResult();
  }

  const { data, error } = await supabase
    .from("chatbot_sessions")
    .insert({
      ...getClinicIdFields(),
      lead_id: payload.leadId ?? null,
      source: payload.source ?? "reception_chatbot",
      status: payload.status ?? "completed",
      metadata: payload.metadata ?? {}
    })
    .select("id")
    .single();

  if (error || !data?.id) {
    logSupabaseError("saveChatbotSession", error);
    return { ok: false, reason: error?.message ?? "Chatbot session insert did not return an id" };
  }

  return { ok: true, data: { id: data.id } };
}

export async function saveChatbotMessages(messages: ChatbotMessagePayload[]): Promise<ApiResult> {
  if (!messages.length) {
    return { ok: true };
  }

  if (!supabase) {
    return supabaseMissingResult();
  }

  const { error } = await supabase.from("chatbot_messages").insert(
    messages.map((message) => ({
      ...getClinicIdFields(),
      session_id: message.sessionId,
      role: message.role,
      content: message.content,
      step: message.step ?? null,
      metadata: message.metadata ?? {}
    }))
  );

  if (error) {
    logSupabaseError("saveChatbotMessages", error);
    return { ok: false, reason: error.message };
  }

  return { ok: true };
}

export async function trackEvent(eventName: string, metadata?: Record<string, unknown>): Promise<ApiResult>;
export async function trackEvent(payload: AnalyticsEventPayload): Promise<ApiResult>;
export async function trackEvent(
  eventOrPayload: string | AnalyticsEventPayload,
  metadata: Record<string, unknown> = {}
): Promise<ApiResult> {
  if (!supabase) {
    return supabaseMissingResult();
  }

  const payload =
    typeof eventOrPayload === "string"
      ? { eventName: eventOrPayload, metadata }
      : eventOrPayload;

  const { error } = await supabase.from("analytics_events").insert({
    ...getClinicIdFields(),
    event_name: payload.eventName,
    lead_id: payload.leadId ?? null,
    source: payload.source ?? "website",
    metadata: payload.metadata ?? {}
  });

  if (error) {
    logSupabaseError("trackEvent", error);
    return { ok: false, reason: error.message };
  }

  console.info("[Web→CRM] Event tracked");
  return { ok: true };
}
