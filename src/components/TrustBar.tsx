import { Activity, MapPin, Route, ShieldCheck, Sparkles } from "lucide-react";
import { IconBadge } from "@/components/IconBadge";
import { trustItems } from "@/data/site";

const trustIcons = [ShieldCheck, Sparkles, MapPin, Activity, Route];

export function TrustBar() {
  return (
    <section className="border-y border-white/10 bg-white/[0.03] py-5">
      <div className="container-premium flex flex-wrap items-center justify-center gap-3">
        {trustItems.map((item, index) => {
          const Icon = trustIcons[index] ?? ShieldCheck;
          return (
          <span key={item} className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/50 py-2 pl-2 pr-4 text-sm text-text-secondary transition hover:border-accent-soft/25 hover:bg-white/[0.05]">
            <IconBadge icon={Icon} size="sm" className="h-8 w-8 rounded-full" />
            {item}
          </span>
          );
        })}
      </div>
    </section>
  );
}
