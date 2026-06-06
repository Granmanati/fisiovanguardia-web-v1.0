export type LeadQuality = "high" | "medium" | "low";

export type LeadPayload = {
  name: string;
  phone: string;
  email?: string | null;
  reason: string;
  area: string;
  preferredTime: string;
  source?: string;
  consentHealthData?: boolean;
  consentMarketing?: boolean;
  metadata?: Record<string, unknown>;
};

export type BookingRequestPayload = {
  leadId: string;
  name: string;
  phone: string;
  email?: string | null;
  reason: string;
  area: string;
  preferredTime: string;
  preferredDay?: string | null;
  requestedService?: string;
  preferredModality?: string;
  message?: string;
  contactPreference?: string;
  formOrigin?: string;
  status?: string;
  source?: string;
  metadata?: Record<string, unknown>;
};

export type AnalyticsEventPayload = {
  eventName: string;
  leadId?: string | null;
  source?: string;
  metadata?: Record<string, unknown>;
};

export type ChatbotSessionPayload = {
  leadId?: string | null;
  source?: string;
  status?: string;
  metadata?: Record<string, unknown>;
};

export type ChatbotMessagePayload = {
  sessionId: string;
  role: "assistant" | "user" | "system";
  content: string;
  step?: number;
  metadata?: Record<string, unknown>;
};
