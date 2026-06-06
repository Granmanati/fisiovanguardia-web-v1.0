import { Cpu, Radio, ScanLine, Waves, Workflow, Zap } from "lucide-react";
import { IconBadge } from "@/components/IconBadge";
import { technologies } from "@/data/site";

const icons = [ScanLine, Waves, Zap, Workflow, Radio, Cpu];

export function TechnologyCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {technologies.map((item, index) => {
        const Icon = icons[index] ?? Cpu;
        return (
        <div key={item} className="group rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-card backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-accent-soft/25 hover:bg-white/[0.07]">
          <IconBadge icon={Icon} label={item} size="sm" className="mb-5" />
          <div className="mb-5 h-1.5 w-16 rounded-full bg-gradient-to-r from-accent to-accent-soft transition-all duration-300 group-hover:w-24" />
          <h3 className="text-lg font-semibold">{item}</h3>
        </div>
        );
      })}
    </div>
  );
}
