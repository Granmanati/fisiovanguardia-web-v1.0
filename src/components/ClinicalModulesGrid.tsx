import { ClinicalModuleCard } from "@/components/ClinicalModuleCard";
import { clinicalModules } from "@/data/clinicalModules";

export function ClinicalModulesGrid({ limit }: { limit?: number }) {
  const modules = typeof limit === "number" ? clinicalModules.slice(0, limit) : clinicalModules;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {modules.map((module, index) => (
        <ClinicalModuleCard key={module.slug} module={module} index={index} />
      ))}
    </div>
  );
}
