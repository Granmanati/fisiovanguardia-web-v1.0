"use client";

export type PainZone = {
  id: string;
  slug: string;
  label: string;
  module: string;
  commonProblem: string;
  approach: string;
  x: string;
  y: string;
};

type AnatomicalFigureProps = {
  zones: PainZone[];
  activeZone: PainZone;
  onSelect: (zone: PainZone) => void;
};

const activeClass = "border-accent-soft bg-accent text-white shadow-[0_0_34px_rgba(45,124,255,0.62)]";
const idleClass = "border-white/15 bg-background/80 text-accent-soft hover:border-accent-soft hover:bg-accent/20";

export function AnatomicalFigure({ zones, activeZone, onSelect }: AnatomicalFigureProps) {
  return (
    <div className="depth-panel anatomical-breathe relative mx-auto aspect-[0.74] w-full max-w-[460px] overflow-hidden rounded-[2.5rem] border border-white/10 p-4 sm:p-6">
      <div className="absolute inset-0 animated-grid opacity-45" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-soft/10" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 h-[56%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15 orbit-slow" aria-hidden="true">
        <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-accent-soft shadow-[0_0_18px_rgba(110,231,249,0.9)]" />
      </div>
      <div className="absolute inset-x-8 top-10 h-px bg-gradient-to-r from-transparent via-accent-soft/60 to-transparent scan-line" aria-hidden="true" />

      <svg viewBox="0 0 260 360" className="relative h-full w-full drop-shadow-[0_0_48px_rgba(45,124,255,0.20)]" role="img" aria-label="Figura anatomica interactiva con zonas de dolor">
        <defs>
          <radialGradient id="skinGlow" cx="50%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#DFFBFF" stopOpacity="0.92" />
            <stop offset="48%" stopColor="#6EE7F9" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#2D7CFF" stopOpacity="0.10" />
          </radialGradient>
          <linearGradient id="bodyVolume" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#DFFBFF" stopOpacity="0.72" />
            <stop offset="42%" stopColor="#6EE7F9" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#2D7CFF" stopOpacity="0.14" />
          </linearGradient>
          <linearGradient id="sideShade" x1="0" x2="1">
            <stop offset="0%" stopColor="#071018" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#071018" stopOpacity="0.62" />
          </linearGradient>
          <filter id="softAura">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse cx="130" cy="178" rx="62" ry="138" fill="#2D7CFF" opacity="0.08" filter="url(#softAura)" />
        <circle cx="130" cy="42" r="24" fill="url(#skinGlow)" stroke="#BFF7FF" strokeOpacity="0.5" strokeWidth="1.5" />
        <path d="M112 62 C116 76 144 76 148 62 L143 91 L117 91 Z" fill="url(#bodyVolume)" stroke="#9DEBFF" strokeOpacity="0.42" strokeWidth="1.4" />
        <path d="M91 101 C101 82 159 82 169 101 C178 132 174 174 160 208 C149 232 111 232 100 208 C86 174 82 132 91 101 Z" fill="url(#bodyVolume)" stroke="#9DEBFF" strokeOpacity="0.42" strokeWidth="1.5" />
        <path d="M104 213 C118 228 142 228 156 213 C164 232 166 249 157 266 C145 279 115 279 103 266 C94 249 96 232 104 213 Z" fill="url(#bodyVolume)" stroke="#9DEBFF" strokeOpacity="0.38" strokeWidth="1.4" />

        <path d="M92 111 C64 123 45 151 36 199 C34 210 47 214 53 204 C66 163 79 143 98 133 Z" fill="url(#bodyVolume)" stroke="#9DEBFF" strokeOpacity="0.35" strokeWidth="1.4" />
        <path d="M168 111 C196 123 215 151 224 199 C226 210 213 214 207 204 C194 163 181 143 162 133 Z" fill="url(#bodyVolume)" stroke="#9DEBFF" strokeOpacity="0.35" strokeWidth="1.4" />

        <path d="M107 264 C95 292 88 322 82 347 C80 356 94 359 98 350 C108 321 118 295 130 270 Z" fill="url(#bodyVolume)" stroke="#9DEBFF" strokeOpacity="0.35" strokeWidth="1.4" />
        <path d="M153 264 C165 292 172 322 178 347 C180 356 166 359 162 350 C152 321 142 295 130 270 Z" fill="url(#bodyVolume)" stroke="#9DEBFF" strokeOpacity="0.35" strokeWidth="1.4" />

        <path d="M130 91 C123 124 123 184 130 218" fill="none" stroke="#E9FEFF" strokeOpacity="0.34" strokeWidth="1.2" />
        <path d="M105 118 C119 126 141 126 155 118" fill="none" stroke="#E9FEFF" strokeOpacity="0.22" strokeWidth="1.1" />
        <path d="M100 166 C117 178 143 178 160 166" fill="none" stroke="#10B981" strokeOpacity="0.26" strokeWidth="1.3" />
        <path d="M96 101 C118 94 142 94 164 101 L168 111 C144 104 116 104 92 111 Z" fill="url(#sideShade)" opacity="0.25" />
      </svg>

      {zones.map((zone) => {
        const isActive = zone.id === activeZone.id;
        return (
          <button
            key={zone.id}
            type="button"
            onClick={() => onSelect(zone)}
            aria-pressed={isActive}
            aria-label={`Seleccionar ${zone.label}`}
            className={`focus-ring group absolute min-h-11 min-w-11 rounded-full border transition duration-300 ${isActive ? activeClass : idleClass}`}
            style={{ left: zone.x, top: zone.y, transform: "translate(-50%, -50%)" }}
          >
            <span className={`absolute inset-0 rounded-full ${isActive ? "pulse-ring border border-accent-soft/60" : ""}`} />
            <span className="relative mx-auto block h-3 w-3 rounded-full bg-current" />
            <span className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-background/90 px-3 py-1 text-[11px] font-semibold text-text-primary opacity-0 shadow-card backdrop-blur-xl transition group-hover:opacity-100 ${isActive ? "opacity-100" : ""}`}>
              {zone.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
