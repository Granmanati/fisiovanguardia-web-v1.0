import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { IconBadge } from "@/components/IconBadge";

type ServiceCardProps = {
  title: string;
  copy: string;
  icon: LucideIcon;
};

export function ServiceCard({ title, copy, icon: Icon }: ServiceCardProps) {
  return (
    <article className="card-premium group relative overflow-hidden p-6 transition duration-300 hover:-translate-y-2 hover:border-accent-soft/25 hover:bg-white/[0.07] hover:shadow-glow">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition duration-300 group-hover:bg-accent/20" aria-hidden="true" />
      <IconBadge icon={Icon} label={title} className="relative mb-6" />
      <h3 className="relative text-xl font-semibold text-text-primary">{title}</h3>
      <p className="relative mt-4 min-h-20 text-sm leading-6 text-text-secondary">{copy}</p>
      <Link href="/tratamientos" className="relative mt-6 inline-flex text-sm font-semibold text-accent-soft group-hover:text-white">
        Ver enfoque
      </Link>
    </article>
  );
}
