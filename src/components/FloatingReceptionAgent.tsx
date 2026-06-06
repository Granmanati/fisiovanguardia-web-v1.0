"use client";

import { MessageCircle, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ReceptionChatbot } from "@/components/ReceptionChatbot";

const STORAGE_KEY = "fisiovanguardia:floating-reception-agent-dismissed";
const SESSION_KEY = "fisiovanguardia:floating-reception-agent-session";

export function FloatingReceptionAgent() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sessionId = getSessionId();
    if (window.localStorage.getItem(STORAGE_KEY) === sessionId) return;

    const show = () => setVisible(true);
    const timer = window.setTimeout(show, 4000);

    function handleScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      if (progress >= 0.3) {
        show();
        window.removeEventListener("scroll", handleScroll);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusable = getFocusable(panel);
    focusable[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeAndDismiss();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const items = getFocusable(panel);
      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function closeAndDismiss() {
    setOpen(false);
    setVisible(false);
    window.localStorage.setItem(STORAGE_KEY, getSessionId());
    triggerRef.current?.focus();
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 right-4 z-[60] md:bottom-6 md:right-6">
      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="floating-reception-title"
          className="mb-4 w-[calc(100vw-2rem)] max-w-[440px] overflow-hidden rounded-[2.1rem] border border-white/10 bg-background/92 p-2 shadow-[0_24px_90px_rgba(0,0,0,0.58),0_0_70px_rgba(45,124,255,0.24)] backdrop-blur-2xl transition duration-300"
        >
          <div className="mb-2 flex items-center justify-between gap-3 rounded-[1.7rem] border border-white/10 bg-white/[0.045] px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <ReceptionMark />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-soft">Recepción preferente</p>
                <h2 id="floating-reception-title" className="truncate text-base font-semibold text-text-primary">
                  ¿No sabes por dónde empezar?
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={closeAndDismiss}
              aria-label="Cerrar asistente de recepción"
              className="focus-ring inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-text-secondary transition hover:bg-white/[0.08] hover:text-text-primary"
            >
              <X size={18} />
            </button>
          </div>
          <ReceptionChatbot />
        </div>
      ) : null}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir asistente de recepción"
        className="focus-ring group relative flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-accent-soft/30 bg-background/90 px-4 py-3 text-left shadow-[0_18px_70px_rgba(45,124,255,0.30)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-accent-soft/55 hover:bg-surface"
      >
        <span className="absolute inset-0 rounded-full border border-accent-soft/30 pulse-ring" aria-hidden="true" />
        <ReceptionMark />
        <span className="block min-w-0 max-w-[14rem]">
          <span className="block text-sm font-semibold leading-5 text-text-primary">¿No sabes por dónde empezar?</span>
          <span className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-accent-soft">
            <Sparkles size={13} />
            Preparar mi solicitud
          </span>
        </span>
        <MessageCircle className="hidden text-accent-soft transition group-hover:translate-x-0.5 sm:block" size={18} />
      </button>
    </div>
  );
}

function ReceptionMark() {
  return (
    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-accent-soft/30 bg-gradient-to-br from-accent to-accent-soft shadow-glow">
      <span className="text-xs font-bold tracking-tight text-white">FV</span>
      <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-background bg-success" />
    </span>
  );
}

function getSessionId() {
  const existing = window.sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;

  const next = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now());
  window.sessionStorage.setItem(SESSION_KEY, next);
  return next;
}

function getFocusable(container: HTMLElement | null) {
  if (!container) return [];

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("disabled") && element.offsetParent !== null);
}
