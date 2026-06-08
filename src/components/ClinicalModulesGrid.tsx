import { ClinicalModuleCard } from "@/components/ClinicalModuleCard";
import { clinicalModules } from "@/data/clinicalModules";

export function ClinicalModulesGrid({ limit, mobileLimit }: { limit?: number; mobileLimit?: number }) {
  const modules = typeof limit === "number" ? clinicalModules.slice(0, limit) : clinicalModules;

  return (
    <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 md:mx-0 md:grid md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:grid-cols-2 xl:grid-cols-4">
      {modules.map((module, index) => (
        <ClinicalModuleCard
          key={module.slug}
          module={module}
          index={index}
          className={`min-w-[82%] max-w-[320px] snap-start md:min-w-0 md:max-w-none ${
            typeof mobileLimit === "number" && index >= mobileLimit ? "hidden md:block" : ""
          }`}
        />
      ))}
    </div>
  );
}
