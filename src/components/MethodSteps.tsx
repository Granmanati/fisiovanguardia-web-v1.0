import { methodSteps } from "@/data/site";

export function MethodSteps() {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      {methodSteps.map((item) => (
        <div key={item.step} className="card-premium p-5">
          <span className="text-sm font-semibold text-accent-soft">{item.step}</span>
          <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
          <p className="mt-3 text-sm leading-6 text-text-secondary">{item.copy}</p>
        </div>
      ))}
    </div>
  );
}
