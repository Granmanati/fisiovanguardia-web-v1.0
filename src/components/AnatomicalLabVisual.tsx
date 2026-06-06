const nodes = [
  { label: "Cervical", x: "50%", y: "20%" },
  { label: "ATM", x: "62%", y: "15%" },
  { label: "Lumbar", x: "50%", y: "50%" },
  { label: "Cadera", x: "39%", y: "62%" },
  { label: "Rodilla", x: "58%", y: "78%" }
];

export function AnatomicalLabVisual() {
  return (
    <div className="depth-panel relative mx-auto aspect-[0.82] w-full max-w-[480px] overflow-hidden rounded-[2.25rem] border border-white/10 p-6">
      <div className="absolute inset-0 animated-grid opacity-50" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-soft/10" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15 orbit-slow" aria-hidden="true">
        <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-accent-soft shadow-[0_0_18px_rgba(110,231,249,0.9)]" />
      </div>
      <div className="absolute left-6 right-6 top-10 h-px bg-gradient-to-r from-transparent via-accent-soft/50 to-transparent scan-line" aria-hidden="true" />

      <div className="relative flex h-full items-center justify-center">
        <svg viewBox="0 0 240 340" className="h-full w-full max-w-[280px] drop-shadow-[0_0_34px_rgba(110,231,249,0.22)]" role="img" aria-label="Visual anatómico animado del sistema de movimiento">
          <defs>
            <linearGradient id="bodyLine" x1="0" x2="1">
              <stop offset="0%" stopColor="#6EE7F9" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#2D7CFF" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <circle cx="120" cy="46" r="24" fill="none" stroke="url(#bodyLine)" strokeWidth="2" />
          <path d="M120 72 C108 96 101 119 100 151 C99 185 91 215 78 247" fill="none" stroke="url(#bodyLine)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M120 72 C132 96 139 119 140 151 C141 185 149 215 162 247" fill="none" stroke="url(#bodyLine)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M100 112 C73 120 56 139 44 168" fill="none" stroke="#6EE7F9" strokeOpacity="0.65" strokeWidth="2" strokeLinecap="round" />
          <path d="M140 112 C167 120 184 139 196 168" fill="none" stroke="#6EE7F9" strokeOpacity="0.65" strokeWidth="2" strokeLinecap="round" />
          <path d="M84 247 C79 282 75 305 66 326" fill="none" stroke="#2D7CFF" strokeOpacity="0.72" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M156 247 C161 282 165 305 174 326" fill="none" stroke="#2D7CFF" strokeOpacity="0.72" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M95 145 C111 154 129 154 145 145" fill="none" stroke="#10B981" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" />
          <path d="M91 190 C111 202 129 202 149 190" fill="none" stroke="#10B981" strokeOpacity="0.65" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {nodes.map((node) => (
          <div
            key={node.label}
            className="absolute"
            style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)" }}
          >
            <span className="absolute inset-0 rounded-full border border-accent-soft/50 pulse-ring" />
            <span className="relative block h-3 w-3 rounded-full bg-accent-soft shadow-[0_0_18px_rgba(110,231,249,0.9)]" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2 text-center text-[11px] uppercase tracking-[0.18em] text-muted">
        {["Carga", "Señal", "Movimiento"].map((item) => (
          <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-2">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
