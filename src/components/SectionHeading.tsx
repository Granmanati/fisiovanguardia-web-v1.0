type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, copy, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent-soft">{eyebrow}</p> : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">{title}</h2>
      {copy ? <p className="mt-5 text-lg leading-8 text-text-secondary">{copy}</p> : null}
    </div>
  );
}
