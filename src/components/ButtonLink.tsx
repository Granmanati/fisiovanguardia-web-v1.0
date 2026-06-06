import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className = "" }: ButtonLinkProps) {
  const styles = {
    primary: "cta-glow bg-accent text-white shadow-glow hover:bg-blue-500 hover:shadow-[0_0_54px_rgba(45,124,255,0.42)]",
    secondary: "border border-white/15 bg-white/[0.045] text-text-primary backdrop-blur-xl hover:border-accent-soft/30 hover:bg-white/[0.08]",
    ghost: "text-text-secondary hover:text-text-primary"
  };

  return (
    <Link
      href={href}
      className={`focus-ring inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
