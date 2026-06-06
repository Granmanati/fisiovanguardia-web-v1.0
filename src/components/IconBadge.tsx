import type { LucideIcon } from "lucide-react";

type IconBadgeProps = {
  icon: LucideIcon;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  iconClassName?: string;
};

const sizeClasses = {
  sm: "h-10 w-10 rounded-xl",
  md: "h-12 w-12 rounded-2xl",
  lg: "h-14 w-14 rounded-2xl"
};

const iconSizes = {
  sm: 20,
  md: 24,
  lg: 28
};

export function IconBadge({ icon: Icon, label, size = "md", className = "", iconClassName = "" }: IconBadgeProps) {
  return (
    <span
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-flex shrink-0 items-center justify-center border border-accent-soft/20 bg-white/[0.055] text-accent-soft shadow-[0_0_28px_rgba(45,124,255,0.18)] backdrop-blur-xl ring-1 ring-white/10 transition duration-300 group-hover:border-accent-soft/40 group-hover:bg-accent/15 group-hover:shadow-glow ${sizeClasses[size]} ${className}`}
    >
      <Icon size={iconSizes[size]} strokeWidth={1.8} className={iconClassName} />
    </span>
  );
}
