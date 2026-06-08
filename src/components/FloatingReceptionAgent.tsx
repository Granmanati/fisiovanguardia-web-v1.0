"use client";

import { ChevronDown, MessageCircle, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ReceptionChatbot } from "@/components/ReceptionChatbot";

const STORAGE_KEY = "fisiovanguardia:floating-reception-agent-dismissed";
const SESSION_KEY = "fisiovanguardia:floating-reception-agent-session";

type AgentMode = "collapsed" | "preview" | "chat";

export function FloatingReceptionAgent() {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<AgentMode>("collapsed");
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) {
      setVisible(true);
      return;
    }

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
    if (mode !== "chat") return;

    const panel = panelRef.current;
    const focusable = getFocusable(panel);
    focusable[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        minimizeOrDismiss();
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
  }, [mode]);

  function openFromTrigger() {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) {
      setMode("preview");
      return;
    }

    setMode("chat");
  }

  function minimizeOrDismiss() {
    setMode("collapsed");

    if (typeof window !== "undefined" && !window.matchMedia("(max-width: 767px)").matches) {
      setVisible(false);
      window.localStorage.setItem(STORAGE_KEY, getSessionId());
    }

    triggerRef.current?.focus();
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 right-3 z-[60] md:bottom-6 md:right-6">
      {mode === "preview" ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="glia-preview-title"
          className="mb-2 max-h-[160px] w-[min(320px,calc(100vw-1.5rem))] overflow-hidden rounded-[1.45rem] border border-white/10 bg-background/88 p-3 shadow-[0_18px_70px_rgba(45,124,255,0.26)] backdrop-blur-2xl transition duration-300 md:hidden"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <ReceptionMark />
              <div className="min-w-0">
                <h2 id="glia-preview-title" className="text-sm font-semibold text-text-primary">GLIA</h2>
                <p className="text-[11px] text-text-secondary">Asistente de Fisiovanguardia</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-semibold text-accent-soft">
                  <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                  En línea
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMode("collapsed")}
              aria-label="Minimizar GLIA"
              className="focus-ring inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-text-secondary"
            >
              <ChevronDown size={17} />
            </button>
          </div>
          <p className="mt-2 text-xs leading-5 text-text-primary">Te ayudamos a encontrar la mejor opción para ti.</p>
          <button
            type="button"
            onClick={() => setMode("chat")}
            className="focus-ring mt-2 inline-flex min-h-9 w-full items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-white shadow-glow transition hover:bg-blue-500"
          >
            Empezar
          </button>
        </div>
      ) : null}

      {mode === "chat" ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="floating-reception-title"
          className="mb-3 max-h-[500px] w-[calc(100vw-1.5rem)] max-w-[440px] overflow-hidden rounded-[1.7rem] border border-white/10 bg-background/92 p-2 shadow-[0_24px_90px_rgba(0,0,0,0.58),0_0_70px_rgba(45,124,255,0.24)] backdrop-blur-2xl transition duration-300 md:mb-4 md:w-[calc(100vw-2rem)] md:rounded-[2.1rem]"
        >
          <div className="mb-2 flex items-center justify-between gap-3 rounded-[1.35rem] border border-white/10 bg-white/[0.045] px-3 py-2.5 md:rounded-[1.7rem] md:px-4 md:py-3">
            <div className="flex min-w-0 items-center gap-3">
              <ReceptionMark />
              <div className="min-w-0">
                <h2 id="floating-reception-title" className="truncate text-base font-semibold text-text-primary">GLIA</h2>
                <p className="truncate text-xs text-text-secondary">Asistente de Fisiovanguardia</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-accent-soft">
                  <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                  En línea
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={minimizeOrDismiss}
              aria-label="Minimizar GLIA"
              className="focus-ring inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-text-secondary transition hover:bg-white/[0.08] hover:text-text-primary md:h-10 md:w-10"
            >
              <ChevronDown className="md:hidden" size={17} />
              <X className="hidden md:block" size={18} />
            </button>
          </div>
          <ReceptionChatbot />
        </div>
      ) : null}

      <button
        ref={triggerRef}
        type="button"
        onClick={openFromTrigger}
        aria-label="Abrir GLIA"
        className={`focus-ring group relative flex min-h-[60px] w-[min(320px,calc(100vw-1.5rem))] items-center gap-2.5 rounded-full border border-accent-soft/30 bg-background/88 px-3 py-2 text-left shadow-[0_18px_70px_rgba(45,124,255,0.24)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-accent-soft/55 hover:bg-surface md:w-auto md:max-w-[calc(100vw-2rem)] md:gap-3 md:px-4 md:py-3 ${mode === "chat" ? "hidden" : ""}`}
      >
        <span className="absolute inset-0 rounded-full border border-accent-soft/30 pulse-ring" aria-hidden="true" />
        <ReceptionMark />
        <span className="block min-w-0 max-w-[14rem]">
          <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-accent-soft">GLIA</span>
          <span className="block text-sm font-semibold leading-4 text-text-primary">¿No sabes por dónde empezar?</span>
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
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-accent-soft/35 bg-gradient-to-br from-accent to-accent-soft shadow-[0_0_28px_rgba(45,124,255,0.34)] md:h-11 md:w-11">
      <span className="text-xs font-bold tracking-tight text-white">FV</span>
      <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-success md:h-3 md:w-3" />
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
