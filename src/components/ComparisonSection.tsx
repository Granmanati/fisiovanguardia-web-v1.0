const rows = [
  ["Sesión suelta", "Sistema clínico"],
  ["Alivio aislado", "Estrategia de recuperación"],
  ["Ejercicios genéricos", "Movimiento dosificado"],
  ["Sin seguimiento", "Ruta preparada para MOVE OS"]
];

export function ComparisonSection() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 opacity-75 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">Clínica tradicional</p>
        <div className="mt-8 grid gap-4">
          {rows.map(([left]) => (
            <div key={left} className="rounded-2xl border border-white/10 bg-background/45 p-4 text-text-secondary">
              {left}
            </div>
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-[2rem] border border-accent-soft/25 bg-gradient-to-br from-accent/25 via-white/[0.06] to-accent-soft/10 p-6 shadow-glow">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-soft/20 blur-3xl" aria-hidden="true" />
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-soft">Fisiovanguardia</p>
        <div className="mt-8 grid gap-4">
          {rows.map(([, right]) => (
            <div key={right} className="relative rounded-2xl border border-accent-soft/20 bg-background/65 p-4 font-semibold text-text-primary backdrop-blur-xl transition hover:-translate-y-1 hover:border-accent-soft/40">
              {right}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
