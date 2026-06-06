import { Activity, Brain, Gauge, Waves } from "lucide-react";

const cards = [
  { label: "Señal de dolor", value: "contextual", icon: Brain },
  { label: "Movimiento", value: "mapeado", icon: Activity },
  { label: "Carga", value: "dosificada", icon: Gauge },
  { label: "Recuperación", value: "seguida", icon: Waves }
];

export function FloatingClinicalCards() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      {cards.map((card, index) => (
        <div
          key={card.label}
          className={`absolute rounded-2xl border border-white/10 bg-background/70 p-4 shadow-card backdrop-blur-xl ${index % 2 ? "float-delayed" : "float-slow"}`}
          style={{
            left: ["3%", "73%", "8%", "68%"][index],
            top: ["18%", "12%", "70%", "78%"][index]
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent-soft">
              <card.icon size={17} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">{card.label}</p>
              <p className="text-sm font-semibold text-text-primary">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
